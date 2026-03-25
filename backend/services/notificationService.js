const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Format date nicely
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// FR-19: Send interview invitation to candidate
const sendInterviewInvitation = async (interview) => {
  const transporter = createTransporter();
  
  const locationDetails = interview.mode === 'online'
    ? `<strong>Platform:</strong> ${interview.meetingPlatform || 'Online'}<br>
       <strong>Meeting Link:</strong> <a href="${interview.meetingLink}">${interview.meetingLink}</a>`
    : `<strong>Location:</strong> ${interview.location?.address}, ${interview.location?.city}, ${interview.location?.state} - ${interview.location?.pincode}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #667eea; }
        .badge { display: inline-block; background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
        .btn { display: inline-block; background: #667eea; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin-top: 10px; }
        .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Interview Invitation</h1>
        <p>Congratulations! You have been shortlisted for an interview.</p>
      </div>
      <div class="content">
        <p>Dear <strong>${interview.candidate.name}</strong>,</p>
        <p>We are pleased to invite you for an interview for the position of <strong>${interview.jobTitle}</strong> at <strong>${interview.companyName}</strong>.</p>
        
        <div class="detail-box">
          <h3>📅 Interview Details</h3>
          <p><strong>Position:</strong> ${interview.jobTitle}</p>
          <p><strong>Company:</strong> ${interview.companyName}</p>
          <p><strong>Round:</strong> <span class="badge">${interview.interviewRound.replace('_', ' ').toUpperCase()}</span></p>
          <p><strong>Date:</strong> ${formatDate(interview.scheduledDate)}</p>
          <p><strong>Time:</strong> ${interview.scheduledTime}</p>
          <p><strong>Duration:</strong> ${interview.duration} minutes</p>
          <p><strong>Mode:</strong> ${interview.mode.toUpperCase()}</p>
          <p>${locationDetails}</p>
        </div>

        ${interview.interviewers?.length > 0 ? `
        <div class="detail-box">
          <h3>👥 Interview Panel</h3>
          ${interview.interviewers.map(i => `<p>• ${i.name} - ${i.designation || 'Interviewer'}</p>`).join('')}
        </div>` : ''}

        ${interview.notes ? `
        <div class="detail-box">
          <h3>📝 Additional Notes</h3>
          <p>${interview.notes}</p>
        </div>` : ''}

        <p>Please be available at least 10 minutes before the scheduled time. If you have any questions or need to reschedule, please contact us immediately.</p>
        
        <p>Best of luck!</p>
        <p>Regards,<br><strong>${interview.recruiter.name}</strong><br>${interview.companyName}</p>
        
        <div class="footer">
          <p>This is an automated message from the Job Portal Interview Management System.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Interview Management <noreply@jobportal.com>',
      to: interview.candidate.email,
      subject: `Interview Invitation - ${interview.jobTitle} at ${interview.companyName}`,
      html
    });
    console.log(`✅ Invitation sent to ${interview.candidate.email}`);
    return true;
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    return false;
  }
};

// FR-19: Send reminder
const sendInterviewReminder = async (interview, hoursBeforeInterview) => {
  const transporter = createTransporter();

  const locationDetails = interview.mode === 'online'
    ? `Meeting Link: ${interview.meetingLink}`
    : `Location: ${interview.location?.address}, ${interview.location?.city}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f5576c; }
        .timer { font-size: 24px; font-weight: bold; color: #f5576c; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⏰ Interview Reminder</h1>
        <p>Your interview is coming up soon!</p>
      </div>
      <div class="content">
        <div class="timer">Your interview is in ${hoursBeforeInterview} hour(s)!</div>
        <br>
        <p>Dear <strong>${interview.candidate.name}</strong>,</p>
        <p>This is a reminder for your scheduled interview.</p>
        
        <div class="detail-box">
          <h3>📅 Interview Details</h3>
          <p><strong>Position:</strong> ${interview.jobTitle}</p>
          <p><strong>Company:</strong> ${interview.companyName}</p>
          <p><strong>Date:</strong> ${formatDate(interview.scheduledDate)}</p>
          <p><strong>Time:</strong> ${interview.scheduledTime}</p>
          <p><strong>Mode:</strong> ${interview.mode.toUpperCase()}</p>
          <p>${locationDetails}</p>
        </div>

        <h3>✅ Checklist</h3>
        <ul>
          ${interview.mode === 'online' ? 
            '<li>Test your camera and microphone</li><li>Ensure stable internet connection</li><li>Have the meeting link ready</li>' : 
            '<li>Plan your route and leave early</li><li>Carry necessary documents</li><li>Dress professionally</li>'}
          <li>Keep your resume handy</li>
          <li>Prepare to discuss your experience and projects</li>
        </ul>

        <p>Best of luck!</p>
        <p>Regards,<br><strong>${interview.recruiter.name}</strong></p>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Interview Management <noreply@jobportal.com>',
      to: interview.candidate.email,
      subject: `⏰ Reminder: Interview in ${hoursBeforeInterview}h - ${interview.jobTitle} at ${interview.companyName}`,
      html
    });
    console.log(`✅ ${hoursBeforeInterview}h reminder sent to ${interview.candidate.email}`);
    return true;
  } catch (error) {
    console.error('❌ Reminder email error:', error.message);
    return false;
  }
};

// FR-19: Send feedback/result notification to candidate
const sendResultNotification = async (interview) => {
  const transporter = createTransporter();
  
  const resultMessages = {
    selected: { emoji: '🎉', title: 'Congratulations! You are Selected!', msg: 'We are pleased to inform you that you have successfully cleared this interview round.' },
    rejected: { emoji: '😔', title: 'Interview Result Update', msg: 'Thank you for your time and effort. After careful consideration, we have decided to move forward with other candidates.' },
    hold: { emoji: '⏳', title: 'Interview Status: On Hold', msg: 'Your interview has been reviewed and your profile is currently on hold. We will get back to you soon.' },
    no_show: { emoji: '❌', title: 'Missed Interview', msg: 'We noticed you were unable to attend the scheduled interview. Please contact us to reschedule.' }
  };

  const result = resultMessages[interview.feedback.result] || resultMessages.hold;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: ${interview.feedback.result === 'selected' ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${result.emoji} ${result.title}</h1>
      </div>
      <div class="content">
        <p>Dear <strong>${interview.candidate.name}</strong>,</p>
        <p>${result.msg}</p>
        
        <div class="detail-box">
          <h3>Interview Summary</h3>
          <p><strong>Position:</strong> ${interview.jobTitle}</p>
          <p><strong>Company:</strong> ${interview.companyName}</p>
          <p><strong>Round:</strong> ${interview.interviewRound.replace('_', ' ').toUpperCase()}</p>
          <p><strong>Date:</strong> ${formatDate(interview.scheduledDate)}</p>
          <p><strong>Result:</strong> <strong>${interview.feedback.result.toUpperCase()}</strong></p>
        </div>

        ${interview.feedback.comments ? `<div class="detail-box"><h3>Feedback</h3><p>${interview.feedback.comments}</p></div>` : ''}
        
        <p>Thank you for your interest in ${interview.companyName}.</p>
        <p>Regards,<br><strong>${interview.recruiter.name}</strong><br>${interview.companyName}</p>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Interview Management <noreply@jobportal.com>',
      to: interview.candidate.email,
      subject: `Interview Result: ${interview.jobTitle} at ${interview.companyName}`,
      html
    });
    return true;
  } catch (error) {
    console.error('❌ Result notification error:', error.message);
    return false;
  }
};

// Cron job function: Send upcoming reminders
const sendUpcomingReminders = async () => {
  try {
    const Interview = require('../models/Interview');
    const now = new Date();
    
    // Find interviews in next 25 hours that haven't had 24h reminder sent
    const upcoming24h = await Interview.find({
      status: 'scheduled',
      scheduledDate: {
        $gte: new Date(now.getTime() + 23 * 60 * 60 * 1000),
        $lte: new Date(now.getTime() + 25 * 60 * 60 * 1000)
      },
      'notifications.reminder24hSent': false
    });

    for (const interview of upcoming24h) {
      const sent = await sendInterviewReminder(interview, 24);
      if (sent) {
        await Interview.findByIdAndUpdate(interview._id, {
          'notifications.reminder24hSent': true,
          'notifications.reminder24hSentAt': new Date()
        });
      }
    }

    // Find interviews in next 2 hours that haven't had 1h reminder sent
    const upcoming1h = await Interview.find({
      status: 'scheduled',
      scheduledDate: {
        $gte: new Date(now.getTime() + 30 * 60 * 1000),
        $lte: new Date(now.getTime() + 2 * 60 * 60 * 1000)
      },
      'notifications.reminder1hSent': false
    });

    for (const interview of upcoming1h) {
      const sent = await sendInterviewReminder(interview, 1);
      if (sent) {
        await Interview.findByIdAndUpdate(interview._id, {
          'notifications.reminder1hSent': true,
          'notifications.reminder1hSentAt': new Date()
        });
      }
    }

    console.log(`✅ Reminder job: ${upcoming24h.length} 24h reminders, ${upcoming1h.length} 1h reminders sent`);
  } catch (error) {
    console.error('❌ Reminder job error:', error.message);
  }
};

module.exports = {
  sendInterviewInvitation,
  sendInterviewReminder,
  sendResultNotification,
  sendUpcomingReminders
};
