import React, { useState } from 'react';

const TrendingJobs = () => {
  const [activeFilter, setActiveFilter] = useState('All Trending');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');

  const filters = [
    { label: 'All Trending', icon: '📈' },
    { label: 'Engineering', icon: '<>' },
    { label: 'Design', icon: '🎨' },
    { label: 'Marketing', icon: '📣' },
  ];

  const trendingCards = [
    {
      id: 1, title: 'Senior Product Analyst', company: 'DataFlux', location: 'Remote (US)',
      badge: 'TRENDING', badgeBg: '#FFEDD5', badgeColor: '#EA580C', badgeIcon: '📈',
      barColor: '#F97316', barWidth: '85%', barLabel: '85% Full',
      salary: '$140k – $190k', views: '2.4k views', icon: '📊', iconBg: '#F8FAFC',
    },
    {
      id: 2, title: 'UX Design Manager', company: 'CreativeLabs', location: 'New York, NY',
      badge: 'HOT', badgeBg: '#FEE2E2', badgeColor: '#DC2626', badgeIcon: '🔥',
      barColor: '#EF4444', barWidth: '92%', barLabel: 'High Int.',
      salary: '$165k – $210k', views: '3.1k views', icon: '👥', iconBg: '#F8FAFC',
    },
    {
      id: 3, title: 'Full Stack Developer', company: 'Nexus Systems', location: 'Austin, TX',
      badge: 'HIGH GROWTH', badgeBg: '#DBEAFE', badgeColor: '#2563EB', badgeIcon: '🚀',
      barColor: '#137FEC', barWidth: '45%', barLabel: 'Growing',
      salary: '$120k – $160k', views: '1.2k views', icon: '💻', iconBg: '#F8FAFC',
    },
    {
      id: 4, title: 'Cybersecurity Specialist', company: 'SafeGuard', location: 'Remote',
      badge: 'TRENDING', badgeBg: '#FFEDD5', badgeColor: '#EA580C', badgeIcon: '📈',
      barColor: '#F97316', barWidth: '78%', barLabel: 'In Demand',
      salary: '$150k – $200k', views: '1.9k views', icon: '🛡️', iconBg: '#F8FAFC',
    },
    {
      id: 5, title: 'Platform Engineer', company: 'ScaleFlow', location: 'San Francisco, CA',
      badge: 'HOT', badgeBg: '#FEE2E2', badgeColor: '#DC2626', badgeIcon: '🔥',
      barColor: '#EF4444', barWidth: '95%', barLabel: 'Urgent',
      salary: '$170k – $230k', views: '4.2k views', icon: '⚡', iconBg: '#F8FAFC',
    },
    {
      id: 6, title: 'Growth Marketing Lead', company: 'ViralVibe', location: 'London, UK',
      badge: 'RISING', badgeBg: '#DBEAFE', badgeColor: '#2563EB', badgeIcon: '🔷',
      barColor: '#137FEC', barWidth: '60%', barLabel: '60% Volume',
      salary: '£90k – £120k', views: '1.5k views', icon: '📣', iconBg: '#F8FAFC',
    },
  ];

  const handleSubscribe = () => {
    if (email) { alert(`Subscribed with ${email}!`); setEmail(''); }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .filter-pill { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 9999px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.15s; font-family: 'Inter', sans-serif; }
        .trend-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: all 0.2s; cursor: pointer; }
        .trend-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; transition: color 0.15s; }
        .nav-link:hover { color: #137FEC; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 80px', height: '65px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(6px)', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '14px' }}>⚡</span>
            </div>
            <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobPulse</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="/jobs" className="nav-link">Find Jobs</a>
            <a href="/trending" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', textDecoration: 'none', borderBottom: '2px solid #137FEC', paddingBottom: '4px' }}>Trending</a>
            <a href="#" className="nav-link">Companies</a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px', overflow: 'hidden' }}>
            <div style={{ padding: '0 12px', color: '#64748B', fontSize: '13px', flexShrink: 0 }}>🔍</div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trending roles..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', flex: 1, color: '#0F172A' }} />
          </div>
          <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '2px solid rgba(19,127,236,0.2)', cursor: 'pointer' }}>👤</div>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div style={{ padding: '32px 80px', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* Hero / Title Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.75px' }}>Trending This Week</h1>
          <p style={{ fontSize: '16px', color: '#475569', maxWidth: '672px', lineHeight: '24px' }}>Discover roles with the highest growth and application volume. Stay ahead of the curve in the job market.</p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f.label} className="filter-pill" onClick={() => setActiveFilter(f.label)}
                style={{ background: activeFilter === f.label ? '#137FEC' : '#FFFFFF', color: activeFilter === f.label ? '#fff' : '#0F172A', border: activeFilter === f.label ? 'none' : '1px solid #E2E8F0', boxShadow: activeFilter === f.label ? '0px 4px 6px -1px rgba(0,0,0,0.1)' : 'none', fontWeight: activeFilter === f.label ? '600' : '500' }}>
                <span>{f.icon === '<>' ? '</>' : f.icon}</span> {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', display: 'flex', boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1)' }}>
          {/* Left Image */}
          <div style={{ width: '373px', flexShrink: 0, position: 'relative', minHeight: '250px' }}>
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=260&fit=crop" alt="spotlight" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.background = 'linear-gradient(135deg,#1e293b,#334155)'; e.target.style.display = 'none'; }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EF4444', color: '#fff', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                🔥 HIGH VOLUME
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ color: '#137FEC', fontSize: '14px' }}>🚀</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC' }}>GROWING +64% MOM</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>Lead AI Infrastructure Engineer</h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px', marginBottom: '24px' }}>Join a hyper-growth AI startup building the next generation of cloud infrastructure. Experience with distributed systems and CUDA is a must.</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Avatar stack */}
                <div style={{ display: 'flex' }}>
                  {['#E2E8F0', '#CBD5E1', 'rgba(19,127,236,0.1)'].map((bg, i) => (
                    <div key={i} style={{ width: '32px', height: '32px', background: bg, border: '2px solid #fff', borderRadius: '50%', marginLeft: i > 0 ? '-8px' : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: i === 2 ? '10px' : '14px', fontWeight: '700', color: i === 2 ? '#137FEC' : '#475569' }}>
                      {i === 2 ? '+42' : '👤'}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Applied in the last 24h</span>
              </div>
              <button style={{ padding: '10px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.25)' }}>
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Trending Grid — 3×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {trendingCards.filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase())).map(card => (
            <div key={card.id} className="trend-card" style={{ minHeight: '218px' }}>
              {/* Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: card.iconBg, border: '1px solid #F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{card.icon}</div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: card.badgeBg, color: card.badgeColor, fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', letterSpacing: '-0.25px', textTransform: 'uppercase' }}>
                  {card.badgeIcon} {card.badge}
                </span>
              </div>

              {/* Title */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{card.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748B' }}>{card.company} • {card.location}</p>
              </div>

              {/* Progress Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#F1F5F9', borderRadius: '9999px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: card.barWidth, background: card.barColor, borderRadius: '9999px' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', whiteSpace: 'nowrap' }}>{card.barLabel}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>{card.salary}</span>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>{card.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ padding: '12px 32px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
            View More Trending Roles
          </button>
        </div>
      </div>

      {/* ── NEWSLETTER FOOTER ── */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '48px 80px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>Get trending updates weekly</h3>
              <p style={{ fontSize: '16px', color: '#64748B' }}>We'll send you a curated list of high-growth roles twice a week.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={{ padding: '10px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontFamily: "'Inter',sans-serif", color: '#0F172A', width: '256px', outline: 'none' }} onKeyDown={e => e.key === 'Enter' && handleSubscribe()} />
              <button onClick={handleSubscribe} style={{ padding: '8px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Subscribe</button>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '14px', color: '#64748B' }}>© 2024 JobPulse Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrendingJobs;