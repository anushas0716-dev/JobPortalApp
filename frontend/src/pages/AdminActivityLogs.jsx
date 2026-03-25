import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminActivityLogs = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Security Events');
  const [activePage, setActivePage] = useState(1);
  const [activeNav, setActiveNav] = useState('Activity Logs');
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard',       icon: '▦', path: '/admin/dashboard' },
    { label: 'Job Management',  icon: '🗂', path: '/employer/manage-jobs' },
    { label: 'User Directory',  icon: '👥', path: '/admin/users' },
    { label: 'Activity Logs',   icon: '🔄', path: '/admin/logs' },
    { label: 'Settings',        icon: '⚙️', path: '/admin/settings' },
  ];

  const filterTabs = ['Security Events', 'Job Moderation', 'User Permissions', 'Billing Records'];

  const logs = [
    { initials: 'SA', avatarBg: 'rgba(19,127,236,0.2)', initialsColor: '#137FEC', name: 'Sarah Adams',    action: 'Approved Job Post',       target: 'ID: JOB-92831',            targetColor: '#137FEC', status: 'Success', statusBg: '#DCFCE7', statusColor: '#166534', timestamp: '2 mins ago',   iconColor: '#94A3B8', isAlert: false },
    { initials: 'MC', avatarBg: '#E2E8F0',               initialsColor: '#475569', name: 'Mike Chen',     action: 'Banned User',              target: 'user_john_doe@email.com',   targetColor: '#0F172A', status: 'Success', statusBg: '#DCFCE7', statusColor: '#166534', timestamp: '15 mins ago',  iconColor: '#94A3B8', isAlert: false },
    { initials: 'JR', avatarBg: '#FEF3C7',               initialsColor: '#D97706', name: 'Jessica Rivera', action: 'Updated API Settings',     target: 'System Config',             targetColor: '#0F172A', status: 'Warning', statusBg: '#FEF3C7', statusColor: '#92400E', timestamp: '42 mins ago',  iconColor: '#94A3B8', isAlert: false },
    { initials: '??', avatarBg: '#FEE2E2',               initialsColor: '#DC2626', name: 'Unknown Login', action: 'Failed Authentication',    target: 'IP: 192.168.1.102',         targetColor: '#DC2626', status: 'Failed',  statusBg: '#FEE2E2', statusColor: '#991B1B', timestamp: '1 hour ago',   iconColor: '#DC2626', isAlert: true  },
  ];

  const stats = [
    { label: "TODAY'S ACTIONS", iconBg: 'rgba(19,127,236,0.1)', iconColor: '#137FEC', value: '154',        subText: '+12% from yesterday',        subColor: '#16A34A', showArrow: true,  isName: false },
    { label: 'SECURITY ALERTS', iconBg: '#FEE2E2',               iconColor: '#EF4444', value: '3',          subText: 'Requires immediate review',   subColor: '#DC2626', showArrow: false, isName: false },
    { label: 'TOP MODERATOR',   iconBg: '#FEF3C7',               iconColor: '#F59E0B', value: 'Sarah Adams', subText: '42 moderation actions today', subColor: '#64748B', showArrow: false, isName: true  },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; cursor: pointer; border: none; background: transparent; font-family: 'Inter', sans-serif; width: 100%; transition: background 0.15s; }
        .nav-link:hover { background: #F1F5F9; }
        .nav-link.active { background: rgba(19,127,236,0.1); }
        .filter-chip { padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; cursor: pointer; border: none; font-family: 'Inter', sans-serif; transition: all 0.15s; }
        .log-row { display: flex; flex-direction: row; align-items: center; padding: 0 0 0 24px; gap: 24px; width: 100%; border-top: 1px solid #F1F5F9; }
        .page-btn { display: flex; justify-content: center; align-items: center; padding: 4px 12px; min-width: 30px; height: 30px; border-radius: 8px; border: 1px solid #CBD5E1; background: #fff; font-size: 14px; cursor: pointer; font-family: 'Inter', sans-serif; color: #475569; transition: all 0.15s; }
        .page-btn.active { background: #137FEC; border-color: #137FEC; color: #fff; font-weight: 700; }
        .page-btn:hover:not(.active):not(:disabled) { background: #F1F5F9; }
        .page-btn:disabled { opacity: 0.5; cursor: default; }
      `}</style>

      {/* HEADER */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* ✅ Logo → admin dashboard */}
            <div onClick={() => navigate('/admin/dashboard')} style={{ width: '20px', height: '25px', background: '#137FEC', borderRadius: '4px', cursor: 'pointer' }} />
            <span onClick={() => navigate('/admin/dashboard')} style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.27px', cursor: 'pointer' }}>JobPortal Admin</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {/* ✅ Nav links */}
            <span onClick={() => navigate('/admin/dashboard')}   style={{ fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>Dashboard</span>
            <span onClick={() => navigate('/employer/manage-jobs')} style={{ fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>Jobs</span>
            <span onClick={() => navigate('/admin/users')}       style={{ fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>Users</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', borderBottom: '2px solid #137FEC', paddingBottom: '4px', cursor: 'pointer' }}>Logs</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 0 0 16px', color: '#64748B', fontSize: '13px', flexShrink: 0 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." style={{ border: 'none', outline: 'none', fontSize: '16px', background: 'transparent', color: '#0F172A', flex: 1, padding: '0 8px', fontFamily: 'Inter,sans-serif' }} />
          </div>
          {/* ✅ Avatar → admin profile */}
          <div onClick={() => navigate('/employer/profile')} style={{ width: '40px', height: '40px', background: '#CBD5E1', border: '2px solid rgba(19,127,236,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer', overflow: 'hidden' }}>👤</div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR */}
        <aside style={{ width: '256px', flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'calc(100vh - 65px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* ✅ User info → admin profile */}
            <div onClick={() => navigate('/employer/profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px', cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>👤</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>System Admin</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Super user</div>
              </div>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map(item => (
                <button key={item.label} className={`nav-link${activeNav === item.label ? ' active' : ''}`}
                  onClick={() => { setActiveNav(item.label); navigate(item.path); }}>
                  <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: activeNav === item.label ? '700' : '500', color: activeNav === item.label ? '#137FEC' : '#475569' }}>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div style={{ background: 'rgba(19,127,236,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '1.2px', textTransform: 'uppercase' }}>Version</span>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>v2.1.0-stable</span>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: '31px 32px 32px', display: 'flex', flexDirection: 'column', gap: '24px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px' }}>Activity Logs</h1>
              <p style={{ fontSize: '16px', color: '#64748B' }}>Complete audit trail of administrator actions for security and compliance.</p>
            </div>
            {/* ✅ Export Logs → download */}
            <button onClick={() => alert('Exporting logs...')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              <span style={{ fontSize: '14px' }}>⬇</span> Export Logs
            </button>
          </div>

          {/* Filters */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Search Logs</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '48px' }}>
                  <span style={{ padding: '0 0 0 16px', color: '#64748B', fontSize: '14px', flexShrink: 0 }}>🔍</span>
                  <input placeholder="Search by name, action, or IP address..." style={{ border: 'none', outline: 'none', fontSize: '16px', background: 'transparent', color: '#0F172A', flex: 1, padding: '0 8px', fontFamily: 'Inter,sans-serif' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', paddingLeft: '4px' }}>Action Type</label>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '48px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#334155', cursor: 'pointer', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' }}>
                  All Actions <span style={{ color: '#94A3B8', fontSize: '10px' }}>▼</span>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', paddingLeft: '4px' }}>Time Range</label>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '48px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#334155', cursor: 'pointer', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' }}>
                  Last 24 Hours <span style={{ color: '#94A3B8', fontSize: '14px' }}>📅</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingBottom: '8px' }}>
              {filterTabs.map(tab => (
                <button key={tab} className="filter-chip" onClick={() => setActiveFilter(tab)} style={{ background: activeFilter === tab ? 'rgba(19,127,236,0.1)' : '#F1F5F9', color: activeFilter === tab ? '#137FEC' : '#475569', border: activeFilter === tab ? '1px solid rgba(19,127,236,0.2)' : '1px solid transparent' }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Logs Table */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#F8FAFC', padding: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 0 0 24px', gap: '24px' }}>
                <div style={{ width: '178px', padding: '16px 24px 16px 0', fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Admin User</div>
                <div style={{ width: '172px', padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Action</div>
                <div style={{ width: '208px', padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Target</div>
                <div style={{ width: '95px', padding: '16px 24px 16px 0', fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Status</div>
                <div style={{ width: '107px', padding: '16px 24px 16px 0', fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Timestamp</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #E2E8F0' }}>
              {logs.map((log, i) => (
                <div key={i} className="log-row" style={{ minHeight: '65px' }}>
                  {/* ✅ Admin user → user profile */}
                  <div onClick={() => navigate('/employer/profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '178px', flexShrink: 0, cursor: 'pointer' }}>
                    <div style={{ width: '32px', height: '32px', background: log.avatarBg, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: log.initialsColor, flexShrink: 0 }}>{log.initials}</div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{log.name}</span>
                  </div>
                  <div style={{ width: '172px', padding: '22px 24px', fontSize: '14px', color: '#475569', flexShrink: 0 }}>{log.action}</div>
                  <div style={{ width: '208px', padding: '22px 24px 22px 0', fontSize: '14px', fontWeight: '500', color: log.targetColor, flexShrink: 0 }}>{log.target}</div>
                  <div style={{ width: '95px', padding: '22px 24px 22px 0', flexShrink: 0 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', background: log.statusBg, borderRadius: '9999px', fontSize: '12px', fontWeight: '700', color: log.statusColor }}>{log.status}</span>
                  </div>
                  <div style={{ width: '107px', padding: '22px 24px 22px 0', fontSize: '14px', color: '#64748B', flexShrink: 0 }}>{log.timestamp}</div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', padding: '0 24px' }}>
                    {/* ✅ Alert icon → security alerts */}
                    <button onClick={() => log.isAlert && navigate('/admin/security')} style={{ background: 'none', border: 'none', cursor: log.isAlert ? 'pointer' : 'default', padding: '4px', color: log.iconColor, fontSize: '18px' }}>
                      {log.isAlert ? '⚠️' : 'ℹ️'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '14px', color: '#64748B' }}>Showing 1 to 10 of 421 results</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button className="page-btn" disabled style={{ opacity: 0.5 }}>Previous</button>
                {[1, 2, 3].map(p => (
                  <button key={p} className={`page-btn${activePage === p ? ' active' : ''}`} onClick={() => setActivePage(p)}>{p}</button>
                ))}
                <button className="page-btn" onClick={() => setActivePage(p => Math.min(p + 1, 3))}>Next</button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748B', letterSpacing: '0.7px', textTransform: 'uppercase' }}>{stat.label}</span>
                  <div style={{ padding: '8px', background: stat.iconBg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '33px', height: '37px' }}>
                    <div style={{ width: '17px', height: '21px', background: stat.iconColor, borderRadius: '3px' }} />
                  </div>
                </div>
                <div style={{ fontSize: stat.isName ? '20px' : '30px', fontWeight: '900', color: '#0F172A', lineHeight: stat.isName ? '28px' : '36px' }}>{stat.value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {stat.showArrow && <span style={{ fontSize: '10px', color: stat.subColor }}>↑</span>}
                  <span style={{ fontSize: '12px', fontWeight: '700', color: stat.subColor }}>{stat.subText}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminActivityLogs;