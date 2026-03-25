import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CMSPageEditor = () => {
  const navigate = useNavigate();
  const [activeTopNav, setActiveTopNav] = useState('CMS');
  const [activeSideNav, setActiveSideNav] = useState('Pages');
  const [activeTab, setActiveTab] = useState('All Pages (12)');
  const [currentPage, setCurrentPage] = useState(1);
  const [urlSlug, setUrlSlug] = useState('about');
  const [visibility, setVisibility] = useState('Public');
  const [showInMenu, setShowInMenu] = useState(true);
  const [metaTitle, setMetaTitle] = useState('About JobPortal - Connecting Talent');
  const [metaDesc, setMetaDesc] = useState('Learn about our journey and why thousands of candidates trust us for their next career move.');
  const [pageTitle, setPageTitle] = useState('About Us');

  const topNavLinks = ['Dashboard', 'Jobs', 'Users', 'CMS'];

  const sideNavItems = [
    {
      label: 'Pages',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="1" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <line x1="5" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="5" y1="9" x2="13" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="5" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    },
    {
      label: 'Blog',
      icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
        <path d="M1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="15" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="1" y1="8" x2="0" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M8 1V0M8 16V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    },
    {
      label: 'SEO Settings',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
        <line x1="11.5" y1="11.5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    },
    {
      label: 'Media Library',
      icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
        <rect x="1" y="1" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 12L5 8L8 11L12 7L17 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      label: 'Navigation',
      icon: <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <line x1="1" y1="2" x2="17" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="1" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="1" y1="12" x2="11" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    },
  ];

  const tabs = ['All Pages (12)', 'Drafts (4)', 'Published (8)', 'Archived'];

  const pages = [
    { icon: '🌐', title: 'About Us', slug: '/about', updated: 'Oct 15, 2023', status: 'Published', statusBg: '#DCFCE7', statusDot: '#16A34A', statusColor: '#15803D' },
    { icon: '🔒', title: 'Privacy Policy', slug: '/privacy', updated: 'Nov 02, 2023', status: 'Published', statusBg: '#DCFCE7', statusDot: '#16A34A', statusColor: '#15803D' },
    { icon: '📋', title: 'FAQs', slug: '/faqs', updated: 'Nov 10, 2023', status: 'Draft', statusBg: '#F1F5F9', statusDot: '#94A3B8', statusColor: '#64748B' },
    { icon: '⚖️', title: 'Terms of Service', slug: '/terms', updated: 'Aug 22, 2023', status: 'Published', statusBg: '#DCFCE7', statusDot: '#16A34A', statusColor: '#15803D' },
  ];

  const editorContent = `<h2 style="font-size:22px;font-weight:700;color:#0F172A;margin:0 0 16px">Empowering Career Journeys</h2>
<p style="font-size:14px;color:#334155;line-height:1.7;margin:0 0 16px">At oobPortal, our mission is to connect ambitious professionals with the world's most innovative companies. We believe that everyone deserves a career that they are passionate about.</p>
<p style="font-size:14px;color:#334155;line-height:1.7;margin:0 0 16px">Founded in 2020, we have helped over 500,000 individuals find their dream jobs across various sectors including Technology, Finance, and Creative Arts.</p>
<blockquote style="border-left:3px solid #137FEC;padding:12px 16px;background:#EFF6FF;margin:0 0 16px;border-radius:0 6px 6px 0;font-size:14px;color:#1D4ED8;line-height:1.6;font-style:italic">"Our platform is built on transparency, diversity, and the relentless pursuit of excellence in the recruitment space."</blockquote>
<p style="font-size:14px;color:#334155;line-height:1.7;margin:0">Whether you're a fresh graduate or a seasoned executive, oobPortal provides the tools and opportunities you need to take your career to the next level...</p>`;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cms-top-link {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          color: #475569; padding: 0 0 2px; transition: color 0.12s; white-space: nowrap;
        }
        .cms-top-link.active { color: #137FEC; font-weight: 700; border-bottom: 2px solid #137FEC; }
        .cms-top-link:hover:not(.active) { color: #0F172A; }

        .cms-side-link {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s;
        }
        .cms-side-link:hover { background: #F1F5F9; }
        .cms-side-link.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 600; }

        .cms-tab {
          box-sizing: border-box; padding: 8px 4px 12px;
          background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600; color: #64748B; white-space: nowrap; transition: color 0.12s;
        }
        .cms-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .cms-tab:hover:not(.active) { color: #334155; }

        .cms-toolbar-btn {
          display: flex; justify-content: center; align-items: center;
          width: 28px; height: 28px; border-radius: 4px; border: none;
          background: none; cursor: pointer; font-size: 13px; font-weight: 700; color: #334155;
          font-family: 'Inter', sans-serif;
        }
        .cms-toolbar-btn:hover { background: #F1F5F9; }

        .cms-page-btn {
          display: flex; justify-content: center; align-items: center;
          width: 28px; height: 28px; border-radius: 4px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 13px; border: 1px solid #E2E8F0;
          background: #FFFFFF; color: #475569; transition: background 0.12s;
        }
        .cms-page-btn.active { background: #137FEC; color: #FFFFFF; font-weight: 700; border-color: #137FEC; }
        .cms-page-btn:hover:not(.active) { background: #F1F5F9; }

        .cms-input {
          width: 100%; padding: 10px 12px; background: #FFFFFF;
          border: 1px solid #E2E8F0; border-radius: 8px; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          transition: border-color 0.15s;
        }
        .cms-input:focus { border-color: #137FEC; }

        .cms-textarea {
          width: 100%; padding: 10px 12px; background: #FFFFFF;
          border: 1px solid #E2E8F0; border-radius: 8px; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          resize: vertical; min-height: 80px; transition: border-color 0.15s;
        }
        .cms-textarea:focus { border-color: #137FEC; }

        .cms-select {
          width: 100%; padding: 10px 12px; background: #FFFFFF;
          border: 1px solid #E2E8F0; border-radius: 8px; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          appearance: none; cursor: pointer;
        }

        .cms-toggle {
          position: relative; width: 40px; height: 22px; background: #137FEC;
          border-radius: 11px; cursor: pointer; border: none; transition: background 0.2s;
        }
        .cms-toggle::after {
          content: ''; position: absolute; width: 18px; height: 18px;
          background: #FFFFFF; border-radius: 50%; top: 2px; right: 2px;
          transition: right 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .cms-toggle.off { background: #CBD5E1; }
        .cms-toggle.off::after { right: auto; left: 2px; }

        .cms-action-btn {
          display: flex; justify-content: center; align-items: center;
          width: 28px; height: 28px; border-radius: 6px; border: none;
          background: none; cursor: pointer; transition: background 0.12s;
        }
        .cms-action-btn:hover { background: #F1F5F9; }

        .cms-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
        }
        .cms-search-input::placeholder { color: #94A3B8; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 24px', height: 56, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0, gap: 32,
      }}>
        {/* Logo + top nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: '#137FEC', borderRadius: 8 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="3" width="16" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M6 3V2C6 1.448 6.448 1 7 1H11C11.552 1 12 1.448 12 2V3" stroke="#FFFFFF" strokeWidth="1.5"/>
                <line x1="1" y1="8" x2="17" y2="8" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A', letterSpacing: '-0.2px' }}>oobPortal Admin</span>
          </div>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {topNavLinks.map(link => (
              <button key={link} className={`cms-top-link${activeTopNav === link ? ' active' : ''}`} onClick={() => setActiveTopNav(link)}>{link}</button>
            ))}
          </nav>
        </div>
        {/* Search + icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, height: 36, background: '#F1F5F9', borderRadius: 8, padding: '0 12px', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.3"/>
              <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input className="cms-search-input" type="text" placeholder="Search pages..." />
          </div>
          <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 34, height: 34, borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="16" height="19" viewBox="0 0 16 19" fill="none"><path d="M8 0C8 0 3 3 3 9v3l-2 2v1h14v-1l-2-2V9C13 3 8 0 8 0Z" stroke="#475569" strokeWidth="1.4"/><path d="M6 16c0 1.105.895 2 2 2s2-.895 2-2" stroke="#475569" strokeWidth="1.4"/></svg>
          </button>
          <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 34, height: 34, borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="3" stroke="#475569" strokeWidth="1.4"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.05 3.05l1.42 1.42M13.53 13.53l1.42 1.42M3.05 14.95l1.42-1.42M13.53 4.47l1.42-1.42" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#C9A88A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer', flexShrink: 0 }}>👤</div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ boxSizing: 'border-box', width: 200, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, overflow: 'auto', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', padding: '0 12px', marginBottom: 8 }}>CONTENT MANAGER</p>
            {sideNavItems.map(item => (
              <button key={item.label} className={`cms-side-link${activeSideNav === item.label ? ' active' : ''}`} onClick={() => setActiveSideNav(item.label)}>
                <span style={{ color: activeSideNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          {/* Support center */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 12px' }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 13, color: '#137FEC', marginBottom: 4 }}>Support Center</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B', marginBottom: 8 }}>Need help with the editor?</p>
            <a href="#" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: '#137FEC', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              Documentation
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* === SECTION 1: Page List === */}
          <div>
            {/* Page header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 28, letterSpacing: '-0.5px', color: '#0F172A', marginBottom: 6 }}>CMS Page Editor</h1>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>Easily update static content like About Us, Privacy Policy, and FAQs.</p>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#137FEC', borderRadius: 8, border: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF', cursor: 'pointer', boxShadow: '0 4px 12px rgba(19,127,236,0.25)', whiteSpace: 'nowrap' }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><line x1="5.5" y1="1" x2="5.5" y2="10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="5.5" x2="10" y2="5.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Create New Page
              </button>
            </div>

            {/* Table card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              {/* Tabs */}
              <div style={{ boxSizing: 'border-box', padding: '0 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 24 }}>
                {tabs.map(tab => (
                  <button key={tab} className={`cms-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </div>

              {/* Table head */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 160px 160px 120px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['PAGE TITLE', 'SLUG', 'LAST UPDATED', 'STATUS', 'ACTIONS'].map((h, i) => (
                  <div key={h} style={{ padding: '12px 24px', textAlign: i === 4 ? 'right' : 'left' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>{h}</span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {pages.map((page, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 160px 160px 120px', borderTop: i > 0 ? '1px solid #F1F5F9' : 'none', alignItems: 'center', height: 60 }}>
                  <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>{page.icon}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{page.title}</span>
                  </div>
                  <div style={{ padding: '0 24px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#64748B' }}>{page.slug}</span>
                  </div>
                  <div style={{ padding: '0 24px' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#475569' }}>{page.updated}</span>
                  </div>
                  <div style={{ padding: '0 24px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: page.statusBg, borderRadius: '9999px' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: page.statusDot, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: page.statusColor }}>{page.status}</span>
                    </span>
                  </div>
                  <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                    <button className="cms-action-btn" title="Edit">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M11 1L14 4L5 13H2V10L11 1Z" stroke="#64748B" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="cms-action-btn" title="Preview">
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6C1 6 3.5 1 8 1C12.5 1 15 6 15 6C15 6 12.5 11 8 11C3.5 11 1 6 1 6Z" stroke="#64748B" strokeWidth="1.3"/><circle cx="8" cy="6" r="2.5" stroke="#64748B" strokeWidth="1.3"/></svg>
                    </button>
                    <button className="cms-action-btn" title="Delete">
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none"><path d="M1 3.5H12M4.5 3.5V2C4.5 1.448 4.948 1 5.5 1H7.5C8.052 1 8.5 1.448 8.5 2V3.5M5.5 7V12M7.5 7V12M2 3.5L2.5 13C2.5 13.552 2.948 14 3.5 14H9.5C10.052 14 10.5 13.552 10.5 13L11 3.5" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#64748B' }}>Showing 4 of 12 pages</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <button className="cms-page-btn">
                    <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M3.5 1L1 3.5L3.5 6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  {[1, 2].map(p => (
                    <button key={p} className={`cms-page-btn${currentPage === p ? ' active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
                  ))}
                  <button className="cms-page-btn">
                    <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M0.5 1L3 3.5L0.5 6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* === SECTION 2: Quick Edit === */}
          <div>
            {/* Quick edit header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.3px' }}>Quick Edit: About Us</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#475569', cursor: 'pointer' }}>
                  Preview Changes
                </button>
                <button style={{ padding: '8px 16px', background: '#F1F5F9', border: 'none', borderRadius: 8, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#334155', cursor: 'pointer' }}>
                  Save Draft
                </button>
                <button style={{ padding: '8px 20px', background: '#137FEC', border: 'none', borderRadius: 8, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF', cursor: 'pointer', boxShadow: '0 4px 12px rgba(19,127,236,0.25)' }}>
                  Publish
                </button>
              </div>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
              {/* Left: editor */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                {/* Page title field */}
                <div style={{ padding: '20px 20px 0' }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 8 }}>PAGE TITLE</p>
                  <input className="cms-input" type="text" value={pageTitle} onChange={e => setPageTitle(e.target.value)} style={{ fontSize: 16, fontWeight: 700 }} />
                </div>
                {/* Content editor */}
                <div style={{ padding: '20px' }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 10 }}>CONTENT EDITOR</p>
                  {/* Toolbar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px 8px 0 0', border: '1px solid #E2E8F0', borderBottom: 'none', flexWrap: 'wrap' }}>
                    {[
                      { label: 'B', style: { fontWeight: 900 } },
                      { label: 'I', style: { fontStyle: 'italic' } },
                      { label: 'U', style: { textDecoration: 'underline' } },
                    ].map(btn => (
                      <button key={btn.label} className="cms-toolbar-btn" style={btn.style}>{btn.label}</button>
                    ))}
                    <div style={{ width: 1, height: 18, background: '#E2E8F0', margin: '0 4px' }} />
                    {/* List */}
                    <button className="cms-toolbar-btn">
                      <svg width="13" height="11" viewBox="0 0 13 11" fill="none"><line x1="4" y1="2" x2="13" y2="2" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="5.5" x2="13" y2="5.5" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="9" x2="13" y2="9" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><circle cx="1.5" cy="2" r="1" fill="#334155"/><circle cx="1.5" cy="5.5" r="1" fill="#334155"/><circle cx="1.5" cy="9" r="1" fill="#334155"/></svg>
                    </button>
                    {/* Numbered list */}
                    <button className="cms-toolbar-btn">
                      <svg width="13" height="11" viewBox="0 0 13 11" fill="none"><line x1="5" y1="2" x2="13" y2="2" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="5.5" x2="13" y2="5.5" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="9" x2="13" y2="9" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><text x="0" y="10" style={{fontSize:'8px',fill:'#334155',fontFamily:'Inter'}}>1.</text></svg>
                    </button>
                    {/* Link */}
                    <button className="cms-toolbar-btn">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M5 5H9" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><path d="M3 7H2C0.895 7 0 6.105 0 5C0 3.895 0.895 3 2 3H3" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/><path d="M11 3H12C13.105 3 14 3.895 14 5C14 6.105 13.105 7 12 7H11" stroke="#334155" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </button>
                    {/* Image */}
                    <button className="cms-toolbar-btn">
                      <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><rect x="1" y="1" width="12" height="10" rx="1.5" stroke="#334155" strokeWidth="1.3"/><circle cx="4.5" cy="4.5" r="1.5" stroke="#334155" strokeWidth="1.1"/><path d="M1 9L4 6.5L6.5 9L9.5 6L13 9" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    {/* Code */}
                    <button className="cms-toolbar-btn" style={{ fontFamily: 'monospace', fontSize: 12 }}>{'<>'}</button>
                  </div>
                  {/* Editor area */}
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: '0 0 8px 8px', padding: '16px', minHeight: 320, background: '#FFFFFF' }} dangerouslySetInnerHTML={{ __html: editorContent }} />
                </div>
              </div>

              {/* Right: settings panels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Publishing Settings */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#137FEC" strokeWidth="1.5"/><path d="M1 9H17M9 1C6.5 3.5 5 6.1 5 9C5 11.9 6.5 14.5 9 17M9 1C11.5 3.5 13 6.1 13 9C13 11.9 11.5 14.5 9 17" stroke="#137FEC" strokeWidth="1.3"/></svg>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Publishing Settings</h3>
                  </div>
                  {/* URL Slug */}
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6 }}>URL SLUG</p>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden', background: '#FFFFFF' }}>
                      <span style={{ padding: '9px 10px', background: '#F8FAFC', borderRight: '1px solid #E2E8F0', fontFamily: 'monospace', fontSize: 13, color: '#94A3B8' }}>/</span>
                      <input type="text" value={urlSlug} onChange={e => setUrlSlug(e.target.value)} style={{ flex: 1, padding: '9px 10px', border: 'none', outline: 'none', fontFamily: 'monospace', fontSize: 13, color: '#0F172A', background: '#FFFFFF' }} />
                    </div>
                  </div>
                  {/* Visibility */}
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6 }}>VISIBILITY</p>
                    <div style={{ position: 'relative' }}>
                      <select className="cms-select" value={visibility} onChange={e => setVisibility(e.target.value)}>
                        <option>Public</option>
                        <option>Private</option>
                        <option>Draft</option>
                      </select>
                      <svg style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                  {/* Show in Main Menu */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#334155' }}>Show in Main Menu</span>
                    <button className={`cms-toggle${showInMenu ? '' : ' off'}`} onClick={() => setShowInMenu(!showInMenu)} />
                  </div>
                </div>

                {/* SEO & Metadata */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="7" stroke="#137FEC" strokeWidth="1.5"/><line x1="13" y1="13" x2="17" y2="17" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: '#0F172A' }}>SEO & Metadata</h3>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6 }}>META TITLE</p>
                    <input className="cms-input" type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6 }}>META DESCRIPTION</p>
                    <textarea className="cms-textarea" value={metaDesc} onChange={e => setMetaDesc(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer style={{ borderTop: '1px solid #E2E8F0', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#94A3B8' }}>© 2024 oobPortal Admin Panel. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'User Agreement', 'Support'].map(link => (
                <a key={link} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#64748B', textDecoration: 'none' }}>{link}</a>
              ))}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default CMSPageEditor;