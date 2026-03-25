import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountVerified = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .check-circle { animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .card-content { animation: fadeUp 0.5s ease 0.3s forwards; opacity: 0; }
        .btn-primary { width: 100%; height: 56px; background: #137FEC; color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s; }
        .btn-primary:hover { background: #0f6fd4; }
        .btn-secondary { width: 100%; height: 56px; background: rgba(19,127,236,0.1); color: #137FEC; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; }
        .btn-secondary:hover { background: rgba(19,127,236,0.15); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 160px', height: '73px', background: '#F6F7F8', borderBottom: '1px solid rgba(19,127,236,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            onClick={() => navigate('/landing')}
            style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{ color: '#137FEC', fontSize: '14px' }}>🛡️</span>
          </div>

          <span
            onClick={() => navigate('/landing')}
            style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A', cursor: 'pointer' }}
          >
            Identity Hub
          </span>
        </div>

        <button
          onClick={() => navigate('/welcome')}
          style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.1)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#0F172A', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ✕
        </button>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid rgba(19,127,236,0.05)', borderRadius: '12px', padding: '32px', width: '480px', maxWidth: '480px', boxShadow: '0px 20px 25px -5px rgba(19,127,236,0.05), 0px 8px 10px -6px rgba(19,127,236,0.05)', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Check Icon */}
          <div className="check-circle" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', width: '144px', height: '144px', background: 'rgba(19,127,236,0.2)', filter: 'blur(20px)', borderRadius: '50%', top: '-24px' }} />
            <div style={{ width: '96px', height: '96px', background: '#137FEC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.3)', position: 'relative', zIndex: 1 }}>
              <span style={{ color: '#fff', fontSize: '40px', fontWeight: '900' }}>✓</span>
            </div>
          </div>

          {/* Title */}
          <div className="card-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A' }}>Account Verified!</h1>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              Your identity has been successfully confirmed. You now have full access to all premium features and secure transactions.
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button className="btn-primary" onClick={() => navigate('/candidate-dashboard')}>
              Get Started →
            </button>

            <button className="btn-secondary" onClick={() => navigate('/candidate-profile')}>
              View Profile
            </button>
          </div>

          {/* Help */}
          <div style={{ borderTop: '1px solid rgba(19,127,236,0.05)', paddingTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Need help?{' '}
              <span onClick={() => navigate('/admin/support')} style={{ color: '#137FEC', fontWeight: '600', cursor: 'pointer' }}>
                Contact Support
              </span>
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: '500', color: '#94A3B8', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
          © 2024 Identity Hub Security Systems
        </p>
      </div>
    </div>
  );
};

export default AccountVerified;