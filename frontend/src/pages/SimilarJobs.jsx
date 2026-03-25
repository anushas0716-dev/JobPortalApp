import React, { useState } from 'react';

const SimilarJobs = () => {
  const [saved, setSaved] = useState([]);
  const [following, setFollowing] = useState(false);
  const [search, setSearch] = useState('');

  const toggleSave = (id) => setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const similarJobs = [
    {
      id: 1, type: 'FULL-TIME', title: 'Senior Product Designer',
      company: 'CreativeFlow', location: 'Remote',
      salary: '$140k - $185k / year', posted: 'Posted 2 days ago',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=130&fit=crop',
    },
    {
      id: 2, type: 'CONTRACT', title: 'UX/UI Design Engineer',
      company: 'PixelPerfect Studio', location: 'New York, NY',
      salary: '$90 - $120 / hour', posted: 'Posted 5 hours ago',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=130&fit=crop',
    },
    {
      id: 3, type: 'FULL-TIME', title: 'Product Designer, Growth',
      company: 'ScaleUp Inc.', location: 'Austin, TX (Hybrid)',
      salary: '$125k - $160k / year', posted: 'Posted 1 day ago',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=130&fit=crop',
    },
  ];

  const insights = [
    { icon: '👥', label: 'Applicants', value: '42 people applied' },
    { icon: '📈', label: 'Activity', value: 'High hiring interest' },
    { icon: '🕐', label: 'Response time', value: 'Usually responds in 2 days' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; transition: color 0.15s; }
        .nav-link:hover { color: #137FEC; }
        .similar-card { display: flex; gap: 16px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; transition: box-shadow 0.2s; cursor: pointer; }
        .similar-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.07); }
        .type-badge { font-size: 12px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: rgba(19,127,236,0.8); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', color: '#137FEC' }}>❄️</span>
            <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>JobFinder</span>
          </div>
          {['Find Jobs', 'Companies', 'Salaries'].map(l => (
            <a key={l} href={l === 'Find Jobs' ? '/jobs' : '#'} className="nav-link">{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', height: '40px', width: '256px', overflow: 'hidden' }}>
            <div style={{ padding: '0 16px', color: '#64748B', fontSize: '13px', flexShrink: 0 }}>🔍</div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles or companies" style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', flex: 1 }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ width: '32px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', borderRadius: '50%', color: '#475569' }}>🔔</button>
            <div style={{ width: '36px', height: '36px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(19,127,236,0.2)', cursor: 'pointer', overflow: 'hidden' }}>
              <span style={{ fontSize: '18px' }}>👤</span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '32px 80px 38px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1120px', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

          {/* LEFT COLUMN */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Job Detail Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '64px', height: '64px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>🔷</div>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Lead Product Designer</h1>
                    <p style={{ fontSize: '16px', fontWeight: '500', color: '#137FEC' }}>TechFlow Inc. • San Francisco, CA (Remote)</p>
                  </div>
                </div>
                <button style={{ padding: '10px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", flexShrink: 0 }}>Apply Now</button>
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: '26px' }}>
                We are looking for a Lead Product Designer to join our core product team. You'll be responsible for leading the design vision of our flagship platform, working closely with engineering and product managers to deliver world-class user experiences.
              </p>
            </div>

            {/* Similar Jobs Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px', color: '#137FEC' }}>💼</span>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Similar Jobs for You</h2>
                </div>
                <a href="/jobs" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', textDecoration: 'none' }}>View All</a>
              </div>

              {/* Job Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {similarJobs.map(job => (
                  <div key={job.id} className="similar-card">
                    {/* Image */}
                    <img src={job.image} alt={job.title} style={{ width: '192px', height: '128px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} onError={e => { e.target.style.background = '#F1F5F9'; e.target.style.display = 'none'; }} />

                    {/* Content */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4px 0' }}>
                      <div>
                        {/* Type + Save */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <span className="type-badge">{job.type}</span>
                          <button onClick={() => toggleSave(job.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: saved.includes(job.id) ? '#137FEC' : '#94A3B8', padding: 0 }}>♥</button>
                        </div>
                        {/* Title */}
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>{job.title}</h3>
                        {/* Meta */}
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>🏢 {job.company}</span>
                          <span style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {job.location}</span>
                        </div>
                      </div>
                      {/* Footer */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{job.salary}</span>
                        <span style={{ fontSize: '12px', color: '#94A3B8' }}>{job.posted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '16px' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '16px', fontWeight: '500', color: '#475569', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                  Show more related jobs ▾
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ width: '352px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* About the Company */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>About the Company</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>🔷</div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>TechFlow Inc.</p>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>Enterprise Software • 500-1000 employees</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>TechFlow is a leading provider of enterprise automation software, helping teams move faster with confidence.</p>
              <button onClick={() => setFollowing(!following)} style={{ width: '100%', padding: '8px 0', background: '#fff', border: `1px solid ${following ? '#137FEC' : '#137FEC'}`, borderRadius: '8px', fontSize: '16px', fontWeight: '600', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                {following ? '✓ Following' : 'Follow Company'}
              </button>
            </div>

            {/* Job Insights */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Job Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {insights.map((ins, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px', color: '#94A3B8', flexShrink: 0 }}>{ins.icon}</span>
                    <div>
                      <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '2px' }}>{ins.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{ins.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              {/* Map Image */}
              <div style={{ height: '160px', background: '#E2E8F0', position: 'relative', overflow: 'hidden' }}>
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=13&size=400x160&maptype=roadmap&markers=color:blue%7CSan+Francisco,CA&key=demo" alt="map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '9999px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)' }}>
                    <span style={{ color: '#137FEC', fontSize: '13px' }}>📍</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>TechFlow HQ</span>
                  </div>
                </div>
              </div>
              {/* Address */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '-0.6px', textTransform: 'uppercase' }}>Office Address</p>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>123 Design District, Mission Bay, San Francisco, CA 94103</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <span style={{ fontSize: '18px', color: '#137FEC' }}>❄️</span>
            <span style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A' }}>JobFinder</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 JobFinder Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SimilarJobs;