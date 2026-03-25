import React, { useState } from 'react';

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [following, setFollowing] = useState(false);
  const [search, setSearch] = useState('');

  const tabs = ['Overview', 'Culture', 'Jobs (12)', 'Locations', 'Team'];

  const cultureCards = [
    { icon: '🤝', title: 'People First', desc: 'Comprehensive health, dental, and wellness programs.' },
    { icon: '📚', title: 'Continuous Learning', desc: 'Annual stipend for courses, conferences, and books.' },
    { icon: '🏠', title: 'Hybrid Remote', desc: 'Work from home or in our beautiful global offices.' },
  ];

  const openPositions = [
    { title: 'Senior Machine Learning Engineer', dept: 'Engineering', location: 'Remote / San Francisco' },
    { title: 'Product Designer (UI/UX)', dept: 'Design', location: 'London / Remote' },
    { title: 'Technical Account Manager', dept: 'Sales', location: 'New York' },
  ];

  const leadership = [
    { name: 'David Chen', role: 'Founder & CEO', avatar: '👨‍💼' },
    { name: 'Sarah Jenkins', role: 'Chief Technology Officer', avatar: '👩‍💻' },
    { name: 'Marcus Thompson', role: 'VP of Design', avatar: '👨‍🎨' },
  ];

  const officeImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=360&h=192&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=360&h=192&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=735&h=256&fit=crop',
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-link { font-size: 14px; font-weight: 700; cursor: pointer; padding: 0 0 12px; border: none; border-bottom: 3px solid transparent; background: none; color: #64748B; font-family: 'Inter',sans-serif; transition: all 0.15s; }
        .tab-link.active { color: #137FEC; border-bottom-color: #137FEC; }
        .pos-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: box-shadow 0.15s; }
        .pos-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '36px' }}>
            <span style={{ fontSize: '20px', color: '#137FEC' }}>🔷</span>
            <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>TechVision</span>
          </div>
          {['Culture', 'Careers', 'Locations', 'Team'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569', textDecoration: 'none', marginRight: '36px' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 16px', color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', flex: 1 }} />
          </div>
          <button style={{ padding: '0 16px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Contact Us</button>
          <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>👤</div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px 0' }}>
          {/* Company Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '128px', height: '128px', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', flexShrink: 0 }}>🔷</div>
              <div>
                <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '4px' }}>TechVision Inc.</h1>
                <p style={{ fontSize: '18px', fontWeight: '500', color: '#475569', lineHeight: '28px', marginBottom: '8px' }}>Innovating the future of AI-driven solutions.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 San Francisco, CA</span>
                  <span style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>👥 500-1000 employees</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
              <button onClick={() => setFollowing(!following)} style={{ padding: '0 34px', height: '44px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                {following ? '✓ Following' : 'Follow'}
              </button>
              <button style={{ padding: '0 16px', height: '44px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>View Website</button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #E2E8F0' }}>
            {tabs.map(t => (
              <button key={t} className={`tab-link${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 80px' }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

          {/* LEFT — Main Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* Mission */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>Our Mission</h2>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: '29px' }}>
                To empower every organization on the planet with accessible, ethical, and powerful artificial intelligence tools that solve real-world problems. We believe in building technology that enhances human potential rather than replacing it.
              </p>
            </div>

            {/* Life at TechVision */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>Life at TechVision</h2>
              {/* Photo Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {officeImages.slice(0, 2).map((src, i) => (
                    <img key={i} src={src} alt="office" style={{ width: '100%', height: '192px', objectFit: 'cover', borderRadius: '12px', display: 'block' }} onError={e => { e.target.style.background = '#E2E8F0'; e.target.src = ''; }} />
                  ))}
                </div>
                <img src={officeImages[2]} alt="office" style={{ width: '100%', height: '256px', objectFit: 'cover', borderRadius: '12px', display: 'block' }} onError={e => { e.target.style.background = '#E2E8F0'; }} />
              </div>
              {/* Culture Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '8px' }}>
                {cultureCards.map(c => (
                  <div key={c.title} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '21px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '24px', color: '#137FEC', marginBottom: '8px' }}>{c.icon}</div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{c.title}</h3>
                    <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Positions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>Open Positions</h2>
                <a href="/jobs" style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', textDecoration: 'none' }}>See all 12 jobs</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {openPositions.map(p => (
                  <div key={p.title} className="pos-card">
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{p.title}</h3>
                      <p style={{ fontSize: '14px', color: '#64748B' }}>{p.dept} • {p.location}</p>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '16px' }}>›</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ width: '347px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '40px' }}>

            {/* Locations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Locations</h2>
              {/* Map */}
              <div style={{ width: '100%', height: '160px', background: 'linear-gradient(135deg,#bfdbfe,#93c5fd)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '44px', background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>HQ – San Francisco</span>
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '28px' }}>🗺️</div>
              </div>
              {/* Office List */}
              {[{ city: 'London, UK', role: 'Innovation Hub' }, { city: 'New York, US', role: 'Sales Operations' }].map(o => (
                <div key={o.city} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🏢</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{o.city}</p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>{o.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Leadership */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Leadership</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {leadership.map(l => (
                  <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{l.avatar}</div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{l.name}</p>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>{l.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '48px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.6 }}>
            <span style={{ fontSize: '18px', color: '#137FEC' }}>🔷</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#475569', letterSpacing: '-0.35px' }}>© 2024 TechVision Inc. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyProfile;