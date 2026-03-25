import React, { useState } from 'react';

const RecentlyViewed = () => {
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [roleFilter, setRoleFilter] = useState('Role Type');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [search, setSearch] = useState('');

  const [jobs, setJobs] = useState([
    {
      id: 1, group: 'TODAY', status: 'ACTIVE', statusColor: '#137FEC', statusBg: '#EFF6FF',
      viewedAt: 'Viewed 2 hours ago', title: 'Senior Product Designer',
      company: 'TechFlow Inc.', location: 'Remote (USA)',
      tags: ['Figma', 'Design Systems', '$140k - $180k'],
      action: 'View Details', actionStyle: 'primary',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=150&fit=crop',
    },
    {
      id: 2, group: 'TODAY', status: 'EXPIRED', statusColor: '#DC2626', statusBg: '#FEF2F2',
      viewedAt: 'Viewed 5 hours ago', title: 'Lead Frontend Engineer',
      company: 'Creative Solutions', location: 'New York, NY',
      tags: ['React', 'TypeScript', 'Next.js'],
      action: 'View Similar', actionStyle: 'outline',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=150&fit=crop&grayscale',
    },
    {
      id: 3, group: 'YESTERDAY', status: 'APPLIED', statusColor: '#059669', statusBg: '#ECFDF5',
      viewedAt: 'Viewed Yesterday, 2:45 PM', title: 'UX Researcher',
      company: 'Global Insights', location: 'Chicago, IL',
      tags: ['User Interviews', 'A/B Testing'],
      action: 'Check Status', actionStyle: 'primary',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop',
    },
  ]);

  const groups = [...new Set(jobs.map(j => j.group))];
  const filtered = jobs.filter(j => !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  const handleClear = () => { if (window.confirm('Clear all history?')) setJobs([]); };
  const handleSave = (id) => alert(`Job ${id} saved!`);

  const StatusBadge = ({ status, color, bg }) => (
    <span style={{ background: bg, color, fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{status}</span>
  );

  const Tag = ({ label }) => (
    <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: '500', padding: '4px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>{label}</span>
  );

  const filterBtns = [
    { label: 'All Time', icon: '▾', active: true },
    { label: 'Role Type', icon: '▾' },
    { label: 'Remote Only', icon: '🔄', toggle: true },
    { label: 'Salary Range', icon: '💰' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; transition: box-shadow 0.2s; }
        .job-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .btn-primary { padding: 9px 20px; background: #137FEC; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; }
        .btn-primary:hover { background: #1068c7; }
        .btn-outline { padding: 9px 20px; background: #fff; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 14px; font-weight: 600; color: #334155; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
        .btn-outline:hover { border-color: #137FEC; color: #137FEC; }
        .filter-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '56px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#137FEC', borderRadius: '8px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '14px' }}>💼</span>
            </div>
            <span style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A' }}>CareerTrack</span>
          </div>
          {['Jobs', 'Applied', 'Saved'].map(item => (
            <a key={item} href={item === 'Jobs' ? '/jobs' : '#'} style={{ fontSize: '14px', fontWeight: '500', color: '#475569', textDecoration: 'none' }}>{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 14px', width: '240px' }}>
            <span style={{ color: '#94A3B8', fontSize: '14px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search history..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter', sans-serif", background: 'transparent', flex: 1, color: '#0F172A' }} />
          </div>
          <div style={{ width: '34px', height: '34px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer' }}>👤</div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.7px', marginBottom: '6px' }}>Recently Viewed</h1>
            <p style={{ fontSize: '14px', color: '#64748B' }}>Review the positions you've explored in the last 30 days.</p>
          </div>
          <button onClick={handleClear} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '600', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif", padding: '4px 0' }}>
            🗑️ Clear History
          </button>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {/* All Time */}
          <button className="filter-btn" style={{ background: '#137FEC', border: 'none', color: '#fff', fontWeight: '600' }}>
            All Time <span>▾</span>
          </button>
          {/* Role Type */}
          <button className="filter-btn" style={{ background: '#fff', border: '1px solid #E2E8F0', color: '#475569' }}>
            Role Type <span>▾</span>
          </button>
          {/* Remote Only toggle */}
          <button onClick={() => setRemoteOnly(!remoteOnly)} className="filter-btn" style={{ background: '#fff', border: '1px solid #E2E8F0', color: '#475569', gap: '8px' }}>
            Remote Only
            <div style={{ width: '36px', height: '20px', background: remoteOnly ? '#137FEC' : '#E2E8F0', borderRadius: '9999px', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', top: '2px', left: remoteOnly ? '18px' : '2px', transition: 'left 0.2s' }} />
            </div>
          </button>
          {/* Salary Range */}
          <button className="filter-btn" style={{ background: '#fff', border: '1px solid #E2E8F0', color: '#475569' }}>
            Salary Range <span style={{ fontSize: '12px' }}>💰</span>
          </button>
        </div>

        {/* Job Groups */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#94A3B8' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>No history found</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>Start browsing jobs to see them here.</p>
          </div>
        ) : (
          groups.map(group => {
            const groupJobs = filtered.filter(j => j.group === group);
            if (groupJobs.length === 0) return null;
            return (
              <div key={group} style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>{group}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {groupJobs.map(job => (
                    <div key={job.id} className="job-card">
                      <div style={{ flex: 1 }}>
                        {/* Status + time */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <StatusBadge status={job.status} color={job.statusColor} bg={job.statusBg} />
                          <span style={{ fontSize: '12px', color: '#94A3B8' }}>{job.viewedAt}</span>
                        </div>
                        {/* Title */}
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>{job.title}</h2>
                        {/* Company + Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748B', marginBottom: '14px' }}>
                          <span>🏢 {job.company}</span>
                          <span style={{ color: '#CBD5E1' }}>•</span>
                          <span>📍 {job.location}</span>
                        </div>
                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                          {job.tags.map(t => <Tag key={t} label={t} />)}
                        </div>
                        {/* Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {job.actionStyle === 'primary'
                            ? <button className="btn-primary">{job.action}</button>
                            : <button className="btn-outline">{job.action}</button>
                          }
                          {job.status !== 'EXPIRED' && (
                            <button onClick={() => handleSave(job.id)} style={{ width: '36px', height: '36px', background: 'none', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔖</button>
                          )}
                        </div>
                      </div>
                      {/* Image */}
                      <img src={job.image} alt={job.title} style={{ width: '150px', height: '120px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, filter: job.status === 'EXPIRED' ? 'grayscale(100%)' : 'none' }} onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '16px' }}>Showing {filtered.length} of 12 recently viewed jobs</p>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '9999px', fontSize: '14px', fontWeight: '600', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Load Older History 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;