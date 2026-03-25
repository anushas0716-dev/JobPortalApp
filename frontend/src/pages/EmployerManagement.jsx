import React, { useState } from 'react';

const employers = [
  { id: 'EMP-8942', initial: 'T', initBg: '#DBEAFE', initColor: '#2563EB', name: 'TechFlow Inc.', industry: 'Information Tech', jobs: 12, plan: 'Enterprise', planBg: '#EFF6FF', planColor: '#1D4ED8', statusDot: '#22C55E', status: 'Verified' },
  { id: 'EMP-7721', initial: 'G', initBg: '#E0E7FF', initColor: '#4F46E5', name: 'GreenSphere', industry: 'Renewable Energy', jobs: 4, plan: 'Pro', planBg: '#F1F5F9', planColor: '#475569', statusDot: '#EAB308', status: 'Pending' },
  { id: 'EMP-4109', initial: 'S', initBg: '#FFEDD5', initColor: '#EA580C', name: 'StudioX Design', industry: 'Creative Arts', jobs: 28, plan: 'Platinum', planBg: '#FAF5FF', planColor: '#7E22CE', statusDot: '#22C55E', status: 'Verified' },
  { id: 'EMP-2234', initial: 'F', initBg: '#D1FAE5', initColor: '#059669', name: 'FinEdge Capital', industry: 'Finance', jobs: 0, plan: 'Free', planBg: '#F1F5F9', planColor: '#475569', statusDot: '#EF4444', status: 'Suspended' },
  { id: 'EMP-5561', initial: 'L', initBg: '#FFE4E6', initColor: '#E11D48', name: 'Lumina Media', industry: 'Marketing', jobs: 7, plan: 'Pro', planBg: '#F1F5F9', planColor: '#475569', statusDot: '#22C55E', status: 'Verified' },
];

const stats = [
  { icon: '🏢', iconBg: 'rgba(19,127,236,0.1)', label: 'Total Employers', value: '1,284', badge: '+12%', badgeBg: '#F0FDF4', badgeColor: '#16A34A' },
  { icon: '🛡️', iconBg: '#FEF9C3', label: 'Pending Verification', value: '42', badge: 'Pending', badgeBg: null, badgeColor: '#94A3B8' },
  { icon: '💼', iconBg: 'rgba(19,127,236,0.1)', label: 'Active Job Posts', value: '3,150', badge: '+18%', badgeBg: '#F0FDF4', badgeColor: '#16A34A' },
  { icon: '💳', iconBg: '#F1F5F9', label: 'Monthly Revenue', value: '$14.2k', badge: 'Premium', badgeBg: null, badgeColor: '#137FEC' },
];

const navItems = [
  { icon: '⊞', label: 'Dashboard' },
  { icon: '🏢', label: 'Employers', active: true },
  { icon: '👥', label: 'Job Seekers' },
  { icon: '📄', label: 'Job Postings' },
  { icon: '📊', label: 'Reports' },
  { icon: '⚙️', label: 'Settings' },
];

const EmployerManagement = () => {
  const [search, setSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleRow = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === employers.length ? [] : employers.map(e => e.id));

  const filtered = employers.filter(e =>
    e.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
    e.industry.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #6B7280; }
        input:focus { outline: none; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #475569; border: none; background: none; font-family: 'Inter',sans-serif; width: 100%; text-align: left; transition: background 0.15s; }
        .nav-item:hover { background: rgba(19,127,236,0.05); }
        .nav-item.active { background: rgba(19,127,236,0.1); color: #137FEC; }
        .stat-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; flex: 1; height: 158px; position: relative; overflow: hidden; }
        .btn-export { display: flex; align-items: center; gap: 8px; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #0F172A; cursor: pointer; padding: 8px 16px; transition: background 0.15s; }
        .btn-export:hover { background: #E2E8F0; }
        .btn-add { display: flex; align-items: center; gap: 8px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 8.5px 16px; box-shadow: 0px 1px 2px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-add:hover { background: #0e6fd4; }
        .bulk-btn { background: #F1F5F9; border: none; border-radius: 4px; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #0F172A; cursor: pointer; padding: 6px 12px; transition: background 0.15s; }
        .bulk-btn:hover { background: #E2E8F0; }
        .table-row { display: flex; align-items: center; gap: 16px; border-top: 1px solid #F1F5F9; cursor: pointer; transition: background 0.15s; }
        .table-row:hover { background: #F8FAFC; }
        .table-row:first-of-type { border-top: none; }
        .dot-menu { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 4px; color: #94A3B8; font-size: 16px; }
        .dot-menu:hover { background: #F1F5F9; }
        .page-btn { display: flex; align-items: center; justify-content: center; height: 38px; min-width: 38px; border-radius: 8px; border: 1px solid #E2E8F0; background: none; font-family: 'Inter',sans-serif; font-size: 14px; cursor: pointer; padding: 0 8px; transition: background 0.15s; }
        .page-btn:hover { background: #F1F5F9; }
        .page-btn.active { background: #137FEC; color: #fff; border-color: #137FEC; font-weight: 700; }
        .page-btn.disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{ width: 256, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 24 }}>
          <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: 8, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>💼</div>
          <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#0F172A' }}>AdminPortal</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => (
            <button key={item.label} className={`nav-item${item.active ? ' active' : ''}`}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16, marginTop: 8 }}>
            <button className="nav-item">
              <span style={{ fontSize: 16 }}>⚙️</span>
              Settings
            </button>
          </div>
        </nav>

        {/* User profile */}
        <div style={{ borderTop: '1px solid #E2E8F0', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>👤</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Alex Rivera</p>
              <p style={{ fontSize: 12, color: '#64748B' }}>Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 448 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#94A3B8' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search platform..." style={{ width: '100%', height: 36, padding: '9px 16px 10px 40px', background: '#F1F5F9', border: 'none', borderRadius: 8, fontSize: 14, color: '#0F172A' }} />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button style={{ width: 29, height: 33, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, position: 'relative' }}>
              🔔
              <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: '#EF4444', border: '2px solid #fff', borderRadius: '50%' }} />
            </button>
            <button style={{ width: 33, height: 33, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>❓</button>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32, overflowY: 'auto', flex: 1 }}>

          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>Employer Management</h1>
              <p style={{ fontSize: 16, color: '#64748B' }}>Review, verify and manage company profiles and their activity.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-export">⬇ Export</button>
              <button className="btn-add">+ Add Company</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ position: 'relative', height: 158, display: 'flex', gap: 24 }}>
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'absolute', top: 25, left: 25, right: 25 }}>
                  <div style={{ width: 31, height: 31, background: s.iconBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{s.icon}</div>
                  <span style={{ background: s.badgeBg || 'none', color: s.badgeColor, fontSize: 12, fontWeight: 700, padding: s.badgeBg ? '4px 8px' : 0, borderRadius: '9999px' }}>{s.badge}</span>
                </div>
                <p style={{ position: 'absolute', top: 77, left: 25, right: 25, fontSize: 14, fontWeight: 500, color: '#64748B' }}>{s.label}</p>
                <p style={{ position: 'absolute', top: 101, left: 25, right: 25, fontSize: 24, fontWeight: 700, color: '#0F172A' }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Table container */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden' }}>

            {/* Table filter bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative', width: 288 }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#94A3B8' }}>🔍</span>
                  <input value={tableSearch} onChange={e => setTableSearch(e.target.value)} placeholder="Filter by company, industry..." style={{ width: '100%', height: 36, padding: '9px 16px 10px 40px', background: '#F1F5F9', border: 'none', borderRadius: 8, fontSize: 14 }} />
                </div>
                <button style={{ width: 33, height: 33, border: '1px solid #E2E8F0', borderRadius: 8, background: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚙️</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, color: '#64748B', marginRight: 8 }}>Bulk Actions:</span>
                {['Delete', 'Verify', 'Change Plan'].map(action => (
                  <button key={action} className="bulk-btn">{action}</button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div>
              {/* Header */}
              <div style={{ display: 'flex', background: '#F8FAFC', alignItems: 'center', gap: 16, padding: '0 0' }}>
                <div style={{ padding: 16, width: 48, flexShrink: 0 }}>
                  <input type="checkbox" checked={selected.length === employers.length} onChange={toggleAll} style={{ width: 16, height: 16, accentColor: '#137FEC', cursor: 'pointer' }} />
                </div>
                {[['COMPANY DETAILS', '220px', 'left'], ['INDUSTRY', '179px', 'left'], ['ACTIVE JOBS', '137px', 'center'], ['PLAN', '126px', 'left'], ['STATUS', '142px', 'left'], ['ACTIONS', '105px', 'right']].map(([col, w, align]) => (
                  <div key={col} style={{ padding: 16, width: w, flexShrink: 0, textAlign: align }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>{col}</span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {filtered.map(emp => (
                <div key={emp.id} className="table-row">
                  <div style={{ padding: '28px 16px', width: 48, flexShrink: 0 }}>
                    <input type="checkbox" checked={selected.includes(emp.id)} onChange={() => toggleRow(emp.id)} style={{ width: 16, height: 16, accentColor: '#137FEC', cursor: 'pointer' }} />
                  </div>
                  {/* Company details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 188, flexShrink: 0 }}>
                    <div style={{ width: 40, height: 40, background: emp.initBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 16, color: emp.initColor }}>{emp.initial}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>{emp.name}</p>
                      <p style={{ fontSize: 12, color: '#64748B', lineHeight: '16px' }}>ID: #{emp.id}</p>
                    </div>
                  </div>
                  {/* Industry */}
                  <div style={{ padding: '26px 16px', width: 179, flexShrink: 0 }}>
                    <span style={{ fontSize: 14, color: '#0F172A' }}>{emp.industry}</span>
                  </div>
                  {/* Active jobs */}
                  <div style={{ padding: '26px 16px 26px 0', width: 121, flexShrink: 0, textAlign: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{emp.jobs}</span>
                  </div>
                  {/* Plan */}
                  <div style={{ padding: '24px 16px 24px 0', width: 110, flexShrink: 0 }}>
                    <span style={{ background: emp.planBg, color: emp.planColor, fontSize: 12, fontWeight: 700, padding: '3.5px 8px', borderRadius: 4 }}>{emp.plan}</span>
                  </div>
                  {/* Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 110, flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, background: emp.statusDot, borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#0F172A' }}>{emp.status}</span>
                  </div>
                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '22px 16px', width: 105, flexShrink: 0 }}>
                    <button className="dot-menu">⋮</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTop: '1px solid #E2E8F0' }}>
              <p style={{ fontSize: 14, color: '#64748B' }}>Showing 1 to 5 of 1,284 employers</p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className={`page-btn disabled`} disabled style={{ width: 24 }}>‹</button>
                {[1, 2, 3].map(p => (
                  <button key={p} className={`page-btn${currentPage === p ? ' active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
                ))}
                <button className="page-btn" onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))} style={{ width: 24 }}>›</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerManagement;