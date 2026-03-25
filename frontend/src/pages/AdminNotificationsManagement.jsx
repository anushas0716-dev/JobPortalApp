import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const campaigns = [
  { id: 1, iconBg: 'rgba(19,127,236,0.1)', iconColor: '#137FEC', icon: '📢', title: 'Fall 2024 Hiring Event Announcement', meta: ['✉ Email + Push', '👥 Employers (3.2k)', '🕐 Sent 2 days ago'], statusLabel: 'Completed', statusBg: '#DCFCE7', statusColor: '#166534', metricLabel: '18.4% CTR', metricBold: true },
  { id: 2, iconBg: '#FFEDD5', iconColor: '#EA580C', icon: '🕐', title: 'System Maintenance Alert', meta: ['📋 Banner', '👥 All users (450k)', '📅 Oct 15, 03:00 AM'], statusLabel: 'Scheduled', statusBg: '#DBEAFE', statusColor: '#1E40AF', metricLabel: 'Pending', metricBold: false },
  { id: 3, iconBg: 'rgba(19,127,236,0.1)', iconColor: '#137FEC', icon: '📱', title: 'Job Matches Daily Digest', meta: ['🔔 Push Only', '👥 Active Candidates (120k)', '🔄 Daily Recurring'], statusLabel: 'Active', statusBg: 'rgba(19,127,236,0.1)', statusColor: '#137FEC', metricLabel: '32.1% Open', metricBold: true },
];

const segments = [
  { label: 'Active Candidates', sub: 'Logged in within 7 days' },
  { label: 'Premium Employers', sub: 'Paid subscription tiers' },
  { label: 'New Registrations', sub: 'Joined in the last 24h' },
];

const channels = [
  { icon: '✉️', label: 'Email Blast',       enabled: true  },
  { icon: '🔔', label: 'Push Notification', enabled: true  },
  { icon: '💬', label: 'SMS Message',       enabled: false },
];

const navItems = [
  { icon: '⊞', label: 'Dashboard',            path: '/admin/dashboard' },
  { icon: '📄', label: 'Job Postings',         path: '/employer/manage-jobs' },
  { icon: '👥', label: 'Candidates',           path: '/admin/users' },
  { icon: '🔔', label: 'Notifications',        path: '/admin/notifications', active: true },
  { icon: '📊', label: 'Analytics',            path: '/employer/analytics' },
  { icon: '⚙️', label: 'System Settings',      path: '/admin/settings' },
];

const tabs = ['All Campaigns', 'Templates', 'User Segments', 'Scheduled'];

