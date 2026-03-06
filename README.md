<<<<<<< HEAD
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
=======
HEAD
HEAD
# 📄 HR Resume API

A production-ready REST API that allows candidates to submit resumes and HR teams to manage applications end-to-end.

---

## 🏗️ Project Structure

```
hr-resume-api/
├── src/
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── multer.js          # File upload config
│   ├── controllers/
│   │   ├── authController.js  # HR login/register
│   │   └── resumeController.js # All resume logic
│   ├── middleware/
│   │   ├── auth.js            # JWT protect + role guard
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── User.js            # HR user schema
│   │   └── Resume.js          # Resume/application schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── resumeRoutes.js
│   ├── utils/
│   │   └── emailService.js    # Nodemailer notifications
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point
├── uploads/resumes/           # Stored resume files
├── tests/
│   └── api.test.js
├── .env.example
└── package.json

upstream/jobportelteam
## JobPortalApp – Auth API Usage

This project is a Django-based job portal. Below are the commands to test the authentication features **FR-02 (Login)** and **FR-03 (Password Management)** that are implemented in the `users` app.

All commands assume:

- You are in the project root: `/Users/amish/JobPortalApp`
- Your virtual environment is at `.venv`
- The server runs on port **8001**

### 1. Setup and run server

```bash
cd /Users/amish/JobPortalApp
python3 -m venv .venv
source .venv/bin/activate
pip install django
python manage.py migrate
python manage.py createsuperuser  # create an admin/user account
python manage.py runserver 8001
HEAD
upstream/jobportelteam
upstream/jobportelteam
>>>>>>> a997018094b650bf61e68abebfd4f4578a474923
```

---

<<<<<<< HEAD
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
=======
HEAD
HEAD
## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI, email credentials, and JWT secret
```

### 3. Run the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 4. Run tests
```bash
npm test
```

---

## 🌐 API Endpoints

### Public (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/resumes/submit` | **Candidate submits resume** |
| `GET` | `/api/resumes/status/:token` | Candidate checks application status |
| `POST` | `/api/auth/register` | Register HR user |
| `POST` | `/api/auth/login` | HR login → JWT token |

### Protected (HR Auth Required — Bearer Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/me` | Get current HR user |
| `GET` | `/api/resumes/stats` | Dashboard statistics |
| `GET` | `/api/resumes` | List all resumes (filters + pagination) |
| `GET` | `/api/resumes/:id` | View single resume detail |
| `GET` | `/api/resumes/:id/download` | Download resume file |
| `PATCH` | `/api/resumes/:id/status` | Update application status |
| `POST` | `/api/resumes/:id/notes` | Add HR note |
| `PATCH` | `/api/resumes/:id/assign` | Assign to HR member |
| `DELETE` | `/api/resumes/:id` | Delete resume (admin only) |

---

## 📤 Candidate Resume Submission

