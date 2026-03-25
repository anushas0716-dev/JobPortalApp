import React, { useState } from 'react';

const JobListings = () => {
  const [activeNav, setActiveNav] = useState('All Jobs');
  const [jobTypes, setJobTypes] = useState({ 'Full-time': true, Contract: false, Remote: false });
  const [experience, setExperience] = useState('Mid Level (2-5 years)');
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState([]);
  const [filters, setFilters] = useState(['San Francisco, CA', 'Design']);
  const [search, setSearch] = useState('');

  const navItems = [
    { label: 'All Jobs', icon: '💼' },
    { label: 'Saved Jobs', icon: '🔖' },
    { label: 'Applied', icon: '✅' },
    { label: 'Interviews', icon: '📅' },
  ];

  const jobs = [
    { id: 1, title: 'Senior Product Designer', company: 'TechFlow', location: 'San Francisco, CA (Remote)', salary: '$140k – $180k', type: 'Full-time', featured: true, icon: '🎨' },
    { id: 2, title: 'Lead Frontend Engineer', company: 'GlobalPay', location: 'New York, NY', salary: '$160k – $210k', type: 'Full-time', featured: false, icon: '💻', postedLabel: 'Posted 2d ago' },
    { id: 3, title: 'UX Research Specialist', company: 'Aivana', location: 'Remote', salary: '$110k – $150k', type: 'Remote', featured: false, icon: '🔬', tagBg: '#EFF6FF', tagColor: '#1D4ED8' },
    { id: 4, title: 'Staff Data Scientist', company: 'Nexa Health', location: 'Austin, TX', salary: '$170k – $230k', type: 'Full-time', featured: false, icon: '📊' },
  ];

  const toggleSave = (id) => setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const removeFilter = (f) => setFilters(p => p.filter(x => x !== f));
  const toggleJobType = (t) => setJobTypes(p => ({ ...p, [t]: !p[t] }));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-card { background: #fff; border: 1px solid #F1F5F9; border-radius: 12px; padding: 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: box-shadow 0.2s; cursor: pointer; position: relative; overflow: hidden; }
        .job-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.07); }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #475569; transition: all 0.15s; }
        .nav-item.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 700; }
        .page-btn { width: 40px; height: 40px; border-radius: 8px; border: none; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter',sans-serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 80px', height: '65px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(6px)', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', color: '#137FEC' }}>🏢</span>
            <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>HireFlow</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '15px', color: '#94A3B8', fontSize: '14px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles, companies..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', paddingLeft: '40px', width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Find Jobs', 'Companies', 'Salaries'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#475569', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', position: 'relative' }}>
              🔔
              <div style={{ position: 'absolute', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%', top: '8px', right: '8px' }} />
            </button>
            <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer' }}>👤</div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', padding: '40px 80px', gap: '32px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>

        {/* SIDEBAR */}
        <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Filters</h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>Refine your job search</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map(n => (
              <div key={n.label} className={`nav-item${activeNav === n.label ? ' active' : ''}`} onClick={() => setActiveNav(n.label)}>
                <span>{n.icon}</span><span>{n.label}</span>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: '#E2E8F0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Job Type</p>
            {Object.keys(jobTypes).map(t => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div onClick={() => toggleJobType(t)} style={{ width: '18px', height: '18px', background: jobTypes[t] ? '#137FEC' : '#fff', border: jobTypes[t] ? 'none' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {jobTypes[t] && <span style={{ color: '#fff', fontSize: '11px', fontWeight: '700' }}>✓</span>}
                </div>
                <span style={{ fontSize: '14px', color: '#475569' }}>{t}</span>
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Experience Level</p>
            <select value={experience} onChange={e => setExperience(e.target.value)} style={{ width: '100%', height: '38px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0 12px', fontSize: '14px', fontFamily: "'Inter',sans-serif", color: '#0F172A', outline: 'none' }}>
              {['Entry Level', 'Mid Level (2-5 years)', 'Senior Level', 'Lead / Principal', 'Executive'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Salary Range</p>
            <input type="range" min={40} max={200} defaultValue={120} style={{ width: '100%', accentColor: '#137FEC' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#64748B' }}>$40k</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>$200k+</span>
            </div>
          </div>
        </aside>

        {/* LISTINGS */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '4px' }}>Open Roles</h1>
              <p style={{ fontSize: '16px', color: '#64748B' }}>Discover 1,240 opportunities tailored for you</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>☰ Sort by: Newest</button>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#F1F5F9', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', fontWeight: '500', color: '#475569' }}>
                {f}
                <button onClick={() => removeFilter(f)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontSize: '10px', padding: 0, marginLeft: '2px' }}>✕</button>
              </span>
            ))}
            {filters.length > 0 && (
              <button onClick={() => setFilters([])} style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: '600', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Clear all filters</button>
            )}
          </div>

          {/* Job Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {jobs.map(job => (
              <div key={job.id} className="job-card">
                {job.featured && <div style={{ position: 'absolute', left: '1px', top: '1px', bottom: '1px', width: '4px', background: '#137FEC', borderRadius: '2px' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingLeft: job.featured ? '12px' : '0' }}>
                  <div style={{ width: '64px', height: '64px', background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{job.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{job.title}</h3>
                      {job.featured && <span style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Featured</span>}
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '8px' }}>{job.company} • {job.location}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#F0FDF4', color: '#15803D', fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '6px' }}>💰 {job.salary}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: job.tagBg || '#F1F5F9', color: job.tagColor || '#64748B', fontSize: '12px', fontWeight: '500', padding: '4px 8px', borderRadius: '6px' }}>🕐 {job.postedLabel || job.type}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
                  <button onClick={() => toggleSave(job.id)} style={{ width: '40px', height: '40px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', color: saved.includes(job.id) ? '#137FEC' : '#94A3B8' }}>🔖</button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '40px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)', whiteSpace: 'nowrap' }}>Apply Now →</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>← Previous</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[1, 2, 3].map(n => (
                <button key={n} className="page-btn" onClick={() => setPage(n)} style={{ background: page === n ? '#137FEC' : 'transparent', color: page === n ? '#fff' : '#475569' }}>{n}</button>
              ))}
              <span style={{ color: '#94A3B8', fontSize: '16px', padding: '0 8px' }}>...</span>
              <button className="page-btn" onClick={() => setPage(12)} style={{ background: page === 12 ? '#137FEC' : 'transparent', color: page === 12 ? '#fff' : '#475569' }}>12</button>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Next →</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '40px 80px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', color: '#94A3B8' }}>🏢</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#94A3B8' }}>© 2024 HireFlow Technologies Inc.</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobListings;