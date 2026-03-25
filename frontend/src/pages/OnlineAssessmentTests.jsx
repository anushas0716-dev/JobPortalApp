import React, { useState } from 'react';

const OnlineAssessmentTests = () => {
  const [activeTab, setActiveTab] = useState('All Skills');
  const [activeNav, setActiveNav] = useState('My Assessments');
  const [search, setSearch] = useState('');

  const tabs = ['All Skills', 'Coding', 'Design', 'Soft Skills', 'Management'];

  const sidebarNav = [
    { label: 'Overview', icon: '▦' },
    { label: 'My Assessments', icon: '✓' },
    { label: 'Credentials', icon: '🏅' },
    { label: 'History', icon: '🕐' },
    { label: 'Settings', icon: '⚙️' },
  ];

  const assessments = [
    {
      id: 1,
      category: 'Coding',
      categoryColor: '#137FEC',
      categoryBg: 'rgba(255,255,255,0.9)',
      gradient: 'linear-gradient(135deg, rgba(19,127,236,0.2) 0%, rgba(19,127,236,0) 100%)',
      imgBg: 'linear-gradient(160deg, #0f1724 0%, #1a2a3a 40%, #0d1b2a 100%)',
      scoreBadge: null,
      title: 'Advanced React Patterns',
      duration: '60 MINS',
      durationColor: '#94A3B8',
      desc: 'Master hooks, HOCs, render props and complex state management in enterprise applications.',
      difficultyDots: [true, true, true],
      completedBadge: null,
      status: 'take',
      btnText: 'Take Test',
      btnStyle: 'primary',
      inProgress: false,
      progressPct: null,
      lastActive: null,
    },
    {
      id: 2,
      category: 'Design',
      categoryColor: '#9333EA',
      categoryBg: 'rgba(255,255,255,0.9)',
      gradient: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0) 100%)',
      imgBg: 'linear-gradient(160deg, #2d4a3e 0%, #3d6b55 40%, #2a4535 100%)',
      scoreBadge: 'Score: 94%',
      scoreBadgeBg: '#10B981',
      title: 'UX/UI Foundations',
      duration: '45 MINS',
      durationColor: '#94A3B8',
      desc: 'Test your knowledge of typography, spacing, accessibility, and visual hierarchy principles.',
      difficultyDots: null,
      completedBadge: 'COMPLETED',
      completedBg: '#D1FAE5',
      completedColor: '#059669',
      status: 'review',
      btnText: 'Review',
      btnStyle: 'outline',
      inProgress: false,
      progressPct: null,
      lastActive: null,
    },
    {
      id: 3,
      category: 'Soft Skills',
      categoryColor: '#EA580C',
      categoryBg: 'rgba(255,255,255,0.9)',
      gradient: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0) 100%)',
      imgBg: 'linear-gradient(160deg, #f59e5a 0%, #f97316 40%, #ea580c 100%)',
      scoreBadge: null,
      title: 'Conflict Resolution',
      duration: '30 MINS',
      durationColor: '#94A3B8',
      desc: 'Scenario-based assessment on navigating professional disagreements and team building.',
      difficultyDots: [true, false, false],
      completedBadge: null,
      status: 'take',
      btnText: 'Take Test',
      btnStyle: 'primary',
      inProgress: false,
      progressPct: null,
      lastActive: null,
    },
    {
      id: 4,
      category: 'In Progress',
      categoryColor: '#FFFFFF',
      categoryBg: '#137FEC',
      gradient: 'rgba(19,127,236,0.1)',
      imgBg: 'linear-gradient(160deg, #b8c8d8 0%, #c8d8e8 40%, #d0dce8 100%)',
      scoreBadge: null,
      title: 'Product Management Core',
      duration: '45% COMPLETE',
      durationColor: '#137FEC',
      desc: 'Roadmapping, user personas, and agile methodologies for product owners.',
      difficultyDots: null,
      completedBadge: null,
      status: 'resume',
      btnText: 'Resume Test',
      btnStyle: 'primary',
      inProgress: true,
      progressPct: 45,
      lastActive: 'Last active 2h ago',
      highlighted: true,
    },
  ];

  // Card image illustrations
  const CardImage = ({ assessment }) => {
    const illustrations = {
      1: ( // Code editor look
        <svg viewBox="0 0 450 192" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="450" height="192" fill="#0d1117"/>
          <rect x="0" y="0" width="450" height="28" fill="#161b22"/>
          {[0,1,2,3,4,5,6,7].map(i => (
            <rect key={i} x="16" y={42 + i*18} width={[180,220,140,260,100,200,160,120][i]} height="8" rx="3"
              fill={['#79c0ff','#d2a8ff','#ffa657','#79c0ff','#56d364','#d2a8ff','#ffa657','#79c0ff'][i]} opacity="0.7"/>
          ))}
          <rect x="16" y="40" width="6" height="140" fill="#30363d" rx="1"/>
          {/* Line numbers */}
          {[0,1,2,3,4,5,6,7].map(i => (
            <text key={i} x="8" y={50 + i*18} fill="#484f58" fontSize="9" fontFamily="monospace">{i+1}</text>
          ))}
          {/* Syntax highlight dots */}
          <rect x="60" y="60" width="80" height="8" rx="3" fill="#d2a8ff" opacity="0.5"/>
          <rect x="160" y="60" width="60" height="8" rx="3" fill="#ffa657" opacity="0.5"/>
        </svg>
      ),
      2: ( // Design/plant aesthetic
        <svg viewBox="0 0 450 192" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="450" height="192" fill="#3d5a52"/>
          {/* Background wall */}
          <rect x="0" y="0" width="450" height="192" fill="#4a6a5a"/>
          {/* Pink canvas/frame */}
          <rect x="260" y="20" width="150" height="170" rx="4" fill="#e8b4a0" opacity="0.9"/>
          <rect x="275" y="35" width="120" height="130" rx="2" fill="#f0c8b8"/>
          {/* Plant pot */}
          <ellipse cx="180" cy="160" rx="35" ry="12" fill="#5a3a2a" opacity="0.6"/>
          <rect x="155" y="100" width="50" height="62" rx="4" fill="#7a5a3a" opacity="0.8"/>
          {/* Plant leaves */}
          <ellipse cx="180" cy="95" rx="30" ry="45" fill="#3a6a3a" opacity="0.7"/>
          <ellipse cx="155" cy="85" rx="22" ry="35" fill="#4a7a4a" opacity="0.6"/>
          <ellipse cx="205" cy="88" rx="22" ry="30" fill="#3a6030" opacity="0.6"/>
          <ellipse cx="180" cy="70" rx="18" ry="28" fill="#5a8a5a" opacity="0.5"/>
          {/* White geometric shapes */}
          <rect x="310" y="55" width="70" height="90" rx="2" fill="rgba(255,255,255,0.3)"/>
        </svg>
      ),
      3: ( // Handshake illustration
        <svg viewBox="0 0 450 192" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="450" height="192" fill="#f97316"/>
          <rect x="0" y="0" width="450" height="192" fill="url(#hs_grad)"/>
          <defs><linearGradient id="hs_grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#ea580c"/></linearGradient></defs>
          {/* Left hand (light skin) */}
          <ellipse cx="160" cy="120" rx="70" ry="28" fill="#f0d0b0" transform="rotate(-15, 160, 120)"/>
          <rect x="90" y="90" width="110" height="55" rx="20" fill="#f0d0b0" transform="rotate(-15, 160, 120)"/>
          {/* Right hand (darker skin) */}
          <ellipse cx="300" cy="110" rx="70" ry="28" fill="#8B6040" transform="rotate(15, 300, 110)"/>
          <rect x="250" y="85" width="110" height="55" rx="20" fill="#8B6040" transform="rotate(15, 300, 110)"/>
          {/* Shirt sleeves */}
          <rect x="55" y="130" width="120" height="65" rx="8" fill="#FFFFFF" opacity="0.9"/>
          <rect x="280" y="125" width="120" height="65" rx="8" fill="#1a1a2e" opacity="0.9"/>
          {/* Clasped hands center */}
          <ellipse cx="228" cy="120" rx="38" ry="22" fill="#c09070" opacity="0.8"/>
        </svg>
      ),
      4: ( // Sticky notes / kanban
        <svg viewBox="0 0 450 192" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="450" height="192" fill="#b8c8d8"/>
          <rect x="0" y="0" width="450" height="192" fill="linear-gradient(#c8d8e8,#b0c0d0)"/>
          <rect width="450" height="192" fill="#c4d4e4"/>
          {/* Sticky notes grid */}
          {[
            {x:30,y:20,c:'#fef08a'},{x:100,y:35,c:'#fef08a'},{x:170,y:15,c:'#fef08a'},
            {x:240,y:30,c:'#fef08a'},{x:310,y:20,c:'#fef08a'},{x:380,y:35,c:'#fef08a'},
            {x:55,y:95,c:'#fef08a'},{x:130,y:108,c:'#fef08a'},{x:200,y:90,c:'#fef08a'},
            {x:275,y:100,c:'#fef08a'},{x:350,y:92,c:'#fef08a'},
            {x:30,y:148,c:'#fef08a'},{x:105,y:155,c:'#fef08a'},{x:180,y:145,c:'#fef08a'},
            {x:255,y:152,c:'#fef08a'},{x:330,y:148,c:'#fef08a'},
          ].map((n,i) => (
            <g key={i}>
              <rect x={n.x} y={n.y} width="52" height="44" rx="2" fill={n.c} opacity="0.9"/>
              <rect x={n.x+6} y={n.y+8} width="30" height="2" rx="1" fill="rgba(0,0,0,0.2)"/>
              <rect x={n.x+6} y={n.y+14} width="22" height="2" rx="1" fill="rgba(0,0,0,0.15)"/>
              <rect x={n.x+6} y={n.y+20} width="26" height="2" rx="1" fill="rgba(0,0,0,0.15)"/>
            </g>
          ))}
          {/* Vertical line */}
          <line x1="225" y1="10" x2="225" y2="182" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="4,3"/>
        </svg>
      ),
    };
    return (
      <div style={{ width: '100%', height: '192px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {illustrations[assessment.id]}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: assessment.gradient }} />
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          background: assessment.categoryBg,
          border: assessment.id === 4 ? 'none' : undefined,
          borderRadius: '8px', padding: '4px 12px',
          display: 'flex', alignItems: 'center', gap: '6px',
          boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
          backdropFilter: assessment.id !== 4 ? 'blur(2px)' : undefined,
        }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: assessment.categoryColor }}>
            {assessment.id === 1 ? '<>' : assessment.id === 2 ? '✦' : assessment.id === 3 ? '👥' : '🚀'} {assessment.category}
          </span>
        </div>
        {/* Score badge (card 2) */}
        {assessment.scoreBadge && (
          <div style={{ position: 'absolute', top: '16px', right: '16px', background: assessment.scoreBadgeBg, borderRadius: '8px', padding: '4px 12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF' }}>{assessment.scoreBadge}</span>
          </div>
        )}
        {/* Progress bar (card 4) */}
        {assessment.inProgress && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: '#E2E8F0' }}>
            <div style={{ width: `${assessment.progressPct}%`, height: '100%', background: '#137FEC' }} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .oa-nav-link { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; cursor: pointer; border: none; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .oa-nav-link.active { background: rgba(19,127,236,0.1); }
        .oa-nav-link:not(.active) { background: transparent; }
        .oa-nav-link:not(.active):hover { background: #F1F5F9; }
        .oa-tab { padding: 0 16px 12px; font-size: 14px; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; border-bottom: 2px solid transparent; transition: all 0.15s; white-space: nowrap; }
        .oa-tab.active { color: #137FEC; font-weight: 700; border-bottom-color: #137FEC; }
        .oa-tab:not(.active) { color: #64748B; font-weight: 500; }
        .oa-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s; }
        .oa-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .oa-card.highlighted { border: 2px solid #137FEC; box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1); }
        .oa-btn-primary { padding: 8px 24px; background: #137FEC; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; color: #FFFFFF; cursor: pointer; font-family: 'Inter',sans-serif; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2); white-space: nowrap; }
        .oa-btn-outline { padding: 8px 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 14px; font-weight: 700; color: #334155; cursor: pointer; font-family: 'Inter',sans-serif; white-space: nowrap; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '25px', height: '20px', background: '#137FEC', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><rect x="0" y="0" width="14" height="3" rx="1" fill="white"/><rect x="0" y="4.5" width="10" height="3" rx="1" fill="white"/><rect x="0" y="9" width="14" height="3" rx="1" fill="white"/></svg>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>SkillCert</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>Dashboard</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', borderBottom: '2px solid #137FEC', paddingBottom: '4px' }}>Assessments</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>Certifications</a>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assessments..." style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#94A3B8', width: '100%', padding: '0 12px 0 34px', fontFamily: 'Inter,sans-serif' }} />
          </div>
          <button style={{ width: '32px', height: '32px', background: 'none', border: 'none', borderRadius: '9999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#475569"/></svg>
          </button>
          <div style={{ width: '40px', height: '40px', background: '#CBD5E1', border: '2px solid rgba(19,127,236,0.2)', borderRadius: '9999px', overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" fill="#64748B"/><path d="M4 21C4 17.1 7.6 14 12 14C16.4 14 20 17.1 20 21" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ display: 'flex', padding: '32px', gap: '32px', flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Nav card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '36px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><circle cx="8" cy="6" r="4" stroke="#137FEC" strokeWidth="1.5"/><path d="M1 18C1 14.7 4.1 12 8 12C11.9 12 15 14.7 15 18" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Alex Johnson</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Senior Frontend Developer</div>
              </div>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sidebarNav.map((item, i) => (
                <React.Fragment key={item.label}>
                  {i === 4 && <div style={{ height: '1px', background: '#E2E8F0', margin: '4px 0' }} />}
                  <button
                    className={`oa-nav-link${activeNav === item.label ? ' active' : ''}`}
                    onClick={() => setActiveNav(item.label)}
                  >
                    <span style={{ fontSize: '15px', width: '18px', textAlign: 'center', color: activeNav === item.label ? '#137FEC' : '#475569' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: activeNav === item.label ? '700' : '500', color: activeNav === item.label ? '#137FEC' : '#475569' }}>{item.label}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Weekly Goal blue card */}
          <div style={{ background: '#137FEC', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#FFFFFF', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Weekly Goal</span>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', paddingBottom: '12px' }}>2/3 Tests Done</h3>
            {/* Progress bar */}
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '66%', background: '#FFFFFF', borderRadius: '9999px' }} />
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '23px', paddingTop: '10px' }}>
              Complete one more test to maintain your streak!
            </p>
          </div>
        </aside>

        {/* ── CONTENT AREA ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>Available Assessments</h2>
            <div style={{ background: '#E2E8F0', borderRadius: '9999px', padding: '4px 12px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>24 Tests Total</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #E2E8F0', display: 'flex' }}>
            {tabs.map(tab => (
              <button key={tab} className={`oa-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>

          {/* Assessment Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {assessments.map(a => (
              <div key={a.id} className={`oa-card${a.highlighted ? ' highlighted' : ''}`}>
                <CardImage assessment={a} />
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {/* Title + duration */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', lineHeight: '28px' }}>{a.title}</h3>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: a.durationColor, textTransform: 'uppercase', flexShrink: 0, paddingTop: '4px' }}>{a.duration}</span>
                  </div>
                  {/* Description */}
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>{a.desc}</p>

                  {/* Bottom row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
                    {/* Left: difficulty dots OR completed badge OR last active */}
                    <div>
                      {a.difficultyDots && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Difficulty</span>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {a.difficultyDots.map((filled, i) => (
                              <div key={i} style={{ width: '12px', height: '4px', background: filled ? '#137FEC' : '#E2E8F0', borderRadius: '9999px' }} />
                            ))}
                          </div>
                        </div>
                      )}
                      {a.completedBadge && (
                        <span style={{ background: a.completedBg, color: a.completedColor, fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px' }}>{a.completedBadge}</span>
                      )}
                      {a.lastActive && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.2"/><path d="M6 3V6L8 8" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          <span style={{ fontSize: '12px', color: '#94A3B8' }}>{a.lastActive}</span>
                        </div>
                      )}
                    </div>
                    {/* Right: button */}
                    <button className={a.btnStyle === 'primary' ? 'oa-btn-primary' : 'oa-btn-outline'}>
                      {a.btnText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#64748B' }}>© 2024 SkillCert Inc. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Support'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default OnlineAssessmentTests;