import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShortlistCandidates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Candidates');
  const [selectedCards, setSelectedCards] = useState({ 2: true });
  const [shortlisted, setShortlisted] = useState([
    { id: 's1', name: 'Elena Rodriguez', role: 'Design System Lead @ CloudTech', avatar: '👩', avatarBg: '#F0C8B0' },
    { id: 's2', name: 'James Wilson', role: 'Senior Product Designer @ Neobank', avatar: '👨', avatarBg: '#C9D8E8' },
  ]);

  const applications = [
    {
      id: 1,
      name: 'Marcus Thorne',
      role: 'UX Architect @ Studio Design',
      avatar: '👨‍💼',
      avatarBg: '#C9D8E8',
      tags: [
        { label: 'FIGMA EXPERT', bg: '#DCFCE7', color: '#15803D' },
        { label: '8 YRS EXP', bg: '#DBEAFE', color: '#1D4ED8' },
        { label: 'REMOTE OK', bg: '#F1F5F9', color: '#475569' },
      ],
      footer: { text: 'Matched 92% of skills', highlight: false },
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      role: 'Senior Designer @ Fintech Pro',
      avatar: '👩‍🦱',
      avatarBg: '#F0C8B0',
      tags: [
        { label: 'DESIGN SYSTEMS', bg: '#F3E8FF', color: '#7E22CE' },
        { label: '6 YRS EXP', bg: '#DBEAFE', color: '#1D4ED8' },
        { label: 'LONDON', bg: '#F1F5F9', color: '#475569' },
      ],
      footer: { text: 'Priority Candidate', highlight: true, icon: true },
      selected: true,
      highlighted: true,
    },
    {
      id: 3,
      name: 'David Cho',
      role: 'Visual Designer @ Creative Hub',
      avatar: '👨‍💻',
      avatarBg: '#D5C9B8',
      tags: [
        { label: 'MOTION GRAPHICS', bg: '#FFEDD5', color: '#C2410C' },
        { label: '4 YRS EXP', bg: '#DBEAFE', color: '#1D4ED8' },
      ],
      footer: { text: 'Applied 2 days ago', highlight: false },
    },
  ];

  const navItems = [
    { label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg> },
    { label: 'Jobs', icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><rect x="1" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 5V4C7 2.895 7.895 2 9 2H11C12.105 2 13 2.895 13 4V5" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.4"/></svg> },
    { label: 'Candidates', icon: <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><circle cx="8" cy="6" r="4" stroke="currentColor" strokeWidth="1.4"/><circle cx="17" cy="6" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M4 11C4 9 6 7 8 7C10 7 12 9 12 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M13 11C13 9 15 7 17 7C19 7 21 9 21 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { label: 'Interviews', icon: <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><rect x="1" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.4"/><line x1="5" y1="1" x2="5" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="13" y1="1" x2="13" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { label: 'Settings', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  ];

  const toggleSelect = (id) => {
    setSelectedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedCount = Object.values(selectedCards).filter(Boolean).length;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sc-sidebar-item {
          display: flex; flex-direction: row; align-items: center;
          padding: 8px 12px; gap: 12px; width: 223px; height: 36px;
          border-radius: 8px; background: none; border: none;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569;
          transition: background 0.15s; text-align: left;
        }
        .sc-sidebar-item:hover { background: #F1F5F9; }
        .sc-sidebar-item.active {
          background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 600;
        }

        .sc-candidate-card {
          box-sizing: border-box;
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 20px; width: 468px;
          background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
          cursor: pointer; transition: box-shadow 0.15s, border-color 0.15s;
        }
        .sc-candidate-card:hover { box-shadow: 0px 4px 12px rgba(0,0,0,0.06); }
        .sc-candidate-card.selected {
          border: 2px solid rgba(19,127,236,0.5);
          box-shadow: 0px 0px 0px 2px rgba(19,127,236,0.1), 0px 1px 2px rgba(0,0,0,0.05);
        }

        .sc-shortlisted-card {
          box-sizing: border-box;
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 16px; width: 432px; height: 74px;
          background: #FFFFFF; box-shadow: 0px 1px 2px rgba(0,0,0,0.05);
          border-radius: 12px; transition: box-shadow 0.15s;
        }
        .sc-shortlisted-card:hover { box-shadow: 0px 4px 12px rgba(0,0,0,0.06); }

        .sc-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          padding: 9px 16px 10px;
        }
        .sc-search-input::placeholder { color: #6B7280; }

        .btn-filter {
          box-sizing: border-box;
          display: flex; flex-direction: row; align-items: center;
          padding: 8px 16px; gap: 8px; height: 38px;
          border: 1px solid #E2E8F0; border-radius: 8px;
          background: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 14px; color: #0F172A; transition: background 0.15s;
        }
        .btn-filter:hover { background: #F8FAFC; }

        .btn-shortlist {
          display: flex; flex-direction: row; align-items: center;
          padding: 9px 16px; gap: 8px; height: 38px;
          background: #137FEC; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 14px; color: #FFFFFF; cursor: pointer;
          box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2);
          transition: background 0.2s;
        }
        .btn-shortlist:hover { background: #0e6fd4; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 32px', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: 34, height: 28, background: '#137FEC', borderRadius: 8, padding: 6,
          }}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <circle cx="8" cy="6" r="4" stroke="#FFFFFF" strokeWidth="1.5"/>
              <circle cx="15" cy="6" r="4" stroke="#FFFFFF" strokeWidth="1.5"/>
              <path d="M2 15C2 11.686 4.686 9 8 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M11 15C11 11.686 12.686 9 15 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#0F172A' }}>
            RecruitFlow
          </span>
        </div>

        {/* Search bar */}
        <div style={{
          flex: 1, maxWidth: 608, margin: '0 32px',
          display: 'flex', alignItems: 'center',
          background: '#F1F5F9', borderRadius: 8, position: 'relative', height: 36,
        }}>
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#94A3B8" strokeWidth="1.4"/>
              <line x1="13.5" y1="13.5" x2="16.5" y2="16.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <input
            className="sc-search-input"
            style={{ paddingLeft: 40 }}
            type="text"
            placeholder="Search candidates, skills, or job titles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Icons + Avatar */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <button style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8 }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 0C8 0 3 3 3 10v4l-2 2v1h14v-1l-2-2v-4C13 3 8 0 8 0Z" stroke="#475569" strokeWidth="1.4"/>
              <path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#475569" strokeWidth="1.4"/>
            </svg>
          </button>
          <div style={{
            width: 40, height: 40,
            background: 'rgba(19,127,236,0.2)',
            border: '2px solid #137FEC',
            borderRadius: '9999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, cursor: 'pointer', overflow: 'hidden',
          }}>👨‍💼</div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 16, width: 256,
          background: '#FFFFFF', borderRight: '1px solid #E2E8F0',
          flexShrink: 0,
        }}>
          {/* Nav items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 223 }}>
            {navItems.map(item => (
              <button
                key={item.label}
                className={`sc-sidebar-item${activeNav === item.label ? ' active' : ''}`}
                onClick={() => setActiveNav(item.label)}
                style={{ color: activeNav === item.label ? '#137FEC' : '#475569' }}
              >
                <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', color: activeNav === item.label ? '#137FEC' : '#475569' }}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
            {/* Divider */}
            <div style={{ margin: '16px 0', width: 223, height: 1, background: '#F1F5F9' }} />
          </div>

          {/* Hiring Goal widget */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 8,
            padding: 16, width: 223, background: '#F8FAFC', borderRadius: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>
                Hiring Goal
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#137FEC' }}>65%</span>
            </div>
            <div style={{ position: 'relative', width: 191, height: 8, background: '#E2E8F0', borderRadius: '9999px' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '65%', background: '#137FEC', borderRadius: '9999px' }} />
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 10, lineHeight: '15px', color: '#94A3B8' }}>
              12 of 20 positions filled this quarter
            </span>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 960, maxWidth: 1152 }}>

            {/* Page Header */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: 960 }}>
              <div style={{ position: 'relative', width: 496 }}>
                {/* Breadcrumb */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#94A3B8' }}>Jobs</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#94A3B8' }}>/</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#137FEC' }}>Senior UI Designer</span>
                </div>
                <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 30, lineHeight: '36px', color: '#0F172A', marginBottom: 4 }}>
                  Review Applicants
                </h1>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#64748B' }}>
                  Select the best fits to move forward to the{' '}
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>Initial Screening</span> stage.
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                <button className="btn-filter">
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                    <line x1="0" y1="1" x2="14" y2="1" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round"/>
                    <line x1="2" y1="5" x2="12" y2="5" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round"/>
                    <line x1="4" y1="8" x2="10" y2="8" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Filter
                </button>
                <button className="btn-shortlist">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="7" stroke="#FFFFFF" strokeWidth="1.4"/>
                    <path d="M4 7.5L6.5 10L11 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Shortlist Selected ({selectedCount})
                </button>
              </div>
            </div>

            {/* Two-column Kanban */}
            <div style={{ position: 'relative', width: 960, minHeight: 596 }}>

              {/* ── LEFT COLUMN: New Applications ── */}
              <div style={{
                position: 'absolute', left: 0, right: 492, top: 0,
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                {/* Column header */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 8px', gap: 8, height: 24 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#334155' }}>
                    New Applications
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '2px 8px', background: '#E2E8F0', borderRadius: '9999px' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#475569' }}>18</span>
                  </div>
                </div>

                {/* Candidate Cards */}
                {applications.map(app => (
                  <div
                    key={app.id}
                    className={`sc-candidate-card${selectedCards[app.id] ? ' selected' : ''}`}
                    onClick={() => toggleSelect(app.id)}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16, width: '100%' }}>
                      {/* Avatar */}
                      <div style={{
                        width: 56, height: 56, borderRadius: '9999px',
                        background: app.avatarBg, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 28, overflow: 'hidden',
                      }}>{app.avatar}</div>

                      {/* Info */}
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>
                              {app.name}
                            </p>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                              {app.role}
                            </p>
                          </div>
                          {/* Checkbox */}
                          {selectedCards[app.id] ? (
                            <div style={{
                              width: 20, height: 20, background: '#137FEC',
                              borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <path d="M1 4L4.5 7.5L11 1" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          ) : (
                            <div style={{
                              width: 20, height: 20,
                              background: '#FFFFFF', border: '1px solid #CBD5E1',
                              borderRadius: 4, flexShrink: 0,
                            }} />
                          )}
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                          {app.tags.map((tag, i) => (
                            <span key={i} style={{
                              display: 'flex', alignItems: 'center', padding: '2px 8px',
                              background: tag.bg, borderRadius: '9999px',
                              fontFamily: "'Inter',sans-serif", fontWeight: 700,
                              fontSize: 10, lineHeight: '15px',
                              letterSpacing: '0.5px', textTransform: 'uppercase', color: tag.color,
                            }}>{tag.label}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                      boxSizing: 'border-box',
                      display: 'flex', flexDirection: 'row',
                      justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: 16, width: '100%',
                      borderTop: '1px solid #F8FAFC', marginTop: 12,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {app.footer.icon && (
                          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                            <path d="M5 1L9 5H6V11H4V5H1L5 1Z" fill="#D97706"/>
                          </svg>
                        )}
                        <span style={{
                          fontFamily: "'Inter',sans-serif", fontWeight: app.footer.highlight ? 500 : 400,
                          fontSize: 12, lineHeight: '16px',
                          color: app.footer.highlight ? '#D97706' : '#94A3B8',
                        }}>
                          {app.footer.text}
                        </span>
                      </div>
                      {/* Action icons */}
                      <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <circle cx="8.5" cy="8.5" r="7" stroke="#94A3B8" strokeWidth="1.3"/>
                            <line x1="5" y1="8.5" x2="12" y2="8.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
                          </svg>
                        </button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                          <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
                            <rect x="1" y="1" width="11" height="15" rx="2" stroke="#94A3B8" strokeWidth="1.3"/>
                            <line x1="3.5" y1="5" x2="9.5" y2="5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
                            <line x1="3.5" y1="8" x2="9.5" y2="8" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
                            <line x1="3.5" y1="11" x2="7" y2="11" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── RIGHT COLUMN: Initial Screening (Shortlist) ── */}
              <div style={{
                position: 'absolute', left: 492, right: 0, top: 0,
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                {/* Column header */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 8px', gap: 8, height: 24 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#137FEC' }}>
                    Initial Screening
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '2px 8px', background: 'rgba(19,127,236,0.2)', borderRadius: '9999px' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#137FEC' }}>
                      {shortlisted.length}
                    </span>
                  </div>
                </div>

                {/* Drop zone container */}
                <div style={{
                  boxSizing: 'border-box',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', gap: 16,
                  padding: 16, width: 468, minHeight: 543,
                  background: 'rgba(248,250,252,0.5)',
                  border: '2px dashed #E2E8F0', borderRadius: 16,
                }}>
                  {/* Shortlisted candidate cards */}
                  {shortlisted.map(c => (
                    <div key={c.id} className="sc-shortlisted-card">
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '9999px',
                          background: c.avatarBg, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 22, overflow: 'hidden',
                        }}>{c.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>
                            {c.name}
                          </p>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                            {c.role}
                          </p>
                        </div>
                        {/* ⋮ button */}
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                            <circle cx="5" cy="3" r="1.5" fill="#CBD5E1"/>
                            <circle cx="5" cy="8" r="1.5" fill="#CBD5E1"/>
                            <circle cx="5" cy="13" r="1.5" fill="#CBD5E1"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Empty drop area */}
                  <div style={{
                    boxSizing: 'border-box',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    padding: '126px 0px',
                    width: 432, flex: 1, minHeight: 200,
                    border: '2px dashed #E2E8F0', borderRadius: 12,
                  }}>
                    <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M13.5 2V18M13.5 18L8 13M13.5 18L19 13" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 20V24H23V20" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '20px', color: '#94A3B8', textAlign: 'center' }}>
                      Drag candidates here
                    </p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#CBD5E1', textAlign: 'center' }}>
                      to move them to screening stage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShortlistCandidates;