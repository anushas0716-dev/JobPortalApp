import React, { useState } from 'react';

const RecruiterNotifications = () => {
  const [activeNav, setActiveNav] = useState('Notifications');
  const [activeFilter, setActiveFilter] = useState('All Activities');

  const navItems = [
    { label: 'Dashboard', icon: '⊞' },
    { label: 'Notifications', icon: '🔔' },
    { label: 'Candidates', icon: '👥' },
    { label: 'Job Postings', icon: '💼' },
    { label: 'Messages', icon: '💬' },
  ];

  const myTasks = [
    { label: 'To Review', count: 12, countBg: 'rgba(19,127,236,0.2)', countColor: '#137FEC' },
    { label: 'Scheduled', count: 4, countBg: '#DCFCE7', countColor: '#16A34A' },
  ];

  const filters = ['All Activities', 'Updates', 'Mentions'];

  const statsCards = [
    {
      label: 'TOTAL NOTIFICATIONS',
      value: '24',
      subIcon: '↗',
      subIconColor: '#22C55E',
      sub: '12% from last week',
      subColor: '#22C55E',
    },
    {
      label: 'AVG RESPONSE TIME',
      value: '1.4h',
      subIcon: '⬡',
      subIconColor: '#137FEC',
      sub: 'Top 5% of company',
      subColor: '#137FEC',
    },
    {
      label: 'PENDING INTERVIEWS',
      value: '8',
      subIcon: '🕐',
      subIconColor: '#64748B',
      sub: 'Next: 3:00 PM today',
      subColor: '#64748B',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #475569; transition: background 0.15s; border: none; background: none; font-family: 'Inter',sans-serif; width: 100%; text-align: left; }
        .nav-item:hover { background: rgba(19,127,236,0.05); }
        .nav-item.active { background: #137FEC; color: #FFFFFF; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); }
        .filter-btn { padding: 6px 16px; border: none; background: none; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; border-radius: 6px; color: #64748B; transition: all 0.15s; }
        .filter-btn.active { background: #137FEC; color: #FFFFFF; }
        .filter-btn:hover:not(.active) { background: #F1F5F9; }
        .btn-blue { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #fff; cursor: pointer; padding: 6px 12px; transition: background 0.2s; }
        .btn-blue:hover { background: #0e6fd4; }
        .btn-grey { background: #F1F5F9; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #334155; cursor: pointer; padding: 6px 12px; transition: background 0.15s; }
        .btn-grey:hover { background: #E2E8F0; }
        .btn-light-blue { background: rgba(19,127,236,0.1); border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #137FEC; cursor: pointer; padding: 6px 12px; }
        .btn-ghost { background: none; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #64748B; cursor: pointer; padding: 6px 12px; }
        .btn-ghost:hover { background: #F1F5F9; }
        .notif-card { background: #FFFFFF; border-width: 1px 1px 1px 4px; border-style: solid; border-color: #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 16px; display: flex; gap: 16px; align-items: flex-start; }
        .task-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; }
        .task-row:hover { background: #F8FAFC; }
        .icon-btn { width: 40px; height: 40px; background: #F1F5F9; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; position: relative; }
        .icon-btn:hover { background: #E2E8F0; }
        .stat-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 4px; flex: 1; }
      `}</style>

      {/* ── TOP HEADER ── */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 40px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📊</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.27px', color: '#0F172A' }}>Recruiter Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: 8, height: 40, width: 256, overflow: 'hidden' }}>
            <div style={{ width: 31, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9', flexShrink: 0, paddingLeft: 16 }}>
              <span style={{ fontSize: 13, color: '#64748B' }}>🔍</span>
            </div>
            <input placeholder="Search applications..." style={{ border: 'none', background: '#F1F5F9', fontSize: 14, color: '#64748B', outline: 'none', flex: 1, padding: '0 8px', fontFamily: 'inherit' }} />
          </div>
          {/* Icon buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="icon-btn">
              🔔
              <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: '#EF4444', border: '2px solid #FFFFFF', borderRadius: '50%' }} />
            </button>
            <button className="icon-btn">⚙️</button>
          </div>
          {/* Avatar */}
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a882, #b8956a)', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer' }}>👩</div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ width: 256, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: 16, display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0 }}>

          {/* Company card */}
          <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)', borderRadius: 12, padding: '16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#137FEC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>📋</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>TalentStream Pro</p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#137FEC' }}>Enterprise Tier</p>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(item => (
              <button
                key={item.label}
                className={`nav-item${activeNav === item.label ? ' active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* My Tasks */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0 12px' }}>My Tasks</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {myTasks.map(task => (
                <div key={task.label} className="task-row">
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#475569' }}>{task.label}</span>
                  <span style={{ background: task.countBg, color: task.countColor, fontSize: 12, fontWeight: 500, padding: '2px 8px', borderRadius: '9999px' }}>{task.count}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>

          {/* Page header + filter toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 0 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>Recent Alerts</h1>
              <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Stay updated with your recruiting pipeline activity.</p>
            </div>
            {/* Segmented filter */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 8, padding: 4, display: 'flex', gap: 0, alignSelf: 'flex-start' }}>
              {filters.map(f => (
                <button key={f} className={`filter-btn${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
              ))}
            </div>
          </div>

          {/* ── NOTIFICATION CARDS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Card 1: New Application Received */}
            <div className="notif-card">
              <div style={{ width: 48, height: 48, background: 'rgba(19,127,236,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <circle cx="8" cy="5" r="4" stroke="#137FEC" strokeWidth="1.5"/>
                  <path d="M1 15C1 12.239 4.134 10 8 10" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M15 8L21 8M18 5L21 8L18 11" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>New Application Received</p>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>2 mins ago</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>
                  John Doe applied for the <span style={{ color: '#137FEC' }}>Senior Frontend Developer</span> position.
                </p>
                <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
                  <button className="btn-blue">View Profile</button>
                  <button className="btn-grey">Quick Screen</button>
                </div>
              </div>
            </div>

            {/* Card 2: Interview Confirmed */}
            <div className="notif-card">
              <div style={{ width: 48, height: 48, background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <rect x="1" y="3" width="16" height="16" rx="2" stroke="#16A34A" strokeWidth="1.5"/>
                  <line x1="5" y1="1" x2="5" y2="5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="1" x2="13" y2="5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 11L8 14L13 9" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Interview Confirmed by Candidate</p>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>45 mins ago</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>
                  <span style={{ fontWeight: 700 }}>Sarah Jenkins</span> has accepted the calendar invitation for Technical Round 2 tomorrow at 2:00 PM.
                </p>
                <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
                  <button className="btn-grey" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>📅</span> Add to Calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Message from Lead Recruiter */}
            <div className="notif-card">
              {/* Avatar with orange badge */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a882, #b8956a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👩</div>
                <div style={{
                  position: 'absolute', bottom: -4, right: -4,
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#F59E0B', border: '2px solid #FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
                }}>💬</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Message from Lead Recruiter</p>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>2 hours ago</span>
                </div>
                {/* Message quote box */}
                <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: 8, padding: '10px 12px' }}>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: '23px' }}>
                    "Hey team, we need to prioritize the UX Designer roles for the upcoming product launch. Please review the new batch of applicants by EOD."
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
                  <button className="btn-light-blue">Reply</button>
                  <button className="btn-ghost">Mark as read</button>
                </div>
              </div>
            </div>

            {/* Card 4: Background Check (faded, no left border accent) */}
            <div style={{
              background: '#FFFFFF', border: '1px solid #E2E8F0',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12,
              padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start', opacity: 0.8,
            }}>
              <div style={{ width: 48, height: 48, background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <rect x="1" y="1" width="16" height="18" rx="2" stroke="#64748B" strokeWidth="1.5"/>
                  <path d="M5 7L7 9L11 5" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="5" y1="13" x2="13" y2="13" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Background Check Completed</p>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>Yesterday</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>
                  <span style={{ fontWeight: 700 }}>Michael Brown's</span> background verification has been cleared.
                </p>
              </div>
            </div>
          </div>

          {/* ── STATS FOOTER ── */}
          <div style={{ display: 'flex', gap: 24, paddingTop: 8 }}>
            {statsCards.map(card => (
              <div key={card.label} className="stat-card">
                <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{card.label}</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>{card.value}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingTop: 4 }}>
                  <span style={{ fontSize: 12, color: card.subIconColor }}>{card.subIcon}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: card.subColor }}>{card.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterNotifications;