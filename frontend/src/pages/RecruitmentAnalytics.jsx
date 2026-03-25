import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecruitmentAnalytics = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [showInsight, setShowInsight] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const mainNav = [
    {
      label: 'Dashboard', icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      label: 'Job Postings', icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 4V3C6 1.895 6.895 1 8 1H10C11.105 1 12 1.895 12 3V4" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      label: 'Candidates', icon: (
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <circle cx="7" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="15" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M1 15C1 11.686 3.686 9 7 9C10.314 9 13 11.686 13 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 9C17.209 9 19 10.791 19 13V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      label: 'Deep Analytics', icon: (
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
          <line x1="1" y1="15" x2="1" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="5" y1="15" x2="5" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="15" x2="9" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="13" y1="15" x2="13" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="17" y1="15" x2="17" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
  ];

  const teamNav = [
    {
      label: 'Recruiters', icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 17C2 13.134 5.134 10 9 10C12.866 10 16 13.134 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8L14 10L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      label: 'Pipeline Setup', icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="3" cy="3" r="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="15" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="3" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 3H9C12.314 3 15 5.686 15 9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M15 9C15 12.314 12.314 15 9 15H5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
  ];

  const kpiCards = [
    { label: 'Total Hires', value: '1,284', delta: '+12.4%', deltaColor: '#16A34A', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="7" r="4" stroke="#137FEC" strokeWidth="1.6"/><path d="M3 20C3 15.582 6.582 12 11 12C15.418 12 19 15.582 19 20" stroke="#137FEC" strokeWidth="1.6" strokeLinecap="round"/><path d="M14 10L16 12L19 9" stroke="#137FEC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Avg. Time to Hire', value: '21 Days', delta: '-3 days', deltaColor: '#DC2626', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="12" r="8" stroke="#137FEC" strokeWidth="1.6"/><path d="M11 8V12L14 14" stroke="#137FEC" strokeWidth="1.6" strokeLinecap="round"/><path d="M7 3L11 1L15 3" stroke="#137FEC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Offer Accept Rate', value: '89.4%', delta: '+5.2%', deltaColor: '#16A34A', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="#137FEC" strokeWidth="1.6"/><path d="M6 11L9.5 14.5L16 8" stroke="#137FEC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Cost Per Hire', value: '$4,120', delta: 'Stable', deltaColor: '#64748B', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="5" width="18" height="13" rx="2" stroke="#137FEC" strokeWidth="1.6"/><path d="M2 10H20" stroke="#137FEC" strokeWidth="1.6"/><circle cx="7" cy="14" r="1.5" fill="#137FEC"/></svg> },
  ];

  const funnelData = [
    { label: 'Applied', count: '12,400 Candidates', pct: 100, barColor: '#137FEC' },
    { label: 'Screened', count: '3,200 (25.8%)', pct: 26, barColor: '#137FEC' },
    { label: 'Interviewed', count: '840 (26.2%)', pct: 12, barColor: '#137FEC' },
    { label: 'Offered', count: '142 (16.9%)', pct: 4, barColor: '#BFDBFE' },
    { label: 'Hired', count: '126 (88.7%)', pct: 3, barColor: '#BFDBFE' },
  ];

  const sourceData = [
    { label: 'LinkedIn', pct: 42, barColor: '#137FEC', trackColor: '#DBEAFE' },
    { label: 'Direct Application', pct: 28, barColor: '#137FEC', trackColor: '#DBEAFE' },
    { label: 'Referrals', pct: 18, barColor: '#94A3B8', trackColor: '#E2E8F0' },
    { label: 'Agencies', pct: 12, barColor: '#94A3B8', trackColor: '#E2E8F0' },
  ];

  const leaderboard = [
    { name: 'Sarah Chen', role: 'Senior Tech Recruiter', jobs: 12, hires: 14, tth: '18 Days', nps: 4.8, trend: 'up', avatar: '👩' },
    { name: 'Michael Ross', role: 'Commercial Recruiter', jobs: 8, hires: 9, tth: '24 Days', nps: 4.5, trend: 'flat', avatar: '👨' },
    { name: 'Elena Rodriguez', role: 'Executive Search', jobs: 4, hires: 2, tth: '45 Days', nps: 4.9, trend: 'up', avatar: '👩‍🦱' },
  ];

  const barHeights = [55, 65, 70, 80, 60, 30];
  const barMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ra-sidebar-link {
          display: flex; flex-direction: row; align-items: center;
          gap: 10px; padding: 9px 12px; width: 100%; height: 38px;
          border-radius: 8px; border: none; background: none;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          color: #475569; cursor: pointer; text-align: left; transition: background 0.12s, color 0.12s;
        }
        .ra-sidebar-link:hover { background: #F1F5F9; }
        .ra-sidebar-link.active {
          background: #137FEC; color: #FFFFFF; font-weight: 600;
        }
        .ra-sidebar-link.active svg { color: #FFFFFF; }

        .ra-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          padding: 8px 12px;
        }
        .ra-search-input::placeholder { color: #94A3B8; }

        .ra-card {
          background: #FFFFFF; border: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px;
        }

        .btn-date {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; height: 36px;
          background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-weight: 500; font-size: 13px;
          color: #334155; cursor: pointer; transition: background 0.12s;
        }
        .btn-date:hover { background: #F8FAFC; }

        .btn-export {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; height: 36px;
          background: #137FEC; border: none; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13px;
          color: #FFFFFF; cursor: pointer; transition: background 0.15s;
        }
        .btn-export:hover { background: #0e6fd4; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 24px', height: 56,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: '#137FEC', borderRadius: 8 }}>
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1" fill="#FFFFFF" opacity="0.9"/>
              <rect x="10" y="1" width="7" height="7" rx="1" fill="#FFFFFF" opacity="0.6"/>
              <rect x="1" y="10" width="7" height="5" rx="1" fill="#FFFFFF" opacity="0.6"/>
              <rect x="10" y="10" width="7" height="5" rx="1" fill="#FFFFFF" opacity="0.9"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', color: '#0F172A' }}>
            Recruitly Pro
          </span>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          width: 280, height: 36, background: '#F8FAFC',
          border: '1px solid #E2E8F0', borderRadius: 8, gap: 0,
        }}>
          <div style={{ paddingLeft: 12, display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.3"/>
              <line x1="10" y1="10" x2="13" y2="13" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <input
            className="ra-search-input"
            type="text"
            placeholder="Search metrics, recruiters, or jobs"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path d="M8 0C8 0 3 3 3 9v3.5l-2 2v1h14v-1l-2-2V9C13 3 8 0 8 0Z" stroke="#64748B" strokeWidth="1.4"/>
              <path d="M6 16c0 1.105.895 2 2 2s2-.895 2-2" stroke="#64748B" strokeWidth="1.4"/>
            </svg>
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" stroke="#64748B" strokeWidth="1.4"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer', color: '#fff', fontWeight: 600 }}>
            S
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: 190, flexShrink: 0,
          background: '#FFFFFF', borderRight: '1px solid #E2E8F0',
          display: 'flex', flexDirection: 'column',
          padding: '20px 12px', gap: 0, overflow: 'auto',
        }}>
          {/* Main Menu */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', padding: '0 12px', marginBottom: 8 }}>
              MAIN MENU
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mainNav.map(item => (
                <button key={item.label} className={`ra-sidebar-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
                  <span style={{ flexShrink: 0, color: activeNav === item.label ? '#FFFFFF' : '#475569', display: 'flex' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Team Management */}
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', padding: '0 12px', marginBottom: 8 }}>
              TEAM MANAGEMENT
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {teamNav.map(item => (
                <button key={item.label} className={`ra-sidebar-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
                  <span style={{ flexShrink: 0, color: '#475569', display: 'flex' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, overflow: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: '34px', color: '#0F172A', letterSpacing: '-0.5px' }}>
                Recruitment Analytics
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B', marginTop: 4 }}>
                Real-time insights into your global hiring health.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="btn-date">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="#334155" strokeWidth="1.3"/>
                  <line x1="1" y1="6" x2="13" y2="6" stroke="#334155" strokeWidth="1.3"/>
                  <line x1="4" y1="1" x2="4" y2="3" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/>
                  <line x1="10" y1="1" x2="10" y2="3" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Last 30 Days
              </button>
              <button className="btn-export">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1v8M3 6l3.5 3.5L10 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 10v2h11v-2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Export Report
              </button>
            </div>
          </div>

          {/* ── KPI CARDS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {kpiCards.map((card, i) => (
              <div key={i} className="ra-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(19,127,236,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {card.icon}
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: card.deltaColor }}>
                    {card.delta}
                  </span>
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 13, color: '#64748B', marginBottom: 4 }}>
                  {card.label}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 26, lineHeight: '32px', color: '#0F172A', letterSpacing: '-0.5px' }}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* ── FUNNEL + SOURCE OF HIRE ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>

            {/* Application Funnel */}
            <div className="ra-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A' }}>
                  Application Funnel Efficiency
                </h2>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#94A3B8' }}>
                  Current Quarter
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {funnelData.map((row, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13, color: '#334155' }}>{row.label}</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: '#64748B' }}>{row.count}</span>
                    </div>
                    <div style={{ width: '100%', height: 28, background: '#EFF6FF', borderRadius: 6, overflow: 'hidden' }}>
                      <div style={{
                        width: `${row.pct}%`, height: '100%',
                        background: row.barColor,
                        borderRadius: 6, transition: 'width 0.5s ease',
                        minWidth: row.pct > 0 ? 28 : 0,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source of Hire */}
            <div className="ra-card" style={{ padding: 24 }}>
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 20 }}>
                Source of Hire
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {sourceData.map((src, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    {/* Circle progress */}
                    <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44">
                        <circle cx="22" cy="22" r="18" fill="none" stroke="#EFF6FF" strokeWidth="5"/>
                        <circle cx="22" cy="22" r="18" fill="none"
                          stroke={i < 2 ? '#137FEC' : '#94A3B8'}
                          strokeWidth="5"
                          strokeDasharray={`${2 * Math.PI * 18 * src.pct / 100} ${2 * Math.PI * 18}`}
                          strokeLinecap="round"
                          transform="rotate(-90 22 22)"
                        />
                      </svg>
                      <span style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, color: '#0F172A',
                      }}>{src.pct}%</span>
                    </div>
                    {/* Label + bar */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: '#0F172A', marginBottom: 5 }}>
                        {src.label}
                      </p>
                      <div style={{ width: '100%', height: 4, background: '#E2E8F0', borderRadius: 9999 }}>
                        <div style={{ width: `${src.pct}%`, height: '100%', background: i < 2 ? '#137FEC' : '#94A3B8', borderRadius: 9999 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.7px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 4 }}>
                  MOST EFFECTIVE SOURCE
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#137FEC' }}>
                  LinkedIn Recruiter
                </p>
              </div>
            </div>
          </div>

          {/* ── LEADERBOARD ── */}
          <div className="ra-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A' }}>
                Recruiter Performance Leaderboard
              </h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: '#137FEC' }}>
                View All
              </button>
            </div>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px',
              padding: '0 8px 10px', borderBottom: '1px solid #F1F5F9',
            }}>
              {['RECRUITER', 'ACTIVE JOBS', 'HIRES (MTD)', 'AVG. TTH', 'CANDIDATE NPS', 'TREND'].map(h => (
                <span key={h} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.7px', textTransform: 'uppercase', color: '#94A3B8' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {leaderboard.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px',
                padding: '14px 8px', borderBottom: i < leaderboard.length - 1 ? '1px solid #F8FAFC' : 'none',
                alignItems: 'center',
              }}>
                {/* Recruiter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    {r.avatar}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{r.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>{r.role}</p>
                  </div>
                </div>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#334155' }}>{r.jobs}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{r.hires}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B' }}>{r.tth}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{r.nps}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2L7.5 5.5L11 6L8.5 8.5L9 12L6 10.5L3 12L3.5 8.5L1 6L4.5 5.5L6 2Z" fill="#F59E0B"/>
                  </svg>
                </div>
                {/* Trend */}
                <div>
                  {r.trend === 'up' ? (
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                      <path d="M2 14L8 8L12 12L20 4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 4H20V8" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                      <path d="M2 9H20" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── TIME TO HIRE + STRATEGIC INSIGHT ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, paddingBottom: 8 }}>

            {/* Bar Chart */}
            <div className="ra-card" style={{ padding: 24 }}>
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 24 }}>
                Time to Hire Trend
              </h2>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 120 }}>
                {barHeights.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: '100%', height: h,
                      background: i === 4 ? '#137FEC' : '#BFDBFE',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease',
                    }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 10, color: '#94A3B8', letterSpacing: '0.5px' }}>
                      {barMonths[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Insight */}
            {showInsight && (
              <div style={{
                background: '#137FEC', borderRadius: 12, padding: 24,
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
                    <path d="M9 6C9 4.895 9.895 4 11 4V4C12.105 4 13 4.895 13 6V6C13 7.105 12.105 8 11 8H9V10" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="9" cy="13" r="1" fill="#FFFFFF"/>
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>
                    Strategic Insight
                  </span>
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 13, lineHeight: '20px', color: 'rgba(255,255,255,0.9)' }}>
                  Your <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 2 }}>Time to Hire</span> for Software Engineering roles is 14% higher than the industry average. Shortening the 'Technical Assessment' stage by 48 hours could increase offer acceptance by ~8%.
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{
                    padding: '8px 16px', background: '#FFFFFF', border: 'none',
                    borderRadius: 8, cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                    fontWeight: 600, fontSize: 13, color: '#137FEC', transition: 'opacity 0.15s',
                  }}>
                    Optimization Plan
                  </button>
                  <button style={{
                    padding: '8px 16px', background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 8, cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                    fontWeight: 600, fontSize: 13, color: '#FFFFFF', transition: 'background 0.15s',
                  }} onClick={() => setShowInsight(false)}>
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default RecruitmentAnalytics;