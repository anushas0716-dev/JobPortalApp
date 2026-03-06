<<<<<<< HEAD
# TalentFlow – HR Resume Management System

A full-stack application with a Node.js/Express backend API and a React frontend for managing job applications.

---

## Project Structure

```
hr-resume-api/       ← Backend (Express + MongoDB)
hr-resume-frontend/  ← Frontend (React + Vite)
=======
# Interview Management System
## Job Portal Module - FR-18, FR-19, FR-20

A complete full-stack Interview Management System implementing:

- **FR-18**: Interview Scheduling (Date/Time, Online/Offline Mode, Location/Meeting Link)
- **FR-19**: Interview Notifications (Invitations, 24h & 1h automatic reminders, result notifications)
- **FR-20**: Interview Feedback (Result recording, ratings, comments, candidate notifications)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Frontend | React.js + Tailwind CSS |
| Email | Nodemailer (SMTP) |
| Auth | JWT |
| Scheduler | node-cron |

---

## 📁 Project Structure

```
interview-management/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── interviewController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Interview.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── interviews.js
│   ├── middleware/
│   │   └── auth.js
│   ├── services/
│   │   └── notificationService.js   ← Email notifications
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── ScheduleInterview.js   ← FR-18
    │   │   ├── InterviewList.js
    │   │   ├── InterviewDetail.js     ← FR-19 status
    │   │   └── RecordFeedback.js      ← FR-20
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
>>>>>>> 9225ac16480c8d8d14dcc0805613574f3f4be98d
```

---

<<<<<<< HEAD
## Getting Started

### 1. Backend Setup

```bash
cd hr-resume-api
npm install
cp .env.example .env
# Edit .env and fill in your MongoDB URI and JWT secret
npm run dev     # starts on http://localhost:3000
```

### 2. Frontend Setup

```bash
cd hr-resume-frontend
npm install
npm run dev     # starts on http://localhost:5173
```

> The Vite dev server proxies `/api` calls to `localhost:3000` automatically.

---

## Frontend Pages

### 🏠 Home Page
Landing page with two entry points:
- **Candidate Portal** – for job applicants
- **HR Dashboard** – for HR staff and admins

### 📄 Candidate Portal
Two tabs:
1. **Submit Resume** – Full application form with file upload (PDF/DOC/DOCX), candidate info, job details, cover letter
2. **Check Status** – Enter reference token to view application status in real time

### 🔐 HR Login
JWT-based authentication for HR and Admin users.

### 📊 HR Dashboard
Sidebar navigation with:
- **Dashboard** – Stats cards (total, pending, reviewing, shortlisted, rejected, hired), recent applications, top positions chart
- **All Resumes** – Filterable/searchable table with inline status updates, pagination, download, and delete (admin only)

### 📋 Resume Detail Modal
Click any resume to open a full detail view:
- Candidate info, application details, cover letter
- Inline status update buttons
- HR notes with add/view capability
- Resume file download
- Delete (admin only)

---

## API Endpoints Used

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | HR login |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/resumes/submit` | ❌ | Submit resume (multipart) |
| GET | `/api/resumes/status/:token` | ❌ | Check application status |
| GET | `/api/resumes/stats` | ✅ HR | Dashboard stats |
| GET | `/api/resumes` | ✅ HR | List resumes (filterable) |
| GET | `/api/resumes/:id` | ✅ HR | Get single resume |
| GET | `/api/resumes/:id/download` | ✅ HR | Download resume file |
| PATCH | `/api/resumes/:id/status` | ✅ HR | Update status |
| POST | `/api/resumes/:id/notes` | ✅ HR | Add HR note |
| DELETE | `/api/resumes/:id` | ✅ Admin | Delete resume |

---

## Environment Variables (Backend)

```env
MONGODB_URI=mongodb://localhost:27017/hr-resume
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
PORT=3000

# Email (optional)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
EMAIL_FROM=noreply@company.com
HR_EMAIL=hr@company.com
```

---

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, Multer, JWT, bcrypt, Nodemailer  
**Frontend:** React 18, Vite, CSS Variables (no UI library dependency)
=======
## 🚀 Setup & Installation

### Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)
- Gmail or SMTP email account

### Step 1: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and email credentials
npm start
```

**Configure `.env`:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interview_management
JWT_SECRET=your_super_secret_key

# Gmail SMTP (use App Password if 2FA enabled)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=Interview System <your@gmail.com>
```

### Step 2: Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000  
Backend API runs on: http://localhost:5000

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/profile | Get profile |

### Interviews (FR-18, FR-19, FR-20)
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/interviews/schedule | FR-18: Schedule interview |
| GET | /api/interviews | List all interviews |
| GET | /api/interviews/stats | Dashboard stats |
| GET | /api/interviews/:id | Get single interview |
| PUT | /api/interviews/:id/reschedule | Reschedule |
| PUT | /api/interviews/:id/cancel | Cancel |
| POST | /api/interviews/:id/feedback | FR-20: Record feedback |
| POST | /api/interviews/:id/send-reminder | FR-19: Manual reminder |

---

## 📧 Email Notifications (FR-19)

| Trigger | Email Sent |
|---|---|
| Interview Scheduled | Invitation to candidate |
| Interview Rescheduled | New invitation to candidate |
| 24h Before Interview | Automatic reminder (cron job) |
| 1h Before Interview | Automatic reminder (cron job) |
| Feedback Recorded | Result notification to candidate |

---

## 👤 User Roles

| Role | Permissions |
|---|---|
| **Recruiter** | Schedule, reschedule, cancel, record feedback, send reminders |
| **Candidate** | View their own interviews, receive notifications |
| **Admin** | All permissions |

---

## 🎯 Features

- ✅ FR-18: Full interview scheduling with online/offline modes
- ✅ FR-19: Automatic email invitations and reminders
- ✅ FR-20: Comprehensive feedback with star ratings
- ✅ Role-based access control
- ✅ Paginated interview listing with filters
- ✅ Dashboard with statistics
- ✅ Responsive design (mobile + desktop)
- ✅ JWT authentication
>>>>>>> 9225ac16480c8d8d14dcc0805613574f3f4be98d
