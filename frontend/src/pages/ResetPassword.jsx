<<<<<<< HEAD
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
=======
import React, { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(newPassword);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength] || '';
  const strengthPercent = [0, 25, 50, 75, 85][strength] || 0;
  const strengthColor = ['#e2e8f0', '#ef4444', '#f59e0b', '#3b82f6', '#137FEC'][strength] || '#e2e8f0';

  const checks = [
    { label: '8+ Characters', pass: newPassword.length >= 8 },
    { label: 'Mixed Case', pass: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) },
    { label: 'Numbers', pass: /[0-9]/.test(newPassword) },
    { label: 'Special Symbol', pass: /[^a-zA-Z0-9]/.test(newPassword) },
  ];

  const handleSubmit = async () => {
    if (newPassword.length < 8) { alert('Password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { alert('Passwords do not match.'); return; }
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const response = await fetch('http://127.0.0.1:8000/api/users/reset-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      });
      if (response.ok) {
        alert('Password updated successfully!');
        window.location.href = '/';
      } else {
        alert('Reset failed. Please try again.');
      }
    } catch (err) {
      alert('Reset failed. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 14px 44px 14px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; height: 49px; }
        .input-field::placeholder { color: #6B7280; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '65px',
        background: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(19,127,236,0.1)',
        backdropFilter: 'blur(6px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '8px', width: '32px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>SecureVault</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'transparent', border: 'none', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Support</button>
          <div style={{ width: '1px', height: '16px', background: '#E2E8F0' }} />
          <button style={{ background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '8px', padding: '6px 12px', fontSize: '14px', fontWeight: '600', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛡️ Secure Mode
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '51.5px 24px' }}>
        <div style={{ width: '448px', maxWidth: '448px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Card */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(19,127,236,0.1)',
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)'
          }}>

            {/* Card Header */}
            <div style={{ padding: '32px 32px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Icon */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(19,127,236,0.1)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '28px' }}>🔄</span>
                </div>
              </div>

              {/* Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.6px', textAlign: 'center' }}>
                  Reset Password
                </h1>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px', textAlign: 'center' }}>
                  Please choose a strong password that you haven't used before.
                </p>
              </div>
            </div>

            {/* Form */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* New Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="input-field"
                    type={showNew ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <button onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>👁</button>
                </div>

                {/* Password Strength */}
                {newPassword && (
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Security Strength</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: strengthColor }}>{strengthLabel} ({strengthPercent}%)</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '6px', position: 'relative' }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${strengthPercent}%`, background: strengthColor,
                        borderRadius: '9999px', boxShadow: `0 0 8px ${strengthColor}50`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>

                    {/* Checks */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {checks.map(check => (
                        <div key={check.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '12px', color: check.pass ? '#16A34A' : '#94A3B8' }}>
                            {check.pass ? '✅' : '⭕'}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: '500', color: check.pass ? '#16A34A' : '#94A3B8' }}>
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="input-field"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{ borderColor: confirmPassword && confirmPassword !== newPassword ? '#ef4444' : '#E2E8F0' }}
                  />
                  <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>👁</button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p style={{ fontSize: '12px', color: '#ef4444' }}>Passwords do not match</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%', height: '52px', background: '#137FEC',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.25)'
                }}
              >
                Update Password →
              </button>

              {/* Back to Login */}
              <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B' }}>
                Changed your mind?{' '}
                <a href="/" style={{ color: '#137FEC', fontWeight: '600', textDecoration: 'none' }}>Back to Login</a>
              </p>
            </div>

            {/* Card Footer */}
            <div style={{ background: '#F8FAFC', borderTop: '1px solid #F1F5F9', padding: '16px 32px' }}>
              <p style={{ fontSize: '12px', color: '#64748B', textAlign: 'center', marginBottom: '8px' }}>
                Your password is encrypted before transmission
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px' }}>🛡️</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '1.2px', textTransform: 'uppercase' }}>ISO 27001</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px' }}>🔒</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '1.2px', textTransform: 'uppercase' }}>256-BIT AES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid rgba(19,127,236,0.05)', padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 SecureVault Inc. All rights reserved. Your security is our priority.</p>
      </div>
    </div>
  );
};

export default ResetPassword;
>>>>>>> upstream/jobportelteam
