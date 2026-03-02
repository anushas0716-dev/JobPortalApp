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

