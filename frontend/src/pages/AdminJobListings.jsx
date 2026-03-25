import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const jobs = [
  { id: 1, title: 'Senior Full Stack Engineer', type: 'Full-time', location: 'Remote', initials: 'SL', initBg: '#DBEAFE', initColor: '#2563EB', company: 'Stripe Labs', date: 'Oct 24, 2023', status: 'LIVE', statusDot: '#22C55E', statusBg: '#F0FDF4', statusColor: '#16A34A', reports: null },
  { id: 2, title: 'Product Designer', type: 'Contract', location: 'New York, NY', initials: 'FG', initBg: '#FEF9C3', initColor: '#CA8A04', company: 'Figma', date: 'Oct 22, 2023', status: 'PENDING', statusDot: '#F59E0B', statusBg: '#FFFBEB', statusColor: '#B45309', reports: null },
  { id: 3, title: 'Marketing Specialist', type: 'Part-time', location: 'Remote', initials: 'AS', initBg: '#E0E7FF', initColor: '#4F46E5', company: 'Asana', date: 'Oct 15, 2023', status: 'EXPIRED', statusDot: '#94A3B8', statusBg: '#F1F5F9', statusColor: '#475569', reports: '3 Reports' },
  { id: 4, title: 'Backend Architect', type: 'Full-time', location: 'San Francisco, CA', initials: 'SH', initBg: '#D1FAE5', initColor: '#059669', company: 'Shopify', date: 'Oct 23, 2023', status: 'LIVE', statusDot: '#22C55E', statusBg: '#F0FDF4', statusColor: '#16A34A', reports: null },
];

const statusTabs = [
  { label: 'All Jobs (1,429)', active: true },
  { label: 'Live (1,102)', active: false },
  { label: 'Pending (84)', active: false },
  { label: 'Expired (243)', active: false },
];

const sideNav = [
  { section: 'MANAGEMENT', items: [
    { icon: '⊞', label: 'Overview',     path: '/admin/dashboard' },
    { icon: '💼', label: 'Job Listings', path: '/employer/manage-jobs', active: true },
    { icon: '🏢', label: 'Companies',    path: '/employer/profile' },
    { icon: '👥', label: 'Candidates',   path: '/admin/users' },
  ]},
  { section: 'REPORTS & AUDIT', items: [
    { icon: '🚩', label: 'Reported Content', path: '/admin/reported-jobs' },
    { icon: '📊', label: 'Usage Analytics',  path: '/employer/analytics' },
  ]},
];

const AdminJobListings = () => {
  const [search, setSearch] = useState('');
  const [quickSearch, setQuickSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Jobs (1,429)');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #94A3B8; }
        input:focus { outline: none; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #475569; border: none; background: none; font-family: 'Inter',sans-serif; width: 100%; text-align: left; transition: background 0.15s; }
        .nav-item:hover { background: rgba(19,127,236,0.06); }
        .nav-item.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 600; }
        .top-nav-link { font-size: 14px; font-weight: 500; color: #475569; background: none; border: none; cursor: pointer; font-family: 'Inter',sans-serif; padding-bottom: 2px; border-bottom: 2px solid transparent; transition: color 0.15s; }
        .top-nav-link:hover { color: #137FEC; }
        .top-nav-link.active { color: #137FEC; font-weight: 600; border-bottom-color: #137FEC; }
        .btn-export { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #0F172A; cursor: pointer; padding: 10px 20px; transition: background 0.15s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .btn-export:hover { background: #F8FAFC; }
        .btn-post { display: flex; align-items: center; gap: 8px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 10px 20px; box-shadow: 0 1px 2px rgba(19,127,236,0.2); transition: background 0.2s; white-space: nowrap; }
        .btn-post:hover { background: #0e6fd4; }
        .status-tab { padding: 6px 16px; border-radius: 9999px; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 500; color: #475569; background: none; cursor: pointer; transition: all 0.15s; }
        .status-tab:hover { background: #F1F5F9; }
        .status-tab.active { background: #137FEC; color: #fff; font-weight: 600; }
        .filter-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; color: #475569; cursor: pointer; white-space: nowrap; }
        .filter-btn:hover { background: #F8FAFC; }
        .table-row { display: grid; grid-template-columns: 2fr 1.2fr 1.2fr 1fr 1fr 80px; align-items: center; padding: 0 24px; min-height: 72px; border-top: 1px solid #F1F5F9; transition: background 0.15s; cursor: pointer; gap: 16px; }
        .table-row:first-of-type { border-top: none; }
        .table-row:hover { background: #F8FAFC; }
        .dot-menu { background: none; border: none; cursor: pointer; font-size: 18px; color: #94A3B8; padding: 4px; border-radius: 4px; }
        .dot-menu:hover { background: #F1F5F9; }
        .page-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; border: 1px solid #E2E8F0; background: none; font-family: 'Inter',sans-serif; font-size: 14px; cursor: pointer; transition: all 0.15s; font-weight: 400; color: #0F172A; }
        .page-btn:hover { background: #F1F5F9; }
        .page-btn.active { background: #137FEC; color: #fff; border-color: #137FEC; font-weight: 700; }
        .page-btn.disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* LEFT SIDEBAR */}
        <aside style={{ width: 240, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', padding: '24px 16px', minHeight: '100vh', flexShrink: 0 }}>
          {sideNav.map(group => (
            <div key={group.section} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase', padding: '0 12px', marginBottom: 8 }}>{group.section}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {group.items.map(item => (
                  /* ✅ Sidebar nav → navigate */
                  <button key={item.label} className={`nav-item${item.active ? ' active' : ''}`} onClick={() => navigate(item.path)}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '16px 12px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Status</span>
            </div>
            <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: '18px' }}>All systems operational. Last sync: 2m ago.</p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top header */}
          <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
                {/* ✅ Logo → admin dashboard */}
                <div onClick={() => navigate('/admin/dashboard')} style={{ width: 32, height: 32, background: '#137FEC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }}>💼</div>
                <span onClick={() => navigate('/admin/dashboard')} style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', cursor: 'pointer' }}>JobPortal <span style={{ color: '#137FEC' }}>Admin</span></span>
              </div>
              <div style={{ position: 'relative', width: 280 }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#94A3B8' }}>🔍</span>
                <input value={quickSearch} onChange={e => setQuickSearch(e.target.value)} placeholder="Quick search..." style={{ width: '100%', height: 36, padding: '0 16px 0 36px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0F172A' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <nav style={{ display: 'flex', gap: 24 }}>
                {/* ✅ Top nav */}
                <button className="top-nav-link" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
                <button className={`top-nav-link active`} onClick={() => navigate('/employer/manage-jobs')}>Jobs</button>
                <button className="top-nav-link" onClick={() => navigate('/admin/users')}>Users</button>
                <button className="top-nav-link" onClick={() => navigate('/employer/analytics')}>Analytics</button>
              </nav>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* ✅ Bell → notifications */}
                <button onClick={() => navigate('/notifications')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>
                  🔔
                  <div style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, background: '#EF4444', borderRadius: '50%', border: '1.5px solid #fff' }} />
                </button>
                {/* ✅ Settings */}
                <button onClick={() => navigate('/admin/settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>⚙️</button>
                {/* ✅ Avatar → profile */}
                <div onClick={() => navigate('/employer/profile')} style={{ width: 36, height: 36, borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>👤</div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main style={{ padding: 32, flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.8px', marginBottom: 6 }}>Job Listings</h1>
                <p style={{ fontSize: 15, color: '#64748B' }}>Monitor and manage 1,429 job postings across the network.</p>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {/* ✅ Export CSV */}
                <button className="btn-export" onClick={() => alert('Exporting CSV...')}>⬇ Export CSV</button>
                {/* ✅ Post New Job */}
                <button className="btn-post" onClick={() => navigate('/employer/post-job')}>+ Post New Job</button>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: 480 }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#94A3B8' }}>🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by job title, company name, or keywords..." style={{ width: '100%', height: 40, padding: '0 16px 0 40px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0F172A' }} />
                </div>
                <button className="filter-btn">Category: All ▾</button>
                <button className="filter-btn">Location: All ▾</button>
                <button className="filter-btn">⚙ More filters</button>
              </div>

              <div style={{ padding: '16px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 8 }}>
                {statusTabs.map(tab => (
                  <button key={tab.label} className={`status-tab${activeTab === tab.label ? ' active' : ''}`} onClick={() => setActiveTab(tab.label)}>{tab.label}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1fr 1fr 80px', padding: '12px 24px', gap: 16, background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
                {['JOB TITLE', 'COMPANY', 'DATE POSTED', 'STATUS', 'REPORTS', 'ACTIONS'].map((col, i) => (
                  <div key={col} style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase', textAlign: i === 5 ? 'center' : 'left' }}>{col}</div>
                ))}
              </div>

              <div>
                {filtered.map(job => (
                  /* ✅ Table row → job detail */
                  <div key={job.id} className="table-row" onClick={() => navigate(`/jobs/${job.id}`)}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 3 }}>{job.title}</p>
                      <p style={{ fontSize: 13, color: '#94A3B8' }}>{job.type} • {job.location}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, background: job.initBg, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: job.initColor, flexShrink: 0 }}>{job.initials}</div>
                      <span style={{ fontSize: 14, color: '#0F172A', fontWeight: 500 }}>{job.company}</span>
                    </div>
                    <div style={{ fontSize: 14, color: '#475569' }}>{job.date}</div>
                    <div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: job.statusBg, color: job.statusColor, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 9999, letterSpacing: '0.5px' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: job.statusDot, flexShrink: 0 }} />
                        {job.status}
                      </span>
                    </div>
                    <div>
                      {job.reports ? (
                        /* ✅ Reports badge → reported jobs */
                        <span onClick={e => { e.stopPropagation(); navigate('/admin/reported-jobs'); }} style={{ background: '#FEE2E2', color: '#DC2626', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 6, cursor: 'pointer' }}>{job.reports}</span>
                      ) : (
                        <span style={{ fontSize: 14, color: '#CBD5E1' }}>None</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {/* ✅ Dot menu → job detail */}
                      <button className="dot-menu" onClick={e => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}>⋮</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid #F1F5F9' }}>
                <p style={{ fontSize: 14, color: '#64748B' }}>Showing <strong style={{ color: '#0F172A' }}>1-10</strong> of <strong style={{ color: '#0F172A' }}>1,429</strong> jobs</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button className="page-btn disabled" disabled>‹</button>
                  {[1, 2, 3].map(p => (
                    <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                  ))}
                  <button className="page-btn" onClick={() => setPage(p => Math.min(p + 1, 3))}>›</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminJobListings;