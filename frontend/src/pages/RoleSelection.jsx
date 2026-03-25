import React from 'react';

const RoleSelection = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .role-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); transition: all 0.2s; cursor: pointer; flex: 1; }
        .role-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
        .select-btn { width: 100%; padding: 16px; background: #137FEC; color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; }
        .select-btn:hover { background: #0f6fd4; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '65px',
        background: '#fff', borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '6px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobPortal</span>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          style={{ background: '#F1F5F9', color: '#0F172A', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
        >Login</button>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 32px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0F172A', marginBottom: '16px', letterSpacing: '-1px' }}>
            Welcome!
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', lineHeight: '1.6' }}>
            To provide the best experience, please select your role to get started with your career journey.
          </p>
        </div>

        {/* Role Cards */}
        <div style={{ display: 'flex', gap: '24px', maxWidth: '900px', width: '100%' }}>

          {/* Job Seeker Card */}
          <div className="role-card" onClick={() => window.location.href = '/register'}>
            {/* Image */}
            <div style={{
              height: '220px', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: '80px', marginBottom: '8px' }}>👨‍💼</div>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Professional seeking opportunities</p>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(19,127,236,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                  👤
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>I am a Job Seeker</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7', marginBottom: '24px' }}>
                Discover your dream job, connect with top companies, and manage your applications in one place. Your next career move starts here.
              </p>
              <button className="select-btn">Select Job Seeker</button>
            </div>
          </div>

          {/* Employer Card */}
          <div className="role-card" onClick={() => window.location.href = '/employer/register'}>
            {/* Image */}
            <div style={{
              height: '220px', background: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: '80px', marginBottom: '8px' }}>🏢</div>
                <p style={{ fontSize: '13px', color: '#93c5fd' }}>Companies building great teams</p>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(19,127,236,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                  💼
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>I am an Employer</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7', marginBottom: '24px' }}>
                Post job openings, browse qualified candidates, and build your winning team with ease. Find the talent your company deserves.
              </p>
              <button className="select-btn">Select Employer</button>
            </div>
          </div>
        </div>

        {/* Already have account */}
        <p style={{ marginTop: '40px', fontSize: '15px', color: '#64748B' }}>
          Already have an account?{' '}
          <a href="/" style={{ color: '#137FEC', fontWeight: '600', textDecoration: 'none' }}>Log in here</a>
        </p>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid #E2E8F0' }}>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>© 2024 JobPortal. All rights reserved.</p>
      </div>
    </div>
  );
};

export default RoleSelection;