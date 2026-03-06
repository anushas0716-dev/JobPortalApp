const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();

const interviewRoutes = require('./routes/interviews');
const authRoutes = require('./routes/auth');
const notificationService = require('./services/notificationService');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interview_management')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️  Running with in-memory store (no MongoDB)');
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Cron job: Send reminders 24 hours before interview (runs every hour)
cron.schedule('0 * * * *', async () => {
  console.log('⏰ Running interview reminder job...');
  await notificationService.sendUpcomingReminders();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
