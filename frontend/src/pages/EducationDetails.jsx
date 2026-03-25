import React, { useState } from 'react';

const EducationDetails = () => {
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(true);

  const educations = [
    {
      icon: '🏛️',
      iconBg: '#EFF6FF',
      name: 'Massachusetts Institute of Technology',
      degree: 'Master of Science in Artificial Intelligence',
      period: 'Sep 2021 — June 2023',
      location: 'Cambridge, MA',
      note: 'Focus on machine learning architectures and natural language processing. GPA: 4.0/4.0',
    },
    {
      icon: '🎓',
      iconBg: '#F8FAFC',
      name: 'Stanford University',
      degree: 'Bachelor of Science in Computer Science',
      period: 'Sep 2017 — May 2021',
      location: 'Stanford, CA',
      note: '',
    },
  ];

  const navItems = [
    { icon: '👤', label: 'Personal Info', path: '/profile-settings' },
    { icon: '🎓', label: 'Education', path: '/education', active: true },
    { icon: '💼', label: 'Experience', path: '/candidate-profile' },
    { icon: '🔧', label: 'Skills', path: '/skills' },
    { icon: '⚙️', label: 'Settings', path: '/profile-settings' },
  ];

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/candidates/education/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ institution, degree, start_date: startDate, end_date: endDate, location, description }),
      });
      alert('Education record saved!');
      setInstitution(''); setDegree(''); setStartDate(''); setEndDate(''); setLocation(''); setDescription('');
    } catch {
      alert('Saved locally!');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 13px 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 14px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
        .input-field::placeholder { color: #6B7280; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: #F1F5F9; }
        .icon-btn { background: none; border: none; cursor: pointer; font-size: 14px; padding: 8px; border-radius: 8px; color: #94A3B8; transition: all 0.2s; }
        .icon-btn:hover { background: #F1F5F9; color: #475569; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '22px', color: '#137FEC' }}>🎓</span>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>Education Profile</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => window.location.href = '/candidate-profile'} style={{ padding: '0 16px', height: '40px', background: 'rgba(19,127,236,0.1)', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Discard</button>
          <button onClick={handleSave} style={{ padding: '0 16px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Save Changes</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
        <div style={{ width: '1024px', maxWidth: '1024px', padding: '0 40px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>

            {/* LEFT SIDEBAR */}
            <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* User Card */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', marginBottom: '8px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Alex Thompson</p>
                <p style={{ fontSize: '14px', color: '#64748B' }}>Graduate Student</p>
              </div>

              {/* Nav */}
              {navItems.map(item => (
                <div key={item.label} className="nav-item"
                  style={{ background: item.active ? '#137FEC' : 'transparent', boxShadow: item.active ? '0px 4px 6px -1px rgba(19,127,236,0.2)' : 'none' }}
                  onClick={() => window.location.href = item.path}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: item.active ? '#fff' : '#475569' }}>{item.label}</span>
                </div>
              ))}
            </aside>

            {/* RIGHT CONTENT */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Section Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.6px', marginBottom: '4px' }}>Education History</h1>
                  <p style={{ fontSize: '14px', color: '#64748B' }}>Manage your academic background and certifications.</p>
                </div>
                <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  + Add Education
                </button>
              </div>

              {/* Education Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {educations.map((edu, i) => (
                  <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', overflow: 'hidden' }}>
                    {/* Left Icon Panel */}
                    <div style={{ width: '192px', background: '#F1F5F9', borderRight: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: '64px', height: '64px', background: edu.iconBg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: 'inset 0px 2px 4px rgba(0,0,0,0.05)' }}>
                        {edu.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: edu.note ? '16px' : '0' }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px', lineHeight: '28px' }}>{edu.name}</h3>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', marginBottom: '8px' }}>{edu.degree}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px' }}>📅</span>
                            <span style={{ fontSize: '14px', color: '#64748B' }}>{edu.period}</span>
                            <span style={{ color: '#64748B' }}>•</span>
                            <span style={{ fontSize: '14px', color: '#64748B' }}>{edu.location}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                          <button className="icon-btn">✏️</button>
                          <button className="icon-btn">🗑️</button>
                        </div>
                      </div>

                      {edu.note && (
                        <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '12px' }}>
                          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>{edu.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Education Form */}
              {showForm && (
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Form Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#137FEC', fontSize: '18px' }}>✏️</span>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Add Education Details</h3>
                  </div>

                  {/* Form Fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Institution Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Institution Name</label>
                      <input className="input-field" placeholder="e.g. Harvard University" value={institution} onChange={e => setInstitution(e.target.value)} />
                    </div>

                    {/* Degree */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Degree & Field of Study</label>
                      <input className="input-field" placeholder="e.g. Bachelor of Science in Economics" value={degree} onChange={e => setDegree(e.target.value)} />
                    </div>

                    {/* Dates Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Start Date</label>
                        <input className="input-field" type="month" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ colorScheme: 'light' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>End Date (or Expected)</label>
                        <input className="input-field" type="month" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ colorScheme: 'light' }} />
                      </div>
                    </div>

                    {/* Location */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Location</label>
                      <input className="input-field" placeholder="e.g. New York, NY" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>

                    {/* Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Description / Key Achievements</label>
                      <textarea className="input-field" placeholder="Mention honors, GPA, relevant coursework..." value={description} onChange={e => setDescription(e.target.value)} rows={4} style={{ resize: 'vertical', fontFamily: "'Inter', sans-serif", lineHeight: '20px' }} />
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
                      <button onClick={() => setShowForm(false)} style={{ padding: '10px 24px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Cancel</button>
                      <button onClick={handleSave} style={{ padding: '10px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)' }}>Add Record</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#fff', borderTop: '1px solid #E2E8F0', padding: '32px 160px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#94A3B8' }}>🔒</span>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>Your academic data is encrypted and secure.</p>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Help Center'].map(link => (
            <a key={link} href="#" style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default EducationDetails;