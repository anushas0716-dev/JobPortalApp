import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #eef2ff;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #2563eb;
  --accent-2: #f97316;
  --border: #e5e7eb;
  --shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.rp-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  font-family: 'Nunito', sans-serif;
}
.rp-card {
  width: min(600px, 100%);
  background: var(--card);
  border-radius: 24px;
  padding: 36px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}
.rp-card::before {
  content: '';
  position: absolute;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, #c7d2fe 0%, transparent 70%);
  top: -90px;
  right: -90px;
  opacity: 0.8;
}
.rp-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  margin-bottom: 8px;
  position: relative;
}
.rp-sub {
  color: var(--muted);
  margin-bottom: 22px;
  line-height: 1.6;
  position: relative;
}
.rp-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e0e7ff;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 18px;
}
.rp-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.rp-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
.rp-field input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
}
.rp-field input:focus {
  outline: 2px solid rgba(37, 99, 235, 0.2);
  border-color: var(--accent);
}
.rp-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
}
.rp-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.rp-btn.secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.rp-message { margin-top: 12px; font-size: 13px; color: #047857; }
.rp-error { margin-top: 12px; font-size: 13px; color: #b91c1c; }
.rp-link { margin-top: 18px; font-size: 13px; color: var(--muted); }
.rp-link a { color: var(--accent-2); text-decoration: none; font-weight: 700; }
`;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(sessionStorage.getItem("reset_email") || "");
    setOtp(sessionStorage.getItem("reset_otp") || "");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !otp || !password) {
      setError("Please complete all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    sessionStorage.removeItem("reset_otp");
    setMessage("Password updated. Please log in again.");
    setTimeout(() => navigate("/"), 900);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="rp-shell">
        <div className="rp-card">
          <div className="rp-step">Step 3 of 3 · Reset password</div>
          <h2 className="rp-title">Create a new password</h2>
          <p className="rp-sub">Use the OTP you received to set a fresh password.</p>
          <form onSubmit={handleSubmit}>
            <div className="rp-field">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>
            <div className="rp-field">
              <label>OTP code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
              />
            </div>
            <div className="rp-field">
              <label>New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a new password"
              />
            </div>
            <div className="rp-field">
              <label>Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>
            <div className="rp-actions">
              <button className="rp-btn" type="submit">Reset password</button>
              <Link className="rp-btn secondary" to="/otp-verification">Back</Link>
            </div>
          </form>
          {message && <div className="rp-message">{message}</div>}
          {error && <div className="rp-error">{error}</div>}
          <div className="rp-link">
            Remembered your password? <Link to="/">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
