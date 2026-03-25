import React, { useState } from 'react';

const MapJobSearch = () => {
  const [activeFilter, setActiveFilter] = useState('Remote');
  const [selectedJob, setSelectedJob] = useState(0);
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState('');
  const [zoom, setZoom] = useState(12);

  const filters = ['Remote', 'Full-time', '$120k+', 'Design'];

  const jobs = [
    {
      id: 0, icon: '🎯', title: 'Senior Product Designer', company: 'Loom', location: 'San Francisco, CA',
      desc: 'We are looking for a Senior Designer to help us build the future of asynchronous video communication...',
      salary: '$140k – $180k', posted: '2 DAYS AGO', salaryColor: '#137FEC', active: true,
      mapLabel: 'Loom • $180k', mapX: '58%', mapY: '35%', mapActive: true,
      address: 'Loom Headquarters', addressLine: '101 Spear St, San Francisco, CA',
    },
    {
      id: 1, icon: '⬡', title: 'Frontend Architect', company: 'Vercel', location: 'Hybrid',
      desc: 'Design and implement core frontend infrastructure for our developer experience tools...',
      salary: '$160k – $210k', posted: '4 DAYS AGO', salaryColor: '#334155',
      mapLabel: 'Vercel • $210k', mapX: '38%', mapY: '55%', mapActive: false,
    },
    {
      id: 2, icon: '⬢', title: 'Staff Backend Engineer', company: 'Stripe', location: 'San Francisco, CA',
      desc: 'Scale our core payment processing engine and build high-availability global systems...',
      salary: '$180k – $240k', posted: '1 WEEK AGO', salaryColor: '#334155',
      mapLabel: 'Stripe • $240k', mapX: '62%', mapY: '63%', mapActive: false,
    },
    {
      id: 3, icon: '◈', title: 'Product Lead', company: 'Coinbase', location: 'San Francisco, CA',
      desc: 'Own the product vision for our retail trading experience and mobile platforms...',
      salary: '$150k – $190k', posted: '2 WEEKS AGO', salaryColor: '#334155',
      mapLabel: 'Coinbase • $190k', mapX: '78%', mapY: '72%', mapActive: false,
    },
  ];

  const selected = jobs[selectedJob];
  const toggleSave = (id) => setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-card { padding: 16px; border-radius: 12px; cursor: pointer; transition: all 0.15s; border: 1px solid #E2E8F0; background: #fff; }
        .job-card.active { background: rgba(19,127,236,0.05); border-color: #137FEC; }
        .job-card:hover:not(.active) { background: #F8FAFC; }
        .filter-pill { padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; font-family: 'Inter',sans-serif; transition: all 0.15s; }
        .map-pin { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; transform: translateX(-50%); }
        .map-label { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; white-space: nowrap; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .map-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 4px rgba(19,127,236,0.2); }
        .zoom-btn { width: 40px; height: 40px; background: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0px 20px 25px -5px rgba(0,0,0,0.1); font-family: 'Inter',sans-serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '64px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', color: '#137FEC' }}>🔍</span>
            <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobFinder</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '48px', width: '320px', padding: '6px 12px', gap: '8px' }}>
            <span style={{ color: '#64748B', fontSize: '13px', flexShrink: 0 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles, skills, or companies" style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', flex: 1 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '24px', paddingRight: '24px', borderRight: '1px solid #E2E8F0' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', textDecoration: 'none', borderBottom: '2px solid #137FEC', paddingBottom: '20px', paddingTop: '20px' }}>Find Jobs</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569', textDecoration: 'none' }}>Messages</a>
            <a href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#475569', textDecoration: 'none' }}>Hiring</a>
          </div>
          <button style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>🔔</button>
          <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👤</div>
        </div>
      </nav>

      {/* MAIN — Split panel */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* LEFT PANEL */}
        <aside style={{ width: '450px', flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Jobs in San Francisco</h2>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', fontSize: '12px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                ☰ Filters
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f} className="filter-pill" onClick={() => setActiveFilter(f)}
                  style={{ background: activeFilter === f ? '#137FEC' : '#F1F5F9', color: activeFilter === f ? '#fff' : '#334155' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {jobs.map((job, i) => (
              <div key={job.id} className={`job-card${selectedJob === i ? ' active' : ''}`} onClick={() => setSelectedJob(i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>{job.icon}</div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{job.title}</h3>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); toggleSave(job.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: saved.includes(job.id) ? '#137FEC' : '#94A3B8', flexShrink: 0 }}>🔖</button>
                </div>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px', marginBottom: '8px' }}>{job.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: job.salaryColor }}>{job.salary}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{job.posted}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT — Map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#E2E8F0' }}>
          {/* Map Background */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 30%, #dbeafe 60%, #eff6ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '80px', opacity: 0.15 }}>🗺️</div>
            {/* Fake map grid */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            {/* Map labels */}
            {['San Francisco', 'SOMA', 'Mission District', 'Castro', 'Noe Valley', 'Haight'].map((label, i) => (
              <div key={label} style={{ position: 'absolute', left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 20}%`, fontSize: '11px', fontWeight: '600', color: '#475569', opacity: 0.7, whiteSpace: 'nowrap' }}>{label}</div>
            ))}
          </div>

          {/* Map Pins */}
          {jobs.map((job, i) => (
            <div key={job.id} className="map-pin" style={{ left: job.mapX, top: job.mapY }} onClick={() => setSelectedJob(i)}>
              <div className="map-label" style={{ background: selectedJob === i ? '#137FEC' : '#FFFFFF', color: selectedJob === i ? '#fff' : '#0F172A' }}>
                {job.mapLabel}
              </div>
              <div className="map-dot" style={{ background: selectedJob === i ? '#137FEC' : '#64748B', width: selectedJob === i ? '16px' : '12px', height: selectedJob === i ? '16px' : '12px' }} />
            </div>
          ))}

          {/* Zoom Controls */}
          <div style={{ position: 'absolute', right: '48px', bottom: '48px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
            <button className="zoom-btn" onClick={() => setZoom(z => Math.min(z + 1, 18))}>+</button>
            <button className="zoom-btn" onClick={() => setZoom(z => Math.max(z - 1, 1))}>−</button>
            <button className="zoom-btn" style={{ background: '#137FEC', color: '#fff' }}>📍</button>
          </div>

          {/* Selected Job Popup */}
          <div style={{ position: 'absolute', left: '24px', bottom: '24px', width: '294px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>{selected.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '12px', color: '#137FEC' }}>📍</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{selected.address || selected.company + ' Headquarters'}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>{selected.addressLine || selected.location}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '6px 12px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>View Job</button>
                  <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapJobSearch;