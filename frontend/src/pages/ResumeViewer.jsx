import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeViewer = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const [internalNote, setInternalNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const competencies = [
    { label: 'System Architecture', score: 'Advanced',     barWidth: '90%' },
    { label: 'Team Leadership',      score: 'Intermediate', barWidth: '75%' },
    { label: 'Cloud (AWS/GCP)',      score: 'Expert',       barWidth: '95%' },
  ];

  const resumeSkills = ['TypeScript', 'React / Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL'];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .rv-nav-link { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; color: #475569; background: none; border: none; cursor: pointer; padding: 0; transition: color 0.15s; }
        .rv-nav-link:hover { color: #137FEC; }
        .rv-toolbar-btn { display: flex; justify-content: center; align-items: center; padding: 4px; border-radius: 4px; background: none; border: none; cursor: pointer; transition: background 0.15s; }
        .rv-toolbar-btn:hover { background: #F1F5F9; }
        .rv-zoom-btn { display: flex; justify-content: center; align-items: center; width: 21.5px; height: 21.5px; background: rgba(255,255,255,0.002); box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 4px; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #0F172A; transition: background 0.15s; }
        .rv-zoom-btn:hover { background: #E2E8F0; }
        .rv-search-input { flex: 1; height: 36px; padding: 9px 16px 10px; background: transparent; border: none; outline: none; font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A; }
        .rv-search-input::placeholder { color: #6B7280; }
        .rv-note-textarea { width: 100%; height: 128px; padding: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; line-height: 20px; color: #0F172A; outline: none; resize: none; }
        .rv-note-textarea::placeholder { color: #6B7280; }
        .rv-note-textarea:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .rv-action-btn { box-sizing: border-box; display: flex; justify-content: center; align-items: center; gap: 8px; height: 52px; border-radius: 8px; border: 2px solid #E2E8F0; background: none; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 16px; color: #334155; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
        .rv-action-btn:hover { background: #F1F5F9; }
        .rv-shortlist-btn { display: flex; justify-content: center; align-items: center; gap: 8px; width: 100%; height: 60px; border-radius: 8px; background: #137FEC; border: none; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 18px; color: #FFFFFF; cursor: pointer; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s, transform 0.1s; }
        .rv-shortlist-btn:hover { background: #0e6fd4; transform: translateY(-1px); }
      `}</style>

      {/* HEADER */}
      <header style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', width: '100%', height: 61, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          {/* ✅ Logo → employer dashboard */}
          <div onClick={() => navigate('/employer/dashboard')} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 30, height: 30, background: '#137FEC', borderRadius: 8, padding: 6 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="5" width="16" height="12" rx="2" stroke="#FFFFFF" strokeWidth="1.6"/><path d="M5 5V4C5 2.895 5.895 2 7 2H11C12.105 2 13 2.895 13 4V5" stroke="#FFFFFF" strokeWidth="1.6"/><line x1="1" y1="9" x2="17" y2="9" stroke="#FFFFFF" strokeWidth="1.6"/></svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>TalentScan AI</span>
          </div>
          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 256, height: 36, background: '#F1F5F9', borderRadius: 8 }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5" cy="5" r="4" stroke="#94A3B8" strokeWidth="1.3"/><line x1="8" y1="8" x2="10.5" y2="10.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </div>
            <input className="rv-search-input" style={{ paddingLeft: 40 }} type="text" placeholder="Search candidates..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
          <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            {/* ✅ Nav buttons */}
            <button className="rv-nav-link" onClick={() => navigate('/employer/candidates/1')}>Candidates</button>
            <button className="rv-nav-link" onClick={() => navigate('/employer/manage-jobs')}>Jobs</button>
            <button className="rv-nav-link" onClick={() => navigate('/employer/analytics')}>Analytics</button>
          </nav>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, paddingLeft: 24, borderLeft: '1px solid #E2E8F0' }}>
            {/* ✅ Bell → notifications */}
            <button className="rv-toolbar-btn" onClick={() => navigate('/notifications')}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v4l-2 2v1h14v-1l-2-2v-4C13 3 8 0 8 0Z" stroke="#64748B" strokeWidth="1.4"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#64748B" strokeWidth="1.4"/></svg>
            </button>
            {/* ✅ Settings */}
            <button className="rv-toolbar-btn" onClick={() => navigate('/admin/settings')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="#64748B" strokeWidth="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
            {/* ✅ Avatar → employer profile */}
            <div onClick={() => navigate('/employer/profile')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)', borderRadius: '9999px', fontSize: 18, cursor: 'pointer' }}>👨‍💼</div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT: PDF VIEWER */}
        <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flex: 1, background: '#E2E8F0', borderRight: '1px solid #CBD5E1', overflow: 'hidden' }}>
          {/* Viewer Toolbar */}
          <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', height: 46.5, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="1" width="12" height="16" rx="2" fill="#EF4444" opacity="0.15"/><rect x="2" y="1" width="12" height="16" rx="2" stroke="#EF4444" strokeWidth="1.4"/><path d="M5 7h6M5 10h4M5 13h3" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/><path d="M10 1v4h4" stroke="#EF4444" strokeWidth="1.2"/></svg>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, lineHeight: '16px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>JOHN_DOE_RESUME_2024.PDF</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, background: '#F1F5F9', borderRadius: 8, padding: 4 }}>
              <button className="rv-zoom-btn" onClick={() => setZoom(z => Math.max(50, z - 10))}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="2" y1="6.5" x2="11" y2="6.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <div style={{ padding: '0 8px' }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#0F172A' }}>{zoom}%</span>
              </div>
              <div style={{ width: 1, height: 16, background: '#CBD5E1' }} />
              <button className="rv-zoom-btn" onClick={() => setZoom(z => Math.min(200, z + 10))}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="2" x2="6.5" y2="11" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/><line x1="2" y1="6.5" x2="11" y2="6.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <button className="rv-zoom-btn" style={{ marginLeft: 4 }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 5V1H5M8 1H12V5M12 8V12H8M5 12H1V8" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div style={{ background: '#FFFFFF', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', padding: 48, width: 765, minHeight: 1100, display: 'flex', flexDirection: 'column', gap: 32, transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
              <div style={{ boxSizing: 'border-box', paddingBottom: 24, borderBottom: '4px solid #137FEC', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 36, lineHeight: '40px', color: '#1E293B' }}>John Doe</h1>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 20, lineHeight: '28px', color: '#137FEC' }}>Senior Software Engineer</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, paddingTop: 8 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>✉️ john.doe@example.com</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>📍 San Francisco, CA</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>🌐 portfolio.dev</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10.75 }}>
                  <div style={{ boxSizing: 'border-box', paddingBottom: 4, borderBottom: '1px solid #E2E8F0' }}><h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>Professional Summary</h3></div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '23px', color: '#1E293B' }}>Innovative Senior Software Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure. Proven track record of leading engineering teams to deliver high-impact products.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ boxSizing: 'border-box', paddingBottom: 4, borderBottom: '1px solid #E2E8F0' }}><h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>Skills</h3></div>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {resumeSkills.map(skill => (
                      <span key={skill} style={{ display: 'flex', alignItems: 'center', padding: '4px 12px', background: '#F1F5F9', borderRadius: '9999px', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#1E293B' }}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: EVALUATION PANEL */}
        <div style={{ width: 450, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF', overflow: 'hidden' }}>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 24, gap: 16, borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, lineHeight: '28px', color: '#0F172A' }}>Evaluation</h3>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, padding: '4px 12px', background: '#DCFCE7', borderRadius: '9999px' }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#15803D' }}>94% Match</span>
              </div>
            </div>
            <div style={{ position: 'relative', width: '100%', height: 74 }}>
              <div style={{ boxSizing: 'border-box', position: 'absolute', left: 0, right: '52%', top: 0, height: 74, padding: 12, background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>Experience Score</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A' }}>8.5 / 10</span>
              </div>
              <div style={{ boxSizing: 'border-box', position: 'absolute', left: '52%', right: 0, top: 0, height: 74, padding: 12, background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>Skills Score</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A' }}>9.2 / 10</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 7, padding: 16, background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '18px' }}>⭐</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#137FEC' }}>AI Recruiter Notes</span>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '23px', color: '#334155' }}>Strong candidate for the Senior role. Their experience with high-scale architecture at TechGrowth is a direct match for our upcoming infrastructure migration project. Excellent tenure at previous roles suggests stability.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.7px', textTransform: 'uppercase', color: '#64748B' }}>Core Competencies</span>
              {competencies.map((comp, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#0F172A' }}>{comp.label}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{comp.score}</span>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: 6, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: comp.barWidth, background: '#137FEC', borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.7px', textTransform: 'uppercase', color: '#64748B' }}>Internal Notes</span>
              <textarea className="rv-note-textarea" placeholder="Add a private note about this candidate..." value={internalNote} onChange={e => setInternalNote(e.target.value)} />
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 24, gap: 16, background: '#F8FAFC', borderTop: '1px solid #E2E8F0', flexShrink: 0 }}>
            <div style={{ position: 'relative', width: '100%', height: 52 }}>
              {/* ✅ Reject → reject page */}
              <button className="rv-action-btn" style={{ position: 'absolute', left: 0, width: '48%' }} onClick={() => navigate('/employer/reject/1')}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="2" y1="2" x2="12" y2="12" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"/><line x1="12" y1="2" x2="2" y2="12" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"/></svg>
                Reject
              </button>
              {/* ✅ Message → candidate chat */}
              <button className="rv-action-btn" style={{ position: 'absolute', right: 0, width: '48%' }} onClick={() => navigate('/employer/chat/1')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#64748B" strokeWidth="1.4"/><path d="M2 7L10 12L18 7" stroke="#64748B" strokeWidth="1.4"/></svg>
                Message
              </button>
            </div>
            {/* ✅ Shortlist → shortlist page */}
            <button className="rv-shortlist-btn" onClick={() => navigate('/employer/shortlist/1')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#FFFFFF" strokeWidth="1.6"/><path d="M5 10L8.5 13.5L15 7" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Shortlist Candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;