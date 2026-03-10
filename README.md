jobprotelitem
# JobPortalApp — HR Resume Filter

## Project Structure
```
JobPortalApp/
├── app.py                    ← Flask app entry point
├── seed_data.py              ← Populate DB with test data
├── requirements.txt
├── backend/
│   └── config.py             ← App configuration
├── models/
│   ├── user_model.py
│   ├── employer_model.py
│   ├── candidate_model.py
│   ├── job_model.py
│   ├── resume_model.py
│   └── application_model.py
├── routes/
│   ├── auth_routes.py
│   ├── employer_routes.py
│   ├── candidate_routes.py
│   ├── job_routes.py
│   ├── resume_routes.py
│   └── hr_filter_routes.py   ← ⭐ HR Resume Filter (main feature)
└── static/resumes/           ← Uploaded resume files stored here
```

---

## Setup & Run

```bash
# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Seed test data
python seed_data.py

# 4. Run the app
python app.py

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
```

---

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
jobportelteam
```

#### 2.2 Valid login (should succeed and set cookies)

jobprotelitem
## HR Resume Filter API

### 1. Login as HR
```
POST /api/auth/login
{
  "email": "hr@techcorp.com",
  "password": "password123"
}
```

### 2. Filter Resumes for a Job
```
GET /api/hr/filter/1
```
With filters:
```
GET /api/hr/filter/1?min_score=50&sort_by=score&location=Bangalore
GET /api/hr/filter/1?required_skills=Python,Flask&min_experience=2
GET /api/hr/filter/1?education=Bachelor&per_page=5&page=1
```

### 3. Score One Resume Against a Job
```
GET /api/hr/score/<resume_id>/<job_id>
```

### 4. Shortlist / Reject / Hire a Candidate
```
PATCH /api/hr/application/<application_id>/status
{
  "status": "shortlisted",
  "hr_notes": "Strong Python skills, schedule interview"
}
```
Valid statuses: `applied → reviewed → shortlisted → rejected → hired`

### 5. View All Shortlisted Candidates
```
GET /api/hr/shortlist/<job_id>

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
jobportelteam
```

Expected (HTTP 200):

jobprotelitem
## Scoring System (out of 100)

| Criteria   | Max Score | Logic                                      |
|------------|----------|--------------------------------------------|
| Skills     | 50 pts   | % of required skills matched               |
| Experience | 30 pts   | Full if meets requirement, partial if close |
| Education  | 20 pts   | Mapped: High School → Diploma → Bachelor → Master → PhD |

**Verdict:**
- ≥ 70 → Strong Match
- ≥ 40 → Moderate Match
- < 40 → Weak Match

```json
{"success": true, "message": "Password has been reset successfully."}
```

If the OTP is wrong or expired, you will get:

```json
{"success": false, "error": "Invalid or expired OTP."}
```

#### 3.3 Verify new password

Old password (should now fail):
jobportelteam

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/login/ \
  -d '{"username":"amish","password":"OLD_PASSWORD","remember_me":true}'
```

New password (should succeed):

jobprotelitem
## All API Endpoints

```bash
curl -i -H "Content-Type: application/json" \
  -X POST http://127.0.0.1:8001/api/users/login/ \
  -d '{"username":"amish","password":"NewPass123!","remember_me":true}'
```

On success you again receive `{"success": true, "user": {...}}`, confirming FR‑02 and FR‑03 end‑to‑end.
jobportelteam

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| GET | /api/jobs/ | List all jobs |
| POST | /api/jobs/ | Create job (employer/hr) |
| POST | /api/resumes/ | Upload resume (candidate) |
| POST | /api/candidate/apply | Apply to a job |
| GET | /api/hr/filter/<job_id> | **HR filter resumes** |
| GET | /api/hr/score/<resume_id>/<job_id> | **Score one resume** |
| PATCH | /api/hr/application/<id>/status | **Update status** |
| GET | /api/hr/shortlist/<job_id> | **View shortlisted** |
