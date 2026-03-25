import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateAlerts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Alerts');
  const [activeNav, setActiveNav] = useState('Alerts');
  const [dismissed, setDismissed] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const tabs = ['All Alerts', 'Jobs', 'Profile', 'Applications'];

  const navItems = [
    {
      label: 'Dashboard',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>,
      badge: null,
    },
    {
      label: 'Alerts',
      icon: <svg width="14" height="17" viewBox="0 0 14 17" fill="none"><path d="M7 0C7 0 2 2.5 2 8.5V12l-2 2v1h14v-1l-2-2V8.5C12 2.5 7 0 7 0Z" stroke="currentColor" strokeWidth="1.4"/><path d="M5 14.5c0 1.1.9 2 2 2s2-.9 2-2" stroke="currentColor" strokeWidth="1.4"/></svg>,
      badge: '12',
    },
    {
      label: 'Applied Jobs',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 4V3C6 1.895 6.895 1 8 1H10C11.105 1 12 1.895 12 3V4" stroke="currentColor" strokeWidth="1.5"/><line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5"/></svg>,
      badge: null,
    },
    {
      label: 'Public Profile',
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M1 13C1 10.239 3.686 8 7 8s6 2.239 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      badge: null,
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ca-nav-link {
          display: flex; flex-direction: row; align-items: center;
          gap: 12px; padding: 8px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s; justify-content: space-between;
        }
        .ca-nav-link:hover { background: #F1F5F9; }
        .ca-nav-link.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 600; }

        .ca-tab {
          box-sizing: border-box; display: flex; justify-content: center; align-items: center;
          padding: 0px 4px 12px; height: 34px;
          background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #64748B; transition: color 0.15s;
          white-space: nowrap;
        }
        .ca-tab.active { color: #137FEC; font-weight: 700; border-bottom-color: #137FEC; }
        .ca-tab:hover:not(.active) { color: #334155; }

        .ca-tag {
          display: inline-flex; align-items: center; padding: 2px 8px;
          border-radius: 4px; font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 10px; line-height: 15px; letter-spacing: 0.5px;
          text-transform: uppercase; white-space: nowrap;
        }

        .btn-primary {
          display: flex; justify-content: center; align-items: center;
          padding: 7.5px 16px 8.5px; height: 36px; border-radius: 8px; border: none;
          background: #137FEC; color: #FFFFFF;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: background 0.12s;
          white-space: nowrap;
        }
        .btn-primary:hover { background: #0e6fd4; }

        .btn-secondary {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          padding: 6.5px 16px 7.5px; height: 36px; border-radius: 8px;
          border: 1px solid #E2E8F0; background: none; color: #334155;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; transition: background 0.12s; white-space: nowrap;
        }
        .btn-secondary:hover { background: #F8FAFC; }

        .btn-gray {
          display: flex; justify-content: center; align-items: center; gap: 6px;
          padding: 7.5px 16px 8.5px; height: 36px; border-radius: 8px; border: none;
          background: #F1F5F9; color: #0F172A;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; transition: background 0.12s; white-space: nowrap;
        }
        .btn-gray:hover { background: #E2E8F0; }

        .btn-bookmark {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid #E2E8F0; background: none; cursor: pointer; transition: background 0.12s;
        }
        .btn-bookmark:hover { background: #F8FAFC; }

        .ca-alert-card {
          box-sizing: border-box; width: 100%;
          background: #FFFFFF; border: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px;
          overflow: hidden;
        }

        .ca-icon-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px;
          border: none; cursor: pointer; transition: background 0.12s;
        }
        .ca-icon-btn:hover { background: #E2E8F0; }
      `}</style>

      {/* ── MAIN CONTAINER ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: '20px 160px' }}>
        <div style={{ width: 960, maxWidth: 960, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* ── NAV HEADER ── */}
          <div style={{
            boxSizing: 'border-box', display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px', height: 65,
            background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12,
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, background: 'rgba(19,127,236,0.1)', borderRadius: 8 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1C10 1 4 4 4 10.5V14l-3 3v1h18v-1l-3-3V10.5C16 4 10 1 10 1Z" stroke="#137FEC" strokeWidth="1.5"/>
                  <path d="M7 17.5c0 1.657 1.343 3 3 3s3-1.343 3-3" stroke="#137FEC" strokeWidth="1.5"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#0F172A' }}>
                Alerts
              </span>
            </div>

            {/* Right icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="ca-icon-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#334155" strokeWidth="1.5"/>
                  <line x1="13" y1="13" x2="17" y2="17" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="ca-icon-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="3" stroke="#334155" strokeWidth="1.4"/>
                  <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.05 3.05l1.42 1.42M13.53 13.53l1.42 1.42M3.05 14.95l1.42-1.42M13.53 4.47l1.42-1.42" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── BODY ROW ── */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 24 }}>

            {/* ── LEFT SIDEBAR ── */}
            <div style={{ width: 256, flexShrink: 0 }}>
              <div style={{
                boxSizing: 'border-box', padding: 16, display: 'flex', flexDirection: 'column', gap: 16,
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12,
              }}>
                {/* Profile */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    border: '2px solid rgba(19,127,236,0.2)',
                    background: 'linear-gradient(135deg, #C9D8E8, #A8BDD4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
                  }}>👨‍💼</div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>Alex Johnson</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>Senior Product Designer</p>
                  </div>
                </div>

                {/* Nav */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {navItems.map(item => (
                    <button
                      key={item.label}
                      className={`ca-nav-link${activeNav === item.label ? ' active' : ''}`}
                      onClick={() => setActiveNav(item.label)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                        {item.label}
                      </div>
                      {item.badge && (
                        <span style={{
                          display: 'flex', alignItems: 'center', padding: '2px 6px',
                          background: '#137FEC', borderRadius: '9999px',
                          fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 10, color: '#FFFFFF',
                        }}>{item.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Tab filters */}
              <div style={{
                boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
                gap: 32, borderBottom: '1px solid #E2E8F0', paddingBottom: 2,
              }}>
                {tabs.map(tab => (
                  <button key={tab} className={`ca-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* ── ALERT CARDS ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Alert 1: Job Match */}
                <div className="ca-alert-card">
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                    {/* Image */}
                    <div style={{
                      width: 192, flexShrink: 0, alignSelf: 'stretch', overflow: 'hidden',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2563eb 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      minHeight: 167,
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 16 }}>
                        {[1,2,3].map(r => (
                          <div key={r} style={{ height: r === 1 ? 40 : 24, borderRadius: 4, background: 'rgba(255,255,255,0.15)' }} />
                        ))}
                        <div style={{ height: 60, borderRadius: 6, background: 'rgba(255,255,255,0.1)', marginTop: 4, display: 'flex', alignItems: 'flex-end', padding: 8, gap: 4 }}>
                          {[40,60,30,50,70].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: h/2, background: 'rgba(255,255,255,0.3)', borderRadius: '2px 2px 0 0' }} />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 167 }}>
                      <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <span className="ca-tag" style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC' }}>JOB MATCH</span>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#94A3B8' }}>Just now</span>
                        </div>
                        <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '22px', color: '#0F172A', marginBottom: 6 }}>
                          New job matching your profile
                        </h3>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#475569' }}>
                          Senior Product Designer at TechCorp • Remote • $140k – $180k
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <button className="btn-primary" style={{ minWidth: 120 }}>View Job</button>
                        <button className="btn-bookmark" onClick={() => setBookmarked(!bookmarked)}>
                          <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                            <path d="M1 1H11V14L6 10L1 14V1Z" stroke={bookmarked ? '#137FEC' : '#64748B'} fill={bookmarked ? '#137FEC' : 'none'} strokeWidth="1.5" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert 2: Profile Views (Insight) */}
                <div className="ca-alert-card">
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 20, gap: 16 }}>
                    {/* Left content */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 156 }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span className="ca-tag" style={{ background: '#ECFDF5', color: '#059669' }}>INSIGHT</span>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#94A3B8' }}>2h ago</span>
                        </div>
                        <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A', marginBottom: 8 }}>
                          Your profile was viewed 5 times
                        </h3>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '23px', color: '#475569' }}>
                          Recruiters from Google, Meta, and Netflix viewed your profile today. Your visibility is up 12% this week.
                        </p>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <button className="btn-gray">
                          See Detailed Stats
                          <svg width="15" height="9" viewBox="0 0 15 9" fill="none">
                            <path d="M1 8L5 4L9 6L14 1" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 1H14V4" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Right: chart image placeholder */}
                    <div style={{
                      width: 192, height: 156, borderRadius: 8, flexShrink: 0,
                      background: 'linear-gradient(135deg, #0F4C75 0%, #1B6CA8 50%, #1E3A5F 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                    }}>
                      <div style={{ position: 'relative', width: 80, height: 80 }}>
                        <svg width="80" height="80" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16"/>
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray="80 121" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#F59E0B" strokeWidth="16" strokeDasharray="40 161" strokeDashoffset="-80" transform="rotate(-90 40 40)"/>
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#3B82F6" strokeWidth="16" strokeDasharray="61 140" strokeDashoffset="-120" transform="rotate(-90 40 40)"/>
                        </svg>
                        <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', background: '#1B6CA8' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert 3: Deadline (Urgent) */}
                {!dismissed && (
                  <div className="ca-alert-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                    <div style={{ padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span className="ca-tag" style={{ background: '#FFFBEB', color: '#D97706' }}>URGENT</span>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#94A3B8' }}>5h ago</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: '50%',
                          background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <svg width="18" height="21" viewBox="0 0 18 21" fill="none">
                            <circle cx="9" cy="12" r="8" stroke="#D97706" strokeWidth="1.5"/>
                            <path d="M9 8V12L12 14" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M6 1l3 3 3-3" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A', marginBottom: 4 }}>
                            Application deadline approaching
                          </h3>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#475569', marginBottom: 16 }}>
                            Your saved application for "UX Lead" at Airbnb expires in 24 hours. Complete it now to stay in the race.
                          </p>
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn-primary">Finish Application</button>
                            <button className="btn-secondary" onClick={() => setDismissed(true)}>Dismiss</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Alert 4: Interview Invitation */}
                <div className="ca-alert-card">
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className="ca-tag" style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC' }}>APPLICATION UPDATE</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#94A3B8' }}>Yesterday</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: 'rgba(19,127,236,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                          <rect x="1" y="3" width="16" height="16" rx="2" stroke="#137FEC" strokeWidth="1.5"/>
                          <line x1="1" y1="8" x2="17" y2="8" stroke="#137FEC" strokeWidth="1.5"/>
                          <line x1="5" y1="1" x2="5" y2="5" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="13" y1="1" x2="13" y2="5" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M5 13l3 3 5-5" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A', marginBottom: 4 }}>
                          New Interview Invitation
                        </h3>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#475569', marginBottom: 16 }}>
                          Stripe would like to schedule a first-round interview for the Senior Designer position.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button className="btn-primary">Schedule Now</button>
                          <button className="btn-secondary">View Message</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateAlerts;