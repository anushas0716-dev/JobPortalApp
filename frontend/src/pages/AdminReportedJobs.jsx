import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reports = [
  { id: 1, title: 'Senior React Developer',      company: 'StellarTech Solutions', posted: 'Posted 2d ago', reporter: 'user_jdoe88',       date: 'Oct 24, 2023 • 14:20 PM', reason: 'Spam',       reasonBg: '#FEE2E2', reasonColor: '#991B1B', notes: '"This is a repeat post for a position that has already been filled multiple times."' },
  { id: 2, title: 'Remote Data Entry ($50/hr)',   company: 'Global eHires Ltd',     posted: 'Posted 5h ago', reporter: 'security_analyst',  date: 'Oct 23, 2023 • 09:12 AM', reason: 'Fraudulent', reasonBg: '#FFEDD5', reasonColor: '#9A3412', notes: '"Asking for credit card details in the application form. Classic phishing pattern."' },
  { id: 3, title: 'Marketing Manager',            company: 'Vibe Agency',           posted: 'Posted 1w ago', reporter: 'pro_seeker_9',      date: 'Oct 22, 2023 • 11:45 AM', reason: 'Inaccurate', reasonBg: '#DBEAFE', reasonColor: '#1E40AF', notes: '"Job description lists \'junior\' requirements but salary and title are senior-level."' },
  { id: 4, title: 'Product Designer (UI/UX)',     company: 'Creativelow',           posted: 'Posted 3d ago', reporter: 'anonymous_rep',     date: 'Oct 21, 2023 • 18:30 PM', reason: 'Spam',       reasonBg: '#FEE2E2', reasonColor: '#991B1B', notes: '"Redirects to a gambling site when you click \'Apply\'. Dangerous link."' },
];

const stats = [
  { label: 'TOTAL REPORTS',   value: '1,284',   badge: '+12%',        badgeBg: 'rgba(239,68,68,0.1)', badgeColor: '#EF4444' },
  { label: 'SPAM FLAGGED',    value: '842',     badge: '65% of total', badgeBg: null,                  badgeColor: '#94A3B8' },
  { label: 'FRAUD POTENTIAL', value: '42',      badge: 'High Risk',    badgeBg: 'rgba(239,68,68,0.1)', badgeColor: '#EF4444', valueColor: '#DC2626' },
  { label: 'RESOLVED TODAY',  value: '156',     badge: '✅',           badgeBg: null,                  badgeColor: '#22C55E', valueColor: '#16A34A' },
];

const navItems = [
  { icon: '⊞', label: 'Dashboard',     path: '/admin/dashboard' },
  { icon: '💼', label: 'All Jobs',      path: '/employer/manage-jobs' },
  { icon: '🚩', label: 'Reported Jobs', path: '/admin/reported-jobs', active: true },
  { icon: '👥', label: 'Users',         path: '/admin/users' },
  { icon: '💳', label: 'Subscriptions', path: '/admin/billing' },
];

const filterTabs = ['All Reports', 'Spam', 'Fraudulent', 'Inaccurate'];

const AdminReportedJobs = () => {
  const [activeFilter, setActiveFilter] = useState('All Reports');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const filtered = reports.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.reporter.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All Reports' || r.reason === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #6B7280; }
        input:focus { outline: none; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #475569; border: none; background: none; font-family: 'Inter',sans-serif; width: 100%; text-align: left; transition: background 0.15s; }
        .nav-item:hover { background: rgba(19,127,236,0.06); }
        .nav-item.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 600; }
        .filter-pill { padding: 6px 16px; border-radius: 9999px; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
        .filter-pill.active { background: #137FEC; color: #fff; }
        .filter-pill.inactive { background: #E2E8F0; color: #334155; }
        .filter-pill:hover { opacity: 0.85; }
        .table-row { display: grid; grid-template-columns: 2.2fr 1.4fr 1fr 1.5fr 100px; gap: 32px; align-items: center; padding: 20px 24px; border-top: 1px solid #F1F5F9; transition: background 0.15s; cursor: pointer; }
        .table-row:hover { background: #FAFBFC; }
        .table-row:first-of-type { border-top: none; }
        .btn-action { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #fff; cursor: pointer; padding: 8px 14px; display: flex; align-items: center; gap: 6px; box-shadow: 0 1px 2px rgba(19,127,236,0.2); transition: background 0.2s; white-space: nowrap; }
        .btn-action:hover { background: #0e6fd4; }
        .btn-export { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #0F172A; cursor: pointer; padding: 8px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
        .btn-export:hover { background: #F8FAFC; }
        .page-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 4px; border: 1px solid #E2E8F0; background: none; font-family: 'Inter',sans-serif; font-size: 14px; cursor: pointer; transition: all 0.15s; color: #475569; }
        .page-btn:hover { background: #F1F5F9; }
        .page-btn.active { background: #137FEC; color: #fff; border-color: #137FEC; font-weight: 700; }
        .page-btn.disabled { opacity: 0.4; cursor: not-allowed; }
        .stat-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .clear-btn { background: none; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #137FEC; cursor: pointer; padding: 0; }
        .clear-btn:hover { text-decoration: underline; }
      `}</style>

      {/* LEFT SIDEBAR */}
      <aside style={{ width: 220, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', padding: '0 0 16px', minHeight: '100vh', flexShrink: 0 }}>
        {/* ✅ Logo → admin dashboard */}
        <div onClick={() => navigate('/admin/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 20px 16px', cursor: 'pointer' }}>
          <div style={{ width: 33, height: 33, background: '#137FEC', borderRadius: 8, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🛡️</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px', color: '#0F172A' }}>Admin Console</span>
        </div>
        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            /* ✅ Sidebar nav → navigate */
            <button key={item.label} className={`nav-item${item.active ? ' active' : ''}`} onClick={() => navigate(item.path)}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px 0', borderTop: '1px solid #E2E8F0' }}>
          {/* ✅ Settings */}
          <button className="nav-item" onClick={() => navigate('/admin/settings')}>
            <span style={{ fontSize: 16 }}>⚙️</span>
            Settings
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 448 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#94A3B8' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reported listings..." style={{ width: '100%', height: 36, padding: '0 16px 0 40px', background: '#F1F5F9', border: 'none', borderRadius: 8, fontSize: 14 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* ✅ Bell → notifications */}
            <button onClick={() => navigate('/notifications')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: 6 }}>
              🔔
              <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '2px solid #fff' }} />
            </button>
            <div style={{ width: 1, height: 32, background: '#E2E8F0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', textAlign: 'right' }}>Alex Rivera</p>
                <p style={{ fontSize: 12, color: '#64748B', textAlign: 'right' }}>Super Admin</p>
              </div>
              {/* ✅ Avatar → profile */}
              <div onClick={() => navigate('/employer/profile')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>👤</div>
            </div>
          </div>
        </header>

        <main style={{ padding: 40, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 600 }}>
              <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.75px' }}>Reported Jobs</h1>
              <p style={{ fontSize: 16, color: '#64748B', lineHeight: '24px' }}>Manage and review job postings flagged by the community. Investigate potential fraud, spam, or inaccuracies to maintain platform quality.</p>
            </div>
            {/* ✅ Export CSV */}
            <button className="btn-export" onClick={() => alert('Exporting CSV...')}>⬇ Export CSV</button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24 }}>
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <p style={{ fontSize: 12, fontWeight: 700, color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>{s.label}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: s.valueColor || '#0F172A' }}>{s.value}</p>
                  <span style={{ background: s.badgeBg || 'none', color: s.badgeColor, fontSize: 12, fontWeight: 500, padding: s.badgeBg ? '2px 8px' : 0, borderRadius: 4 }}>{s.badge}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {filterTabs.map(tab => (
              <button key={tab} className={`filter-pill ${activeFilter === tab ? 'active' : 'inactive'}`} onClick={() => setActiveFilter(tab)}>
                {tab === 'All Reports' ? `${tab} ▾` : tab}
              </button>
            ))}
            <div style={{ width: 1, height: 24, background: '#CBD5E1', margin: '0 4px' }} />
            <button className="clear-btn" onClick={() => setActiveFilter('All Reports')}>Clear all filters</button>
          </div>

          {/* Table */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1fr 1.5fr 100px', gap: 32, padding: '14px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['JOB DETAILS', 'REPORTER INFO', 'REASON', 'NOTES', 'ACTION'].map(col => (
                <div key={col} style={{ fontSize: 11, fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{col}</div>
              ))}
            </div>
            <div>
              {filtered.map(report => (
                /* ✅ Row → job detail */
                <div key={report.id} className="table-row" onClick={() => navigate(`/jobs/${report.id}`)}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, background: '#F1F5F9', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🏢</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 2, lineHeight: '20px' }}>{report.title}</p>
                      <p style={{ fontSize: 12, color: '#64748B', lineHeight: '16px' }}>{report.company} • {report.posted}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#0F172A', marginBottom: 4 }}>{report.reporter}</p>
                    <p style={{ fontSize: 12, color: '#64748B' }}>{report.date}</p>
                  </div>
                  <div>
                    <span style={{ background: report.reasonBg, color: report.reasonColor, fontSize: 12, fontWeight: 500, padding: '2px 10px', borderRadius: 9999 }}>{report.reason}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#475569', lineHeight: '20px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{report.notes}</div>
                  <div>
                    {/* ✅ Take Action → alert */}
                    <button className="btn-action" onClick={e => { e.stopPropagation(); alert(`Taking action on: ${report.title}`); }}>Take Action ›</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid #E2E8F0' }}>
              <p style={{ fontSize: 14, color: '#64748B' }}>Showing <strong style={{ color: '#0F172A' }}>1 to 10</strong> of <strong style={{ color: '#0F172A' }}>1,284</strong> reports</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="page-btn disabled" disabled>‹</button>
                {[1, 2, 3].map(p => (
                  <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="page-btn" onClick={() => setPage(p => Math.min(p + 1, 3))}>›</button>
              </div>
            </div>
          </div>

          {/* Footer cards */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1, background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20, color: '#137FEC' }}>ℹ️</span>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Moderation Tip</p>
              </div>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: '23px' }}>When reviewing <strong>Fraudulent</strong> reports, always check the company's registration details and past job posting history. If multiple users report the same listing for phishing, consider an immediate temporary suspension of the employer account.</p>
            </div>
            <div style={{ flex: 1, background: '#F1F5F9', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Quick Stats</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: '#64748B' }}>Average resolution time</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>4.2 hours</span>
                </div>
                <div style={{ position: 'relative', height: 6, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '85%', background: '#22C55E', borderRadius: 9999 }} />
                </div>
                <p style={{ fontSize: 11, color: '#94A3B8' }}>85% of reports are handled within the 24h SLA period.</p>
              </div>
            </div>
          </div>
        </main>

        <footer style={{ borderTop: '1px solid #E2E8F0', padding: '20px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#94A3B8' }}>© 2023 JobPortal Admin Panel • v2.4.0 • All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminReportedJobs;