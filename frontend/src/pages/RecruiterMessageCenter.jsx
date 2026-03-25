import React, { useState } from 'react';

const RecruiterMessageCenter = () => {
  const [activeNav, setActiveNav] = useState('Messages');
  const [activeFilter, setActiveFilter] = useState('All Messages');
  const [search, setSearch] = useState('');

  const navItems = [
    { label: 'Dashboard', icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="#475569" strokeWidth="1.4"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="#475569" strokeWidth="1.4"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="#475569" strokeWidth="1.4"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="#475569" strokeWidth="1.4"/></svg>
    )},
    { label: 'Messages', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 3h16v11H11l-4 4V14H2V3z" stroke="#137FEC" strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>
    )},
    { label: 'Candidates', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><circle cx="8" cy="5" r="3.5" stroke="#475569" strokeWidth="1.4"/><path d="M1 15C1 11.7 4.1 9 8 9C11.9 9 15 11.7 15 15" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/><circle cx="16" cy="5" r="3" stroke="#475569" strokeWidth="1.4"/><path d="M19 15C19 12.5 17.7 10.4 15.8 9.3" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/></svg>
    )},
    { label: 'Jobs', icon: (
      <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><rect x="1" y="5" width="18" height="13" rx="2" stroke="#475569" strokeWidth="1.4"/><path d="M7 5V3C7 2 7.9 1 9 1H11C12.1 1 13 2 13 3V5" stroke="#475569" strokeWidth="1.4"/></svg>
    )},
    { label: 'Analytics', icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="9" width="4" height="8" rx="1" stroke="#475569" strokeWidth="1.4"/><rect x="7" y="5" width="4" height="12" rx="1" stroke="#475569" strokeWidth="1.4"/><rect x="13" y="1" width="4" height="16" rx="1" stroke="#475569" strokeWidth="1.4"/></svg>
    )},
  ];

  const conversations = [
    {
      id: 1,
      name: 'Marcus Chen',
      role: 'Senior Product Designer',
      stage: 'Interview Stage',
      time: '2 min ago',
      preview: '"Thanks for the update, Sarah! I\'ve cleared my Tuesda…',
      online: true,
      unread: false,
      primaryBtn: { label: 'Schedule Interview', color: '#137FEC' },
      secondaryBtn: { label: 'Quick Reply', color: '#F1F5F9', textColor: '#334155' },
      avatarColor: '#6B7280',
      avatarInitials: 'MC',
    },
    {
      id: 2,
      name: 'Elena Rodriguez',
      role: 'Lead Backend Engineer',
      stage: 'Offer Pending',
      time: '14 min ago',
      timeColor: '#137FEC',
      preview: '"Just sent over the signed offer letter and the…',
      online: false,
      unread: true,
      unreadBadge: '1',
      primaryBtn: { label: 'Finalize Hire', color: '#059669' },
      secondaryBtn: { label: 'View Documents', color: '#F1F5F9', textColor: '#334155' },
      avatarColor: '#8B5CF6',
      avatarInitials: 'ER',
      highlighted: true,
    },
    {
      id: 3,
      name: 'David Wilson',
      role: 'Marketing Manager',
      stage: 'Screening',
      time: '1 hour ago',
      preview: '"I\'ve attached the case study you requested during our…',
      online: false,
      unread: false,
      primaryBtn: { label: 'Move to Interview', color: '#137FEC' },
      secondaryBtn: { label: 'Review Case', color: '#F1F5F9', textColor: '#334155' },
      avatarColor: '#0EA5E9',
      avatarInitials: 'DW',
      opacity: 0.9,
    },
    {
      id: 4,
      name: 'Aisha Khan',
      role: 'QA Engineer',
      stage: 'Pre-screen',
      time: '3 hours ago',
      preview: '"Hello, I was wondering if there are any updates regarding…',
      online: false,
      unread: false,
      primaryBtn: { label: 'Schedule Call', color: '#137FEC' },
      secondaryBtn: { label: 'Quick Reply', color: '#F1F5F9', textColor: '#334155' },
      avatarColor: '#F59E0B',
      avatarInitials: 'AK',
      opacity: 0.9,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      when: 'TODAY, 2:00 PM',
      whenColor: '#137FEC',
      title: 'Interview: Marcus Chen',
      subtitle: 'Portfolio Review Session',
      link: 'Join Google Meet',
      highlighted: true,
    },
    {
      id: 2,
      when: 'TOMORROW, 10:30 AM',
      whenColor: '#94A3B8',
      title: 'Offer Discussion: Elena R.',
      subtitle: 'Phone Call (Sarah J.)',
      link: null,
    },
    {
      id: 3,
      when: 'FRIDAY, 1:00 PM',
      whenColor: '#94A3B8',
      title: 'Internal Hiring Review',
      subtitle: 'Conference Room B',
      link: null,
    },
  ];

  const recentActivity = [
    { dot: '#10B981', text: 'Marcus Chen updated his resume 10m ago' },
    { dot: '#137FEC', text: 'Elena Rodriguez viewed the offer 2h ago' },
  ];

  const stats = [
    { label: 'Total Active', value: '124', change: '+5%', changeColor: '#10B981', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 4h16v11H11l-4 4V15H2V4z" stroke="#137FEC" strokeWidth="1.4" fill="none"/></svg>
    )},
    { label: 'Unread Messages', value: '12', change: '-2%', changeColor: '#F43F5E', icon: (
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none"><path d="M10 1C7.8 1 6 2.8 6 5V5.8C3.2 6.9 1 9.5 1 12.5V18H19V12.5C19 9.5 16.8 6.9 14 5.8V5C14 2.8 12.2 1 10 1ZM10 22C11.7 22 13 20.7 13 19H7C7 20.7 8.3 22 10 22Z" stroke="#F97316" strokeWidth="1.2" fill="none"/></svg>
    ), iconColor: '#F97316'},
    { label: 'Response Rate', value: '94%', change: '+1%', changeColor: '#10B981', icon: (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M2 8L7 13L18 2" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ), iconColor: '#10B981'},
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: 'flex', height: '100vh', background: '#F6F7F8', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .rmc-nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .rmc-nav-item.active { background: rgba(19,127,236,0.1); border-right: 4px solid #137FEC; }
        .rmc-nav-item:not(.active):hover { background: #F8FAFC; }
        .rmc-filter-btn { padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter',sans-serif; transition: all 0.15s; display: flex; align-items: center; gap: 8px; }
        .rmc-filter-btn.active { background: #137FEC; color: #FFFFFF; border: none; }
        .rmc-filter-btn:not(.active) { background: #FFFFFF; color: #0F172A; border: 1px solid #E2E8F0; }
        .rmc-convo-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 16px; transition: box-shadow 0.2s; }
        .rmc-convo-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .rmc-convo-card.highlighted { border-left: 4px solid #137FEC; }
        .rmc-btn { border: none; cursor: pointer; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; border-radius: 8px; padding: 8px 16px; transition: opacity 0.15s; }
        .rmc-btn:hover { opacity: 0.85; }
        .rmc-event-card { border-radius: 12px; padding: 17px; position: relative; overflow: hidden; }
        .rmc-event-card.highlighted { background: rgba(19,127,236,0.05); border: 1px solid rgba(19,127,236,0.2); }
        .rmc-event-card:not(.highlighted) { border: 1px solid #E2E8F0; }
      `}</style>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{ width: '256px', flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="30" height="29" viewBox="0 0 30 29" fill="none">
              <circle cx="15" cy="14.5" r="13" fill="rgba(19,127,236,0.15)"/>
              <path d="M8 10L15 7L22 10V17C22 20.3 18.8 23 15 24C11.2 23 8 20.3 8 17V10Z" fill="#137FEC"/>
              <path d="M11 14L14 17L19 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontWeight: '700', fontSize: '20px', color: '#137FEC', letterSpacing: '-0.5px' }}>TalentAcquire</span>
          </div>
          <span style={{ fontSize: '12px', color: '#64748B', paddingLeft: '42px' }}>Enterprise Plan</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => (
            <button key={item.label} className={`rmc-nav-item${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
              <span style={{ width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: activeNav === item.label ? '600' : '500', color: activeNav === item.label ? '#137FEC' : '#475569' }}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>SJ</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Sarah Jenkins</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Senior Recruiter</div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="#94A3B8" strokeWidth="1.4"/><path d="M10 1V3M10 17V19M1 10H3M17 10H19M3.2 3.2L4.6 4.6M15.4 15.4L16.8 16.8M16.8 3.2L15.4 4.6M4.6 15.4L3.2 16.8" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ flex: 1, maxWidth: '576px', position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="6" stroke="#94A3B8" strokeWidth="1.5"/><path d="M13 13L17 17" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations, candidates, or jobs..." style={{ width: '100%', padding: '9px 16px 10px 40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '14px', color: '#6B7280', outline: 'none', fontFamily: 'Inter,sans-serif' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ width: '32px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#64748B"/></svg>
              <div style={{ position: 'absolute', width: '8px', height: '8px', background: '#EF4444', border: '2px solid #FFFFFF', borderRadius: '9999px', right: '7px', top: '8px' }} />
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><line x1="4.5" y1="0" x2="4.5" y2="9" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="0" y1="4.5" x2="9" y2="4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              New Message
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '4px' }}>Message Center</h1>
              <p style={{ fontSize: '16px', color: '#64748B' }}>Manage your active candidate conversations and interview scheduling.</p>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>{stat.label}</span>
                  <span style={{ color: stat.iconColor || '#137FEC' }}>{stat.icon}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A' }}>{stat.value}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: stat.changeColor }}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['All Messages', 'Job Posting ▾', 'Status ▾', 'Unread Only'].map(f => (
              <button key={f} className={`rmc-filter-btn${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>

          {/* Conversation cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            {conversations.map(conv => (
              <div key={conv.id} className={`rmc-convo-card${conv.highlighted ? ' highlighted' : ''}`} style={{ opacity: conv.opacity || 1 }}>
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: '48px', height: '48px', background: `linear-gradient(135deg, ${conv.avatarColor}, ${conv.avatarColor}99)`, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{conv.avatarInitials}</span>
                  </div>
                  {conv.online && (
                    <div style={{ position: 'absolute', width: '12px', height: '12px', background: '#10B981', border: '2px solid #FFFFFF', borderRadius: '9999px', right: 0, bottom: 0 }} />
                  )}
                  {conv.unread && conv.unreadBadge && (
                    <div style={{ position: 'absolute', width: '16px', height: '19px', background: '#137FEC', border: '2px solid #FFFFFF', borderRadius: '9999px', right: 0, top: '-2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '10px', color: 'white', fontWeight: '400' }}>{conv.unreadBadge}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{conv.name}</h3>
                    <span style={{ fontSize: '12px', color: conv.timeColor || '#94A3B8', fontWeight: conv.timeColor ? '700' : '400', flexShrink: 0 }}>{conv.time}</span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC' }}>{conv.role} • {conv.stage}</p>
                  <p style={{ fontSize: '14px', color: conv.unread && !conv.online ? '#0F172A' : '#475569', fontWeight: conv.unread && !conv.online ? '500' : '400', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.preview}</p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                  <button className="rmc-btn" style={{ background: conv.primaryBtn.color, color: '#FFFFFF' }}>{conv.primaryBtn.label}</button>
                  <button className="rmc-btn" style={{ background: conv.secondaryBtn.color, color: conv.secondaryBtn.textColor }}>{conv.secondaryBtn.label}</button>
                </div>
              </div>
            ))}
          </div>

          {/* View more */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#137FEC', fontFamily: 'Inter,sans-serif' }}>
              View 84 more conversations
            </button>
          </div>
        </div>
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside style={{ width: '320px', flexShrink: 0, background: '#FFFFFF', borderLeft: '1px solid #E2E8F0', padding: '24px', overflowY: 'auto' }}>
        {/* Upcoming Events */}
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '24px' }}>Upcoming Events</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {upcomingEvents.map(event => (
            <div key={event.id} className={`rmc-event-card${event.highlighted ? ' highlighted' : ''}`}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: event.whenColor, textTransform: 'uppercase', marginBottom: '8px' }}>{event.when}</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{event.title}</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: event.link ? '12px' : '0' }}>{event.subtitle}</div>
              {event.link && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5H11M7 1L11 5L7 9" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#137FEC', cursor: 'pointer' }}>{event.link}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#94A3B8', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ paddingTop: '6px', flexShrink: 0 }}>
                  <div style={{ width: '8px', height: '8px', background: item.dot, borderRadius: '9999px' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', lineHeight: '16px' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RecruiterMessageCenter;