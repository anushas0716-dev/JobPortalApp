import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentTransactions = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Payments');
  const [activeFilter, setActiveFilter] = useState('All Transactions');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Jobs', icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><rect x="1" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="currentColor" strokeWidth="1.4"/></svg> },
    { label: 'Users', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="5" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M1 17C1 13.686 3.686 11 7 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="13" cy="6" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M11 17C11 14.239 12.343 12 13 12C13.657 12 15 14.239 15 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: 'Payments', icon: <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><rect x="1" y="1" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.4"/><circle cx="5" cy="11" r="1.5" fill="currentColor"/></svg> },
    { label: 'Settings', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.05 3.05l1.42 1.42M13.53 13.53l1.42 1.42M3.05 14.95l1.42-1.42M13.53 4.47l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  ];

  const kpis = [
    { label: 'TOTAL REVENUE', value: '$124,500.00', note: '+12% vs last month', noteColor: '#22C55E', noteIcon: true },
    { label: 'SUCCESS RATE', value: '98.2%', note: 'Avg processing time: 1.2s', noteColor: '#64748B', noteIcon: false },
    { label: 'PENDING PAYMENTS', value: '42', note: 'Requires attention', noteColor: '#F59E0B', noteIcon: true },
    { label: 'REFUNDS PROCESSED', value: '$2,140.00', note: '3.1% of gross revenue', noteColor: '#64748B', noteIcon: false },
  ];

  const filters = [
    { label: 'All Transactions', count: null, countColor: null, countBg: null },
    { label: 'Successful', count: '1,204', countColor: '#16A34A', countBg: 'rgba(34,197,94,0.2)' },
    { label: 'Pending', count: '42', countColor: '#D97706', countBg: 'rgba(245,158,11,0.2)' },
    { label: 'Failed', count: '15', countColor: '#DC2626', countBg: 'rgba(239,68,68,0.2)' },
  ];

  const transactions = [
    { id: '#TXN-9821034', initials: 'TC', entity: 'TechCorp Solutions', subtitle: 'Subscription - Enterprise Plan', date: 'Oct 24, 2023 10:45 AM', amount: '$499.00', status: 'Successful', statusBg: '#DCFCE7', statusDot: '#16A34A', statusColor: '#15803D', canRefund: true },
    { id: '#TXN-9821035', initials: 'JS', entity: 'John Smith', subtitle: 'Job Posting - Single Credit', date: 'Oct 24, 2023 11:20 AM', amount: '$49.00', status: 'Pending', statusBg: '#FEF3C7', statusDot: '#D97706', statusColor: '#B45309', canRefund: false },
    { id: '#TXN-9821036', initials: 'GM', entity: 'Global Media LLC', subtitle: 'Subscription - Pro Plan', date: 'Oct 24, 2023 12:15 PM', amount: '$199.00', status: 'Failed', statusBg: '#FEE2E2', statusDot: '#DC2626', statusColor: '#B91C1C', canRefund: false },
    { id: '#TXN-9821037', initials: 'SK', entity: 'Skyline Agencies', subtitle: 'Job Posting Bundle (10)', date: 'Oct 24, 2023 01:05 PM', amount: '$350.00', status: 'Successful', statusBg: '#DCFCE7', statusDot: '#16A34A', statusColor: '#15803D', canRefund: true },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pt-nav-link {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s;
        }
        .pt-nav-link:hover { background: #F1F5F9; }
        .pt-nav-link.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 600; }

        .pt-filter-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 16px; height: 32px; border-radius: 9999px;
          border: none; cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; transition: background 0.12s; white-space: nowrap;
        }
        .pt-filter-btn.active { background: #137FEC; color: #FFFFFF; }
        .pt-filter-btn:not(.active) { background: #E2E8F0; color: #0F172A; }
        .pt-filter-btn:not(.active):hover { background: #CBD5E1; }

        .pt-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
        }
        .pt-search-input::placeholder { color: #6B7280; }

        .pt-page-btn {
          display: flex; justify-content: center; align-items: center;
          width: 32px; height: 32px; border-radius: 4px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 14px; border: 1px solid #E2E8F0;
          background: none; transition: background 0.12s;
        }
        .pt-page-btn.active { background: #137FEC; color: #FFFFFF; font-weight: 700; border-color: #137FEC; }
        .pt-page-btn:hover:not(.active) { background: #F1F5F9; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ boxSizing: 'border-box', width: 256, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', position: 'sticky', top: 0 }}>
        {/* Top: logo + nav */}
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 24 }}>
            <div style={{ padding: 4, background: '#137FEC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                <rect x="1" y="4" width="18" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#FFFFFF" strokeWidth="1.5"/>
                <line x1="1" y1="10" x2="19" y2="10" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '18px', color: '#0F172A' }}>oobPortal</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>ADMIN CONSOLE</p>
            </div>
          </div>
          {/* Nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 16px' }}>
            {navItems.map(item => (
              <button key={item.label} className={`pt-nav-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
                <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        {/* Bottom: user */}
        <div style={{ boxSizing: 'border-box', borderTop: '1px solid #E2E8F0', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderRadius: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#C9A88A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👨‍💼</div>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>Alex Johnson</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>

        {/* Top search bar */}
        <header style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: 64, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
          <div style={{ position: 'relative', flex: 1, height: 36, display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: 36, background: '#F1F5F9', borderRadius: 8, padding: '0 16px 0 40px' }}>
              <input className="pt-search-input" type="text" placeholder="Search by Transaction ID, User, or Company" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#94A3B8" strokeWidth="1.5"/>
                <line x1="13" y1="13" x2="17" y2="17" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginLeft: 16 }}>
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#64748B" strokeWidth="1.4"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#64748B" strokeWidth="1.4"/></svg>
            </button>
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#64748B" strokeWidth="1.4"/><path d="M10 9V10M10 13v.5" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round"/><path d="M10 6.5C10 5.672 10.672 5 11.5 5S13 5.672 13 6.5C13 7.5 10 8 10 9" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Page title + Export button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: '-0.6px', color: '#0F172A', marginBottom: 4 }}>Payment Transactions</h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>Monitor platform revenue and manage refund requests.</p>
            </div>
            <button style={{ boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', height: 38, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A', cursor: 'pointer' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v8M6 9L3.5 6.5M6 9l2.5-2.5" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="11" x2="11" y2="11" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round"/></svg>
              Export CSV
            </button>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative', height: 106 }}>
            {kpis.map((kpi, i) => (
              <div key={i} style={{ boxSizing: 'border-box', padding: 16, background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4, height: 106 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, textTransform: 'uppercase', color: '#64748B' }}>{kpi.label}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 24, lineHeight: '32px', color: '#0F172A' }}>{kpi.value}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {kpi.noteIcon && kpi.noteColor === '#22C55E' && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 5L5 1L9 5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                  {kpi.noteIcon && kpi.noteColor === '#F59E0B' && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke="#F59E0B" strokeWidth="1"/><line x1="5" y1="3" x2="5" y2="5.5" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round"/><circle cx="5" cy="7" r="0.5" fill="#F59E0B"/></svg>
                  )}
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: kpi.noteColor }}>{kpi.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filter pills + Filters button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {filters.map(f => (
              <button key={f.label} className={`pt-filter-btn${activeFilter === f.label ? ' active' : ''}`} onClick={() => setActiveFilter(f.label)}>
                {f.label}
                {f.count && (
                  <span style={{ padding: '2px 6px', background: f.countBg, borderRadius: 4, fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 10, color: f.countColor }}>
                    {f.count}
                  </span>
                )}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button style={{ boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', height: 34, border: '1px solid #E2E8F0', borderRadius: 8, background: '#FFFFFF', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#475569', cursor: 'pointer' }}>
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none"><line x1="0" y1="1" x2="14" y2="1" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/><line x1="2" y1="5" x2="12" y2="5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/><line x1="4" y1="9" x2="10" y2="9" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Filters
            </button>
          </div>

          {/* Transaction Table */}
          <div style={{ boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden' }}>
            {/* Table head */}
            <div style={{ display: 'grid', gridTemplateColumns: '149px 261px 201px 108px 138px 115px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {[
                { label: 'TRANSACTION\nID', align: 'left' },
                { label: 'ENTITY', align: 'left' },
                { label: 'DATE', align: 'left' },
                { label: 'AMOUNT', align: 'left' },
                { label: 'STATUS', align: 'left' },
                { label: 'ACTIONS', align: 'right' },
              ].map((col, i) => (
                <div key={i} style={{ padding: '16px 24px', textAlign: col.align }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B', whiteSpace: 'pre-line', lineHeight: '16px' }}>
                    {col.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {transactions.map((txn, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '149px 261px 201px 108px 138px 115px', borderTop: i > 0 ? '1px solid #F1F5F9' : 'none', alignItems: 'center', height: 69 }}>
                {/* TXN ID */}
                <div style={{ padding: '0 24px' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 400, fontSize: 14, color: '#0F172A' }}>{txn.id}</span>
                </div>
                {/* Entity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 4, background: txn.initials === 'JS' ? '#E2E8F0' : 'rgba(19,127,236,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: txn.initials === 'JS' ? '#475569' : '#137FEC' }}>{txn.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: '#0F172A' }}>{txn.entity}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>{txn.subtitle}</p>
                  </div>
                </div>
                {/* Date */}
                <div style={{ padding: '0 24px' }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#475569' }}>{txn.date}</span>
                </div>
                {/* Amount */}
                <div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{txn.amount}</span>
                </div>
                {/* Status */}
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: txn.statusBg, borderRadius: '9999px' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: txn.statusDot, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: txn.statusColor }}>{txn.status}</span>
                  </span>
                </div>
                {/* Actions */}
                <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: txn.canRefund ? 'pointer' : 'default', padding: 0 }}>
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                      <path d="M5.5 1C3.015 1 1 3.015 1 5.5C1 7.985 3.015 10 5.5 10C7.985 10 10 7.985 10 5.5" stroke={txn.canRefund ? '#137FEC' : '#94A3B8'} strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M9 1L10.5 2.5L9 4" stroke={txn.canRefund ? '#137FEC' : '#94A3B8'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: txn.canRefund ? '#137FEC' : '#94A3B8' }}>Refund</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid #E2E8F0', height: 65 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>Showing 1 to 4 of 1,261 entries</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className="pt-page-btn">
                  <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M3.5 1L1 3.5L3.5 6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {[1, 2, 3].map(p => (
                  <button key={p} className={`pt-page-btn${currentPage === p ? ' active' : ''}`} onClick={() => setCurrentPage(p)}>
                    {p}
                  </button>
                ))}
                <button className="pt-page-btn">
                  <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M0.5 1L3 3.5L0.5 6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTransactions;