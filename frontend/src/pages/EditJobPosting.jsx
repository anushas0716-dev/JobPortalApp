import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditJobPosting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Details');

  const [form, setForm] = useState({
    jobTitle: 'Senior Product Designer',
    employmentType: 'Full-time',
    department: 'Design & Creative',
    location: 'Remote (US Based)',
    description: `We are looking for a Senior Product Designer to join our core product team. You will be responsible for leading the design of our next generation of mobile applications and web interfaces.

Key Responsibilities:
- Conduct user research and translate insights into high-fidelity designs.
- Collaborate with engineering and product management to define requirements.
- Maintain and expand our internal design system.
- Mentor junior designers in the team.`,
    minSalary: '120000',
    maxSalary: '165000',
  });

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const activityLog = [
    {
      id: 1,
      iconBg: '#DBEAFE',
      iconColor: '#2563EB',
      icon: '✏️',
      title: 'Sarah Chen updated the salary range',
      time: 'Today at 2:45 PM',
    },
    {
      id: 2,
      iconBg: '#DCFCE7',
      iconColor: '#16A34A',
      icon: '✓',
      title: 'System published the listing',
      time: 'Oct 24, 2023 at 10:00 AM',
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

        .ejp-nav-link {
          font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
          color: #475569; background: none; border: none; cursor: pointer;
          padding: 0; transition: color 0.15s;
        }
        .ejp-nav-link:hover { color: #137FEC; }
        .ejp-nav-link.active {
          font-weight: 600; color: #0F172A;
          border-bottom: 2px solid #137FEC; padding-bottom: 4px;
        }

        .ejp-tab {
          display: flex; flex-direction: row; align-items: center;
          padding: 0px 0px 12px; gap: 8px; height: 35px;
          background: none; border: none; border-bottom: 3px solid transparent;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700; color: #64748B;
          transition: color 0.15s; white-space: nowrap;
        }
        .ejp-tab.active { color: #0F172A; border-bottom-color: #137FEC; }
        .ejp-tab:hover:not(.active) { color: #334155; }

        .ejp-input {
          width: 100%; height: 48px; padding: 13px 16px;
          background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ejp-input:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .ejp-select {
          width: 100%; height: 48px; padding: 12px 36px 12px 16px;
          background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; appearance: none; cursor: pointer;
          transition: border-color 0.15s;
        }
        .ejp-select:focus { border-color: #137FEC; }

        .ejp-textarea {
          width: 100%; min-height: 200px; padding: 14px 16px;
          background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 14px;
          line-height: 23px; color: #0F172A;
          outline: none; resize: vertical;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ejp-textarea:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .ejp-location-input {
          width: 100%; height: 48px; padding: 13px 12px 13px 40px;
          background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ejp-location-input:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .ejp-salary-input {
          width: 100%; height: 48px; padding: 13px 12px;
          background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ejp-salary-input:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .btn-cancel {
          display: flex; justify-content: center; align-items: center;
          padding: 9.5px 26px 10.5px; width: 100px; height: 40px;
          background: #E2E8F0; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 14px; color: #334155; cursor: pointer;
          transition: background 0.15s;
        }
        .btn-cancel:hover { background: #CBD5E1; }

        .btn-save {
          display: flex; justify-content: center; align-items: center;
          padding: 9.5px 16px 10.5px; width: 130px; height: 40px;
          background: #137FEC; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 14px; color: #FFFFFF; cursor: pointer;
          box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1);
          transition: background 0.2s, transform 0.1s;
        }
        .btn-save:hover { background: #0e6fd4; transform: translateY(-1px); }

        .ejp-label {
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 14px; line-height: '20px'; color: '#0F172A';
        }
      `}</style>

      {/* ── NAVIGATION HEADER ── */}
      <header style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo + Nav */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 26, height: 26, background: '#137FEC', borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                <rect x="1" y="4" width="14" height="10" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M5 4V3C5 2.448 5.448 2 6 2H10C10.552 2 11 2.448 11 3V4" stroke="#FFFFFF" strokeWidth="1.5"/>
                <line x1="1" y1="8" x2="15" y2="8" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.27px', color: '#0F172A' }}>
              Edit Job Posting
            </span>
          </div>
        </div>

        {/* Nav links + actions */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
          <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
            <button className="ejp-nav-link">Dashboard</button>
            <button className="ejp-nav-link active">Jobs</button>
            <button className="ejp-nav-link">Candidates</button>
          </nav>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <button className="btn-cancel" onClick={() => navigate('/employer/manage-jobs')}>Cancel</button>
            <button className="btn-save">Save Changes</button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{
        flex: 1,
        display: 'flex', flexDirection: 'row',
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '32px 0px',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', width: 800, maxWidth: 800,
        }}>

          {/* ── TABS ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'row',
            alignItems: 'flex-start', gap: 32,
            width: 800, height: 36,
            borderBottom: '1px solid #E2E8F0',
            marginBottom: 24,
          }}>
            {/* Details tab */}
            <button
              className={`ejp-tab${activeTab === 'Details' ? ' active' : ''}`}
              onClick={() => setActiveTab('Details')}
            >
              <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
                <line x1="0" y1="1" x2="15" y2="1" stroke={activeTab === 'Details' ? '#0F172A' : '#64748B'} strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="0" y1="6.5" x2="10" y2="6.5" stroke={activeTab === 'Details' ? '#0F172A' : '#64748B'} strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="0" y1="12" x2="12" y2="12" stroke={activeTab === 'Details' ? '#0F172A' : '#64748B'} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Details
            </button>

            {/* Activity & History tab */}
            <button
              className={`ejp-tab${activeTab === 'Activity' ? ' active' : ''}`}
              onClick={() => setActiveTab('Activity')}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#64748B" strokeWidth="1.4"/>
                <path d="M7.5 4V7.5L10 9" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Activity &amp; History
            </button>
          </div>

          {/* ── JOB STATUS BADGE ── */}
          <div style={{ paddingBottom: 16, width: 800 }}>
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row',
              alignItems: 'center', padding: '12px 16px', gap: 12,
              width: 800, height: 46,
              background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: 12,
            }}>
              {/* Pulsing green dot */}
              <div style={{ position: 'relative', width: 12, height: 12, flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: '#4ADE80', opacity: 0.75, borderRadius: '9999px',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: '#22C55E', borderRadius: '9999px',
                }} />
              </div>
              <span style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 500,
                fontSize: 14, lineHeight: '20px', color: '#15803D',
              }}>
                Listing is currently Live. Changes will be reflected immediately.
              </span>
            </div>
          </div>

          {/* ── FORM CARD ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', padding: 24, gap: 24,
            width: 800,
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12,
          }}>

            {/* Row 1: Job Title + Employment Type */}
            <div style={{ position: 'relative', width: 750, height: 76 }}>
              {/* Job Title */}
              <div style={{
                position: 'absolute', left: 0, right: 387, top: 0,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <label style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
                  Job Title
                </label>
                <input
                  className="ejp-input"
                  type="text"
                  value={form.jobTitle}
                  onChange={e => setForm(p => ({ ...p, jobTitle: e.target.value }))}
                />
              </div>

              {/* Employment Type */}
              <div style={{
                position: 'absolute', left: 387, right: 0, top: 0,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <label style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
                  Employment Type
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="ejp-select"
                    value={form.employmentType}
                    onChange={e => setForm(p => ({ ...p, employmentType: e.target.value }))}
                  >
                    {employmentTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Department + Location */}
            <div style={{ position: 'relative', width: 750, height: 76 }}>
              {/* Department */}
              <div style={{
                position: 'absolute', left: 0, right: 387, top: 0,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <label style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
                  Department
                </label>
                <input
                  className="ejp-input"
                  type="text"
                  value={form.department}
                  onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
                />
              </div>

              {/* Location */}
              <div style={{
                position: 'absolute', left: 387, right: 0, top: 0,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <label style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
                  Location
                </label>
                <div style={{ position: 'relative', isolation: 'isolate' }}>
                  <div style={{
                    position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 1, pointerEvents: 'none',
                  }}>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                      <path d="M8 0C4.13 0 1 3.13 1 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C6.62 9.5 5.5 8.38 5.5 7S6.62 4.5 8 4.5 10.5 5.62 10.5 7 9.38 9.5 8 9.5z" fill="#94A3B8"/>
                    </svg>
                  </div>
                  <input
                    className="ejp-location-input"
                    type="text"
                    value={form.location}
                    onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 750 }}>
              <label style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
                Job Description
              </label>
              <textarea
                className="ejp-textarea"
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={9}
              />
            </div>

            {/* Salary Range */}
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', gap: 16,
              width: 750, paddingTop: 16,
              borderTop: '1px solid #E2E8F0',
            }}>
              <h3 style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 700,
                fontSize: 16, lineHeight: '24px', color: '#0F172A',
              }}>Salary Range</h3>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 16, width: 750 }}>
                {/* Min */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <label style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#64748B' }}>
                    Minimum (USD)
                  </label>
                  <input
                    className="ejp-salary-input"
                    type="text"
                    value={form.minSalary}
                    onChange={e => setForm(p => ({ ...p, minSalary: e.target.value }))}
                  />
                </div>
                {/* Max */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <label style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#64748B' }}>
                    Maximum (USD)
                  </label>
                  <input
                    className="ejp-salary-input"
                    type="text"
                    value={form.maxSalary}
                    onChange={e => setForm(p => ({ ...p, maxSalary: e.target.value }))}
                  />
                </div>
                {/* / per year */}
                <div style={{
                  display: 'flex', alignItems: 'center', paddingBottom: 12, flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>
                    / per year
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── LIVE PREVIEW CARD ── */}
          <div style={{ paddingTop: 32, width: 800 }}>
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row',
              alignItems: 'center', padding: 24, gap: 16,
              width: 800, height: 94,
              background: 'rgba(19,127,236,0.1)',
              border: '1px solid rgba(19,127,236,0.2)',
              borderRadius: 12,
            }}>
              {/* Icon box */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 46, height: 39, background: '#137FEC', borderRadius: 8, flexShrink: 0,
              }}>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
                  <path d="M1 7.5C1 7.5 4.5 1 11 1C17.5 1 21 7.5 21 7.5C21 7.5 17.5 14 11 14C4.5 14 1 7.5 1 7.5Z" stroke="#FFFFFF" strokeWidth="1.6"/>
                  <circle cx="11" cy="7.5" r="3" stroke="#FFFFFF" strokeWidth="1.6"/>
                </svg>
              </div>
              {/* Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>
                  Live Preview
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#475569' }}>
                  See how this job post looks to candidates on your career site.
                </p>
              </div>
              {/* View Listing button */}
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter',sans-serif", fontWeight: 700,
                fontSize: 14, color: '#137FEC', flexShrink: 0,
              }}>
                View Listing
              </button>
            </div>
          </div>

          {/* ── RECENT ACTIVITY ── */}
          <div style={{ paddingTop: 48, width: 800 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 800 }}>
              <h3 style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 700,
                fontSize: 18, lineHeight: '28px', color: '#0F172A',
                padding: '0px 4px',
              }}>Recent Activity</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 800 }}>
                {activityLog.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', flexDirection: 'row',
                    alignItems: 'flex-start', padding: 16, gap: 16,
                    width: 800, borderRadius: 8,
                  }}>
                    {/* Icon circle */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 32, height: 32, borderRadius: '9999px',
                      background: item.iconBg, flexShrink: 0,
                    }}>
                      {item.id === 1 ? (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M7.5 1L10 3.5L3.5 10H1V7.5L7.5 1Z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1 4.5L3.5 7L8 1" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {/* Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>
                        {item.title}
                      </p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Full History */}
              <button style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                gap: 4, padding: '0px 16px 8px', background: 'none', border: 'none',
                cursor: 'pointer',
              }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#137FEC' }}>
                  View Full History
                </span>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1 4.5H8M5 1.5L8 4.5L5 7.5" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ── FOOTER META ── */}
      <footer style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', padding: '24px 240px',
        height: 65, background: '#FFFFFF', borderTop: '1px solid #E2E8F0',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          width: 800, maxWidth: 800,
        }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>
            Post ID: JOB-2948-SRDS
          </span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#64748B' }}>
              Help Center
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#64748B' }}>
              Guidelines
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EditJobPosting;