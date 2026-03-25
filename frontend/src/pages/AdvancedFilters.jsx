import React, { useState } from 'react';

const AdvancedFilters = () => {
  const [minSalary, setMinSalary] = useState(3000);
  const [maxSalary, setMaxSalary] = useState(12000);
  const [jobTypes, setJobTypes] = useState(['Full-time']);
  const [workplaces, setWorkplaces] = useState(['Remote']);
  const [experience, setExperience] = useState(['Entry Level']);
  const [industry, setIndustry] = useState('Technology & Software');
  const [datePosted, setDatePosted] = useState('Past week');

  const MIN = 1000; const MAX = 20000;
  const toPercent = v => ((v - MIN) / (MAX - MIN)) * 100;
  const formatSal = v => v >= 1000 ? `$${(v/1000).toFixed(0)}k` : `$${v}`;

  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const jobTypeOpts = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
  const workplaceOpts = ['Remote', 'On-site', 'Hybrid'];
  const experienceOpts = ['Internship', 'Entry Level', 'Mid Level', 'Senior Level'];
  const industryOpts = ['Technology & Software', 'Finance & Banking', 'Healthcare', 'Design & Creative', 'Marketing', 'Education'];
  const dateOpts = ['Any time', 'Past 24 hours', 'Past week', 'Past month'];

  const locations = [
    { city: 'New York, NY', count: '452 open roles', emoji: '🗽' },
    { city: 'London, UK', count: '210 open roles', emoji: '🏰' },
    { city: 'San Francisco, CA', count: '328 open roles', emoji: '🌉' },
  ];

  const handleApply = () => {
    const filters = { salary: { min: minSalary, max: maxSalary }, jobTypes, workplaces, experience, industry, datePosted };
    localStorage.setItem('jobFilters', JSON.stringify(filters));
    window.location.href = '/jobs';
  };

  const handleReset = () => {
    setMinSalary(3000); setMaxSalary(12000);
    setJobTypes(['Full-time']); setWorkplaces(['Remote']);
    setExperience(['Entry Level']); setIndustry('Technology & Software');
    setDatePosted('Past week');
  };

  const TagBtn = ({ label, selected, onClick }) => (
    <button onClick={onClick} style={{ padding: '0 16px', height: '40px', background: selected ? '#137FEC' : '#FFFFFF', border: `1px solid ${selected ? '#137FEC' : '#E2E8F0'}`, borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: selected ? '#FFFFFF' : '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .section { display: flex; flex-direction: column; gap: 16px; }
        .section-title { display: flex; align-items: center; gap: 8px; }
        .section-title h3 { font-size: 18px; font-weight: 700; color: #0F172A; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 160px', height: '73px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '18px', color: '#137FEC' }}>⚙️</span>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>Advanced Filters</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleReset} style={{ padding: '0 16px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Reset All</button>
          <button onClick={handleApply} style={{ padding: '0 24px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>Show 1,240 Jobs</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 320px 48px' }}>
        <div style={{ width: '640px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Salary Range */}
          <div className="section">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>💰</span>
              <h3>Salary Range</h3>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ padding: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Monthly Salary (USD)</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>{formatSal(minSalary)} - {formatSal(maxSalary)}+</span>
                </div>

                {/* Dual Slider */}
                <div style={{ position: 'relative', padding: '16px 8px 0' }}>
                  <div style={{ position: 'relative', height: '6px', background: '#E2E8F0', borderRadius: '9999px', cursor: 'pointer' }}
                    onClick={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                      const val = Math.round((MIN + pct * (MAX - MIN)) / 500) * 500;
                      const mid = (minSalary + maxSalary) / 2;
                      if (val < mid) setMinSalary(Math.min(val, maxSalary - 500));
                      else setMaxSalary(Math.max(val, minSalary + 500));
                    }}>
                    {/* Blue track */}
                    <div style={{ position: 'absolute', left: `${toPercent(minSalary)}%`, right: `${100 - toPercent(maxSalary)}%`, top: 0, bottom: 0, background: '#137FEC', borderRadius: '9999px' }} />

                    {/* Min handle */}
                    <div style={{ position: 'absolute', left: `${toPercent(minSalary)}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', background: '#FFFFFF', border: '2px solid #137FEC', borderRadius: '50%', cursor: 'grab', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 2 }}
                      onMouseDown={e => {
                        e.preventDefault();
                        const track = e.currentTarget.parentElement;
                        const move = ev => {
                          const rect = track.getBoundingClientRect();
                          const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
                          const val = Math.round((MIN + pct * (MAX - MIN)) / 500) * 500;
                          setMinSalary(Math.min(val, maxSalary - 500));
                        };
                        const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
                        document.addEventListener('mousemove', move);
                        document.addEventListener('mouseup', up);
                      }}>
                      <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', fontWeight: '600', color: '#475569', whiteSpace: 'nowrap' }}>{formatSal(minSalary)}</div>
                    </div>

                    {/* Max handle */}
                    <div style={{ position: 'absolute', left: `${toPercent(maxSalary)}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', background: '#FFFFFF', border: '2px solid #137FEC', borderRadius: '50%', cursor: 'grab', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 2 }}
                      onMouseDown={e => {
                        e.preventDefault();
                        const track = e.currentTarget.parentElement;
                        const move = ev => {
                          const rect = track.getBoundingClientRect();
                          const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
                          const val = Math.round((MIN + pct * (MAX - MIN)) / 500) * 500;
                          setMaxSalary(Math.max(val, minSalary + 500));
                        };
                        const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
                        document.addEventListener('mousemove', move);
                        document.addEventListener('mouseup', up);
                      }}>
                      <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', fontWeight: '600', color: '#475569', whiteSpace: 'nowrap' }}>{formatSal(maxSalary)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Type + Workplace */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div className="section">
              <div className="section-title">
                <span style={{ fontSize: '18px', color: '#137FEC' }}>💼</span>
                <h3>Job Type</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {jobTypeOpts.map(t => <TagBtn key={t} label={t} selected={jobTypes.includes(t)} onClick={() => toggle(jobTypes, setJobTypes, t)} />)}
              </div>
            </div>
            <div className="section">
              <div className="section-title">
                <span style={{ fontSize: '18px', color: '#137FEC' }}>📍</span>
                <h3>Workplace</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {workplaceOpts.map(w => <TagBtn key={w} label={w} selected={workplaces.includes(w)} onClick={() => toggle(workplaces, setWorkplaces, w)} />)}
              </div>
            </div>
          </div>

          {/* Experience Level */}
          <div className="section">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>📊</span>
              <h3>Experience Level</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {experienceOpts.map(e => (
                <label key={e} onClick={() => toggle(experience, setExperience, e)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#FFFFFF', border: `${experience.includes(e) ? '2' : '1'}px solid ${experience.includes(e) ? '#137FEC' : '#E2E8F0'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>{e}</span>
                  <div style={{ width: experience.includes(e) ? '22px' : '20px', height: experience.includes(e) ? '22px' : '20px', background: experience.includes(e) ? '#137FEC' : '#FFFFFF', border: experience.includes(e) ? 'none' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {experience.includes(e) && <span style={{ color: '#fff', fontSize: '12px', fontWeight: '700' }}>✓</span>}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Industry */}
          <div className="section">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>🏭</span>
              <h3>Industry</h3>
            </div>
            <div style={{ position: 'relative' }}>
              <select value={industry} onChange={e => setIndustry(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '16px', fontFamily: "'Inter', sans-serif", color: '#334155', outline: 'none', appearance: 'none', cursor: 'pointer', height: '48px' }}>
                {industryOpts.map(i => <option key={i}>{i}</option>)}
              </select>
              <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>▾</span>
            </div>
          </div>

          {/* Date Posted */}
          <div className="section">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>📅</span>
              <h3>Date Posted</h3>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {dateOpts.map(d => (
                <label key={d} onClick={() => setDatePosted(d)} style={{ display: 'flex', alignItems: 'center', gap: d === 'Past week' ? '11px' : '12px', cursor: 'pointer' }}>
                  <div style={{ width: d === 'Past week' ? '22px' : '20px', height: d === 'Past week' ? '22px' : '20px', background: datePosted === d ? '#137FEC' : '#FFFFFF', border: datePosted === d ? 'none' : '1px solid #CBD5E1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                    {datePosted === d && <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }} />}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>{d}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Popular Locations */}
          <div className="section">
            <div className="section-title">
              <span style={{ fontSize: '18px', color: '#137FEC' }}>📍</span>
              <h3>Popular Locations</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {locations.map(loc => (
                <div key={loc.city} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'border 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.border = '1px solid #137FEC'}
                  onMouseLeave={e => e.currentTarget.style.border = '1px solid #E2E8F0'}
                  onClick={() => window.location.href = '/jobs'}>
                  <div style={{ width: '40px', height: '40px', background: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{loc.emoji}</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{loc.city}</p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>{loc.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;