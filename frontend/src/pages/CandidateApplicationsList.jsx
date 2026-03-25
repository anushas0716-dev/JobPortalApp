import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateApplicationsList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Applicants');
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { label: 'All Applicants', count: 124 },
    { label: 'Applied', count: 42 },
    { label: 'In Review', count: 18 },
    { label: 'Interviewing', count: 12 },
    { label: 'Hired', count: 2 },
  ];

  const candidates = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      location: 'San Francisco, CA',
      matchScore: 95,
      matchColor: '#10B981',
      matchBarColor: '#10B981',
      matchBarWidth: '95%',
      status: 'Applied',
      statusBg: 'rgba(19,127,236,0.1)',
      statusColor: '#137FEC',
      appliedDate: '2 hours ago',
      avatar: '👩',
      avatarBg: '#F3D5C0',
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'New York, NY',
      matchScore: 88,
      matchColor: '#10B981',
      matchBarColor: '#10B981',
      matchBarWidth: '88%',
      status: 'In Review',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      appliedDate: '1 day ago',
      avatar: '👨',
      avatarBg: '#C9D8E8',
    },
    {
      id: 3,
      name: 'Robert Davis',
      location: 'Austin, TX',
      matchScore: 72,
      matchColor: '#137FEC',
      matchBarColor: '#137FEC',
      matchBarWidth: '72%',
      status: 'Interviewing',
      statusBg: '#E0E7FF',
      statusColor: '#4F46E5',
      appliedDate: '3 days ago',
      avatar: '👨‍🦱',
      avatarBg: '#D5C9B8',
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      location: 'Miami, FL',
      matchScore: 65,
      matchColor: '#475569',
      matchBarColor: 'rgba(19,127,236,0.6)',
      matchBarWidth: '65%',
      status: 'Applied',
      statusBg: 'rgba(19,127,236,0.1)',
      statusColor: '#137FEC',
      appliedDate: '5 days ago',
      avatar: '👩‍🦱',
      avatarBg: '#F0C8B0',
    },
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

        .cal-nav-link {
          font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
          color: #475569; background: none; border: none; cursor: pointer;
          padding: 0; transition: color 0.15s;
        }
        .cal-nav-link:hover { color: #137FEC; }
        .cal-nav-link.active {
          font-weight: 600; color: #137FEC;
          border-bottom: 2px solid #137FEC; padding-bottom: 4px;
        }

        .cal-tab {
          display: flex; flex-direction: row; align-items: center;
          padding: 16px 24px; gap: 8px; height: 58px;
          background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600; color: #64748B;
          transition: color 0.15s; white-space: nowrap;
        }
        .cal-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .cal-tab:hover:not(.active) { color: #334155; }

        .cal-tab-badge {
          display: flex; align-items: center; justify-content: center;
          padding: 2px 8px; border-radius: 9999px;
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700;
          line-height: 20px;
        }
        .cal-tab-badge.active { background: rgba(19,127,236,0.1); color: #137FEC; }
        .cal-tab-badge.inactive { background: #F1F5F9; color: #64748B; font-weight: 600; }

        .cal-table-row {
          display: flex; flex-direction: row; justify-content: center;
          align-items: center; padding: 0px; gap: 48px;
          width: 100%; border-top: 1px solid #F1F5F9;
          transition: background 0.12s; cursor: pointer;
        }
        .cal-table-row:first-child { border-top: none; }
        .cal-table-row:hover { background: #FAFBFC; }

        .cal-page-btn {
          display: flex; justify-content: center; align-items: center;
          width: 32px; height: 32px; border-radius: 8px;
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 12px;
          font-weight: 700; color: #475569; transition: background 0.15s;
        }
        .cal-page-btn:hover:not(.active) { background: #F1F5F9; }
        .cal-page-btn.active { background: #137FEC; color: #FFFFFF; }

        .cal-search-input {
          flex: 1; height: 40px; background: #F1F5F9;
          border: none; outline: none; padding: 11px 12px 12px;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          border-radius: 0px 8px 8px 0px;
        }
        .cal-search-input::placeholder { color: #64748B; }

        .btn-filters {
          display: flex; flex-direction: row; align-items: center;
          padding: 8px 16px; gap: 8px; height: 38px;
          background: #FFFFFF; border: 1px solid #E2E8F0;
          border-radius: 8px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 14px; color: #334155; transition: background 0.15s;
        }
        .btn-filters:hover { background: #F8FAFC; }

        .btn-share-job {
          display: flex; flex-direction: row; align-items: center;
          padding: 9px 16px; gap: 8px; height: 38px;
          background: #137FEC; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 14px; color: #FFFFFF; cursor: pointer;
          transition: background 0.2s;
        }
        .btn-share-job:hover { background: #0e6fd4; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px', width: '100%', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo + Nav */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              width: 32, height: 32,
              background: 'rgba(19,127,236,0.1)', borderRadius: 8,
            }}>
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
                <rect x="1" y="5" width="16" height="13" rx="2" stroke="#137FEC" strokeWidth="1.6"/>
                <path d="M6 5V4C6 2.895 6.895 2 8 2H10C11.105 2 12 2.895 12 4V5" stroke="#137FEC" strokeWidth="1.6"/>
                <line x1="1" y1="10" x2="17" y2="10" stroke="#137FEC" strokeWidth="1.6"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>
              HireFlow
            </span>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            <button className="cal-nav-link">Dashboard</button>
            <button className="cal-nav-link active">Jobs</button>
            <button className="cal-nav-link">Candidates</button>
            <button className="cal-nav-link">Reports</button>
          </nav>
        </div>

        {/* Search + Bell + Avatar */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {/* Search bar */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 256, height: 40, background: '#F1F5F9', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 27, height: 40, paddingLeft: 12 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="#64748B" strokeWidth="1.4"/>
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              className="cal-search-input"
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Bell */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '9999px' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 0C8 0 3 3 3 10v4l-2 2v1h14v-1l-2-2v-4C13 3 8 0 8 0Z" stroke="#475569" strokeWidth="1.4"/>
              <path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#475569" strokeWidth="1.4"/>
            </svg>
          </button>
          {/* Avatar */}
          <div style={{
            width: 36, height: 36,
            background: '#C9D8E8',
            border: '1px solid #E2E8F0',
            borderRadius: '9999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: 'pointer', overflow: 'hidden',
          }}>👨‍💼</div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{
        flex: 1,
        display: 'flex', flexDirection: 'row',
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '32px 80px',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', gap: 24,
          width: 1120, maxWidth: 1200,
        }}>

          {/* ── PAGE HEADER ── */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'flex-end',
            width: 1120, minHeight: 89,
          }}>
            {/* Left: breadcrumb + title + subtitle */}
            <div style={{ position: 'relative', width: 344 }}>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#137FEC', padding: 0 }}>
                  Active Jobs
                </button>
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
                  <path d="M1 1L4 4L1 7" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#137FEC', padding: 0 }}>
                  Senior Product Designer
                </button>
              </div>
              {/* Title */}
              <h1 style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 800,
                fontSize: 30, lineHeight: '38px', letterSpacing: '-0.75px',
                color: '#0F172A', marginBottom: 2,
              }}>Senior Product Designer</h1>
              {/* Subtitle */}
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#64748B' }}>
                Listing 124 candidates applied for this role
              </p>
            </div>

            {/* Right: Filters + Share Job */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
              <button className="btn-filters">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                  <line x1="0" y1="1" x2="14" y2="1" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/>
                  <line x1="2" y1="5" x2="12" y2="5" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/>
                  <line x1="4" y1="8" x2="10" y2="8" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Filters
              </button>
              <button className="btn-share-job">
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                  <circle cx="11" cy="3" r="2" stroke="#FFFFFF" strokeWidth="1.3"/>
                  <circle cx="3" cy="7.5" r="2" stroke="#FFFFFF" strokeWidth="1.3"/>
                  <circle cx="11" cy="12" r="2" stroke="#FFFFFF" strokeWidth="1.3"/>
                  <line x1="4.8" y1="6.5" x2="9.2" y2="4" stroke="#FFFFFF" strokeWidth="1.3"/>
                  <line x1="4.8" y1="8.5" x2="9.2" y2="11" stroke="#FFFFFF" strokeWidth="1.3"/>
                </svg>
                Share Job
              </button>
            </div>
          </div>

          {/* ── STATUS TABS ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
            width: 1120, height: 59,
            borderBottom: '1px solid #E2E8F0',
          }}>
            {tabs.map(tab => (
              <button
                key={tab.label}
                className={`cal-tab${activeTab === tab.label ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label}
                <span className={`cal-tab-badge${activeTab === tab.label ? ' active' : ' inactive'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* ── APPLICATIONS TABLE ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            width: 1120,
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12,
            overflow: 'hidden',
          }}>
            {/* Table Header */}
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center',
              alignItems: 'flex-start', width: '100%', height: 48,
              background: '#F8FAFC',
            }}>
              {[
                { label: 'CANDIDATE', flex: '0 0 279px' },
                { label: 'MATCH SCORE', flex: '0 0 214px' },
                { label: 'STATUS', flex: '0 0 170px' },
                { label: 'APPLIED DATE', flex: '0 0 172px' },
                { label: 'ACTIONS', flex: '1', align: 'right' },
              ].map((col, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: col.align === 'right' ? 'flex-end' : 'flex-start',
                  padding: '16px 24px', flex: col.flex,
                }}>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 700,
                    fontSize: 12, lineHeight: '16px',
                    letterSpacing: '0.6px', textTransform: 'uppercase',
                    color: '#475569',
                  }}>{col.label}</span>
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {candidates.map((c, idx) => (
                <div key={c.id} className="cal-table-row" style={{ height: idx === 0 ? 80 : 82 }}>

                  {/* Candidate */}
                  <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    gap: 12, flex: '0 0 279px', padding: '0 0 0 24px',
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: 40, height: 40, borderRadius: '9999px',
                      background: c.avatarBg,
                      border: '1px solid #E2E8F0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0, overflow: 'hidden',
                    }}>{c.avatar}</div>
                    {/* Name + location */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>
                        {c.name}
                      </span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                        {c.location}
                      </span>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    gap: 12, flex: '0 0 214px',
                  }}>
                    {/* Progress bar */}
                    <div style={{ position: 'relative', width: 96, height: 6, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: c.matchBarWidth,
                        background: c.matchBarColor,
                        borderRadius: '9999px',
                      }} />
                    </div>
                    {/* Score */}
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '20px', color: c.matchColor }}>
                      {c.matchScore}
                    </span>
                  </div>

                  {/* Status */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '0 0 170px', padding: '28px 24px' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', padding: '4px 10px',
                      background: c.statusBg, borderRadius: '9999px',
                    }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, lineHeight: '16px', color: c.statusColor }}>
                        {c.status}
                      </span>
                    </div>
                  </div>

                  {/* Applied Date */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '0 0 172px', padding: '28px 48px 28px 0px' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                      {c.appliedDate}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'flex-end', alignItems: 'center',
                    gap: 8, flex: 1, padding: '0 24px 0 0',
                  }}>
                    <button style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      padding: '7.5px 12px 8.5px', height: 32,
                      background: '#ECFDF5', borderRadius: 8, border: 'none',
                      fontFamily: "'Inter',sans-serif", fontWeight: 700,
                      fontSize: 12, color: '#059669', cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.target.style.background = '#D1FAE5'}
                      onMouseLeave={e => e.target.style.background = '#ECFDF5'}
                    >Approve</button>
                    <button style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      padding: '7.5px 12px 8.5px', height: 32,
                      background: '#FFF1F2', borderRadius: 8, border: 'none',
                      fontFamily: "'Inter',sans-serif", fontWeight: 700,
                      fontSize: 12, color: '#E11D48', cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.target.style.background = '#FFE4E6'}
                      onMouseLeave={e => e.target.style.background = '#FFF1F2'}
                    >Reject</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
                      <svg width="4" height="14" viewBox="0 0 4 14" fill="none">
                        <circle cx="2" cy="2" r="1.5" fill="#94A3B8"/>
                        <circle cx="2" cy="7" r="1.5" fill="#94A3B8"/>
                        <circle cx="2" cy="12" r="1.5" fill="#94A3B8"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── PAGINATION ── */}
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row',
              justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 24px', width: '100%', height: 65,
              background: 'rgba(248,250,252,0.5)',
              borderTop: '1px solid #F1F5F9',
            }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                Showing 1-4 of 124 candidates
              </span>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {/* Prev */}
                <button className="cal-page-btn" style={{ opacity: 0.5 }}>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M5 1L1 5L5 9" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    className={`cal-page-btn${activePage === p ? ' active' : ''}`}
                    onClick={() => setActivePage(p)}
                  >{p}</button>
                ))}
                {/* Ellipsis */}
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: '#94A3B8', padding: '0 4px' }}>…</span>
                <button className="cal-page-btn" onClick={() => setActivePage(31)}>31</button>
                {/* Next */}
                <button className="cal-page-btn">
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 1L5 5L1 9" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CandidateApplicationsList;