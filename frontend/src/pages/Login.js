<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]         = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const navigate = useNavigate();

  // ✅ ONLY auto-fill remembered email — NO token redirect here
  useEffect(() => {
    const remembered = localStorage.getItem('rememberedEmail');
    if (remembered) {
      setEmail(remembered);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.login({ username: email, password });
      const { access, refresh } = res.data;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);

      if (remember) localStorage.setItem('rememberedEmail', email);
      else          localStorage.removeItem('rememberedEmail');

      try {
        const profileRes = await api.getProfile();
        const profile = profileRes.data;
        localStorage.setItem('user', JSON.stringify(profile));

        if (profile.role === 'employer')   navigate('/employer/dashboard',  { replace: true });
        else if (profile.role === 'admin') navigate('/admin/dashboard',     { replace: true });
        else                               navigate('/candidate-dashboard', { replace: true });
      } catch {
        navigate('/candidate-dashboard', { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.response?.data?.error || 'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 14px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 15px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field::placeholder { color: #94A3B8; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
        .social-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; font-size: 15px; font-weight: 500; color: #0F172A; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
        .social-btn:hover { background: #F8FAFC; border-color: #137FEC; }
        .sign-in-btn:hover { background: #0f6fd4 !important; }
        .emp-btn:hover { background: #F8FAFC !important; border-color: #137FEC !important; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '65px', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div onClick={() => navigate('/landing')} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '6px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobPortal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#64748B' }}>Don't have an account?</span>
          <button onClick={() => navigate('/register')} style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', width: '100%', maxWidth: '440px', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)' }}>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Welcome Back</h1>
            <p style={{ fontSize: '15px', color: '#64748B' }}>Please enter your details to sign in</p>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#DC2626' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Social Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <button className="social-btn" onClick={() => alert('Google OAuth — coming soon!')}>
              <div style={{ width: '20px', height: '20px', background: '#4285F4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '11px', fontWeight: '800' }}>G</span>
              </div>
              Continue with Google
            </button>
            <button className="social-btn" onClick={() => alert('LinkedIn OAuth — coming soon!')}>
              <div style={{ width: '20px', height: '20px', background: '#0A66C2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: '800' }}>in</span>
              </div>
              Continue with LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500', letterSpacing: '0.05em' }}>OR CONTINUE WITH EMAIL</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>Email Address</label>
            <input className="input-field" type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyDown} autoComplete="email" />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Password</label>
              <span onClick={() => navigate('/forgot-password')} style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', cursor: 'pointer' }}>Forgot Password?</span>
            </div>
            <div style={{ position: 'relative' }}>
              <input className="input-field" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown} autoComplete="current-password" style={{ paddingRight: '48px' }} />
              <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#137FEC', cursor: 'pointer' }} />
            <label htmlFor="remember" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer' }}>Remember me for 30 days</label>
          </div>

          {/* Sign In */}
          <button onClick={handleSubmit} disabled={loading} className="sign-in-btn"
            style={{ width: '100%', padding: '14px', background: loading ? '#94A3B8' : '#137FEC', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif", marginBottom: '16px', transition: 'background 0.2s' }}>
            {loading ? '⏳ Signing in...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Employer Login */}
          <button onClick={() => navigate('/employer/login')} className="emp-btn"
            style={{ width: '100%', padding: '13px', background: '#fff', color: '#334155', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif", marginBottom: '24px', transition: 'all 0.2s' }}>
            🏢 Login as Employer
          </button>

          <p style={{ textAlign: 'center', fontSize: '14px', color: '#475569' }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} style={{ color: '#137FEC', fontWeight: '600', cursor: 'pointer' }}>Create an account</span>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '8px' }}>
          <button onClick={() => navigate('/privacy')}       style={{ fontSize: '13px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Privacy Policy</button>
          <button onClick={() => navigate('/platform')}      style={{ fontSize: '13px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Terms of Service</button>
          <button onClick={() => navigate('/admin/support')} style={{ fontSize: '13px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Help Center</button>
        </div>
        <p style={{ fontSize: '13px', color: '#64748B' }}>© 2024 JobPortal Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
>>>>>>> upstream/jobportelteam