const SmallToggle = ({ enabled }) => (
  <div style={{ width: 32, height: 18, background: enabled ? '#137FEC' : '#CBD5E1', borderRadius: 9999, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
    <div style={{ position: 'absolute', top: 4, right: enabled ? 4 : undefined, left: enabled ? undefined : 4, width: 10, height: 10, background: '#FFFFFF', borderRadius: '50%' }} />
  </div>
);

const AdminNotificationsManagement = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Campaigns');
  const [checkedSegments, setCheckedSegments] = useState([]);
  const navigate = useNavigate();

  const toggleSegment = (i) => setCheckedSegments(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

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
        .tab-btn { padding: 16px 4px; border: none; background: none; font-family: 'Inter',sans-serif; font-size: 14px; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; color: #64748B; font-weight: 500; white-space: nowrap; }
        .tab-btn.active { color: #137FEC; font-weight: 700; border-bottom-color: #137FEC; }
        .tab-btn:hover:not(.active) { color: #334155; }
        .btn-create { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; padding: 10px 24px; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.25), 0px 4px 6px -4px rgba(19,127,236,0.25); transition: background 0.2s; display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .btn-create:hover { background: #0e6fd4; }
        .campaign-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 24px; border-top: 1px solid #E2E8F0; transition: background 0.15s; cursor: pointer; }
        .campaign-item:hover { background: #FAFBFC; }
        .campaign-item:first-of-type { border-top: none; }
        .segment-row { display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #F1F5F9; border-radius: 8px; cursor: pointer; transition: border-color 0.15s; }
        .segment-row:hover { border-color: rgba(19,127,236,0.3); }
        .view-all-btn { background: none; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #137FEC; cursor: pointer; }
        .view-all-btn:hover { text-decoration: underline; }
        .custom-seg-btn { background: none; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #137FEC; cursor: pointer; padding: 0; }
        .custom-seg-btn:hover { text-decoration: underline; }
      `}</style>

      {/* LEFT SIDEBAR */}
      <aside style={{ width: 240, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* ✅ Logo → admin dashboard */}
        <div onClick={() => navigate('/admin/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 24, cursor: 'pointer' }}>
          <div style={{ width: 36, height: 35, background: '#137FEC', borderRadius: 8, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🛡️</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px', color: '#0F172A' }}>Admin Portal</span>
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
        {/* ✅ User → employer profile */}
        <div style={{ borderTop: '1px solid #E2E8F0', padding: 16 }}>
          <div onClick={() => navigate('/employer/profile')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderRadius: 8, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, background: 'rgba(19,127,236,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>👩</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Sarah Johnson</p>
              <p style={{ fontSize: 12, color: '#64748B' }}>System Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 700 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#94A3B8' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns, templates or users..." style={{ width: '100%', height: 36, padding: '0 16px 0 40px', background: '#F1F5F9', border: 'none', borderRadius: 8, fontSize: 14 }} />
          </div>
          <div style={{ display: 'flex', gap: 16, marginLeft: 16 }}>
            {/* ✅ Mail → messages */}
            <button onClick={() => navigate('/employer/chat/1')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>✉️
              <div style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, background: '#EF4444', borderRadius: '50%' }} />
            </button>
            {/* ✅ Help → support */}
            <button onClick={() => navigate('/admin/support')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>❓</button>
          </div>
        </header>

        <main style={{ padding: 32, overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.75px' }}>Notifications Management</h1>
              <p style={{ fontSize: 16, color: '#64748B' }}>Design and deploy multi-channel communication strategies.</p>
            </div>
            {/* ✅ Create Campaign */}
            <button className="btn-create" onClick={() => alert('Create campaign — coming soon!')}>+ Create Campaign</button>
          </div>

          {/* KPI Stats */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
            {[
              { label: 'Total Sent (Monthly)', value: '1,284,502', badge: '+12.4%', badgeColor: '#22C55E', barColor: '#137FEC', barPct: 75 },
              { label: 'Avg. Delivery Rate',   value: '99.2%',     badge: 'Steady', badgeColor: '#94A3B8', barColor: '#22C55E', barPct: 99 },
              { label: 'Engagement (CTR)',     value: '24.5%',     badge: '-2.1%',  badgeColor: '#EF4444', barColor: '#F97316', barPct: 24 },
            ].map((kpi, i) => (
              <div key={i} style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#64748B' }}>{kpi.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 12 }}>
                  <p style={{ fontSize: 30, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.75px' }}>{kpi.value}</p>
                  <span style={{ fontSize: 14, fontWeight: 700, color: kpi.badgeColor }}>{kpi.badge}</span>
                </div>
                <div style={{ height: 4, background: '#F1F5F9', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${kpi.barPct}%`, background: kpi.barColor }} />
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #E2E8F0', marginBottom: 24, display: 'flex', gap: 32 }}>
            {tabs.map(tab => (
              <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            {/* Campaigns List */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #E2E8F0' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Recent Campaigns</p>
                  {/* ✅ View All */}
                  <button className="view-all-btn" onClick={() => setActiveTab('All Campaigns')}>View All</button>
                </div>
                <div>
                  {campaigns.map(c => (
                    /* ✅ Campaign → detail */
                    <div key={c.id} className="campaign-item" onClick={() => alert(`Campaign: ${c.title}`)}>
                      <div style={{ display: 'flex', gap: 16, flex: 1, minWidth: 0 }}>
                        <div style={{ width: 40, height: 40, background: c.iconBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>{c.title}</p>
                          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {c.meta.map((m, i) => (<span key={i} style={{ fontSize: 12, color: '#64748B' }}>{m}</span>))}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, marginLeft: 16, flexShrink: 0 }}>
                        <span style={{ background: c.statusBg, color: c.statusColor, fontSize: 12, fontWeight: 500, padding: '2px 10px', borderRadius: 9999 }}>{c.statusLabel}</span>
                        <p style={{ fontSize: 14, fontWeight: c.metricBold ? 700 : 400, color: '#0F172A', textAlign: 'right' }}>{c.metricLabel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div style={{ width: 290, display: 'flex', flexDirection: 'column', gap: 20, flexShrink: 0 }}>
              {/* Target Segments */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>Target Segments</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {segments.map((seg, i) => (
                    <div key={i} className="segment-row" onClick={() => toggleSegment(i)}>
                      <input type="checkbox" checked={checkedSegments.includes(i)} onChange={() => toggleSegment(i)} style={{ width: 16, height: 16, accentColor: '#137FEC', cursor: 'pointer', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{seg.label}</p>
                        <p style={{ fontSize: 12, color: '#64748B' }}>{seg.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center' }}>
                  {/* ✅ Create Custom Segment */}
                  <button className="custom-seg-btn" onClick={() => alert('Create custom segment — coming soon!')}>Create Custom Segment</button>
                </div>
              </div>

              {/* Notification Channels */}
              <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#137FEC' }}>Notification Channels</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {channels.map((ch, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16, color: ch.enabled ? '#137FEC' : '#94A3B8' }}>{ch.icon}</span>
                        <span style={{ fontSize: 14, fontWeight: 500, color: ch.enabled ? '#0F172A' : '#94A3B8' }}>{ch.label}</span>
                      </div>
                      <SmallToggle enabled={ch.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Global Engagement Map */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, marginTop: 24, overflow: 'hidden' }}>
            <div style={{ padding: 24, borderBottom: '1px solid #E2E8F0' }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>Global Engagement Map</p>
              <p style={{ fontSize: 14, color: '#64748B' }}>Real-time open rates by geographic location</p>
            </div>
            <div style={{ background: '#F1F5F9', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 40, opacity: 0.4 }}>🌍</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[{ color: '#22C55E', label: 'High Engagement' }, { color: '#137FEC', label: 'Mid Engagement' }, { color: '#F97316', label: 'Low Engagement' }].map(legend => (
                  <div key={legend.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 9999, padding: '5px 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: legend.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#0F172A' }}>{legend.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminNotificationsManagement;