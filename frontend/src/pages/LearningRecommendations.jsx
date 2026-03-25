import React, { useState } from 'react';

const LearningRecommendations = () => {
  const [activeFilter, setActiveFilter] = useState('All Platforms');
  const [search, setSearch] = useState('');

  const filters = ['All Platforms', 'Coursera', 'Udemy', 'LinkedIn Learning'];

  const skillGaps = [
    { label: 'Design Systems' },
    { label: 'User Research' },
    { label: 'Product Strategy' },
  ];

  const courses = [
    {
      id: 1,
      platform: 'COURSERA',
      imgBg: 'linear-gradient(145deg, #2d5a5a 0%, #3d7070 50%, #2a5858 100%)',
      rating: '4.9',
      reviews: '12.4k',
      title: 'Google UX Design Professional Certificate',
      desc: 'Master the foundations of UX design, including empathizing with users, defining…',
      duration: '6 months',
      level: 'Beginner',
    },
    {
      id: 2,
      platform: 'UDEMY',
      imgBg: 'linear-gradient(145deg, #b8a090 0%, #a09080 50%, #907870 100%)',
      rating: '4.7',
      reviews: '45k',
      title: 'Advanced Design Systems with Figma',
      desc: 'Learn to build scalable, production-ready design systems using the latest Figma…',
      duration: '12 hours',
      level: 'Advanced',
    },
    {
      id: 3,
      platform: 'COURSERA',
      imgBg: 'linear-gradient(145deg, #8090a8 0%, #90a0b8 50%, #7888a0 100%)',
      rating: '4.8',
      reviews: '8.2k',
      title: 'Product Strategy for Designers',
      desc: 'Bridge the gap between business goals and user needs through strategic product…',
      duration: '4 weeks',
      level: 'Intermediate',
    },
    {
      id: 4,
      platform: 'LINKEDIN',
      imgBg: 'linear-gradient(145deg, #d0d8c8 0%, #c0c8b8 50%, #b0b8a8 100%)',
      rating: '4.6',
      reviews: '5.1k',
      title: 'Leading with Emotional Intelligence',
      desc: 'Develop critical soft skills needed for senior leadership and team management roles.',
      duration: '2 hours',
      level: 'All Levels',
    },
  ];

  // SVG illustrations for each course card
  const CourseImage = ({ course }) => {
    const illustrations = {
      1: ( // Design/UX card/book layout
        <svg viewBox="0 0 284 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="284" height="160" fill="#2d5a5a"/>
          <rect x="0" y="0" width="284" height="160" fill="url(#c1g)"/>
          <defs><linearGradient id="c1g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3d7070"/><stop offset="100%" stopColor="#1a4040"/></linearGradient></defs>
          {/* Design card mockup */}
          <rect x="60" y="25" width="80" height="110" rx="4" fill="rgba(255,255,255,0.15)"/>
          <rect x="65" y="35" width="70" height="50" rx="2" fill="rgba(255,255,255,0.1)"/>
          <rect x="65" y="92" width="40" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
          <rect x="65" y="102" width="60" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="65" y="110" width="50" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
          {/* Second card */}
          <rect x="150" y="40" width="75" height="100" rx="4" fill="rgba(255,255,255,0.1)"/>
          <rect x="158" y="55" width="55" height="40" rx="2" fill="rgba(255,255,255,0.15)"/>
          <rect x="158" y="100" width="35" height="5" rx="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="158" y="109" width="50" height="3" rx="2" fill="rgba(255,255,255,0.2)"/>
          {/* Grid dots */}
          {[0,1,2,3].map(i => <circle key={i} cx={80 + i*15} cy="55" r="2" fill="rgba(255,255,255,0.3)"/>)}
        </svg>
      ),
      2: ( // Laptop/typing photo style
        <svg viewBox="0 0 284 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="284" height="160" fill="#b8a090"/>
          <rect x="0" y="0" width="284" height="160" fill="url(#c2g)"/>
          <defs><linearGradient id="c2g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c8b0a0"/><stop offset="100%" stopColor="#906858"/></linearGradient></defs>
          {/* Table surface */}
          <rect x="0" y="110" width="284" height="50" fill="rgba(160,120,80,0.5)"/>
          {/* Laptop body */}
          <rect x="60" y="60" width="165" height="100" rx="3" fill="rgba(60,50,40,0.8)"/>
          <rect x="65" y="65" width="155" height="90" rx="2" fill="rgba(30,30,40,0.9)"/>
          {/* Screen content */}
          <rect x="75" y="72" width="80" height="5" rx="2" fill="rgba(19,127,236,0.6)"/>
          <rect x="75" y="81" width="120" height="3" rx="1" fill="rgba(255,255,255,0.3)"/>
          <rect x="75" y="88" width="100" height="3" rx="1" fill="rgba(255,255,255,0.2)"/>
          <rect x="75" y="95" width="60" height="10" rx="2" fill="rgba(19,127,236,0.4)"/>
          {/* Hands */}
          <ellipse cx="110" cy="130" rx="35" ry="15" fill="rgba(210,170,130,0.8)"/>
          <ellipse cx="175" cy="130" rx="35" ry="15" fill="rgba(200,160,120,0.8)"/>
          {/* Keyboard hint */}
          <rect x="65" y="152" width="155" height="6" rx="1" fill="rgba(40,35,30,0.7)"/>
        </svg>
      ),
      3: ( // Team collaboration - people at table with sticky notes
        <svg viewBox="0 0 284 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="284" height="160" fill="#7888a0"/>
          <rect x="0" y="0" width="284" height="160" fill="url(#c3g)"/>
          <defs><linearGradient id="c3g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#90a0b8"/><stop offset="100%" stopColor="#5a6878"/></linearGradient></defs>
          {/* Table */}
          <ellipse cx="142" cy="110" rx="130" ry="20" fill="rgba(200,180,150,0.4)"/>
          {/* Sticky notes on table */}
          {[
            {x:60,y:85,c:'#fef08a'},{x:100,y:78,c:'#fca5a5'},{x:140,y:82,c:'#86efac'},
            {x:178,y:79,c:'#fef08a'},{x:215,y:84,c:'#93c5fd'},
          ].map((n,i) => (
            <g key={i}>
              <rect x={n.x} y={n.y} width="30" height="28" rx="1" fill={n.c} opacity="0.85"/>
              <rect x={n.x+4} y={n.y+6} width="18" height="2" rx="1" fill="rgba(0,0,0,0.2)"/>
              <rect x={n.x+4} y={n.y+11} width="14" height="2" rx="1" fill="rgba(0,0,0,0.15)"/>
              <rect x={n.x+4} y={n.y+16} width="16" height="2" rx="1" fill="rgba(0,0,0,0.15)"/>
            </g>
          ))}
          {/* People (silhouettes) */}
          {[50,130,220].map((cx,i) => (
            <g key={i}>
              <circle cx={cx} cy="55" r="18" fill={['rgba(200,150,100,0.7)','rgba(100,120,160,0.7)','rgba(160,130,100,0.7)'][i]}/>
              <ellipse cx={cx} cy="95" rx="24" ry="18" fill={['rgba(180,130,80,0.6)','rgba(80,100,140,0.6)','rgba(140,110,80,0.6)'][i]}/>
            </g>
          ))}
        </svg>
      ),
      4: ( // Modern office/meeting room
        <svg viewBox="0 0 284 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="284" height="160" fill="#d0d8c8"/>
          <rect x="0" y="0" width="284" height="160" fill="url(#c4g)"/>
          <defs><linearGradient id="c4g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#dce4d8"/><stop offset="100%" stopColor="#b0b8a8"/></linearGradient></defs>
          {/* Floor */}
          <rect x="0" y="120" width="284" height="40" fill="rgba(200,195,185,0.4)"/>
          {/* Window light */}
          <rect x="180" y="0" width="104" height="120" fill="rgba(220,230,240,0.3)"/>
          <line x1="230" y1="0" x2="230" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <line x1="180" y1="60" x2="284" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          {/* Conference table */}
          <ellipse cx="120" cy="130" rx="100" ry="18" fill="rgba(180,160,130,0.5)"/>
          <rect x="20" y="110" width="200" height="20" rx="4" fill="rgba(170,150,120,0.6)"/>
          {/* Chairs */}
          {[40,90,145,200].map((cx,i) => (
            <rect key={i} x={cx-12} y="95" width="24" height="18" rx="4" fill="rgba(100,100,100,0.4)"/>
          ))}
          {/* Plant */}
          <rect x="255" y="80" width="8" height="42" rx="2" fill="rgba(80,60,30,0.4)"/>
          <ellipse cx="259" cy="78" rx="20" ry="28" fill="rgba(60,100,60,0.5)"/>
          <ellipse cx="246" cy="65" rx="13" ry="20" fill="rgba(70,115,70,0.4)"/>
        </svg>
      ),
    };
    return (
      <div style={{ width: '100%', height: '160px', position: 'relative', overflow: 'hidden' }}>
        {illustrations[course.id]}
        {/* Platform badge */}
        <div style={{
          position: 'absolute', top: '9px', left: '12px',
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
          borderRadius: '6px', padding: '2.5px 8px',
        }}>
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase' }}>{course.platform}</span>
        </div>
      </div>
    );
  };

  const pathSteps = [
    { num: '1', title: 'Design Leadership Foundations', sub: 'Weeks 1-3 • 2 courses recommended', active: true, filled: true },
    { num: '2', title: 'Strategic User Research', sub: 'Weeks 4-7 • 3 courses recommended', active: true, filled: false },
    { num: '3', title: 'Advanced Portfolio Strategy', sub: 'Weeks 8-12 • Final Project', active: false, filled: false },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .lr-filter-btn { padding: 0 16px; height: 36px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; font-family: 'Inter',sans-serif; transition: all 0.15s; }
        .lr-filter-btn.active { background: #137FEC; color: #FFFFFF; }
        .lr-filter-btn:not(.active) { background: #F1F5F9; color: #334155; }
        .lr-course-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s, transform 0.2s; cursor: pointer; }
        .lr-course-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); transform: translateY(-2px); }
        .lr-skill-chip { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(19,127,236,0.1); border: 1px solid rgba(19,127,236,0.2); border-radius: 9999px; font-size: 14px; font-weight: 500; color: #137FEC; cursor: pointer; transition: all 0.15s; }
        .lr-skill-chip:hover { background: rgba(19,127,236,0.15); }
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
            <div style={{ width: '29px', height: '29px', background: '#137FEC', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L8 2L14 8M4 6V13H12V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 13V9H10V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.27px' }}>Skillup</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Browse</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', borderBottom: '2px solid #137FEC', paddingBottom: '2px' }}>My Learning</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Certifications</a>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', color: '#64748B', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#64748B', width: '100%', padding: '0 12px 0 34px', fontFamily: 'Inter,sans-serif' }} />
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#475569"/></svg>
          </button>
          <div style={{ width: '40px', height: '40px', background: '#f0a070', border: '2px solid rgba(19,127,236,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" fill="rgba(255,255,255,0.7)"/><path d="M3 20C3 16.1 6.6 13 11 13C15.4 13 19 16.1 19 20" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '0', flex: 1 }}>

        {/* Hero greeting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '660px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#137FEC" strokeWidth="1.5"/><circle cx="6" cy="6" r="2" fill="#137FEC"/></svg>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Career Goal: Senior Product Designer</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.9px', lineHeight: '40px' }}>Recommended for You</h1>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>
              We've identified 3 key skill gaps based on your target role. Here are the best courses to help you bridge them.
            </p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif', flexShrink: 0 }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1V10M1 5.5H10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Update Goals
          </button>
        </div>

        {/* Skill gap chips */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {skillGaps.map(gap => (
            <button key={gap.label} className="lr-skill-chip">
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none"><path d="M6.5 1L12 10H1L6.5 1Z" stroke="#137FEC" strokeWidth="1.2" fill="none"/><line x1="6.5" y1="5" x2="6.5" y2="7.5" stroke="#137FEC" strokeWidth="1.2" strokeLinecap="round"/><circle cx="6.5" cy="8.5" r="0.5" fill="#137FEC"/></svg>
              {gap.label}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0', marginBottom: '32px' }}>
          {filters.map(f => (
            <button key={f} className={`lr-filter-btn${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '36px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              <svg width="11" height="7" viewBox="0 0 11 7" fill="none"><path d="M1 1L5.5 6L10 1" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Sort By: Relevance
            </button>
          </div>
        </div>

        {/* ── Course Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '56px' }}>
          {courses.map(course => (
            <div key={course.id} className="lr-course-card">
              <CourseImage course={course} />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '0', flex: 1 }}>
                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none"><path d="M6 1L7.5 4.5H11.5L8.5 7L9.5 10.5L6 8.5L2.5 10.5L3.5 7L0.5 4.5H4.5Z" fill="#F59E0B"/></svg>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#F59E0B' }}>{course.rating}</span>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>({course.reviews})</span>
                </div>
                {/* Title */}
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', lineHeight: '20px', marginBottom: '8px' }}>{course.title}</h3>
                {/* Desc */}
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px', marginBottom: '16px', flex: 1 }}>{course.desc}</p>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#64748B" strokeWidth="1.2"/><path d="M5 3V5L7 7" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{course.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><rect x="1" y="4" width="6" height="3" rx="1" stroke="#64748B" strokeWidth="1"/><path d="M2.5 4V2.5C2.5 1.7 3.2 1 4 1C4.8 1 5.5 1.7 5.5 2.5V4" stroke="#64748B" strokeWidth="1"/></svg>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{course.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Learning Path Section ── */}
        <div style={{
          background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)',
          borderRadius: '16px', padding: '40px',
          display: 'flex', gap: '32px', alignItems: 'center',
        }}>
          {/* Left: CTA */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', lineHeight: '36px' }}>Ready for a structured path?</h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>
              Our AI has generated a customized 12-week roadmap to get you from Junior to Senior Product Designer. It includes curated courses, practice projects, and portfolio reviews.
            </p>
            <div style={{ paddingTop: '8px' }}>
              <button style={{
                padding: '12px 32px', background: '#137FEC', border: 'none',
                borderRadius: '12px', fontSize: '16px', fontWeight: '700', color: '#FFFFFF',
                cursor: 'pointer', fontFamily: 'Inter,sans-serif',
                boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)',
              }}>
                View My AI Roadmap
              </button>
            </div>
          </div>

          {/* Right: Path steps card */}
          <div style={{ width: '448px', flexShrink: 0 }}>
            <div style={{
              background: '#FFFFFF', border: '1px solid rgba(19,127,236,0.2)',
              borderRadius: '12px', padding: '24px',
              boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', gap: '24px',
            }}>
              {pathSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', opacity: step.active ? 1 : 0.5 }}>
                  <div style={{
                    width: '32px', height: '32px', flexShrink: 0, borderRadius: '9999px',
                    background: step.filled ? '#137FEC' : step.active ? 'rgba(19,127,236,0.2)' : '#F1F5F9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: step.filled ? '#FFFFFF' : step.active ? '#137FEC' : '#94A3B8' }}>{step.num}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>{step.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.7 }}>
          <div style={{ width: '18px', height: '18px', background: '#137FEC', borderRadius: '4px' }} />
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>Skillup © 2024</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Support'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LearningRecommendations;