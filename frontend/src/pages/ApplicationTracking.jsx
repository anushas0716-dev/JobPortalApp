import React, { useState } from 'react';

const ApplicationTracking = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [search, setSearch] = useState('');

  const tabs = ['Active', 'Interviewing', 'Offers', 'Archived'];

  const stats = [
    { label: 'Total Sent', value: '24', sub: '+3 this week', subColor: '#16A34A', icon: '▷', iconColor: '#137FEC' },
    { label: 'Active Review', value: '12', sub: 'Pending response', subColor: '#64748B', icon: '👁', iconColor: '#F59E0B' },
    { label: 'Interviews', value: '5', sub: 'Next: Tomorrow, 10 AM', subColor: '#9333EA', icon: '📅', iconColor: '#A855F7' },
    { label: 'Offers', value: '2', sub: 'Action required', subColor: '#16A34A', icon: '🎯', iconColor: '#22C55E' },
  ];

  const applications = [
    {
      id: 1,
      icon: '▣',
      iconColor: '#137FEC',
      iconBg: '#F8FAFC',
      title: 'Senior Product Designer',
      company: 'Stripe',
      location: 'San Francisco, CA (Remote)',
      status: 'Interview',
      statusBg: '#F3E8FF',
      statusBorder: '#E9D5FF',
      statusColor: '#7E22CE',
      appliedOn: 'Oct 12, 2023',
      bottomIcon: '📅',
      bottomText: 'Next: Final Round Interview with Design VP',
      bottomTextColor: '#475569',
      borderColor: '#E2E8F0',
      specialBorder: false,
    },
    {
      id: 2,
      icon: '⬡',
      iconColor: '#F59E0B',
      iconBg: '#F8FAFC',
      title: 'Frontend Architect',
      company: 'Vercel',
      location: 'New York, NY',
      status: 'Under Review',
      statusBg: '#FEF3C7',
      statusBorder: '#FDE68A',
      statusColor: '#B45309',
      appliedOn: 'Oct 15, 2023',
      bottomIcon: '🕐',
      bottomText: 'Last updated 2 days ago',
      bottomTextColor: '#475569',
      borderColor: '#E2E8F0',
      specialBorder: false,
    },
    {
      id: 3,
      icon: '☁',
      iconColor: '#3B82F6',
      iconBg: '#F8FAFC',
      title: 'Staff Engineer',
      company: 'DigitalOcean',
      location: 'Remote',
      status: 'Applied',
      statusBg: '#DBEAFE',
      statusBorder: '#BFDBFE',
      statusColor: '#1D4ED8',
      appliedOn: 'Oct 18, 2023',
      bottomIcon: '✓',
      bottomText: 'Application successfully submitted',
      bottomTextColor: '#475569',
      borderColor: '#E2E8F0',
      specialBorder: false,
    },
    {
      id: 4,
      icon: '🚀',
      iconColor: '#22C55E',
      iconBg: '#F0FDF4',
      iconBorderColor: '#DCFCE7',
      title: 'Product Lead',
      company: 'Airbnb',
      location: 'Remote',
      status: 'Offer Received',
      statusBg: '#16A34A',
      statusBorder: '#15803D',
      statusColor: '#FFFFFF',
      appliedOn: 'Sep 30, 2023',
      bottomIcon: '🎉',
      bottomText: 'Congratulations! Offer expires in 3 days.',
      bottomTextColor: '#15803D',
      bottomBorderColor: '#DCFCE7',
      borderColor: '#22C55E',
      specialBorder: true,
      offerCard: true,
    },
  ];

  const AppCard = ({ app }) => (
    <div style={{
      background: '#FFFFFF',
      border: app.specialBorder ? `2px solid ${app.borderColor}` : `1px solid ${app.borderColor}`,
      boxShadow: app.offerCard
        ? '0px 4px 6px -1px rgba(34,197,94,0.1), 0px 2px 4px -2px rgba(34,197,94,0.1)'
        : '0px 1px 2px rgba(0,0,0,0.05)',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '16px',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { if (!app.offerCard) e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { if (!app.offerCard) e.currentTarget.style.boxShadow = '0px 1px 2px rgba(0,0,0,0.05)'; }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left: icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '8px',
            background: app.iconBg,
            border: `1px solid ${app.iconBorderColor || '#F1F5F9'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', color: app.iconColor, flexShrink: 0,
          }}>{app.icon}</div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', lineHeight: '28px' }}>{app.title}</h3>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>
              <span style={{ fontWeight: 500, color: '#334155' }}>{app.company}</span>
              {' • '}{app.location}
            </p>
          </div>
        </div>

        {/* Right: status + date + menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Status badge */}
          <span style={{
            background: app.statusBg,
            border: `1px solid ${app.statusBorder}`,
            color: app.statusColor,
            fontSize: '12px', fontWeight: 700,
            padding: '4px 12px', borderRadius: '9999px',
          }}>{app.status}</span>

          {/* Applied date */}
          <div style={{
            borderLeft: '1px solid #E2E8F0', paddingLeft: '16px',
            display: 'flex', flexDirection: 'column', gap: '0',
          }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: '20px' }}>Applied On</span>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B', lineHeight: '20px' }}>{app.appliedOn}</span>
          </div>

          {/* 3-dot menu */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748B', padding: '4px 2px', display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#64748B', display: 'block' }} />
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#64748B', display: 'block' }} />
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#64748B', display: 'block' }} />
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: `1px solid ${app.bottomBorderColor || '#F1F5F9'}`,
        paddingTop: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: app.offerCard ? '#15803D' : '#475569' }}>{app.bottomIcon}</span>
          <span style={{ fontSize: '14px', color: app.bottomTextColor, fontWeight: app.offerCard ? 500 : 400 }}>
            {app.bottomText}
          </span>
        </div>

        {app.offerCard ? (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#64748B', cursor: 'pointer' }}>Decline</button>
            <button style={{
              background: '#16A34A', border: 'none', borderRadius: '8px',
              fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: '#fff',
              cursor: 'pointer', padding: '6px 16px',
            }}>Review Offer</button>
          </div>
        ) : (
          <button style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#137FEC', cursor: 'pointer' }}>
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #94A3B8; }
        input:focus { outline: none; }
        a { text-decoration: none; color: inherit; }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; }
        .nav-link:hover { color: #137FEC; }
        .stat-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 8px; flex: 1; transition: box-shadow 0.2s; cursor: default; }
        .stat-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.07); }
      `}</style>

      {/* STICKY NAVBAR */}
      <nav style={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '12px 40px',
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 73,
      }}>
        {/* Left: logo + nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', color: '#137FEC' }}>🧊</span>
            <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>CareerTrack</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Applications', 'Job Board', 'Messages'].map((l, i) => (
              <a key={l} href="#" style={{
                fontSize: '14px',
                fontWeight: i === 0 ? 600 : 500,
                color: i === 0 ? '#137FEC' : '#475569',
                borderBottom: i === 0 ? '2px solid #137FEC' : 'none',
                paddingBottom: i === 0 ? '4px' : '0',
                textDecoration: 'none',
              }}>{l}</a>
            ))}
          </div>
        </div>

        {/* Right: search + notif + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#F1F5F9', borderRadius: '8px',
            padding: '6px 12px', width: '256px', height: '48px',
          }}>
            <span style={{ color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search applications..."
              style={{ border: 'none', background: 'transparent', fontSize: '14px', color: '#0F172A', flex: 1, outline: 'none' }}
            />
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#475569' }}>🔔</button>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #f9a76b, #e97b3a)',
            border: '1px solid rgba(19,127,236,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', cursor: 'pointer',
          }}>👤</div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 40px' }}>

        {/* PAGE HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px', marginBottom: '8px' }}>
            Application Tracking
          </h1>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>
            You have 24 total applications across 8 different companies.
          </p>
        </div>

        {/* STATS GRID */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          {stats.map(stat => (
            <div key={stat.label} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>{stat.label}</span>
                <span style={{ fontSize: '18px', color: stat.iconColor }}>{stat.icon}</span>
              </div>
              <p style={{ fontSize: '30px', fontWeight: 700, color: '#0F172A', lineHeight: '36px' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', fontWeight: 500, color: stat.subColor }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* FILTER TABS + ADD BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ background: '#F1F5F9', borderRadius: '8px', padding: '4px', display: 'flex', gap: '0' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 24px', borderRadius: '6px', border: 'none',
                  fontFamily: 'inherit', fontSize: '14px', cursor: 'pointer',
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? '#137FEC' : '#64748B',
                  background: activeTab === tab ? '#FFFFFF' : 'transparent',
                  boxShadow: activeTab === tab ? '0px 1px 2px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.15s',
                }}
              >{tab}</button>
            ))}
          </div>

          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#137FEC', border: 'none', borderRadius: '8px',
            fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#fff',
            cursor: 'pointer', padding: '10px 20px', height: 40,
          }}>
            <span style={{ fontSize: '14px' }}>+</span> Add Application
          </button>
        </div>

        {/* APPLICATIONS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {applications.map(app => <AppCard key={app.id} app={app} />)}
        </div>

      </div>
    </div>
  );
};

export default ApplicationTracking;