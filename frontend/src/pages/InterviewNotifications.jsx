import React, { useState } from 'react';

const InterviewNotifications = () => {
  const [activeTab, setActiveTab] = useState('All Requests');
  const [activeNav, setActiveNav] = useState('Notifications');

  const tabs = ['All Requests', 'Pending', 'Confirmed', 'History'];

  const navItems = [
    { label: 'Dashboard', icon: '⊞' },
    { label: 'Notifications', icon: '🔔', badge: 4 },
    { label: 'Messages', icon: '✉️' },
    { label: 'My Profile', icon: '👤' },
  ];

  const bottomNavItems = [
    { label: 'Settings', icon: '⚙️' },
  ];

  const deadlines = [
    { icon: '<>', title: 'Coding Challenge', sub: 'TechFlow Systems • 2 days left' },
    { icon: '📄', title: 'Portfolio Review', sub: 'CreativePixel • 4 days left' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #0F172A; transition: background 0.15s; border: none; background: none; font-family: 'Inter',sans-serif; width: 100%; text-align: left; }
        .nav-item:hover { background: rgba(19,127,236,0.05); }
        .nav-item.active { background: rgba(19,127,236,0.1); color: #137FEC; }
        .tab-btn { padding: 0 0 12px; border: none; background: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; border-bottom: 2px solid transparent; color: #64748B; transition: color 0.15s; }
        .tab-btn.active { color: #137FEC; border-bottom-color: #137FEC; }
        .tab-btn:hover { color: #137FEC; }
        .btn-primary { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 8px 24px; transition: background 0.2s; }
        .btn-primary:hover { background: #0e6fd4; }
        .btn-outline { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #0F172A; cursor: pointer; padding: 8px 24px; transition: background 0.15s; }
        .btn-outline:hover { background: #F8FAFC; }
        .btn-icon { background: none; border: none; cursor: pointer; padding: 8px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #94A3B8; transition: background 0.15s; }
        .btn-icon:hover { background: #F1F5F9; }
        .card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', padding: '0 40px' }}>
        <div style={{ display: 'flex', gap: 24, padding: '40px', width: '100%', maxWidth: 1200, margin: '0 auto' }}>

          {/* ── LEFT SIDEBAR ── */}
          <aside style={{ width: 256, display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 8px' }}>
              <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📋</div>
              <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>TalentPulse</span>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navItems.map(item => (
                <button
                  key={item.label}
                  className={`nav-item${activeNav === item.label ? ' active' : ''}`}
                  onClick={() => setActiveNav(item.label)}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      background: '#137FEC', color: '#fff',
                      fontSize: 10, fontWeight: 400,
                      padding: '2px 6px', borderRadius: '9999px',
                    }}>{item.badge}</span>
                  )}
                </button>
              ))}

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16, marginTop: 16 }}>
                {bottomNavItems.map(item => (
                  <button key={item.label} className="nav-item">
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* User profile card (bottom) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{
                background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)',
                borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#E2E8F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', flexShrink: 0,
                  }}>👤</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Alex Johnson</p>
                    <p style={{ fontSize: 12, color: '#64748B' }}>Senior Developer</p>
                  </div>
                </div>
                <button style={{
                  width: '100%', padding: '8px 0',
                  border: '1px solid rgba(19,127,236,0.2)',
                  borderRadius: 8, background: 'none',
                  fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: '#137FEC',
                  cursor: 'pointer',
                }}>View Public Profile</button>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>Interview Notifications</h1>
                <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Stay updated with your latest interview schedules and requests.</p>
              </div>
              <button style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '8px', cursor: 'pointer' }}>
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <line x1="0" y1="1" x2="18" y2="1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="3" y1="6" x2="15" y2="6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="6" y1="11" x2="12" y2="11" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', gap: 32 }}>
                {tabs.map(tab => (
                  <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION REQUIRED section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Action Required</p>

              {/* Card 1: Senior Frontend Architect */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 24, padding: 24 }}>
                  {/* Icon */}
                  <div style={{ width: 64, height: 64, background: 'rgba(19,127,236,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="25" height="22" viewBox="0 0 25 22" fill="none">
                      <rect x="1" y="1" width="23" height="20" rx="2" stroke="#137FEC" strokeWidth="1.5"/>
                      <line x1="1" y1="6" x2="24" y2="6" stroke="#137FEC" strokeWidth="1.5"/>
                      <line x1="6" y1="10" x2="14" y2="10" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round"/>
                      <line x1="6" y1="13" x2="18" y2="13" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round"/>
                      <line x1="6" y1="16" x2="12" y2="16" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>Senior Frontend Architect</h4>
                      <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 500, padding: '2px 10px', borderRadius: '9999px' }}>
                        New Invitation
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: '#475569' }}>TechFlow Systems Inc. • San Francisco, CA (Remote)</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12, color: '#64748B' }}>📅</span>
                        <span style={{ fontSize: 14, color: '#64748B' }}>Thursday, Oct 24</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12, color: '#64748B' }}>🕐</span>
                        <span style={{ fontSize: 14, color: '#64748B' }}>10:00 AM – 11:00 AM PST</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16 }}>
                      <button className="btn-primary">Confirm</button>
                      <button className="btn-outline">Reschedule</button>
                      <button className="btn-icon">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                          <path d="M1 4H15M13 4L12.133 15.142C12.058 16.178 11.208 17 10.169 17H5.831C4.792 17 3.942 16.178 3.867 15.142L3 4M6 4V2H10V4" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Product Designer with left blue accent */}
              <div style={{ background: '#FFFFFF', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: 4, background: '#137FEC', flexShrink: 0 }} />
                <div style={{ flex: 1, padding: 24, display: 'flex', gap: 24 }}>
                  {/* Icon */}
                  <div style={{ width: 64, height: 64, background: '#F1F5F9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="#94A3B8" strokeWidth="1.5"/>
                      <circle cx="11" cy="11" r="3" stroke="#94A3B8" strokeWidth="1.5"/>
                      <line x1="11" y1="0" x2="11" y2="3" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="11" y1="19" x2="11" y2="22" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="0" y1="11" x2="3" y2="11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="19" y1="11" x2="22" y2="11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>Product Designer (UX/UI)</h4>
                      <span style={{ background: '#DBEAFE', color: '#1E40AF', fontSize: 12, fontWeight: 500, padding: '2px 10px', borderRadius: '9999px' }}>
                        Time Changed
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: '#475569' }}>CreativePixel Studio • New York, NY</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12, color: '#94A3B8' }}>📅</span>
                        <span style={{ fontSize: 14, color: '#94A3B8' }}>Oct 22, 2:00 PM</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12, color: '#137FEC' }}>📅</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#137FEC' }}>Wednesday, Oct 23, 11:30 AM EST</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, paddingTop: 16 }}>
                      <button className="btn-primary">Accept New Time</button>
                      <button className="btn-outline">Propose New Time</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COMING UP NEXT WEEK */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Coming Up Next Week</p>

              {/* Card 3: Engineering Manager */}
              <div className="card" style={{ padding: 0, opacity: 0.9, overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 24, padding: 24 }}>
                  {/* Icon */}
                  <div style={{ width: 64, height: 64, background: '#F1F5F9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="20" height="25" viewBox="0 0 20 25" fill="none">
                      <path d="M10 1L19 7V17L10 23L1 17V7L10 1Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M7 12L9 14L13 10" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>Engineering Manager</h4>
                        <span style={{ background: '#DCFCE7', color: '#166534', fontSize: 12, fontWeight: 500, padding: '2px 10px', borderRadius: '9999px' }}>
                          Confirmed
                        </span>
                      </div>
                      <p style={{ fontSize: 14, color: '#475569' }}>Velocity Data Labs • Remote</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 12, color: '#64748B' }}>📅</span>
                          <span style={{ fontSize: 14, color: '#64748B' }}>Monday, Oct 28</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 12, color: '#64748B' }}>💻</span>
                          <span style={{ fontSize: 14, color: '#64748B' }}>Google Meet</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons on right */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8, flexShrink: 0 }}>
                      <button style={{
                        background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: '#0F172A',
                        cursor: 'pointer', padding: '8px 16px',
                      }}>Prepare</button>
                      <button style={{
                        background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8,
                        fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: '#0F172A',
                        cursor: 'pointer', padding: '8px 18px',
                      }}>Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* ── RIGHT SIDEBAR ── */}
          <aside style={{ width: 288, display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0 }}>

            {/* Interview Stats */}
            <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Interview Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Scheduled */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, color: '#64748B' }}>Scheduled</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>12</span>
                  </div>
                  <div style={{ height: 6, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '75%', background: '#137FEC', borderRadius: '9999px' }} />
                  </div>
                </div>
                {/* Pending Response */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, color: '#64748B' }}>Pending Response</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>3</span>
                  </div>
                  <div style={{ height: 6, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '25%', background: '#FBBF24', borderRadius: '9999px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Coaching CTA */}
            <div style={{
              background: '#137FEC', borderRadius: 12, padding: 24,
              display: 'flex', flexDirection: 'column', gap: 8,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative background shape */}
              <div style={{
                position: 'absolute', bottom: -16, right: -16,
                width: 88, height: 72,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 8,
              }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
                Interview Coaching
              </h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: '16px', paddingBottom: 8, position: 'relative', zIndex: 1 }}>
                Book a 30-min session with an industry expert to ace your next round.
              </p>
              <button style={{
                width: '100%', padding: '8px 0',
                background: '#FFFFFF', border: 'none', borderRadius: 8,
                fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: '#137FEC',
                cursor: 'pointer', position: 'relative', zIndex: 1,
              }}>Book Session</button>
            </div>

            {/* Upcoming Deadlines */}
            <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Upcoming Deadlines</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {deadlines.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, background: '#F1F5F9', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                      {d.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', lineHeight: '16px' }}>{d.title}</p>
                      <p style={{ fontSize: 10, color: '#64748B', lineHeight: '15px' }}>{d.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InterviewNotifications;