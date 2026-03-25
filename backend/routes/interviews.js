const express = require('express');
const router = express.Router();
const { authMiddleware, recruiterOnly } = require('../middleware/auth');
const {
  scheduleInterview,
  getInterviews,
  getInterview,
  rescheduleInterview,
  cancelInterview,
  recordFeedback,
  getStats,
  sendManualReminder
} = require('../controllers/interviewController');

// All routes require authentication
router.use(authMiddleware);

// FR-18: Schedule interview (Recruiter only)
router.post('/schedule', recruiterOnly, scheduleInterview);

// Get all interviews (filtered by role)
router.get('/', getInterviews);

// Get stats/dashboard
router.get('/stats', getStats);

// Get single interview
router.get('/:id', getInterview);

// Reschedule (Recruiter only)
router.put('/:id/reschedule', recruiterOnly, rescheduleInterview);

// Cancel
router.put('/:id/cancel', recruiterOnly, cancelInterview);

// FR-20: Record feedback (Recruiter only)
router.post('/:id/feedback', recruiterOnly, recordFeedback);

// FR-19: Manual reminder
router.post('/:id/send-reminder', recruiterOnly, sendManualReminder);

module.exports = router;
