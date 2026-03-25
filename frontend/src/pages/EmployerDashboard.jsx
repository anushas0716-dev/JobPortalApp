import React, { useState } from 'react';

const EmployerDashboard = () => {
  const [activeNav, setActiveNav] = useState('Overview');
  const [search, setSearch] = useState('');

  const hiringLinks = [
    { label: 'Overview', icon: '⊞', active: true },
    { label: 'Job Listings', icon: '💼' },
    { label: 'Talent Pool', icon: '👥' },
    { label: 'Interviews', icon: '📅' },
  ];
  const orgLinks = [
    { label: 'Reports', icon: '📊' },
    { label: 'Subscription', icon: '🔖' },
  ];

  const analytics = [
    { label: 'Active Jobs', value: '12', badge: '+2% vs LW', badgeColor: '#16A34A', badgeBg: '#F0FDF4', icon: '💼', iconBg: '#EFF6FF', iconColor: '#137FEC' },
    { label: 'Total Applications', value: '458', badge: '+15% vs LW', badgeColor: '#16A34A', badgeBg: '#F0FDF4', icon: '📄', iconBg: '#FAF5FF', iconColor: '#9333EA' },
    { label: 'New Candidates', value: '24', badge: '-5% vs LW', badgeColor: '#DC2626', badgeBg: '#FEF2F2', icon: '👤', iconBg: '#FFF7ED', iconColor: '#EA580C' },
    { label: 'Interviews Scheduled', value: '8', badge: '+10% vs LW', badgeColor: '#16A34A', badgeBg: '#F0FDF4', icon: '📅', iconBg: '#F0FDFA', iconColor: '#0D9488' },
  ];

  const jobs = [
    { title: 'Senior Product Designer', sub: 'Full-time • Remote', dept: 'Design Team', apps: 84, appSub: '+12 today', appSubColor: '#16A34A', status: 'Active', statusBg: '#DBEAFE', statusColor: '#2563EB' },
    { title: 'Full Stack Engineer', sub: 'Contract • Hybrid', dept: 'Engineering', apps: 156, appSub: '+28 today', appSubColor: '#16A34A', status: 'Active', statusBg: '#DBEAFE', statusColor: '#2563EB' },
    { title: 'Marketing Manager', sub: 'Full-time • New York', dept: 'Growth', apps: 42, appSub: '0 today', appSubColor: '#94A3B8', status: 'Paused', statusBg: '#FFEDD5', statusColor: '#EA580C' },
    { title: 'Customer Support Lead', sub: 'Full-time • Remote', dept: 'Operations', apps: 215, appSub: '+5 today', appSubColor: '#16A34A', status: 'Active', statusBg: '#DBEAFE', statusColor: '#2563EB' },
  ];

  const activities = [
    {
      type: 'avatar',
      avatar: '👤',
      avatarBg: '#E2E8F0',
      badgeBg: '#22C55E',
      text: <><strong>Alex Johnson</strong> applied for <span style={{ color: '#137FEC', fontWeight: 700 }}>Senior Product Designer</span></>,
      time: '15 minutes ago',
    },
    {
      type: 'icon',
      icon: '📅',
      iconBg: '#F3E8FF',
      iconColor: '#9333EA',
      text: <><strong>Interview Scheduled</strong> with <span style={{ color: '#137FEC', fontWeight: 700 }}>David Chen</span> for tomorrow at 10:00 AM</>,
      time: '2 hours ago',
    },
    {
      type: 'avatar',
      avatar: '👤',
      avatarBg: '#DBEAFE',
      badgeBg: '#3B82F6',
      text: <><strong>Marcus Webb</strong> was moved to <span style={{ color: '#16A34A', fontWeight: 700 }}>Technical Assessment</span> stage</>,
      time: '4 hours ago',
    },
    {
      type: 'icon',
      icon: '📄',
      iconBg: '#F1F5F9',
      iconColor: '#64748B',
      text: <><strong>New Job Posted:</strong> "Marketing Specialist" is now live on 5 boards.</>,
      time: 'Yesterday',
    },
  ];

  const SideNavItem = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '10px 12px', borderRadius: '8px', width: '100%',
      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      fontSize: '14px', fontWeight: active ? 600 : 500,
      background: active ? '#137FEC' : 'transparent',
      color: active ? '#FFFFFF' : '#475569',
      boxShadow: active ? '0px 4px 6px -1px rgba(19,127,236,0.2), 0px 2px 4px -2px rgba(19,127,236,0.2)' : 'none',
      transition: 'background 0.15s',
      textAlign: 'left',
    }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #94A3B8; }
        input:focus { outline: none; }
        a { text-decoration: none; color: inherit; }
        .stat-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 25px; display: flex; flex-direction: column; flex: 1; position: relative; height: 166px; overflow: hidden; cursor: default; transition: box-shadow 0.2s; }
        .stat-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .job-row { display: flex; align-items: center; padding: 0 0 0 24px; gap: 24px; border-top: 1px solid #F1F5F9; transition: background 0.15s; cursor: pointer; }
        .job-row:hover { background: #F8FAFC; }
        .job-row:first-of-type { border-top: none; }
        .btn-export { display: flex; align-items: center; gap: 8px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #334155; cursor: pointer; padding: 8px 16px; transition: background 0.15s; }
        .btn-export:hover { background: #F8FAFC; }
        .btn-post { display: flex; align-items: center; gap: 8px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 9px 16px; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-post:hover { background: #0e6fd4; }
        .nav-tab { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; cursor: pointer; border: none; background: none; font-family: 'Inter',sans-serif; padding-bottom: 4px; }
        .nav-tab.active { color: #137FEC; font-weight: 600; border-bottom: 2px solid #137FEC; }
        .nav-tab:hover { color: #137FEC; }
        .dot-menu { background: none; border: none; cursor: pointer; display: flex; flex-direction: column; gap: 3px; align-items: center; padding: 8px; }
        .dot-menu span { width: 4px; height: 4px; border-radius: 50%; background: #94A3B8; display: block; }
        .view-all-btn { width: 100%; padding: 10px 0; border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #475569; cursor: pointer; transition: background 0.15s; }
        .view-all-btn:hover { background: #F8FAFC; }
      `}</style>

      {/* TOP NAVBAR */}
      <nav style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 40px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Left: Logo + nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🚀</div>
            <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>RecruitPro</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {['Dashboard', 'Jobs', 'Candidates', 'Analytics'].map((tab, i) => (
              <button key={tab} className={`nav-tab${i === 0 ? ' active' : ''}`}>{tab}</button>
            ))}
          </div>
        </div>

        {/* Right: Search + icons + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#F1F5F9', borderRadius: '8px', padding: '0 16px',
            height: 40, width: 256,
          }}>
            <span style={{ color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates..." style={{ border: 'none', background: 'transparent', fontSize: '14px', color: '#0F172A', flex: 1, outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['🔔', '⚙️'].map(icon => (
              <button key={icon} style={{ width: 40, height: 40, background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</button>
            ))}
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #f9a76b, #e97b3a)',
            border: '2px solid #137FEC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '17px', cursor: 'pointer',
          }}>👤</div>
        </div>
      </nav>

      {/* BODY */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* SIDEBAR */}
        <aside style={{
          width: 256, background: '#FFFFFF', borderRight: '1px solid #E2E8F0',
          padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px',
          flexShrink: 0,
        }}>
          {/* Hiring Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase', padding: '0 12px', marginBottom: '4px' }}>Hiring Pipeline</p>
            {hiringLinks.map(({ label, icon }) => (
              <SideNavItem key={label} icon={icon} label={label} active={activeNav === label} onClick={() => setActiveNav(label)} />
            ))}
          </div>

          {/* Organization */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase', padding: '0 12px', marginBottom: '4px' }}>Organization</p>
            {orgLinks.map(({ label, icon }) => (
              <SideNavItem key={label} icon={icon} label={label} active={false} onClick={() => setActiveNav(label)} />
            ))}
          </div>

          {/* Pro plan CTA */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{
              background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)',
              borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#137FEC' }}>PRO PLAN</p>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px', paddingBottom: '8px' }}>You have 5 active slots remaining.</p>
              <button style={{
                background: '#137FEC', border: 'none', borderRadius: '8px',
                fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, color: '#fff',
                cursor: 'pointer', padding: '8px 0', width: '100%',
              }}>Upgrade Now</button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }}>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px', marginBottom: '4px' }}>Dashboard Overview</h1>
              <p style={{ fontSize: '16px', color: '#64748B' }}>Welcome back, Sarah. Here's a summary of your recruitment activity.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-export">⬇ Export</button>
              <button className="btn-post">+ Post New Job</button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {analytics.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 35, background: stat.iconBg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{stat.icon}</div>
                  <span style={{ background: stat.badgeBg, color: stat.badgeColor, fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '9999px' }}>{stat.badge}</span>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#64748B', position: 'absolute', top: 81, left: 25 }}>{stat.label}</p>
                <p style={{ fontSize: '30px', fontWeight: 700, color: '#0F172A', position: 'absolute', top: 105, left: 25 }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bottom two-col */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

            {/* High Priority Jobs Table */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 4, height: 18, background: '#137FEC', borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>High-Priority Job Openings</h2>
                </div>
                <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: '#137FEC' }}>View all jobs</a>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                {/* Table Header */}
                <div style={{ display: 'flex', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '0' }}>
                  {[['POSITION', '165px'], ['DEPARTMENT', '140px'], ['APPLICANTS', '130px'], ['STATUS', '110px'], ['', '48px']].map(([col, w]) => (
                    <div key={col} style={{ padding: '16px 24px', width: w, flexShrink: 0 }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>{col}</span>
                    </div>
                  ))}
                </div>

                {/* Table Rows */}
                {jobs.map((job, i) => (
                  <div key={job.title} className="job-row" style={{ minHeight: '89px', borderTop: i === 0 ? 'none' : '1px solid #F1F5F9' }}>
                    {/* Position */}
                    <div style={{ width: '117px', flexShrink: 0 }}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>{job.title}</p>
                      <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px', marginTop: '2px' }}>{job.sub}</p>
                    </div>
                    {/* Department */}
                    <div style={{ width: '137px', flexShrink: 0 }}>
                      <p style={{ fontSize: '14px', color: '#475569' }}>{job.dept}</p>
                    </div>
                    {/* Applicants */}
                    <div style={{ width: '83px', flexShrink: 0, textAlign: 'center' }}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{job.apps}</p>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: job.appSubColor, lineHeight: '12px' }}>{job.appSub}</p>
                    </div>
                    {/* Status */}
                    <div style={{ width: '111px', flexShrink: 0 }}>
                      <span style={{ background: job.statusBg, color: job.statusColor, fontSize: '12px', fontWeight: 700, padding: '3.5px 10px', borderRadius: '9999px' }}>{job.status}</span>
                    </div>
                    {/* Menu */}
                    <button className="dot-menu">
                      <span /><span /><span />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ width: '293px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', color: '#137FEC' }}>🕐</span>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>Recent Activity</h2>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {activities.map((act, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Avatar/Icon */}
                    {act.type === 'avatar' ? (
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: act.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{act.avatar}</div>
                        <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: act.badgeBg, border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>✓</div>
                      </div>
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: act.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{act.icon}</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '18px' }}>{act.text}</p>
                      <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{act.time}</p>
                    </div>
                  </div>
                ))}

                <button className="view-all-btn">View All Activity</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;