import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobDescriptionBuilder = () => {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState('Editor');
  const [content, setContent] = useState(
    'We are looking for a highly skilled Senior Software Engineer to join our growing team. You will be responsible for designing and implementing scalable solutions that power our core platform.'
  );
  const [jobTitle] = useState('Senior Software Engineer');

  const navItems = [
    {
      label: 'Overview',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="#475569" strokeWidth="1.4"/>
          <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="#475569" strokeWidth="1.4"/>
          <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="#475569" strokeWidth="1.4"/>
          <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="#475569" strokeWidth="1.4"/>
        </svg>
      ),
      activeIcon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="#137FEC" strokeWidth="1.4"/>
          <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="#137FEC" strokeWidth="1.4"/>
          <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="#137FEC" strokeWidth="1.4"/>
          <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="#137FEC" strokeWidth="1.4"/>
        </svg>
      ),
    },
    {
      label: 'Editor',
      icon: (
        <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
          <line x1="0" y1="1" x2="15" y2="1" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="0" y1="6.5" x2="10" y2="6.5" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="0" y1="12" x2="12" y2="12" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ),
      activeIcon: (
        <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
          <line x1="0" y1="1" x2="15" y2="1" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="0" y1="6.5" x2="10" y2="6.5" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="0" y1="12" x2="12" y2="12" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: 'Review',
      icon: (
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <path d="M1 6.5C1 6.5 3.5 1 8.5 1C13.5 1 16 6.5 16 6.5C16 6.5 13.5 12 8.5 12C3.5 12 1 6.5 1 6.5Z" stroke="#475569" strokeWidth="1.4"/>
          <circle cx="8.5" cy="6.5" r="2" stroke="#475569" strokeWidth="1.4"/>
        </svg>
      ),
      activeIcon: (
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <path d="M1 6.5C1 6.5 3.5 1 8.5 1C13.5 1 16 6.5 16 6.5C16 6.5 13.5 12 8.5 12C3.5 12 1 6.5 1 6.5Z" stroke="#137FEC" strokeWidth="1.4"/>
          <circle cx="8.5" cy="6.5" r="2" stroke="#137FEC" strokeWidth="1.4"/>
        </svg>
      ),
    },
    {
      label: 'Publish',
      icon: (
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
          <path d="M1 6.5L6 11.5L15 1" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      activeIcon: (
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
          <path d="M1 6.5L6 11.5L15 1" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  const savedTemplates = ['Software Engineer', 'Product Designer', 'Marketing Manager'];

  const suggestions = [
    {
      tag: 'REQUIREMENT',
      tagBg: '#D1FAE5',
      tagColor: '#047857',
      text: '5+ years of experience building scalable backend systems with Node.js and TypeScript.',
    },
    {
      tag: 'BENEFIT',
      tagBg: '#FEF3C7',
      tagColor: '#B45309',
      text: 'Unlimited PTO and flexible working hours with a remote-first culture.',
    },
    {
      tag: 'RESPONSIBILITY',
      tagBg: 'rgba(19,127,236,0.1)',
      tagColor: '#137FEC',
      text: 'Mentor junior engineers and drive architectural decisions for the frontend platform.',
    },
  ];

  const aiButtons = [
    'Generate Responsibilities',
    'Generate Requirements',
    'Generate Benefits',
  ];

  const toolbarButtons = [
    { label: 'B', style: { fontWeight: 700, fontSize: 14 } },
    { label: 'I', style: { fontStyle: 'italic', fontSize: 14 } },
    { label: 'U', style: { textDecoration: 'underline', fontSize: 14 } },
  ];

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: '#F6F7F8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .jdb-nav-link {
          font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
          color: #475569; background: none; border: none; cursor: pointer; padding: 0;
          transition: color 0.15s;
        }
        .jdb-nav-link:hover { color: #137FEC; }

        .jdb-sidebar-item {
          display: flex; flex-direction: row; align-items: center;
          padding: 8px 12px; gap: 12px; width: 223px; height: 36px;
          border-radius: 8px; background: transparent; border: none;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569;
          transition: background 0.15s; text-align: left;
        }
        .jdb-sidebar-item:hover { background: #F1F5F9; }
        .jdb-sidebar-item.active {
          background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 700;
        }

        .jdb-template-btn {
          display: flex; flex-direction: column; justify-content: center;
          align-items: flex-start; padding: 8px 12px;
          width: 223px; height: 36px; background: none; border: none;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 400; color: #475569;
          border-radius: 6px; text-align: left; transition: background 0.15s;
        }
        .jdb-template-btn:hover { background: #F1F5F9; color: #0F172A; }

        .jdb-toolbar-btn {
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 8px; min-width: 30px; height: 30px;
          border-radius: 4px; background: none; border: none;
          cursor: pointer; color: #475569; font-family: 'Inter', sans-serif;
          font-size: 13px; transition: background 0.15s;
        }
        .jdb-toolbar-btn:hover { background: #F1F5F9; }

        .jdb-ai-btn {
          display: flex; flex-direction: row; justify-content: space-between;
          align-items: center; padding: 12px; width: 100%; height: 52px;
          background: rgba(255,255,255,0.2); border-radius: 8px;
          border: none; cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600; color: #FFFFFF;
          transition: background 0.15s; text-align: left;
        }
        .jdb-ai-btn:hover { background: rgba(255,255,255,0.3); }

        .jdb-suggestion-card {
          box-sizing: border-box;
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 16px; gap: 7px; width: 368px;
          background: #FFFFFF; border: 1px solid #E2E8F0;
          border-radius: 12px; transition: box-shadow 0.15s;
        }
        .jdb-suggestion-card:hover {
          box-shadow: 0px 4px 12px rgba(0,0,0,0.08);
        }

        .jdb-editor-area {
          width: 100%; min-height: 300px;
          border: none; outline: none; resize: none;
          font-family: 'Inter', sans-serif; font-size: 16px;
          line-height: 24px; color: #475569;
          background: transparent; padding: 0;
        }

        .btn-publish {
          display: flex; justify-content: center; align-items: center;
          padding: 0px 16px; height: 40px; min-width: 84px;
          background: #137FEC; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 14px; color: #FFFFFF; cursor: pointer;
          transition: background 0.2s;
        }
        .btn-publish:hover { background: #0e6fd4; }

        .btn-preview {
          display: flex; flex-direction: row; align-items: center;
          padding: 8px 16px; gap: 8px; height: 38px;
          background: #F1F5F9; border: 1px solid #E2E8F0;
          border-radius: 8px; cursor: pointer; font-family: 'Inter', sans-serif;
          font-weight: 700; font-size: 14px; color: #334155;
          transition: background 0.15s;
        }
        .btn-preview:hover { background: #E2E8F0; }

        .btn-save-draft {
          display: flex; flex-direction: row; align-items: center;
          padding: 9px 16px; gap: 8px; height: 38px;
          background: #137FEC; border-radius: 8px; border: none;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-weight: 700; font-size: 14px; color: #FFFFFF;
          transition: background 0.2s;
        }
        .btn-save-draft:hover { background: #0e6fd4; }
      `}</style>

      {/* ── TOP HEADER ── */}
      <header style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px', width: '100%', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: 32, height: 32, background: '#137FEC', borderRadius: 4,
          }}>
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
              <rect x="1" y="5" width="18" height="13" rx="2" stroke="#FFFFFF" strokeWidth="1.8"/>
              <path d="M7 5V4C7 2.895 7.895 2 9 2H11C12.105 2 13 2.895 13 4V5" stroke="#FFFFFF" strokeWidth="1.8"/>
              <line x1="1" y1="10" x2="19" y2="10" stroke="#FFFFFF" strokeWidth="1.8"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18,
            lineHeight: '22px', letterSpacing: '-0.27px', color: '#0F172A',
          }}>HireFlow AI</span>
        </div>

        {/* Nav + Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <button className="jdb-nav-link">Dashboard</button>
            <button className="jdb-nav-link">Templates</button>
            <button className="jdb-nav-link">Drafts</button>
          </div>
          <button className="btn-publish" onClick={() => {}}>Publish Job</button>
          {/* Avatar */}
          <div style={{
            width: 40, height: 40,
            background: 'url(https://api.dicebear.com/7.x/avataaars/svg?seed=employer) center/cover',
            border: '1px solid #E2E8F0', borderRadius: '9999px',
            overflow: 'hidden', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#E2E8F0', fontSize: 18,
          }}>👤</div>
        </div>
      </header>

      {/* ── BODY: SIDEBAR + MAIN ── */}
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'stretch' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          padding: 16, width: 256, minHeight: '100%',
          background: '#FFFFFF', borderRight: '1px solid #E2E8F0', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, width: 223 }}>

            {/* Company info */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 8, gap: 12, width: 223, height: 56 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                background: 'linear-gradient(135deg, #6B7B3A 0%, #8B9E4A 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#FFFFFF', letterSpacing: 0.5,
              }}>ACME</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '18px', color: '#0F172A' }}>
                  Acme Corp
                </span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                  HR Administrator
                </span>
              </div>
            </div>

            {/* Nav items */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, width: 223 }}>
              {navItems.map(item => (
                <button
                  key={item.label}
                  className={`jdb-sidebar-item${activeNav === item.label ? ' active' : ''}`}
                  onClick={() => setActiveNav(item.label)}
                >
                  <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    {activeNav === item.label ? item.activeIcon : item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Saved Templates section */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              padding: '16px 0px 0px', width: 223,
            }}>
              <div style={{
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: '16px 0px 0px', gap: 8, width: 223,
                borderTop: '1px solid #F1F5F9',
              }}>
                <div style={{ padding: '0px 12px', width: 223 }}>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10,
                    lineHeight: '15px', letterSpacing: '1px', textTransform: 'uppercase',
                    color: '#94A3B8',
                  }}>Saved Templates</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, width: 223 }}>
                  {savedTemplates.map(t => (
                    <button key={t} className="jdb-template-btn">{t}</button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, background: '#F8FAFC' }}>

          {/* Header Area */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            padding: 32, gap: 16, width: '100%',
            background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
          }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, height: 20 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#94A3B8', cursor: 'pointer' }}
                onClick={() => navigate('/employer/post-job')}>Jobs</span>
              <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
                <path d="M1 1L4 4L1 7" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
                New Job Description
              </span>
            </div>

            {/* Title row */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, flex: 1, maxWidth: 672 }}>
                <h1 style={{
                  fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30,
                  lineHeight: '36px', letterSpacing: '-0.75px', color: '#0F172A',
                }}>Job Description Builder</h1>
                <p style={{
                  fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 18,
                  lineHeight: '28px', color: '#64748B',
                }}>Harness AI to draft perfect responsibilities, requirements, and benefits in seconds.</p>
              </div>
              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
                <button className="btn-preview">
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                    <path d="M1 5.5C1 5.5 3.5 1 8.5 1C13.5 1 16 5.5 16 5.5C16 5.5 13.5 10 8.5 10C3.5 10 1 5.5 1 5.5Z" stroke="#334155" strokeWidth="1.5"/>
                    <circle cx="8.5" cy="5.5" r="2" stroke="#334155" strokeWidth="1.5"/>
                  </svg>
                  Preview
                </button>
                <button className="btn-save-draft">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2H9.5L12 4.5V12H2V2Z" stroke="#FFFFFF" strokeWidth="1.4" strokeLinejoin="round"/>
                    <rect x="4" y="8" width="6" height="4" stroke="#FFFFFF" strokeWidth="1.4"/>
                    <rect x="4" y="2" width="5" height="3" stroke="#FFFFFF" strokeWidth="1.4"/>
                  </svg>
                  Save Draft
                </button>
              </div>
            </div>
          </div>

          {/* Editor + AI Panel */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flex: 1, width: '100%', padding: 0 }}>

            {/* ── RICH TEXT EDITOR ── */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              padding: 32, flex: 1,
            }}>
              <div style={{
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                width: '100%', minHeight: 500,
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12,
                overflow: 'hidden',
              }}>
                {/* Toolbar */}
                <div style={{
                  boxSizing: 'border-box',
                  display: 'flex', flexDirection: 'row', alignItems: 'center',
                  padding: 8, gap: 4, width: '100%', height: 53,
                  background: 'rgba(248,250,252,0.5)',
                  borderBottom: '1px solid #F1F5F9',
                  borderRadius: '12px 12px 0px 0px',
                }}>
                  {/* Bold */}
                  <button className="jdb-toolbar-btn" style={{ fontWeight: 700, fontSize: 13, color: '#475569', fontFamily: 'Georgia, serif' }}>B</button>
                  {/* Italic */}
                  <button className="jdb-toolbar-btn" style={{ fontStyle: 'italic', fontSize: 13, color: '#475569', fontFamily: 'Georgia, serif' }}>I</button>
                  {/* Underline */}
                  <button className="jdb-toolbar-btn" style={{ textDecoration: 'underline', fontSize: 13, color: '#475569', fontFamily: 'Georgia, serif' }}>U</button>

                  {/* Divider */}
                  <div style={{ width: 1, height: 24, background: '#E2E8F0', margin: '0 4px' }} />

                  {/* Bullet list */}
                  <button className="jdb-toolbar-btn">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                      <circle cx="2" cy="3" r="1.5" fill="#475569"/>
                      <line x1="6" y1="3" x2="18" y2="3" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                      <circle cx="2" cy="8" r="1.5" fill="#475569"/>
                      <line x1="6" y1="8" x2="18" y2="8" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                      <circle cx="2" cy="13" r="1.5" fill="#475569"/>
                      <line x1="6" y1="13" x2="18" y2="13" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                  {/* Numbered list */}
                  <button className="jdb-toolbar-btn">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                      <text x="0" y="5" fontFamily="Inter" fontSize="6" fill="#475569">1.</text>
                      <line x1="6" y1="3" x2="18" y2="3" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                      <text x="0" y="11" fontFamily="Inter" fontSize="6" fill="#475569">2.</text>
                      <line x1="6" y1="9" x2="18" y2="9" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                      <text x="0" y="17" fontFamily="Inter" fontSize="6" fill="#475569">3.</text>
                      <line x1="6" y1="15" x2="18" y2="15" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>

                  {/* Divider */}
                  <div style={{ width: 1, height: 24, background: '#E2E8F0', margin: '0 4px' }} />

                  {/* Link */}
                  <button className="jdb-toolbar-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M7.5 10.5C7.83 11.04 8.27 11.5 8.79 11.84C9.31 12.18 9.9 12.38 10.5 12.41C11.1 12.45 11.7 12.32 12.24 12.03L14.5 10.5C15.16 9.82 15.53 8.91 15.53 7.96C15.53 7.01 15.16 6.1 14.5 5.42L13.5 4.5C12.82 3.84 11.91 3.47 10.96 3.47C10.01 3.47 9.1 3.84 8.42 4.5L7.96 4.96" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M10.5 7.5C10.17 6.96 9.73 6.5 9.21 6.16C8.69 5.82 8.1 5.62 7.5 5.59C6.9 5.55 6.3 5.68 5.76 5.97L3.5 7.5C2.84 8.18 2.47 9.09 2.47 10.04C2.47 10.99 2.84 11.9 3.5 12.58L4.5 13.5C5.18 14.16 6.09 14.53 7.04 14.53C7.99 14.53 8.9 14.16 9.58 13.5L10.04 13.04" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                  {/* Image */}
                  <button className="jdb-toolbar-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="2" width="14" height="14" rx="2" stroke="#475569" strokeWidth="1.4"/>
                      <circle cx="6.5" cy="6.5" r="1.5" stroke="#475569" strokeWidth="1.2"/>
                      <path d="M2 12L6 8L9 11L12 8L16 12" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Content Area */}
                <div style={{ padding: '32px', width: '100%', flex: 1 }}>
                  <h2 style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 24,
                    lineHeight: '32px', color: '#0F172A', marginBottom: 16,
                  }}>{jobTitle}</h2>
                  <p style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16,
                    lineHeight: '24px', color: '#475569', marginBottom: 24,
                  }}>{content}</p>

                  {/* Responsibilities heading */}
                  <h3 style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18,
                    lineHeight: '28px', color: '#1E293B', marginBottom: 12,
                  }}>Responsibilities</h3>

                  {/* Bullet list */}
                  <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                    {[
                      'Design and implement scalable, high-performance backend services using Node.js and TypeScript.',
                      'Collaborate with cross-functional teams including Product, Design, and DevOps to deliver robust features.',
                      'Lead code reviews and contribute to engineering best practices and technical standards.',
                    ].map((item, i) => (
                      <li key={i} style={{
                        fontFamily: "'Inter',sans-serif", fontWeight: 400,
                        fontSize: 16, lineHeight: '24px', color: '#475569',
                      }}>{item}</li>
                    ))}
                  </ul>

                  {/* Drop zone */}
                  <div style={{
                    boxSizing: 'border-box',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    padding: 24, width: '100%', minHeight: 100,
                    background: 'rgba(19,127,236,0.05)',
                    border: '2px dashed rgba(19,127,236,0.3)',
                    borderRadius: 8, gap: 8,
                  }}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <circle cx="12.5" cy="12.5" r="11" stroke="#137FEC" strokeWidth="1.8"/>
                      <line x1="12.5" y1="7" x2="12.5" y2="18" stroke="#137FEC" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="7" y1="12.5" x2="18" y2="12.5" stroke="#137FEC" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    <p style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 700,
                      fontSize: 14, lineHeight: '20px', color: '#137FEC', textAlign: 'center',
                    }}>Click to add a new section</p>
                    <p style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 400,
                      fontSize: 12, lineHeight: '16px', color: '#64748B', textAlign: 'center',
                    }}>Or drag a suggestion from the right panel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── AI PANEL ── */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              padding: '24px 32px 24px 0px', width: 400, flexShrink: 0,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, width: 368 }}>

                {/* AI Control Card */}
                <div style={{
                  position: 'relative',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  padding: 24, gap: 15, width: 368,
                  background: '#137FEC', borderRadius: 12,
                  boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)',
                }}>
                  {/* AI header */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%', height: 24 }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M11 2L13 8H19L14 12L16 18L11 14L6 18L8 12L3 8H9L11 2Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="1.5" fill="#FFFFFF" opacity="0.6"/>
                      <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" opacity="0.6"/>
                    </svg>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#FFFFFF' }}>
                      AI Assistant
                    </span>
                  </div>

                  {/* Subtitle */}
                  <p style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14,
                    lineHeight: '23px', color: '#FFFFFF', opacity: 0.9, width: '100%',
                  }}>
                    Select a category to generate smart suggestions for your job description.
                  </p>

                  {/* AI Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%' }}>
                    {aiButtons.map(label => (
                      <button key={label} className="jdb-ai-btn">
                        <span>{label}</span>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                          <path d="M1 1L5 5L1 9" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggestion Feed */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, width: 368 }}>
                  {/* Label */}
                  <div style={{ padding: '0px 4px', width: 368 }}>
                    <span style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 12,
                      lineHeight: '16px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#94A3B8',
                    }}>AI Suggestions</span>
                  </div>

                  {/* Cards */}
                  {suggestions.map((s, i) => (
                    <div key={i} className="jdb-suggestion-card">
                      {/* Tag row */}
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                          padding: '4px 8px', background: s.tagBg, borderRadius: 4,
                        }}>
                          <span style={{
                            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10,
                            lineHeight: '15px', letterSpacing: '-0.25px', textTransform: 'uppercase',
                            color: s.tagColor,
                          }}>{s.tag}</span>
                        </div>
                        {/* Dismiss button */}
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <line x1="2" y1="2" x2="12" y2="12" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round"/>
                            <line x1="12" y1="2" x2="2" y2="12" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                      {/* Text */}
                      <p style={{
                        fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14,
                        lineHeight: '23px', color: '#334155', width: '100%',
                      }}>"{s.text}"</p>
                    </div>
                  ))}

                  {/* Load more */}
                  <button style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', padding: '12px 0px', gap: 8,
                    width: 368, height: 44, background: 'none', border: 'none', cursor: 'pointer',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                      Load more suggestions
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobDescriptionBuilder;