import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeSelection = () => {
  const [selectedResume, setSelectedResume] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const resumes = [
    { id: 1, name: 'Senior_Product_Designer_2024.pdf', updated: 'Last updated Feb 12, 2024 • 1.2 MB', tags: ['📄 PDF', '🌐 English'] },
    { id: 2, name: 'Visual_Designer_General.pdf',      updated: 'Last updated Nov 05, 2023 • 940 KB',  tags: [] },
  ];

  const steps = [
    { label: 'PERSONAL', idx: 0 },
    { label: 'RESUME',   idx: 1 },
    { label: 'PORTFOLIO',idx: 2 },
    { label: 'REVIEW',   idx: 3 },
  ];

  const ResumePreview = ({ selected }) => (
    <div style={{ width: selected ? 120 : 90, height: selected ? 160 : 120, flexShrink: 0, background: 'linear-gradient(145deg, #e8d5c0 0%, #d4b896 40%, #c9a87a 100%)', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', padding: '8px 6px', gap: '4px' }}>
      <div style={{ width: '60%', height: '6px', background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
      <div style={{ width: '40%', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.3)', margin: '2px 0' }} />
      {[70, 85, 60, 75, 55, 80].map((w, i) => (<div key={i} style={{ width: `${w}%`, height: '3px', background: 'rgba(255,255,255,0.45)', borderRadius: 2 }} />))}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.3)', margin: '2px 0' }} />
      {[65, 90, 50].map((w, i) => (<div key={i} style={{ width: `${w}%`, height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />))}
      <div style={{ position: 'absolute', top: '6px', left: '6px', fontSize: '7px', fontWeight: 700, color: 'rgba(100,60,20,0.7)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Resume</div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .btn-primary { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 900; color: #fff; cursor: pointer; padding: 12px 40px; box-shadow: 0px 20px 25px -5px rgba(19,127,236,0.3), 0px 8px 10px -6px rgba(19,127,236,0.3); transition: background 0.2s; white-space: nowrap; }
        .btn-primary:hover { background: #0e6fd4; }
        .btn-use { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 8px 20px; display: flex; align-items: center; gap: 6px; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); }
        .btn-use:hover { background: #0e6fd4; }
        .btn-secondary { background: #F1F5F9; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #0F172A; cursor: pointer; padding: 8px 20px; transition: background 0.2s; }
        .btn-secondary:hover { background: #E2E8F0; }
        .btn-ghost { background: none; border: none; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #64748B; cursor: pointer; padding: 0; }
        .btn-ghost:hover { color: #334155; }
        .btn-back { background: none; border: none; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #475569; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 0; }
        .btn-back:hover { color: #0F172A; }
        .resume-card { background: #FFFFFF; border-radius: 12px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); cursor: pointer; transition: box-shadow 0.15s; }
        .resume-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .drop-zone { border: 2px dashed #CBD5E1; border-radius: 12px; background: rgba(255,255,255,0.5); transition: border-color 0.2s, background 0.2s; cursor: pointer; }
        .drop-zone.dragover { border-color: #137FEC; background: rgba(19,127,236,0.04); }
        .drop-zone:hover { border-color: #94A3B8; }
      `}</style>

      {/* HEADER */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💼</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', lineHeight: '22px' }}>Apply for Senior Designer</div>
            <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>Job Ref: #10924-SD</div>
          </div>
        </div>
        {/* ✅ Close → back to jobs */}
        <button onClick={() => navigate('/jobs')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#475569', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>✕</button>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, padding: '0 192px' }}>
        <div style={{ width: '100%', maxWidth: '896px', padding: '32px 24px' }}>

          {/* PROGRESS STEPPER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#137FEC' }}>Step 2 of 4</span>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>50% Complete</span>
            </div>
            <div style={{ position: 'relative', height: 10, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: '#137FEC', borderRadius: '9999px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {steps.map((step) => (
                <span key={step.label} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: step.idx === 1 ? '#137FEC' : '#64748B', opacity: step.idx === 1 ? 1 : 0.5 }}>{step.label}</span>
              ))}
            </div>
          </div>

          {/* PAGE HEADER */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px', marginBottom: '8px' }}>Select your resume</h1>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: '28px' }}>Choose one of your saved documents or upload a fresh version for this application.</p>
          </div>

          {/* SAVED RESUMES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            <div style={{ padding: '0 4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#64748B', letterSpacing: '1.4px', textTransform: 'uppercase' }}>Saved Resumes</span>
            </div>
            {resumes.map((resume) => {
              const isSelected = selectedResume === resume.id;
              return (
                <div key={resume.id} className="resume-card" style={{ border: isSelected ? '2px solid #137FEC' : '1px solid #E2E8F0', padding: '20px', display: 'flex', gap: '24px', alignItems: 'flex-start' }} onClick={() => setSelectedResume(resume.id)}>
                  <ResumePreview selected={isSelected} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: isSelected ? 160 : 120, paddingTop: '4px', paddingBottom: '4px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>{resume.name}</span>
                        {isSelected && (<span style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC', fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px' }}>Selected</span>)}
                      </div>
                      <span style={{ fontSize: '14px', color: '#64748B' }}>{resume.updated}</span>
                      {isSelected && (
                        <div style={{ display: 'flex', gap: '8px', paddingTop: '12px' }}>
                          {['📄 PDF', '🌐 English'].map(tag => (<span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#F1F5F9', color: '#475569', fontSize: '12px', padding: '4px 8px', borderRadius: '4px' }}>{tag}</span>))}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '24px' }}>
                      {isSelected ? (
                        <>
                          {/* ✅ Use this resume → cover letter step */}
                          <button className="btn-use" onClick={(e) => { e.stopPropagation(); navigate('/apply/1/cover-letter'); }}>✓ Use this resume</button>
                          {/* ✅ Edit details → resume builder */}
                          <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); navigate('/resume-builder'); }}>Edit details</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); setSelectedResume(resume.id); }}>Select</button>
                          {/* ✅ Delete → confirm then remove */}
                          <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); alert('Resume deleted!'); }}>Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* UPLOAD NEW */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            <div style={{ padding: '0 4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#64748B', letterSpacing: '1.4px', textTransform: 'uppercase' }}>Upload New</span>
            </div>
            <div className={`drop-zone${dragOver ? ' dragover' : ''}`} style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0', minHeight: '249px' }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              onClick={() => document.getElementById('resume-upload').click()}>
              <input id="resume-upload" type="file" accept=".pdf,.docx" style={{ display: 'none' }} />
              <div style={{ width: 56, height: 56, background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>📄</div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Upload a new resume</h4>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px', textAlign: 'center' }}>Drag and drop your file here, or click to browse</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                {['✓ PDF, DOCX', '✓ MAX 5MB'].map(label => (<span key={label} style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', letterSpacing: '-0.3px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>{label}</span>))}
              </div>
            </div>
          </div>

          {/* ACTION FOOTER */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* ✅ Back → go back */}
            <button className="btn-back" onClick={() => navigate(-1)}>
              <span style={{ fontSize: '16px' }}>←</span> Back
            </button>
            {/* ✅ Continue → cover letter step */}
            <button className="btn-primary" onClick={() => navigate('/apply/1/cover-letter')}>Continue to Portfolio</button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <p style={{ fontSize: '14px', color: '#94A3B8', textAlign: 'center' }}>© 2024 TechHire Recruitment Platform. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* ✅ Footer links */}
          <span onClick={() => navigate('/privacy')}   style={{ fontSize: '14px', color: '#94A3B8', cursor: 'pointer' }}>Privacy Policy</span>
          <span onClick={() => navigate('/platform')}  style={{ fontSize: '14px', color: '#94A3B8', cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
};

export default ResumeSelection;