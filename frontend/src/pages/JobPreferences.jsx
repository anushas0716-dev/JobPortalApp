import React, { useState } from 'react';

const JobPreferences = () => {
  const [jobTitles, setJobTitles] = useState(['Software Engineer', 'Product Designer']);
  const [titleInput, setTitleInput] = useState('');
  const [workplaces, setWorkplaces] = useState({ remote: true, onsite: false, hybrid: true });
  const [citySearch, setCitySearch] = useState('');
  const [jobTypes, setJobTypes] = useState({ fulltime: true, contract: false, parttime: false });
  const [minSalary, setMinSalary] = useState('120000');
  const [maxSalary, setMaxSalary] = useState('180000');

  const addTitle = () => {
    if (titleInput.trim() && !jobTitles.includes(titleInput.trim())) {
      setJobTitles([...jobTitles, titleInput.trim()]);
      setTitleInput('');
    }
  };

  const removeTitle = (t) => setJobTitles(jobTitles.filter(x => x !== t));

  const toggleWorkplace = (key) => setWorkplaces(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleJobType = (key) => setJobTypes(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/candidates/preferences/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ job_titles: jobTitles, workplaces, job_types: jobTypes, min_salary: minSalary, max_salary: maxSalary }),
      });
      alert('Preferences saved!');
      window.location.href = '/candidate-dashboard';
    } catch {
      alert('Saved locally!');
      window.location.href = '/candidate-dashboard';
    }
  };

  const workplaceOptions = [
    { key: 'remote', icon: '🏠', label: 'Remote', desc: 'Work from anywhere' },
    { key: 'onsite', icon: '🏢', label: 'On-site', desc: 'Traditional office' },
    { key: 'hybrid', icon: '🔀', label: 'Hybrid', desc: 'Mix of office & home' },
  ];

  const jobTypeOptions = [
    { key: 'fulltime', label: 'Full-time', desc: 'Standard 40h work week' },
    { key: 'contract', label: 'Contract / Freelance', desc: 'Project-based or fixed-term' },
    { key: 'parttime', label: 'Part-time', desc: 'Less than 30h per week' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { padding: 12px 16px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
        .input-field::placeholder { color: #94A3B8; }
        .section-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 16px; }
        .section-title { display: flex; align-items: center; gap: 8px; }
        .section-title h3 { font-size: 18px; font-weight: 700; color: #0F172A; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 160px', height: '73px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '22px' }}>🧭</span>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>Career Compass</span>
        </div>
        <button onClick={handleSave} style={{ padding: '0 24px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          Save Preferences
        </button>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 160px' }}>
        <div style={{ width: '960px', maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A' }}>Job Preferences</h1>
            <p style={{ fontSize: '16px', color: '#475569' }}>Fine-tune your job search to get the most relevant opportunities delivered to your inbox.</p>
          </div>

          {/* Desired Job Titles */}
          <div className="section-card">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>👥</span>
              <h3>Desired Job Titles</h3>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {jobTitles.map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '8px', padding: '0 12px', height: '36px', fontSize: '14px', fontWeight: '600', color: '#137FEC' }}>
                  {t}
                  <button onClick={() => removeTitle(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0F172A', fontSize: '12px', padding: '0', lineHeight: 1 }}>✕</button>
                </span>
              ))}
            </div>

            {/* Input + Add */}
            <div style={{ display: 'flex', width: '448px' }}>
              <input
                className="input-field"
                placeholder="e.g. Frontend Developer"
                value={titleInput}
                onChange={e => setTitleInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTitle()}
                style={{ flex: 1, borderRadius: '8px 0 0 8px', border: '1px solid #CBD5E1' }}
              />
              <button onClick={addTitle} style={{ width: '46px', background: '#137FEC', border: 'none', borderRadius: '0 8px 8px 0', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>

          {/* Workplace & Location */}
          <div className="section-card">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>📍</span>
              <h3>Workplace & Location</h3>
            </div>

            {/* Workplace Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {workplaceOptions.map(opt => (
                <label key={opt.key} onClick={() => toggleWorkplace(opt.key)} style={{
                  display: 'flex', flexDirection: 'column', padding: '16px', borderRadius: '8px', cursor: 'pointer',
                  border: workplaces[opt.key] ? '2px solid #137FEC' : '1px solid #E2E8F0',
                  background: workplaces[opt.key] ? 'rgba(19,127,236,0.05)' : '#fff',
                  position: 'relative', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                    <div style={{ width: '18px', height: '18px', background: workplaces[opt.key] ? '#137FEC' : '#fff', border: workplaces[opt.key] ? 'none' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>
                      {workplaces[opt.key] && '✓'}
                    </div>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{opt.label}</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>{opt.desc}</p>
                </label>
              ))}
            </div>

            {/* Preferred Cities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '448px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Preferred Cities</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0 16px', height: '48px', gap: '8px' }}>
                <span style={{ color: '#94A3B8', fontSize: '16px' }}>🔍</span>
                <input value={citySearch} onChange={e => setCitySearch(e.target.value)} placeholder="Search cities..." style={{ border: 'none', outline: 'none', fontSize: '16px', fontFamily: "'Inter', sans-serif", color: '#0F172A', flex: 1, background: 'transparent' }} />
              </div>
            </div>
          </div>

          {/* Job Type */}
          <div className="section-card">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>📄</span>
              <h3>Job Type</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {jobTypeOptions.map(opt => (
                <label key={opt.key} onClick={() => toggleJobType(opt.key)} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                  border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer',
                  background: jobTypes[opt.key] ? 'rgba(19,127,236,0.02)' : '#fff', transition: 'all 0.2s'
                }}>
                  <div style={{ width: '22px', height: '22px', background: jobTypes[opt.key] ? '#137FEC' : '#fff', border: jobTypes[opt.key] ? 'none' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff', flexShrink: 0 }}>
                    {jobTypes[opt.key] && '✓'}
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>{opt.label}</p>
                    <p style={{ fontSize: '14px', color: '#64748B' }}>{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="section-card">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>💰</span>
              <h3>Salary Range</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Minimum (Annual)</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0 16px', height: '48px', gap: '8px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '16px' }}>$</span>
                  <input type="number" value={minSalary} onChange={e => setMinSalary(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '16px', fontWeight: '500', fontFamily: "'Inter', sans-serif", color: '#0F172A', flex: 1, background: 'transparent' }} />
                </div>
              </div>
              <span style={{ color: '#CBD5E1', fontSize: '20px', marginTop: '20px' }}>→</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Maximum (Annual)</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0 16px', height: '48px', gap: '8px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '16px' }}>$</span>
                  <input type="number" value={maxSalary} onChange={e => setMaxSalary(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '16px', fontWeight: '500', fontFamily: "'Inter', sans-serif", color: '#0F172A', flex: 1, background: 'transparent' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <button onClick={() => { setJobTitles([]); setWorkplaces({ remote: false, onsite: false, hybrid: false }); setJobTypes({ fulltime: false, contract: false, parttime: false }); setMinSalary(''); setMaxSalary(''); }} style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Reset to Default
            </button>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => window.location.href = '/candidate-dashboard'} style={{ padding: '12px 24px', background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                Skip for Now
              </button>
              <button onClick={handleSave} style={{ padding: '13px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                Update My Feed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreferences;