import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Users');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navItems = [
    { label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Jobs', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 4V3C6 1.895 6.895 1 8 1H10C11.105 1 12 1.895 12 3V4" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.4"/></svg> },
    { label: 'Users', icon: <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><circle cx="7" cy="6" r="5" stroke="currentColor" strokeWidth="1.4"/><path d="M1 15C1 11.686 3.686 9 7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="15" cy="6" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M12 15C12 11.686 13.686 9 15 9C17.314 9 19 11.686 19 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { label: 'Companies', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="1" x2="6" y2="17" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="7" x2="6" y2="7" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="11" width="5" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.3"/></svg> },
    { label: 'Reports', icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><line x1="1" y1="15" x2="1" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="15" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="15" x2="9" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="15" x2="13" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="15" x2="17" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  ];

  const users = [
    { id: 1, initials: 'JD', name: 'Johnathan Doe', email: 'j.doe@example.com', status: 'Active', statusBg: '#DCFCE7', statusColor: '#166534', registration: 'Oct 12, 2023', score: 100 },
    { id: 2, initials: 'JS', name: 'Jane Smith', email: 'jane.smith@web.dev', status: 'Pending', statusBg: '#FEF3C7', statusColor: '#92400E', registration: 'Oct 14, 2023', score: 45 },
    { id: 3, initials: 'MR', name: 'Michael Ross', email: 'mike.ross@pearson.law', status: 'Suspended', statusBg: '#FEE2E2', statusColor: '#991B1B', registration: 'Sep 28, 2023', score: 80 },
    { id: 4, initials: 'HS', name: 'Harvey Specter', email: 'h.specter@nyc.law', status: 'Active', statusBg: '#DCFCE7', statusColor: '#166534', registration: 'Oct 20, 2023', score: 100 },
  ];

  const summaryCards = [
    { iconBg: '#DCFCE7', iconColor: '#16A34A', icon: <svg width="19" height="23" viewBox="0 0 19 23" fill="none"><path d="M9.5 1C5.358 1 2 4.358 2 8.5C2 11 3.3 13.2 5.2 14.5L1 22H18L13.8 14.5C15.7 13.2 17 11 17 8.5C17 4.358 13.642 1 9.5 1Z" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 9.5L8.5 11.5L12.5 7" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Verified Users', value: '84%' },
    { iconBg: 'rgba(19,127,236,0.1)', iconColor: '#137FEC', icon: <svg width="23" height="14" viewBox="0 0 23 14" fill="none"><path d="M1 12L7 6L11 9L16 4L22 1" stroke="#137FEC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 1H22V6" stroke="#137FEC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Growth This Month', value: '+12.5%' },
    { iconBg: '#FEE2E2', iconColor: '#DC2626', icon: <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><circle cx="11.5" cy="11.5" r="10.5" stroke="#DC2626" strokeWidth="1.6"/><line x1="11.5" y1="7" x2="11.5" y2="13" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round"/><circle cx="11.5" cy="16" r="1.2" fill="#DC2626"/></svg>, label: 'Reported Users', value: '3' },
  ];

  const pageNums = [1, 2, 3, '...', 31];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .um-nav-link {
          display: flex; flex-direction: row; align-items: center;
          gap: 12px; padding: 8px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s; height: 37px;
        }
        .um-nav-link:hover { background: #F1F5F9; }
        .um-nav-link.active { background: rgba(19,127,236,0.1); color: #137FEC; }

        .um-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
        }
        .um-search-input::placeholder { color: #64748B; }

        .um-filter-btn {
          box-sizing: border-box;
          display: flex; flex-direction: row; align-items: center; justify-content: center;
          padding: 0 12px 0 16px; gap: 8px; height: 36px;
          background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
          color: #0F172A; cursor: pointer; white-space: nowrap; transition: background 0.12s;
        }
        .um-filter-btn:hover { background: #F8FAFC; }

        .um-action-btn {
          display: flex; justify-content: center; align-items: center;
          width: 32px; height: 32px; border-radius: 8px; border: none;
          background: none; cursor: pointer; transition: background 0.1s;
        }
        .um-action-btn:hover { background: #F1F5F9; }

        .um-icon-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px;
          border: none; cursor: pointer; transition: background 0.12s;
        }
        .um-icon-btn:hover { background: #E2E8F0; }

        .um-page-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; border-radius: 8px; border: none;
          background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; cursor: pointer; transition: background 0.12s;
        }
        .um-page-btn:hover:not(.active) { background: #F1F5F9; }
        .um-page-btn.active { background: #137FEC; color: #FFFFFF; font-weight: 700; }
        .um-page-btn.disabled { opacity: 0.5; cursor: default; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        flexShrink: 0,
      }}>
        {/* Logo + Search */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: '#137FEC', borderRadius: 8 }}>
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                <rect x="1" y="4" width="18" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#FFFFFF" strokeWidth="1.5"/>
                <line x1="1" y1="10" x2="19" y2="10" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>
              AdminPanel
            </span>
          </div>
          {/* Search */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 256, height: 40, background: '#F1F5F9', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 31, height: 40, paddingLeft: 16, flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="#64748B" strokeWidth="1.4"/>
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <input className="um-search-input" type="text" placeholder="Search users..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '11px 12px 12px 8px' }} />
          </div>
        </div>

        {/* Right icons + avatar */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="um-icon-btn"><svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#475569" strokeWidth="1.4"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#475569" strokeWidth="1.4"/></svg></button>
            <button className="um-icon-btn"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="#475569" strokeWidth="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          <div style={{ boxSizing: 'border-box', width: 40, height: 40, borderRadius: '50%', background: '#D4A96A', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            👤
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ boxSizing: 'border-box', width: 175, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: 16, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '0 12px 8px', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>
              Main Menu
            </div>
            {navItems.map(item => (
              <button key={item.label} className={`um-nav-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
                <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, overflow: 'auto', padding: 40, display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 32 }}>
            <div>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.75px', color: '#0F172A', marginBottom: 4 }}>
                User Management
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#64748B' }}>
                Manage and monitor job seeker profiles and verification status
              </p>
            </div>
            <button style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              padding: '0 24px', gap: 8, height: 44,
              background: '#137FEC', borderRadius: 8, border: 'none',
              fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF',
              cursor: 'pointer', transition: 'background 0.15s',
              boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)',
            }}>
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                <circle cx="7" cy="5" r="4" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M1 12C1 9.239 3.686 7 7 7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="14" y1="8" x2="14" y2="13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="11.5" y1="10.5" x2="16.5" y2="10.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add New User
            </button>
          </div>

          {/* Table Card */}
          <div style={{ boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden' }}>
            {/* Toolbar */}
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, background: 'rgba(248,250,252,0.5)', borderBottom: '1px solid #E2E8F0' }}>
              <button className="um-filter-btn">
                Status: All Users
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M1 1L4.5 4.5L8 1" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="um-filter-btn">
                Verification Level
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M1 1L4.5 4.5L8 1" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="um-filter-btn">
                Reg. Date Range
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"><rect x="0.5" y="1.5" width="13" height="13" rx="1.5" stroke="#0F172A" strokeWidth="1.2"/><line x1="0.5" y1="6" x2="13.5" y2="6" stroke="#0F172A" strokeWidth="1.2"/><line x1="4" y1="0.5" x2="4" y2="2.5" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round"/><line x1="10" y1="0.5" x2="10" y2="2.5" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
              {/* Right: count + columns */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#64748B' }}>124 users total</span>
                <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, width: 26, height: 20, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><line x1="0" y1="1" x2="18" y2="1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/><line x1="0" y1="6" x2="14" y2="6" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/><line x1="0" y1="11" x2="10" y2="11" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Table head */}
              <div style={{ display: 'grid', gridTemplateColumns: '168px 206px 133px 144px 168px 204px', background: '#F8FAFC' }}>
                {[
                  { label: 'JOB SEEKER\nNAME', align: 'left' },
                  { label: 'EMAIL ADDRESS', align: 'left' },
                  { label: 'STATUS', align: 'left' },
                  { label: 'REGISTRATION', align: 'left' },
                  { label: 'VERIFICATION\nSCORE', align: 'left' },
                  { label: 'ACTIONS', align: 'right' },
                ].map((col, i) => (
                  <div key={i} style={{ padding: '16px 24px', textAlign: col.align }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B', whiteSpace: 'pre-line', lineHeight: '16px' }}>
                      {col.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {users.map((user, i) => (
                <div key={user.id} style={{
                  display: 'grid', gridTemplateColumns: '168px 206px 133px 144px 168px 204px',
                  borderTop: '1px solid #F1F5F9', alignItems: 'center', height: 72,
                }}>
                  {/* Name */}
                  <div style={{ padding: '0 0 0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(19,127,236,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#137FEC' }}>{user.initials}</span>
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>{user.name}</span>
                  </div>
                  {/* Email */}
                  <div style={{ padding: '0 24px' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>{user.email}</span>
                  </div>
                  {/* Status */}
                  <div style={{ padding: '0 0 0 0' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', background: user.statusBg, borderRadius: '9999px', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: user.statusColor }}>
                      {user.status}
                    </span>
                  </div>
                  {/* Registration */}
                  <div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>{user.registration}</span>
                  </div>
                  {/* Verification Score */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px 0 0', minWidth: 0 }}>
                    <div style={{ flex: 1, height: 8, background: '#F1F5F9', borderRadius: '9999px', minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ width: `${user.score}%`, height: '100%', background: '#137FEC', borderRadius: '9999px', transition: 'width 0.4s ease' }} />
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#334155', flexShrink: 0 }}>{user.score}%</span>
                  </div>
                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, paddingRight: 16 }}>
                    <button className="um-action-btn">
                      <svg width="18" height="13" viewBox="0 0 18 13" fill="none"><path d="M1 6.5C1 6.5 3.5 1 9 1C14.5 1 17 6.5 17 6.5C17 6.5 14.5 12 9 12C3.5 12 1 6.5 1 6.5Z" stroke="#94A3B8" strokeWidth="1.3"/><circle cx="9" cy="6.5" r="2.5" stroke="#94A3B8" strokeWidth="1.3"/></svg>
                    </button>
                    <button className="um-action-btn">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M10.5 1.5L13.5 4.5L5 13H2V10L10.5 1.5Z" stroke="#94A3B8" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="um-action-btn">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="8" stroke="#94A3B8" strokeWidth="1.3"/><line x1="5.5" y1="8.5" x2="11.5" y2="8.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    </button>
                    <button className="um-action-btn">
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none"><path d="M1 4H12M5 4V2H8V4M2 4L3 13H10L11 4" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTop: '1px solid #E2E8F0' }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>
                Showing 1 to 4 of 124 entries
              </span>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {/* Prev */}
                <button className="um-page-btn disabled" style={{ boxSizing: 'border-box', width: 24, height: 28, border: '1px solid #E2E8F0', opacity: 0.5 }}>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M5 1L1 5L5 9" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {pageNums.map((p, i) => (
                  p === '...' ? (
                    <span key={i} style={{ fontFamily: "'Inter',sans-serif", color: '#94A3B8', fontSize: 16, width: 30, textAlign: 'center' }}>…</span>
                  ) : (
                    <button key={i} className={`um-page-btn${currentPage === p ? ' active' : ''}`} style={{ color: currentPage === p ? '#FFFFFF' : '#475569' }} onClick={() => setCurrentPage(p)}>
                      {p}
                    </button>
                  )
                ))}
                {/* Next */}
                <button className="um-page-btn" style={{ boxSizing: 'border-box', width: 24, height: 28, border: '1px solid #E2E8F0' }}>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1L5 5L1 9" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 32, position: 'relative', height: 102 }}>
            {summaryCards.map((card, i) => (
              <div key={i} style={{
                boxSizing: 'border-box', position: 'absolute',
                left: `${i * 33.33}%`, right: `${(2 - i) * 33.33}%`, top: 0, height: 102,
                padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12,
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16,
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B', marginBottom: 4 }}>{card.label}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 24, lineHeight: '32px', color: '#0F172A' }}>{card.value}</p>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};

export default UserManagement;