import React, { useState } from 'react';

const SystemAnnouncements = () => {
  const [activeTab, setActiveTab] = useState('All Updates');
  const [search, setSearch] = useState('');

  const tabs = [
    { label: 'All Updates', count: 24 },
    { label: 'Maintenance', icon: '🔧' },
    { label: 'New Features', icon: '⭐' },
    { label: 'Security', icon: '🛡️' },
  ];

  const announcements = [
    {
      id: 1,
      badgeLabel: 'Feature Launch',
      badgeBg: '#DBEAFE',
      badgeColor: '#1D4ED8',
      iconBg: '#DBEAFE',
      iconColor: '#2563EB',
      icon: '✦',
      date: 'October 24, 2023',
      title: 'Introducing AI-Powered Analytics Dashboard',
      body: 'We are thrilled to unveil our new AI analytics suite. This update brings predictive modeling, automated anomaly detection, and natural language querying to your data insights. Experience a 40% faster decision-making process with our redesigned reporting engine.',
      linkLabel: 'Learn more about AI Features →',
      linkColor: '#137FEC',
      hasThumb: true,
      thumbBg: 'linear-gradient(135deg, rgba(19,127,236,0.2) 0%, rgba(59,130,246,0.2) 100%)',
    },
    {
      id: 2,
      badgeLabel: 'Scheduled Maintenance',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      icon: '🔧',
      date: 'October 21, 2023',
      title: 'Database Optimization: Weekend Downtime',
      body: 'On Sunday, Oct 29, from 02:00 to 04:00 UTC, we will be performing critical database maintenance to improve query performance across all regions. During this window, some services may experience intermittent availability.',
      linkLabel: 'View System Status Page ↗',
      linkColor: '#D97706',
    },
    {
      id: 3,
      badgeLabel: 'Security Patch',
      badgeBg: '#D1FAE5',
      badgeColor: '#047857',
      iconBg: '#D1FAE5',
      iconColor: '#059669',
      icon: '🛡️',
      date: 'October 18, 2023',
      title: 'Critical Security Update for API v3.2',
      body: 'We have patched a vulnerability in our API routing layer that could have affected rate-limiting accuracy. No data was compromised, but we recommend all users of the legacy API to migrate to v4.0 immediately.',
      linkLabel: 'Read the Security Bulletin →',
      linkColor: '#059669',
    },
    {
      id: 4,
      badgeLabel: 'New Region',
      badgeBg: '#F3E8FF',
      badgeColor: '#7E22CE',
      iconBg: '#F3E8FF',
      iconColor: '#9333EA',
      icon: '🌐',
      date: 'October 12, 2023',
      title: 'Expanding to South East Asia (Singapore)',
      body: 'Platform Cloud is now live in Singapore! Reduce latency for your users in the APAC region by deploying your instances to our newest high-availability zone. Available for all Enterprise and Business tier customers starting today.',
      linkLabel: 'Explore our global network →',
      linkColor: '#137FEC',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #64748B; }
        input:focus { outline: none; }
        a { text-decoration: none; color: inherit; }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; cursor: pointer; border: none; background: none; font-family: 'Inter',sans-serif; padding-bottom: 2px; border-bottom: 2px solid transparent; transition: color 0.15s; }
        .nav-link.active { color: #137FEC; font-weight: 600; border-bottom-color: #137FEC; }
        .nav-link:hover { color: #137FEC; }
        .tab-btn { display: flex; align-items: center; gap: 8px; padding: 16px 24px; border: none; background: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 500; color: #64748B; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.15s; }
        .tab-btn.active { color: #0F172A; font-weight: 700; border-bottom-color: #137FEC; }
        .tab-btn:hover { color: #0F172A; }
        .btn-rss { display: flex; align-items: center; gap: 8px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; padding: 10px 20px; transition: background 0.2s; white-space: nowrap; }
        .btn-rss:hover { background: #0e6fd4; }
        .announcement-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 32px; display: flex; gap: 32px; transition: box-shadow 0.2s; }
        .announcement-card:hover { box-shadow: 0px 4px 12px rgba(0,0,0,0.08); }
        .read-more { font-size: 14px; font-weight: 700; cursor: pointer; border: none; background: none; font-family: 'Inter',sans-serif; padding: 0; transition: opacity 0.15s; }
        .read-more:hover { opacity: 0.75; }
        .btn-load { background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 12px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 600; color: #334155; cursor: pointer; padding: 12px 32px; transition: background 0.15s; }
        .btn-load:hover { background: #F8FAFC; }
        .footer-link { font-size: 14px; font-weight: 500; color: #64748B; cursor: pointer; border: none; background: none; font-family: 'Inter',sans-serif; }
        .footer-link:hover { color: #137FEC; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 40px', height: 73,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Left: logo + nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: 8, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚀</div>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>Platform Cloud</span>
          </div>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {[
              { label: 'Dashboard', active: false },
              { label: 'Announcements', active: true },
              { label: 'Settings', active: false },
            ].map(item => (
              <button key={item.label} className={`nav-link${item.active ? ' active' : ''}`}>{item.label}</button>
            ))}
          </nav>
        </div>

        {/* Right: search + bell + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: 8, padding: '6px 12px', gap: 8, height: 48, width: 256 }}>
            <span style={{ fontSize: 13, color: '#64748B' }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search updates..."
              style={{ border: 'none', background: 'transparent', fontSize: 14, color: '#0F172A', flex: 1 }}
            />
          </div>
          <button style={{ width: 32, height: 36, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9999 }}>🔔</button>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 12, color: '#137FEC', cursor: 'pointer',
          }}>JD</div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, padding: '0 64px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '32px 40px 42px' }}>

          {/* Hero Section */}
          <div style={{ paddingBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxWidth: 664 }}>
                <span style={{
                  background: 'rgba(19,127,236,0.1)', color: '#137FEC',
                  fontSize: 12, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase',
                  padding: '3.5px 8px', borderRadius: 4, width: 'fit-content',
                }}>System Hub</span>
                <h1 style={{ fontSize: 36, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.9px', lineHeight: '40px' }}>
                  System Announcements
                </h1>
                <p style={{ fontSize: 18, color: '#475569', lineHeight: '29px' }}>
                  Stay informed about upcoming maintenance, critical security patches, and the latest feature releases to the platform.
                </p>
              </div>
              <button className="btn-rss">
                <span style={{ fontSize: 13 }}>📡</span>
                Subscribe to RSS
              </button>
            </div>

            {/* Tab navigation */}
            <div style={{ borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.label}
                    className={`tab-btn${activeTab === tab.label ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab.label)}
                  >
                    {tab.icon && <span style={{ fontSize: 13 }}>{tab.icon}</span>}
                    {tab.label}
                    {tab.count && (
                      <span style={{ background: '#F1F5F9', color: '#0F172A', fontSize: 12, fontWeight: 500, padding: '2px 8px', borderRadius: 4 }}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Announcement Cards */}
          <div style={{ paddingBottom: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>
            {announcements.map(item => (
              <div key={item.id} className="announcement-card">
                {/* Left: icon column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 64, flexShrink: 0 }}>
                  <div style={{
                    width: 64, height: 64, background: item.iconBg,
                    borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24,
                  }}>{item.icon}</div>
                </div>

                {/* Center: content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                  {/* Badge + date */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      background: item.badgeBg, color: item.badgeColor,
                      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      padding: '4px 8px', borderRadius: 4,
                    }}>{item.badgeLabel}</span>
                    <span style={{ fontSize: 14, color: '#94A3B8' }}>{item.date}</span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>{item.title}</h3>

                  {/* Body */}
                  <div style={{ paddingTop: 4 }}>
                    <p style={{ fontSize: 16, color: '#475569', lineHeight: '26px', maxWidth: 768 }}>{item.body}</p>
                  </div>

                  {/* Read more link */}
                  <div style={{ paddingTop: 16 }}>
                    <button className="read-more" style={{ color: item.linkColor }}>{item.linkLabel}</button>
                  </div>
                </div>

                {/* Right: thumbnail (only first card) */}
                {item.hasThumb && (
                  <div style={{ width: 192, height: 128, background: '#F1F5F9', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <div style={{
                      width: '100%', height: '100%',
                      background: item.thumbBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 28, opacity: 0.6,
                    }}>📊</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load older button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 64 }}>
            <button className="btn-load">Load older announcements</button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '48px 64px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 24, height: 24, background: 'rgba(19,127,236,0.2)', borderRadius: 8, padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🚀</div>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#0F172A' }}>Platform Cloud</span>
          </div>

          {/* Footer links */}
          <div style={{ display: 'flex', gap: 32 }}>
            {['Docs', 'Support', 'API Status', 'Privacy'].map(link => (
              <button key={link} className="footer-link">{link}</button>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: 14, color: '#94A3B8' }}>© 2023 Platform Cloud Inc. v4.2.0</p>
        </div>
      </footer>
    </div>
  );
};

export default SystemAnnouncements;