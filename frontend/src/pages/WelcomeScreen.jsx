import React from 'react';

const WelcomeScreen = () => {
  const userName = JSON.parse(localStorage.getItem('user') || '{}')?.full_name || 'Alex';

  const features = [
    { icon: '⊞', title: 'Unified View', desc: 'All your data in one simple dashboard.' },
    { icon: '📈', title: 'Deep Insights', desc: 'Analytics that help you make better decisions.' },
    { icon: '👥', title: 'Collaboration', desc: 'Connect with your team instantly.' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes sparkle { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        .feature-card { background: #fff; border-radius: 16px; padding: 32px 24px; text-align: center; flex: 1; transition: all 0.2s; }
        .feature-card:hover { box-shadow: 0 8px 24px rgba(19,127,236,0.1); transform: translateY(-2px); }
        .btn-primary { background: #137FEC; color: #fff; border: none; padding: '16px 32px'; border-radius: '12px'; font-size: '16px'; font-weight: '700'; cursor: pointer; font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 8px; transition: background 0.2s; }
        .btn-primary:hover { background: #0f6fd4; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '65px',
        background: '#F6F7F8', borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>🚀</span>
          <span style={{ fontWeight: '700', fontSize: '20px', color: '#0F172A' }}>Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748B' }}>🔔</button>
          <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>👤</span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 32px' }}>

        {/* Hero Banner */}
        <div style={{
          width: '100%', maxWidth: '700px', height: '280px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #137FEC 50%, #60a5fa 100%)',
          borderRadius: '20px', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '0'
        }}>
          {/* Sparkle icons */}
          <div className="sparkle" style={{ position: 'absolute', top: '40%', left: '42%', color: 'rgba(255,255,255,0.7)', fontSize: '48px' }}>✦</div>
          <div className="sparkle" style={{ position: 'absolute', top: '25%', left: '52%', color: 'rgba(255,255,255,0.5)', fontSize: '28px', animationDelay: '0.5s' }}>✦</div>
          <div className="sparkle" style={{ position: 'absolute', top: '55%', left: '55%', color: 'rgba(255,255,255,0.4)', fontSize: '20px', animationDelay: '1s' }}>✦</div>
          {/* Gradient circles */}
          <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', top: '-100px', right: '-50px' }} />
          <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', bottom: '-80px', left: '-40px' }} />
        </div>

        {/* Avatar Circle */}
        <div style={{
          width: '64px', height: '64px', background: '#137FEC',
          borderRadius: '50%', border: '4px solid #F6F7F8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: '-32px', position: 'relative', zIndex: 1,
          boxShadow: '0 4px 12px rgba(19,127,236,0.3)'
        }}>
          <span style={{ fontSize: '24px' }}>🎯</span>
        </div>

        {/* Welcome Text */}
        <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '32px', maxWidth: '600px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Welcome, <span style={{ color: '#137FEC' }}>{userName}</span>!
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '1.7' }}>
            We're excited to have you here. This portal is your dedicated space to manage your progress, track milestones, and achieve your professional goals effortlessly.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
          <button
            onClick={() => window.location.href = '/candidate-dashboard'}
            style={{
              background: '#137FEC', color: '#fff', border: 'none',
              padding: '16px 32px', borderRadius: '12px', fontSize: '16px',
              fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            Start Your Journey →
          </button>
          <button
            onClick={() => window.location.href = '/onboarding'}
            style={{
              background: '#fff', color: '#64748B', border: '1px solid #E2E8F0',
              padding: '16px 32px', borderRadius: '12px', fontSize: '16px',
              fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
            }}
          >
            View Tour
          </button>
        </div>

        {/* Feature Cards */}
        <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '700px' }}>
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div style={{ fontSize: '28px', color: '#137FEC', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '32px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '8px' }}>
          {['Support', 'Privacy', 'Terms'].map(link => (
            <a key={link} href="#" style={{ fontSize: '14px', color: '#94A3B8', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>© 2024 Portal Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;