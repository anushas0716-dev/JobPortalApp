const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  // Job Application Reference
  applicationId: {
    type: String,
    required: true
  },
  jobId: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },

  // Candidate Info
  candidate: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },

  // Recruiter Info
  recruiter: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },

  // FR-18: Interview Scheduling
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true  // "HH:MM" format
  },
  duration: {
    type: Number,
    default: 60  // minutes
  },
  mode: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  // For online interviews
  meetingLink: {
    type: String
  },
  meetingPlatform: {
    type: String,
    enum: ['zoom', 'google_meet', 'microsoft_teams', 'skype', 'other', null]
  },
  // For offline interviews
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String
  },

  interviewRound: {
    type: String,
    enum: ['screening', 'technical_1', 'technical_2', 'hr', 'managerial', 'final'],
    default: 'screening'
  },

  interviewers: [{
    name: String,
    email: String,
    designation: String
  }],

  // FR-19: Notification tracking
  notifications: {
    invitationSent: { type: Boolean, default: false },
    invitationSentAt: Date,
    reminder24hSent: { type: Boolean, default: false },
    reminder24hSentAt: Date,
    reminder1hSent: { type: Boolean, default: false },
    reminder1hSentAt: Date,
    rescheduleNotificationSent: { type: Boolean, default: false }
  },

  // FR-20: Interview Feedback
  feedback: {
    result: {
      type: String,
      enum: ['pending', 'selected', 'rejected', 'hold', 'no_show'],
      default: 'pending'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    technicalSkills: {
      type: Number,
      min: 1,
      max: 5
    },
    communicationSkills: {
      type: Number,
      min: 1,
      max: 5
    },
    problemSolving: {
      type: Number,
      min: 1,
      max: 5
    },
    culturalFit: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    strengths: String,
    areasOfImprovement: String,
    recommendedForNextRound: Boolean,
    recordedBy: {
      id: String,
      name: String
    },
    recordedAt: Date
  },

  // Status
  status: {
    type: String,
    enum: ['scheduled', 'rescheduled', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled'
  },

  notes: String,
  cancelReason: String,
  rescheduledFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  }

}, { timestamps: true });

// Index for efficient querying
interviewSchema.index({ 'candidate.id': 1 });
interviewSchema.index({ 'recruiter.id': 1 });
interviewSchema.index({ scheduledDate: 1 });
interviewSchema.index({ status: 1 });

module.exports = mongoose.model('Interview', interviewSchema);
