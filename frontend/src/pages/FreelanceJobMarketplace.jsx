import React, { useState } from 'react';

const FreelanceJobMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState('Design & Creative');
  const [budgetChecked, setBudgetChecked] = useState({ low: false, mid: true, high: false });
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState('');

  const categories = [
    { label: 'Design & Creative', icon: '✏️' },
    { label: 'Development', icon: '</>' },
    { label: 'Writing', icon: '≡↗' },
    { label: 'Marketing', icon: '↗' },
  ];

  const jobs = [
    {
      id: 1,
      category: 'DESIGN',
      title: 'Modern E-commerce Redesign',
      budget: '$4,000 - $6,000',
      budgetType: 'Fixed Price',
      desc: 'Looking for a senior UI/UX designer to overhaul our Shopify store. We need a high-converting layout focusing on mobile users and premium brand aesthetics. Experience with Figma and…',
      duration: '2 months',
      level: 'Intermediate',
      posted: 'Posted 2h ago',
      imgPalette: ['#e8d0c0', '#d4b8a8', '#1a1a2e'],
    },
    {
      id: 2,
      category: 'BRANDING',
      title: 'SaaS Identity & Brand Guidelines',
      budget: '$2,500 - $3,500',
      budgetType: 'Project Based',
      desc: "We're a fintech startup looking to establish a strong brand presence. Deliverables include logo suite, typography, color palette, and a 20-page brand book for our marketing team.",
      duration: '3 weeks',
      level: 'Expert',
      posted: 'Posted 5h ago',
      imgPalette: ['#c8b090', '#7a8060', '#f0e0c8'],
    },
    {
      id: 3,
      category: 'PRODUCT DESIGN',
      title: 'Mobile App UX Research & Audit',
      budget: '$1,500 - $2,000',
      budgetType: 'Fixed Budget',
      desc: 'Audit an existing health-tech mobile app. Identify friction points in the onboarding flow and provide actionable UX recommendations through user testing and competitive analysis.',
      duration: '1 month',
      level: 'Expert',
      posted: 'Posted Yesterday',
      imgPalette: ['#f0c870', '#e8b84a', '#1a1a1a'],
    },
  ];

  // Banner SVG illustrations for each job card
  const JobBanner = ({ job }) => {
    const banners = {
      1: (
        <svg viewBox="0 0 622 128" xmlns="http://www.w3.org/2000/svg" width="100%" height="128" preserveAspectRatio="xMidYMid slice">
          <rect width="622" height="128" fill="#f5e8de"/>
          {/* Left panel - wireframe/list UI */}
          <rect x="0" y="0" width="300" height="128" fill="#ecd8ce"/>
          <rect x="20" y="16" width="200" height="10" rx="2" fill="rgba(100,80,70,0.3)"/>
          <rect x="20" y="34" width="160" height="8" rx="2" fill="rgba(100,80,70,0.2)"/>
          <rect x="20" y="48" width="180" height="8" rx="2" fill="rgba(100,80,70,0.15)"/>
          <rect x="20" y="62" width="140" height="8" rx="2" fill="rgba(100,80,70,0.15)"/>
          <rect x="20" y="76" width="170" height="8" rx="2" fill="rgba(100,80,70,0.2)"/>
          <rect x="20" y="90" width="130" height="8" rx="2" fill="rgba(100,80,70,0.15)"/>
          <rect x="20" y="104" width="150" height="8" rx="2" fill="rgba(100,80,70,0.1)"/>
          {/* Right panel - form UI */}
          <rect x="310" y="0" width="312" height="128" fill="#f8f0ea"/>
          <rect x="330" y="16" width="250" height="30" rx="4" fill="rgba(180,150,130,0.2)"/>
          <rect x="330" y="54" width="250" height="30" rx="4" fill="rgba(180,150,130,0.15)"/>
          <rect x="330" y="92" width="130" height="24" rx="4" fill="rgba(180,150,130,0.25)"/>
          {/* Divider line */}
          <rect x="297" y="0" width="3" height="128" fill="rgba(80,60,50,0.8)"/>
          {/* Header bar */}
          <rect x="0" y="0" width="297" height="14" fill="rgba(80,60,50,0.15)"/>
        </svg>
      ),
      2: (
        <svg viewBox="0 0 622 128" xmlns="http://www.w3.org/2000/svg" width="100%" height="128" preserveAspectRatio="xMidYMid slice">
          <rect width="622" height="128" fill="#d4c0a0"/>
          {/* Left dark panel */}
          <rect x="0" y="0" width="200" height="128" fill="#5a5040"/>
          {/* Center - brand mockup */}
          <rect x="200" y="0" width="260" height="128" fill="#e8d8b8"/>
          <rect x="230" y="28" width="200" height="20" rx="2" fill="rgba(80,60,40,0.3)"/>
          <rect x="230" y="56" width="160" height="8" rx="2" fill="rgba(80,60,40,0.2)"/>
          <rect x="230" y="70" width="180" height="8" rx="2" fill="rgba(80,60,40,0.2)"/>
          <rect x="230" y="84" width="140" height="8" rx="2" fill="rgba(80,60,40,0.15)"/>
          {/* Typography label */}
          <rect x="300" y="44" width="120" height="16" rx="2" fill="rgba(80,60,40,0.4)"/>
          <text x="308" y="56" fill="rgba(80,60,40,0.7)" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600">CLEAN MODERN AND MORE</text>
          <text x="322" y="70" fill="rgba(80,60,40,0.6)" fontSize="8" fontFamily="Inter, sans-serif">THAN DONE</text>
          {/* Right panel */}
          <rect x="460" y="0" width="162" height="128" fill="#7a8060"/>
          {/* Color swatches */}
          {['#c8b090', '#907060', '#5a5040', '#d4c0a0'].map((c, i) => (
            <rect key={i} x={20} y={18 + i * 26} width="140" height="18" rx="2" fill={c} opacity="0.8"/>
          ))}
          <text x="230" y="106" fill="rgba(80,60,40,0.5)" fontSize="8" fontFamily="Inter, sans-serif">BRAND GUIDELINES</text>
        </svg>
      ),
      3: (
        <svg viewBox="0 0 622 128" xmlns="http://www.w3.org/2000/svg" width="100%" height="128" preserveAspectRatio="xMidYMid slice">
          <rect width="622" height="128" fill="#f0c870"/>
          {/* Left panel */}
          <rect x="0" y="0" width="200" height="128" fill="#e8b84a"/>
          {/* Mobile phone wireframe */}
          <rect x="60" y="14" width="80" height="100" rx="8" fill="rgba(0,0,0,0.15)"/>
          <rect x="65" y="22" width="70" height="84" rx="4" fill="rgba(255,255,255,0.2)"/>
          <rect x="70" y="28" width="60" height="12" rx="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="70" y="44" width="50" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="70" y="54" width="60" height="6" rx="2" fill="rgba(255,255,255,0.25)"/>
          <rect x="70" y="64" width="45" height="6" rx="2" fill="rgba(255,255,255,0.25)"/>
          <rect x="70" y="78" width="50" height="16" rx="3" fill="rgba(255,255,255,0.35)"/>
          {/* Center - UX annotation */}
          <rect x="200" y="0" width="220" height="128" fill="#f8d888"/>
          <rect x="310" y="50" width="100" height="22" rx="12" fill="rgba(255,255,255,0.8)"/>
          <text x="318" y="65" fill="rgba(60,50,20,0.7)" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600">Audit checklist</text>
          <line x1="255" y1="50" x2="305" y2="61" stroke="rgba(60,50,20,0.4)" strokeWidth="1.5"/>
          {/* Annotation dots */}
          <circle cx="255" cy="50" r="4" fill="rgba(60,50,20,0.4)"/>
          <circle cx="245" cy="75" r="4" fill="rgba(60,50,20,0.3)"/>
          <circle cx="270" cy="95" r="4" fill="rgba(60,50,20,0.3)"/>
          {/* Right panel */}
          <rect x="420" y="0" width="202" height="128" fill="#d4a030"/>
          <rect x="440" y="20" width="140" height="8" rx="2" fill="rgba(255,255,255,0.3)"/>
          <rect x="440" y="34" width="100" height="6" rx="2" fill="rgba(255,255,255,0.2)"/>
          <rect x="440" y="46" width="120" height="6" rx="2" fill="rgba(255,255,255,0.2)"/>
          <rect x="440" y="60" width="80" height="20" rx="3" fill="rgba(255,255,255,0.25)"/>
          <rect x="297" y="0" width="3" height="128" fill="rgba(80,60,20,0.6)"/>
        </svg>
      ),
    };
    return (
      <div style={{ width: '100%', height: '128px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
        {banners[job.id]}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .fj-cat-item { display: flex; align-items: center; gap: 12px; padding: 8px; border-radius: 8px; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .fj-cat-item.active { background: rgba(19,127,236,0.1); }
        .fj-cat-item:not(.active):hover { background: #F1F5F9; }
        .fj-job-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 24px; transition: box-shadow 0.2s; }
        .fj-job-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .fj-page-btn { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; border: 1px solid #E2E8F0; background: #FFFFFF; font-family: 'Inter',sans-serif; color: #475569; transition: all 0.15s; }
        .fj-page-btn.active { background: #137FEC; color: #FFFFFF; border: none; font-weight: 700; }
        .fj-page-btn:hover:not(.active) { background: #F1F5F9; }
        .fj-checkbox { width: 16px; height: 16px; border-radius: 4px; cursor: pointer; flex-shrink: 0; appearance: none; -webkit-appearance: none; border: 1px solid #CBD5E1; background: #FFFFFF; position: relative; transition: all 0.15s; }
        .fj-checkbox:checked { background: #137FEC; border-color: #137FEC; }
        .fj-checkbox:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 5px; height: 8px; border: 2px solid white; border-top: none; border-left: none; transform: rotate(45deg); }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 160px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '27px', height: '28px', background: '#137FEC', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 3h5v5H2zM9 3h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>FreelanceHub</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Browse Jobs</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>My Proposals</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Messages</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Payments</a>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 0 0 16px', color: '#64748B', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#64748B', width: '100%', padding: '0 12px', fontFamily: 'Inter,sans-serif' }} />
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#64748B"/></svg>
          </button>
          <div style={{ width: '36px', height: '36px', background: '#2d4a6a', border: '2px solid rgba(19,127,236,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" fill="rgba(255,255,255,0.7)"/><path d="M3 18C3 14.7 6.1 12 10 12C13.9 12 17 14.7 17 18" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ padding: '32px 160px 56px', display: 'flex', gap: '32px', flex: 1 }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Categories */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Categories</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map(cat => (
                <button key={cat.label} className={`fj-cat-item${activeCategory === cat.label ? ' active' : ''}`} onClick={() => setActiveCategory(cat.label)}>
                  <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>{cat.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: activeCategory === cat.label ? '600' : '500', color: activeCategory === cat.label ? '#137FEC' : '#475569' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Budget Range</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { key: 'low', label: '$100 - $1k' },
                { key: 'mid', label: '$1k - $5k' },
                { key: 'high', label: '$5k+' },
              ].map(opt => (
                <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    className="fj-checkbox"
                    checked={budgetChecked[opt.key]}
                    onChange={() => setBudgetChecked(prev => ({ ...prev, [opt.key]: !prev[opt.key] }))}
                  />
                  <span style={{ fontSize: '14px', color: '#475569' }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>Featured Projects</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B' }}>Sort by:</span>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC' }}>Newest</span>
                <svg width="7" height="5" viewBox="0 0 7 5" fill="none"><path d="M1 1L3.5 4L6 1" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* Job Cards */}
          {jobs.map(job => (
            <div key={job.id} className="fj-job-card">
              {/* Banner image */}
              <JobBanner job={job} />

              {/* Job info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Category + Budget row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#137FEC', letterSpacing: '0.6px', textTransform: 'uppercase' }}>{job.category}</span>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', lineHeight: '28px' }}>{job.title}</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{job.budget}</span>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>{job.budgetType}</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>{job.desc}</p>

                {/* Meta + CTA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#64748B" strokeWidth="1.2"/><path d="M6.5 3.5V6.5L8.5 8.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>{job.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="4" r="2.5" stroke="#64748B" strokeWidth="1"/><path d="M1 10C1 7.8 3 6 5.5 6C8 6 10 7.8 10 10" stroke="#64748B" strokeWidth="1" strokeLinecap="round"/></svg>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>{job.level}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#64748B" strokeWidth="1"/><path d="M6 3V6L8 8" stroke="#64748B" strokeWidth="1" strokeLinecap="round"/></svg>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>{job.posted}</span>
                    </div>
                  </div>
                  <button style={{
                    padding: '8px 24px', background: '#137FEC', border: 'none',
                    borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#FFFFFF',
                    cursor: 'pointer', fontFamily: 'Inter,sans-serif', flexShrink: 0,
                  }}>
                    Submit Proposal
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '16px', gap: '8px' }}>
            <button className="fj-page-btn" onClick={() => setActivePage(Math.max(1, activePage - 1))}>
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6L6 11" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {[1, 2, 3].map(p => (
              <button key={p} className={`fj-page-btn${activePage === p ? ' active' : ''}`} onClick={() => setActivePage(p)} style={{ fontWeight: activePage === p ? '700' : '400' }}>{p}</button>
            ))}
            <button className="fj-page-btn" onClick={() => setActivePage(Math.min(3, activePage + 1))}>
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceJobMarketplace;