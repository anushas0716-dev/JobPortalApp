import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f6f4f0;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #ff6b35;
  --accent-2: #0f766e;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.lg-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;
  padding: 56px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.lg-hero {
  background: radial-gradient(circle at top left, #fff7ed 0%, #fef3c7 38%, #ecfeff 100%);
  border-radius: 28px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow);
}
.lg-hero h1 {
  font-family: 'Fraunces', serif;
  font-size: 40px;
  margin: 0 0 12px 0;
}
.lg-hero p {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.6;
}
.lg-hero-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;
}
.lg-hero-card {
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid var(--border);
}
.lg-hero-card strong {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--accent-2);
}
.lg-hero-card span {
  font-size: 14px;
  color: var(--muted);
}
.lg-panel {
  background: var(--card);
  border-radius: 24px;
  padding: 36px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.lg-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  margin: 0 0 8px 0;
}
.lg-sub {
  color: var(--muted);
  margin-bottom: 24px;
}
.lg-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.lg-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
.lg-field input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
}
.lg-field input:focus {
  outline: 2px solid rgba(255, 107, 53, 0.2);
  border-color: var(--accent);
}
.lg-role {
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff7ed;
  margin-bottom: 18px;
}
.lg-role button {
  border: none;
  background: transparent;
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
}
.lg-role button.active {
  background: var(--accent);
  color: #fff;
}
.lg-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
}
.lg-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.lg-btn.secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.lg-error {
  margin-top: 10px;
  font-size: 13px;
  color: #b91c1c;
}
.lg-links {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.lg-links a {
  color: var(--accent-2);
  text-decoration: none;
  font-weight: 700;
}
@media (max-width: 980px) {
  .lg-shell { grid-template-columns: 1fr; padding: 32px; }
}
@media (max-width: 640px) {
  .lg-shell { padding: 20px; }
  .lg-hero-grid { grid-template-columns: 1fr; }
}
`;

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('candidate');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            localStorage.setItem('user', JSON.stringify({
                name: username || 'User',
                role,
            }));
            if (role === 'employer') {
                navigate('/company-dashboard');
            } else {
                navigate('/candidate-dashboard');
            }
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleDemo = () => {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({
            name: role === 'employer' ? 'Demo Employer' : 'Demo Candidate',
            role,
        }));
        if (role === 'employer') {
            navigate('/company-dashboard');
        } else {
            navigate('/candidate-dashboard');
        }
    };

    return (
        <>
            <style>{CSS}</style>
            <div className="lg-shell">
                <section className="lg-hero">
                    <div>
                        <h1>Welcome back to JobPortal.</h1>
                        <p>Track your applications, polish your profile, and stay visible to the right recruiters.</p>
                        <div className="lg-hero-grid">
                            <div className="lg-hero-card">
                                <strong>Fast apply</strong>
                                <span>One profile. Multiple roles.</span>
                            </div>
                            <div className="lg-hero-card">
                                <strong>Visibility</strong>
                                <span>Control what recruiters see.</span>
                            </div>
                            <div className="lg-hero-card">
                                <strong>Resumes</strong>
                                <span>Keep versions ready.</span>
                            </div>
                            <div className="lg-hero-card">
                                <strong>Insights</strong>
                                <span>See who viewed you.</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="lg-panel">
                    <h2 className="lg-title">{role === 'employer' ? 'Employer login' : 'Candidate login'}</h2>
                    <p className="lg-sub">Use your credentials or jump in with demo access.</p>

                    <div className="lg-role" role="tablist" aria-label="Select login role">
                        <button
                            type="button"
                            className={role === 'candidate' ? 'active' : ''}
                            onClick={() => setRole('candidate')}
                            aria-pressed={role === 'candidate'}
                        >
                            Candidate
                        </button>
                        <button
                            type="button"
                            className={role === 'employer' ? 'active' : ''}
                            onClick={() => setRole('employer')}
                            aria-pressed={role === 'employer'}
                        >
                            Employer
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="lg-field">
                            <label>Email or username</label>
                            <input
                                type="text"
                                placeholder="you@email.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="lg-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="lg-actions">
                            <button className="lg-btn" type="submit">Login</button>
                            <button className="lg-btn secondary" type="button" onClick={handleDemo}>
                                Demo access
                            </button>
                        </div>
                        {error && <div className="lg-error">{error}</div>}
                    </form>

                    <div className="lg-links">
                        <Link to="/forgot-password">Forgot password?</Link>
                        <Link to={role === 'employer' ? '/employer/register' : '/register'}>
                            {role === 'employer' ? 'Register company' : 'Create account'}
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Login;
