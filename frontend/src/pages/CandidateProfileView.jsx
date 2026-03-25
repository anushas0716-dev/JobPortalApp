import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateProfileView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Summary');
  const [noteText, setNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Summary', 'Experience', 'Education', 'Skills'];

  const skills = [
    'Figma', 'Design Systems', 'User Research',
    'Prototyping', 'React.js', 'WCAG Accessibility', 'Agile Methodology',
  ];

  const experiences = [
    {
      id: 1,
      title: 'Senior Product Designer • TechStream',
      period: 'Jan 2021 — Present (3 years)',
      bullets: [
        'Redesigned core dashboard increasing daily active users by 25%.',
        'Maintained company-wide design system used by 50+ developers.',
      ],
    },
    {
      id: 2,
      title: 'UX Designer • Finlyte',
      period: 'Aug 2018 — Dec 2020 (2 years 5 mos)',
      bullets: [
        'Led the mobile app redesign focused on simplified money transfers.',
      ],
    },
  ];

  const notes = [
    { id: 1, author: 'Me',        time: '2h ago',    text: '"Excellent portfolio case study on design systems. Strong culture fit during initial screening."', bg: '#FEFCE8', border: '#FEF9C3' },
    { id: 2, author: 'Sarah Chen', time: 'Yesterday', text: '"High salary expectations, but skill level justifies the premium."', bg: '#F8FAFC', border: '#F1F5F9' },
  ];

  const tags = [
    { label: 'FIGMA-EXPERT',  active: true  },
    { label: 'SAN-FRANCISCO', active: false },
    { label: 'SENIOR',        active: false },
  ];

  const contactDetails = [
    { icon: (<svg width="17" height="13" viewBox="0 0 17 13" fill="none"><rect x="1" y="1" width="15" height="11" rx="2" stroke="#94A3B8" strokeWidth="1.3"/><path d="M1 3L8.5 8L16 3" stroke="#94A3B8" strokeWidth="1.3"/></svg>), label: 'Email',     value: 'alex.j@example.com',  link: false },
    { icon: (<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 1H6L7.5 4.5L5.5 5.5C6.3 7.3 7.7 8.7 9.5 9.5L10.5 7.5L14 9V12C14 13.1 13.1 14 12 14C5.9 14 1 9.1 1 3C1 1.9 1.9 1 3 1Z" stroke="#94A3B8" strokeWidth="1.3"/></svg>), label: 'Phone',     value: '+1 (555) 234-5678',    link: false },
    { icon: (<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="7.5" stroke="#94A3B8" strokeWidth="1.3"/><path d="M1 8.5H16M8.5 1C8.5 1 6 4 6 8.5C6 13 8.5 16 8.5 16C8.5 16 11 13 11 8.5C11 4 8.5 1 8.5 1Z" stroke="#94A3B8" strokeWidth="1.3"/></svg>), label: 'Portfolio', value: 'alexjohnson.design',    link: true  },
    { icon: (<svg width="17" height="9" viewBox="0 0 17 9" fill="none"><path d="M6 4.5H1M11 4.5H16M6 4.5C6 6.157 7.343 7.5 9 7.5H8C9.657 7.5 11 6.157 11 4.5M6 4.5C6 2.843 7.343 1.5 9 1.5H8C9.657 1.5 11 2.843 11 4.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/><rect x="5" y="1.5" width="7" height="6" rx="3" stroke="#94A3B8" strokeWidth="1.3"/></svg>), label: 'LinkedIn', value: '/in/alexj-ux',           link: true  },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cpv-nav-link { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; color: #475569; background: none; border: none; cursor: pointer; padding: 0; transition: color 0.15s; }
        .cpv-nav-link:hover { color: #137FEC; }
        .cpv-tab { display: flex; flex-direction: column; align-items: flex-start; padding: 0px 0px 12px; height: 34px; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #64748B; transition: color 0.15s; white-space: nowrap; }
        .cpv-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .cpv-tab:hover:not(.active) { color: #334155; }
        .cpv-skill-tag { display: flex; align-items: center; padding: 4px 12px; background: #F1F5F9; border-radius: 9999px; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; color: #0F172A; cursor: default; }
        .cpv-search-input { flex: 1; height: 40px; padding: 11px 12px; background: transparent; border: none; outline: none; font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A; }
        .cpv-search-input::placeholder { color: #94A3B8; }
        .btn-schedule { display: flex; justify-content: center; align-items: center; padding: 9.5px 16px 10.5px; height: 40px; background: #F1F5F9; border-radius: 8px; border: none; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; color: #334155; cursor: pointer; transition: background 0.15s; }
        .btn-schedule:hover { background: #E2E8F0; }
        .btn-message { display: flex; justify-content: center; align-items: center; padding: 9.5px 16px 10.5px; height: 40px; background: #137FEC; border-radius: 8px; border: none; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; color: #FFFFFF; cursor: pointer; transition: background 0.2s; }
        .btn-message:hover { background: #0e6fd4; }
        .cpv-sidebar-card { box-sizing: border-box; display: flex; flex-direction: column; align-items: flex-start; width: 320px; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; }
        .cpv-card-header { box-sizing: border-box; display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 12px 20px; width: 100%; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; }
        .cpv-card-header-title { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; line-height: 20px; letter-spacing: 0.7px; text-transform: uppercase; color: #64748B; }
        .cpv-note-textarea { width: 100%; padding: 8px 12px 48px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A; outline: none; resize: none; line-height: 20px; }
        .cpv-note-textarea::placeholder { color: #94A3B8; }
        .cpv-note-textarea:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
      `}</style>

      {/* HEADER */}
      <header style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '12px 80px', width: '100%', height: 65, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          {/* ✅ Logo → employer dashboard */}
          <div onClick={() => navigate('/employer/dashboard')} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: 'rgba(19,127,236,0.1)', borderRadius: 8 }}>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M8.5 1L14.5 4V8C14.5 11.3137 11.8137 14 8.5 14C5.18629 14 2.5 11.3137 2.5 8V4L8.5 1Z" stroke="#137FEC" strokeWidth="1.6"/></svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#0F172A' }}>RecruitFlow</span>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            {/* ✅ Nav links */}
            <button className="cpv-nav-link" onClick={() => navigate('/employer/candidates/1')}>Candidates</button>
            <button className="cpv-nav-link" onClick={() => navigate('/employer/manage-jobs')}>Jobs</button>
            <button className="cpv-nav-link" onClick={() => navigate('/interviews/notifications')}>Interviews</button>
            <button className="cpv-nav-link" onClick={() => navigate('/employer/analytics')}>Reports</button>
          </nav>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 256, height: 40, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 27, height: 38, paddingLeft: 12 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#94A3B8" strokeWidth="1.4"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <input className="cpv-search-input" type="text" placeholder="Search talent..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          {/* ✅ Bell → notifications */}
          <button onClick={() => navigate('/recruiter/notifications')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 40, borderRadius: '9999px' }}>
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none"><path d="M6.5 0C6.5 0 2.5 2.5 2.5 8.5v3.5l-2 2v1H13v-1l-2-2V8.5C11 2.5 6.5 0 6.5 0Z" stroke="#475569" strokeWidth="1.3"/><path d="M4.5 14.5C4.5 15.6 5.4 16.5 6.5 16.5s2-.9 2-2" stroke="#475569" strokeWidth="1.3"/></svg>
          </button>
          {/* ✅ Avatar → employer profile */}
          <div onClick={() => navigate('/employer/profile')} style={{ width: 36, height: 36, background: '#334155', border: '1px solid #E2E8F0', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, overflow: 'hidden', cursor: 'pointer' }}>👨‍💼</div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '32px 80px', gap: 24, width: '100%', maxWidth: 1280, margin: '0 auto' }}>

        {/* BREADCRUMB + STATUS */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 1120 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* ✅ Candidates breadcrumb → candidates list */}
            <button onClick={() => navigate('/employer/candidates/1')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B', padding: 0 }}>Candidates</button>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#94A3B8' }}>/</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>Alex Johnson</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '2px 10px', background: '#DCFCE7', borderRadius: '9999px' }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#15803D' }}>Active Selection</span>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 32, width: 1120 }}>

          {/* LEFT: MAIN PROFILE CARD */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
            <div style={{ boxSizing: 'border-box', width: '100%', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden', padding: 25 }}>

              {/* Profile header */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                <div style={{ width: 96, height: 96, borderRadius: 12, background: 'linear-gradient(135deg, #C9D8E8, #8FA4B8)', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, flexShrink: 0, overflow: 'hidden' }}>👨‍💼</div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
                  <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 24, lineHeight: '32px', color: '#0F172A' }}>Alex Johnson</h1>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#64748B' }}>Senior Product Designer • San Francisco, CA</p>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: 3.5 }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="#137FEC" strokeWidth="1.2"/><path d="M6.5 3.5V6.5L8.5 8" stroke="#137FEC" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    {/* ✅ Applied link → job detail */}
                    <span onClick={() => navigate('/jobs/1')} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#137FEC', cursor: 'pointer' }}>Applied 2 days ago for Senior UX Role</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 12, flexShrink: 0 }}>
                  {/* ✅ Schedule → interview scheduling */}
                  <button className="btn-schedule" onClick={() => navigate('/interviews/1/schedule')}>Schedule</button>
                  {/* ✅ Message → candidate chat */}
                  <button className="btn-message" onClick={() => navigate('/employer/chat/1')}>Message</button>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 32, borderBottom: '1px solid #E2E8F0', marginBottom: 24 }}>
                {tabs.map(tab => (
                  <button key={tab} className={`cpv-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingBottom: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>Professional Summary</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '26px', color: '#475569' }}>Senior Product Designer with 8+ years of experience in creating user-centered digital products for FinTech and SaaS companies. Proven track record of leading cross-functional teams to deliver high-impact solutions that improve user engagement by over 40%. Passionate about accessibility, design systems, and bridging the gap between design and engineering.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>Core Skills</h3>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {skills.map(skill => (<span key={skill} className="cpv-skill-tag">{skill}</span>))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#0F172A' }}>Latest Experience</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {experiences.map(exp => (
                      <div key={exp.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 4, background: 'rgba(19,127,236,0.1)', flexShrink: 0 }}>
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none"><rect x="1" y="5" width="15" height="10" rx="1.5" stroke="#137FEC" strokeWidth="1.4"/><path d="M6 5V4C6 2.895 6.895 2 8 2H9C10.105 2 11 2.895 11 4V5" stroke="#137FEC" strokeWidth="1.4"/><line x1="1" y1="9" x2="16" y2="9" stroke="#137FEC" strokeWidth="1.4"/></svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A' }}>{exp.title}</p>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B', marginBottom: 8 }}>{exp.period}</p>
                          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                            {exp.bullets.map((b, i) => (
                              <li key={i} style={{ display: 'flex', flexDirection: 'row', gap: 13, alignItems: 'flex-start' }}>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#475569', lineHeight: '20px', flexShrink: 0 }}>•</span>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#475569' }}>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320, flexShrink: 0 }}>

            {/* CONTACT DETAILS */}
            <div className="cpv-sidebar-card">
              <div className="cpv-card-header"><span className="cpv-card-header-title">Contact Details</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 16 }}>
                {contactDetails.map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, cursor: item.link ? 'pointer' : 'default' }}
                    onClick={() => item.link && window.open('https://linkedin.com', '_blank')}>
                    <div style={{ width: 17, height: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#94A3B8' }}>{item.label}</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '20px', color: item.link ? '#137FEC' : '#0F172A', cursor: item.link ? 'pointer' : 'default' }}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECRUITER NOTES */}
            <div className="cpv-sidebar-card">
              <div className="cpv-card-header">
                <span className="cpv-card-header-title">Recruiter Notes</span>
                {/* ✅ + icon → add note (focus textarea) */}
                <button onClick={() => document.querySelector('.cpv-note-textarea')?.focus()} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 17, height: 17 }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="8" stroke="#137FEC" strokeWidth="1.3"/><line x1="8.5" y1="5" x2="8.5" y2="12" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round"/><line x1="5" y1="8.5" x2="12" y2="8.5" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 16 }}>
                {notes.map(note => (
                  <div key={note.id} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 4, padding: 12, borderRadius: 8, background: note.bg, border: `1px solid ${note.border}` }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>{note.author} • {note.time}</span>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#334155' }}>{note.text}</p>
                  </div>
                ))}
                <textarea className="cpv-note-textarea" rows={4} placeholder="Type a note..." value={noteText} onChange={e => setNoteText(e.target.value)} />
                {/* ✅ Save Note → saves note */}
                <button onClick={() => { if (noteText.trim()) { alert('Note saved!'); setNoteText(''); } }}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px 0px', width: '100%', height: 36, background: 'rgba(19,127,236,0.1)', borderRadius: 8, border: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#137FEC', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.target.style.background = 'rgba(19,127,236,0.18)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(19,127,236,0.1)'}>
                  Save Note
                </button>
              </div>
            </div>

            {/* TAGS */}
            <div className="cpv-sidebar-card" style={{ paddingBottom: 20 }}>
              <div className="cpv-card-header"><span className="cpv-card-header-title">Tags</span></div>
              <div style={{ padding: '0 20px', paddingTop: 20, position: 'relative', width: '100%', minHeight: 56 }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {tags.map(tag => (
                    <div key={tag.label} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '3.5px 8px 4.5px', gap: 4, background: tag.active ? 'rgba(19,127,236,0.1)' : '#F1F5F9', borderRadius: 4, cursor: 'pointer' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1H6L11 6L6 11L1 6V1Z" stroke={tag.active ? '#137FEC' : '#475569'} strokeWidth="1.2" strokeLinejoin="round"/><circle cx="3.5" cy="3.5" r="1" fill={tag.active ? '#137FEC' : '#475569'}/></svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, lineHeight: '16px', textTransform: 'uppercase', color: tag.active ? '#137FEC' : '#475569' }}>{tag.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateProfileView;