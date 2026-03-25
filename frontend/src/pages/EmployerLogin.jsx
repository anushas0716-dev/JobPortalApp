import React, { useState } from 'react';

const EmployerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  const trustedLogos = [
    { bg: '#E2E8F0', label: 'G' },
    { bg: '#D1FAE5', label: 'S' },
    { bg: '#DBEAFE', label: 'A' },
  ];

  const footerLinks = ['Privacy Policy', 'Terms of Service', 'Help Center', 'Contact Sales'];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #94A3B8; }
        input:focus { outline: none; border-color: #137FEC !important; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .sso-btn { width: 100%; height: 48px; display: flex; align-items: center; justify-content: center; gap: 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; color: #334155; cursor: pointer; transition: background 0.15s, box-shadow 0.15s; }
        .sso-btn:hover { background: #F8FAFC; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
        .btn-primary { width: 100%; height: 56px; display: flex; align-items: center; justify-content: center; gap: 8px; background: #137FEC; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; color: #fff; cursor: pointer; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-primary:hover { background: #0e6fd4; }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; }
        .nav-link:hover { color: #137FEC; }
        .footer-link { font-size: 14px; font-weight: 500; color: #64748B; text-decoration: none; }
        .footer-link:hover { color: #137FEC; }
        .eye-btn { background: none; border: none; cursor: pointer; color: #94A3B8; padding: 0; display: flex; align-items: center; font-size: 16px; }
        .eye-btn:hover { color: #64748B; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 40px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Logo + "For Employers" badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', color: '#137FEC' }}>⊞</span>
            <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>JobPortal</span>
          </div>
          <span style={{
            background: 'rgba(19,127,236,0.1)', color: '#137FEC',
            fontSize: '14px', fontWeight: 500, letterSpacing: '-0.45px',
            padding: '0.5px 8px', borderRadius: '9999px',
          }}>For Employers</span>
        </div>

        {/* Right nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#" className="nav-link">New here?</a>
          <button style={{
            background: '#137FEC', border: 'none', borderRadius: '8px',
            fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: '#fff',
            cursor: 'pointer', padding: '0 16px', height: 40,
          }}>Post a Job</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
        <div style={{ width: '480px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* BRANDING */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', position: 'relative', height: '156px' }}>
            {/* Shield icon */}
            <div style={{
              position: 'absolute', top: 0,
              width: 48, height: 54,
              background: 'rgba(19,127,236,0.1)', borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px',
            }}>🛡️</div>
            {/* Heading */}
            <div style={{ position: 'absolute', top: 88, left: 0, right: 0, textAlign: 'center' }}>
              <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>
                Employer Login
              </h1>
            </div>
            {/* Subtitle */}
            <div style={{ position: 'absolute', top: 132, left: 0, right: 0, textAlign: 'center' }}>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>
                Manage your talent pipeline and reach top candidates.
              </p>
            </div>
          </div>

          {/* SSO BUTTONS */}
          <div style={{ position: 'relative', height: '108px' }}>
            {/* Google */}
            <button className="sso-btn" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
              <span style={{
                width: 20, height: 20, background: '#1a1a1a',
                borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', color: '#fff', fontWeight: 700, flexShrink: 0,
              }}>G</span>
              Continue with Google
            </button>
            {/* SSO */}
            <button className="sso-btn" style={{ position: 'absolute', top: 60, left: 0, right: 0 }}>
              <span style={{ fontSize: '18px', color: '#137FEC' }}>💼</span>
              Sign in with SSO
            </button>
          </div>

          {/* DIVIDER */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', gap: '0' }}>
            <div style={{ flex: 1, borderTop: '1px solid #E2E8F0' }} />
            <div style={{ padding: '0 16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                Or use email
              </span>
            </div>
            <div style={{ flex: 1, borderTop: '1px solid #E2E8F0' }} />
          </div>

          {/* LOGIN FORM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', padding: '0 4px' }}>
                Professional Email
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#94A3B8', pointerEvents: 'none' }}>✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  style={{
                    width: '100%', height: 53, padding: '16px 16px 16px 48px',
                    background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
                    fontSize: '16px', color: '#0F172A',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Password</label>
                <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: '#137FEC' }}>Forgot?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#94A3B8', pointerEvents: 'none' }}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', height: 53, padding: '16px 48px',
                    background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
                    fontSize: '16px', color: '#0F172A',
                  }}
                />
                <button
                  className="eye-btn"
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 4px' }}>
              <input
                type="checkbox" id="remember"
                checked={remember} onChange={e => setRemember(e.target.checked)}
                style={{ width: 16, height: 16, border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', accentColor: '#137FEC', flexShrink: 0 }}
              />
              <label htmlFor="remember" style={{ fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>
                Keep me logged in for 30 days
              </label>
            </div>

            {/* Submit */}
            <button className="btn-primary">
              Access Dashboard →
            </button>
          </div>

          {/* TRUST BAR */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              Trusted by hiring teams at
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', opacity: 0.4 }}>
              {trustedLogos.map((logo, i) => (
                <div key={i} style={{
                  width: 56, height: 20, background: logo.bg,
                  borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700, color: '#64748B',
                }}>{logo.label}</div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #F1F5F9', padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {footerLinks.map((link, i) => (
            <React.Fragment key={link}>
              <a href="#" className="footer-link">{link}</a>
              {i < footerLinks.length - 1 && (
                <span style={{ color: '#CBD5E1', fontSize: '14px' }}>•</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center' }}>
          © 2024 JobPortal Inc. Secure Employer Gateway.
        </p>
      </footer>
    </div>
  );
};

export default EmployerLogin;