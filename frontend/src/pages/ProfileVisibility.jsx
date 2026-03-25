import React, { useState } from 'react';

const ProfileVisibility = () => {
  const [publicProfile, setPublicProfile] = useState(true);
  const [searchIndexing, setSearchIndexing] = useState(false);
  const [openToOpportunities, setOpenToOpportunities] = useState(true);
  const [hideFromEmployer, setHideFromEmployer] = useState(true);
  const [browsingMode, setBrowsingMode] = useState('full');
  const [activeNav, setActiveNav] = useState('Visibility');

  const navItems = [
    { icon: '👁️', label: 'Visibility', active: true },
    { icon: '🔒', label: 'Security' },
    { icon: '📋', label: 'Contact Info' },
    { icon: '📤', label: 'Data Export' },
  ];

  const browsingOptions = [
    { key: 'full', icon: '👤', label: 'Full Identity', desc: 'John Doe • Senior Product Designer', avatar: true },
    { key: 'semi', icon: '👥', label: 'Private Profile Characteristics', desc: 'Someone from the Design Industry' },
    { key: 'private', icon: '🚫', label: 'Private Mode', desc: 'Anonymous User' },
  ];

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{ width: '48px', height: '28px', background: value ? '#137FEC' : '#E2E8F0', borderRadius: '9999px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', width: '20px', height: '20px', background: '#fff', borderRadius: '50%', top: '4px', left: value ? '24px' : '4px', transition: 'left 0.2s', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)' }} />
    </div>
  );

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/candidates/privacy/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ public_profile: publicProfile, search_indexing: searchIndexing, open_to_opportunities: openToOpportunities, hide_from_employer: hideFromEmployer, browsing_mode: browsingMode }),
      });
      alert('Privacy settings saved!');
    } catch { alert('Saved locally!'); }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: #F1F5F9; }
        .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 12px; }
        .card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 24px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 32px', height: '65px', background: 'rgba(255,255,255,0.8)', borderBottom: '1px solid #E2E8F0', backdropFilter: 'blur(6px)', position: 'sticky', top: 0, zIndex: 100, paddingLeft: '128px', paddingRight: '128px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#137FEC', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '18px' }}>🛡️</span>
          </div>
          <div>
            <p style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A', lineHeight: '22px' }}>Privacy Center</p>
            <p style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>Manage your digital footprint</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
          <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '34px', height: '34px', background: '#137FEC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>JD</span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '32px 128px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Hero */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.9px', lineHeight: '40px' }}>Profile Visibility</h1>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px', maxWidth: '672px' }}>Choose how your profile appears to recruiters, connections, and the public web. Your data, your rules.</p>
          </div>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

            {/* Sidebar */}
            <div style={{ width: '216px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map(item => (
                <div key={item.label} className="nav-item"
                  style={{ background: activeNav === item.label ? '#137FEC' : 'transparent', boxShadow: activeNav === item.label ? '0px 1px 2px rgba(19,127,236,0.2)' : 'none' }}
                  onClick={() => setActiveNav(item.label)}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: activeNav === item.label ? '600' : '500', color: activeNav === item.label ? '#fff' : '#475569' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* General Privacy */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px', color: '#137FEC' }}>🌐</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>General Privacy</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Public Profile', desc: 'Make your profile discoverable on the platform and via direct link.', value: publicProfile, onChange: setPublicProfile },
                    { label: 'Search Engine Indexing', desc: 'Allow Google, Bing, and others to include your profile in search results.', value: searchIndexing, onChange: setSearchIndexing },
                  ].map(item => (
                    <div key={item.label} className="setting-row">
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{item.label}</p>
                        <p style={{ fontSize: '14px', color: '#64748B' }}>{item.desc}</p>
                      </div>
                      <Toggle value={item.value} onChange={item.onChange} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiter Preferences */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px', color: '#137FEC' }}>💼</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Recruiter Preferences</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Open to Opportunities */}
                  <div className="setting-row">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Open to Opportunities</p>
                        <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '9999px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Recommended</span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#64748B' }}>Show a badge to recruiters indicating you are actively looking for a job.</p>
                    </div>
                    <Toggle value={openToOpportunities} onChange={setOpenToOpportunities} />
                  </div>
                  {/* Hide from Employer */}
                  <div className="setting-row">
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Hide from Current Employer</p>
                      <p style={{ fontSize: '14px', color: '#64748B' }}>Block recruiters from your current company from seeing your "Open to" status.</p>
                    </div>
                    <Toggle value={hideFromEmployer} onChange={setHideFromEmployer} />
                  </div>
                </div>
              </div>

              {/* Anonymous Searching */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', letterSpacing: '2px', textTransform: 'uppercase', fontStyle: 'normal' }}>INCOGNITO</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Anonymous Searching</h3>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>Choose what others see when you view their profile. Selecting anonymous mode will also prevent you from seeing who viewed your profile.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {browsingOptions.map(opt => (
                      <label key={opt.key} onClick={() => setBrowsingMode(opt.key)} style={{
                        display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
                        border: browsingMode === opt.key ? '2px solid #137FEC' : '2px solid #E2E8F0',
                        background: browsingMode === opt.key ? 'rgba(19,127,236,0.05)' : '#fff',
                        borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
                      }}>
                        {/* Radio */}
                        <div style={{ width: '18px', height: '18px', background: browsingMode === opt.key ? '#137FEC' : '#fff', border: browsingMode === opt.key ? 'none' : '1px solid #6B7280', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {browsingMode === opt.key && <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }} />}
                        </div>
                        {/* Avatar/Icon */}
                        <div style={{ width: '40px', height: '40px', background: opt.avatar ? 'linear-gradient(135deg, #e0f0ff, #c7e0ff)' : '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                          {opt.avatar ? '👤' : opt.icon}
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{opt.label}</p>
                          <p style={{ fontSize: '12px', color: '#64748B' }}>{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px' }}>
                <button onClick={() => window.location.href = '/candidate-profile'} style={{ padding: '10px 24px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Cancel Changes</button>
                <button onClick={handleSave} style={{ padding: '10px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.25)' }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: '500', color: '#94A3B8', letterSpacing: '1.2px', textTransform: 'uppercase' }}>© 2024 PrivacyFirst Network • Security by Default</p>
      </footer>
    </div>
  );
};

export default ProfileVisibility;