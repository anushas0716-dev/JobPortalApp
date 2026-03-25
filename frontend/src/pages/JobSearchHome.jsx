import React, { useState } from 'react';

const JobSearchHome = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const trending = ['Product Manager', 'Software Engineer', 'UX Designer', 'Remote'];

  const categories = [
    { icon: '<>', label: 'Development', count: '1,250+ open positions' },
    { icon: '🎨', label: 'Design & Creative', count: '840+ open positions' },
    { icon: '📊', label: 'Marketing', count: '520+ open positions' },
    { icon: '🎧', label: 'Customer Success', count: '310+ open positions' },
  ];

  const footerLinks = {
    Platform: ['Browse Jobs', 'Companies', 'Salaries'],
    Support: ['Help Center', 'Guidelines', 'Terms of Service'],
    Company: ['About Us', 'Careers', 'Contact'],
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (location) params.set('location', location);
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { font-size: 14px; font-weight: 600; color: #334155; text-decoration: none; transition: color 0.15s; }
        .nav-link:hover { color: #137FEC; }
        .trend-tag { padding: 6px 16px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .trend-tag:hover { border-color: #137FEC; color: #137FEC; }
        .cat-card { background: rgba(246,247,248,0.3); border: 1px solid #E2E8F0; border-radius: 12px; padding: 25px; flex: 1; cursor: pointer; transition: all 0.2s; }
        .cat-card:hover { background: #fff; box-shadow: 0 4px 16px rgba(19,127,236,0.08); border-color: #137FEC; transform: translateY(-2px); }
        .footer-link { font-size: 14px; color: #64748B; text-decoration: none; display: block; margin-bottom: 8px; transition: color 0.15s; }
        .footer-link:hover { color: #137FEC; }
        .search-input { border: none; outline: none; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; background: transparent; width: 100%; }
        .search-input::placeholder { color: #94A3B8; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(6px)', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: '73px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '40px', height: '40px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '18px' }}>💼</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobPortal</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['Find Jobs', 'Companies', 'Salaries', 'Resources'].map(l => (
            <a key={l} href={l === 'Find Jobs' ? '/jobs' : '#'} className="nav-link">{l}</a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => window.location.href = '/'} style={{ padding: '8px 16px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '600', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Sign In</button>
          <button onClick={() => window.location.href = '/employer/register'} style={{ padding: '10px 20px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>Post a Job</button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', background: '#F6F7F8', padding: '96px 32px 128px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        {/* Radial gradient background */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(45% 45% at 50% 50%, rgba(19,127,236,0.08) 0%, rgba(19,127,236,0) 100%)', pointerEvents: 'none' }} />

        {/* Trusted badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '9999px', padding: '4px 12px', marginBottom: '32px', position: 'relative' }}>
          <div style={{ width: '8px', height: '8px', background: '#137FEC', borderRadius: '50%' }} />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#137FEC' }}>Trusted by 5,000+ top companies</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: '60px', fontWeight: '800', letterSpacing: '-1.5px', lineHeight: '60px', textAlign: 'center', color: '#0F172A', marginBottom: '24px', maxWidth: '800px' }}>
          Find your <span style={{ color: '#137FEC' }}>dream job</span> today
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '18px', color: '#475569', textAlign: 'center', lineHeight: '28px', maxWidth: '600px', marginBottom: '40px' }}>
          Connecting the best talent with top tech companies and creative studios worldwide. Your next big career move starts right here.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px', boxShadow: '0px 25px 50px -12px rgba(226,232,240,0.5)', width: '100%', maxWidth: '896px', marginBottom: '24px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '4px 16px', gap: '12px' }}>
            <span style={{ color: '#94A3B8', fontSize: '16px', flexShrink: 0 }}>🔍</span>
            <input className="search-input" placeholder="Job title, keywords, or company" value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
          </div>
          <div style={{ width: '1px', height: '32px', background: '#E2E8F0', flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '4px 16px', gap: '12px' }}>
            <span style={{ color: '#94A3B8', fontSize: '16px', flexShrink: 0 }}>📍</span>
            <input className="search-input" placeholder="City, state, or remote" value={location} onChange={e => setLocation(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
          </div>
          <button onClick={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', flexShrink: 0 }}>
            🔍 Search Jobs
          </button>
        </div>

        {/* Trending Searches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Trending:</span>
          {trending.map(t => (
            <button key={t} className="trend-tag" onClick={() => { setKeyword(t); }}>{t}</button>
          ))}
        </div>
      </section>

      {/* ── POPULAR CATEGORIES ── */}
      <section style={{ background: '#FFFFFF', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1216px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '8px' }}>Explore by Category</h2>
              <p style={{ fontSize: '16px', color: '#475569' }}>Browse through thousands of job openings across different sectors.</p>
            </div>
            <a href="/jobs" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '700', color: '#137FEC', textDecoration: 'none' }}>
              View all categories →
            </a>
          </div>

          {/* Category Cards */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {categories.map(cat => (
              <div key={cat.label} className="cat-card" onClick={() => { setKeyword(cat.label); window.location.href = `/jobs?q=${encodeURIComponent(cat.label)}`; }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', fontSize: '20px' }}>
                  {cat.icon === '<>' ? <span style={{ fontSize: '16px', fontWeight: '700', color: '#137FEC' }}>&lt;/&gt;</span> : cat.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{cat.label}</h3>
                <p style={{ fontSize: '14px', color: '#64748B' }}>{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS BANNER ── */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ background: '#0F172A', borderRadius: '16px', padding: '64px 48px', position: 'relative', overflow: 'hidden' }}>
          {/* Diagonal stripe overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(19,127,236,0.15) 0px, rgba(19,127,236,0.15) 1px, transparent 1px, transparent 40px)', borderRadius: '16px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ maxWidth: '540px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.9px', lineHeight: '40px', marginBottom: '16px' }}>Ready to level up your career?</h2>
              <p style={{ fontSize: '18px', color: '#CBD5E1', lineHeight: '28px' }}>Create a professional profile and get noticed by recruiters from top-tier companies. It only takes 5 minutes.</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexShrink: 0 }}>
              <button onClick={() => window.location.href = '/register'} style={{ padding: '14px 32px', background: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Create Profile</button>
              <button onClick={() => window.location.href = '/jobs'} style={{ padding: '14px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '48px 32px 32px' }}>
        <div style={{ maxWidth: '1216px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '14px' }}>💼</span>
                </div>
                <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>JobPortal</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '23px', maxWidth: '280px' }}>Connecting talent with opportunity across the globe. We make the job search process simple, transparent, and rewarding.</p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>{heading}</p>
                {links.map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 JobPortal Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span style={{ fontSize: '18px', color: '#94A3B8', cursor: 'pointer' }}>𝕏</span>
              <span style={{ fontSize: '18px', color: '#94A3B8', cursor: 'pointer' }}>📷</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobSearchHome;