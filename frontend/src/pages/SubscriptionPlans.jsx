import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Plan Management');
  const [activeTab, setActiveTab] = useState('Subscriptions');

  const topNavLinks = ['Dashboard', 'Jobs', 'Employers', 'Subscriptions'];

  const sideNavItems = [
    { label: 'Overview', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { label: 'Plan Management', icon: <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><rect x="1" y="1" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.4"/><circle cx="5" cy="11" r="1.5" fill="currentColor"/></svg> },
    { label: 'Subscriber List', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="5" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M1 17C1 13.686 3.686 11 7 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="13" cy="6" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M11 17C11 14.239 12.343 12 13 12C13.657 12 15 14.239 15 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: 'Revenue Analytics', icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><line x1="1" y1="15" x2="1" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="15" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="15" x2="9" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="15" x2="13" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="15" x2="17" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  ];

  const kpis = [
    { label: 'Total Subscribers', value: '1,284', delta: '+12.5%', deltaUp: true, deltaColor: '#16A34A', deltaBg: '#F0FDF4', iconBg: '#EFF6FF', icon: <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><circle cx="7" cy="6" r="5" stroke="#2563EB" strokeWidth="1.5"/><path d="M1 15C1 11.134 3.686 9 7 9" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><circle cx="15" cy="6" r="4" stroke="#2563EB" strokeWidth="1.5"/><path d="M12 15C12 11.686 13.686 9 16 9C18.314 9 20 11.686 20 15" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { label: 'Active Tiers', value: '4 Plans', delta: 'Steady', deltaUp: null, deltaColor: '#94A3B8', deltaBg: null, iconBg: '#FAF5FF', icon: <svg width="18" height="19" viewBox="0 0 18 19" fill="none"><path d="M9 1L17 5V10C17 14.418 13.418 18 9 18C4.582 18 1 14.418 1 10V5L9 1Z" stroke="#9333EA" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 9L8 12L13 7" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Monthly Recurring Revenue', value: '$45,200', delta: '+8.2%', deltaUp: true, deltaColor: '#16A34A', deltaBg: '#F0FDF4', iconBg: '#ECFDF5', icon: <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><rect x="1" y="1" width="20" height="14" rx="2" stroke="#059669" strokeWidth="1.5"/><line x1="1" y1="6" x2="21" y2="6" stroke="#059669" strokeWidth="1.5"/></svg> },
  ];

  const plans = [
    {
      name: 'Free Tier', subtitle: 'For startups and small firms',
      price: '$0', period: 'FOREVER', priceColor: '#0F172A',
      featured: false, featuredLabel: null,
      features: [
        { text: '2 Active Job Postings', enabled: true },
        { text: 'Basic Candidate Search', enabled: true },
        { text: 'Advanced Analytics', enabled: false },
        { text: 'Priority Support', enabled: false },
      ],
      footer: { type: 'avatars', count: '+850' },
    },
    {
      name: 'Professional', subtitle: 'Scale your hiring efforts',
      price: '$49', period: 'PER MONTH', priceColor: '#137FEC',
      featured: true, featuredLabel: 'MOST POPULAR',
      features: [
        { text: '20 Active Job Postings', enabled: true },
        { text: 'Unlimited Candidate Search', enabled: true },
        { text: 'Detailed Analytics Dashboard', enabled: true },
        { text: 'Priority Email Support', enabled: true },
      ],
      footer: { type: 'subscribers', count: '342 Active Subscribers' },
    },
    {
      name: 'Enterprise', subtitle: 'Full control for global teams',
      price: '$199', period: 'PER MONTH', priceColor: '#0F172A',
      featured: false, featuredLabel: null,
      features: [
        { text: 'Unlimited Job Postings', enabled: true },
        { text: 'AI-Powered Shortlisting', enabled: true },
        { text: 'Custom Branding & HR Integration', enabled: true },
        { text: '24/7 Dedicated Account Manager', enabled: true },
      ],
      footer: { type: 'corporate', count: '84 Corporate Clients' },
    },
  ];

  const activityRows = [
    { initials: 'TC', company: 'TechCorp Inc.', location: 'SAN FRANCISCO, CA', from: 'Free', to: 'Professional', toColor: '#137FEC', date: 'Oct 24, 2023', status: 'SUCCESS', statusBg: '#DCFCE7', statusColor: '#15803D' },
    { initials: 'GL', company: 'Global Logistics', location: 'BERLIN, DE', from: 'New Subscriber:', to: 'Enterprise', toColor: '#0F172A', date: 'Oct 23, 2023', status: 'SUCCESS', statusBg: '#DCFCE7', statusColor: '#15803D' },
    { initials: 'ST', company: 'Swift Talent', location: 'AUSTIN, TX', from: 'Cancelled:', to: 'Professional', toColor: '#EF4444', date: 'Oct 22, 2023', status: 'PENDING EXIT', statusBg: '#FEF3C7', statusColor: '#B45309' },
  ];

  const CheckIcon = ({ enabled, featured }) => (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      {enabled ? (
        <>
          <circle cx="8.5" cy="8.5" r="8" stroke={featured ? '#137FEC' : '#22C55E'} strokeWidth="1.3"/>
          <path d="M5 8.5L7.5 11L12 6" stroke={featured ? '#137FEC' : '#22C55E'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </>
      ) : (
        <>
          <circle cx="8.5" cy="8.5" r="8" stroke="#CBD5E1" strokeWidth="1.3"/>
          <line x1="5.5" y1="8.5" x2="11.5" y2="8.5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sp-top-link {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          color: #475569; padding: 0 0 4px; transition: color 0.12s;
        }
        .sp-top-link.active { color: #137FEC; font-weight: 700; border-bottom: 2px solid #137FEC; }
        .sp-top-link:hover:not(.active) { color: #0F172A; }

        .sp-nav-link {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s;
        }
        .sp-nav-link:hover { background: #F1F5F9; }
        .sp-nav-link.active {
          background: rgba(19,127,236,0.1); color: #137FEC;
          border: 1px solid rgba(19,127,236,0.1);
        }

        .sp-kpi {
          position: relative; background: #FFFFFF;
          border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05);
          border-radius: 12px; height: 162px; flex: 1; min-width: 0;
        }

        .sp-plan-card {
          background: #FFFFFF; border: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px;
          overflow: hidden; display: flex; flex-direction: column;
          transition: box-shadow 0.15s;
        }
        .sp-plan-card.featured {
          border: 2px solid #137FEC;
          box-shadow: 0px 20px 25px -5px rgba(19,127,236,0.1), 0px 8px 10px -6px rgba(19,127,236,0.1);
        }

        .sp-empty-card {
          background: rgba(255,255,255,0.3); border: 2px dashed #E2E8F0;
          border-radius: 12px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          cursor: pointer; transition: border-color 0.15s, background 0.15s; min-height: 364px;
        }
        .sp-empty-card:hover { border-color: #137FEC; background: rgba(19,127,236,0.02); }

        .sp-icon-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px;
          border: none; cursor: pointer;
        }

        .sp-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #475569;
        }
        .sp-search-input::placeholder { color: #64748B; }

        .sp-billing-link {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600; color: #475569; cursor: pointer;
          text-align: left;
        }
        .sp-billing-link:hover { background: #F1F5F9; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 24px', height: 92,
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: 6, background: '#137FEC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                <rect x="1" y="4" width="18" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#FFFFFF" strokeWidth="1.5"/>
                <line x1="1" y1="10" x2="19" y2="10" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.45px', color: '#0F172A' }}>
              oobPortal Admin
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: 297, height: 53, background: '#F1F5F9', borderRadius: 8, padding: '6px 12px', gap: 8 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#94A3B8" strokeWidth="1.4"/>
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input className="sp-search-input" type="text" placeholder="Search subscribers, plans, or invoices..." />
          </div>
        </div>
        {/* Top nav + user */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {topNavLinks.map(link => (
              <button key={link} className={`sp-top-link${activeTab === link ? ' active' : ''}`} onClick={() => setActiveTab(link)}>{link}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 24, borderLeft: '1px solid #E2E8F0' }}>
            {/* Bell */}
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#64748B" strokeWidth="1.4"/>
                <path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#64748B" strokeWidth="1.4"/>
              </svg>
              <div style={{ position: 'absolute', width: 8, height: 8, background: '#EF4444', borderRadius: '50%', right: -1, top: 0, boxShadow: '0 0 0 2px #FFFFFF' }} />
            </button>
            {/* Avatar */}
            <div style={{ boxSizing: 'border-box', width: 36, height: 36, borderRadius: '50%', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }}>👤</div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ boxSizing: 'border-box', width: 256, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#94A3B8', padding: '0 8px 8px' }}>SUBSCRIPTION HUB</p>
            {sideNavItems.map(item => (
              <button key={item.label} className={`sp-nav-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
                <span style={{ color: activeNav === item.label ? '#137FEC' : '#475569', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          {/* Billing Settings bottom */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
            <button className="sp-billing-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" stroke="#475569" strokeWidth="1.4"/>
                <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.41 1.41M14.37 14.37l1.41 1.41M4.22 15.78l1.41-1.41M14.37 5.63l1.41-1.41" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Billing Settings
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, overflow: 'auto', padding: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Breadcrumb + Title + Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#64748B' }}>Admin</span>
                <span style={{ color: '#64748B' }}>/</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#137FEC' }}>Subscriptions</span>
              </div>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30, letterSpacing: '-0.75px', color: '#0F172A', marginBottom: 8 }}>Subscription Plans</h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, color: '#64748B' }}>Configure and manage pricing tiers for global employers.</p>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', height: 44,
              background: '#137FEC', borderRadius: 8, border: 'none',
              fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#FFFFFF',
              cursor: 'pointer', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="6" y1="1" x2="6" y2="11" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="1" y1="6" x2="11" y2="6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Create New Plan
            </button>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'flex', gap: 24, position: 'relative', height: 162 }}>
            {kpis.map((kpi, i) => (
              <div key={i} className="sp-kpi">
                <div style={{ position: 'absolute', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', left: 25, right: 25, top: 25 }}>
                  <div style={{ padding: 8, background: kpi.iconBg, borderRadius: 8 }}>{kpi.icon}</div>
                  {kpi.deltaBg ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', background: kpi.deltaBg, borderRadius: 4 }}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 5L5 1L9 5" stroke={kpi.deltaColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: kpi.deltaColor }}>{kpi.delta}</span>
                    </div>
                  ) : (
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#94A3B8' }}>{kpi.delta}</span>
                  )}
                </div>
                <span style={{ position: 'absolute', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B', left: 25, right: 25, top: 81 }}>{kpi.label}</span>
                <span style={{ position: 'absolute', fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 24, lineHeight: '32px', color: '#0F172A', left: 25, right: 25, top: 105 }}>{kpi.value}</span>
              </div>
            ))}
          </div>

          {/* Active Pricing Tiers */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, color: '#0F172A' }}>Active Pricing Tiers</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#64748B' }}>SORT BY:</span>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px 0 12px', height: 32, background: 'white', borderRadius: 8, border: '1px solid #E2E8F0', gap: 8, cursor: 'pointer', minWidth: 204 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#334155', flex: 1 }}>Subscribers (High to Low)</span>
                  <svg width="7" height="4" viewBox="0 0 7 4" fill="none"><path d="M1 1L3.5 3.5L6 1" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </div>
              </div>
            </div>

            {/* Plan cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Free Tier */}
              <div className="sp-plan-card">
                <div style={{ padding: 24, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A', marginBottom: 4 }}>Free Tier</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>For startups and small firms</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 24, color: '#0F172A' }}>$0</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '-0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>FOREVER</p>
                  </div>
                </div>
                <div style={{ padding: '24px 24px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { text: '2 Active Job Postings', ok: true },
                    { text: 'Basic Candidate Search', ok: true },
                    { text: 'Advanced Analytics', ok: false },
                    { text: 'Priority Support', ok: false },
                  ].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckIcon enabled={f.ok} featured={false}/>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: f.ok ? '#334155' : '#94A3B8' }}>{f.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {['#C9A88A','#8BA8C9'].map((c, i) => (
                      <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: '2px solid #FFFFFF', marginLeft: i === 0 ? 0 : -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
                    ))}
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E2E8F0', border: '2px solid #FFFFFF', marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, color: '#0F172A' }}>+850</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 1.5L16.5 4.5L6 15H3V12L13.5 1.5Z" stroke="#64748B" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 31, background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg width="22" height="15" viewBox="0 0 22 15" fill="none"><path d="M1 7.5C1 7.5 4 1 11 1C18 1 21 7.5 21 7.5C21 7.5 18 14 11 14C4 14 1 7.5 1 7.5Z" stroke="#64748B" strokeWidth="1.3"/><circle cx="11" cy="7.5" r="3" stroke="#64748B" strokeWidth="1.3"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Professional (Featured) */}
              <div className="sp-plan-card featured" style={{ position: 'relative' }}>
                {/* MOST POPULAR badge */}
                <div style={{ position: 'absolute', top: 2, right: 2, background: '#137FEC', borderRadius: '0 0 0 8px', padding: '4px 12px' }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 10, textTransform: 'uppercase', color: '#FFFFFF' }}>MOST POPULAR</span>
                </div>
                <div style={{ padding: 24, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A', marginBottom: 4 }}>Professional</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>Scale your hiring efforts</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 24, color: '#137FEC' }}>$49</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '-0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>PER MONTH</p>
                  </div>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    '20 Active Job Postings', 'Unlimited Candidate Search',
                    'Detailed Analytics Dashboard', 'Priority Email Support',
                  ].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckIcon enabled={true} featured={true}/>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#334155' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: 'rgba(19,127,236,0.05)' }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#137FEC' }}>342 Active Subscribers</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11.5px 16px', height: 40, background: '#137FEC', borderRadius: 8, border: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#FFFFFF', cursor: 'pointer' }}>
                      Manage
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 32, background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                        <circle cx="2" cy="2" r="1.5" fill="#94A3B8"/>
                        <circle cx="2" cy="8" r="1.5" fill="#94A3B8"/>
                        <circle cx="2" cy="14" r="1.5" fill="#94A3B8"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enterprise */}
              <div className="sp-plan-card">
                <div style={{ padding: 24, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A', marginBottom: 4 }}>Enterprise</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B' }}>Full control for global teams</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 24, color: '#0F172A' }}>$199</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '-0.6px', textTransform: 'uppercase', color: '#94A3B8' }}>PER MONTH</p>
                  </div>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    'Unlimited Job Postings', 'AI-Powered Shortlisting',
                    'Custom Branding & HR Integration', '24/7 Dedicated Account Manager',
                  ].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckIcon enabled={true} featured={false}/>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#334155' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="0.5" y="0.5" width="13" height="13" rx="1.5" stroke="#475569" strokeWidth="1.2"/><line x1="4" y1="7" x2="10" y2="7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/><line x1="4" y1="4.5" x2="10" y2="4.5" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/><line x1="4" y1="9.5" x2="7" y2="9.5" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#475569' }}>84 Corporate Clients</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 1.5L16.5 4.5L6 15H3V12L13.5 1.5Z" stroke="#64748B" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 31, background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg width="22" height="15" viewBox="0 0 22 15" fill="none"><path d="M1 7.5C1 7.5 4 1 11 1C18 1 21 7.5 21 7.5C21 7.5 18 14 11 14C4 14 1 7.5 1 7.5Z" stroke="#64748B" strokeWidth="1.3"/><circle cx="11" cy="7.5" r="3" stroke="#64748B" strokeWidth="1.3"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Create Custom Tier (empty state) */}
              <div className="sp-empty-card">
                <div style={{ width: 53, height: 53, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <line x1="10.5" y1="1" x2="10.5" y2="20" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="1" y1="10.5" x2="20" y2="10.5" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: '#475569', textAlign: 'center' }}>Create Custom Tier</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#94A3B8', textAlign: 'center', maxWidth: 200 }}>
                  Define a new pricing level with specific feature sets
                </p>
              </div>
            </div>
          </div>

          {/* Recent Subscription Changes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, color: '#0F172A' }}>Recent Subscription Changes</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#137FEC' }}>View All Logs</button>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
              {/* Table head */}
              <div style={{ display: 'grid', gridTemplateColumns: '264px 311px 177px 190px', background: '#F8FAFC' }}>
                {['EMPLOYER', 'PLAN CHANGE', 'DATE', 'STATUS'].map(h => (
                  <div key={h} style={{ padding: '16px 24px' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>{h}</span>
                  </div>
                ))}
              </div>
              {/* Rows */}
              {activityRows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '264px 311px 177px 190px', borderTop: i > 0 ? '1px solid #F1F5F9' : 'none', alignItems: 'center', height: 65 }}>
                  {/* Employer */}
                  <div style={{ padding: '0 0 0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 4, background: 'rgba(19,127,236,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: '#137FEC' }}>{row.initials}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{row.company}</p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 10, textTransform: 'uppercase', color: '#64748B' }}>{row.location}</p>
                    </div>
                  </div>
                  {/* Plan change */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {row.from === 'New Subscriber:' || row.from === 'Cancelled:' ? (
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#475569' }}>{row.from}</span>
                    ) : (
                      <>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#94A3B8' }}>{row.from}</span>
                        <svg width="19" height="9" viewBox="0 0 19 9" fill="none"><path d="M1 4.5H17M17 4.5L13 1M17 4.5L13 8" stroke="#CBD5E1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </>
                    )}
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: row.toColor }}>{row.to}</span>
                  </div>
                  {/* Date */}
                  <div style={{ padding: '0 24px 0 0' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#475569' }}>{row.date}</span>
                  </div>
                  {/* Status */}
                  <div style={{ padding: '0 48px 0 0' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', background: row.statusBg, borderRadius: 4, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '-0.3px', textTransform: 'uppercase', color: row.statusColor }}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionPlans;