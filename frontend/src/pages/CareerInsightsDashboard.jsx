import React, { useState } from 'react';

const CareerInsightsDashboard = () => {
  const [activeTab, setActiveTab] = useState('Software Engineering');
  const [activeNav, setActiveNav] = useState('Main Dashboard');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('United States');

  const tabs = ['Software Engineering', 'Product & Design', 'Data & AI', 'Marketing & Sales'];

  const sidebarMain = [
    { label: 'Main Dashboard', icon: '▦' },
    { label: 'Market Analysis', icon: '↗' },
    { label: 'Salary Benchmarking', icon: '💳' },
    { label: 'Regional Demand', icon: '🌐' },
    { label: 'Competitor Hiring', icon: '▤' },
  ];

  const sidebarReports = [
    { label: '2024 Tech Outlook' },
    { label: 'Q3 Salary Guide' },
  ];

  const stats = [
    { label: 'Avg. Annual Salary', value: '$148,400', badge: '+5.2%', badgeBg: '#DCFCE7', badgeColor: '#16A34A', barColor: '#137FEC', barPct: 75 },
    { label: 'Hiring Demand', value: 'Strong', badge: '-2.1%', badgeBg: '#FEE2E2', badgeColor: '#DC2626', barColor: '#F97316', barPct: 88 },
    { label: 'Remote Availability', value: '46.5%', badge: '+12%', badgeBg: '#DCFCE7', badgeColor: '#16A34A', barColor: '#10B981', barPct: 46 },
    { label: 'Open Vacancies', value: '12,408', badge: 'Stable', badgeBg: '#F1F5F9', badgeColor: '#475569', barColor: '#137FEC', barPct: 60 },
  ];

  // Salary trend bar chart data (12 months)
  const chartBars = [
    { month: 'JAN', pct: 41, opacity: 0.1 },
    { month: 'FEB', pct: 46, opacity: 0.1 },
    { month: 'MAR', pct: 57, opacity: 0.2 },
    { month: 'APR', pct: 54, opacity: 0.2 },
    { month: 'MAY', pct: 67, opacity: 0.4 },
    { month: 'JUN', pct: 70, opacity: 0.4 },
    { month: 'JUL', pct: 77, opacity: 0.6 },
    { month: 'AUG', pct: 74, opacity: 0.6 },
    { month: 'SEP', pct: 88, opacity: 0.8 },
    { month: 'OCT', pct: 85, opacity: 0.8 },
    { month: 'NOV', pct: 98, opacity: 1 },
    { month: 'DEC', pct: 100, opacity: 1 },
  ];

  const regionData = [
    { city: 'San Francisco, CA', demand: 'Very High', demandColor: '#137FEC' },
    { city: 'New York, NY', demand: 'High', demandColor: '#137FEC' },
    { city: 'Austin, TX', demand: 'Moderate', demandColor: '#0F172A' },
  ];

  const companies = [
    { initial: 'G', name: 'GlobalTech Solutions', postings: '240 Active Postings' },
    { initial: 'N', name: 'NexGen AI Labs', postings: '185 Active Postings' },
    { initial: 'S', name: 'Skyline Cyber', postings: '142 Active Postings' },
  ];

  const trendingSkills = [
    [
      { label: 'Large Language Models', active: true },
      { label: 'Rust', active: true },
      { label: 'Kubernetes', active: false },
    ],
    [
      { label: 'TypeScript', active: true },
      { label: 'React Native', active: false },
      { label: 'Cloud Security', active: false },
    ],
    [
      { label: 'Prompt Engineering', active: true },
      { label: 'GraphQL', active: false },
      { label: 'GoLang', active: false },
    ],
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .ci-nav-link { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; border: none; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .ci-nav-link.active { background: #137FEC; color: #FFFFFF; }
        .ci-nav-link:not(.active) { background: transparent; color: #475569; }
        .ci-nav-link:not(.active):hover { background: #F1F5F9; }
        .ci-tab { padding: 0 0 12px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; border-bottom: 2px solid transparent; transition: all 0.15s; white-space: nowrap; }
        .ci-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .ci-tab:not(.active) { color: #64748B; }
        .ci-skill-pill { padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; white-space: nowrap; }
        .ci-skill-pill.active { background: rgba(19,127,236,0.1); border: 1px solid rgba(19,127,236,0.2); color: #137FEC; }
        .ci-skill-pill:not(.active) { background: #F1F5F9; border: 1px solid transparent; color: #475569; }
        .ci-company-row { display: flex; align-items: center; gap: 16px; padding: 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s; }
        .ci-company-row:hover { background: #F8FAFC; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Logo + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '27px', height: '29px', background: '#137FEC', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path d="M1 13L5 7L9 10L13 4L15 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.27px' }}>CareerInsights</span>
          </div>
          {/* Search bar */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', color: '#64748B', fontSize: '13px' }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search roles or companies"
              style={{ border: 'none', outline: 'none', fontSize: '16px', background: 'transparent', color: '#64748B', width: '100%', padding: '0 12px 0 36px', fontFamily: 'Inter,sans-serif' }}
            />
          </div>
        </div>

        {/* Nav links + Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {['Market Trends', 'Salaries', 'Hiring', 'Companies'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ width: '36px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#334155"/></svg>
            </button>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="#334155" strokeWidth="1.5"/><path d="M10 1V3M10 17V19M1 10H3M17 10H19M3.5 3.5L5 5M15 15L16.5 16.5M3.5 16.5L5 15M15 5L16.5 3.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" fill="#137FEC"/><path d="M3 20C3 16.1 6.6 13 11 13C15.4 13 19 16.1 19 20" stroke="#137FEC" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: '288px', flexShrink: 0,
          background: '#FFFFFF', borderRight: '1px solid #E2E8F0',
          padding: '16px', minHeight: 'calc(100vh - 65px)',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          {/* User/Plan */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
            <div style={{ width: '40px', height: '40px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="10" rx="2" stroke="white" strokeWidth="1.5"/><path d="M5 15H13M9 12V15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', lineHeight: '14px', marginBottom: '4px' }}>Insight Pro</div>
              <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>Enterprise<br/>Plan</div>
            </div>
          </div>

          {/* Main nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sidebarMain.map(item => (
              <button
                key={item.label}
                className={`ci-nav-link${activeNav === item.label ? ' active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span style={{ fontSize: '16px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Reports section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '40px' }}>
            <div style={{ padding: '0 12px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Reports</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sidebarReports.map(r => (
                <button key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'Inter,sans-serif', borderRadius: '8px', width: '100%' }}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M1 1H7L9 3V11H1V1Z" stroke="#475569" strokeWidth="1.3"/><line x1="3" y1="5" x2="7" y2="5" stroke="#475569" strokeWidth="1.2"/><line x1="3" y1="7.5" x2="7" y2="7.5" stroke="#475569" strokeWidth="1.2"/></svg>
                  <span style={{ fontSize: '14px', color: '#475569' }}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px' }}>Market Intelligence</h1>
              <p style={{ fontSize: '16px', color: '#64748B' }}>Visualizing global hiring trends and talent benchmarks</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 3H9M2 6H8M4 9H6" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Filter Data
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1V7M2 5L5 8L8 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Export Report
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '32px' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`ci-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >{tab}</button>
            ))}
          </div>

          {/* ── Stats Grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>{s.label}</span>
                  <span style={{ background: s.badgeBg, color: s.badgeColor, fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '9999px' }}>{s.badge}</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>{s.value}</div>
                <div style={{ paddingTop: '12px' }}>
                  <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${s.barPct}%`, height: '100%', background: s.barColor, borderRadius: '9999px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 298px', gap: '24px' }}>

            {/* Salary Trend Chart */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Salary Trend (Last 12 Months)</h3>
                <select
                  value={region} onChange={e => setRegion(e.target.value)}
                  style={{ height: '24px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#0F172A', padding: '0 28px 0 10px', fontFamily: 'Inter,sans-serif', cursor: 'pointer', appearance: 'none', outline: 'none' }}
                >
                  <option>United States</option>
                  <option>Europe</option>
                  <option>Asia Pacific</option>
                </select>
              </div>

              {/* Bar chart */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 8px', height: '248px', gap: '8px' }}>
                  {chartBars.map((bar, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                      <div style={{
                        width: '100%',
                        height: `${bar.pct * 2.48}px`,
                        background: `rgba(19,127,236,${bar.opacity})`,
                        borderRadius: '4px 4px 0 0',
                      }} />
                    </div>
                  ))}
                </div>
                {/* Month labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
                  {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'DEC'].map((m, i) => (
                    <span key={i} style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Demand by Region */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Demand by Region</h3>

              {/* Map placeholder */}
              <div style={{ width: '100%', aspectRatio: '1/1', background: '#F1F5F9', borderRadius: '8px', position: 'relative', overflow: 'hidden', marginBottom: '16px' }}>
                {/* Map grid lines */}
                <svg width="100%" height="100%" viewBox="0 0 249 249" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                  <rect width="249" height="249" fill="#e8f0f8"/>
                  {/* Simplified map-like shapes */}
                  <path d="M20 80 Q60 60 100 75 Q140 90 180 70 Q210 55 230 80 L230 170 Q200 185 160 175 Q120 165 80 180 Q50 190 20 170Z" fill="#c8d8e8" stroke="#a0b8cc" strokeWidth="1"/>
                  <path d="M60 110 Q80 100 100 108 Q120 116 140 108 Q160 100 180 110 L175 150 Q155 158 130 154 Q105 150 80 155 Q65 158 60 148Z" fill="#b0c8dc" stroke="#90b0c4" strokeWidth="0.5"/>
                  {/* Demand dots */}
                  <circle cx="82" cy="95" r="6" fill="#137FEC" stroke="white" strokeWidth="2"/>
                  <circle cx="133" cy="124" r="6" fill="#137FEC" stroke="white" strokeWidth="2"/>
                  <circle cx="174" cy="155" r="6" fill="#137FEC" stroke="white" strokeWidth="2"/>
                </svg>
                {/* Overlay label */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', borderRadius: '4px', padding: '4px 10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>Interactive Map View</span>
                  </div>
                </div>
              </div>

              {/* Region list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {regionData.map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#475569' }}>{r.city}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: r.demandColor }}>{r.demand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* Top Hiring Companies */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="5" width="16" height="12" rx="1.5" stroke="#137FEC" strokeWidth="1.5"/><path d="M5 5V4C5 2.9 5.9 2 7 2H11C12.1 2 13 2.9 13 4V5" stroke="#137FEC" strokeWidth="1.5"/><line x1="5" y1="9" x2="13" y2="9" stroke="#137FEC" strokeWidth="1.2"/><line x1="5" y1="12" x2="9" y2="12" stroke="#137FEC" strokeWidth="1.2"/></svg>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Top Hiring Companies</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {companies.map((c, i) => (
                  <div key={i} className="ci-company-row">
                    <div style={{ width: '40px', height: '40px', background: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '16px', fontWeight: '900', color: '#94A3B8' }}>{c.initial}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>{c.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{c.postings}</div>
                    </div>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M1 1L7 6L1 11" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Trending Skills */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 1L10 7H16L11 11L13 17L8 13.5L3 17L5 11L0 7H6Z" fill="#137FEC"/></svg>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Top Trending Skills</h3>
              </div>

              {/* Skill pills — 3 rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {trendingSkills.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {row.map((skill, si) => (
                      <span key={si} className={`ci-skill-pill${skill.active ? ' active' : ''}`}>{skill.label}</span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Market Saturation bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Market Saturation</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>High Competitive</span>
                </div>
                <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: '#137FEC', borderRadius: '9999px' }} />
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CareerInsightsDashboard;