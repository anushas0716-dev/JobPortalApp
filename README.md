# Job Portal - Recruiter & Company Module
## FR-12 to FR-15 | Python Flask Implementation

---

## 📁 Project Structure

```
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
```

---

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
