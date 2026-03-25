import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f5f3ff;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #7c3aed;
  --accent-2: #0f766e;
  --border: #e5e7eb;
  --shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.ov-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  font-family: 'Nunito', sans-serif;
}
.ov-card {
  width: min(560px, 100%);
  background: var(--card);
  border-radius: 24px;
  padding: 36px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}
.ov-card::before {
  content: '';
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, #ddd6fe 0%, transparent 70%);
  bottom: -90px;
  left: -70px;
  opacity: 0.8;
}
.ov-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  margin-bottom: 8px;
  position: relative;
}
.ov-sub {
  color: var(--muted);
  margin-bottom: 22px;
  line-height: 1.6;
  position: relative;
}
.ov-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #ede9fe;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 18px;
}
.ov-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.ov-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
.ov-field input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
}
.ov-field input:focus {
  outline: 2px solid rgba(124, 58, 237, 0.2);
  border-color: var(--accent);
}
.ov-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
}
.ov-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.ov-btn.secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.ov-message { margin-top: 12px; font-size: 13px; color: #047857; }
.ov-link { margin-top: 18px; font-size: 13px; color: var(--muted); }
.ov-link a { color: var(--accent-2); text-decoration: none; font-weight: 700; }
`;

export default function OtpVerification() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("reset_email") || "";
    const storedOtp = sessionStorage.getItem("reset_otp") || "";
    setEmail(storedEmail);
    setOtp(storedOtp);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !otp) return;
    sessionStorage.setItem("reset_email", email);
    sessionStorage.setItem("reset_otp", otp);
    setMessage("OTP saved. Continue to reset your password.");
    setTimeout(() => navigate("/reset-password"), 800);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ov-shell">
        <div className="ov-card">
          <div className="ov-step">Step 2 of 3 · Verify OTP</div>
          <h2 className="ov-title">OTP verification</h2>
          <p className="ov-sub">Enter the code sent to your email to continue.</p>
          <form onSubmit={handleSubmit}>
            <div className="ov-field">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>
            <div className="ov-field">
              <label>OTP code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
              />
            </div>
            <div className="ov-actions">
              <button className="ov-btn" type="submit">Verify</button>
              <Link className="ov-btn secondary" to="/forgot-password">Back</Link>
            </div>
          </form>
          {message && <div className="ov-message">{message}</div>}
          <div className="ov-link">
            Need a new code? <Link to="/forgot-password">Resend OTP</Link>
          </div>
        </div>
      </div>
    </>
  );
}
