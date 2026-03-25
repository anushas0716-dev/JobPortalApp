import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationUpdates = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Updates');
  const [activeNav, setActiveNav] = useState('Notifications');

  const tabs = ['All Updates', 'Jobs', 'Interviews', 'Offers'];

  const navItems = [
    {
      label: 'Dashboard',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>,
    },
    {
      label: 'My Jobs',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 4V3C6 1.895 6.895 1 8 1H10C11.105 1 12 1.895 12 3V4" stroke="currentColor" strokeWidth="1.5"/><line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5"/></svg>,
    },
    {
      label: 'Messages',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="2" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 6L9 11L17 6" stroke="currentColor" strokeWidth="1.5"/></svg>,
    },
    {
      label: 'Notifications',
      icon: <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="currentColor" strokeWidth="1.5"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="currentColor" strokeWidth="1.5"/></svg>,
    },
  ];

  const notifications = {
    'TODAY': [
      {
        id: 1,
        iconBg: '#DCFCE7', iconColor: '#16A34A',
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="3" width="18" height="14" rx="2" stroke="#16A34A" strokeWidth="1.5"/><path d="M1 8L10 14L19 8" stroke="#16A34A" strokeWidth="1.5"/><path d="M6 11l3 3 5-5" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        title: 'Job Offer Received', time: '2h ago',
        body: <>TechCorp has sent you an official offer for the <strong>Senior Product Designer</strong> position. Congratulations!</>,
        actions: [
          { label: 'View Offer', bg: '#137FEC', color: '#FFFFFF' },
          { label: 'Details', bg: '#F1F5F9', color: '#334155' },
        ],
      },
      {
        id: 2,
        iconBg: 'rgba(19,127,236,0.1)', iconColor: '#137FEC',
        icon: <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><rect x="1" y="3" width="16" height="16" rx="2" stroke="#137FEC" strokeWidth="1.5"/><line x1="1" y1="8" x2="17" y2="8" stroke="#137FEC" strokeWidth="1.5"/><line x1="5" y1="1" x2="5" y2="5" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/><line x1="13" y1="1" x2="13" y2="5" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 13l3 3 5-5" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        title: 'Moved to Interview', time: '5h ago',
        body: <>Your application for <strong>UX Researcher</strong> at FinTech Hub has been shortlisted for a technical interview.</>,
        actions: [],
      },
    ],
    'YESTERDAY': [
      {
        id: 3,
        iconBg: '#F1F5F9', iconColor: '#64748B',
        icon: <svg width="22" height="15" viewBox="0 0 22 15" fill="none"><path d="M1 3C1 1.895 1.895 1 3 1H19C20.105 1 21 1.895 21 3V12C21 13.105 20.105 14 19 14H3C1.895 14 1 13.105 1 12V3Z" stroke="#64748B" strokeWidth="1.4"/><circle cx="11" cy="7" r="3" stroke="#64748B" strokeWidth="1.4"/><path d="M5 7C5 7 6 4 11 4C16 4 17 7 17 7C17 7 16 10 11 10C6 10 5 7 5 7Z" stroke="#64748B" strokeWidth="1.4"/></svg>,
        title: 'Application Viewed', time: '1d ago',
        body: <>A recruiter from <strong>Creative Agency</strong> has viewed your application for the Brand Designer role.</>,
        actions: [],
        opacity: 0.8,
      },
      {
        id: 4,
        iconBg: '#F1F5F9', iconColor: '#64748B',
        icon: <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><rect x="1" y="3" width="16" height="16" rx="2" stroke="#64748B" strokeWidth="1.4"/><line x1="1" y1="8" x2="17" y2="8" stroke="#64748B" strokeWidth="1.4"/><path d="M5 13l3 3 5-5" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        title: 'Application Submitted', time: '1d ago',
        body: <>Successfully submitted application for <strong>Lead UI Designer</strong> at Streamline Inc.</>,
        actions: [],
        opacity: 0.8,
      },
    ],
    'LAST WEEK': [
      {
        id: 5,
        iconBg: '#FEE2E2', iconColor: '#EF4444',
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#EF4444" strokeWidth="1.5"/><line x1="7" y1="7" x2="13" y2="13" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"/><line x1="13" y1="7" x2="7" y2="13" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"/></svg>,
        title: 'Application Status: Closed', time: '4d ago',
        body: <>The position for <strong>Visual Designer</strong> at BlueBox has been filled. Thank you for your interest.</>,
        actions: [],
        opacity: 0.7,
      },
    ],
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .au-nav-link {
          display: flex; flex-direction: row; align-items: center;
          gap: 12px; padding: 10px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s, color 0.12s;
        }
        .au-nav-link:hover { background: #F1F5F9; }
        .au-nav-link.active {
          background: rgba(19,127,236,0.1);
          border-left: 4px solid #137FEC;
          color: #137FEC; font-weight: 600;
        }

        .au-tab {
          box-sizing: border-box; display: flex; flex-direction: column;
          align-items: flex-start; padding: 12px 16px; height: 46px;
          background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #64748B; transition: color 0.15s;
          white-space: nowrap;
        }
        .au-tab.active { color: #137FEC; font-weight: 700; border-bottom-color: #137FEC; }
        .au-tab:hover:not(.active) { color: #334155; }

        .au-notif-card {
          box-sizing: border-box; display: flex; flex-direction: row;
          align-items: flex-start; gap: 16px; padding: 16px; width: 100%;
          background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
          transition: box-shadow 0.15s; cursor: pointer;
        }
        .au-notif-card:hover { box-shadow: 0px 4px 12px rgba(0,0,0,0.06); }

        .au-action-btn {
          display: flex; justify-content: center; align-items: center;
          padding: 6px 16px; height: 28px; border-radius: 4px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 12px;
          cursor: pointer; transition: opacity 0.12s;
        }
        .au-action-btn:hover { opacity: 0.85; }

        .au-footer-link {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px;
          color: #64748B; transition: color 0.12s;
        }
        .au-footer-link:hover { color: #334155; }

        .au-load-more-btn {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          padding: 8px 24px; height: 38px;
          border: 1px solid #E2E8F0; border-radius: 8px; background: none;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
          color: #475569; cursor: pointer; transition: background 0.12s;
        }
        .au-load-more-btn:hover { background: #F8FAFC; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 160px', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: 'rgba(19,127,236,0.1)', borderRadius: 4 }}>
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
              <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="#137FEC" strokeWidth="1.5"/>
              <rect x="11" y="1" width="8" height="8" rx="1.5" stroke="#137FEC" strokeWidth="1.5"/>
              <rect x="1" y="11" width="8" height="7" rx="1.5" stroke="#137FEC" strokeWidth="1.5"/>
              <rect x="11" y="11" width="8" height="7" rx="1.5" stroke="#137FEC" strokeWidth="1.5"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.27px', color: '#0F172A' }}>
            JobPortal
          </span>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, background: '#F1F5F9', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#475569" strokeWidth="1.4"/>
                <path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#475569" strokeWidth="1.4"/>
              </svg>
            </button>
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, background: '#F1F5F9', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" stroke="#475569" strokeWidth="1.4"/>
                <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          {/* Avatar */}
          <div style={{
            width: 40, height: 40, background: '#C9A88A',
            border: '1px solid #E2E8F0', borderRadius: '9999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, cursor: 'pointer', overflow: 'hidden',
          }}>👨‍🦱</div>
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '32px 160px', gap: 0 }}>
        <div style={{ width: 960, maxWidth: 960, display: 'flex', flexDirection: 'row', gap: 0 }}>

          {/* ── LEFT SIDEBAR ── */}
          <aside style={{ width: 216, flexShrink: 0, display: 'flex', flexDirection: 'column', paddingRight: 32 }}>
            {/* User profile */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #D9C4B8, #C9A88A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }}>👨‍🦱</div>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>
                  Alex Rivers
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#137FEC' }}>
                  PREMIUM MEMBER
                </p>
              </div>
            </div>

            {/* Nav */}
            <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navItems.map(item => (
                <button
                  key={item.label}
                  className={`au-nav-link${activeNav === item.label ? ' active' : ''}`}
                  onClick={() => setActiveNav(item.label)}
                >
                  <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* ── NOTIFICATION FEED ── */}
          <section style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Section header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8 }}>
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, lineHeight: '28px', color: '#0F172A' }}>
                Application Updates
              </h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#137FEC' }}>
                Mark all as read
              </button>
            </div>

            {/* Tabs */}
            <div style={{ paddingBottom: 8 }}>
              <div style={{
                boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
                borderBottom: '1px solid #E2E8F0',
              }}>
                {tabs.map(tab => (
                  <button
                    key={tab}
                    className={`au-tab${activeTab === tab ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >{tab}</button>
                ))}
              </div>
            </div>

            {/* Feed Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.entries(notifications).map(([period, items]) => (
                <React.Fragment key={period}>
                  {/* Period heading */}
                  <div style={{ paddingTop: period === 'TODAY' ? 8 : 16 }}>
                    <span style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12,
                      letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B',
                    }}>{period}</span>
                  </div>

                  {/* Notification cards */}
                  {items.map(notif => (
                    <div key={notif.id} className="au-notif-card" style={{ opacity: notif.opacity ?? 1 }}>
                      {/* Icon */}
                      <div style={{
                        width: 48, height: 48, borderRadius: 8,
                        background: notif.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>{notif.icon}</div>

                      {/* Content */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {/* Title + time */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2.875 }}>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>
                            {notif.title}
                          </span>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#94A3B8', flexShrink: 0 }}>
                            {notif.time}
                          </span>
                        </div>

                        {/* Body text */}
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '23px', color: '#475569' }}>
                          {notif.body}
                        </p>

                        {/* Action buttons */}
                        {notif.actions && notif.actions.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 12 }}>
                            {notif.actions.map((action, i) => (
                              <button key={i} className="au-action-btn" style={{ background: action.bg, color: action.color }}>
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}

              {/* Load More */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0px' }}>
                <button className="au-load-more-btn">
                  Load previous notifications
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        padding: '32px 160px', height: 85,
        background: '#FFFFFF', borderTop: '1px solid #E2E8F0', flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', width: 960, maxWidth: 960,
        }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>
            © 2024 JobPortal. All rights reserved.
          </span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
            <button className="au-footer-link">Privacy Policy</button>
            <button className="au-footer-link">Terms of Service</button>
            <button className="au-footer-link">Help Center</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplicationUpdates;