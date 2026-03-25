import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MessageCenter = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Messages');
  const [activeNav, setActiveNav] = useState('Messages');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Messages', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="2" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 6L10 12L19 6" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Candidates', icon: <svg width="20" height="18" viewBox="0 0 20 18" fill="none"><circle cx="8" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M1 17C1 13.134 4.134 10 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 12L16 14L20 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Jobs', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 4V3C6 1.895 6.895 1 8 1H10C11.105 1 12 1.895 12 3V4" stroke="currentColor" strokeWidth="1.5"/><line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Analytics', icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><line x1="1" y1="15" x2="1" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="15" x2="5" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="15" x2="9" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="15" x2="13" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="15" x2="17" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  ];

  const kpiCards = [
    { label: 'Total Active', value: '124', delta: '+5%', deltaColor: '#10B981', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="2" width="18" height="14" rx="2" stroke="#137FEC" strokeWidth="1.5"/><path d="M1 7L10 13L19 7" stroke="#137FEC" strokeWidth="1.5"/></svg> },
    { label: 'Unread Messages', value: '12', delta: '-2%', deltaColor: '#F43F5E', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="2" width="18" height="14" rx="2" stroke="#F97316" strokeWidth="1.5"/><path d="M1 7L10 13L19 7" stroke="#F97316" strokeWidth="1.5"/><circle cx="16" cy="4" r="3" fill="#EF4444"/></svg> },
    { label: 'Response Rate', value: '94%', delta: '+1%', deltaColor: '#10B981', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="1.5"/><path d="M5 10L8.5 13.5L15 7" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];

  const conversations = [
    {
      id: 1, name: 'Marcus Chen', avatar: '👨‍💼', avatarBg: '#C9D8E8', hasDot: false, dotColor: '#10B981',
      role: 'Senior Product Designer', stage: 'Interview Stage', time: '2 min ago', timeColor: '#94A3B8',
      preview: '"Thanks for the update, Sarah! I\'ve cleared my Tuesda…',
      ctaPrimary: 'Schedule Interview', ctaSecondary: 'Quick Reply',
      ctaPrimaryBg: '#137FEC', ctaSecondaryBg: '#F1F5F9', ctaSecondaryColor: '#334155',
      highlighted: false,
    },
    {
      id: 2, name: 'Elena Rodriguez', avatar: '👩', avatarBg: '#F0C8B0', hasDot: true, dotColor: '#137FEC', dotNum: '1',
      role: 'Lead Backend Engineer', stage: 'Offer Pending', time: '14 min ago', timeColor: '#137FEC',
      preview: '"Just sent over the signed offer letter and the…',
      ctaPrimary: 'Finalize Hire', ctaSecondary: 'View Documents',
      ctaPrimaryBg: '#059669', ctaSecondaryBg: '#F1F5F9', ctaSecondaryColor: '#334155',
      highlighted: true,
    },
    {
      id: 3, name: 'David Wilson', avatar: '👨', avatarBg: '#D5C9B8', hasDot: false,
      role: 'Marketing Manager', stage: 'Screening', time: '1 hour ago', timeColor: '#94A3B8',
      preview: '"I\'ve attached the case study you requested during our…',
      ctaPrimary: 'Move to Interview', ctaSecondary: 'Review Case',
      ctaPrimaryBg: '#137FEC', ctaSecondaryBg: '#F1F5F9', ctaSecondaryColor: '#334155',
      highlighted: false,
    },
    {
      id: 4, name: 'Aisha Khan', avatar: '👩‍🦱', avatarBg: '#D5C4D8', hasDot: false,
      role: 'QA Engineer', stage: 'Pre-screen', time: '3 hours ago', timeColor: '#94A3B8',
      preview: '"Hello, I was wondering if there are any updates regarding…',
      ctaPrimary: 'Schedule Call', ctaSecondary: 'Quick Reply',
      ctaPrimaryBg: '#137FEC', ctaSecondaryBg: '#F1F5F9', ctaSecondaryColor: '#334155',
      highlighted: false,
    },
  ];

  const upcomingEvents = [
    { when: 'TODAY, 2:00 PM', title: 'Interview: Marcus Chen', sub: 'Portfolio Review Session', link: 'Join Google Meet', highlighted: true },
    { when: 'TOMORROW, 10:30 AM', title: 'Offer Discussion: Elena R.', sub: 'Phone Call (Sarah J.)', link: null, highlighted: false },
    { when: 'FRIDAY, 1:00 PM', title: 'Internal Hiring Review', sub: 'Conference Room B', link: null, highlighted: false },
  ];

  const recentActivity = [
    { dot: '#10B981', text: 'Marcus Chen updated his resume 10m ago' },
    { dot: '#137FEC', text: 'Elena Rodriguez viewed the offer 2h ago' },
  ];

  const filterBtns = ['All Messages', 'Job Posting', 'Status', 'Unread Only'];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .mc-nav-link {
          display: flex; flex-direction: row; align-items: center;
          gap: 12px; padding: 10px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s;
        }
        .mc-nav-link:hover { background: #F1F5F9; }
        .mc-nav-link.active {
          background: rgba(19,127,236,0.1);
          border-right: 4px solid #137FEC;
          color: #137FEC; font-weight: 600;
        }

        .mc-filter-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; height: 36px; border-radius: 8px;
          border: 1px solid #E2E8F0; background: #FFFFFF;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          color: #0F172A; cursor: pointer; transition: background 0.12s;
          white-space: nowrap;
        }
        .mc-filter-btn:hover { background: #F8FAFC; }
        .mc-filter-btn.active { background: #137FEC; border-color: #137FEC; color: #FFFFFF; }

        .mc-conv-card {
          box-sizing: border-box; display: flex; flex-direction: row;
          align-items: flex-start; gap: 16px; padding: 20px; width: 100%;
          background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
          cursor: pointer; transition: box-shadow 0.15s;
        }
        .mc-conv-card:hover { box-shadow: 0px 4px 12px rgba(0,0,0,0.06); }
        .mc-conv-card.highlighted { border-left: 4px solid #137FEC; }

        .mc-cta-btn {
          display: flex; justify-content: center; align-items: center;
          padding: 8px 16px; height: 32px; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 12px;
          cursor: pointer; white-space: nowrap; transition: opacity 0.12s;
        }
        .mc-cta-btn:hover { opacity: 0.9; }

        .mc-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          padding: 9px 16px 10px;
        }
        .mc-search-input::placeholder { color: #6B7280; }

        .mc-event-card {
          box-sizing: border-box; position: relative;
          width: 100%; border-radius: 12px; padding: 17px;
          overflow: hidden; transition: box-shadow 0.12s;
        }
        .mc-event-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
      `}</style>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{
        boxSizing: 'border-box', width: 256, flexShrink: 0,
        background: '#FFFFFF', borderRight: '1px solid #E2E8F0',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Logo */}
        <div style={{ padding: 24, paddingBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <svg width="30" height="29" viewBox="0 0 30 29" fill="none">
              <path d="M15 2C15 2 8 6 5 13C2 20 6 27 15 27C24 27 28 20 25 13C22 6 15 2 15 2Z" fill="#137FEC" opacity="0.15"/>
              <path d="M9 15L12 12L15 15L18 12L21 15" stroke="#137FEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="15" cy="8" r="3" stroke="#137FEC" strokeWidth="1.6"/>
            </svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#137FEC' }}>
              TalentAcquire
            </span>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B', paddingLeft: 42 }}>
            Enterprise Plan
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => (
            <button
              key={item.label}
              className={`mc-nav-link${activeNav === item.label ? ' active' : ''}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div style={{
          boxSizing: 'border-box', padding: 16,
          borderTop: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F0C8B0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            👩
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>Sarah Jenkins</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>Senior Recruiter</p>
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" stroke="#94A3B8" strokeWidth="1.4"/>
              <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Main Header */}
        <div style={{
          boxSizing: 'border-box', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: '0 32px', height: 64,
          background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', flexShrink: 0,
        }}>
          {/* Search */}
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            flex: 1, maxWidth: 448, height: 36,
            background: '#F1F5F9', borderRadius: 8,
          }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#94A3B8" strokeWidth="1.5"/>
                <line x1="13" y1="13" x2="17" y2="17" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              className="mc-search-input"
              style={{ paddingLeft: 40 }}
              type="text"
              placeholder="Search conversations, candidates, or jobs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Bell with badge */}
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', width: 32, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#64748B" strokeWidth="1.4"/>
                <path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#64748B" strokeWidth="1.4"/>
              </svg>
              <div style={{
                position: 'absolute', top: 8, right: 8,
                width: 8, height: 8, borderRadius: '50%',
                background: '#EF4444', border: '2px solid #FFFFFF',
              }} />
            </button>
            {/* New Message button */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', height: 36, borderRadius: 8,
              background: '#137FEC', border: 'none',
              fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#FFFFFF',
              cursor: 'pointer', transition: 'background 0.15s',
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="1" x2="5" y2="9" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="1" y1="5" x2="9" y2="5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              New Message
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Page Title + Stats */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.75px', color: '#0F172A', marginBottom: 4 }}>
                  Message Center
                </h1>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#64748B' }}>
                  Manage your active candidate conversations and interview scheduling.
                </p>
              </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {kpiCards.map((card, i) => (
                <div key={i} style={{ boxSizing: 'border-box', padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B' }}>{card.label}</span>
                    <span style={{ display: 'flex' }}>{card.icon}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 30, lineHeight: '36px', color: '#0F172A' }}>{card.value}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: card.deltaColor }}>{card.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversations section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Filter bar */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              {filterBtns.map(f => (
                <button
                  key={f}
                  className={`mc-filter-btn${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                  {(f === 'Job Posting' || f === 'Status') && (
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
                      <path d="M1 1L4.5 4.5L8 1" stroke={activeFilter === f ? '#FFFFFF' : '#0F172A'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Conversation Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {conversations.map(conv => (
                <div key={conv.id} className={`mc-conv-card${conv.highlighted ? ' highlighted' : ''}`}>
                  {/* Avatar */}
                  <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%', background: conv.avatarBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                    }}>{conv.avatar}</div>
                    {conv.hasDot && (
                      <div style={{
                        position: 'absolute', top: -2, right: 0,
                        width: 16, height: 16, borderRadius: '50%',
                        background: conv.dotColor, border: '2px solid #FFFFFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 10, color: '#FFFFFF',
                      }}>{conv.dotNum}</div>
                    )}
                  </div>

                  {/* Message info */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>
                        {conv.name}
                      </h3>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: conv.timeColor === '#137FEC' ? 700 : 400, fontSize: 12, color: conv.timeColor, flexShrink: 0 }}>
                        {conv.time}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, lineHeight: '20px', color: '#137FEC' }}>
                      {conv.role} • {conv.stage}
                    </p>
                    <p style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: conv.id === 2 ? 500 : 400,
                      fontSize: 14, lineHeight: '20px', color: conv.id === 2 ? '#0F172A' : '#475569',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{conv.preview}</p>
                  </div>

                  {/* CTA buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                    <button className="mc-cta-btn" style={{ background: conv.ctaPrimaryBg, color: '#FFFFFF' }}>
                      {conv.ctaPrimary}
                    </button>
                    <button className="mc-cta-btn" style={{ background: conv.ctaSecondaryBg, color: conv.ctaSecondaryColor }}>
                      {conv.ctaSecondary}
                    </button>
                  </div>
                </div>
              ))}

              {/* View more */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#137FEC',
                }}>
                  View 84 more conversations
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside style={{
        boxSizing: 'border-box', width: 320, flexShrink: 0,
        background: '#FFFFFF', borderLeft: '1px solid #E2E8F0',
        padding: 24, display: 'flex', flexDirection: 'column', gap: 0,
        overflow: 'auto',
      }}>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A', marginBottom: 24 }}>
          Upcoming Events
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          {upcomingEvents.map((ev, i) => (
            <div key={i} className="mc-event-card" style={{
              background: ev.highlighted ? 'rgba(19,127,236,0.05)' : '#FFFFFF',
              border: ev.highlighted ? '1px solid rgba(19,127,236,0.2)' : '1px solid #E2E8F0',
            }}>
              <p style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12,
                textTransform: 'uppercase', color: ev.highlighted ? '#137FEC' : '#94A3B8',
                marginBottom: 8,
              }}>{ev.when}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#0F172A', marginBottom: 4 }}>
                {ev.title}
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                {ev.sub}
              </p>
              {ev.link && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <rect x="0.5" y="0.5" width="7" height="8" rx="1" stroke="#137FEC" strokeWidth="1.1"/>
                    <path d="M8 3L11 1.5V7.5L8 6" stroke="#137FEC" strokeWidth="1.1"/>
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#137FEC', cursor: 'pointer' }}>
                    {ev.link}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid #E2E8F0' }}>
          <h3 style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14,
            letterSpacing: '1.4px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 16,
          }}>RECENT ACTIVITY</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ paddingTop: 6, flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dot }} />
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, lineHeight: '16px', color: '#0F172A' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MessageCenter;