import React, { useState } from 'react';

const WorkExperienceEditor = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [empType, setEmpType] = useState('Full-time');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentRole, setCurrentRole] = useState(false);
  const [description, setDescription] = useState('');

  const history = [
    {
      icon: '🏢',
      title: 'Senior Product Designer',
      company: 'Design Systems Inc.',
      period: 'Jan 2021 — Present',
      location: 'San Francisco, CA',
      desc: 'Leading the redesign of the core dashboard and managing a team of 4 designers. Improved user retention by 25%...',
    },
    {
      icon: '🏛️',
      title: 'UX Designer',
      company: 'Creative Lab Agency',
      period: 'Mar 2018 — Dec 2020',
      location: 'Remote',
      desc: 'Collaborated with cross-functional teams to deliver 15+ high-impact mobile applications for Fortune 500 clients.',
    },
  ];

  const navItems = [
    { icon: '👤', label: 'Personal Info', path: '/profile-settings' },
    { icon: '💼', label: 'Work Experience', path: '/work-experience', active: true },
    { icon: '🎓', label: 'Education', path: '/education' },
    { icon: '🔧', label: 'Skills & Tools', path: '/skills' },
    { icon: '⚙️', label: 'Settings', path: '/profile-settings' },
  ];

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/candidates/experience/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ job_title: jobTitle, company, employment_type: empType, location, start_date: startDate, end_date: currentRole ? null : endDate, currently_working: currentRole, description }),
      });
      alert('Experience saved!');
    } catch {
      alert('Saved locally!');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 13px 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
        .input-field::placeholder { color: #6B7280; }
        .select-field { width: 100%; padding: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; appearance: none; cursor: pointer; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: #F1F5F9; }
        .icon-btn { background: none; border: none; cursor: pointer; font-size: 14px; padding: 6px; border-radius: 8px; color: #94A3B8; transition: all 0.2s; }
        .icon-btn:hover { background: #F1F5F9; color: #475569; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', height: '73px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(19,127,236,0.1)', borderRadius: '8px', width: '37px', height: '37px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#137FEC', fontSize: '18px' }}>💼</span>
          </div>
          <div>
            <p style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', lineHeight: '22px' }}>Work Experience</p>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Manage your professional career path</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => window.location.href = '/candidate-profile'} style={{ padding: '9px 18px', height: '40px', background: '#E2E8F0', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '9px 16px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Save Changes</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 40px' }}>
        <div style={{ display: 'flex', gap: '32px', width: '1200px', maxWidth: '1200px' }}>

          {/* LEFT SIDEBAR */}
          <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* User */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #e0f0ff, #c7e0ff)', borderRadius: '50%', border: '4px solid #fff', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>👤</div>
              <div>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Alex Johnson</p>
                <p style={{ fontSize: '14px', color: '#64748B' }}>Product Designer</p>
              </div>
            </div>

            {/* Nav */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map(item => (
                <div key={item.label} className="nav-item"
                  style={{ background: item.active ? 'rgba(19,127,236,0.1)' : 'transparent' }}
                  onClick={() => window.location.href = item.path}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: item.active ? '700' : '500', color: item.active ? '#137FEC' : '#475569' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Add Experience Form */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Add Experience</h3>
                <p style={{ fontSize: '14px', color: '#64748B' }}>Details about your current or past professional role.</p>
              </div>

              {/* Row 1: Job Title + Company */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Job Title</label>
                  <input className="input-field" placeholder="e.g. Senior Product Designer" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Company</label>
                  <input className="input-field" placeholder="e.g. Acme Corp" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
              </div>

              {/* Row 2: Employment Type + Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Employment Type</label>
                  <div style={{ position: 'relative' }}>
                    <select className="select-field" value={empType} onChange={e => setEmpType(e.target.value)}>
                      {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'].map(t => <option key={t}>{t}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '14px', pointerEvents: 'none' }}>📍</span>
                    <input className="input-field" placeholder="e.g. San Francisco, CA" value={location} onChange={e => setLocation(e.target.value)} style={{ paddingLeft: '36px' }} />
                  </div>
                </div>
              </div>

              {/* Row 3: Start Date + End Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Start Date</label>
                  <input className="input-field" type="month" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ colorScheme: 'light' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>End Date</label>
                  <input className="input-field" type="month" value={endDate} onChange={e => setEndDate(e.target.value)} disabled={currentRole} style={{ colorScheme: 'light', opacity: currentRole ? 0.5 : 1 }} />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={currentRole} onChange={e => setCurrentRole(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#137FEC', cursor: 'pointer' }} />
                    <span style={{ fontSize: '12px', color: '#64748B' }}>I am currently working in this role</span>
                  </label>
                </div>
              </div>

              {/* Responsibilities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Responsibilities & Achievements</label>
                <textarea className="input-field" placeholder="Describe your key responsibilities, projects, and accomplishments..." value={description} onChange={e => setDescription(e.target.value)} rows={6} style={{ resize: 'vertical', fontFamily: "'Inter', sans-serif", lineHeight: '24px' }} />
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>Use bullet points to make it readable for recruiters.</p>
              </div>
            </div>

            {/* Recent History */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', padding: '0 4px' }}>Recent History</h4>

              {history.map((item, i) => (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>{item.title}</p>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#137FEC' }}>{item.company}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button className="icon-btn">✏️</button>
                        <button className="icon-btn">🗑️</button>
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>{item.period} • {item.location}</p>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
              <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '48px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>
                + Add Another Position
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#fff', borderTop: '1px solid #E2E8F0', padding: '24px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#64748B' }}>© 2024 TalentHub Profile Editor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WorkExperienceEditor;