import React, { useState, useRef } from 'react';

const CompanyProfileSetup = () => {
  const [form, setForm] = useState({ name: '', website: '', industry: '', size: '', about: '' });
  const [logoPreview, setLogoPreview] = useState(null);
  const fileRef = useRef(null);

  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Media', 'Other'];
  const sizes = ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+'];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const upcomingSteps = [
    { num: '2', label: 'Team Members' },
    { num: '3', label: 'Billing Info' },
    { num: '4', label: 'Review & Launch' },
  ];

  const charCount = form.about.length;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, select { font-family: 'Inter', sans-serif; }
        input::placeholder, textarea::placeholder { color: #6B7280; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #137FEC !important; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        a { text-decoration: none; color: inherit; }
        .field-label { font-size: 14px; font-weight: 600; color: #334155; margin-bottom: 8px; display: block; }
        .field-input { width: 100%; height: 41px; padding: 10px 12px; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A; }
        .field-select { width: 100%; height: 42px; padding: 9px 12px; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 16px; color: #0F172A; appearance: none; cursor: pointer; }
        .btn-primary { display: flex; align-items: center; gap: 8px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; padding: 8.5px 32px; box-shadow: 0px 4px 6px -1px rgba(19,127,236,0.2), 0px 2px 4px -2px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-primary:hover { background: #0e6fd4; }
        .btn-cancel { display: flex; align-items: center; justify-content: center; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #334155; cursor: pointer; padding: 8px 24px; transition: background 0.15s; }
        .btn-cancel:hover { background: #F8FAFC; }
        .btn-upload { display: flex; align-items: center; gap: 8px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; padding: 8px 16px; transition: background 0.2s; }
        .btn-upload:hover { background: #0e6fd4; }
        .btn-remove { background: #F1F5F9; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #334155; cursor: pointer; padding: 8px 16px; transition: background 0.15s; }
        .btn-remove:hover { background: #E2E8F0; }
        .btn-draft { background: none; border: none; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #475569; cursor: pointer; }
        .btn-draft:hover { color: #0F172A; }
        .select-wrap { position: relative; }
        .select-wrap::after { content: '▾'; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #6B7280; pointer-events: none; font-size: 14px; }
        .footer-link { font-size: 14px; color: #64748B; text-decoration: none; }
        .footer-link:hover { color: #137FEC; }
        .step-card { display: flex; align-items: center; gap: 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; flex: 1; opacity: 0.6; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 80px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💼</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>Employer Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {['🔔', '❓'].map(icon => (
            <button key={icon} style={{ width: 40, height: 40, background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</button>
          ))}
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '16px', color: '#137FEC', cursor: 'pointer',
          }}>JD</div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '800px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* PROGRESS STEPPER */}
          <div style={{ padding: '0 16px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>Create your company profile</h1>
                <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>Step 1 of 4: General Information</p>
              </div>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#137FEC' }}>25% Complete</span>
            </div>
            <div style={{ height: 8, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '25%', background: '#137FEC', borderRadius: '9999px' }} />
            </div>
          </div>

          {/* MAIN CARD */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>

            {/* Section Header */}
            <div style={{ padding: '32px', borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Company Identity</h3>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Tell us the basics about your business to get started.</p>
            </div>

            {/* Form Content */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Logo Upload */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Logo preview box */}
                <div style={{
                  width: 128, height: 128, flexShrink: 0,
                  border: '2px dashed #CBD5E1', borderRadius: '12px',
                  background: logoPreview ? 'transparent' : '#F1F5F9',
                  overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative',
                }} onClick={() => fileRef.current?.click()}>
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '32px', opacity: 0.3 }}>🏢</span>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
                </div>

                {/* Logo info + buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>Company Logo</p>
                  <p style={{ fontSize: '14px', color: '#64748B' }}>Upload a high-resolution logo. PNG or JPG, at least 400×400px.</p>
                  <div style={{ display: 'flex', gap: '12px', paddingTop: '12px' }}>
                    <button className="btn-upload" onClick={() => fileRef.current?.click()}>
                      ⬆ Upload Logo
                    </button>
                    {logoPreview && (
                      <button className="btn-remove" onClick={() => setLogoPreview(null)}>Remove</button>
                    )}
                    {!logoPreview && <button className="btn-remove">Remove</button>}
                  </div>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div style={{ position: 'relative', height: '164px' }}>
                {/* Company Name */}
                <div style={{ position: 'absolute', left: 0, right: '51%', top: 0 }}>
                  <label className="field-label">Company Name</label>
                  <input className="field-input" placeholder="e.g. Acme Corp" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>

                {/* Website URL */}
                <div style={{ position: 'absolute', left: '51%', right: 0, top: 0 }}>
                  <label className="field-label">Website URL</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#94A3B8', pointerEvents: 'none' }}>https://</span>
                    <input className="field-input" placeholder="www.example.com" value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} style={{ paddingLeft: '64px' }} />
                  </div>
                </div>

                {/* Industry */}
                <div style={{ position: 'absolute', left: 0, right: '51%', top: 94 }}>
                  <label className="field-label">Industry</label>
                  <div className="select-wrap">
                    <select className="field-select" value={form.industry} onChange={e => setForm(p => ({ ...p, industry: e.target.value }))}>
                      <option value="">Select Industry</option>
                      {industries.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                {/* Company Size */}
                <div style={{ position: 'absolute', left: '51%', right: 0, top: 94 }}>
                  <label className="field-label">Company Size</label>
                  <div className="select-wrap">
                    <select className="field-select" value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))}>
                      <option value="">Select size</option>
                      {sizes.map(s => <option key={s} value={s}>{s} employees</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* About the Company (textarea) */}
              <div>
                <label className="field-label">About the Company</label>
                <textarea
                  placeholder="Write a brief description about your company, mission, and culture..."
                  value={form.about}
                  onChange={e => setForm(p => ({ ...p, about: e.target.value }))}
                  style={{
                    width: '100%', height: '114px', padding: '8px 12px',
                    background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px',
                    fontSize: '16px', color: '#0F172A', resize: 'vertical', lineHeight: '24px',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <p style={{ fontSize: '12px', color: '#94A3B8' }}>Minimum 100 characters recommended.</p>
                  <p style={{ fontSize: '12px', color: charCount >= 100 ? '#16A34A' : '#94A3B8' }}>{charCount} chars</p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0',
            }}>
              <button className="btn-draft">Save as Draft</button>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-cancel">Cancel</button>
                <button className="btn-primary">Continue →</button>
              </div>
            </div>
          </div>

          {/* UPCOMING STEPS PREVIEW */}
          <div style={{ paddingTop: '32px', display: 'flex', gap: '16px' }}>
            {upcomingSteps.map(step => (
              <div key={step.num} className="step-card">
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '16px', color: '#94A3B8', flexShrink: 0,
                }}>{step.num}</div>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Help Center', 'Terms of Service', 'Privacy Policy'].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>
        <p style={{ fontSize: '14px', color: '#64748B' }}>© 2024 Employer Portal Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CompanyProfileSetup;