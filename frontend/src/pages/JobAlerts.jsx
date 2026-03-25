import React, { useState } from 'react';

const JobAlerts = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [frequency, setFrequency] = useState('Instant (As jobs are posted)');
  const [emailCheck, setEmailCheck] = useState(true);
  const [pushCheck, setPushCheck] = useState(false);
  const [activeNav, setActiveNav] = useState('Job Alerts');

  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Product Designer', location: 'Remote', freq: 'Daily', channel: 'Email', active: true },
    { id: 2, title: 'Frontend Engineer', location: 'New York, NY', freq: 'Instant', channel: 'Push', active: false },
  ]);

  const navItems = [
    { icon: '🔍', label: 'Find Jobs', path: '/jobs' },
    { icon: '🔔', label: 'Job Alerts', path: '/alerts', active: true },
    { icon: '📋', label: 'Applications', path: '/candidate-dashboard' },
    { icon: '⚙️', label: 'Settings', path: '/profile-settings' },
  ];

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{ width: '44px', height: '24px', background: value ? '#137FEC' : '#E2E8F0', borderRadius: '9999px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', width: '20px', height: '20px', background: '#fff', borderRadius: '50%', top: '2px', left: value ? '22px' : '2px', transition: 'left 0.2s', boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' }} />
    </div>
  );

  const handleCreate = async () => {
    if (!keyword.trim()) { alert('Please enter a job title or keyword.'); return; }
    const newAlert = { id: Date.now(), title: keyword, location: location || 'Anywhere', freq: frequency.split(' ')[0], channel: emailCheck ? 'Email' : 'Push', active: true };
    setAlerts([...alerts, newAlert]);
    setKeyword(''); setLocation('');
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/notifications/alerts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ keyword, location, frequency, email: emailCheck, push: pushCheck }),
      });
    } catch { /* saved locally */ }
  };

  const toggleAlert = (id) => setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const deleteAlert = (id) => setAlerts(alerts.filter(a => a.id !== id));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 13px 16px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 14px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
        .input-field::placeholder { color: #6B7280; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: #F1F5F9; }
        .select-field { width: 100%; padding: 12px 16px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 14px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; appearance: none; cursor: pointer; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', height: '61px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '16px' }}>💼</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>CareerHub</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button style={{ width: '32px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', borderRadius: '50%' }}>🔔</button>
          <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: '#137FEC' }}>👤</span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '32px 80px' }}>
        <div style={{ display: 'flex', gap: '32px', maxWidth: '1152px', margin: '0 auto', padding: '0 16px' }}>

          {/* LEFT SIDEBAR */}
          <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => (
              <div key={item.label} className="nav-item"
                style={{ background: item.active ? 'rgba(19,127,236,0.1)' : 'transparent' }}
                onClick={() => { setActiveNav(item.label); window.location.href = item.path; }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: item.active ? '600' : '500', color: item.active ? '#137FEC' : '#0F172A' }}>{item.label}</span>
              </div>
            ))}
          </aside>

          {/* RIGHT CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.75px' }}>Job Alerts</h1>
              <p style={{ fontSize: '16px', color: '#64748B' }}>Manage how and when you receive notifications for new job opportunities.</p>
            </div>

            {/* Create Alert Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px', color: '#137FEC' }}>➕</span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Create New Alert</h3>
              </div>

              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Job Title or Keywords</label>
                  <input className="input-field" placeholder="e.g. Senior UI Designer" value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreate()} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Location</label>
                  <input className="input-field" placeholder="e.g. Remote, San Francisco" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Frequency</label>
                  <div style={{ position: 'relative' }}>
                    <select className="select-field" value={frequency} onChange={e => setFrequency(e.target.value)}>
                      {['Instant (As jobs are posted)', 'Daily Digest', 'Weekly Summary'].map(f => <option key={f}>{f}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Delivery Channel</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
                      <div onClick={() => setEmailCheck(!emailCheck)} style={{ width: '18px', height: '18px', background: emailCheck ? '#137FEC' : '#fff', border: emailCheck ? 'none' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                        {emailCheck && <span style={{ color: '#fff', fontSize: '11px', fontWeight: '700' }}>✓</span>}
                      </div>
                      <span style={{ fontSize: '14px', color: '#0F172A' }}>Email</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <div onClick={() => setPushCheck(!pushCheck)} style={{ width: '16px', height: '16px', background: pushCheck ? '#137FEC' : '#fff', border: pushCheck ? 'none' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                        {pushCheck && <span style={{ color: '#fff', fontSize: '10px', fontWeight: '700' }}>✓</span>}
                      </div>
                      <span style={{ fontSize: '14px', color: '#0F172A' }}>Push Notification</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleCreate} style={{ padding: '12px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)' }}>
                  Create Alert
                </button>
              </div>
            </div>

            {/* Active Alerts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Your Active Alerts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {alerts.map(alert => (
                  <div key={alert.id} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>📣</div>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{alert.title}</p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>📍 {alert.location}</span>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>🕐 {alert.freq}</span>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>✉️ {alert.channel}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#94A3B8' }}>{alert.active ? 'Active' : 'Paused'}</span>
                      <Toggle value={alert.active} onChange={() => toggleAlert(alert.id)} />
                      <button onClick={() => deleteAlert(alert.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#94A3B8', padding: '8px', borderRadius: '8px' }}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '12px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', background: '#137FEC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.3)' }}>💡</div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#137FEC', marginBottom: '4px' }}>Pro Tip: Narrow your searches</p>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>Add specific skills like "React" or "Figma" to your job title keywords to get more relevant alerts. You can also specify seniority levels.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '24px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '14px', color: '#64748B' }}>© 2024 CareerHub. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Help Center'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default JobAlerts;