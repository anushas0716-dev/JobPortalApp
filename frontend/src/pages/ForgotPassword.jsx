import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f6f2ee;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #0f766e;
  --accent-2: #f97316;
  --border: #e5e7eb;
  --shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.fp-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  font-family: 'Nunito', sans-serif;
}
.fp-card {
  width: min(560px, 100%);
  background: var(--card);
  border-radius: 24px;
  padding: 36px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}
.fp-card::before {
  content: '';
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, #d1fae5 0%, transparent 70%);
  top: -80px;
  right: -80px;
  opacity: 0.8;
}
.fp-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  margin-bottom: 8px;
  position: relative;
}
.fp-sub {
  color: var(--muted);
  margin-bottom: 22px;
  line-height: 1.6;
  position: relative;
}
.fp-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #ecfeff;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 18px;
}
.fp-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.fp-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
.fp-field input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
}
.fp-field input:focus {
  outline: 2px solid rgba(15, 118, 110, 0.2);
  border-color: var(--accent);
}
.fp-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
}
.fp-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.fp-btn.secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.fp-message { margin-top: 12px; font-size: 13px; color: #047857; }
.fp-link { margin-top: 18px; font-size: 13px; color: var(--muted); }
.fp-link a { color: var(--accent-2); text-decoration: none; font-weight: 700; }
`;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    sessionStorage.setItem("reset_email", email);
    setMessage("OTP sent to your email. Continue to verification.");
    setTimeout(() => navigate("/otp-verification"), 800);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="fp-shell">
        <div className="fp-card">
          <div className="fp-step">Step 1 of 3 · Send OTP</div>
          <h2 className="fp-title">Forgot your password?</h2>
          <p className="fp-sub">
            Enter your email and we will send a one-time code to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="fp-field">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>
            <div className="fp-actions">
              <button className="fp-btn" type="submit">Send OTP</button>
              <Link className="fp-btn secondary" to="/">Back to login</Link>
            </div>
          </form>
          {message && <div className="fp-message">{message}</div>}
          <div className="fp-link">
            Already have a code? <Link to="/otp-verification">Verify OTP</Link>
          </div>
        </div>
      </div>
    </>
  );
}
