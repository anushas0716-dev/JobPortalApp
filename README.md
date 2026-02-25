
# Job Portal - Recruiter & Company Module
## FR-12 to FR-15 | Python Flask Implementation
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




## 📁 Project Structure



JobPortalApp/
│
├── app.py                    ← Flask app factory & entry point
├── requirements.txt          ← All pip dependencies
├── seed_data.py              ← Load test/demo data
│
├── models/
│   ├── __init__.py
│   └── models.py             ← DB models: Recruiter, Company, JobPosting,
│                                           CandidateProfile, Application
│
├── routes/
│   ├── __init__.py
│   ├── auth.py               ← Register / Login / Logout
│   ├── company.py            ← FR-12: Company Profile Management
│   ├── jobs.py               ← FR-13: Job Posting Management
│   ├── applicants.py         ← FR-14: Applicant Management
│   └── candidates.py         ← FR-15: Candidate Search
│
├── templates/
│   ├── base.html             ← Sidebar layout
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   ├── company/
│   │   ├── dashboard.html
│   │   └── profile.html      ← FR-12
│   ├── jobs/
│   │   ├── list.html         ← FR-13
│   │   ├── form.html         ← Create / Edit job
│   │   └── detail.html
│   ├── applicants/
│   │   ├── list.html         ← FR-14
│   │   └── candidate_view.html
│   └── candidates/
│       └── search.html       ← FR-15
│
└── static/
    └── uploads/
        └── logos/            ← Company logo uploads stored here
=======
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




## ⚙️ Setup & Run

### 1. Create virtual environment
```bash
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate      # Mac/Linux
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the app
```bash
python app.py
```

### 4. (Optional) Load test data
```bash
python seed_data.py
```
Then login with: `priya@techcorp.com` / `password123`

### 5. Open in browser
```
http://localhost:5000/auth/login
```

---

## 🔗 URL Routes

| Feature             | URL                             |
|---------------------|---------------------------------|
| Login               | /auth/login                     |
| Register            | /auth/register                  |
| Dashboard           | /company/dashboard              |
| Company Profile     | /company/profile                |
| Job Listings        | /jobs/                          |
| Create Job          | /jobs/create                    |
| Edit Job            | /jobs/<id>/edit                 |
| Delete Job          | /jobs/<id>/delete  (POST)       |
| Close Job           | /jobs/<id>/close   (POST)       |
| Job Applicants      | /applicants/job/<job_id>        |
| Update App Status   | /applicants/update-status/<id>  |
| Shortlist           | /applicants/shortlist/<id>      |
| Reject              | /applicants/reject/<id>         |
| Search Candidates   | /candidates/search              |

---

## ✅ Features Implemented

### FR-12: Company Profile Management
- Create/Update company profile with name, industry, website, company size, location, description
- Logo upload with preview (PNG, JPG, GIF, WebP)

### FR-13: Job Posting Management
- Create job with title, description, skills, experience level, salary range, employment type, work mode, deadline, openings
- Edit, Delete, Close jobs
- Status: Draft / Active / Closed / Expired

### FR-14: Applicant Management
- View all applicants per job
- Filter by skill, experience, status
- Shortlist / Reject with one click
- Update status with notes (Applied → Shortlisted → Interview → Hired)

### FR-15: Candidate Search
- Search by keyword, skill, location, experience range
- Filter open-to-work candidates
- View full candidate profile

---

## 🗄️ Database
SQLite (development) — `jobportal.db` auto-created on first run.
Managed via Flask-SQLAlchemy + Flask-Migrate.
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

