<<<<<<< HEAD
import { Link } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f3f5f7;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #2563eb;
  --accent-2: #10b981;
  --accent-3: #f97316;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.ep-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.ep-hero {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  background: linear-gradient(135deg, #e0f2fe 0%, #ecfeff 45%, #fef3c7 100%);
  border-radius: 28px;
  padding: 28px 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.ep-hero h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.ep-hero p { color: var(--muted); margin: 6px 0 0; }
.ep-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  background: #fff;
  color: var(--ink);
  border: 1px solid var(--border);
}
.ep-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
}
.ep-card {
  background: var(--card);
  border-radius: 20px;
  padding: 22px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.ep-card h3 { margin: 0 0 12px 0; font-size: 18px; }
.ep-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); }
.ep-row:last-child { border-bottom: none; }
.ep-label { color: var(--muted); font-size: 13px; }
.ep-value { font-weight: 700; }
.ep-about { color: var(--muted); line-height: 1.6; font-size: 14px; }
.ep-actions { display: grid; gap: 10px; }
.ep-actions button {
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  background: var(--accent);
  color: #fff;
}
.ep-actions button.secondary { background: #fff; color: var(--ink); border: 1px solid var(--border); }
@media (max-width: 900px) {
  .ep-shell { padding: 24px; }
  .ep-grid { grid-template-columns: 1fr; }
}
`;

export default function EmployerProfile() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ep-shell">
        <section className="ep-hero">
          <div>
            <h2>Company profile</h2>
            <p>Showcase your brand and hiring culture.</p>
          </div>
          <Link className="ep-btn" to="/company-dashboard">Back to dashboard</Link>
        </section>

        <div className="ep-grid">
          <div className="ep-card">
            <h3>Company details</h3>
            <div className="ep-row">
              <span className="ep-label">Company name</span>
              <span className="ep-value">Nimbus Labs</span>
            </div>
            <div className="ep-row">
              <span className="ep-label">Industry</span>
              <span className="ep-value">Technology</span>
            </div>
            <div className="ep-row">
              <span className="ep-label">Location</span>
              <span className="ep-value">Bengaluru, India</span>
            </div>
            <div className="ep-row">
              <span className="ep-label">Team size</span>
              <span className="ep-value">150 employees</span>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h3>About</h3>
              <p className="ep-about">
                Nimbus Labs builds productivity tools for fast-moving teams. We care about craftsmanship, clarity,
                and thoughtful hiring. Share your story to attract candidates who align with your culture.
              </p>
            </div>
          </div>

          <div className="ep-card">
            <h3>Profile actions</h3>
            <div className="ep-actions">
              <button type="button">Edit company profile</button>
              <button className="secondary" type="button">Upload brand assets</button>
              <button className="secondary" type="button">Preview public page</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerPostJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    jobTitle: '',
    department: '',
    employmentType: 'Full-time',
    workLocation: 'Remote',
    officeAddress: '',
    minSalary: '80,000',
    maxSalary: '120,000',
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePostJob = () => {
    console.log('Posting job:', form);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', form);
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: '#F6F7F8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .epj-nav-link {
          font-family: 'Inter', sans-serif;
          font-weight: 500; font-size: 14px; line-height: 20px;
          color: #475569; background: none; border: none;
          cursor: pointer; padding: 0; transition: color 0.15s;
        }
        .epj-nav-link:hover { color: #137FEC; }

        .epj-label {
          font-family: 'Inter', sans-serif;
          font-weight: 600; font-size: 14px; line-height: 20px; color: #334155;
        }

        .epj-input {
          width: 100%; height: 48px; padding: 13px 16px;
          background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .epj-input::placeholder { color: #6B7280; }
        .epj-input:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .epj-select {
          width: 100%; height: 48px; padding: 12px 40px 12px 16px;
          background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; appearance: none; cursor: pointer; transition: border-color 0.15s;
        }
        .epj-select:focus { border-color: #137FEC; }

        .epj-toggle {
          flex: 1; height: 48px; display: flex; justify-content: center; align-items: center;
          border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400;
          cursor: pointer; transition: all 0.15s; border: 1px solid #CBD5E1;
          background: transparent; color: #475569;
        }
        .epj-toggle.active {
          background: rgba(19,127,236,0.1); border-color: #137FEC; color: #137FEC;
        }
        .epj-toggle:hover:not(.active) { border-color: #94A3B8; background: #F8FAFC; }

        .epj-location-input {
          width: 100%; height: 48px; padding: 13px 16px 13px 40px;
          background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .epj-location-input::placeholder { color: #6B7280; }
        .epj-location-input:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .epj-salary-input {
          width: 100%; height: 48px; padding: 13px 16px 13px 33px;
          background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .epj-salary-input::placeholder { color: #6B7280; }
        .epj-salary-input:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .btn-save-draft {
          display: flex; justify-content: center; align-items: center;
          padding: 0px 24px; height: 48px; border-radius: 8px;
          background: transparent; border: none;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px;
          color: #475569; cursor: pointer; transition: color 0.15s;
        }
        .btn-save-draft:hover { color: #0F172A; }

        .btn-post-job {
          display: flex; flex-direction: row; align-items: center; gap: 8px;
          padding: 0px 32px; height: 48px; background: #137FEC; border-radius: 8px;
          border: none; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 16px;
          color: #FFFFFF; cursor: pointer;
          box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2);
          transition: background 0.2s, transform 0.1s;
        }
        .btn-post-job:hover { background: #0e6fd4; transform: translateY(-1px); }
        .btn-post-job:active { transform: translateY(0); }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px', height: 65,
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(19,127,236,0.1)',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo group */}
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
          <span style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18,
            lineHeight: '22px', letterSpacing: '-0.27px', color: '#0F172A',
          }}>RecruitPro</span>
        </div>

        {/* Nav links + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <button className="epj-nav-link" onClick={() => navigate('/employer/dashboard')}>Dashboard</button>
            <button className="epj-nav-link" onClick={() => navigate('/employer/post-job')}>Jobs</button>
            <button className="epj-nav-link" onClick={() => navigate('/employer/candidates')}>Candidates</button>
          </div>
          <div style={{
            width: 40, height: 40,
            background: 'rgba(19,127,236,0.2)', borderRadius: '9999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 600, fontSize: 16, color: '#137FEC', cursor: 'pointer',
          }}>E</div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{
        flex: 1,
        display: 'flex', flexDirection: 'row',
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '40px 0px',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start',
          width: 800, maxWidth: 800,
        }}>

          {/* ── PAGE TITLE ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', gap: 8,
            width: 800, paddingBottom: 32,
            borderBottom: '1px solid #E2E8F0',
            marginBottom: 32,
          }}>
            <h1 style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 700,
              fontSize: 30, lineHeight: '36px', letterSpacing: '-0.75px', color: '#0F172A',
            }}>Post a New Job</h1>
            <p style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 400,
              fontSize: 16, lineHeight: '24px', color: '#64748B',
            }}>Fill in the details below to find your next great hire.</p>
          </div>

          {/* ── FORM ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', gap: 32,
            width: 800, paddingBottom: 16,
          }}>

            {/* ── SECTION: Basic Information ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, width: 800 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, width: 800, height: 28 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" stroke="#137FEC" strokeWidth="1.8"/>
                  <line x1="9" y1="8" x2="9" y2="13" stroke="#137FEC" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="9" cy="5.5" r="1" fill="#137FEC"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>
                  Basic Information
                </span>
              </div>

              {/* Job Title + Department */}
              <div style={{ position: 'relative', width: 800, height: 76 }}>
                <div style={{ position: 'absolute', left: 0, right: 412, top: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="epj-label">Job Title</label>
                  <input
                    className="epj-input"
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    value={form.jobTitle}
                    onChange={e => handleChange('jobTitle', e.target.value)}
                  />
                </div>
                <div style={{ position: 'absolute', left: 412, right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="epj-label">Department</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      className="epj-select"
                      value={form.department}
                      onChange={e => handleChange('department', e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {['Engineering','Product','Design','Marketing','Sales','Finance','Human Resources','Operations','Legal','Customer Support','Data & Analytics'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── SECTION: Details & Logistics ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, width: 800 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, width: 800, height: 28 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="3" stroke="#137FEC" strokeWidth="1.8"/>
                  <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.05 3.05l1.41 1.41M13.54 13.54l1.41 1.41M3.05 14.95l1.41-1.41M13.54 4.46l1.41-1.41" stroke="#137FEC" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>
                  Details &amp; Logistics
                </span>
              </div>

              {/* Employment Type + Work Location */}
              <div style={{ position: 'relative', width: 800, height: 76 }}>
                <div style={{ position: 'absolute', left: 0, right: 412, top: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="epj-label">Employment Type</label>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 16, height: 48 }}>
                    {['Full-time', 'Contract'].map(type => (
                      <button
                        key={type}
                        className={`epj-toggle${form.employmentType === type ? ' active' : ''}`}
                        onClick={() => handleChange('employmentType', type)}
                      >{type}</button>
                    ))}
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 412, right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="epj-label">Work Location</label>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 16, height: 48 }}>
                    {['Remote', 'On-site'].map(loc => (
                      <button
                        key={loc}
                        className={`epj-toggle${form.workLocation === loc ? ' active' : ''}`}
                        onClick={() => handleChange('workLocation', loc)}
                      >{loc}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Office Address — full width */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 800 }}>
                <label className="epj-label">Office Address / Headquarters</label>
                <div style={{ position: 'relative', width: 800, isolation: 'isolate' }}>
                  <div style={{
                    position: 'absolute', left: 12, top: '50%',
                    transform: 'translateY(-50%)', zIndex: 1, pointerEvents: 'none',
                  }}>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                      <path d="M8 0C4.13 0 1 3.13 1 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C6.62 9.5 5.5 8.38 5.5 7S6.62 4.5 8 4.5 10.5 5.62 10.5 7 9.38 9.5 8 9.5z" fill="#94A3B8"/>
                    </svg>
                  </div>
                  <input
                    className="epj-location-input"
                    type="text"
                    placeholder="San Francisco, CA"
                    value={form.officeAddress}
                    onChange={e => handleChange('officeAddress', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* ── SECTION: Salary Range ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, width: 800 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, width: 800, height: 28 }}>
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                  <rect x="1" y="1" width="18" height="12" rx="2" stroke="#137FEC" strokeWidth="1.8"/>
                  <line x1="1" y1="5" x2="19" y2="5" stroke="#137FEC" strokeWidth="1.8"/>
                  <rect x="3" y="8" width="4" height="2" rx="0.5" fill="#137FEC"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>
                  Salary Range
                </span>
              </div>

              {/* Min + Max */}
              <div style={{ position: 'relative', width: 800, height: 76 }}>
                <div style={{ position: 'absolute', left: 0, right: 412, top: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="epj-label">Minimum Salary (Annual)</label>
                  <div style={{ position: 'relative', isolation: 'isolate' }}>
                    <span style={{
                      position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, color: '#64748B',
                      pointerEvents: 'none', zIndex: 1,
                    }}>$</span>
                    <input
                      className="epj-salary-input"
                      type="text"
                      placeholder="80,000"
                      value={form.minSalary}
                      onChange={e => handleChange('minSalary', e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 412, right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="epj-label">Maximum Salary (Annual)</label>
                  <div style={{ position: 'relative', isolation: 'isolate' }}>
                    <span style={{
                      position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, color: '#64748B',
                      pointerEvents: 'none', zIndex: 1,
                    }}>$</span>
                    <input
                      className="epj-salary-input"
                      type="text"
                      placeholder="120,000"
                      value={form.maxSalary}
                      onChange={e => handleChange('maxSalary', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── FORM ACTIONS ── */}
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row',
              justifyContent: 'flex-end', alignItems: 'center',
              padding: '32px 0px 0px', gap: 16,
              width: 800, borderTop: '1px solid #E2E8F0',
            }}>
              <button className="btn-save-draft" onClick={handleSaveDraft}>Save Draft</button>
              <button className="btn-post-job" onClick={handlePostJob}>
                Post Job
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5h10M7 1l4 4-4 4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── HELP CARD ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '48px 0px 0px', width: 800 }}>
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row',
              alignItems: 'flex-start', padding: 24, gap: 16,
              width: 800,
              background: 'rgba(19,127,236,0.05)',
              border: '1px solid rgba(19,127,236,0.1)',
              borderRadius: 12,
            }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none">
                  <circle cx="11.5" cy="11" r="9" stroke="#137FEC" strokeWidth="1.8"/>
                  <path d="M8.5 9c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.5-1.5 2-2.5 2.5V13" stroke="#137FEC" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="11.5" cy="16" r="1" fill="#137FEC"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2.88, flex: 1 }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>
                  Recruitment Tip
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '23px', color: '#475569' }}>
                  Adding a clear salary range increases your application rate by up to 30%. Candidates value transparency and it helps match you with the right budget early on.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '40px 0px',
        borderTop: '1px solid #E2E8F0', width: '100%',
      }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B', textAlign: 'center' }}>
          © 2023 RecruitPro Hiring Suite. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default EmployerPostJob;
>>>>>>> upstream/jobportelteam
