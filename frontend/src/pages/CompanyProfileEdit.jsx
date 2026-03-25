import React, { useState } from 'react';

const CompanyProfileEdit = () => {
  const [activeTab, setActiveTab] = useState('Basic Info');
  const [form, setForm] = useState({
    name: 'TechFlow Solutions',
    industry: 'Software Development',
    tagline: '',
    about: "TechFlow Solutions is an enterprise-grade software development firm specializing in cloud-native applications and AI integration. Founded in 2015, we've helped over 200 Fortune 500 companies modernize their tech stack.",
    website: 'https://techflow.io',
    linkedin: 'linkedin.com/company/techflow',
    email: 'contact@techflow.io',
    phone: '+1 (555) 000-0000',
  });

  const tabs = [
    { label: 'Basic Info', icon: 'ℹ️' },
    { label: 'Brand Assets', icon: '🖼️' },
    { label: 'Culture & Values', icon: '❤️' },
    { label: 'Office Locations', icon: '🏢' },
  ];

  const industries = ['Software Development', 'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Media', 'Other'];

  const completionItems = [
    { label: 'Basic information added', done: true },
    { label: 'Logo and Brand uploaded', done: true },
    { label: 'Office locations missing', done: false },
  ];

  const InputField = ({ label, value, onChange, placeholder, icon, type = 'text' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#94A3B8', pointerEvents: 'none' }}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%', height: 46,
            padding: icon ? '12px 12px 12px 44px' : '12px 16px',
            background: '#F6F7F8', border: '1px solid #E2E8F0',
            borderRadius: '8px', fontSize: '14px', color: '#0F172A',
            fontFamily: 'inherit', outline: 'none',
          }}
          onFocus={e => { e.target.style.borderColor = '#137FEC'; e.target.style.boxShadow = '0 0 0 3px rgba(19,127,236,0.1)'; }}
          onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
        />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea { font-family: 'Inter', sans-serif; }
        textarea::placeholder { color: #6B7280; }
        select { font-family: 'Inter', sans-serif; appearance: none; }
        .btn-cancel { background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #334155; cursor: pointer; padding: 8.5px 24px 9.5px; min-width: 84px; transition: background 0.15s; }
        .btn-cancel:hover { background: #F8FAFC; }
        .btn-save { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 9.5px 24px 10.5px; min-width: 84px; transition: background 0.2s; }
        .btn-save:hover { background: #0e6fd4; }
        .tab-btn { display: flex; align-items: center; gap: 8px; padding: 8px 24px 16px; border: none; background: none; cursor: pointer; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 500; color: #64748B; border-bottom: 2px solid transparent; transition: color 0.15s; white-space: nowrap; }
        .tab-btn.active { color: #137FEC; font-weight: 700; border-bottom-color: #137FEC; }
        .tab-btn:hover { color: #137FEC; }
        .select-wrap { position: relative; }
        .select-wrap::after { content: '▾'; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #6B7280; pointer-events: none; }
        .section-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        .action-btn { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #E2E8F0; border-radius: 12px; background: #FFFFFF; cursor: pointer; width: 100%; font-family: 'Inter',sans-serif; transition: background 0.15s; }
        .action-btn:hover { background: #F8FAFC; }
        .delete-btn { display: flex; align-items: center; padding: 16px; border: 1px solid #FECDD3; border-radius: 12px; background: rgba(255,241,242,0.3); cursor: pointer; width: 100%; font-family: 'Inter',sans-serif; gap: 12px; transition: background 0.15s; }
        .delete-btn:hover { background: rgba(255,241,242,0.6); }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '16px 160px', height: 73,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 25, height: 25, background: '#137FEC', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⊞</div>
          <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>Edit Profile</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-cancel">Cancel</button>
          <button className="btn-save">Save Changes</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, padding: '0 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>

          {/* PROFILE HERO */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              background: '#FFFFFF', border: '1px solid #E2E8F0',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px',
              padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '24px',
            }}>
              {/* Logo + edit button */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 128, height: 128, borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0d3040 0%, #1a5c6e 50%, #137FEC 100%)',
                  border: '2px solid #F1F5F9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '40px', overflow: 'hidden',
                }}>🏢</div>
                <button style={{
                  position: 'absolute', bottom: -8, right: -8,
                  width: 30, height: 30, borderRadius: '50%',
                  background: '#137FEC', border: '2px solid #FFFFFF',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', color: '#fff',
                  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                }}>✏️</button>
              </div>

              {/* Company info */}
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>TechFlow Solutions</h2>
                <p style={{ fontSize: '16px', fontWeight: 500, color: '#64748B', marginTop: '2px' }}>Enterprise Software Development</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>📍</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>San Francisco, CA</span>
                  <span style={{ color: '#CBD5E1', opacity: 0.3 }}>•</span>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>👥</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>500-1000 employees</span>
                </div>
              </div>
            </div>
          </div>

          {/* TAB NAVIGATION */}
          <div style={{ marginBottom: '32px', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex' }}>
              {tabs.map(tab => (
                <button
                  key={tab.label}
                  className={`tab-btn${activeTab === tab.label ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  <span style={{ fontSize: '15px' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

            {/* LEFT: Main Form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>

              {/* General Information */}
              <div className="section-card">
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>General Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Name + Industry row */}
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>Company Name</label>
                      <input
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        style={{ width: '100%', height: 46, padding: '12px 16px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', fontFamily: 'inherit', outline: 'none' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>Industry</label>
                      <div className="select-wrap">
                        <select
                          value={form.industry}
                          onChange={e => setForm(p => ({ ...p, industry: e.target.value }))}
                          style={{ width: '100%', height: 46, padding: '12px 36px 12px 16px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', cursor: 'pointer', outline: 'none' }}
                        >
                          {industries.map(i => <option key={i}>{i}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>Tagline</label>
                    <input
                      value={form.tagline}
                      onChange={e => setForm(p => ({ ...p, tagline: e.target.value }))}
                      placeholder="e.g. Accelerating Digital Transformation"
                      style={{ width: '100%', height: 46, padding: '13px 16px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', fontFamily: 'inherit', outline: 'none' }}
                    />
                  </div>

                  {/* About */}
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>About the Company</label>
                    <textarea
                      value={form.about}
                      onChange={e => setForm(p => ({ ...p, about: e.target.value }))}
                      rows={5}
                      style={{ width: '100%', padding: '12px 16px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: '20px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Social */}
              <div className="section-card">
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Contact &amp; Social</h3>
                <div style={{ position: 'relative', height: '172px' }}>
                  {/* Official Website */}
                  <div style={{ position: 'absolute', left: 0, right: '51%', top: 0 }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>Official Website</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#94A3B8' }}>🌐</span>
                      <input value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} style={{ width: '100%', height: 46, padding: '12px 12px 12px 44px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', fontFamily: 'inherit', outline: 'none' }} />
                    </div>
                  </div>
                  {/* LinkedIn */}
                  <div style={{ position: 'absolute', left: '51%', right: 0, top: 0 }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>LinkedIn Profile</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#94A3B8' }}>🔗</span>
                      <input value={form.linkedin} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} style={{ width: '100%', height: 46, padding: '12px 12px 12px 44px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', fontFamily: 'inherit', outline: 'none' }} />
                    </div>
                  </div>
                  {/* Contact Email */}
                  <div style={{ position: 'absolute', left: 0, right: '51%', top: 98 }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>Contact Email</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#94A3B8' }}>✉️</span>
                      <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={{ width: '100%', height: 46, padding: '12px 12px 12px 44px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', fontFamily: 'inherit', outline: 'none' }} />
                    </div>
                  </div>
                  {/* Phone */}
                  <div style={{ position: 'absolute', left: '51%', right: 0, top: 98 }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>Phone Number</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#94A3B8' }}>📞</span>
                      <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={{ width: '100%', height: 46, padding: '12px 12px 12px 44px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', color: '#0F172A', fontFamily: 'inherit', outline: 'none' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div style={{ width: '352px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Public Visibility Card */}
              <div style={{
                background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)',
                borderRadius: '12px', padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '15px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px', color: '#137FEC' }}>👁️</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Public Visibility</h4>
                </div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>
                  Your profile is currently visible to candidates and partners. Updating this info will reflect across all platforms.
                </p>
                <div style={{
                  background: '#FFFFFF', borderRadius: '8px', padding: '12px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>Profile Status</span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: '#ECFDF5', borderRadius: '9999px', padding: '4px 10px',
                    fontSize: '12px', fontWeight: 700, color: '#059669', textTransform: 'uppercase',
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    Active
                  </span>
                </div>
              </div>

              {/* Profile Completeness */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Profile Completeness</h4>

                {/* Progress bar */}
                <div>
                  <div style={{ height: 10, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '85%', background: '#137FEC', borderRadius: '9999px' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', lineHeight: '16px' }}>
                    85% complete. Add your office locations to reach 100%.
                  </p>
                </div>

                {/* Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {completionItems.map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: 17, height: 17, borderRadius: '50%', flexShrink: 0,
                        background: item.done ? '#10B981' : '#CBD5E1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', color: '#fff',
                      }}>{item.done ? '✓' : ''}</div>
                      <span style={{ fontSize: '14px', color: '#475569' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button className="action-btn">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px', color: '#94A3B8' }}>↗</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Share Public Profile</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>›</span>
                </button>

                <button className="delete-btn">
                  <span style={{ fontSize: '16px', color: '#E11D48' }}>🗑️</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#E11D48' }}>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyProfileEdit;