import React, { useState } from 'react';

const InternshipListings = () => {
  const [activeFilter, setActiveFilter] = useState('All Roles');
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState('');

  const filters = [
    { label: 'All Roles', icon: '▦' },
    { label: 'Engineering', icon: '</>' },
    { label: 'Product Design', icon: '◎' },
    { label: 'Data Science', icon: '↑↓' },
  ];

  const listings = [
    {
      id: 1,
      badgeText: 'INTERNSHIP',
      badgeBg: '#F1F5F9',
      badgeColor: '#475569',
      logoIcon: '💜',
      logoBg: '#F1F5F9',
      title: 'Product Design Intern',
      company: 'Stripe',
      location: 'San Francisco, CA',
      duration: '3 Months • Starts June',
      stipend: '$5,000/mo • Relocation Stipend',
      footer: 'Applications close in 2 days',
      footerColor: '#94A3B8',
    },
    {
      id: 2,
      badgeText: 'GRAD PROGRAM',
      badgeBg: 'rgba(19,127,236,0.1)',
      badgeColor: '#137FEC',
      logoIcon: '🔷',
      logoBg: '#F1F5F9',
      title: 'Associate Product Manager',
      company: 'Google',
      location: 'Zurich, Switzerland',
      duration: '24 Months • Rotational Program',
      stipend: 'Competitive Base + Equity',
      footer: '240+ applicants',
      footerColor: '#94A3B8',
    },
    {
      id: 3,
      badgeText: 'CO-OP',
      badgeBg: '#F1F5F9',
      badgeColor: '#475569',
      logoIcon: '🏠',
      logoBg: '#22C55E',
      title: 'Data Analyst Co-op',
      company: 'Airbnb',
      location: 'Remote (Global)',
      duration: '6 Months • Starts Fall 2024',
      stipend: '$4,500/mo • Benefits Eligible',
      footer: 'Urgent hiring',
      footerColor: '#94A3B8',
    },
    {
      id: 4,
      badgeText: 'INTERNSHIP',
      badgeBg: '#F1F5F9',
      badgeColor: '#475569',
      logoIcon: '🔶',
      logoBg: '#F1F5F9',
      title: 'Marketing Operations Intern',
      company: 'HubSpot',
      location: 'Boston, MA',
      duration: '4 Months • Part-time available',
      stipend: '$25/hr • Learning budget',
      footer: 'Open to all majors',
      footerColor: '#94A3B8',
    },
    {
      id: 5,
      badgeText: 'FELLOWSHIP',
      badgeBg: 'rgba(19,127,236,0.1)',
      badgeColor: '#137FEC',
      logoIcon: '🤖',
      logoBg: '#1E3A5F',
      title: 'Machine Learning Fellow',
      company: 'NVIDIA',
      location: 'Austin, TX',
      duration: '12 Months • Research focused',
      stipend: '$8,000/mo • Conference Travel',
      footer: 'PhD candidates preferred',
      footerColor: '#94A3B8',
    },
  ];

  // Company logo placeholders
  const CompanyLogo = ({ listing }) => {
    const iconMap = {
      1: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="8" rx="4" fill="#6772E5"/><circle cx="10" cy="10" r="3" fill="white" opacity="0.8"/></svg>,
      2: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 7H7V18H13V7H16L10 2Z" fill="#4285F4"/><path d="M4 7L10 2L16 7" fill="#34A853" opacity="0.7"/></svg>,
      3: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C6.7 2 4 4.7 4 8C4 12 10 18 10 18C10 18 16 12 16 8C16 4.7 13.3 2 10 2ZM10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10Z" fill="#FF5A5F"/></svg>,
      4: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C8 2 6 3.5 6 5.5V8H4V16H16V8H14V5.5C14 3.5 12 2 10 2ZM10 4C11.1 4 12 4.7 12 5.5V8H8V5.5C8 4.7 8.9 4 10 4Z" fill="#FF7A59"/></svg>,
      5: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" fill="#76B900"/><path d="M7 10L9 12L13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    };
    return (
      <div style={{ width: '48px', height: '48px', background: listing.logoBg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {iconMap[listing.id]}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .il-filter-btn { display: flex; align-items: center; gap: 8px; padding: 0 20px; height: 40px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter',sans-serif; transition: all 0.15s; }
        .il-filter-btn.active { background: #137FEC; color: #FFFFFF; border: none; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2); }
        .il-filter-btn:not(.active) { background: #FFFFFF; color: #334155; border: 1px solid #E2E8F0; }
        .il-listing-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: box-shadow 0.2s, transform 0.15s; }
        .il-listing-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); transform: translateY(-2px); }
        .il-page-btn { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; border: 1px solid #E2E8F0; background: #FFFFFF; font-family: 'Inter',sans-serif; color: #0F172A; transition: all 0.15s; }
        .il-page-btn.active { background: #137FEC; color: #FFFFFF; border: none; }
        .il-page-btn:hover:not(.active) { background: #F1F5F9; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 80px', height: '73px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect x="0" y="0" width="8" height="7" rx="2" fill="#137FEC"/>
                <rect x="10" y="0" width="10" height="7" rx="2" fill="#137FEC" opacity="0.6"/>
                <rect x="0" y="9" width="10" height="7" rx="2" fill="#137FEC" opacity="0.6"/>
                <rect x="12" y="9" width="8" height="7" rx="2" fill="#137FEC"/>
              </svg>
            </div>
            <span style={{ fontWeight: '700', fontSize: '20px', color: '#0F172A', letterSpacing: '-0.5px' }}>InternHub</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Explore', 'My Applications', 'Mentorship'].map(link => (
              <a key={link} href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>{link}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 0 0 16px', color: '#64748B', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles, companies..." style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#64748B', width: '100%', padding: '0 12px', fontFamily: 'Inter,sans-serif' }} />
          </div>
          {/* Divider + bell + avatar */}
          <div style={{ borderLeft: '1px solid #E2E8F0', height: '36px', margin: '0 0 0 8px' }} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#64748B"/></svg>
          </button>
          <div style={{ width: '36px', height: '36px', background: '#CBD5E1', border: '2px solid rgba(19,127,236,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" fill="#64748B"/><path d="M3 18C3 14.7 6.1 12 10 12C13.9 12 17 14.7 17 18" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ padding: '32px 80px', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>

        {/* ── HERO ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '672px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Entry-Level Opportunities</span>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0F172A', letterSpacing: '-1.2px', lineHeight: '48px' }}>Your career starts here.</h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: '28px' }}>
            Connect with world-class companies offering internships, fellowships, and graduate programs designed for rapid growth.
          </p>
        </div>

        {/* ── FILTERS BAR ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '24px', borderBottom: '1px solid #E2E8F0' }}>
          {filters.map(f => (
            <button key={f.label} className={`il-filter-btn${activeFilter === f.label ? ' active' : ''}`} onClick={() => setActiveFilter(f.label)}>
              <span style={{ fontSize: '12px' }}>{f.icon}</span>
              {f.label}
            </button>
          ))}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="il-filter-btn" style={{ background: '#FFFFFF', color: '#334155', border: '1px solid #E2E8F0' }}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><line x1="0" y1="1" x2="14" y2="1" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><line x1="2" y1="5" x2="12" y2="5" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="9" x2="10" y2="9" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Advanced Filters
            </button>
          </div>
        </div>

        {/* ── FEATURED LISTING ── */}
        <div style={{
          background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px',
          padding: '4px', display: 'flex', gap: '0',
        }}>
          {/* Left image */}
          <div style={{ width: '370px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}>
            <svg viewBox="0 0 370 341" xmlns="http://www.w3.org/2000/svg" width="100%" height="341" preserveAspectRatio="xMidYMid slice">
              <rect width="370" height="341" fill="#c8d0d8"/>
              <rect x="0" y="0" width="370" height="341" fill="url(#feat_g)"/>
              <defs><linearGradient id="feat_g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e8edf2"/><stop offset="100%" stopColor="#a8b8c8"/></linearGradient></defs>
              {/* Modern office illustration */}
              <rect x="0" y="200" width="370" height="141" fill="rgba(180,170,155,0.4)"/>
              {/* Desks */}
              {[40,150,260].map((x,i) => (
                <g key={i}>
                  <rect x={x} y="175" width="100" height="30" rx="3" fill="rgba(200,185,165,0.6)"/>
                  <rect x={x+10} y="148" width="70" height="28" rx="2" fill="rgba(60,60,80,0.85)"/>
                  <rect x={x+14} y="152" width="58" height="20" rx="1" fill="rgba(30,30,45,0.9)"/>
                  <rect x={x+18} y="155" width="30" height="3" rx="1" fill="rgba(19,127,236,0.5)"/>
                  <rect x={x+18} y="161" width="45" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
                  <rect x={x+18} y="166" width="35" height="2" rx="1" fill="rgba(255,255,255,0.15)"/>
                  {/* Person silhouette */}
                  <circle cx={x+50} cy="130" r="14" fill={['rgba(200,155,110,0.75)','rgba(110,130,160,0.75)','rgba(165,135,100,0.75)'][i]}/>
                  <ellipse cx={x+50} cy="167" rx="18" ry="14" fill={['rgba(180,135,90,0.6)','rgba(90,110,140,0.6)','rgba(145,115,80,0.6)'][i]}/>
                </g>
              ))}
              {/* Windows */}
              <rect x="270" y="10" width="90" height="120" fill="rgba(200,220,240,0.25)"/>
              <line x1="315" y1="10" x2="315" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
              <line x1="270" y1="70" x2="360" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
              {/* Plant */}
              <rect x="330" y="170" width="6" height="32" rx="1" fill="rgba(80,55,30,0.5)"/>
              <ellipse cx="333" cy="168" rx="15" ry="22" fill="rgba(55,95,55,0.6)"/>
            </svg>
          </div>
          {/* Right content */}
          <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', height: '148px' }}>
              {/* Badges row */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: 'rgba(19,127,236,0.1)', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', color: '#137FEC', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Featured Opportunity</span>
                <span style={{ fontSize: '14px', color: '#94A3B8' }}>· Posted 2 hours ago</span>
              </div>
              {/* Title */}
              <h3 style={{ position: 'absolute', top: '36px', left: 0, right: 0, fontSize: '24px', fontWeight: '700', color: '#0F172A', lineHeight: '32px' }}>
                Summer 2024 Software Engineering Fellow
              </h3>
              {/* Description */}
              <p style={{ position: 'absolute', top: '76px', left: 0, right: 0, fontSize: '16px', color: '#475569', lineHeight: '24px' }}>
                Join our core platform team to build scalable infrastructure that powers millions of global users. You'll be paired with a dedicated mentor and work on production code from day...
              </p>
            </div>
            {/* Bottom section */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {[
                  { label: 'COMPANY', value: 'TechFlow Global' },
                  { label: 'LOCATION', value: 'New York, NY (Remote)' },
                  { label: 'STIPEND', value: '$6,500/mo' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{item.label}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <button style={{
                padding: '12px 32px', background: '#137FEC', border: 'none',
                borderRadius: '12px', fontSize: '16px', fontWeight: '700', color: '#FFFFFF',
                cursor: 'pointer', fontFamily: 'Inter,sans-serif', width: 'fit-content',
                boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)',
              }}>
                Apply to Fellowship
              </button>
            </div>
          </div>
        </div>

        {/* ── STANDARD LISTINGS GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {listings.map(listing => (
            <div key={listing.id} className="il-listing-card">
              {/* Top: logo + badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <CompanyLogo listing={listing} />
                <span style={{ background: listing.badgeBg, color: listing.badgeColor, fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '9999px' }}>{listing.badgeText}</span>
              </div>
              {/* Title + company */}
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', lineHeight: '28px', marginBottom: '4px' }}>{listing.title}</h4>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>{listing.company} • {listing.location}</p>
              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#475569" strokeWidth="1.2"/><path d="M6.5 3.5V6.5L8.5 8.5" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: '14px', color: '#475569' }}>{listing.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M1 2H14M1 5.5H14M1 9H14" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/><rect x="3" y="1" width="9" height="9" rx="1" stroke="#475569" strokeWidth="1" opacity="0.4"/></svg>
                  <span style={{ fontSize: '14px', color: '#475569' }}>{listing.stipend}</span>
                </div>
              </div>
              {/* Footer row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '500', color: listing.footerColor }}>{listing.footer}</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#137FEC', fontFamily: 'Inter,sans-serif' }}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', gap: '8px' }}>
          <button className="il-page-btn" onClick={() => setActivePage(Math.max(1, activePage - 1))}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6L6 11" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {[1, 2, 3].map(p => (
            <button key={p} className={`il-page-btn${activePage === p ? ' active' : ''}`} onClick={() => setActivePage(p)}>{p}</button>
          ))}
          <button className="il-page-btn" style={{ letterSpacing: '2px', fontSize: '12px' }}>···</button>
          <button className="il-page-btn" onClick={() => setActivePage(12)}>12</button>
          <button className="il-page-btn" onClick={() => setActivePage(Math.min(12, activePage + 1))}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* ── NEWSLETTER CTA ── */}
        <div style={{
          background: '#0F172A', borderRadius: '24px', padding: '48px',
          display: 'flex', alignItems: 'center', gap: '40px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow effects */}
          <div style={{ position: 'absolute', right: '-128px', top: '-128px', width: '256px', height: '256px', background: 'rgba(19,127,236,0.2)', filter: 'blur(32px)', borderRadius: '9999px' }} />
          <div style={{ position: 'absolute', left: '-96px', bottom: '-96px', width: '192px', height: '192px', background: 'rgba(19,127,236,0.1)', filter: 'blur(20px)', borderRadius: '9999px' }} />
          {/* Left content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#FFFFFF', lineHeight: '36px' }}>Never miss an opportunity.</h2>
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '28px' }}>
              Get personalized internship alerts delivered to your inbox based on your skills and interests.
            </p>
          </div>
          {/* Right: email form */}
          <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 2, flexShrink: 0 }}>
            <input
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your student email"
              style={{
                padding: '18px 24px', background: '#1E293B', border: '1px solid #334155',
                borderRadius: '12px', fontSize: '16px', color: '#64748B', outline: 'none',
                fontFamily: 'Inter,sans-serif', width: '297px',
              }}
            />
            <button style={{
              padding: '17px 32px', background: '#137FEC', border: 'none',
              borderRadius: '12px', fontSize: '16px', fontWeight: '700', color: '#FFFFFF',
              cursor: 'pointer', fontFamily: 'Inter,sans-serif', flexShrink: 0,
              boxShadow: '0px 20px 25px -5px rgba(19,127,236,0.2)',
            }}>
              Subscribe Now
            </button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', marginTop: '80px' }}>
        <div style={{ padding: '48px 80px', display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1280px' }}>
          {/* Top: logo + links */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '20px', height: '16px', background: '#137FEC', borderRadius: '3px' }} />
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>InternHub</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>Empowering the next generation of tech leaders through curated opportunities and mentorship.</p>
            </div>
            <div style={{ display: 'flex', gap: '64px' }}>
              {[
                { title: 'PLATFORM', links: ['Browse Internships', 'Success Stories', 'Resources', 'Blog'] },
                { title: 'COMPANY', links: ['About us', 'Contact', 'Partnerships'] },
              ].map(col => (
                <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', letterSpacing: '1.4px', textTransform: 'uppercase' }}>{col.title}</span>
                  {col.links.map(link => (
                    <a key={link} href="#" style={{ fontSize: '14px', color: '#64748B' }}>{link}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 InternHub Inc. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <a key={l} href="#" style={{ fontSize: '12px', color: '#94A3B8' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InternshipListings;