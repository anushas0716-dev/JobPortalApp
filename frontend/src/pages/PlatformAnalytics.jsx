import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlatformAnalytics = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Analytics');
  const [chartMode, setChartMode] = useState('Month');

  const navItems = [
    { label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Jobs', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 4V3C6 1.895 6.895 1 8 1H10C11.105 1 12 1.895 12 3V4" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.4"/></svg> },
    { label: 'Users', icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><circle cx="7" cy="5" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M1 15C1 11.686 3.686 9 7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="13" cy="6" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M11 15C11 12.239 12.343 10 13 10C13.657 10 15 12.239 15 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: 'Analytics', icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><line x1="1" y1="15" x2="1" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="15" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="15" x2="9" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="15" x2="13" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="15" x2="17" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { label: 'Reports', icon: <svg width="16" height="18" viewBox="0 0 16 18" fill="none"><rect x="1" y="1" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="4" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="13" x2="9" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  ];

  const kpis = [
    { label: 'TOTAL USERS', value: '42,892', delta: '+12.5%', deltaUp: true, deltaColor: '#22C55E', iconBg: '#DBEAFE', iconColor: '#2563EB', icon: <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><circle cx="7" cy="6" r="5" stroke="#2563EB" strokeWidth="1.5"/><path d="M1 15C1 11.134 3.686 9 7 9" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><circle cx="15" cy="6" r="4" stroke="#2563EB" strokeWidth="1.5"/><path d="M12 15C12 11.686 13.686 9 16 9C18.314 9 20 11.686 20 15" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { label: 'APPLICATIONS', value: '156,230', delta: '+8.2%', deltaUp: true, deltaColor: '#22C55E', iconBg: '#F3E8FF', iconColor: '#9333EA', icon: <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><rect x="1" y="1" width="14" height="18" rx="2" stroke="#9333EA" strokeWidth="1.4"/><line x1="4" y1="6" x2="12" y2="6" stroke="#9333EA" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="10" x2="12" y2="10" stroke="#9333EA" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="14" x2="9" y2="14" stroke="#9333EA" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: 'MATCHING EFFICIENCY', value: '74.2%', delta: '+5.4%', deltaUp: true, deltaColor: '#22C55E', iconBg: '#FFEDD5', iconColor: '#EA580C', icon: <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 1L10 7H16L11 11L13 17L8 13L3 17L5 11L0 7H6L8 1Z" stroke="#EA580C" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
    { label: 'ACTIVE JOBS', value: '3,120', delta: '-2.1%', deltaUp: false, deltaColor: '#EF4444', iconBg: '#D1FAE5', iconColor: '#059669', icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><rect x="1" y="4" width="18" height="14" rx="2" stroke="#059669" strokeWidth="1.5"/><path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#059669" strokeWidth="1.5"/></svg> },
  ];

  const barData = [
    { month: 'MAY', h: 41, shade: 0.4 },
    { month: 'JUN', h: 61, shade: 0.5 },
    { month: 'JUL', h: 87, shade: 0.6 },
    { month: 'AUG', h: 51, shade: 0.5 },
    { month: 'SEP', h: 72, shade: 0.6 },
    { month: 'OCT', h: 97, shade: 0.8 },
    { month: 'NOV', h: 46, shade: 0.4 },
  ];

  // SVG line chart for Application Volume (smooth wave)
  const linePoints = [
    [0, 140], [70, 135], [150, 125], [220, 100], [295, 80], [360, 110], [400, 50]
  ];
  const lineStr = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ');
  // Smooth bezier
  const bezierStr = `M0,140 C30,138 60,132 90,128 C140,118 170,100 220,85 C270,70 300,95 340,108 C370,118 390,60 400,50`;
  const fillStr = `${bezierStr} L400,220 L0,220 Z`;

  const tableRows = [
    { iconBg: '#DBEAFE', iconColor: '#2563EB', category: 'Software Development', matched: '1,240 Candidates', barColor: '#137FEC', barPct: 88, trend: '+4.2%', trendUp: true },
    { iconBg: '#FFEDD5', iconColor: '#EA580C', category: 'Product Design', matched: '850 Candidates', barColor: '#F97316', barPct: 72, trend: '+2.1%', trendUp: true },
    { iconBg: '#F3E8FF', iconColor: '#9333EA', category: 'Marketing & Sales', matched: '2,100 Candidates', barColor: '#A855F7', barPct: 65, trend: '-0.8%', trendUp: false },
  ];

  const iconMap = {
    'Software Development': <svg width="15" height="9" viewBox="0 0 15 9" fill="none"><path d="M4 7L1 4.5L4 2" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 2L14 4.5L11 7" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="1" x2="6" y2="8" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    'Product Design': <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="#EA580C" strokeWidth="1.3"/><circle cx="7.5" cy="7.5" r="2" fill="#EA580C"/><path d="M7.5 1v3M7.5 11v3M1 7.5h3M11 7.5h3" stroke="#EA580C" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    'Marketing & Sales': <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M1 9L5 5L8 7L13 1" stroke="#9333EA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 1H13V4" stroke="#9333EA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="11.5" x2="14" y2="11.5" stroke="#9333EA" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pa-nav-link {
          display: flex; flex-direction: row; align-items: center;
          gap: 12px; padding: 8px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s;
        }
        .pa-nav-link:hover { background: #F1F5F9; }
        .pa-nav-link.active {
          background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 700;
          border-right: 3px solid #137FEC;
        }

        .pa-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
        }
        .pa-search-input::placeholder { color: #64748B; }

        .pa-icon-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px;
          border: none; cursor: pointer; transition: background 0.12s;
        }
        .pa-icon-btn:hover { background: #E2E8F0; }

        .pa-kpi {
          box-sizing: border-box; position: relative;
          background: #FFFFFF; border: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px;
          height: 154px; flex: 1; min-width: 0;
        }

        .pa-chart-card {
          box-sizing: border-box; background: #FFFFFF; border: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px;
          padding: 24px; display: flex; flex-direction: column; gap: 20px; flex: 1;
        }

        .pa-toggle-btn {
          padding: 4px 10px; border-radius: 4px; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          transition: background 0.15s;
        }
        .pa-toggle-btn.active { background: #137FEC; color: #FFFFFF; }
        .pa-toggle-btn:not(.active) { background: #F1F5F9; color: #475569; }

        .pa-action-row-btn {
          display: flex; justify-content: center; align-items: center;
          width: 4px; height: 16px; background: none; border: none; cursor: pointer; padding: 0;
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                <rect x="1" y="4" width="18" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#FFFFFF" strokeWidth="1.5"/>
                <line x1="1" y1="10" x2="19" y2="10" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>Admin Panel</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: 256, height: 40, background: '#F1F5F9', borderRadius: 8, padding: '0 16px', gap: 10 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#64748B" strokeWidth="1.4"/>
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input className="pa-search-input" type="text" placeholder="Search analytics..." />
          </div>
        </div>
        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="pa-icon-btn"><svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#334155" strokeWidth="1.4"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#334155" strokeWidth="1.4"/></svg></button>
            <button className="pa-icon-btn"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="#334155" strokeWidth="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          <div style={{ boxSizing: 'border-box', width: 40, height: 40, borderRadius: '50%', background: '#D4A96A', border: '2px solid #137FEC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>👤</div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ boxSizing: 'border-box', width: 256, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: 16, display: 'flex', flexDirection: 'column', gap: 4, overflow: 'auto' }}>
          {/* Branding */}
          <div style={{ padding: '8px 12px 16px' }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A', lineHeight: '24px' }}>Job Portal</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>Management Console</p>
          </div>
          {navItems.map(item => (
            <button key={item.label} className={`pa-nav-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
              <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, overflow: 'auto', padding: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30, letterSpacing: '-0.75px', color: '#0F172A', lineHeight: '36px' }}>Platform Analytics</h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, color: '#64748B', lineHeight: '24px', maxWidth: 480 }}>
                Comprehensive overview of user growth, application rates, and placement success.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Date range picker */}
              <div style={{ boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', height: 38, background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 8, cursor: 'pointer' }}>
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                  <rect x="0.5" y="1.5" width="10" height="10" rx="1.5" stroke="#64748B" strokeWidth="1.1"/>
                  <line x1="0.5" y1="5" x2="10.5" y2="5" stroke="#64748B" strokeWidth="1.1"/>
                  <line x1="3" y1="0.5" x2="3" y2="2.5" stroke="#64748B" strokeWidth="1.1" strokeLinecap="round"/>
                  <line x1="8" y1="0.5" x2="8" y2="2.5" stroke="#64748B" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#334155' }}>Oct 01, 2023 - Oct 30, 2023</span>
                <svg width="7" height="4" viewBox="0 0 7 4" fill="none"><path d="M1 1L3.5 3.5L6 1" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {/* Export button */}
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', height: 36,
                background: '#137FEC', borderRadius: 8, border: 'none',
                fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF',
                cursor: 'pointer', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v7M5 8L2.5 5.5M5 8l2.5-2.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="1" y1="9.5" x2="9" y2="9.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Export Data
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'flex', gap: 24, position: 'relative', height: 154 }}>
            {kpis.map((kpi, i) => (
              <div key={i} className="pa-kpi">
                {/* Top row: icon + delta */}
                <div style={{ position: 'absolute', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', left: 25, right: 25, top: 25 }}>
                  <div style={{ padding: 8, background: kpi.iconBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {kpi.icon}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: kpi.deltaColor }}>{kpi.delta}</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d={kpi.deltaUp ? "M1 5L5 1L9 5" : "M1 1L5 5L9 1"} stroke={kpi.deltaColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {/* Label */}
                <span style={{ position: 'absolute', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B', left: 25, right: 25, top: 81 }}>{kpi.label}</span>
                {/* Value */}
                <span style={{ position: 'absolute', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 24, lineHeight: '32px', color: '#0F172A', left: 25, right: 25, top: 97 }}>{kpi.value}</span>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'flex', gap: 24, height: 385 }}>
            {/* Bar chart: User Growth Trends */}
            <div className="pa-chart-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A' }}>User Growth Trends</h3>
                <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 6, padding: 2, gap: 2 }}>
                  {['Day', 'Month'].map(mode => (
                    <button key={mode} className={`pa-toggle-btn${chartMode === mode ? ' active' : ''}`} onClick={() => setChartMode(mode)}>{mode}</button>
                  ))}
                </div>
              </div>
              {/* Chart area */}
              <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map(pct => (
                  <div key={pct} style={{ position: 'absolute', left: 0, right: 0, bottom: `${pct}%`, height: 1, background: '#F1F5F9', zIndex: 0 }} />
                ))}
                {/* Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: '100%', paddingBottom: 24, position: 'relative', zIndex: 1 }}>
                  {barData.map((bar, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, justifyContent: 'flex-end', height: '100%' }}>
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-end' }}>
                        {/* Full bar (light) */}
                        <div style={{ width: '100%', height: bar.h + 20, background: `rgba(19,127,236,${bar.shade * 0.4})`, borderRadius: '6px 6px 0 0', position: 'relative', overflow: 'hidden' }}>
                          {/* Dark portion at bottom */}
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${bar.h}%`, background: `rgba(19,127,236,${bar.shade})`, borderRadius: '4px 4px 0 0' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* X-axis labels */}
                <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
                  {barData.map(bar => (
                    <div key={bar.month} style={{ flex: 1, textAlign: 'center', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, textTransform: 'uppercase', color: '#94A3B8' }}>
                      {bar.month}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line chart: Application Volume */}
            <div className="pa-chart-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A' }}>Application Volume</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#137FEC' }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, textTransform: 'uppercase', color: '#64748B' }}>DIRECT</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#CBD5E1' }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, textTransform: 'uppercase', color: '#64748B' }}>REFERRAL</span>
                  </div>
                </div>
              </div>
              {/* SVG line chart */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <svg width="100%" height="100%" viewBox="0 0 400 260" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                  {/* Grid lines */}
                  {[0, 65, 130, 195].map((y, i) => (
                    <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="#F1F5F9" strokeWidth="1"/>
                  ))}
                  {/* Fill */}
                  <path d={fillStr} fill="url(#lineGrad)" opacity="0.5"/>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#137FEC" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#137FEC" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {/* Line */}
                  <path d={bezierStr} fill="none" stroke="#137FEC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Data point */}
                  <circle cx="295" cy="80" r="5" fill="#137FEC" stroke="#FFFFFF" strokeWidth="2"/>
                </svg>
                {/* X axis labels */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
                  {['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'].map(w => (
                    <span key={w} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, textTransform: 'uppercase', color: '#94A3B8' }}>{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table: Recent Top Matching Performance */}
          <div style={{ boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden' }}>
            {/* Table header bar */}
            <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #E2E8F0' }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#0F172A' }}>Recent Top Matching Performance</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', height: 30, border: '1px solid #E2E8F0', borderRadius: 8, background: '#FFFFFF', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#475569', cursor: 'pointer' }}>
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none"><line x1="0" y1="1" x2="11" y2="1" stroke="#475569" strokeWidth="1.1" strokeLinecap="round"/><line x1="2" y1="4" x2="9" y2="4" stroke="#475569" strokeWidth="1.1" strokeLinecap="round"/><line x1="4" y1="7" x2="7" y2="7" stroke="#475569" strokeWidth="1.1" strokeLinecap="round"/></svg>
                  Filter
                </button>
                <button style={{ display: 'flex', alignItems: 'center', padding: '8.5px 12px', height: 34, background: '#F1F5F9', borderRadius: 8, border: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#475569', cursor: 'pointer' }}>
                  View All
                </button>
              </div>
            </div>

            {/* Table columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 215px 215px 114px 109px', background: '#F8FAFC' }}>
              {['CATEGORY', 'MATCHED CANDIDATES', 'EFFICIENCY', 'TREND', 'ACTION'].map((h, i) => (
                <div key={h} style={{ padding: '12px 24px', textAlign: i === 4 ? 'right' : 'left' }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: '#64748B' }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Table rows */}
            {tableRows.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 215px 215px 114px 109px', borderTop: i > 0 ? '1px solid #F1F5F9' : 'none', alignItems: 'center', height: 65 }}>
                {/* Category */}
                <div style={{ padding: '0 0 0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 4, background: row.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {iconMap[row.category]}
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{row.category}</span>
                </div>
                {/* Matched */}
                <div style={{ padding: '0 24px' }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#475569' }}>{row.matched}</span>
                </div>
                {/* Efficiency bar */}
                <div style={{ padding: '0', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 96, height: 8, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden', flexShrink: 0 }}>
                    <div style={{ width: `${row.barPct}%`, height: '100%', background: row.barColor, borderRadius: '9999px' }} />
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#334155' }}>{row.barPct}%</span>
                </div>
                {/* Trend */}
                <div style={{ padding: '0 0 0 24px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d={row.trendUp ? "M1 6L5 2L9 4L11 1" : "M1 1L4 4L7 2L11 6"} stroke={row.trendUp ? '#22C55E' : '#EF4444'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: row.trendUp ? '#22C55E' : '#EF4444' }}>{row.trend}</span>
                </div>
                {/* Action */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 24 }}>
                  <button className="pa-action-row-btn">
                    <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                      <circle cx="2" cy="2" r="1.5" fill="#94A3B8"/>
                      <circle cx="2" cy="8" r="1.5" fill="#94A3B8"/>
                      <circle cx="2" cy="14" r="1.5" fill="#94A3B8"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlatformAnalytics;