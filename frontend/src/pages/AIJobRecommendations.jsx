import React, { useState } from 'react';

const AIJobRecommendations = () => {
  const [activeTab, setActiveTab] = useState('Recommended For You');
  const [activeFilter, setActiveFilter] = useState('Top Match');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState([]);

  const tabs = ['Recommended For You', 'Saved Jobs', 'Application Status'];

  const quickFilters = [
    { label: 'Top Match', hasChevron: false, isAI: true },
    { label: 'Fast Tracking', hasChevron: true },
    { label: 'Salary Range', hasChevron: true },
    { label: 'Remote Only', hasChevron: false },
  ];

  const jobs = [
    {
      id: 1,
      badge: 'FAST TRACKING',
      badgeBg: '#137FEC',
      title: 'Senior Backend Engineer',
      company: 'TechNova Inc.',
      location: 'San Francisco, CA',
      locationIsRemote: false,
      matchScore: '98%',
      matchColor: '#059669',
      aiInsight: 'Perfect fit for your Python and SQL expertise. Your recent experience with AWS microservices is a critical requirement for this role.',
      tags: ['Full-time', '$160k – $210k', 'Python'],
      posted: 'Posted 2 hours ago',
      imgBg: 'linear-gradient(155deg, #a8d5a2 0%, #7bbf74 40%, #5ea855 100%)',
    },
    {
      id: 2,
      badge: 'HIGH MATCH',
      badgeBg: '#4F46E5',
      title: 'Data Scientist',
      company: 'InnoData Corp',
      location: 'Remote',
      locationIsRemote: true,
      matchScore: '92%',
      matchColor: '#059669',
      aiInsight: 'Strongly aligns with your Pandas and Scikit-learn proficiency. Salary expectations match your profile perfectly.',
      tags: ['Contract', '$140k – $180k', 'Machine Learning'],
      posted: 'Posted 5 hours ago',
      imgBg: 'linear-gradient(155deg, #e0e0b8 0%, #d0d098 40%, #c0c080 100%)',
    },
    {
      id: 3,
      badge: 'FAST TRACKING',
      badgeBg: '#137FEC',
      title: 'Lead DevOps Architect',
      company: 'CloudScale Solutions',
      location: 'Austin, TX',
      locationIsRemote: false,
      matchScore: '89%',
      matchColor: '#059669',
      aiInsight: 'High match for Kubernetes and Terraform skills. You meet 9 out of 10 "Must Have" technical qualifications for this senior role.',
      tags: ['Full-time', '$180k – $240k', 'Docker'],
      posted: 'Posted 1 day ago',
      imgBg: 'linear-gradient(155deg, #ede0d0 0%, #dfd0b8 40%, #cfc0a0 100%)',
    },
  ];

  // SVG illustrations for each card
  const CardIllustration = ({ index }) => {
    if (index === 0) return (
      // Modern office with large windows — green tones
      <svg viewBox="0 0 333 292" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ai_g0" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a8d5a2"/>
            <stop offset="100%" stopColor="#5ea855"/>
          </linearGradient>
        </defs>
        <rect width="333" height="292" fill="url(#ai_g0)"/>
        {/* Floor */}
        <rect x="0" y="228" width="333" height="64" fill="rgba(255,255,255,0.12)"/>
        {/* Three large windows */}
        {[18, 122, 226].map((x, i) => (
          <g key={i}>
            <rect x={x} y="28" width="88" height="188" rx="3" fill="rgba(255,255,255,0.32)"/>
            <line x1={x + 44} y1="28" x2={x + 44} y2="216" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
            <line x1={x} y1="122" x2={x + 88} y2="122" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
          </g>
        ))}
        {/* Desk */}
        <rect x="78" y="222" width="178" height="10" rx="2" fill="rgba(0,0,0,0.18)"/>
        <rect x="100" y="185" width="133" height="40" rx="3" fill="rgba(255,255,255,0.22)"/>
        {/* Pendant light */}
        <line x1="166" y1="0" x2="166" y2="42" stroke="rgba(0,0,0,0.22)" strokeWidth="2"/>
        <ellipse cx="166" cy="52" rx="22" ry="13" fill="rgba(255,255,255,0.48)"/>
        {/* Plant */}
        <rect x="278" y="178" width="10" height="54" rx="3" fill="rgba(60,90,40,0.45)"/>
        <ellipse cx="283" cy="178" rx="26" ry="36" fill="rgba(50,100,40,0.5)"/>
        <ellipse cx="268" cy="162" rx="16" ry="24" fill="rgba(60,120,50,0.45)"/>
      </svg>
    );

    if (index === 1) return (
      // People at desk — muted yellow/olive tones
      <svg viewBox="0 0 333 292" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ai_g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dede b0" stopColor="#ddddb0"/>
            <stop offset="100%" stopColor="#bcbc88"/>
          </linearGradient>
        </defs>
        <rect width="333" height="292" fill="#d8d898"/>
        {/* Background wall */}
        <rect x="0" y="0" width="333" height="200" fill="#e8e8b8"/>
        {/* Table */}
        <rect x="45" y="188" width="243" height="14" rx="4" fill="rgba(110,90,50,0.5)"/>
        <rect x="65" y="200" width="10" height="55" fill="rgba(90,70,30,0.4)"/>
        <rect x="258" y="200" width="10" height="55" fill="rgba(90,70,30,0.4)"/>
        {/* Laptop */}
        <rect x="133" y="164" width="67" height="28" rx="3" fill="rgba(40,40,60,0.72)"/>
        <rect x="127" y="190" width="79" height="5" rx="2" fill="rgba(40,40,60,0.5)"/>
        <rect x="143" y="170" width="47" height="16" rx="1" fill="rgba(19,127,236,0.3)"/>
        {/* Person left */}
        <circle cx="88" cy="148" r="24" fill="#bf7848"/>
        <ellipse cx="88" cy="195" rx="28" ry="18" fill="#d88858"/>
        {/* Person center-right */}
        <circle cx="168" cy="142" r="26" fill="#808080"/>
        <ellipse cx="168" cy="190" rx="30" ry="20" fill="#a0a0a0"/>
        {/* Person right */}
        <circle cx="248" cy="148" r="24" fill="#508848"/>
        <ellipse cx="248" cy="195" rx="28" ry="18" fill="#68a860"/>
        {/* Speech bubble hint */}
        <ellipse cx="130" cy="118" rx="18" ry="10" fill="rgba(255,255,255,0.4)" rx="8"/>
        <polygon points="122,128 118,138 132,128" fill="rgba(255,255,255,0.4)"/>
      </svg>
    );

    // index === 2 — minimal room with fan/plant — warm beige
    return (
      <svg viewBox="0 0 333 292" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ai_g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ede0d0"/>
            <stop offset="100%" stopColor="#cfc0a0"/>
          </linearGradient>
        </defs>
        <rect width="333" height="292" fill="url(#ai_g2)"/>
        {/* Floor line */}
        <line x1="0" y1="232" x2="333" y2="232" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>
        {/* Window */}
        <rect x="158" y="18" width="84" height="170" rx="4" fill="rgba(255,255,255,0.22)"/>
        <line x1="200" y1="18" x2="200" y2="188" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
        <line x1="158" y1="103" x2="242" y2="103" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
        {/* Round side table */}
        <ellipse cx="98" cy="237" rx="52" ry="11" fill="rgba(0,0,0,0.1)"/>
        <rect x="93" y="190" width="10" height="50" rx="3" fill="rgba(150,120,70,0.55)"/>
        <ellipse cx="98" cy="190" rx="44" ry="9" fill="rgba(170,140,90,0.65)"/>
        {/* Fan spokes */}
        {Array.from({length: 9}).map((_, i) => {
          const angle = (i * Math.PI) / 4.5;
          return <line key={i} x1="98" y1="190" x2={98 + 42 * Math.cos(angle)} y2={190 - 30 * Math.abs(Math.sin(angle)) - 5 * Math.cos(angle)} stroke="rgba(160,130,70,0.45)" strokeWidth="2.5"/>;
        })}
        <circle cx="98" cy="190" r="6" fill="rgba(150,120,70,0.6)"/>
        {/* Tall plant */}
        <rect x="256" y="162" width="14" height="72" rx="4" fill="rgba(90,70,30,0.45)"/>
        <ellipse cx="263" cy="160" rx="30" ry="44" fill="rgba(55,105,55,0.58)"/>
        <ellipse cx="246" cy="144" rx="20" ry="30" fill="rgba(65,125,65,0.5)"/>
        <ellipse cx="280" cy="148" rx="18" ry="27" fill="rgba(45,95,45,0.5)"/>
      </svg>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ai-tab { padding: 8px 0 12px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; border-bottom: 3px solid transparent; white-space: nowrap; transition: color 0.15s; }
        .ai-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .ai-tab:not(.active) { color: #64748B; }
        .ai-pill { display: inline-flex; align-items: center; gap: 8px; padding: 0 16px; height: 36px; border-radius: 9999px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter',sans-serif; transition: all 0.15s; white-space: nowrap; border: 1px solid #E2E8F0; background: #FFFFFF; color: #0F172A; }
        .ai-pill.active { background: rgba(19,127,236,0.1); border-color: rgba(19,127,236,0.2); color: #137FEC; }
        .ai-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; display: flex; height: 292px; transition: box-shadow 0.2s; }
        .ai-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .ai-view-btn { padding: 11px 24px; background: #137FEC; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; color: #FFFFFF; cursor: pointer; font-family: 'Inter',sans-serif; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: opacity 0.15s; }
        .ai-view-btn:hover { opacity: 0.9; }
        .ai-save-btn { width: 32px; height: 36px; border: 1px solid #E2E8F0; border-radius: 8px; background: #FFFFFF; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: border-color 0.15s; }
        .ai-save-btn:hover { border-color: #137FEC; }
        .ai-tag { padding: 4px 8px; background: #F1F5F9; border-radius: 4px; font-size: 12px; font-weight: 500; color: #475569; white-space: nowrap; }
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '29px', height: '29px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 0.5L9.2 5.3H14.3L10.3 8.5L11.8 13.5L7.5 10.8L3.2 13.5L4.7 8.5L0.7 5.3H5.8Z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>AI Career Match</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', borderBottom: '2px solid #137FEC', paddingBottom: '4px', textDecoration: 'none' }}>Jobs</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569', textDecoration: 'none' }}>Applied</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569', textDecoration: 'none' }}>Profile</a>
          </nav>
        </div>

        {/* Search + Notif + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', fontSize: '13px', color: '#64748B' }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search roles, skills..."
              style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#0F172A', width: '100%', padding: '0 12px 0 34px', fontFamily: 'Inter,sans-serif' }}
            />
          </div>
          <div style={{ position: 'relative', cursor: 'pointer', width: '32px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#475569"/>
            </svg>
            <div style={{ position: 'absolute', top: '6px', right: '5px', width: '8px', height: '8px', background: '#137FEC', borderRadius: '9999px' }}/>
          </div>
          <div style={{ width: '36px', height: '36px', background: '#E2E8F0', border: '1px solid #E2E8F0', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="4" fill="#94A3B8"/>
              <path d="M2 18C2 14.7 5.6 12 10 12C14.4 12 18 14.7 18 18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ padding: '24px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1000px', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Secondary nav tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #E2E8F0' }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`ai-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >{tab}</button>
              ))}
            </div>

            {/* Quick filter pills */}
            <div style={{ display: 'flex', gap: '8px', padding: '8px 0' }}>
              {quickFilters.map(f => (
                <button
                  key={f.label}
                  className={`ai-pill${activeFilter === f.label ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f.label)}
                >
                  {f.isAI && (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 0L7.9 4.6H13L9 7.4L10.4 12L6.5 9.3L2.6 12L4 7.4L0 4.6H5.1Z"
                        fill={activeFilter === f.label ? '#137FEC' : '#64748B'}/>
                    </svg>
                  )}
                  {f.label}
                  {f.hasChevron && (
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
                      <path d="M1 1L4.5 5L8 1" stroke={activeFilter === f.label ? '#137FEC' : '#0F172A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Job Cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {jobs.map((job, idx) => (
              <div key={job.id} className="ai-card">

                {/* Left: illustrated image panel */}
                <div style={{ width: '333px', minWidth: '333px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  <CardIllustration index={idx} />
                  {/* Badge */}
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: job.badgeBg, borderRadius: '4px',
                    padding: '4px 8px', zIndex: 2,
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {job.badge}
                    </span>
                  </div>
                </div>

                {/* Right: content panel */}
                <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>

                  {/* Title row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '3.5px' }}>{job.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748B' }}>
                        <span style={{ fontWeight: '500' }}>{job.company}</span>
                        <span style={{ color: '#CBD5E1', fontSize: '16px', lineHeight: 1 }}>·</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {job.locationIsRemote
                            ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#64748B" strokeWidth="1.3"/><ellipse cx="7" cy="7" rx="3" ry="6" stroke="#64748B" strokeWidth="1.3"/><line x1="1" y1="7" x2="13" y2="7" stroke="#64748B" strokeWidth="1.3"/></svg>
                            : <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><path d="M5.5 0C2.5 0 0 2.5 0 5.5C0 9.6 5.5 13 5.5 13C5.5 13 11 9.6 11 5.5C11 2.5 8.5 0 5.5 0ZM5.5 7.5C4.4 7.5 3.5 6.6 3.5 5.5C3.5 4.4 4.4 3.5 5.5 3.5C6.6 3.5 7.5 4.4 7.5 5.5C7.5 6.6 6.6 7.5 5.5 7.5Z" fill="#64748B"/></svg>
                          }
                          {job.location}
                        </span>
                      </div>
                    </div>
                    {/* Match score */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                          <path d="M10 1L12.5 7H19L14 11L16 17L10 13.5L4 17L6 11L1 7H7.5Z" fill={job.matchColor}/>
                        </svg>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: job.matchColor }}>{job.matchScore} Match</span>
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Match Score</div>
                    </div>
                  </div>

                  {/* AI Insight box */}
                  <div style={{
                    background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)',
                    borderRadius: '8px', padding: '11px 12px 12px',
                    display: 'flex', gap: '8px', alignItems: 'flex-start',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '3px' }}>
                      <circle cx="8" cy="8" r="7" stroke="#137FEC" strokeWidth="1.5"/>
                      <path d="M8 5V9" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="8" cy="11.5" r="0.75" fill="#137FEC"/>
                    </svg>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', lineHeight: '23px' }}>
                      <span style={{ fontWeight: '700' }}>AI Insights: </span>
                      {job.aiInsight}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
                    {job.tags.map(tag => <span key={tag} className="ai-tag">{tag}</span>)}
                  </div>

                  {/* Footer row */}
                  <div style={{
                    marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: '16px', borderTop: '1px solid #F1F5F9',
                  }}>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>{job.posted}</span>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button
                        className="ai-save-btn"
                        onClick={() => setSaved(p => p.includes(job.id) ? p.filter(x => x !== job.id) : [...p, job.id])}
                      >
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                          <path d="M1 1H13V17L7 13L1 17V1Z"
                            stroke={saved.includes(job.id) ? '#137FEC' : '#475569'}
                            strokeWidth="1.5"
                            fill={saved.includes(job.id) ? 'rgba(19,127,236,0.15)' : 'none'}
                          />
                        </svg>
                      </button>
                      <button className="ai-view-btn">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: '600', color: '#137FEC',
              fontFamily: 'Inter,sans-serif',
            }}>
              Load more recommendations
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 7L11 1" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AIJobRecommendations;