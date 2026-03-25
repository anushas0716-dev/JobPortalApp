import React, { useState } from 'react';

const CertificationTracking = () => {
  const [activeNav, setActiveNav] = useState('Certificates');

  const sidebarNav = [
    { label: 'Dashboard', icon: '▦' },
    { label: 'Certificates', icon: '🛡️' },
    { label: 'Learning Paths', icon: '🎓' },
    { label: 'Renewal History', icon: '🕐' },
  ];

  const certificates = [
    {
      id: 1,
      iconBg: 'rgba(19,127,236,0.1)',
      iconColor: '#137FEC',
      iconType: 'cloud',
      status: 'ACTIVE',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      title: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services (AWS)',
      issued: 'Jan 12, 2023',
      expires: 'Jan 12, 2026',
      expiresColor: '#0F172A',
      expiresLabelColor: '#94A3B8',
      footerBg: '#F8FAFC',
      footerBorderColor: '#F1F5F9',
      ctaText: 'View Details',
      ctaColor: '#137FEC',
      expiring: false,
    },
    {
      id: 2,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      iconType: 'shield',
      status: 'EXPIRING SOON',
      statusBg: '#FEF3C7',
      statusColor: '#B45309',
      title: 'Google Cloud Professional Security Engineer',
      issuer: 'Google Cloud Platform',
      issued: 'Nov 04, 2022',
      expires: 'Oct 30, 2024',
      expiresColor: '#D97706',
      expiresLabelColor: '#D97706',
      footerBg: '#FFFBEB',
      footerBorderColor: '#FEF3C7',
      ctaText: 'Renew Now',
      ctaColor: '#B45309',
      expiring: true,
      cardBorder: '1px solid #FDE68A',
    },
    {
      id: 3,
      iconBg: 'rgba(19,127,236,0.1)',
      iconColor: '#137FEC',
      iconType: 'code',
      status: 'ACTIVE',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      issued: 'Mar 22, 2023',
      expires: 'Mar 22, 2026',
      expiresColor: '#0F172A',
      expiresLabelColor: '#94A3B8',
      footerBg: '#F8FAFC',
      footerBorderColor: '#F1F5F9',
      ctaText: 'View Details',
      ctaColor: '#137FEC',
      expiring: false,
    },
    {
      id: 4,
      iconBg: 'rgba(19,127,236,0.1)',
      iconColor: '#137FEC',
      iconType: 'terminal',
      status: 'ACTIVE',
      statusBg: '#DCFCE7',
      statusColor: '#15803D',
      title: 'HashiCorp Certified: Terraform Associate',
      issuer: 'HashiCorp',
      issued: 'Feb 15, 2024',
      expires: 'Feb 15, 2026',
      expiresColor: '#0F172A',
      expiresLabelColor: '#94A3B8',
      footerBg: '#F8FAFC',
      footerBorderColor: '#F1F5F9',
      ctaText: 'View Details',
      ctaColor: '#137FEC',
      expiring: false,
    },
  ];

  const verificationLog = [
    { date: '2024-02-15', name: 'Terraform Associate', action: 'New Submission', status: 'Verified', statusColor: '#16A34A', method: 'API Callback' },
    { date: '2023-11-10', name: 'AWS Solutions Architect', action: 'Manual Renewal', status: 'Verified', statusColor: '#16A34A', method: 'Document Review' },
    { date: '2023-09-22', name: 'Azure Administrator', action: 'Verification Check', status: 'Pending', statusColor: '#F59E0B', method: 'External Sync' },
  ];

  const CertIcon = ({ type, color }) => {
    if (type === 'cloud') return (
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
        <path d="M22 8.5C22 8.5 21.5 4 17 4C13.5 4 12 6.5 12 6.5C12 6.5 11 6 10 6C7.5 6 6 8 6 8C4 8.5 2 10.5 2 13C2 16.3 5 18 8 18H22C25 18 27 16 27 13.5C27 11 25 9 22 8.5Z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M10 13L13 16L18 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
    if (type === 'shield') return (
      <svg width="20" height="25" viewBox="0 0 20 25" fill="none">
        <path d="M10 1L2 4.5V11.5C2 16.5 5.5 21 10 23C14.5 21 18 16.5 18 11.5V4.5L10 1Z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M7 12L9.5 14.5L13 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
    if (type === 'code') return (
      <svg width="25" height="15" viewBox="0 0 25 15" fill="none">
        <path d="M8 1L2 7.5L8 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 1L23 7.5L17 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
    if (type === 'terminal') return (
      <svg width="25" height="20" viewBox="0 0 25 20" fill="none">
        <rect x="1" y="1" width="23" height="18" rx="3" stroke={color} strokeWidth="1.5"/>
        <path d="M5 8L9 11L5 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="14" x2="19" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
    return null;
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .ct-nav-link { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; border: none; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .ct-nav-link.active { background: rgba(19,127,236,0.1); }
        .ct-nav-link:not(.active) { background: transparent; }
        .ct-nav-link:not(.active):hover { background: #F1F5F9; }
        .ct-cert-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s; }
        .ct-cert-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .ct-cert-card.expiring { border: 1px solid #FDE68A; }
        .ct-table-row { display: flex; align-items: center; width: 100%; border-top: 1px solid #F1F5F9; }
        .ct-table-row:first-child { border-top: none; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 1L1 4V10C1 14.5 4 18.5 8 20C12 18.5 15 14.5 15 10V4L8 1Z" stroke="#137FEC" strokeWidth="1.5" fill="none"/>
              <path d="M5 10L7.5 12.5L11 8" stroke="#137FEC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>CertTrack Pro</span>
        </div>

        {/* Right: icons + user */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ width: '37px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="17" viewBox="0 0 14 17" fill="none"><path d="M7 0C5.6 0 4.5 1.1 4.5 2.5V3C2.5 3.8 1 5.6 1 7.7V12L0 14H14L13 12V7.7C13 5.6 11.5 3.8 9.5 3V2.5C9.5 1.1 8.4 0 7 0ZM7 17C8 17 8.8 16.2 8.8 15.2H5.2C5.2 16.2 6 17 7 17Z" fill="#334155"/></svg>
          </button>
          <button style={{ width: '41px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="3" stroke="#334155" strokeWidth="1.4"/><path d="M8.5 1V2.5M8.5 14.5V16M1 8.5H2.5M14.5 8.5H16M3 3L4.1 4.1M12.9 12.9L14 14M3 14L4.1 12.9M12.9 4.1L14 3" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </button>
          {/* Vertical divider */}
          <div style={{ width: '1px', height: '40px', background: '#E2E8F0', margin: '0 8px' }} />
          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Alex Johnson</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Senior Architect</div>
            </div>
            <div style={{ width: '40px', height: '40px', background: '#CBD5E1', border: '2px solid rgba(19,127,236,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" fill="#64748B"/><path d="M4 21C4 17.1 7.6 14 12 14C16.4 14 20 17.1 20 21" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: '256px', flexShrink: 0,
          background: '#FFFFFF', borderRight: '1px solid #E2E8F0',
          padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          {/* Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sidebarNav.map(item => (
              <button
                key={item.label}
                className={`ct-nav-link${activeNav === item.label ? ' active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span style={{ fontSize: '16px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: activeNav === item.label ? '700' : '500', color: activeNav === item.label ? '#137FEC' : '#475569' }}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ paddingTop: '32px', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>Quick Actions</span>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '10px 0', width: '199px', background: '#137FEC',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '14px', fontWeight: '700', color: '#FFFFFF',
              fontFamily: 'Inter,sans-serif', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
            }}>
              <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
                <circle cx="7.5" cy="8.5" r="6.5" stroke="white" strokeWidth="1.5"/>
                <line x1="7.5" y1="5" x2="7.5" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="4" y1="8.5" x2="11" y2="8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Verify New
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: '32px', background: '#F6F7F8', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* ── Profile Header ── */}
          <div style={{
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px',
            padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            {/* Left: avatar + info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {/* Avatar */}
              <div style={{ position: 'relative', width: '128px', height: '128px', flexShrink: 0 }}>
                <div style={{ width: '128px', height: '128px', borderRadius: '12px', background: 'linear-gradient(145deg, #f0e0c8, #d4b090)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  👤
                </div>
                {/* Verified badge */}
                <div style={{ position: 'absolute', right: '-8px', bottom: '-8px', width: '32px', height: '29px', background: '#22C55E', border: '4px solid #FFFFFF', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              {/* Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Alex Johnson</h1>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#64748B', marginBottom: '8px' }}>Senior Cloud Solutions Architect</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: 'rgba(19,127,236,0.1)', borderRadius: '9999px', padding: '2px 10px', fontSize: '12px', fontWeight: '600', color: '#137FEC' }}>Level 4 Architect</span>
                  <span style={{ color: '#94A3B8', fontSize: '16px' }}>·</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>ID: CERT-92831-A0</span>
                </div>
              </div>
            </div>

            {/* Right: stats */}
            <div style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
              {[
                { value: '12', label: 'TOTAL', color: '#0F172A', border: true },
                { value: '8', label: 'ACTIVE', color: '#16A34A', border: true },
                { value: '3', label: 'EXPIRING', color: '#F59E0B', border: false },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '0 16px', textAlign: 'center',
                  borderRight: stat.border ? '1px solid #E2E8F0' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</span>
                  <span style={{ fontSize: '12px', color: '#64748B', letterSpacing: '-0.6px', textTransform: 'uppercase' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Alert Banner ── */}
          <div style={{
            background: '#FFFBEB', border: '1px solid #FDE68A',
            borderRadius: '8px', padding: '16px',
            display: 'flex', alignItems: 'flex-start', gap: '12px',
          }}>
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M11 1L1 17H21L11 1Z" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
              <line x1="11" y1="8" x2="11" y2="12" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="11" cy="14.5" r="0.75" fill="#D97706"/>
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#92400E', marginBottom: '4px' }}>Renewals Required Soon</p>
              <p style={{ fontSize: '14px', color: '#B45309' }}>3 certifications are expiring within the next 45 days. Schedule your recertification exams to maintain active status.</p>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#92400E', fontFamily: 'Inter,sans-serif', flexShrink: 0 }}>View All</button>
          </div>

          {/* ── Certificates Grid ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#0F172A" strokeWidth="1.5"/>
                  <path d="M6 10L9 13L14 7" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Verified Certificates</h3>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ width: '36px', height: '30px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><line x1="0" y1="1" x2="18" y2="1" stroke="#475569" strokeWidth="1.5"/><line x1="3" y1="6" x2="15" y2="6" stroke="#475569" strokeWidth="1.5"/><line x1="6" y1="11" x2="12" y2="11" stroke="#475569" strokeWidth="1.5"/></svg>
                </button>
                <button style={{ width: '36px', height: '36px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="6" stroke="#475569" strokeWidth="1.5"/><line x1="12.5" y1="12.5" x2="17" y2="17" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            {/* Cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {/* Row 1: 3 cards */}
              {certificates.slice(0, 3).map(cert => (
                <div key={cert.id} className={`ct-cert-card${cert.expiring ? ' expiring' : ''}`} style={cert.cardBorder ? { border: cert.cardBorder } : {}}>
                  {/* Card body */}
                  <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                    {/* Icon + status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ width: '48px', height: '48px', background: cert.iconBg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CertIcon type={cert.iconType} color={cert.iconColor} />
                      </div>
                      <span style={{ background: cert.statusBg, color: cert.statusColor, fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{cert.status}</span>
                    </div>
                    {/* Title */}
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', lineHeight: '25px', marginBottom: '4px', marginTop: '12px' }}>{cert.title}</h4>
                    <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>{cert.issuer}</p>
                    {/* Dates */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: '#94A3B8' }}>Issued</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#0F172A' }}>{cert.issued}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', fontWeight: cert.expiring ? '700' : '400', color: cert.expiresLabelColor }}>Expires</span>
                        <span style={{ fontSize: '12px', fontWeight: cert.expiring ? '700' : '500', color: cert.expiresColor }}>{cert.expires}</span>
                      </div>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div style={{ background: cert.footerBg, borderTop: `1px solid ${cert.footerBorderColor}`, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: cert.ctaColor, fontFamily: 'Inter,sans-serif' }}>{cert.ctaText}</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1V11M4 8L8 12L12 8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="15" x2="14" y2="15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: card 4 + add new */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {/* Card 4 */}
              <div className="ct-cert-card">
                <div style={{ padding: '20px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CertIcon type="terminal" color="#137FEC" />
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>ACTIVE</span>
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', lineHeight: '25px', marginBottom: '4px', marginTop: '12px' }}>HashiCorp Certified: Terraform Associate</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>HashiCorp</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Issued</span>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#0F172A' }}>Feb 15, 2024</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Expires</span>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#0F172A' }}>Feb 15, 2026</span>
                    </div>
                  </div>
                </div>
                <div style={{ background: '#F8FAFC', borderTop: '1px solid #F1F5F9', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#137FEC', fontFamily: 'Inter,sans-serif' }}>View Details</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1V11M4 8L8 12L12 8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="15" x2="14" y2="15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>

              {/* Add New Certificate (dashed) */}
              <div style={{
                border: '2px dashed #E2E8F0', borderRadius: '12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '80px 32px', textAlign: 'center', cursor: 'pointer', minHeight: '220px',
              }}>
                <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><line x1="9" y1="1" x2="9" y2="17" stroke="#0F172A" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="9" x2="17" y2="9" stroke="#0F172A" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Add New Certificate</span>
                <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '16px', maxWidth: '148px' }}>Upload a PDF or verify via credential URL.</p>
              </div>

              {/* Empty slot */}
              <div />
            </div>
          </div>

          {/* ── Verification Log ── */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Verification Log</h3>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Audit trail of all certificate submissions and manual verifications.</p>
            </div>
            {/* Table */}
            <div>
              {/* Table header */}
              <div style={{ display: 'flex', background: '#F8FAFC' }}>
                {['Date', 'Certification Name', 'Action', 'Status', 'Method'].map((h, i) => (
                  <div key={i} style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#475569', flex: [1, 1.6, 1.3, 0.9, 1.3][i] }}>{h}</div>
                ))}
              </div>
              {/* Rows */}
              {verificationLog.map((row, i) => (
                <div key={i} className="ct-table-row">
                  <div style={{ padding: '16px 24px', fontSize: '14px', color: '#64748B', flex: 1 }}>{row.date}</div>
                  <div style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#0F172A', flex: 1.6 }}>{row.name}</div>
                  <div style={{ padding: '16px 24px', fontSize: '14px', color: '#0F172A', flex: 1.3 }}>{row.action}</div>
                  <div style={{ padding: '16px 24px', flex: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', background: row.statusColor, borderRadius: '9999px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: row.statusColor }}>{row.status}</span>
                  </div>
                  <div style={{ padding: '16px 24px 16px 48px', fontSize: '14px', color: '#64748B', flex: 1.3 }}>{row.method}</div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default CertificationTracking;