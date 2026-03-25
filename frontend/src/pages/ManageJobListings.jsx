import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageJobListings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { label: 'All Jobs', count: 24 },
    { label: 'Active', count: 18 },
    { label: 'Paused', count: 3 },
    { label: 'Closed', count: 3 },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Engineer',
      meta: 'Full-time • Remote',
      status: 'Active',
      applications: 42,
      newToday: 5,
      department: 'Engineering',
      postedDate: 'Oct 12, 2023',
      closed: false,
    },
    {
      id: 2,
      title: 'Product Designer',
      meta: 'Full-time • New York, NY',
      status: 'Active',
      applications: 28,
      newToday: null,
      department: 'Design',
      postedDate: 'Oct 15, 2023',
      closed: false,
    },
    {
      id: 3,
      title: 'Marketing Manager',
      meta: 'Full-time • Hybrid',
      status: 'Paused',
      applications: 15,
      newToday: null,
      department: 'Marketing',
      postedDate: 'Sep 20, 2023',
      closed: false,
    },
    {
      id: 4,
      title: 'QA Engineer',
      meta: 'Contract • Remote',
      status: 'Closed',
      applications: 56,
      newToday: null,
      department: 'Quality Assurance',
      postedDate: 'Aug 05, 2023',
      closed: true,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { bg: '#DCFCE7', dot: '#22C55E', text: '#15803D' };
      case 'Paused':
        return { bg: '#FEF3C7', dot: '#F59E0B', text: '#B45309' };
      case 'Closed':
        return { bg: '#F1F5F9', dot: '#94A3B8', text: '#475569' };
      default:
        return { bg: '#F1F5F9', dot: '#94A3B8', text: '#475569' };
    }
  };

  const navLinks = ['Dashboard', 'Jobs', 'Candidates', 'Reports'];

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

        .mjl-nav-link {
          font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
          color: #475569; background: none; border: none; cursor: pointer; padding: 0;
          transition: color 0.15s;
        }
        .mjl-nav-link:hover { color: #137FEC; }
        .mjl-nav-link.active {
          color: #137FEC; font-weight: 700;
          border-bottom: 2px solid #137FEC;
          padding-bottom: 4px;
        }

        .mjl-tab {
          display: flex; flex-direction: row; align-items: center;
          padding: 16px 0px 12px; gap: 0px; height: 51px;
          background: none; border: none; cursor: pointer;
          border-bottom: 3px solid transparent;
          font-family: 'Inter', sans-serif; font-size: 14px;
          font-weight: 700; color: #64748B;
          transition: color 0.15s; white-space: nowrap;
        }
        .mjl-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .mjl-tab:hover:not(.active) { color: #334155; }

        .mjl-tab-badge {
          display: flex; align-items: center; justify-content: center;
          padding: 2px 8px; border-radius: 9999px;
          font-family: 'Inter', sans-serif; font-size: 10px;
          font-weight: 400; line-height: 15px; margin-left: 8px;
        }
        .mjl-tab-badge.active { background: rgba(19,127,236,0.1); color: #137FEC; }
        .mjl-tab-badge.inactive { background: #F1F5F9; color: #64748B; }

        .mjl-action-btn {
          display: flex; justify-content: center; align-items: center;
          width: 31px; height: 31px; border-radius: 8px;
          background: none; border: none; cursor: pointer;
          transition: background 0.15s;
        }
        .mjl-action-btn:hover { background: #F1F5F9; }

        .mjl-page-btn {
          display: flex; justify-content: center; align-items: center;
          width: 36px; height: 36px; border-radius: 8px;
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 14px;
          font-weight: 500; color: #475569; transition: background 0.15s;
        }
        .mjl-page-btn:hover:not(.active) { background: #F1F5F9; }
        .mjl-page-btn.active {
          background: #137FEC; color: #FFFFFF; font-weight: 700;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05);
        }
        .mjl-page-btn.border {
          border: 1px solid #E2E8F0;
        }

        .mjl-search-input {
          width: 100%; height: 40px;
          background: #F1F5F9; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          border-radius: 0px 8px 8px 0px; padding: 0 8px;
        }
        .mjl-search-input::placeholder { color: #94A3B8; }

        .mjl-post-btn {
          display: flex; flex-direction: row; align-items: center;
          padding: 0px 24px; gap: 8px; height: 44px;
          background: #137FEC; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 14px; color: #FFFFFF; cursor: pointer;
          box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2);
          transition: background 0.2s, transform 0.1s;
        }
        .mjl-post-btn:hover { background: #0e6fd4; transform: translateY(-1px); }

        .mjl-table-row {
          display: flex; flex-direction: row; justify-content: center;
          align-items: center; padding: 0px; gap: 24px;
          width: 100%; border-top: 1px solid #F1F5F9;
          transition: background 0.12s;
        }
        .mjl-table-row:first-child { border-top: none; }
        .mjl-table-row:hover { background: #FAFBFC; }
      `}</style>

      {/* ── MAIN WRAPPER ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 160px' }}>
        <div style={{ width: 960, maxWidth: 1200, display: 'flex', flexDirection: 'column' }}>

          {/* ── HEADER / NAVIGATION ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px', width: 960, height: 65,
            background: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            borderRadius: '12px 12px 0px 0px',
          }}>
            {/* Logo + Nav */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
              {/* Logo */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <div style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  width: 32, height: 32,
                  background: 'rgba(19,127,236,0.1)', borderRadius: 8,
                }}>
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <rect x="1" y="5" width="18" height="13" rx="2" stroke="#137FEC" strokeWidth="1.8"/>
                    <path d="M7 5V4C7 2.895 7.895 2 9 2H11C12.105 2 13 2.895 13 4V5" stroke="#137FEC" strokeWidth="1.8"/>
                    <line x1="1" y1="10" x2="19" y2="10" stroke="#137FEC" strokeWidth="1.8"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.27px', color: '#0F172A' }}>
                  RecruitPro
                </span>
              </div>
              {/* Nav links */}
              <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 36 }}>
                {navLinks.map(link => (
                  <button
                    key={link}
                    className={`mjl-nav-link${link === 'Jobs' ? ' active' : ''}`}
                  >{link}</button>
                ))}
              </nav>
            </div>

            {/* Search + Notification + Avatar */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              {/* Search */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 256, height: 40, borderRadius: 8 }}>
                <div style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  width: 31, height: 40,
                  background: '#F1F5F9', borderRadius: '8px 0px 0px 8px', paddingLeft: 16,
                }}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#94A3B8" strokeWidth="1.4"/>
                    <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  className="mjl-search-input"
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Notification bell */}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 36, borderRadius: '9999px' }}>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path d="M8 0C8 0 3 3 3 10v4l-2 2v1h14v-1l-2-2v-4C13 3 8 0 8 0Z" stroke="#64748B" strokeWidth="1.4"/>
                  <path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#64748B" strokeWidth="1.4"/>
                </svg>
              </button>
              {/* Avatar */}
              <div style={{
                width: 40, height: 40,
                background: '#E2E8F0',
                border: '2px solid rgba(19,127,236,0.2)',
                borderRadius: '9999px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, overflow: 'hidden', cursor: 'pointer',
              }}>👤</div>
            </div>
          </div>

          {/* ── TITLE + POST BUTTON ── */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'flex-end',
            padding: '23px 24px 24px', width: 960,
            background: '#FFFFFF',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h1 style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 900,
                fontSize: 30, lineHeight: '38px', letterSpacing: '-0.99px', color: '#0F172A',
              }}>Job Listings</h1>
              <p style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 400,
                fontSize: 14, lineHeight: '20px', color: '#64748B',
              }}>Manage, track, and optimize your current job openings across all departments.</p>
            </div>
            <button className="mjl-post-btn" onClick={() => navigate('/employer/post-job')}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="6" y1="1" x2="6" y2="11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="1" y1="6" x2="11" y2="6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Post New Job
            </button>
          </div>

          {/* ── TABS FILTER ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            padding: '0px 24px', width: 960, height: 52,
            background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
          }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 32, height: 51 }}>
              {tabs.map(tab => (
                <button
                  key={tab.label}
                  className={`mjl-tab${activeTab === tab.label ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  {tab.label}
                  <span className={`mjl-tab-badge${activeTab === tab.label ? ' active' : ' inactive'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── TABLE SECTION ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '24px 0px', width: 960 }}>
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              width: 960, background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
              borderRadius: 12, overflow: 'hidden',
            }}>

              {/* ── TABLE HEADER ── */}
              <div style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center',
                alignItems: 'flex-start', width: '100%', height: 49,
                background: '#F8FAFC',
              }}>
                {[
                  { label: 'JOB TITLE', width: 227 },
                  { label: 'STATUS', width: 132 },
                  { label: 'APPLICATIONS', width: 149 },
                  { label: 'DEPARTMENT', width: 174 },
                  { label: 'POSTED DATE', width: 144 },
                  { label: 'ACTIONS', width: 132, align: 'right' },
                ].map((col, i) => (
                  <div key={i} style={{
                    boxSizing: 'border-box',
                    display: 'flex', flexDirection: 'column', alignItems: col.align === 'right' ? 'flex-end' : 'flex-start',
                    padding: '16px 24px', flex: col.width ? `0 0 ${col.width}px` : 1,
                    borderBottom: '1px solid #E2E8F0',
                  }}>
                    <span style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12,
                      lineHeight: '16px', letterSpacing: '0.6px', textTransform: 'uppercase',
                      color: '#0F172A',
                    }}>{col.label}</span>
                  </div>
                ))}
              </div>

              {/* ── TABLE BODY ── */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                {jobs.map((job, idx) => {
                  const statusStyle = getStatusStyle(job.status);
                  const isClosed = job.status === 'Closed';
                  return (
                    <div key={job.id} className="mjl-table-row" style={{ height: idx === 0 ? 77 : 78 }}>

                      {/* Job Title */}
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                        padding: '0px 0px 0px 24px', flex: '0 0 227px', gap: 4,
                        opacity: isClosed ? 0.6 : 1,
                      }}>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>
                          {job.title}
                        </span>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                          {job.meta}
                        </span>
                      </div>

                      {/* Status */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '26.5px 24px', flex: '0 0 132px' }}>
                        <div style={{
                          display: 'flex', flexDirection: 'row', alignItems: 'center',
                          padding: '4px 12px', gap: 6,
                          background: statusStyle.bg, borderRadius: '9999px',
                        }}>
                          <div style={{ width: 6, height: 6, background: statusStyle.dot, borderRadius: '9999px' }} />
                          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, lineHeight: '16px', color: statusStyle.text }}>
                            {job.status}
                          </span>
                        </div>
                      </div>

                      {/* Applications */}
                      <div style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                        gap: 8, flex: '0 0 149px',
                        opacity: isClosed ? 0.6 : 1,
                      }}>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>
                          {job.applications}
                        </span>
                        {job.newToday && (
                          <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2px 6px', background: 'rgba(19,127,236,0.1)', borderRadius: 4,
                          }}>
                            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 10, color: '#137FEC' }}>
                              +{job.newToday} today
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Department */}
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                        padding: '28px 24px 29px 0px', flex: '0 0 174px',
                        opacity: isClosed ? 0.6 : 1,
                      }}>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                          {job.department}
                        </span>
                      </div>

                      {/* Posted Date */}
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                        padding: '28px 24px 29px 0px', flex: '0 0 144px',
                        opacity: isClosed ? 0.6 : 1,
                      }}>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                          {job.postedDate}
                        </span>
                      </div>

                      {/* Actions */}
                      <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',
                        alignItems: 'center', gap: 8, flex: '0 0 132px',
                        paddingRight: 24,
                      }}>
                        {/* Edit button */}
                        <button className="mjl-action-btn" title="Edit">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M10.5 1.5L13.5 4.5L5 13H2V10L10.5 1.5Z" stroke="#137FEC" strokeWidth="1.4" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {/* More button */}
                        <button className="mjl-action-btn" title="More">
                          <svg width="4" height="14" viewBox="0 0 4 14" fill="none">
                            <circle cx="2" cy="2" r="1.5" fill="#94A3B8"/>
                            <circle cx="2" cy="7" r="1.5" fill="#94A3B8"/>
                            <circle cx="2" cy="12" r="1.5" fill="#94A3B8"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── PAGINATION ── */}
              <div style={{
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center',
                padding: 24, width: 960, height: 85,
                background: '#FFFFFF',
                borderTop: '1px solid #E2E8F0',
                borderRadius: '0px 0px 12px 12px',
              }}>
                {/* Showing text */}
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                  Showing <strong style={{ color: '#0F172A' }}>1</strong> to <strong style={{ color: '#0F172A' }}>10</strong> of <strong style={{ color: '#0F172A' }}>24</strong> results
                </p>

                {/* Page numbers */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  {/* Prev */}
                  <button className="mjl-page-btn border">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M5 1L1 5L5 9" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {/* Page 1 - active */}
                  {[1, 2, 3].map(p => (
                    <button
                      key={p}
                      className={`mjl-page-btn${activePage === p ? ' active' : ''}`}
                      onClick={() => setActivePage(p)}
                    >{p}</button>
                  ))}
                  {/* Ellipsis */}
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: '#94A3B8', padding: '0 4px' }}>…</span>
                  {/* Page 8 */}
                  <button className="mjl-page-btn" onClick={() => setActivePage(8)}>8</button>
                  {/* Next */}
                  <button className="mjl-page-btn border">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M1 1L5 5L1 9" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageJobListings;