<<<<<<< HEAD
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
=======
import React, { useState, useRef } from 'react';

// ─── DUMMY OTP FOR TESTING ──────────────────────────────
// Use 123456 to bypass the real API and move to the next step.
// Remove DUMMY_OTP and the if-block below when your backend is ready.
const DUMMY_OTP = '123456';
// ────────────────────────────────────────────────────────

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(''));
      inputs.current[5].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    // ── DUMMY CHECK (remove this block when backend is ready) ──
    if (code === DUMMY_OTP) {
      setLoading(true);
      // Simulate a short network delay so it feels real
      await new Promise(res => setTimeout(res, 800));
      setLoading(false);
      window.location.href = '/account-verified';
      return;
    }
    // ──────────────────────────────────────────────────────────

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: code }),
      });
      if (response.ok) {
        window.location.href = '/account-verified';
      } else {
        setError('Invalid OTP. Please check the code and try again.');
        setOtp(['', '', '', '', '', '']);
        inputs.current[0].focus();
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setResent(true);
    setError('');
    setOtp(['', '', '', '', '', '']);
    inputs.current[0].focus();
    setTimeout(() => setResent(false), 3000);
  };

  const allFilled = otp.every(d => d !== '');

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#fbfbfb', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .otp-input {
          width: 48px; height: 56px;
          background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 8px;
          text-align: center; font-size: 20px; font-weight: 700;
          font-family: 'Inter', sans-serif; color: #0F172A;
          outline: none; transition: all 0.2s;
        }
        .otp-input:focus { border-color: #137FEC; background: #fff; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .otp-input:not(:placeholder-shown) { border-color: #137FEC; background: #fff; }
        .otp-input.error { border-color: #EF4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
        .btn-verify {
          width: 100%; height: 48px; background: #137FEC;
          color: #fff; border: none; border-radius: 8px;
          font-size: 16px; font-weight: 700; cursor: pointer;
          font-family: 'Inter', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2);
          transition: background 0.2s, opacity 0.2s;
        }
        .btn-verify:hover:not(:disabled) { background: #0e6fd4; }
        .btn-verify:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-resend {
          background: none; border: none; cursor: pointer;
          font-size: 14px; font-weight: 600; color: #137FEC;
          font-family: 'Inter', sans-serif;
          display: flex; align-items: center; gap: 4px;
          transition: opacity 0.15s;
        }
        .btn-resend:hover { opacity: 0.75; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 160px', height: '73px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '6px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>JobPortal</span>
        </div>
        <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>?</button>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 32px' }}>
        <div style={{
          background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
          width: '480px', maxWidth: '480px',
          boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>

          {/* Top Blue Banner */}
          <div style={{
            background: 'rgba(19,127,236,0.1)', height: '128px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(51.76% 193.3% at 50% 50%, #137FEC 0%, rgba(227,233,233,0) 50%)',
              opacity: 0.2
            }} />
            <div style={{
              background: '#FFFFFF', borderRadius: '9999px', padding: '16px',
              boxShadow: '0px 4px 6px -1px rgba(17,4,4,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 1
            }}>
              <span style={{ fontSize: '28px' }}>✉️</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.6px', textAlign: 'center' }}>
                Verify your identity
              </h1>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px', textAlign: 'center' }}>
                We've sent a 6-digit verification code to{' '}
                <strong style={{ color: '#0F172A' }}>m***@example.com</strong>.
                <br />Please enter it below to secure your account.
              </p>

              {/* Dev hint — remove before production */}
              <div style={{ background: '#FEF9C3', border: '1px solid #FDE68A', borderRadius: 8, padding: '8px 12px', marginTop: 4 }}>
                <p style={{ fontSize: 12, color: '#92400E', textAlign: 'center' }}>
                  🧪 <strong>Dev mode:</strong> Use <code style={{ background: '#FDE68A', padding: '1px 4px', borderRadius: 3 }}>123456</code> to skip the API and continue.
                </p>
              </div>
            </div>

            {/* OTP Inputs */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputs.current[index] = el}
                    className={`otp-input${error ? ' error' : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    placeholder="·"
                    onChange={e => handleChange(e.target.value, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
            </div>

            {/* Inline error */}
            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginTop: -8 }}>
                <span style={{ fontSize: 14 }}>⚠️</span>
                <p style={{ fontSize: 13, color: '#DC2626' }}>{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                className="btn-verify"
                onClick={handleVerify}
                disabled={loading || !allFilled}
              >
                {loading ? '⏳ Verifying...' : 'Verify Account →'}
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontSize: '14px', color: '#64748B' }}>Didn't receive the code?</p>
                <button className="btn-resend" onClick={handleResend}>
                  🔄 {resent ? 'Code Sent! ✓' : 'Resend Code'}
                </button>
              </div>
            </div>

            {/* Footer info */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>🔒</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>End-to-end encrypted</span>
              </div>
              <div style={{ width: '4px', height: '4px', background: '#CBD5E1', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>🛡️</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Identity verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px 160px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#64748B' }}>© 2024 SecureGuard Verification Services. All rights reserved.</p>
      </div>
    </div>
  );
};

export default OtpVerification;
>>>>>>> upstream/jobportelteam
