import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Dashboard',          path: '/admin/dashboard',      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Jobs Management',    path: '/employer/manage-jobs', icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><rect x="1" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.4"/></svg> },
    { label: 'User Directory',     path: '/admin/users',          icon: <svg width="20" height="18" viewBox="0 0 20 18" fill="none"><circle cx="8" cy="6" r="5" stroke="currentColor" strokeWidth="1.4"/><path d="M1 17C1 13.134 4.134 10 8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M14 12L16 14L20 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Revenue & Billing',  path: '/admin/billing',        icon: <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.4"/><circle cx="5" cy="11" r="1.5" fill="currentColor"/></svg> },
    { label: 'Advanced Analytics', path: '/employer/analytics',   icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><line x1="1" y1="15" x2="1" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="15" x2="5" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="15" x2="9" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="15" x2="13" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="15" x2="17" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { label: 'Support Tickets',    path: '/admin/support',        icon: <svg width="20" height="18" viewBox="0 0 20 18" fill="none"><path d="M1 1H19V14H11L6 17V14H1V1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="5" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  ];

  const kpiCards = [
    { label: 'Total Users',     value: '124,802', delta: '+12%',  deltaColor: '#22C55E', deltaBg: '#F0FDF4', iconBg: '#EFF6FF', iconColor: '#2563EB', note: 'Updated 5m ago',       path: '/admin/users',    icon: <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><circle cx="7" cy="6" r="5" stroke="#2563EB" strokeWidth="1.5"/><path d="M1 15C1 11.134 3.686 9 7 9" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><circle cx="15" cy="6" r="4" stroke="#2563EB" strokeWidth="1.5"/><path d="M12 15C12 11.686 13.686 9 16 9C18.314 9 20 11.686 20 15" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { label: 'Active Jobs',     value: '12,450',  delta: '+5.4%', deltaColor: '#22C55E', deltaBg: '#F0FDF4', iconBg: '#FAF5FF', iconColor: '#9333EA', note: 'Consistent growth',     path: '/employer/manage-jobs', icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><rect x="1" y="4" width="18" height="14" rx="2" stroke="#9333EA" strokeWidth="1.5"/><path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#9333EA" strokeWidth="1.5"/></svg> },
    { label: 'Monthly Revenue', value: '$84,200', delta: '+18.2%',deltaColor: '#22C55E', deltaBg: '#F0FDF4', iconBg: '#F0FDF4', iconColor: '#16A34A', note: 'New subscriptions up',  path: '/admin/billing',  icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#16A34A" strokeWidth="1.5"/><path d="M10 5v10M7 7.5C7 6.672 8.343 6 10 6s3 .672 3 1.5-1.343 1.5-3 1.5-3 .672-3 1.5S8.343 13 10 13s3-.672 3-1.5" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { label: 'Open Tickets',    value: '42',      delta: '-4%',   deltaColor: '#EF4444', deltaBg: '#FEF2F2', iconBg: '#FEF2F2', iconColor: '#DC2626', note: '15 resolved today',    path: '/admin/support',  icon: <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><rect x="1" y="1" width="18" height="14" rx="2" stroke="#DC2626" strokeWidth="1.5"/><path d="M1 6h18M7 11h6" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  ];

  const barHeights = [107, 161, 147, 201, 121, 241, 174, 94, 134, 188, 228, 255];

  const activityFeed = [
    { dotBg: '#DBEAFE', dotColor: '#2563EB', text: 'New employer ',           bold: 'Global Tech Solutions', rest: ' joined the platform.', time: '2 minutes ago'  },
    { dotBg: '#DCFCE7', dotColor: '#16A34A', text: 'Subscription payment of $1,200 received from Adobe.',                                   time: '14 minutes ago' },
    { dotBg: '#FEF9C3', dotColor: '#CA8A04', text: 'System Alert: High latency detected in US-East-1 cluster.',                             time: '1 hour ago'     },
    { dotBg: '#F1F5F9', dotColor: '#475569', text: 'Technical support ticket #9284 closed by Sarah Connor.',                                time: '3 hours ago'    },
    { dotBg: '#DBEAFE', dotColor: '#2563EB', text: 'New job posting: ',        bold: 'Senior UI',             rest: ' Designer approved.',  time: '4 hours ago'    },
  ];

  const pendingJobs = [
    { abbr: 'GO', company: 'Google',  position: 'Cloud Infrastructure Engineer', postedOn: 'Oct 12, 2023' },
    { abbr: 'NF', company: 'Netflix', position: 'Content Delivery Strategist',   postedOn: 'Oct 11, 2023' },
    { abbr: 'TS', company: 'Tesla',   position: 'Embedded Systems Architect',     postedOn: 'Oct 11, 2023' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ad-nav-link { display: flex; flex-direction: row; align-items: center; gap: 12px; padding: 10px 12px; width: 100%; border-radius: 8px; border: none; background: none; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #475569; cursor: pointer; text-align: left; transition: background 0.12s; isolation: isolate; position: relative; }
        .ad-nav-link:hover { background: rgba(19,127,236,0.08); }
        .ad-nav-link.active { background: #137FEC; color: #FFFFFF; font-weight: 600; box-shadow: 0px 4px 6px -1px rgba(19,127,236,0.2), 0px 2px 4px -2px rgba(19,127,236,0.2); }
        .ad-nav-link.active svg { color: #FFFFFF; }
        .ad-search-input { flex: 1; background: transparent; border: none; outline: none; font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A; padding: 0; line-height: 17px; }
        .ad-search-input::placeholder { color: #64748B; }
        .ad-icon-btn { display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px; border: none; cursor: pointer; transition: background 0.12s; }
        .ad-icon-btn:hover { background: #E2E8F0; }
        .ad-kpi-card { box-sizing: border-box; position: relative; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; flex: 1; minWidth: 0; cursor: pointer; transition: box-shadow 0.15s; }
        .ad-kpi-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .btn-export { box-sizing: border-box; display: flex; align-items: center; gap: 8px; padding: 8px 16px; height: 38px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; color: #0F172A; cursor: pointer; transition: background 0.12s; }
        .btn-export:hover { background: #F8FAFC; }
        .btn-new { display: flex; align-items: center; gap: 8px; padding: 8.5px 16px 9.5px; height: 38px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; color: #FFFFFF; cursor: pointer; transition: background 0.15s; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); }
        .btn-new:hover { background: #0e6fd4; }
        .btn-filter-sm { box-sizing: border-box; display: flex; justify-content: center; align-items: center; padding: 4px 12px; height: 26px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 4px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 12px; color: #0F172A; cursor: pointer; }
        .btn-approve-all { display: flex; justify-content: center; align-items: center; padding: 4.5px 12px 5.5px; height: 26px; background: #137FEC; border: none; border-radius: 4px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 12px; color: #FFFFFF; cursor: pointer; }
        .ad-action-btn { display: flex; justify-content: center; align-items: center; width: 25px; height: 25px; border-radius: 4px; background: none; border: none; cursor: pointer; transition: background 0.1s; }
        .ad-action-btn:hover { background: #F1F5F9; }
      `}</style>

      {/* HEADER */}
      <header style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', height: 65, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* ✅ Logo → admin dashboard */}
              <div onClick={() => navigate('/admin/dashboard')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: '#137FEC', borderRadius: 8, cursor: 'pointer' }}>
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><rect x="1" y="4" width="18" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/><path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#FFFFFF" strokeWidth="1.5"/><line x1="1" y1="10" x2="19" y2="10" stroke="#FFFFFF" strokeWidth="1.5"/></svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0 }}>
                <span onClick={() => navigate('/admin/dashboard')} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A', cursor: 'pointer' }}>JobPortal</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: '-0.45px', color: '#137FEC', marginLeft: 4 }}>Enterprise</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 256, height: 40, background: '#F1F5F9', borderRadius: 8, padding: '0 16px', gap: 8 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}><circle cx="6.5" cy="6.5" r="5.5" stroke="#64748B" strokeWidth="1.4"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <input className="ad-search-input" type="text" placeholder="Global search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* ✅ Bell → notifications */}
            <button className="ad-icon-btn" onClick={() => navigate('/notifications')}><svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#475569" strokeWidth="1.4"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#475569" strokeWidth="1.4"/></svg></button>
            {/* ✅ Settings */}
            <button className="ad-icon-btn" onClick={() => navigate('/admin/settings')}><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="#475569" strokeWidth="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
            {/* ✅ Help */}
            <button className="ad-icon-btn" onClick={() => navigate('/admin/support')}><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#475569" strokeWidth="1.4"/><path d="M10 9V10M10 13v.5" stroke="#475569" strokeWidth="1.6" strokeLinecap="round"/><path d="M10 6.5C10 5.672 10.672 5 11.5 5S13 5.672 13 6.5C13 7.5 10 8 10 9" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          <div style={{ width: 1, height: 32, background: '#E2E8F0' }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '18px', color: '#0F172A' }}>Alex Rivera</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>System Admin</p>
            </div>
            {/* ✅ Avatar → admin profile */}
            <div onClick={() => navigate('/employer/profile')} style={{ position: 'relative', width: 40, height: 40, cursor: 'pointer' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A88A, #A8785A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍💼</div>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', boxShadow: '0 0 0 2px rgba(19,127,236,0.2)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR */}
        <aside style={{ boxSizing: 'border-box', width: 256, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 16, overflow: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(item => (
              <button key={item.label} className={`ad-nav-link${activeNav === item.label ? ' active' : ''}`}
                onClick={() => { setActiveNav(item.label); navigate(item.path); }}>
                <span style={{ color: activeNav === item.label ? '#FFFFFF' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ paddingTop: 24, borderTop: '1px solid #E2E8F0' }}>
            <div style={{ position: 'relative', width: '100%', height: 153, background: 'rgba(19,127,236,0.05)', borderRadius: 12, overflow: 'hidden' }}>
              <p style={{ position: 'absolute', left: 16, top: 16, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#137FEC' }}>USAGE PLAN</p>
              <p style={{ position: 'absolute', left: 16, top: 40, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A' }}>Enterprise Pro</p>
              <div style={{ position: 'absolute', left: 16, right: 16, top: 64, height: 6, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80%', background: '#137FEC', borderRadius: '9999px' }} />
              </div>
              <p style={{ position: 'absolute', left: 16, top: 78, fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 10, color: '#64748B' }}>80% of server resources used</p>
              {/* ✅ Upgrade → billing */}
              <button onClick={() => navigate('/admin/billing')} style={{ position: 'absolute', left: 16, right: 16, top: 105, height: 32, background: '#137FEC', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#FFFFFF' }}>Upgrade Now</button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.75px', color: '#0F172A', marginBottom: 4 }}>Platform Overview</h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>Real-time performance metrics for JobPortal Global.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {/* ✅ Export → alert */}
              <button className="btn-export" onClick={() => alert('Exporting report...')}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v8M6 9L3 6M6 9l3-3" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10h10" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Export Report
              </button>
              {/* ✅ New Job Listing → post job */}
              <button className="btn-new" onClick={() => navigate('/employer/post-job')}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><line x1="5.5" y1="1" x2="5.5" y2="10" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/><line x1="1" y1="5.5" x2="10" y2="5.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/></svg>
                New Job Listing
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, position: 'relative', height: 194 }}>
            {kpiCards.map((card, i) => (
              /* ✅ KPI card → related page */
              <div key={i} className="ad-kpi-card" onClick={() => navigate(card.path)}>
                <div style={{ position: 'absolute', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', left: 25, right: 25, top: 25 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 'auto', minHeight: 32, background: card.iconBg, borderRadius: 8, padding: 8 }}>{card.icon}</div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, lineHeight: '16px', color: card.deltaColor, background: card.deltaBg, padding: '4px 8px', borderRadius: '9999px' }}>{card.delta}</span>
                </div>
                <span style={{ position: 'absolute', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '20px', color: '#64748B', left: 25, right: 25, top: 81 }}>{card.label}</span>
                <span style={{ position: 'absolute', fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 24, lineHeight: '32px', color: '#0F172A', left: 25, right: 25, top: 105 }}>{card.value}</span>
                <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 4, left: 25, right: 25, top: 152 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.2"/><path d="M6 4v2.5L8 8" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 11, color: '#94A3B8' }}>{card.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts + Activity Feed */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 298px', gap: 24, position: 'relative', minHeight: 542 }}>
            <div style={{ boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: '24px 24px 43px', display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A', marginBottom: 4 }}>Platform Health & Traffic</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>Hourly system response and visitor metrics</p>
                </div>
                <div style={{ position: 'relative', width: 145, height: 36, background: '#F8FAFC', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 12, fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#0F172A' }}>Last 24 Hours</span>
                  <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', background: '#F8FAFC', borderRadius: 12, padding: '16px 16px 8px', display: 'flex', alignItems: 'flex-end', gap: 8, height: 292, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 8, top: 8, bottom: 0, width: 1, background: '#E2E8F0', zIndex: 0 }} />
                <div style={{ position: 'absolute', left: 8, right: 8, bottom: 0, height: 1, background: '#E2E8F0', zIndex: 0 }} />
                {barHeights.map((h, i) => (
                  <div key={i} style={{ flex: 1, height: h, background: `rgba(19,127,236,${0.2 + i * 0.05})`, borderRadius: '8px 8px 0 0', zIndex: 1, transition: 'height 0.4s ease' }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid #F1F5F9' }}>
                {[
                  { label: 'SERVER UPTIME', value: '99.98%', color: '#22C55E' },
                  { label: 'AVG RESPONSE',  value: '242ms',  color: '#137FEC' },
                  { label: 'ERROR RATE',    value: '0.02%',  color: '#0F172A' },
                ].map((stat, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#64748B' }}>{stat.label}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 18, lineHeight: '28px', color: stat.color, textAlign: 'center' }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div style={{ boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24 }}>
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>Activity Feed</h3>
                {/* ✅ View All → logs */}
                <button onClick={() => navigate('/admin/logs')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#137FEC' }}>View All</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, overflow: 'auto', maxHeight: 440, position: 'relative' }}>
                {activityFeed.map((item, i) => (
                  <div key={i} style={{ position: 'absolute', left: 0, right: 8, top: i * 104, height: 80, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 32, height: 32, minWidth: 32, borderRadius: '50%', background: item.dotBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.dotColor }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>
                        {item.text}{item.bold && <strong>{item.bold}</strong>}{item.rest}
                      </p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#94A3B8' }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Jobs Table */}
          <div style={{ boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'rgba(248,250,252,0.5)', borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>Pending Job Approvals</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-filter-sm" onClick={() => {}}>Filter</button>
                {/* ✅ Approve All → confirm */}
                <button className="btn-approve-all" onClick={() => alert('All jobs approved!')}>Approve All</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 190px 210px', background: 'rgba(248,250,252,0.5)' }}>
                {['COMPANY', 'POSITION', 'POSTED ON', 'ACTIONS'].map((h, i) => (
                  <div key={h} style={{ padding: '12px 24px', textAlign: i === 3 ? 'right' : 'left' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>{h}</span>
                  </div>
                ))}
              </div>
              {pendingJobs.map((job, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 190px 210px', borderTop: i > 0 ? '1px solid #F1F5F9' : 'none', alignItems: 'center' }}>
                  {/* ✅ Company → job detail */}
                  <div onClick={() => navigate('/jobs/1')} style={{ padding: '0 0 0 24px', display: 'flex', alignItems: 'center', gap: 12, height: 65, cursor: 'pointer' }}>
                    <div style={{ width: 32, height: 32, background: '#E2E8F0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#0F172A' }}>{job.abbr}</span>
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{job.company}</span>
                  </div>
                  <div style={{ padding: '21.5px 24px', height: 65 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#0F172A' }}>{job.position}</span>
                  </div>
                  <div style={{ padding: '21.5px 0', height: 65 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>{job.postedOn}</span>
                  </div>
                  <div style={{ padding: '0 24px', height: 65, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                    {/* ✅ Approve */}
                    <button className="ad-action-btn" onClick={() => alert(`${job.company} job approved!`)}>
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="8" stroke="#22C55E" strokeWidth="1.2"/><path d="M5 8.5L7.5 11L12 6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    {/* ✅ Reject */}
                    <button className="ad-action-btn" onClick={() => alert(`${job.company} job rejected!`)}>
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="8" stroke="#EF4444" strokeWidth="1.2"/><line x1="5.5" y1="5.5" x2="11.5" y2="11.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="11.5" y1="5.5" x2="5.5" y2="11.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                    {/* ✅ View → job detail */}
                    <button className="ad-action-btn" onClick={() => navigate('/jobs/1')}>
                      <svg width="18" height="13" viewBox="0 0 18 13" fill="none"><path d="M1 6.5C1 6.5 3.5 1 9 1C14.5 1 17 6.5 17 6.5C17 6.5 14.5 12 9 12C3.5 12 1 6.5 1 6.5Z" stroke="#94A3B8" strokeWidth="1.3"/><circle cx="9" cy="6.5" r="2.5" stroke="#94A3B8" strokeWidth="1.3"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;