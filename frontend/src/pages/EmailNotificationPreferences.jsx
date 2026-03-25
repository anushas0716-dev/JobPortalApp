import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    style={{
      position: 'relative', display: 'flex', alignItems: 'center',
      width: 44, height: 24, borderRadius: '9999px',
      background: checked ? '#137FEC' : '#E2E8F0',
      border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
      transition: 'background 0.2s',
    }}
    aria-checked={checked}
    role="switch"
  >
    <span style={{
      position: 'absolute',
      width: 20, height: 20, borderRadius: '50%',
      background: '#FFFFFF',
      border: checked ? '1px solid #FFFFFF' : '1px solid #D1D5DB',
      left: checked ? 22 : 2, top: 2,
      transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    }} />
  </button>
);

const EmailNotificationPreferences = () => {
  const navigate = useNavigate();

  const [prefs, setPrefs] = useState({
    jobRecommendations: true,
    applicationStatus: true,
    newMessages: true,
    mentions: false,
    marketingEmails: false,
    profileTips: true,
  });

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const sections = [
    {
      title: 'Career & Opportunities',
      items: [
        {
          key: 'jobRecommendations',
          icon: (
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
              <rect x="1" y="4" width="18" height="14" rx="2" stroke="#137FEC" strokeWidth="1.5"/>
              <path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#137FEC" strokeWidth="1.5"/>
              <line x1="1" y1="10" x2="19" y2="10" stroke="#137FEC" strokeWidth="1.5"/>
            </svg>
          ),
          label: 'Job recommendations',
          desc: 'Personalized roles that match your profile and search history.',
        },
        {
          key: 'applicationStatus',
          icon: (
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <rect x="1" y="3" width="16" height="16" rx="2" stroke="#137FEC" strokeWidth="1.5"/>
              <line x1="1" y1="8" x2="17" y2="8" stroke="#137FEC" strokeWidth="1.5"/>
              <path d="M5 13l3 3 5-5" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          label: 'Application status changes',
          desc: 'Real-time updates on your active job applications.',
        },
      ],
    },
    {
      title: 'Communication',
      items: [
        {
          key: 'newMessages',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="2" width="18" height="14" rx="2" stroke="#137FEC" strokeWidth="1.5"/>
              <path d="M1 7L10 13L19 7" stroke="#137FEC" strokeWidth="1.5"/>
            </svg>
          ),
          label: 'New messages',
          desc: 'Notifications for direct messages from recruiters.',
        },
        {
          key: 'mentions',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#137FEC" strokeWidth="1.5"/>
              <circle cx="10" cy="10" r="4" stroke="#137FEC" strokeWidth="1.5"/>
              <path d="M19 10C19 10 19 14 14 14" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ),
          label: 'Mentions & tags',
          desc: 'When someone tags you in a post or comment.',
        },
      ],
    },
    {
      title: 'Promotions & Content',
      items: [
        {
          key: 'marketingEmails',
          icon: (
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect x="1" y="1" width="18" height="14" rx="2" stroke="#137FEC" strokeWidth="1.5"/>
              <path d="M1 6L10 11L19 6" stroke="#137FEC" strokeWidth="1.5"/>
              <path d="M14 8l4-3" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          ),
          label: 'Marketing emails',
          desc: 'News, offers, and partner updates.',
        },
        {
          key: 'profileTips',
          icon: (
            <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
              <path d="M7.5 1C5.015 1 3 3.015 3 5.5C3 7.5 4.2 9.2 6 9.8V12H9V9.8C10.8 9.2 12 7.5 12 5.5C12 3.015 9.985 1 7.5 1Z" stroke="#137FEC" strokeWidth="1.4"/>
              <rect x="5.5" y="14" width="4" height="2" rx="0.5" stroke="#137FEC" strokeWidth="1.3"/>
              <rect x="6" y="17.5" width="3" height="1.5" rx="0.5" fill="#137FEC"/>
            </svg>
          ),
          label: 'Profile improvement tips',
          desc: 'Tips on how to make your profile stand out to employers.',
        },
      ],
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .enp-pref-card {
          box-sizing: border-box;
          display: flex; flex-direction: row;
          justify-content: space-between; align-items: center;
          padding: 20px; width: 100%; height: 86px;
          background: #FFFFFF; border: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px;
          transition: box-shadow 0.15s;
        }
        .enp-pref-card:hover { box-shadow: 0px 4px 12px rgba(0,0,0,0.06); }

        .btn-discard {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          padding: 8px 24px; height: 42px;
          border: 1px solid #CBD5E1; border-radius: 8px; background: none;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 16px; color: #334155; cursor: pointer; transition: background 0.12s;
        }
        .btn-discard:hover { background: #F8FAFC; }

        .btn-save {
          display: flex; justify-content: center; align-items: center;
          padding: 8px 24px; height: 40px;
          background: #137FEC; border: none; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 16px; color: #FFFFFF; cursor: pointer;
          box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2);
          transition: background 0.15s;
        }
        .btn-save:hover { background: #0e6fd4; }

        .btn-optout {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          padding: 8px 16px; height: 42px;
          background: #FFFFFF; border: 1px solid #FECACA; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 16px; color: #DC2626; cursor: pointer; transition: background 0.12s;
          white-space: nowrap;
        }
        .btn-optout:hover { background: #FEF2F2; }

        .enp-icon-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px;
          border: none; cursor: pointer; transition: background 0.12s;
        }
        .enp-icon-btn:hover { background: #E2E8F0; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 160px', height: 73,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: '#137FEC', borderRadius: 8 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#FFFFFF" strokeWidth="1.6"/>
              <path d="M10 6v4l3 2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M7 3.5C5 4.8 3.5 7 3.5 10" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="3" stroke="#FFFFFF" strokeWidth="1.5"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>
            Account Settings
          </span>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          <button className="enp-icon-btn">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
              <path d="M6.5 0C6.5 0 2 2.5 2 8.5V12l-2 2v1h13v-1l-2-2V8.5C11 2.5 6.5 0 6.5 0Z" stroke="#334155" strokeWidth="1.4"/>
              <path d="M4.5 14.5c0 1.1.895 2 2 2s2-.9 2-2" stroke="#334155" strokeWidth="1.4"/>
            </svg>
          </button>
          <button className="enp-icon-btn">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="3" stroke="#334155" strokeWidth="1.4"/>
              <path d="M8.5 1v2M8.5 13v2M1 8.5h2M13 8.5h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 13.95l1.42-1.42M11.53 4.47l1.42-1.42" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center',
        alignItems: 'flex-start', padding: '32px 160px',
        flex: 1,
      }}>
        <div style={{ width: 800, maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Page Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.75px', color: '#0F172A' }}>
              Email Notifications
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#64748B' }}>
              Select the types of emails you want to receive and how often you'd like to hear from us.
            </p>
          </div>

          {/* Sections */}
          {sections.map((section, si) => (
            <div key={si} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Section heading */}
              <div style={{ boxSizing: 'border-box', paddingBottom: 8, borderBottom: '1px solid #E2E8F0' }}>
                <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, lineHeight: '28px', color: '#0F172A' }}>
                  {section.title}
                </h2>
              </div>

              {/* Preference cards */}
              {section.items.map((item) => (
                <div key={item.key} className="enp-pref-card">
                  {/* Left: icon + text */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'rgba(19,127,236,0.1)', flexShrink: 0,
                    }}>{item.icon}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 16, lineHeight: '20px', color: '#0F172A' }}>
                        {item.label}
                      </span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  {/* Toggle */}
                  <Toggle checked={prefs[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          ))}

          {/* Footer Actions */}
          <div style={{ paddingBottom: 48 }}>
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row',
              justifyContent: 'flex-end', alignItems: 'center',
              paddingTop: 24, gap: 12, borderTop: '1px solid #E2E8F0',
            }}>
              <button className="btn-discard">Discard Changes</button>
              <button className="btn-save">Save Preferences</button>
            </div>
          </div>
        </div>
      </main>

      {/* ── UNSUBSCRIBE CARD ── */}
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center',
        alignItems: 'flex-start', padding: '0 160px 64px',
      }}>
        <div style={{
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: 24, width: 800, maxWidth: 800, height: 94,
          background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 12,
        }}>
          {/* Left: icon + text */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
              <rect x="1" y="1" width="26" height="18" rx="2" stroke="#DC2626" strokeWidth="1.6"/>
              <path d="M1 6L14 14L27 6" stroke="#DC2626" strokeWidth="1.6"/>
              <line x1="20" y1="14" x2="26" y2="20" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="26" y1="14" x2="20" y2="20" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#7F1D1D' }}>
                Unsubscribe from all
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#B91C1C' }}>
                Turn off all email notifications with one click.
              </span>
            </div>
          </div>

          {/* Opt-out button */}
          <button className="btn-optout">Opt-out of all</button>
        </div>
      </div>
    </div>
  );
};

export default EmailNotificationPreferences;