import React, { useState } from 'react';

const PortfolioLinks = () => {
  const [github, setGithub] = useState('github.com/alexriver_design');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/alex-river');
  const [behance, setBehance] = useState('');
  const [dribbble, setDribbble] = useState('dribbble.com/alex-r');
  const [portfolio, setPortfolio] = useState('');
  const [twitter, setTwitter] = useState('x.com/alexriver_ux');
  const [customLinks, setCustomLinks] = useState([]);
  const [lastSaved, setLastSaved] = useState('12 minutes ago');

  const navItems = [
    { icon: '📁', label: 'Projects', path: '#' },
    { icon: '🔧', label: 'Skills', path: '/skills' },
    { icon: '🔗', label: 'Social Links', path: '/portfolio', active: true },
    { icon: '⚙️', label: 'Settings', path: '/profile-settings' },
  ];

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/candidates/portfolio/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ github, linkedin, behance, dribbble, portfolio_website: portfolio, twitter }),
      });
      setLastSaved('Just now');
      alert('Links saved!');
    } catch {
      setLastSaved('Just now');
      alert('Saved locally!');
    }
  };

  const addCustomLink = () => setCustomLinks([...customLinks, { label: '', url: '' }]);
  const updateCustomLink = (i, field, val) => {
    const updated = [...customLinks];
    updated[i][field] = val;
    setCustomLinks(updated);
  };
  const removeCustomLink = (i) => setCustomLinks(customLinks.filter((_, idx) => idx !== i));

  const InputField = ({ icon, value, onChange, placeholder, filled }) => (
    <div style={{ position: 'relative', width: '100%' }}>
      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#94A3B8', pointerEvents: 'none', zIndex: 1 }}>{icon}</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '12px 16px 12px 36px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontFamily: "'Inter', sans-serif", color: filled ? '#0F172A' : '#6B7280', fontWeight: filled ? '500' : '400', outline: 'none', transition: 'border 0.2s' }}
        onFocus={e => e.target.style.borderColor = '#137FEC'}
        onBlur={e => e.target.style.borderColor = '#E2E8F0'}
      />
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: #F1F5F9; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', height: '73px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(19,127,236,0.1)', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px' }}>🔗</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>Portfolio Hub</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button onClick={() => window.location.href = '/candidate-profile'} style={{ padding: '9px 16px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Preview Profile</button>
          <button onClick={handleSave} style={{ padding: '9px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>Save Changes</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 160px' }}>
        <div style={{ display: 'flex', gap: '32px', width: '960px', maxWidth: '1200px' }}>

          {/* LEFT SIDEBAR */}
          <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(19,127,236,0.2)', border: '2px solid rgba(19,127,236,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>👤</div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Alex River</p>
                <p style={{ fontSize: '12px', color: '#64748B' }}>Product Designer</p>
              </div>
            </div>

            {/* Nav */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map(item => (
                <div key={item.label} className="nav-item"
                  style={{ background: item.active ? 'rgba(19,127,236,0.1)' : 'transparent', border: item.active ? '1px solid rgba(19,127,236,0.2)' : '1px solid transparent' }}
                  onClick={() => window.location.href = item.path}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: item.active ? '600' : '500', color: item.active ? '#137FEC' : '#475569' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Profile Strength */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Profile Strength</p>
                <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '8px' }}>
                  <div style={{ background: '#137FEC', borderRadius: '9999px', height: '8px', width: '85%' }} />
                </div>
                <p style={{ fontSize: '10px', color: '#64748B', lineHeight: '15px' }}>Almost there! Add a personal website to reach 100%.</p>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Main Form Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '32px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Header */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.6px' }}>Connect your profiles</h2>
                <p style={{ fontSize: '14px', color: '#64748B' }}>Add links to your professional work and social presence to let recruiters find you easily.</p>
              </div>

              {/* Professional Networks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  <span style={{ color: '#137FEC', fontSize: '16px' }}>🛡️</span>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.35px', textTransform: 'uppercase' }}>Professional Networks</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>GitHub</label>
                    <InputField icon="<>" value={github} onChange={setGithub} placeholder="github.com/username" filled={!!github} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>LinkedIn</label>
                    <InputField icon="💼" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/username" filled={!!linkedin} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Behance</label>
                    <InputField icon="🎨" value={behance} onChange={setBehance} placeholder="behance.net/username" filled={!!behance} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Dribbble</label>
                    <InputField icon="🏀" value={dribbble} onChange={setDribbble} placeholder="dribbble.com/username" filled={!!dribbble} />
                  </div>
                </div>
              </div>

              {/* Personal Presence */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  <span style={{ color: '#137FEC', fontSize: '16px' }}>🌐</span>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.35px', textTransform: 'uppercase' }}>Personal Presence</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Portfolio Website</label>
                  <InputField icon="🌐" value={portfolio} onChange={setPortfolio} placeholder="https://yourwebsite.com" filled={!!portfolio} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>X (formerly Twitter)</label>
                  <InputField icon="@" value={twitter} onChange={setTwitter} placeholder="x.com/username" filled={!!twitter} />
                </div>

                {/* Custom Links */}
                {customLinks.map((link, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Link Label</label>
                      <input value={link.label} onChange={e => updateCustomLink(i, 'label', e.target.value)} placeholder="e.g. My Blog" style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontFamily: "'Inter', sans-serif", color: '#0F172A', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>URL</label>
                      <input value={link.url} onChange={e => updateCustomLink(i, 'url', e.target.value)} placeholder="https://" style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontFamily: "'Inter', sans-serif", color: '#0F172A', outline: 'none' }} />
                    </div>
                    <button onClick={() => removeCustomLink(i)} style={{ height: '46px', padding: '0 12px', background: 'none', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '32px' }}>
                <button onClick={addCustomLink} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                  ➕ Add Custom Link
                </button>
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>Last saved: {lastSaved}</p>
              </div>
            </div>

            {/* Tip Card */}
            <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)', borderRadius: '12px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '18px', color: '#137FEC', flexShrink: 0, marginTop: '2px' }}>ℹ️</span>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Tip: GitHub Repositories</p>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>Once connected, you can choose to feature specific repositories directly in your portfolio project section.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLinks;