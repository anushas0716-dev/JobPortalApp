import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { label: 'Monthly Recurring Revenue', value: '$124,500', sub: '+12.5% vs last month',   subColor: '#16A34A', iconBg: '#DCFCE7',              iconColor: '#16A34A', icon: '↗', path: '/admin/billing' },
  { label: 'Churn Rate',                value: '2.4%',     sub: '-0.5% vs last quarter',   subColor: '#DC2626', iconBg: '#FEE2E2',              iconColor: '#DC2626', icon: '↘', path: '/admin/billing' },
  { label: 'Net Revenue (YTD)',         value: '$450,200', sub: 'Fiscal year 2024',         subColor: '#64748B', iconBg: 'rgba(19,127,236,0.1)', iconColor: '#137FEC', icon: '📊', path: '/admin/billing' },
  { label: 'Active Subscriptions',     value: '3,842',    sub: 'Across all plans',         subColor: '#64748B', iconBg: '#F3E8FF',              iconColor: '#9333EA', icon: '∞', path: '/admin/users' },
];

const plans = [
  { name: 'Enterprise Plan', amount: '$75,000 (60%)', pct: 60, color: '#137FEC' },
  { name: 'Pro Plan',        amount: '$35,000 (28%)', pct: 28, color: '#60A5FA' },
  { name: 'Starter Plan',   amount: '$14,500 (12%)', pct: 12, color: '#94A3B8' },
];

const paymentMethods = [
  { icon: '💳', label: 'Credit Card',   value: '82%' },
  { icon: '🏦', label: 'Bank Transfer', value: '12%' },
  { icon: '💰', label: 'PayPal',        value: '5%'  },
  { icon: '₿',  label: 'Crypto',        value: '1%'  },
];

const transactions = [
  { initials: 'MS', initBg: 'rgba(19,127,236,0.2)', initColor: '#137FEC', client: 'Microsoft Corp',  amount: '$2,400', plan: 'Enterprise', status: 'SUCCESS', statusBg: '#DCFCE7', statusColor: '#16A34A' },
  { initials: 'GO', initBg: '#DBEAFE',               initColor: '#2563EB', client: 'Google Ireland',  amount: '$1,850', plan: 'Pro Yearly', status: 'SUCCESS', statusBg: '#DCFCE7', statusColor: '#16A34A' },
  { initials: 'TF', initBg: '#F1F5F9',               initColor: '#475569', client: 'Techalow Inc',    amount: '$450',   plan: 'Starter',    status: 'PENDING', statusBg: '#FEF9C3', statusColor: '#CA8A04' },
];

const mrrData = [
  { month: 'JAN', value: 15 }, { month: 'FEB', value: 30 }, { month: 'MAR', value: 42 },
  { month: 'APR', value: 55 }, { month: 'MAY', value: 68 }, { month: 'JUN', value: 85 },
];

const navItems = [
  { icon: '⊞', label: 'Dashboard',        path: '/admin/dashboard' },
  { icon: '💼', label: 'Jobs Management',  path: '/employer/manage-jobs' },
  { icon: '👥', label: 'Users',            path: '/admin/users' },
  { icon: '💰', label: 'Revenue',          path: '/admin/billing', active: true },
  { icon: '📊', label: 'Reports',          path: '/employer/analytics' },
];

const LineChart = () => {
  const w = 500, h = 200;
  const pad = { l: 8, r: 8, t: 16, b: 0 };
  const chartW = w - pad.l - pad.r;
  const chartH = h - pad.t - pad.b;
  const maxVal = Math.max(...mrrData.map(d => d.value));
  const points = mrrData.map((d, i) => ({ x: pad.l + (i / (mrrData.length - 1)) * chartW, y: pad.t + chartH - (d.value / maxVal) * chartH }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const fillD = pathD + ` L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#137FEC" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#137FEC" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#chartGrad)" />
      <path d={pathD} fill="none" stroke="#137FEC" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="4" fill="#137FEC" stroke="#fff" strokeWidth="2" />))}
    </svg>
  );
};

const AdminRevenueDashboard = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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
        .btn-csv { background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #334155; cursor: pointer; padding: 8px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: background 0.15s; }
        .btn-csv:hover { background: #F8FAFC; }
        .btn-report { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; padding: 8px 16px; transition: background 0.2s; }
        .btn-report:hover { background: #0e6fd4; }
        .card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; }
        .view-all { background: none; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #137FEC; cursor: pointer; padding: 0; text-align: center; width: 100%; }
        .view-all:hover { text-decoration: underline; }
        .txn-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 16px; align-items: center; padding: 16px 24px; border-top: 1px solid #F1F5F9; cursor: pointer; transition: background 0.15s; }
        .txn-row:first-of-type { border-top: none; }
        .txn-row:hover { background: #F8FAFC; }
        .kpi-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; flex: 1; cursor: pointer; transition: box-shadow 0.15s; }
        .kpi-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
      `}</style>

      {/* LEFT SIDEBAR */}
      <aside style={{ width: 220, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', minHeight: '100vh', flexShrink: 0 }}>
        {/* ✅ Logo → admin dashboard */}
        <div onClick={() => navigate('/admin/dashboard')} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '24px 20px 20px', cursor: 'pointer' }}>
          <div style={{ width: 36, height: 35, background: '#137FEC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🛡️</div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 18, color: '#0F172A', lineHeight: '24px', letterSpacing: '-0.5px' }}>JobPortal</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: '#0F172A', lineHeight: '24px', letterSpacing: '-0.5px' }}>Admin</p>
          </div>
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
        {/* ✅ User profile → admin profile */}
        <div style={{ borderTop: '1px solid #E2E8F0', padding: 16 }}>
          <div onClick={() => navigate('/employer/profile')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', borderRadius: 12, padding: 8, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>👤</div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Alex Morgan</p>
              <p style={{ fontSize: 10, color: '#64748B' }}>Senior Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)', borderBottom: '1px solid #E2E8F0', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ position: 'relative', width: 448 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#94A3B8' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions, users..." style={{ width: '100%', height: 36, padding: '0 16px 0 40px', background: '#F1F5F9', border: 'none', borderRadius: 8, fontSize: 14 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* ✅ Bell → notifications */}
            <button onClick={() => navigate('/notifications')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: 6 }}>
              🔔
              <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '2px solid #fff' }} />
            </button>
            {/* ✅ Settings */}
            <button onClick={() => navigate('/admin/settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>⚙️</button>
          </div>
        </header>

        <main style={{ padding: 32, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.75px' }}>Revenue Dashboard</h1>
              <p style={{ fontSize: 16, color: '#64748B' }}>Comprehensive overview of JobPortal's financial health.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* ✅ Download CSV */}
              <button className="btn-csv" onClick={() => alert('Downloading CSV...')}>Download CSV</button>
              {/* ✅ Generate Report */}
              <button className="btn-report" onClick={() => alert('Generating report...')}>Generate Report</button>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'flex', gap: 24 }}>
            {kpis.map((kpi, i) => (
              /* ✅ KPI card → related page */
              <div key={i} className="kpi-card" onClick={() => navigate(kpi.path)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#64748B', lineHeight: '20px' }}>{kpi.label}</p>
                  <div style={{ background: kpi.iconBg, borderRadius: 8, padding: '6px 8px', fontSize: 14, color: kpi.iconColor, fontWeight: 700 }}>{kpi.icon}</div>
                </div>
                <p style={{ fontSize: 30, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.75px', marginBottom: 4 }}>{kpi.value}</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: kpi.subColor }}>{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div className="card" style={{ flex: 2.4, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>MRR Growth Over Time</p>
                  <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Growth performance for the last 6 months</p>
                </div>
                <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '3px 12px', fontSize: 12, fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>Last 6 Months ▾</div>
              </div>
              <div style={{ flex: 1 }}><LineChart /></div>
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                {mrrData.map(d => (<span key={d.month} style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8' }}>{d.month}</span>))}
              </div>
            </div>

            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>Revenue by Plan</p>
              <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Monthly distribution</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
                {plans.map(plan => (
                  <div key={plan.name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{plan.name}</span>
                      <span style={{ fontSize: 14, color: '#64748B' }}>{plan.amount}</span>
                    </div>
                    <div style={{ height: 8, background: '#F1F5F9', borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${plan.pct}%`, background: plan.color, borderRadius: 9999 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 20, marginTop: 24, textAlign: 'center' }}>
                {/* ✅ View All Plans → billing */}
                <button className="view-all" onClick={() => navigate('/admin/billing')}>View All Plans</button>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div className="card" style={{ flex: 1 }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>Payment Methods</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {paymentMethods.map(pm => (
                  <div key={pm.label} style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{pm.icon}</div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>{pm.label}</p>
                      <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>{pm.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '24px 24px 16px' }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>Recent Transactions</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 16, padding: '10px 24px', background: '#F8FAFC', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                {['Client', 'Amount', 'Plan', 'Status'].map(col => (
                  <span key={col} style={{ fontSize: 14, fontWeight: 700, color: '#64748B' }}>{col}</span>
                ))}
              </div>
              <div>
                {transactions.map((txn, i) => (
                  /* ✅ Transaction row → billing */
                  <div key={i} className="txn-row" onClick={() => navigate('/admin/billing')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, background: txn.initBg, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, color: txn.initColor, flexShrink: 0, letterSpacing: '0.5px' }}>{txn.initials}</div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{txn.client}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{txn.amount}</span>
                    <span style={{ fontSize: 14, color: '#64748B' }}>{txn.plan}</span>
                    <span style={{ background: txn.statusBg, color: txn.statusColor, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.5px', textTransform: 'uppercase', display: 'inline-block' }}>{txn.status}</span>
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

export default AdminRevenueDashboard;