import React, { useState } from 'react';

const SkillGapAnalysis = () => {
  const [activeNav, setActiveNav] = useState('Skill Gap');
  const [search, setSearch] = useState('');

  const sidebarNav = [
    { label: 'Dashboard', icon: '▦' },
    { label: 'Skill Gap', icon: '🎯' },
    { label: 'oob Matches', icon: '💼' },
    { label: 'Courses', icon: '🎓' },
    { label: 'Settings', icon: '⚙️' },
  ];

  const metrics = [
    {
      label: 'Role Compatibility',
      value: '68%',
      sub: '+4% this month',
      subColor: '#10B981',
      showBar: true,
      barPct: 68,
      barType: 'single',
    },
    {
      label: 'Verified Skills',
      value: '14',
      sub: 'of 22 required',
      subColor: '#94A3B8',
      showBar: true,
      barType: 'segments',
      segments: [true, true, true, false],
    },
    {
      label: 'Skill Gaps',
      value: '8',
      sub: 'Critical Priority',
      subColor: '#F97316',
      showBar: false,
      showAvatars: true,
      avatars: ['μι', 'μ)', 'STR'],
    },
  ];

  const skills = [
    {
      label: 'Visual Design Systems',
      status: 'Advanced Required',
      statusColor: '#137FEC',
      yourPct: 85,
      targetPct: 95,
    },
    {
      label: 'User Research & Testing',
      status: 'Critical Gap',
      statusColor: '#F97316',
      yourPct: 40,
      targetPct: 80,
    },
    {
      label: 'Leadership & Mentoring',
      status: 'Critical Gap',
      statusColor: '#F97316',
      yourPct: 20,
      targetPct: 70,
    },
    {
      label: 'Interaction Design',
      status: 'Match Found',
      statusColor: '#10B981',
      yourPct: 80,
      targetPct: 75,
    },
  ];

  const courses = [
    {
      gradientFrom: '#137FEC',
      gradientTo: '#93C5FD',
      title: 'Advanced Design Leadership',
      desc: 'Master mentoring and team strategy',
      badge: 'HIGH PRIORITY',
      badgeBg: '#FFEDD5',
      badgeColor: '#EA580C',
      meta: '8 weeks • Certification',
      cta: 'Start Course',
    },
    {
      gradientFrom: '#10B981',
      gradientTo: '#5EEAD4',
      title: 'Quantitative User Research',
      desc: 'Data-driven design decisions',
      badge: 'VERIFIED GAP',
      badgeBg: '#DBEAFE',
      badgeColor: '#2563EB',
      meta: '4 weeks • Professional',
      cta: 'View Details',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .sg-nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .sg-nav-link:hover { background: #F1F5F9; }
        .sg-nav-link.active { background: rgba(19,127,236,0.1); }
        .sg-bar-track { width: 100%; height: 16px; background: #F1F5F9; border-radius: 9999px; position: relative; overflow: hidden; }
        .sg-bar-your { position: absolute; left: 0; top: 0; bottom: 0; background: #137FEC; border-radius: 9999px; }
        .sg-bar-target { position: absolute; left: 0; top: 0; bottom: 0; background: #CBD5E1; border-radius: 9999px; }
        .sg-course-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; display: flex; gap: 16px; flex: 1; }
        .sg-course-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Logo + Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '23px', height: '23px', background: '#137FEC', borderRadius: '5px' }} />
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>oobPortal</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {['oobs', 'Skills', 'Learning', 'Network'].map((l, i) => (
              <a key={l} href="#" style={{
                fontSize: '14px',
                fontWeight: l === 'Skills' ? '700' : '500',
                color: l === 'Skills' ? '#137FEC' : '#475569',
                borderBottom: l === 'Skills' ? '2px solid #137FEC' : 'none',
                paddingBottom: l === 'Skills' ? '4px' : '0',
              }}>{l}</a>
            ))}
          </nav>
        </div>

        {/* Search + Bell + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '36px', width: '188px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search skills or jobs"
              style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#0F172A', width: '100%', padding: '0 12px 0 34px', fontFamily: 'Inter,sans-serif' }}
            />
          </div>
          <div style={{ cursor: 'pointer' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#475569"/>
            </svg>
          </div>
          <div style={{ width: '40px', height: '40px', background: '#E2E8F0', border: '2px solid rgba(19,127,236,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="8" r="4" fill="#94A3B8"/>
              <path d="M3 20C3 16.1 6.6 13 11 13C15.4 13 19 16.1 19 20" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </header>

      {/* ── LAYOUT ── */}
      <div style={{ display: 'flex', padding: '32px 40px', gap: '32px', maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'calc(100vh - 129px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sidebarNav.map(item => (
              <button
                key={item.label}
                className={`sg-nav-link${activeNav === item.label ? ' active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span style={{ fontSize: '16px', width: '22px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: activeNav === item.label ? '700' : '500',
                  color: activeNav === item.label ? '#137FEC' : '#0F172A',
                }}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Pro Plan CTA */}
          <div style={{ background: '#137FEC', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Pro Plan</span>
            <p style={{ fontSize: '14px', color: '#FFFFFF', lineHeight: '20px' }}>Unlock advanced AI skill matching & career paths.</p>
            <button style={{ width: '100%', padding: '8px 0', background: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              Upgrade Now
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>

          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px' }}>Skill Gap Analysis</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', color: '#64748B' }}>Targeting:</span>
                <span style={{ background: 'rgba(19,127,236,0.1)', borderRadius: '4px', padding: '2px 8px', fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>
                  Senior Product Designer
                </span>
              </div>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', background: '#FFFFFF',
              border: '1px solid #E2E8F0', borderRadius: '8px',
              fontSize: '14px', fontWeight: '700', color: '#0F172A',
              cursor: 'pointer', fontFamily: 'Inter,sans-serif',
            }}>
              <span style={{ fontSize: '12px' }}>✏️</span> Change Goal
            </button>
          </div>

          {/* ── Metrics Overview ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>

            {/* Card 1: Role Compatibility */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Role Compatibility</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '8px' }}>
                <span style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A' }}>68%</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#10B981', paddingBottom: '4px' }}>+4% this month</span>
              </div>
              <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#137FEC', borderRadius: '9999px' }} />
              </div>
            </div>

            {/* Card 2: Verified Skills */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Verified Skills</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A' }}>14</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#94A3B8', paddingBottom: '4px' }}>of 22 required</span>
              </div>
              {/* Segment bar */}
              <div style={{ display: 'flex', gap: '4px', paddingTop: '8px' }}>
                {[true, true, true, false].map((filled, i) => (
                  <div key={i} style={{ flex: 1, height: '8px', background: filled ? '#137FEC' : '#F1F5F9', borderRadius: '9999px' }} />
                ))}
              </div>
            </div>

            {/* Card 3: Skill Gaps */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Skill Gaps</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A' }}>8</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#F97316', paddingBottom: '4px' }}>Critical Priority</span>
              </div>
              {/* Stacked avatar initials */}
              <div style={{ display: 'flex', paddingTop: '8px' }}>
                {['μι', 'μ)', 'STR'].map((init, i) => (
                  <div key={i} style={{
                    width: '24px', height: '24px',
                    background: '#E2E8F0', border: '2px solid #FFFFFF',
                    borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', fontWeight: '700', color: '#0F172A',
                    marginLeft: i > 0 ? '-8px' : '0', zIndex: 3 - i,
                    position: 'relative',
                  }}>{init}</div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Skill Breakdown ── */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #E2E8F0' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Skill Breakdown</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', background: '#137FEC', borderRadius: '9999px' }} />
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>Your Level</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', background: '#E2E8F0', borderRadius: '9999px' }} />
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>Target Level</span>
                </div>
              </div>
            </div>

            {/* Skill rows */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {skills.map((sk, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{sk.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: sk.statusColor }}>{sk.status}</span>
                  </div>
                  {/* Dual-bar track */}
                  <div className="sg-bar-track" style={{ height: '16px' }}>
                    {/* Target bar (grey, behind) */}
                    <div className="sg-bar-target" style={{ width: `${sk.targetPct}%` }} />
                    {/* Your bar (blue, on top) */}
                    <div className="sg-bar-your" style={{ width: `${sk.yourPct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Closing Your Gaps (Courses) ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', padding: '0 4px' }}>Closing your gaps</h2>
            <div style={{ display: 'flex', gap: '24px' }}>
              {courses.map((course, i) => (
                <div key={i} className="sg-course-card">
                  {/* Gradient thumbnail */}
                  <div style={{
                    width: '96px', height: '96px', flexShrink: 0, borderRadius: '8px',
                    background: `linear-gradient(135deg, ${course.gradientFrom} 0%, ${course.gradientTo} 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width={i === 0 ? 36 : 21} height={i === 0 ? 18 : 28} viewBox={i === 0 ? "0 0 36 18" : "0 0 21 29"} fill="none">
                      {i === 0
                        ? <path d="M18 0L36 9L18 18L0 9L18 0Z M0 9L18 18L36 9" stroke="white" strokeWidth="2" fill="none"/>
                        : <path d="M10.5 0L10.5 29M4 7L10.5 0L17 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      }
                    </svg>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {/* Title + badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', lineHeight: '20px' }}>{course.title}</h3>
                        <span style={{
                          background: course.badgeBg, color: course.badgeColor,
                          fontSize: '10px', fontWeight: '900',
                          padding: '2px 6px', borderRadius: '4px',
                          textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0,
                        }}>{course.badge}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>{course.desc}</p>
                    </div>
                    {/* Meta + CTA */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>{course.meta}</span>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#137FEC', fontFamily: 'Inter,sans-serif', padding: 0 }}>
                        {course.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Career Path Map ── */}
          <div style={{
            background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
            padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          }}>
            {/* Map icon */}
            <div style={{ width: '27px', height: '27px', background: 'rgba(19,127,236,0.4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 3L6 1L12 4L17 2V15L12 17L6 14L1 16V3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <line x1="6" y1="1" x2="6" y2="14" stroke="white" strokeWidth="1.5"/>
                <line x1="12" y1="4" x2="12" y2="17" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', textAlign: 'center' }}>Your Path to Senior Designer</h3>

            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px', textAlign: 'center', maxWidth: '448px' }}>
              Based on your current progress, you are estimated to reach "Senior Level" in 4-6 months by completing the 3 missing critical skill sets.
            </p>

            {/* Progress steps */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0' }}>
              {/* Mid step (active) */}
              <div style={{ width: '48px', height: '48px', border: '2px solid #137FEC', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Mid</span>
              </div>
              {/* Divider */}
              <div style={{ width: '64px', height: '2px', background: '#E2E8F0', position: 'relative', borderRadius: '9999px' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: '60%', height: '100%', background: '#137FEC', borderRadius: '9999px' }} />
              </div>
              {/* Sr step (locked) */}
              <div style={{ width: '48px', height: '48px', border: '2px solid #E2E8F0', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#94A3B8' }}>Sr</span>
              </div>
            </div>

            {/* CTA Button */}
            <button style={{
              padding: '12px 24px', background: '#137FEC', border: 'none',
              borderRadius: '12px', fontSize: '16px', fontWeight: '700',
              color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif',
            }}>
              Download Roadmap PDF
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;