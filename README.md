# TalentFlow – HR Resume Management System

A full-stack application with a Node.js/Express backend API and a React frontend for managing job applications.

---

## Project Structure

```
hr-resume-api/       ← Backend (Express + MongoDB)
hr-resume-frontend/  ← Frontend (React + Vite)
```

---

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