**`POST /api/resumes/submit`** — `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `resume` | File | ✅ | PDF, DOC, or DOCX (max 5MB) |
| `name` | string | ✅ | Candidate full name |
| `email` | string | ✅ | Candidate email |
| `phone` | string | | Phone number |
| `jobTitle` | string | ✅ | Position applying for |
| `department` | string | | Department name |
| `jobId` | string | | Job listing ID |
| `yearsOfExperience` | number | | Years of experience |
| `expectedSalary` | string | | Expected salary range |
| `coverLetter` | string | | Cover letter text |
| `linkedin` | string | | LinkedIn URL |
| `portfolio` | string | | Portfolio URL |

**Response:**
```json
{
  "success": true,
  "message": "Resume submitted successfully!",
  "data": {
    "submissionToken": "A1B2C3D4E5F6",
    "applicationId": "65abc123...",
    "candidateName": "Jane Smith",
    "jobTitle": "Frontend Developer",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🔄 Application Status Flow

```
pending → reviewing → shortlisted → hired
                   ↘ rejected
```

Candidates receive email notifications when status changes.

---

## 📋 HR: List Resumes with Filters

**`GET /api/resumes?status=pending&jobTitle=engineer&page=1&limit=10`**

| Query Param | Description |
|-------------|-------------|
| `status` | Filter by status (pending/reviewing/shortlisted/rejected/hired) |
| `jobTitle` | Search by job title (partial match) |
| `department` | Filter by department |
| `page` | Page number (default: 1) |
| `limit` | Items per page (default: 10) |
| `sortBy` | Field to sort by (default: createdAt) |
| `order` | asc or desc (default: desc) |

---

## 📧 Email Notifications

The system automatically sends:
- ✅ **Confirmation email to candidate** on submission (with reference token)
- 📬 **Alert to HR team** on new submission
- 🔔 **Status update to candidate** when HR changes status (reviewing/shortlisted/rejected/hired)

---

## 🔐 Authentication

All HR routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Roles:
- `hr` — Can view, update, and manage resumes
- `admin` — All HR permissions + delete resumes

---

## 🧪 Example: Submit with cURL

```bash
curl -X POST http://localhost:3000/api/resumes/submit \
  -F "resume=@/path/to/resume.pdf" \
  -F "name=Jane Smith" \
  -F "email=jane@example.com" \
  -F "phone=+1-555-1234" \
  -F "jobTitle=Backend Engineer" \
  -F "department=Engineering" \
  -F "yearsOfExperience=4" \
  -F "coverLetter=I am excited to apply..."
```

---

## 🧰 Tech Stack

- **Runtime**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: express-validator
- **Testing**: Jest + Supertest
upstream/jobportelteam
### 2. FR-02 – Login

**Endpoint:** `POST /api/users/login/`  
**Description:** Users log in with registered credentials. Invalid attempts return errors. Optional `remember_me` flag controls session persistence.

#### 2.1 Invalid login (should fail)

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/login/ \
  -d '{"username":"amish","password":"WRONG_PASSWORD","remember_me":true}'
```

Expected response (HTTP 400):

```json
{"success": false, "error": "Invalid credentials."}
```

#### 2.2 Valid login (should succeed and set cookies)

```bash
curl -i -c cookies.txt -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/login/ \
  -d '{"username":"amish","password":"NewPass123!","remember_me":true}'
```

- `-c cookies.txt` saves session cookies for later requests.
- On success you get `{"success": true, "user": {...}}`.

#### 2.3 Profile with active session

```bash
curl -i -b cookies.txt http://127.0.0.1:8001/api/users/profile/
```

Expected (HTTP 200):

```json
{"success": true, "user": { "id": 1, "username": "amish", "email": "amishraj2706@gmail.com", "role": "" }}
```

If you see `{"success": false, "error": "Authentication required."}`, it means there is no valid session (login failed or cookies not sent).

---

### 3. FR-03 – Password Management (Email/OTP + Secure Reset)

FR-03 is implemented using:

- `POST /api/users/password-reset/request/` – generate and send OTP
- `POST /api/users/password-reset/confirm/` – verify OTP and set new password

The project uses Django’s **console email backend**, so OTPs are printed to the terminal where `python manage.py runserver 8001` is running, not sent to a real mailbox.

#### 3.1 Request password reset OTP

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/password-reset/request/ \
  -d '{"email":"amishraj2706@gmail.com"}'
```

Expected (HTTP 200):

```json
{"success": true, "message": "If this email is registered, an OTP has been sent."}
```

Then, in the **runserver terminal**, look for an email-like message:

```text
Subject: Your password reset code
To: amishraj2706@gmail.com

Your password reset OTP is: 585869
```

#### 3.2 Confirm password reset with OTP

Replace `585869` with the real OTP from the console:

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/password-reset/confirm/ \
  -d '{"email":"amishraj2706@gmail.com","otp":"585869","new_password":"NewPass123!"}'
```

Expected (HTTP 200):

```json
{"success": true, "message": "Password has been reset successfully."}
```

If the OTP is wrong or expired, you will get:

```json
{"success": false, "error": "Invalid or expired OTP."}
```

#### 3.3 Verify new password

Old password (should now fail):

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/login/ \
  -d '{"username":"amish","password":"OLD_PASSWORD","remember_me":true}'
```

New password (should succeed):

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/login/ \
  -d '{"username":"amish","password":"NewPass123!","remember_me":true}'
```

On success you again receive `{"success": true, "user": {...}}`, confirming FR‑02 and FR‑03 end‑to‑end.
HEAD
upstream/jobportelteam
upstream/jobportelteam
>>>>>>> a997018094b650bf61e68abebfd4f4578a474923
