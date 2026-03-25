import React, { useState } from 'react';

const Toggle = ({ checked, onChange, disabled = false, size = 'md' }) => {
  const isLarge = size === 'lg';
  const w = isLarge ? 48 : 44;
  const h = isLarge ? 28 : 24;
  const knobSize = isLarge ? 20 : 16;
  const knobOffset = isLarge ? 4 : 4;
  const knobOn = w - knobSize - knobOffset;

  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: w, height: h, borderRadius: 9999,
        background: checked ? '#137FEC' : (disabled ? '#CBD5E1' : '#E2E8F0'),
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative', flexShrink: 0,
        transition: 'background 0.2s',
        padding: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: knobOffset, left: checked ? knobOn : knobOffset,
        width: knobSize, height: knobSize,
        background: '#FFFFFF', borderRadius: '50%',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />
    </button>
  );
};

const PushNotificationSettings = () => {
  const [masterToggle, setMasterToggle] = useState(true);
  const [settings, setSettings] = useState({
    newFollowers: true,
    directMessages: true,
    mentions: false,
    newsAnnouncements: true,
    offersPromotions: false,
    securityAlerts: true, // always on, disabled
  });

  const toggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => alert('Preferences saved!');
  const handleReset = () => {
    setMasterToggle(true);
    setSettings({ newFollowers: true, directMessages: true, mentions: false, newsAnnouncements: true, offersPromotions: false, securityAlerts: true });
  };

  const sections = [
    {
      label: 'Account Activity',
      items: [
        { key: 'newFollowers', icon: '👤', title: 'New Followers', sub: 'When someone starts following you' },
        { key: 'directMessages', icon: '💬', title: 'Direct Messages', sub: 'Private messages from your contacts' },
        { key: 'mentions', icon: '@', title: 'Mentions', sub: 'When someone tags you in a post', iconFontSize: 15 },
      ],
    },
    {
      label: 'Product Updates',
      items: [
        { key: 'newsAnnouncements', icon: '📢', title: 'News & Announcements', sub: 'New features and general app news' },
        { key: 'offersPromotions', icon: '🏷️', title: 'Offers & Promotions', sub: 'Exclusive deals and personalized offers' },
      ],
    },
    {
      label: 'Security',
      items: [
        { key: 'securityAlerts', icon: '🛡️', title: 'Security Alerts', sub: 'New login attempts or account changes', disabled: true },
      ],
      footnote: 'Security alerts cannot be disabled for your protection.',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .back-btn { width: 40px; height: 40px; background: #E2E8F0; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: background 0.15s; }
        .back-btn:hover { background: #CBD5E1; }
        .more-btn { width: 40px; height: 40px; background: rgba(19,127,236,0.1); border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
        .more-btn:hover { background: rgba(19,127,236,0.18); }
        .btn-save { width: 100%; height: 56px; background: #137FEC; border: none; border-radius: 12px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-save:hover { background: #0e6fd4; }
        .btn-reset { width: 100%; height: 40px; background: none; border: none; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 500; color: #64748B; cursor: pointer; transition: color 0.15s; }
        .btn-reset:hover { color: #334155; }
        .bottom-nav-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; background: none; }
        .notif-row { display: flex; align-items: center; padding: 16px 0; gap: 16px; border-bottom: 1px solid #F1F5F9; }
        .notif-row:last-of-type { border-bottom: none; }
        .icon-box { width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
      `}</style>

      {/* ── TOP NAV (blurred, mobile feel) ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(246,247,248,0.85)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px 24px', height: 73,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="back-btn">←</button>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>Notifications</span>
        </div>
        <button className="more-btn">
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
            <circle cx="2" cy="2"  r="1.5" fill="#137FEC"/>
            <circle cx="2" cy="8"  r="1.5" fill="#137FEC"/>
            <circle cx="2" cy="14" r="1.5" fill="#137FEC"/>
          </svg>
        </button>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 304px' }}>
        <div style={{ width: 672, maxWidth: 672, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Header Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h1 style={{ fontSize: 30, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>Push Settings</h1>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: '20px' }}>
              Choose which updates you'd like to receive as push notifications on your mobile device.
            </p>
          </div>

          {/* Master Toggle */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: 16, gap: 16,
            background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)',
            borderRadius: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#137FEC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 20 }}>🔔</span>
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', lineHeight: '24px' }}>Master Toggle</p>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase', lineHeight: '16px' }}>All Notifications</p>
              </div>
            </div>
            <Toggle checked={masterToggle} onChange={setMasterToggle} size="lg" />
          </div>

          {/* Notification Sections */}
          {sections.map(section => (
            <div key={section.label} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
              {/* Section label */}
              <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '1.2px', textTransform: 'uppercase', padding: '0 4px' }}>
                {section.label}
              </p>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {section.items.map((item, i) => (
                  <div key={item.key} className="notif-row" style={{ borderBottom: i < section.items.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <div className="icon-box" style={{ fontSize: item.iconFontSize || 18 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', lineHeight: '14px', marginBottom: 4 }}>{item.title}</p>
                      <p style={{ fontSize: 12, color: '#64748B', lineHeight: '16px' }}>{item.sub}</p>
                    </div>
                    <Toggle
                      checked={settings[item.key]}
                      onChange={() => toggle(item.key)}
                      disabled={item.disabled}
                    />
                  </div>
                ))}
              </div>

              {/* Section footnote */}
              {section.footnote && (
                <p style={{ fontSize: 11, color: '#94A3B8', lineHeight: '16px', padding: '0 4px' }}>
                  {section.footnote}
                </p>
              )}
            </div>
          ))}

          {/* Footer Actions */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <button className="btn-save" onClick={handleSave}>Save Preferences</button>
            <button className="btn-reset" onClick={handleReset}>Reset to Default</button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TAB BAR (mobile feel) ── */}
      <nav style={{
        background: '#FFFFFF', borderTop: '1px solid #E2E8F0',
        padding: '16px 32px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        {[
          { icon: '🏠', active: false },
          { icon: '🔍', active: false },
          { icon: '⚙️', active: true },
          { icon: '👤', active: false, avatar: true },
        ].map((tab, i) => (
          <button
            key={i}
            className="bottom-nav-icon"
            style={{
              width: tab.avatar ? 32 : 'auto',
              height: tab.avatar ? 32 : 'auto',
              borderRadius: tab.avatar ? '50%' : 0,
              background: tab.avatar ? 'rgba(19,127,236,0.2)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{
              fontSize: tab.avatar ? 16 : 20,
              filter: tab.active ? 'none' : 'grayscale(100%)',
              opacity: tab.active ? 1 : 0.5,
            }}>{tab.icon}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PushNotificationSettings;