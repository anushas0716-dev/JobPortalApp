import React, { useState } from 'react';

const RecommendedJobs = () => {
  const [activeFilter, setActiveFilter] = useState('All Matches');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState([]);

  const filters = ['All Matches', 'Remote Only', 'Design Systems', 'Salary: $140k+'];

  const navItems = [
    { icon: '🏠', label: 'Recommended', active: true, path: '/recommended' },
    { icon: '💼', label: 'My Jobs', path: '/candidate-dashboard' },
    { icon: '💬', label: 'Messages', path: '#' },
    { icon: '⚙️', label: 'Preferences', path: '/job-preferences' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Product Designer',
      company: 'Stripe',
      location: 'San Francisco, CA (Remote)',
      match: 98,
      type: 'Full-time',
      salary: '$160k – $210k',
      posted: 'Posted 2 days ago',
      applicants: '14 applicants',
      logo: '💳',
      logoBg: '#635BFF',
      reasons: [
        'Matches 5/5 of your top skills',
        "Aligned with your 'Fintech' interest",
        'Matches your preferred salary range',
      ],
    },
    {
      id: 2,
      title: 'Lead UX Architect',
      company: 'Spotify',
      location: 'New York, NY',
      match: 92,
      type: 'Hybrid',
      salary: '$180k – $240k',
      posted: 'Posted 5 hours ago',
      applicants: '4 applicants',
      logo: '🎵',
      logoBg: '#1DB954',
      reasons: [
        "Your past experience at 'Meta' is a plus",
        "Fits your 'Leadership' career goal",
      ],
    },
    {
      id: 3,
      title: 'Design Systems Lead',
      company: 'Salesforce',
      location: 'Seattle, WA',
      match: 88,
      type: 'Full-time',
      salary: '$155k – $195k',
      posted: 'Posted 1 week ago',
      applicants: '27 applicants',
      logo: '☁️',
      logoBg: '#00A1E0',
      reasons: [
        "Directly matches your 'Design Systems' skill",
      ],
    },
  ];

  const toggleSave = (id) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filtered = jobs.filter(j => {
    if (activeFilter === 'Remote Only' && !j.location.includes('Remote')) return false;
    if (activeFilter === 'Design Systems' && !j.title.includes('Design')) return false;
    if (activeFilter === 'Salary: $140k+') return true;
    return true;
  }).filter(j => !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: all 0.15s; }
        .nav-item:hover { background: #F1F5F9; }
        .job-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 16px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: box-shadow 0.2s; }
        .job-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .filter-pill { padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: 1px solid #E2E8F0; font-family: 'Inter', sans-serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '16px', color: '#137FEC' }}>💼</span>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>JobMatch</span>
          </div>
          <div style={{ display: 'flex', gap: '36px' }}>
            {[
              { label: 'Explore', active: true, path: '/recommended' },
              { label: 'Applied', path: '/candidate-dashboard' },
              { label: 'Saved', path: '/saved-jobs' },
            ].map(item => (
              <a key={item.label} href={item.path} style={{ fontSize: '14px', fontWeight: item.active ? '600' : '500', color: item.active ? '#137FEC' : '#475569', textDecoration: 'none', borderBottom: item.active ? '2px solid #137FEC' : 'none', paddingBottom: item.active ? '4px' : '0' }}>{item.label}</a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', background: '#F1F5F9', borderRadius: '8px', overflow: 'hidden', width: '256px', height: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '31px', height: '40px', background: '#F1F5F9', flexShrink: 0 }}>
              <span style={{ color: '#64748B', fontSize: '13px' }}>🔍</span>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles, skills..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter', sans-serif", background: '#F1F5F9', color: '#0F172A', flex: 1, padding: '0 8px' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', color: '#475569', cursor: 'pointer' }}>🔔</span>
            <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer', border: '2px solid rgba(19,127,236,0.2)' }}>👤</div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ display: 'flex', gap: '32px', padding: '32px 40px', maxWidth: '1280px', margin: '0 auto' }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* User Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
            {/* Avatar + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #e0f0ff, #c7deff)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>👤</div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>Alex Rivera</p>
                <p style={{ fontSize: '12px', color: '#64748B' }}>Senior Product Designer</p>
              </div>
            </div>
            {/* Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map(item => (
                <div key={item.label} className="nav-item" style={{ background: item.active ? 'rgba(19,127,236,0.1)' : 'transparent' }} onClick={() => window.location.href = item.path}>
                  <span style={{ fontSize: '15px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: item.active ? '600' : '500', color: item.active ? '#137FEC' : '#475569' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Strength */}
          <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>Profile Strength</p>
            <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '8px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '85%', background: '#137FEC', borderRadius: '9999px' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: '20px' }}>Add your latest project to reach "Expert" status and get 2x more matches.</p>
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
          {/* Header */}
          <div style={{ marginBottom: '8px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Recommended for You</h2>
            <p style={{ fontSize: '14px', color: '#64748B' }}>Based on your expertise in Figma, React, and UX Strategy</p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {filters.map(f => (
              <button key={f} className="filter-pill" onClick={() => setActiveFilter(f)}
                style={{ background: activeFilter === f ? '#137FEC' : '#FFFFFF', color: activeFilter === f ? '#fff' : '#475569', fontWeight: activeFilter === f ? '600' : '500', borderColor: activeFilter === f ? '#137FEC' : '#E2E8F0' }}>
                {f}
              </button>
            ))}
          </div>

          {/* Job Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map(job => (
              <div key={job.id} className="job-card">
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '56px', height: '56px', background: job.logoBg, border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{job.logo}</div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{job.title}</h3>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleSave(job.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: saved.includes(job.id) ? '#137FEC' : '#94A3B8', padding: '4px' }}>🔖</button>
                </div>

                {/* Badges Row */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#DCFCE7', color: '#15803D', fontSize: '12px', fontWeight: '700', padding: '3px 12px', borderRadius: '9999px' }}>
                    ✦ {job.match}% Match
                  </span>
                  <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: '500', padding: '4px 12px', borderRadius: '9999px' }}>{job.type}</span>
                  <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: '500', padding: '4px 12px', borderRadius: '9999px' }}>{job.salary}</span>
                </div>

                {/* Why This Matches */}
                <div style={{ background: 'rgba(19,127,236,0.05)', borderLeft: '4px solid #137FEC', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Why this matches you</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
                    {job.reasons.map((r, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#137FEC', fontSize: '13px' }}>✓</span>
                        <span style={{ fontSize: '12px', color: '#475569' }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>{job.posted} • {job.applicants}</p>
                  <button style={{ padding: '8px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Apply Now</button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>No matches found</p>
              </div>
            )}
          </div>

          {/* Load More */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
            <button style={{ padding: '12px 32px', background: '#fff', border: '2px solid #E2E8F0', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Load More Recommendations
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside style={{ width: '288px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Job Market Insights */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Job Market Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Hiring Trend in SF</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#16A34A' }}>↑ 12%</span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>vs last month</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Top Skill in Demand</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>Design Systems</p>
              </div>
            </div>
          </div>

          {/* Recent Searches */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Recent Searches</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Product Designer NY', 'Remote UX Lead'].map(s => (
                <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.location.href = `/jobs?q=${encodeURIComponent(s)}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '13px' }}>🕐</span>
                    <span style={{ fontSize: '14px', color: '#475569' }}>{s}</span>
                  </div>
                  <span style={{ color: '#CBD5E1', fontSize: '12px' }}>›</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Coaching Banner */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '192px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop) center/cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 60%, transparent)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#fff', lineHeight: '22px', marginBottom: '4px' }}>Career Coaching for Creatives</p>
              <p style={{ fontSize: '12px', color: '#E2E8F0' }}>Book a 1:1 session today</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RecommendedJobs;