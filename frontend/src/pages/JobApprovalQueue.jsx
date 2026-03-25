import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobApprovalQueue = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Job Queue');
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedJob, setSelectedJob] = useState(0);
  const [internalNote, setInternalNote] = useState('');

  const navItems = [
    { label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>, badge: null },
    { label: 'Job Queue', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 4V3C6 1.895 6.895 1 8 1H10C11.105 1 12 1.895 12 3V4" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.4"/><path d="M5 13l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, badge: '12' },
    { label: 'Users', icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><circle cx="7" cy="5" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M1 15C1 11.686 3.686 9 7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="13" cy="6" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M11 15C11 12.239 12.343 10 13 10C13.657 10 15 12.239 15 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, badge: null },
    { label: 'Companies', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="1" x2="6" y2="17" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="7" x2="6" y2="7" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="11" width="5" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.3"/></svg>, badge: null },
    { label: 'Reports', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="1" y1="15" x2="1" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="15" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="15" x2="9" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="15" x2="13" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, badge: null },
  ];

  const pendingJobs = [
    { id: 0, title: 'Senior Product Designer', company: 'Stellar Tech', logo: 'ST', submitted: '2h ago', priority: 'MEDIUM', priorityBg: '#FEF3C7', priorityColor: '#92400E', location: 'San Francisco, CA', type: 'Full-time', salary: '$120k – $150k', description: 'We are looking for a Senior Product Designer to join our growing team. You will work closely with product managers and engineers to design intuitive user experiences.', tags: ['Figma', 'UX Research', 'Design Systems'] },
    { id: 1, title: 'Backend Engineer', company: 'DataFlow Inc', logo: 'DF', submitted: '4h ago', priority: 'HIGH', priorityBg: '#FEE2E2', priorityColor: '#991B1B', location: 'Remote', type: 'Full-time', salary: '$130k – $160k', description: 'DataFlow is hiring a Backend Engineer to build and scale our data pipeline infrastructure. Experience with distributed systems required.', tags: ['Python', 'Kafka', 'PostgreSQL'] },
    { id: 2, title: 'Marketing Manager', company: 'GrowthCo', logo: 'GC', submitted: '6h ago', priority: 'LOW', priorityBg: '#DCFCE7', priorityColor: '#166534', location: 'New York, NY', type: 'Full-time', salary: '$90k – $110k', description: 'GrowthCo is seeking a Marketing Manager to lead our B2B demand generation efforts across digital channels.', tags: ['SEO', 'Google Ads', 'Analytics'] },
    { id: 3, title: 'DevOps Engineer', company: 'CloudBase', logo: 'CB', submitted: '8h ago', priority: 'HIGH', priorityBg: '#FEE2E2', priorityColor: '#991B1B', location: 'Austin, TX', type: 'Contract', salary: '$110k – $140k', description: 'CloudBase needs a DevOps Engineer to manage CI/CD pipelines and cloud infrastructure on AWS.', tags: ['AWS', 'Terraform', 'Kubernetes'] },
    { id: 4, title: 'UX Researcher', company: 'InsightLab', logo: 'IL', submitted: '1d ago', priority: 'MEDIUM', priorityBg: '#FEF3C7', priorityColor: '#92400E', location: 'Chicago, IL', type: 'Part-time', salary: '$70k – $85k', description: 'InsightLab is looking for a UX Researcher to conduct user interviews, usability tests, and synthesize findings.', tags: ['User Testing', 'Interviews', 'Affinity Mapping'] },
  ];

  const approvedJobs = [
    { id: 10, title: 'Frontend Developer', company: 'WebCraft', logo: 'WC', submitted: '2d ago', priority: 'LOW', priorityBg: '#DCFCE7', priorityColor: '#166534', location: 'Seattle, WA', type: 'Full-time', salary: '$100k – $125k', description: 'WebCraft is hiring a Frontend Developer skilled in React and TypeScript.', tags: ['React', 'TypeScript', 'CSS'] },
  ];

  const rejectedJobs = [
    { id: 20, title: 'Spam Post', company: 'Unknown LLC', logo: 'UN', submitted: '3d ago', priority: 'HIGH', priorityBg: '#FEE2E2', priorityColor: '#991B1B', location: 'N/A', type: 'Unknown', salary: 'N/A', description: 'This posting was rejected due to policy violations.', tags: [] },
  ];

  const tabs = { Pending: pendingJobs, Approved: approvedJobs, Rejected: rejectedJobs };
  const currentJobs = tabs[activeTab] || [];
  const sel = currentJobs[selectedJob] || currentJobs[0];

  const handleApprove = () => {
    alert(`Approved: ${sel?.title}`);
  };
  const handleReject = () => {
    alert(`Rejected: ${sel?.title}\nNote: ${internalNote}`);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .jaq-nav-link {
          display: flex; flex-direction: row; align-items: center;
          gap: 10px; padding: 8px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s; justify-content: space-between;
        }
        .jaq-nav-link:hover { background: #F1F5F9; }
        .jaq-nav-link.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 600; }

        .jaq-tab-btn {
          padding: 8px 20px; height: 40px; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: background 0.15s; white-space: nowrap;
        }
        .jaq-tab-btn.active { background: #137FEC; color: #FFFFFF; }
        .jaq-tab-btn:not(.active) { background: #FFFFFF; color: #64748B; border: 1px solid #E2E8F0; }
        .jaq-tab-btn:not(.active):hover { background: #F8FAFC; }

        .jaq-job-row {
          display: grid; grid-template-columns: 1fr 140px 100px 100px;
          padding: 16px 20px; cursor: pointer; border-top: 1px solid #F1F5F9;
          transition: background 0.1s; align-items: center;
        }
        .jaq-job-row:hover { background: #F8FAFC; }
        .jaq-job-row.selected { background: rgba(19,127,236,0.04); border-left: 3px solid #137FEC; }

        .jaq-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
        }
        .jaq-search-input::placeholder { color: #94A3B8; }

        .btn-approve {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 24px; height: 42px; border-radius: 8px; border: none;
          background: #22C55E; color: #FFFFFF;
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px;
          cursor: pointer; transition: background 0.12s; flex: 1;
        }
        .btn-approve:hover { background: #16a34a; }

        .btn-reject {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 24px; height: 42px; border-radius: 8px;
          border: 1px solid #FCA5A5; background: #FEF2F2; color: #DC2626;
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px;
          cursor: pointer; transition: background 0.12s; flex: 1;
        }
        .btn-reject:hover { background: #FEE2E2; }

        .jaq-icon-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px;
          border: none; cursor: pointer; transition: background 0.12s;
        }
        .jaq-icon-btn:hover { background: #E2E8F0; }

        .jaq-note-textarea {
          width: 100%; border: none; outline: none; resize: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #475569;
          background: transparent; line-height: 22px; min-height: 80px;
        }
        .jaq-note-textarea::placeholder { color: #CBD5E1; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 32px', height: 65,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 50,
      }}>
        {/* Logo + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: '#EFF6FF', borderRadius: 8, border: '1.5px solid #137FEC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1C5.686 1 3 3.686 3 7C3 9.5 4.4 11.7 6.5 12.8L4 17H14L11.5 12.8C13.6 11.7 15 9.5 15 7C15 3.686 12.314 1 9 1Z" stroke="#137FEC" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M6.5 7.5L8.5 9.5L11.5 6" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A', letterSpacing: '-0.3px' }}>Admin Portal</span>
          </div>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', width: 260, height: 40, background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0', padding: '0 14px', gap: 10 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#94A3B8" strokeWidth="1.4"/>
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input className="jaq-search-input" type="text" placeholder="Search postings..." />
          </div>
        </div>
        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="jaq-icon-btn"><svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#475569" strokeWidth="1.4"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#475569" strokeWidth="1.4"/></svg></button>
          <button className="jaq-icon-btn"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="#475569" strokeWidth="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#D4A96A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>👤</div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ boxSizing: 'border-box', width: 240, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'auto' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', padding: '0 12px 8px' }}>MAIN MENU</p>
          {navItems.map(item => (
            <button key={item.label} className={`jaq-nav-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge && (
                <span style={{ background: '#137FEC', color: '#FFFFFF', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11, borderRadius: '9999px', padding: '2px 7px' }}>{item.badge}</span>
              )}
            </button>
          ))}
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', padding: '28px 32px', gap: 0 }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B', cursor: 'pointer' }}>Jobs</span>
            <span style={{ color: '#CBD5E1', fontSize: 14 }}>›</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#0F172A' }}>Approval Queue</span>
          </div>

          {/* Page title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 30, lineHeight: '36px', letterSpacing: '-0.75px', color: '#0F172A', marginBottom: 4 }}>
                Job Approval Queue
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>
                {pendingJobs.length} postings pending manual review
              </p>
            </div>

            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {['Pending', 'Approved', 'Rejected'].map(tab => (
                <button key={tab} className={`jaq-tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => { setActiveTab(tab); setSelectedJob(0); }}>
                  {tab}{tab === 'Pending' ? ` (${pendingJobs.length})` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid: Table + Detail Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20, flex: 1 }}>

            {/* ── JOB LIST TABLE ── */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Table head */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px', padding: '14px 20px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['JOB POSTING', 'COMPANY', 'SUBMITTED', 'PRIORITY'].map(h => (
                  <span key={h} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              {currentJobs.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8', fontFamily: "'Inter',sans-serif" }}>No postings in this category</div>
              ) : currentJobs.map((job, i) => (
                <div key={job.id} className={`jaq-job-row${selectedJob === i ? ' selected' : ''}`} onClick={() => setSelectedJob(i)}>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 2 }}>{job.title}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#94A3B8' }}>{job.location} · {job.type}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, color: '#475569' }}>{job.logo}</span>
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 13, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.company}</span>
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 13, color: '#94A3B8' }}>{job.submitted}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', background: job.priorityBg, color: job.priorityColor, borderRadius: '9999px', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.4px', width: 'fit-content' }}>
                    {job.priority}
                  </span>
                </div>
              ))}
            </div>

            {/* ── DETAIL / REVIEW PANEL ── */}
            {sel ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Job detail card */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 13, color: '#2563EB' }}>{sel.logo}</span>
                      </div>
                      <div>
                        <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A', marginBottom: 2 }}>{sel.title}</h2>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 13, color: '#64748B' }}>{sel.company} · {sel.location}</p>
                      </div>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', background: sel.priorityBg, color: sel.priorityColor, borderRadius: '9999px', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                      {sel.priority}
                    </span>
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {[
                      { label: 'Job Type', value: sel.type },
                      { label: 'Salary', value: sel.salary },
                      { label: 'Submitted', value: sel.submitted },
                    ].map(m => (
                      <div key={m.label}>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 2 }}>{m.label}</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: '#F1F5F9' }} />

                  {/* Description */}
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 8 }}>Description</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '22px', color: '#475569' }}>{sel.description}</p>
                  </div>

                  {/* Tags */}
                  {sel.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {sel.tags.map(tag => (
                        <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', background: '#F1F5F9', borderRadius: '9999px', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#475569' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Internal Note */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>
                    INTERNAL NOTE / REJECTION REASON
                  </p>
                  <textarea
                    className="jaq-note-textarea"
                    placeholder="Explain rejection or leave a note..."
                    value={internalNote}
                    onChange={e => setInternalNote(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Action buttons */}
                {activeTab === 'Pending' && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn-reject" onClick={handleReject}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.4"/><line x1="5" y1="5" x2="11" y2="11" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/><line x1="11" y1="5" x2="5" y2="11" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      Reject Posting
                    </button>
                    <button className="btn-approve" onClick={handleApprove}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#FFFFFF" strokeWidth="1.4"/><path d="M5 8L7 10L11 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Approve Posting
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontFamily: "'Inter',sans-serif" }}>
                Select a posting to review
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobApprovalQueue;