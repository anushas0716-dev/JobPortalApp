const Interview = require('../models/Interview');
const notificationService = require('../services/notificationService');

// FR-18: Schedule an Interview
const scheduleInterview = async (req, res) => {
  try {
    const {
      applicationId, jobId, jobTitle, companyName,
      candidate, scheduledDate, scheduledTime, duration,
      mode, meetingLink, meetingPlatform, location,
      interviewRound, interviewers, notes
    } = req.body;

    // Validate mode-specific fields
    if (mode === 'online' && !meetingLink) {
      return res.status(400).json({ success: false, message: 'Meeting link is required for online interviews' });
    }
    if (mode === 'offline' && (!location || !location.address)) {
      return res.status(400).json({ success: false, message: 'Location address is required for offline interviews' });
    }

    const interview = new Interview({
      applicationId,
      jobId,
      jobTitle,
      companyName,
      candidate,
      recruiter: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      },
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      duration: duration || 60,
      mode,
      meetingLink,
      meetingPlatform,
      location,
      interviewRound: interviewRound || 'screening',
      interviewers: interviewers || [],
      notes,
      status: 'scheduled'
    });

    await interview.save();

    // FR-19: Send invitation email to candidate
    const emailSent = await notificationService.sendInterviewInvitation(interview);
    
    if (emailSent) {
      interview.notifications.invitationSent = true;
      interview.notifications.invitationSentAt = new Date();
      await interview.save();
    }

    res.status(201).json({
      success: true,
      message: 'Interview scheduled successfully',
      data: interview,
      emailSent
    });
  } catch (error) {
    console.error('Schedule interview error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all interviews (with filters)
const getInterviews = async (req, res) => {
  try {
    const { status, mode, candidateId, recruiterId, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    
    // Role-based filtering
    if (req.user.role === 'candidate') {
      filter['candidate.id'] = req.user.id;
    } else if (req.user.role === 'recruiter') {
      filter['recruiter.id'] = req.user.id;
    }

    if (status) filter.status = status;
    if (mode) filter.mode = mode;
    if (candidateId && req.user.role !== 'candidate') filter['candidate.id'] = candidateId;
    if (recruiterId) filter['recruiter.id'] = recruiterId;
    
    if (startDate || endDate) {
      filter.scheduledDate = {};
      if (startDate) filter.scheduledDate.$gte = new Date(startDate);
      if (endDate) filter.scheduledDate.$lte = new Date(endDate);
    }

    const total = await Interview.countDocuments(filter);
    const interviews = await Interview.find(filter)
      .sort({ scheduledDate: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: interviews,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single interview
const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Access control
    if (req.user.role === 'candidate' && interview.candidate.id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: interview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reschedule interview
const rescheduleInterview = async (req, res) => {
  try {
    const { scheduledDate, scheduledTime, mode, meetingLink, meetingPlatform, location, notes } = req.body;
    
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Create new interview entry for rescheduled
    const rescheduled = new Interview({
      ...interview.toObject(),
      _id: undefined,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      mode: mode || interview.mode,
      meetingLink: meetingLink || interview.meetingLink,
      meetingPlatform: meetingPlatform || interview.meetingPlatform,
      location: location || interview.location,
      status: 'rescheduled',
      notes,
      rescheduledFrom: interview._id,
      notifications: {
        invitationSent: false,
        reminder24hSent: false,
        reminder1hSent: false
      }
    });

    await rescheduled.save();

    // Mark old interview as rescheduled
    interview.status = 'rescheduled';
    await interview.save();

    // Send new invitation
    const emailSent = await notificationService.sendInterviewInvitation(rescheduled);
    if (emailSent) {
      rescheduled.notifications.invitationSent = true;
      rescheduled.notifications.invitationSentAt = new Date();
      await rescheduled.save();
    }

    res.json({
      success: true,
      message: 'Interview rescheduled successfully',
      data: rescheduled,
      emailSent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel interview
const cancelInterview = async (req, res) => {
  try {
    const { cancelReason } = req.body;
    
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', cancelReason },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    res.json({ success: true, message: 'Interview cancelled', data: interview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// FR-20: Record Interview Feedback
const recordFeedback = async (req, res) => {
  try {
    const {
      result, rating, technicalSkills, communicationSkills,
      problemSolving, culturalFit, comments, strengths,
      areasOfImprovement, recommendedForNextRound
    } = req.body;

    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    // Update feedback
    interview.feedback = {
      result,
      rating,
      technicalSkills,
      communicationSkills,
      problemSolving,
      culturalFit,
      comments,
      strengths,
      areasOfImprovement,
      recommendedForNextRound,
      recordedBy: { id: req.user.id, name: req.user.name },
      recordedAt: new Date()
    };

    // Update status
    if (result === 'no_show') {
      interview.status = 'no_show';
    } else {
      interview.status = 'completed';
    }

    await interview.save();

    // Send result notification to candidate
    await notificationService.sendResultNotification(interview);

    res.json({
      success: true,
      message: 'Feedback recorded successfully',
      data: interview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get interview statistics (dashboard)
const getStats = async (req, res) => {
  try {
    let matchFilter = {};
    if (req.user.role === 'recruiter') {
      matchFilter = { 'recruiter.id': req.user.id };
    }

    const stats = await Interview.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const resultStats = await Interview.aggregate([
      { $match: { ...matchFilter, status: 'completed' } },
      {
        $group: {
          _id: '$feedback.result',
          count: { $sum: 1 }
        }
      }
    ]);

    const modeStats = await Interview.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$mode',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: { statusStats: stats, resultStats, modeStats }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Manually send reminder (FR-19)
const sendManualReminder = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    const sent = await notificationService.sendInterviewReminder(interview, 'custom');
    res.json({ success: true, message: sent ? 'Reminder sent successfully' : 'Failed to send reminder' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  scheduleInterview,
  getInterviews,
  getInterview,
  rescheduleInterview,
  cancelInterview,
  recordFeedback,
  getStats,
  sendManualReminder
};
