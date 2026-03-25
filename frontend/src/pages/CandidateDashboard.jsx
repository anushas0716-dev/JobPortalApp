<<<<<<< HEAD
import { useMemo } from "react";
import { Link } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f3f5f7;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #ff6b35;
  --accent-2: #2563eb;
  --accent-3: #10b981;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.cd-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.cd-hero {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  background: linear-gradient(135deg, #fff7ed 0%, #ecfeff 45%, #eef2ff 100%);
  border-radius: 28px;
  padding: 28px 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: grid;
  gap: 16px;
}
.cd-hero h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.cd-hero p { color: var(--muted); margin: 0; }
.cd-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.cd-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}
.cd-btn.primary { background: var(--accent); color: #fff; }
.cd-btn.secondary { background: #fff; color: var(--ink); border: 1px solid var(--border); }
.cd-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.cd-card {
  background: var(--card);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cd-card h4 { margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
.cd-card strong { font-size: 26px; }
.cd-progress {
  margin-top: 16px;
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}
.cd-progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent-2), var(--accent-3));
}
.cd-section {
  max-width: 1100px;
  margin: 28px auto 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
}
.cd-list {
  background: var(--card);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cd-list h3 { margin: 0 0 12px 0; font-size: 18px; }
.cd-item { padding: 12px 0; border-bottom: 1px solid var(--border); }
.cd-item:last-child { border-bottom: none; }
.cd-item-title { font-weight: 700; }
.cd-item-meta { color: var(--muted); font-size: 13px; }
.cd-quick {
  display: grid;
  gap: 12px;
}
.cd-quick a {
  display: block;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: #fff;
  text-decoration: none;
  color: var(--ink);
  font-weight: 700;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.cd-quick a:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15,23,42,0.08);
}
.cd-insights {
  max-width: 1100px;
  margin: 24px auto 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}
.cd-insight {
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cd-insight strong { display: block; margin-bottom: 6px; }
.cd-insight span { font-size: 13px; color: var(--muted); }
@media (max-width: 900px) {
  .cd-shell { padding: 24px; }
  .cd-section { grid-template-columns: 1fr; }
}
`;

export default function CandidateDashboard() {
  const metrics = useMemo(
    () => [
      { label: "Applications", value: 12 },
      { label: "Saved jobs", value: 8 },
      { label: "Interview invites", value: 2 },
      { label: "Profile strength", value: "76%" },
    ],
    []
  );

  const activity = [
    { title: "Frontend Engineer", company: "Luna Labs", time: "Applied 2 days ago" },
    { title: "Product Designer", company: "Fieldnote", time: "Saved yesterday" },
    { title: "Data Analyst", company: "BrightPath", time: "Profile viewed today" },
  ];

  const insights = [
    { title: "Recruiter views", note: "5 views in the last 7 days" },
    { title: "Search ranking", note: "Top 18% for React roles" },
    { title: "Resume downloads", note: "2 recruiters downloaded your resume" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="cd-shell">
        <section className="cd-hero">
          <div>
            <h2>Candidate dashboard</h2>
            <p>Track your applications and keep your profile fresh.</p>
          </div>
          <div className="cd-actions">
            <Link className="cd-btn primary" to="/jobs">Browse jobs</Link>
            <Link className="cd-btn secondary" to="/candidate-profile">Edit profile</Link>
            <Link className="cd-btn secondary" to="/profile-settings">Visibility</Link>
          </div>
        </section>

        <div className="cd-grid">
          {metrics.map((item) => (
            <div key={item.label} className="cd-card">
              <h4>{item.label}</h4>
              <strong>{item.value}</strong>
              {item.label === "Profile strength" && (
                <div className="cd-progress">
                  <span style={{ width: item.value }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="cd-section">
          <div className="cd-list">
            <h3>Recent activity</h3>
            {activity.map((item) => (
              <div key={item.title} className="cd-item">
                <div className="cd-item-title">{item.title}</div>
                <div className="cd-item-meta">{item.company} · {item.time}</div>
              </div>
            ))}
          </div>

          <div className="cd-quick">
            <Link to="/resumes">Upload resume</Link>
            <Link to="/profile-settings">Profile visibility</Link>
            <Link to="/saved-jobs">View saved jobs</Link>
            <Link to="/candidate-profile">Profile builder</Link>
          </div>
        </div>

        <div className="cd-insights">
          {insights.map((item) => (
            <div key={item.title} className="cd-insight">
              <strong>{item.title}</strong>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = storedUser?.full_name || storedUser?.first_name || storedUser?.username || 'Alex';

  const [savedJobs, setSavedJobs] = useState([false, true, false]);
  const [showResumeScore, setShowResumeScore] = useState(true);

  const stats = [
    { icon: '▶', label: 'Applied Jobs',  value: '24', change: '+2',    color: '#EFF6FF', iconColor: '#2563EB', path: '/applications' },
    { icon: '📅', label: 'Interviews',    value: '5',  change: '+1',    color: '#FAF5FF', iconColor: '#9333EA', path: '/interviews/notifications' },
    { icon: '🔖', label: 'Saved Jobs',    value: '12', change: '0 new', color: '#FFFBEB', iconColor: '#D97706', path: '/saved-jobs' },
  ];

  const jobs = [
    { id: 1, title: 'Senior Product Designer', company: 'DesignFlow',  location: 'Remote',            type: 'FULL-TIME', salary: '$120K – $160K', posted: 'Posted 2 days ago', applicants: '14 applicants', gradient: 'linear-gradient(135deg,#6366F1,#9333EA)' },
    { id: 2, title: 'UI/UX Interaction Lead',   company: 'Sphere Labs', location: 'San Francisco, CA', type: 'ON-SITE',   salary: '$140K – $180K', posted: 'Posted 5 hours ago', applicants: '28 applicants', gradient: 'linear-gradient(135deg,#34D399,#14B8A6)' },
    { id: 3, title: 'Product Design Manager',   company: 'TechGig',    location: 'Austin, TX',         type: 'HYBRID',    salary: '$180K+',         posted: 'Posted 1 day ago',   applicants: '6 applicants',  gradient: 'linear-gradient(135deg,#FBBF24,#F97316)' },
  ];

  const interviews = [
    { month: 'OCT', day: '12', title: 'UI Designer Interview',  subtitle: 'Zoom • 10:30 AM',    status: 'Confirmed',   statusColor: '#137FEC', id: 1 },
    { month: 'OCT', day: '15', title: 'Creative Lead Sync',     subtitle: 'Office • 02:00 PM',  status: 'Pending Ref.', statusColor: '#F59E0B', id: 2 },
  ];

  const companies = [
    { initial: 'G', name: 'Google', positions: '12 Open Positions', id: 1 },
    { initial: 'M', name: 'Meta',   positions: '4 Open Positions',  id: 2 },
    { initial: 'S', name: 'Stripe', positions: '7 Open Positions',  id: 3 },
  ];

  const navItems = [
    { icon: '⊞', label: 'Dashboard',    path: '/candidate-dashboard',  active: true,  badge: null },
    { icon: '💼', label: 'Jobs',         path: '/jobs',                 active: false, badge: null },
    { icon: '▶', label: 'Applications', path: '/applications',         active: false, badge: '12' },
    { icon: '🔖', label: 'Saved Jobs',  path: '/saved-jobs',           active: false, badge: null },
    { icon: '💬', label: 'Messages',    path: '/notifications',        active: false, badge: '3', badgeBlue: true },
    { icon: '👤', label: 'My Profile',  path: '/candidate-profile',    active: false, badge: null },
  ];

  const handleSaveJob = (index) => {
    const updated = [...savedJobs];
    updated[index] = !updated[index];
    setSavedJobs(updated);
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: all 0.2s; cursor: pointer; }
        .job-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-1px); }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; width: 100%; border: none; background: transparent; font-family: 'Inter', sans-serif; text-align: left; }
        .nav-item:hover { background: #F1F5F9; }
        .search-input { border: none; outline: none; font-size: 14px; font-family: 'Inter', sans-serif; background: transparent; width: 100%; color: #0F172A; }
        .search-input::placeholder { color: #94A3B8; }
        .stat-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 25px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); cursor: pointer; transition: box-shadow 0.2s; }
        .stat-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .apply-btn { background: #0F172A; color: #fff; border: none; padding: 8px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.15s; }
        .apply-btn:hover { background: #137FEC; }
        .view-btn { background: transparent; color: #137FEC; border: 1px solid #137FEC; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; }
        .view-btn:hover { background: rgba(19,127,236,0.05); }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/candidate-dashboard')}>
            <div style={{ background: '#137FEC', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '14px' }}>💼</span>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>JobPortal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', width: '256px', height: '40px', overflow: 'hidden' }}>
            <div style={{ padding: '0 0 0 16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#64748B', fontSize: '14px' }}>🔍</span>
            </div>
            <input className="search-input" placeholder="Search jobs, companies..." style={{ padding: '10px 12px' }}
              onKeyDown={e => { if (e.key === 'Enter') navigate('/jobs'); }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => navigate('/notifications')} style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
            <button onClick={() => navigate('/profile-settings')} style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>⚙️</button>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/candidate-profile')}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{userName}</p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Product Designer</p>
            </div>
            <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.15)', borderRadius: '50%', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '18px' }}>👤</span>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: '220px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'calc(100vh - 65px)', flexShrink: 0 }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => (
              <button key={item.label} className="nav-item"
                style={{ background: item.active ? '#137FEC' : 'transparent' }}
                onClick={() => navigate(item.path)}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: item.active ? '#fff' : '#475569', flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ background: item.badgeBlue ? '#137FEC' : '#F1F5F9', color: item.badgeBlue ? '#fff' : '#475569', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '9999px', border: item.active ? '1px solid rgba(255,255,255,0.3)' : 'none' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Profile Strength */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Profile Strength</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669' }}>Excellent</span>
            </div>
            <p style={{ fontSize: '20px', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>85%</p>
            <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '6px', marginBottom: '12px' }}>
              <div style={{ background: '#137FEC', borderRadius: '9999px', height: '6px', width: '85%' }} />
            </div>
            <button onClick={() => navigate('/profile-setup')}
              style={{ width: '100%', padding: '8px', background: 'rgba(19,127,236,0.1)', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Improve Profile
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: '32px', background: '#F6F7F8', overflowY: 'auto' }}>
          <div style={{ maxWidth: '960px' }}>

            {/* Welcome Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>Welcome back, {userName} 👋</h1>
                <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px', marginTop: '4px' }}>Here's what's happening with your job applications today.</p>
              </div>
              <button onClick={() => navigate('/resumes')}
                style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0px 4px 6px rgba(19,127,236,0.2)', flexShrink: 0 }}>
                📄 Update Resume
              </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {stats.map(stat => (
                <div key={stat.label} className="stat-card" onClick={() => navigate(stat.path)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: stat.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      {stat.icon}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#059669' }}>↑ {stat.change}</span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', marginBottom: '4px' }}>{stat.label}</p>
                  <p style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>

              {/* Recommended Jobs */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Recommended for you</h2>
                  <button onClick={() => navigate('/recommended')} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>View all</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {jobs.map((job, i) => (
                    <div key={job.id} className="job-card" onClick={() => handleViewJob(job.id)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1 }}>
                          {/* Company logo */}
                          <div style={{ width: '48px', height: '48px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                            <div style={{ width: '100%', height: '100%', background: job.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: '#fff', fontSize: '16px', fontWeight: '800' }}>{job.company[0]}</span>
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{job.title}</h3>
                            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '10px' }}>{job.company} • {job.location}</p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{job.type}</span>
                              <span style={{ background: '#FFF7ED', color: '#F97316', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px' }}>🔥 {job.salary}</span>
                            </div>
                          </div>
                        </div>
                        {/* Save button */}
                        <button
                          onClick={e => { e.stopPropagation(); handleSaveJob(i); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: savedJobs[i] ? '#137FEC' : '#CBD5E1', flexShrink: 0, padding: '4px' }}>
                          {savedJobs[i] ? '🔖' : '🔖'}
                        </button>
                      </div>

                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#94A3B8' }}>🕐 {job.posted} • 👥 {job.applicants}</p>
                        <div style={{ display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
                          <button className="view-btn" onClick={() => handleViewJob(job.id)}>View</button>
                          <button className="apply-btn" onClick={() => handleApply(job.id)}>Apply Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick links row */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                  {[
                    { label: '🗺️ Map Search', path: '/jobs/map' },
                    { label: '🏠 Remote Jobs', path: '/remote' },
                    { label: '🎯 AI Picks', path: '/ai-jobs' },
                    { label: '📈 Trending', path: '/trending' },
                    { label: '🧠 Skill Match', path: '/skill-jobs' },
                  ].map(link => (
                    <button key={link.label} onClick={() => navigate(link.path)}
                      style={{ padding: '8px 14px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif', transition: 'all 0.15s'" }}>
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Upcoming Interviews */}
                <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Upcoming Interviews</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {interviews.map((iv) => (
                      <div key={iv.id}
                        onClick={() => navigate(`/interviews/${iv.id}/invitation`)}
                        style={{ display: 'flex', gap: '12px', padding: '10px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <div style={{ background: iv.statusColor === '#137FEC' ? 'rgba(19,127,236,0.1)' : '#FFFBEB', borderRadius: '8px', width: '48px', minWidth: '48px', height: '52px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '10px', fontWeight: '700', color: iv.statusColor, textTransform: 'uppercase' }}>{iv.month}</span>
                          <span style={{ fontSize: '18px', fontWeight: '900', color: iv.statusColor, lineHeight: 1 }}>{iv.day}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>{iv.title}</p>
                          <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>{iv.subtitle}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '7px', height: '7px', background: iv.statusColor, borderRadius: '50%' }} />
                            <span style={{ fontSize: '11px', fontWeight: '600', color: iv.statusColor }}>{iv.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/applications')}
                    style={{ width: '100%', padding: '9px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif", marginTop: '12px' }}>
                    Calendar View
                  </button>
                </div>

                {/* Resume Score */}
                {showResumeScore && (
                  <div style={{ background: 'linear-gradient(135deg,#137FEC,#1D4ED8)', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px' }}>💡</span>
                      <button onClick={() => setShowResumeScore(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}>✕</button>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Resume Score</h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: '20px', marginBottom: '14px' }}>
                      Your resume matches 88% of requirements for the Product Design roles you've viewed.
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', height: '6px', marginBottom: '8px' }}>
                      <div style={{ background: '#fff', borderRadius: '9999px', height: '6px', width: '88%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Good Performance</span>
                      <button onClick={() => navigate('/skill-gap')}
                        style={{ background: '#fff', color: '#137FEC', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                        Check Tips
                      </button>
                    </div>
                  </div>
                )}

                {/* Top Companies */}
                <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Top Companies for you</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {companies.map(company => (
                      <div key={company.name}
                        onClick={() => navigate(`/companies/${company.id}`)}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '6px', borderRadius: '8px', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <div style={{ width: '40px', height: '40px', background: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '16px', fontWeight: '800', color: '#137FEC' }}>{company.initial}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{company.name}</p>
                          <p style={{ fontSize: '11px', color: '#64748B' }}>{company.positions}</p>
                        </div>
                        <span style={{ color: '#137FEC', fontSize: '18px' }}>›</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '14px' }}>Quick Actions</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: '📄 Update Resume',      path: '/resumes' },
                      { label: '🎓 Learning Path',       path: '/learning' },
                      { label: '📊 Career Insights',     path: '/career-insights' },
                      { label: '🏆 Certifications',      path: '/certifications' },
                      { label: '📝 Assessments',         path: '/assessments' },
                    ].map(action => (
                      <button key={action.label} onClick={() => navigate(action.path)}
                        style={{ width: '100%', padding: '9px 12px', background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif", textAlign: 'left', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.color = '#137FEC'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#334155'; }}>
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;
>>>>>>> upstream/jobportelteam
