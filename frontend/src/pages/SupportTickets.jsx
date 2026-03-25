import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SupportTickets = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('All Tickets');
  const [activeTab, setActiveTab] = useState('All Requests');
  const [activeTopNav, setActiveTopNav] = useState('Tickets');
  const [currentPage, setCurrentPage] = useState(1);

  const topNavLinks = ['Dashboard', 'Users', 'Employers', 'Tickets', 'Settings'];

  const sideNavItems = [
    { label: 'Overview', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>, iconColor: '#475569' },
    { label: 'All Tickets', icon: <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.4"/><line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, iconColor: '#137FEC' },
    { label: 'Pending', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M10 5v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, iconColor: '#F59E0B' },
    { label: 'Resolved', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, iconColor: '#10B981' },
    { label: 'Archived', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="1" y1="4" x2="17" y2="4" stroke="currentColor" strokeWidth="1.4"/><path d="M7 9h4M7 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, iconColor: '#94A3B8' },
  ];

  const kpis = [
    { label: 'Total Open', value: '124', delta: '+5%', deltaUp: true, deltaColor: '#059669' },
    { label: 'High Priority', value: '18', delta: '-2%', deltaUp: false, deltaColor: '#DC2626' },
    { label: 'Avg Response', value: '2h 15m', delta: '-10%', deltaUp: false, deltaColor: '#DC2626' },
    { label: 'Unassigned', value: '12', delta: '+3%', deltaUp: true, deltaColor: '#059669' },
  ];

  const tickets = [
    {
      initials: 'JS', avatarBg: '#E2E8F0', avatarColor: '#475569',
      name: 'John Smith', role: 'Candidate',
      subject: 'Unable to upload portfolio PDF', ticketId: '#TK-45920',
      type: 'TECHNICAL', typeBg: '#DBEAFE', typeColor: '#2563EB',
      priority: 'High', priorityColor: '#DC2626', priorityIcon: '!',
      status: 'In Progress', statusBg: '#FEF3C7', statusColor: '#B45309',
      action: 'Manage', actionColor: '#137FEC',
    },
    {
      initials: 'TC', avatarBg: 'rgba(19,127,236,0.2)', avatarColor: '#137FEC',
      name: 'TechCorp Solutions', role: 'Employer',
      subject: 'Billing inquiry for Premium Plus', ticketId: '#TK-45921',
      type: 'BILLING', typeBg: '#F3E8FF', typeColor: '#9333EA',
      priority: 'Medium', priorityColor: '#F59E0B', priorityIcon: '▲',
      status: 'Unassigned', statusBg: '#F1F5F9', statusColor: '#475569',
      action: 'Assign', actionColor: '#137FEC',
    },
    {
      initials: 'AD', avatarBg: '#E2E8F0', avatarColor: '#475569',
      name: 'Anna Davis', role: 'Candidate',
      subject: 'Profile deletion request', ticketId: '#TK-45925',
      type: 'GENERAL', typeBg: '#F1F5F9', typeColor: '#64748B',
      priority: 'Low', priorityColor: '#94A3B8', priorityIcon: '◇',
      status: 'Resolved', statusBg: '#D1FAE5', statusColor: '#047857',
      action: 'View', actionColor: '#94A3B8',
    },
    {
      initials: 'GL', avatarBg: 'rgba(19,127,236,0.2)', avatarColor: '#137FEC',
      name: 'Green Logistics Co.', role: 'Employer',
      subject: 'Job post not appearing in search', ticketId: '#TK-45928',
      type: 'TECHNICAL', typeBg: '#DBEAFE', typeColor: '#2563EB',
      priority: 'High', priorityColor: '#DC2626', priorityIcon: '!',
      status: 'In Progress', statusBg: '#FEF3C7', statusColor: '#B45309',
      action: 'Manage', actionColor: '#137FEC',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .st-top-link {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          color: #475569; padding: 0 0 4px; transition: color 0.12s;
        }
        .st-top-link.active { color: #137FEC; font-weight: 700; border-bottom: 2px solid #137FEC; }
        .st-top-link:hover:not(.active) { color: #0F172A; }

        .st-nav-link {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 12px; width: 100%; border-radius: 8px;
          border: none; background: none; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;
          text-align: left; transition: background 0.12s;
        }
        .st-nav-link:hover { background: #F1F5F9; }
        .st-nav-link.active { background: rgba(19,127,236,0.1); color: #137FEC; font-weight: 700; }

        .st-tab {
          box-sizing: border-box; padding: 0 0 12px;
          background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700; color: #64748B; transition: color 0.12s;
          white-space: nowrap;
        }
        .st-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .st-tab:hover:not(.active) { color: #334155; }

        .st-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
        }
        .st-search-input::placeholder { color: #64748B; }

        .st-icon-btn {
          display: flex; justify-content: center; align-items: center;
          width: 40px; height: 40px; background: #F1F5F9; border-radius: 8px;
          border: none; cursor: pointer;
        }

        .st-page-btn {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          width: 32px; height: 32px; border-radius: 4px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 12px; border: 1px solid #E2E8F0;
          background: #FFFFFF; transition: background 0.12s;
        }
        .st-page-btn.active { background: #137FEC; color: #FFFFFF; font-weight: 700; border-color: #137FEC; }
        .st-page-btn.disabled { opacity: 0.5; cursor: default; }
        .st-page-btn:hover:not(.active):not(.disabled) { background: #F1F5F9; }

        .st-priority-filter {
          display: flex; justify-content: space-between; align-items: center;
          padding: 6px 12px; border-radius: 8px; background: none; border: none;
          cursor: pointer; width: 100%; font-family: 'Inter', sans-serif;
        }
        .st-priority-filter:hover { background: #F1F5F9; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px', height: 65, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
      }}>
        {/* Logo + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32, background: '#137FEC', borderRadius: 8 }}>
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                <rect x="1" y="4" width="18" height="14" rx="2" stroke="#FFFFFF" strokeWidth="1.5"/>
                <path d="M7 4V3C7 1.895 7.895 1 9 1H11C12.105 1 13 1.895 13 3V4" stroke="#FFFFFF" strokeWidth="1.5"/>
                <line x1="1" y1="10" x2="19" y2="10" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.27px', color: '#0F172A' }}>oobPortal Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: 256, height: 40, background: '#F1F5F9', borderRadius: 8, padding: '0 16px', gap: 10 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#64748B" strokeWidth="1.4"/>
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input className="st-search-input" type="text" placeholder="Search tickets..." />
          </div>
        </div>
        {/* Top nav + icons + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {topNavLinks.map(link => (
              <button key={link} className={`st-top-link${activeTopNav === link ? ' active' : ''}`} onClick={() => setActiveTopNav(link)}>{link}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="st-icon-btn"><svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C8 0 3 3 3 10v3.5l-2 2v1h14v-1l-2-2V10C13 3 8 0 8 0Z" stroke="#334155" strokeWidth="1.4"/><path d="M6 17c0 1.105.895 2 2 2s2-.895 2-2" stroke="#334155" strokeWidth="1.4"/></svg></button>
            <button className="st-icon-btn"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#334155" strokeWidth="1.4"/><path d="M10 9V10M10 13v.5" stroke="#334155" strokeWidth="1.6" strokeLinecap="round"/><path d="M10 6.5C10 5.672 10.672 5 11.5 5S13 5.672 13 6.5C13 7.5 10 8 10 9" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          <div style={{ boxSizing: 'border-box', width: 40, height: 40, borderRadius: '50%', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>🧑</div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ boxSizing: 'border-box', width: 256, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: 16, display: 'flex', flexDirection: 'column', gap: 24, overflow: 'auto' }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#0F172A', padding: '0 12px', marginBottom: 2 }}>Support Desk</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B', padding: '0 12px', marginBottom: 12 }}>Manage all incoming queries</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sideNavItems.map(item => (
                <button key={item.label} className={`st-nav-link${activeNav === item.label ? ' active' : ''}`} onClick={() => setActiveNav(item.label)}>
                  <span style={{ color: activeNav === item.label ? '#137FEC' : item.iconColor, display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filters */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: '#94A3B8', padding: '0 12px' }}>PRIORITY FILTERS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { label: 'Critical', dot: '#EF4444', count: '4', countBg: '#FEE2E2', countColor: '#DC2626' },
                { label: 'High', dot: '#F59E0B', count: '12', countBg: '#FEF3C7', countColor: '#D97706' },
              ].map(f => (
                <button key={f.label} className="st-priority-filter">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.dot }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#475569' }}>{f.label}</span>
                  </div>
                  <span style={{ padding: '0 6px', background: f.countBg, borderRadius: 4, fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: f.countColor }}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 24 }}>
            <div>
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30, letterSpacing: '-0.75px', color: '#0F172A', marginBottom: 4 }}>Support Tickets</h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, color: '#64748B' }}>Active resolution queue for oobPortal help requests.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', height: 36, background: '#F1F5F9', borderRadius: 8, border: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#334155', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v8M6 9L3.5 6.5M6 9l2.5-2.5" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="11" x2="11" y2="11" stroke="#334155" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Export CSV
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', height: 36, background: '#137FEC', borderRadius: 8, border: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#FFFFFF', cursor: 'pointer', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)' }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><line x1="5.5" y1="1" x2="5.5" y2="10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="5.5" x2="10" y2="5.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                New Ticket
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ paddingBottom: 24 }}>
            <div style={{ boxSizing: 'border-box', display: 'flex', gap: 32, borderBottom: '1px solid #E2E8F0' }}>
              {['All Requests', 'User Support', 'Employer Support'].map(tab => (
                <button key={tab} className={`st-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ paddingBottom: 32, position: 'relative', height: 140 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, height: 108 }}>
              {kpis.map((kpi, i) => (
                <div key={i} style={{ boxSizing: 'border-box', padding: 24, background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#64748B' }}>{kpi.label}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 30, lineHeight: '30px', color: '#0F172A' }}>{kpi.value}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: kpi.deltaColor }}>{kpi.delta}</span>
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path d={kpi.deltaUp ? "M1 6L6 1L11 6" : "M1 1L6 6L11 1"} stroke={kpi.deltaColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Table */}
          <div style={{ boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden' }}>
            {/* Table head */}
            <div style={{ display: 'grid', gridTemplateColumns: '228px 270px 123px 117px 133px 104px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {[
                { label: 'REQUESTER', align: 'left' },
                { label: 'SUBJECT & TICKET ID', align: 'left' },
                { label: 'TYPE', align: 'left' },
                { label: 'PRIORITY', align: 'left' },
                { label: 'STATUS', align: 'left' },
                { label: 'ACTION', align: 'right' },
              ].map((col, i) => (
                <div key={i} style={{ padding: '16px 24px', textAlign: col.align }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>{col.label}</span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {tickets.map((ticket, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '228px 270px 123px 117px 133px 104px', borderTop: i > 0 ? '1px solid #F1F5F9' : 'none', alignItems: 'center', height: 69 }}>
                {/* Requester */}
                <div style={{ padding: '0 0 0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: ticket.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, color: ticket.avatarColor }}>{ticket.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{ticket.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: '#64748B' }}>{ticket.role}</p>
                  </div>
                </div>
                {/* Subject */}
                <div style={{ padding: '16.5px 24px' }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: '#0F172A', marginBottom: 2 }}>{ticket.subject}</p>
                  <p style={{ fontFamily: 'monospace', fontWeight: 400, fontSize: 12, color: '#94A3B8' }}>{ticket.ticketId}</p>
                </div>
                {/* Type */}
                <div style={{ padding: '24.5px 24px 24.5px 0' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 8px', background: ticket.typeBg, borderRadius: '9999px', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10, textTransform: 'uppercase', color: ticket.typeColor }}>
                    {ticket.type}
                  </span>
                </div>
                {/* Priority */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: ticket.priorityColor }}>{ticket.priorityIcon}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: ticket.priorityColor }}>{ticket.priority}</span>
                </div>
                {/* Status */}
                <div style={{ padding: '22.5px 24px 23.5px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3.5px 8px', background: ticket.statusBg, borderRadius: 4, fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: ticket.statusColor }}>
                    {ticket.status}
                  </span>
                </div>
                {/* Action */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 24px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: ticket.actionColor }}>
                    {ticket.action}
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', height: 65 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: '#64748B' }}>Showing 1-10 of 124 results</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="st-page-btn disabled">
                  <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M3.5 1L1 3.5L3.5 6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {[1, 2, 3].map(p => (
                  <button key={p} className={`st-page-btn${currentPage === p ? ' active' : ''}`} onClick={() => setCurrentPage(p)}>
                    {p}
                  </button>
                ))}
                <button className="st-page-btn">
                  <svg width="4" height="7" viewBox="0 0 4 7" fill="none"><path d="M0.5 1L3 3.5L0.5 6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportTickets;