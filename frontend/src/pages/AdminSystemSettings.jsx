import React, { useState } from 'react';

const AdminSystemSettings = () => {
  const [activeNav, setActiveNav] = useState('General');
  const [portalName, setPortalName] = useState('GlobalTech Careers');
  const [supportEmail, setSupportEmail] = useState('support@globaltech.jobs');
  const [seoDescription, setSeoDescription] = useState(
    'The premier destination for technology professionals and world-class engineering teams to connect and build the future.'
  );
  const [smtpHost, setSmtpHost] = useState('smtp.sendgrid.net');
  const [smtpPort, setSmtpPort] = useState('587');
  const [encryption, setEncryption] = useState('STARTTLS');
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('1 hour');

  const navItems = [
    { label: 'General', icon: '⚙️' },
    { label: 'Integrations', icon: '🔗' },
    { label: 'Email SMTP', icon: '✉️' },
    { label: 'Security', icon: '🛡️' },
    { label: 'Logs', icon: '🗂️' },
  ];

  const integrations = [
    {
      name: 'LinkedIn OAuth 2.0',
      desc: 'Connected: jobportal_production_client',
      iconBg: '#DBEAFE',
      iconColor: '#2563EB',
      action: 'Disconnect',
      actionColor: '#475569',
      connected: true,
    },
    {
      name: 'Stripe Payment Gateway',
      desc: 'Mode: Live',
      iconBg: '#DCFCE7',
      iconColor: '#16A34A',
      action: 'Configure',
      actionColor: '#137FEC',
      connected: false,
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, select { font-family: 'Inter', sans-serif; }
        input:focus, textarea:focus, select:focus { outline: 2px solid #137FEC; outline-offset: -1px; }
        .settings-nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: background 0.15s; width: 100%; border: none; background: transparent; font-family: 'Inter', sans-serif; }
        .settings-nav-link:hover { background: #F1F5F9; }
        .settings-nav-link.active { background: rgba(19,127,236,0.1); }
        .settings-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; }
        .settings-card-header { padding: 24px; border-bottom: 1px solid #F1F5F9; }
        .form-input { box-sizing: border-box; width: 100%; height: 42px; background: #fff; border: 1px solid #CBD5E1; border-radius: 8px; padding: 8px 12px; font-size: 16px; color: #0F172A; font-family: 'Inter', sans-serif; }
        .form-input::placeholder { color: #6B7280; }
        .form-textarea { box-sizing: border-box; width: 100%; height: 90px; background: #fff; border: 1px solid #CBD5E1; border-radius: 8px; padding: 8px 12px; font-size: 16px; color: #0F172A; font-family: 'Inter', sans-serif; resize: vertical; }
        .integration-row { display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 16px; background: #F8FAFC; border-radius: 8px; }
        .toggle-track { position: relative; width: 44px; height: 24px; background: #137FEC; border-radius: 9999px; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
        .toggle-track.off { background: #CBD5E1; }
        .toggle-thumb { position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 9999px; top: 2px; right: 2px; transition: right 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
        .toggle-thumb.off { right: 22px; }
      `}</style>

      {/* HEADER */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 80px', height: '65px', background: '#fff',
        borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Left: Logo + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '26px', height: '26px', background: '#137FEC', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff' }}>🌐</div>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>oobPortal Admin</span>
          </div>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 12px', color: '#64748B', fontSize: '13px' }}>🔍</span>
            <input placeholder="Search settings..." style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#0F172A', flex: 1, fontFamily: 'Inter,sans-serif' }} />
          </div>
        </div>

        {/* Right: Nav + icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Dashboard', 'oobs', 'Users'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569', textDecoration: 'none' }}>{l}</a>
            ))}
            <a href="#" style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', textDecoration: 'none', borderBottom: '2px solid #137FEC', paddingBottom: '4px' }}>Settings</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>❓</button>
            <div style={{ width: '40px', height: '40px', background: '#E2E8F0', border: '1px solid #E2E8F0', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer' }}>👤</div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 80px', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

        {/* SIDEBAR */}
        <aside style={{ width: '256px', flexShrink: 0 }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Settings</h2>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '1.2px', textTransform: 'uppercase' }}>Platform Control</span>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => (
              <button
                key={item.label}
                className={`settings-nav-link${activeNav === item.label ? ' active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: activeNav === item.label ? '600' : '400',
                  color: activeNav === item.label ? '#137FEC' : '#475569',
                }}>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* CONTENT */}
        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Page Title */}
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '8px' }}>System Settings</h1>
            <p style={{ fontSize: '18px', color: '#64748B' }}>Configure global platform parameters, API access, and security protocols.</p>
          </div>

          {/* PLATFORM METADATA */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: '20px', height: '20px', background: '#137FEC', borderRadius: '4px', display: 'inline-block', flexShrink: 0 }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Platform Metadata</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Global SEO and branding information used across the job portal.</p>
            </div>
            <div style={{ padding: '24px' }}>
              {/* Row 1: Portal Name + Support Email */}
              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Portal Name</label>
                  <input className="form-input" value={portalName} onChange={e => setPortalName(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Support Email</label>
                  <input className="form-input" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} />
                </div>
              </div>
              {/* SEO Description */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>SEO Description</label>
                <textarea className="form-textarea" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} />
              </div>
            </div>
          </div>

          {/* API INTEGRATIONS */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: '22px', height: '22px', background: '#137FEC', borderRadius: '4px', display: 'inline-block', flexShrink: 0 }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>API Integrations</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Connect third-party services like LinkedIn, Stripe, and Google Jobs.</p>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {integrations.map(intg => (
                <div key={intg.name} className="integration-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: intg.iconBg, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: '22px', height: '16px', background: intg.iconColor, borderRadius: '2px' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{intg.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{intg.desc}</div>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: intg.actionColor, fontFamily: 'Inter,sans-serif', padding: '4px 0' }}>
                    {intg.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SMTP CONFIGURATION */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: '20px', height: '16px', background: '#137FEC', borderRadius: '3px', display: 'inline-block', flexShrink: 0 }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>SMTP Configuration</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Configure the outbound mail server for notifications and system alerts.</p>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>SMTP Host</label>
                <input className="form-input" value={smtpHost} onChange={e => setSmtpHost(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Port</label>
                <input className="form-input" value={smtpPort} onChange={e => setSmtpPort(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Encryption</label>
                <select className="form-input" value={encryption} onChange={e => setEncryption(e.target.value)}>
                  <option>STARTTLS</option>
                  <option>SSL/TLS</option>
                  <option>None</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECURITY SETTINGS */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: '16px', height: '20px', background: '#137FEC', borderRadius: '3px', display: 'inline-block', flexShrink: 0 }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Security Settings</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Manage platform access control and authentication requirements.</p>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 2FA Toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Two-Factor Authentication (2FA)</div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>Require all administrative users to use 2aA.</div>
                </div>
                <div
                  className={`toggle-track${twoFA ? '' : ' off'}`}
                  onClick={() => setTwoFA(p => !p)}
                >
                  <div className={`toggle-thumb${twoFA ? '' : ' off'}`} />
                </div>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#F1F5F9' }} />
              {/* Session Timeout */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Session Timeout</div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>Automatically logout users after inactivity.</div>
                </div>
                <select
                  value={sessionTimeout}
                  onChange={e => setSessionTimeout(e.target.value)}
                  style={{ boxSizing: 'border-box', width: '128px', height: '38px', background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0 12px', fontSize: '14px', fontFamily: 'Inter,sans-serif', color: '#0F172A', cursor: 'pointer' }}
                >
                  <option>30 min</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px' }}>
            <button style={{ padding: '8px 24px', height: '42px', background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              Discard Changes
            </button>
            <button style={{ padding: '9px 32px', height: '42px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)' }}>
              Save Settings
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '40px 80px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', color: '#94A3B8' }}>🌐</span>
            <span style={{ fontSize: '14px', color: '#94A3B8' }}>© 2024 oobPortal Admin Dashboard. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['API Documentation', 'System Status', 'Privacy Policy'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminSystemSettings;