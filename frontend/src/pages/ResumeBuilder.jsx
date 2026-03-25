import React, { useState } from 'react';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('Work Experience');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [startMonth, setStartMonth] = useState('Month');
  const [startYear, setStartYear] = useState('Year');
  const [endMonth, setEndMonth] = useState('Month');
  const [endYear, setEndYear] = useState('Year');
  const [description, setDescription] = useState('');
  const [currentlyWork, setCurrentlyWork] = useState(false);

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const years = Array.from({ length: 30 }, (_, i) => String(2024 - i));

  const navSections = [
    { label: 'Personal Info', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="#475569" strokeWidth="1.3"/><path d="M2 14C2 11.2 4.7 9 8 9C11.3 9 14 11.2 14 14" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: 'Education', icon: <svg width="16" height="18" viewBox="0 0 16 18" fill="none"><path d="M8 1L15 5L8 9L1 5L8 1Z" stroke="#475569" strokeWidth="1.3" strokeLinejoin="round"/><path d="M1 5V11" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/><path d="M4 7V13C4 13 5.5 15 8 15C10.5 15 12 13 12 13V7" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Work Experience', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="5" width="16" height="12" rx="2" stroke="#137FEC" strokeWidth="1.3"/><path d="M6 5V3C6 2 6.9 1 8 1H10C11.1 1 12 2 12 3V5" stroke="#137FEC" strokeWidth="1.3"/></svg> },
    { label: 'Skills', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" stroke="#475569" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
    { label: 'Projects', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="#475569" strokeWidth="1.3"/><line x1="4" y1="5" x2="12" y2="5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="8" x2="12" y2="8" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="11" x2="9" y2="11" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: 'Certifications', icon: <svg width="10" height="20" viewBox="0 0 10 20" fill="none"><path d="M5 1L6.5 6H10L7 8.5L8 13L5 11L2 13L3 8.5L0 6H3.5L5 1Z" stroke="#475569" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
  ];

  const SelectField = ({ value, onChange, options, placeholder }) => (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px 12px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '16px', color: value === placeholder ? '#6B7280' : '#0F172A', outline: 'none', appearance: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}
      >
        <option value={placeholder} disabled>{placeholder}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 7L11 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", height: '100vh', display: 'flex', flexDirection: 'column', background: '#F6F7F8', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .rb-nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .rb-nav-item.active { background: rgba(19,127,236,0.1); border: 1px solid rgba(19,127,236,0.2); }
        .rb-nav-item:not(.active):hover { background: #F1F5F9; }
        .rb-input { width: 100%; padding: 10px 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; color: #0F172A; outline: none; font-family: 'Inter',sans-serif; transition: border 0.15s; }
        .rb-input::placeholder { color: #6B7280; }
        .rb-input:focus { border-color: #137FEC; }
        .rb-textarea { width: 100%; padding: 8px 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; color: #0F172A; outline: none; font-family: 'Inter',sans-serif; resize: vertical; min-height: 138px; transition: border 0.15s; line-height: 1.5; }
        .rb-textarea::placeholder { color: #6B7280; }
        .rb-textarea:focus { border-color: #137FEC; }
        .rb-nav-link { font-size: 14px; font-weight: 500; color: #475569; background: none; border: none; cursor: pointer; font-family: 'Inter',sans-serif; transition: color 0.15s; }
        .rb-nav-link:hover { color: #0F172A; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '12px 40px', height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><rect x="2" y="1" width="12" height="18" rx="2" stroke="white" strokeWidth="1.5"/><line x1="5" y1="6" x2="11" y2="6" stroke="white" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="9" x2="11" y2="9" stroke="white" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="12" x2="9" y2="12" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>ResumeCraft</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <nav style={{ display: 'flex', gap: '32px' }}>
            <button className="rb-nav-link">Templates</button>
            <button className="rb-nav-link">My Resumes</button>
            <button className="rb-nav-link">Expert Tips</button>
          </nav>

          <div style={{ width: '1px', height: '24px', background: '#E2E8F0' }} />

          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1V7M2 5L5 8L8 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Export PDF
          </button>

          <div style={{ width: '40px', height: '40px', background: '#CBD5E1', border: '1px solid #E2E8F0', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" fill="#64748B"/><path d="M3 20C3 16.1 6.6 13 11 13C15.4 13 19 16.1 19 20" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ width: '256px', flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }}>
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Resume Builder</h2>
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Draft: Senior Product Designer</span>
          </div>

          {/* Nav sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navSections.map(section => (
              <button key={section.label} className={`rb-nav-item${activeSection === section.label ? ' active' : ''}`} onClick={() => setActiveSection(section.label)}>
                <span style={{ width: '20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{section.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: activeSection === section.label ? '700' : '500', color: activeSection === section.label ? '#137FEC' : '#475569' }}>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Profile strength card */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>Profile Strength</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#137FEC' }}>65%</span>
              </div>
              <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#137FEC', borderRadius: '9999px' }} />
              </div>
              <p style={{ fontSize: '10px', color: '#64748B', lineHeight: '16px' }}>Add your skills to reach 80% and unlock premium templates.</p>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#F6F7F8' }}>
          <div style={{ maxWidth: '624px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>Dashboard</span>
              <svg width="5" height="8" viewBox="0 0 5 8" fill="none"><path d="M1 1L4 4L1 7" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>Resume Editor</span>
              <svg width="5" height="8" viewBox="0 0 5 8" fill="none"><path d="M1 1L4 4L1 7" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Work Experience</span>
            </nav>

            {/* Page header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.75px' }}>Work Experience</h1>
                <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>List your professional history starting from your most recent role.</p>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#0F172A', cursor: 'pointer', fontFamily: 'Inter,sans-serif', flexShrink: 0, height: '58px' }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><line x1="4.5" y1="0" x2="4.5" y2="9" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/><line x1="0" y1="4.5" x2="9" y2="4.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Add New<br/>Role
              </button>
            </div>

            {/* Form Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Row 1: Job Title + Company */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Job Title</label>
                    <input className="rb-input" placeholder="e.g. Senior Product Designer" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Company</label>
                    <input className="rb-input" placeholder="e.g. TechFlow Inc." value={company} onChange={e => setCompany(e.target.value)} />
                  </div>
                </div>

                {/* Row 2: Start Date + End Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Start Date</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <SelectField value={startMonth} onChange={setStartMonth} options={months} placeholder="Month" />
                      <SelectField value={startYear} onChange={setStartYear} options={years} placeholder="Year" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>End Date</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <SelectField value={endMonth} onChange={setEndMonth} options={months} placeholder="Month" />
                      <SelectField value={endYear} onChange={setEndYear} options={years} placeholder="Year" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Description</label>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1L7 4H10L7.5 6L8.5 9.5L5.5 7.5L2.5 9.5L3.5 6L1 4H4L5.5 1Z" fill="#137FEC"/></svg>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#137FEC' }}>AI Write</span>
                    </button>
                  </div>
                  <textarea className="rb-textarea" placeholder="Describe your responsibilities and achievements..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                {/* Currently work here */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '16px' }}>
                  <input type="checkbox" id="currentlyWork" checked={currentlyWork} onChange={e => setCurrentlyWork(e.target.checked)} style={{ width: '16px', height: '16px', border: '1px solid #6B7280', borderRadius: '4px', cursor: 'pointer', accentColor: '#137FEC' }} />
                  <label htmlFor="currentlyWork" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer' }}>I currently work here</label>
                </div>
              </div>

              {/* Footer */}
              <div style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none"><path d="M3 1L1 3.5L3 6M1 3.5H7C8.1 3.5 9 4.4 9 5.5V9" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Remove Entry</span>
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ padding: '8px 24px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Save Draft</button>
                  <button style={{ padding: '8px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)' }}>Save and Next</button>
                </div>
              </div>
            </div>

            {/* Bottom tip cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              {/* Pro Tip blue card */}
              <div style={{ background: '#137FEC', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '30px', height: '64px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(2px)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="19" height="25" viewBox="0 0 19 25" fill="none"><ellipse cx="9.5" cy="9" rx="8" ry="8" stroke="white" strokeWidth="1.5" fill="none"/><path d="M6.5 9C6.5 7.3 7.8 6 9.5 6C11.2 6 12.5 7.3 12.5 9C12.5 10.3 11.7 11.4 10.5 11.8V13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9.5" cy="15" r="0.8" fill="white"/><path d="M7 20H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 22H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Pro Tip: Quantify your impact</h4>
                  <p style={{ fontSize: '14px', color: '#FFFFFF', lineHeight: '20px', opacity: 0.9 }}>Instead of "Managed team", try "Managed a team of 12 designers and increased output by 25%."</p>
                </div>
              </div>

              {/* Quick Preview white card */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', textAlign: 'center' }}>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none"><path d="M1 7.5C1 7.5 4.5 1 11 1C17.5 1 21 7.5 21 7.5C21 7.5 17.5 14 11 14C4.5 14 1 7.5 1 7.5Z" stroke="#94A3B8" strokeWidth="1.4" fill="none"/><circle cx="11" cy="7.5" r="3" stroke="#94A3B8" strokeWidth="1.4"/></svg>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Quick Preview</span>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>See how this entry looks on your template.</p>
              </div>
            </div>
          </div>
        </main>

        {/* ── RIGHT SIDEBAR — LIVE PREVIEW ── */}
        <aside style={{ width: '320px', flexShrink: 0, background: '#FFFFFF', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Live Preview</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ width: '22px', height: '22px', borderRadius: '4px', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1L10 10M7 1H10V4M10 1L6 5" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button style={{ width: '21px', height: '21px', borderRadius: '4px', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5H9M5 1V9" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>

          {/* Preview area */}
          <div style={{ flex: 1, background: '#F1F5F9', padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Mock resume */}
            <div style={{ background: '#FFFFFF', padding: '24px 24px 48px', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
              {/* Name header with blue border */}
              <div style={{ borderBottom: '2px solid #137FEC', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  {jobTitle || 'JOHNATHAN DOE'}
                </div>
                <div style={{ fontSize: '10px', fontWeight: '500', color: '#64748B', marginBottom: '8px' }}>
                  {company || 'Senior Product Designer'}
                </div>
                <div style={{ display: 'flex', gap: '8px', fontSize: '6px', color: '#94A3B8' }}>
                  <span>john@example.com</span>
                  <span>•</span>
                  <span>+1 234 567 890</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Summary */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '8px', fontWeight: '700', color: '#137FEC', textTransform: 'uppercase' }}>Summary</span>
                </div>
                <p style={{ fontSize: '8px', color: '#475569', lineHeight: '10px' }}>Dynamic and creative Product Designer with 8+ years of experience in building scalable design systems and user-centric mobile applications...</p>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '8px', fontWeight: '700', color: '#137FEC', textTransform: 'uppercase' }}>Experience</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Current role */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '8px', fontWeight: '700', color: '#0F172A' }}>Senior Product Designer | TechFlow Inc.</span>
                      <span style={{ fontSize: '8px', color: '#94A3B8' }}>Jan 2023 - Present</span>
                    </div>
                    <div style={{ paddingLeft: '8px' }}>
                      <div style={{ fontSize: '8px', color: '#475569', lineHeight: '10px', marginBottom: '2px' }}>• Lead design for the flagship enterprise dashboard used by 50k+ daily active users.</div>
                      <div style={{ fontSize: '8px', color: '#475569', lineHeight: '10px' }}>• Architected a new design system reducing front-end development time by 30%.</div>
                    </div>
                  </div>
                  {/* Previous role - greyed */}
                  <div style={{ opacity: 0.5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '8px', fontWeight: '700', color: '#0F172A' }}>UI/UX Designer | Creative Pulse</span>
                      <span style={{ fontSize: '8px', color: '#94A3B8' }}>2019 - 2022</span>
                    </div>
                    <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '4px', marginTop: '4px', width: '96px' }} />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '8px', fontWeight: '700', color: '#137FEC', textTransform: 'uppercase' }}>Skills</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {['Figma', 'UI/UX', 'React', 'Design Systems'].map(skill => (
                    <span key={skill} style={{ background: '#F1F5F9', borderRadius: '4px', padding: '2px 6px', fontSize: '8px', color: '#0F172A' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Change Template button */}
          <div style={{ padding: '16px', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
            <button style={{ width: '100%', padding: '8px 0', background: '#0F172A', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              Change Template
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ResumeBuilder;