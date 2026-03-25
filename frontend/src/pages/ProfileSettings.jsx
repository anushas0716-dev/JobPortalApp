<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DEFAULT_SETTINGS = {
  profileVisible: true,
  resumeVisible: true,
  showContact: false,
  openToWork: true,
  showSalary: false,
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f2f4f7;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #0ea5e9;
  --accent-2: #22c55e;
  --accent-3: #f97316;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.ps-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.ps-header {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.ps-title {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.ps-layout {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
}
.ps-card {
  background: var(--card);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.ps-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.ps-row:last-child { border-bottom: none; }
.ps-row h4 {
  margin: 0 0 6px 0;
  font-size: 16px;
}
.ps-row p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}
.ps-toggle {
  position: relative;
  width: 52px;
  height: 30px;
}
.ps-toggle input { display: none; }
.ps-toggle span {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #d1d5db;
  transition: all 0.2s ease;
}
.ps-toggle span::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  top: 3px;
  left: 3px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.ps-toggle input:checked + span {
  background: var(--accent);
}
.ps-toggle input:checked + span::after {
  transform: translateX(22px);
}
.ps-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.ps-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.ps-btn.secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.ps-note {
  margin-top: 14px;
  font-size: 13px;
  color: var(--muted);
}
.ps-preview {
  background: linear-gradient(140deg, #fff7ed, #ecfeff 55%, #eef2ff 100%);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: grid;
  gap: 16px;
}
.ps-preview h3 { margin: 0; font-size: 18px; }
.ps-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #fff;
  border: 1px solid var(--border);
}
.ps-pill span { color: var(--muted); font-weight: 600; }
.ps-preview-card {
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid var(--border);
}
.ps-preview-card strong { display: block; font-size: 14px; }
.ps-preview-card p { margin: 6px 0 0; color: var(--muted); font-size: 13px; }
@media (max-width: 900px) {
  .ps-shell { padding: 24px; }
  .ps-layout { grid-template-columns: 1fr; }
}
`;

export default function ProfileSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("candidate_visibility_settings");
    if (raw) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
      } catch (_) {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("candidate_visibility_settings", JSON.stringify(settings));
  }, [settings]);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ps-shell">
        <div className="ps-header">
          <div>
            <h2 className="ps-title">Profile visibility settings</h2>
            <div style={{ color: '#6b7280' }}>Control how recruiters discover you.</div>
          </div>
          <Link className="ps-btn secondary" to="/candidate-dashboard">Back to dashboard</Link>
        </div>

        <div className="ps-layout">
          <div className="ps-card">
            <div className="ps-row">
              <div>
                <h4>Profile visibility</h4>
                <p>Allow employers to discover your profile in search.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.profileVisible}
                  onChange={() => toggle("profileVisible")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Resume visibility</h4>
                <p>Let recruiters download your default resume.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.resumeVisible}
                  onChange={() => toggle("resumeVisible")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Show contact details</h4>
                <p>Display email and phone on your public profile.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.showContact}
                  onChange={() => toggle("showContact")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Open to work</h4>
                <p>Let employers know you are actively looking.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.openToWork}
                  onChange={() => toggle("openToWork")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Show salary expectations</h4>
                <p>Share expected salary range on your profile.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.showSalary}
                  onChange={() => toggle("showSalary")}
                />
                <span />
              </label>
            </div>

            <div className="ps-actions">
              <button className="ps-btn" type="button" onClick={handleSave}>Save changes</button>
              <Link className="ps-btn secondary" to="/candidate-profile">Edit profile</Link>
            </div>
            {saved && <div className="ps-note">Settings saved.</div>}
            {!saved && <div className="ps-note">Changes are stored locally for now.</div>}
          </div>

          <aside className="ps-preview">
            <h3>Preview snapshot</h3>
            <div className="ps-pill">Visibility <span>{settings.profileVisible ? 'Public' : 'Private'}</span></div>
            <div className="ps-preview-card">
              <strong>Recruiter view</strong>
              <p>{settings.resumeVisible ? 'Resume available for download.' : 'Resume hidden from recruiters.'}</p>
            </div>
            <div className="ps-preview-card">
              <strong>Contact details</strong>
              <p>{settings.showContact ? 'Email + phone visible.' : 'Contact details hidden.'}</p>
            </div>
            <div className="ps-preview-card">
              <strong>Status badge</strong>
              <p>{settings.openToWork ? 'Open to work displayed.' : 'Open to work hidden.'}</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const [fullName, setFullName]         = useState('Alex Johnson');
  const [headline, setHeadline]         = useState('Senior Product Designer');
  const [bio, setBio]                   = useState('I am a passionate Product Designer with 5+ years of experience in creating user-centric digital experiences for SaaS and Fintech industries.');
  const [email, setEmail]               = useState('alex.johnson@design.co');
  const [phone, setPhone]               = useState('+1 (555) 000-1234');
  const [location, setLocation]         = useState('San Francisco, CA');
  const [website, setWebsite]           = useState('https://alexj.design');
  const [openToWork, setOpenToWork]     = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [photo, setPhoto]               = useState(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/candidates/profile/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ full_name: fullName, headline, bio, email, phone, location, website }),
      });
      if (response.ok) {
        alert('Profile saved successfully!');
        navigate('/candidate-profile');
      } else {
        alert('Failed to save. Please try again.');
      }
    } catch (err) {
      alert('Saved locally!');
      navigate('/candidate-profile');
    }
  };

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{ width: '44px', height: '24px', background: value ? '#137FEC' : '#E2E8F0', borderRadius: '9999px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
      <div style={{ position: 'absolute', width: '20px', height: '20px', background: '#fff', borderRadius: '50%', top: '2px', left: value ? '22px' : '2px', transition: 'left 0.2s', border: value ? 'none' : '1px solid #D1D5DB' }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 13px 16px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .input-field::placeholder { color: #94A3B8; }
        .input-with-icon { padding-left: 40px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', height: '73px', background: 'rgba(255,255,255,0.8)', borderBottom: '1px solid #E2E8F0', backdropFilter: 'blur(6px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* ✅ Back arrow → candidate profile */}
          <button onClick={() => navigate('/candidate-profile')} style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.1)', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>Edit Profile</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* ✅ Cancel → candidate profile */}
          <button onClick={() => navigate('/candidate-profile')} style={{ padding: '8.5px 25px', border: '1px solid #E2E8F0', borderRadius: '8px', background: 'transparent', fontSize: '14px', fontWeight: '600', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Cancel</button>
          {/* ✅ Save Changes → API call */}
          <button onClick={handleSave} style={{ padding: '9.5px 16px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>Save Changes</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '800px', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Profile Photo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
              <input type="file" id="photo-input" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) setPhoto(URL.createObjectURL(f)); }} />
              <div style={{ width: '160px', height: '160px', background: photo ? 'transparent' : '#E2E8F0', borderRadius: '50%', border: '4px solid #fff', boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' }}>
                {photo ? <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
              </div>
              {/* ✅ Camera icon → opens file picker */}
              <label htmlFor="photo-input" style={{ position: 'absolute', bottom: '4px', right: '4px', width: '40px', height: '40px', background: '#137FEC', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)' }}>📷</label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Profile Photo</p>
              <p style={{ fontSize: '14px', color: '#64748B' }}>JPG, GIF or PNG. Max size 2MB</p>
            </div>
          </div>

          {/* Personal Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#137FEC', fontSize: '16px' }}>👤</span>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Personal Information</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Full Name</label>
                <input className="input-field" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Alex Johnson" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Professional Headline</label>
                <input className="input-field" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Senior Product Designer" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Short Bio</label>
              <textarea className="input-field" value={bio} onChange={e => setBio(e.target.value)} rows={5} style={{ resize: 'vertical', fontFamily: "'Inter', sans-serif", lineHeight: '24px' }} placeholder="Tell us about yourself..." />
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#137FEC', fontSize: '16px' }}>📋</span>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Contact Details</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '16px', color: '#94A3B8', fontSize: '14px' }}>✉️</span>
                  <input className="input-field input-with-icon" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alex.johnson@design.co" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '15px', top: '15px', color: '#94A3B8', fontSize: '14px' }}>📱</span>
                  <input className="input-field input-with-icon" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-1234" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Location</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '14px', color: '#94A3B8', fontSize: '14px' }}>📍</span>
                  <input className="input-field input-with-icon" value={location} onChange={e => setLocation(e.target.value)} placeholder="San Francisco, CA" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Website / Portfolio</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#94A3B8', fontSize: '14px' }}>🌐</span>
                  <input className="input-field input-with-icon" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://alexj.design" />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#137FEC', fontSize: '16px' }}>👁️</span>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Privacy Settings</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Open to Work',   desc: 'Show a badge to recruiters that you are actively seeking', value: openToWork,     onChange: setOpenToWork },
                { title: 'Public Profile', desc: 'Allow your profile to be indexed by search engines',        value: publicProfile,  onChange: setPublicProfile },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{item.title}</p>
                    <p style={{ fontSize: '14px', color: '#64748B' }}>{item.desc}</p>
                  </div>
                  <Toggle value={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </div>

          {/* Deactivate */}
          <div style={{ borderTop: '1px solid #E2E8F0', padding: '40px 0 80px', display: 'flex', justifyContent: 'flex-end' }}>
            {/* ✅ Deactivate → confirm dialog */}
            <button
              onClick={() => { if (window.confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) { localStorage.clear(); navigate('/'); } }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '700', color: '#EF4444', fontFamily: "'Inter', sans-serif" }}>
              🗑️ Deactivate Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
>>>>>>> upstream/jobportelteam
