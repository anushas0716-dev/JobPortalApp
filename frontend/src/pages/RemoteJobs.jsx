import React, { useState } from 'react';

const RemoteJobs = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState([]);

  const benefits = [
    { icon: '🌍', bg: '#EFF6FF', iconColor: '#137FEC', title: 'Work from Anywhere', desc: 'Escape the commute and office politics. Work from your home, a cafe, or a beach in Bali.' },
    { icon: '❤️', bg: '#FFF1F2', iconColor: '#F43F5E', title: 'Health & Wellness', desc: 'Comprehensive insurance plans and digital wellness memberships that work across borders.' },
    { icon: '📗', bg: '#ECFDF5', iconColor: '#10B981', title: 'Learning Stipends', desc: 'Annual budgets for courses, books, conferences, and certifications to fuel your growth.' },
  ];

  const jobs = [
    { id: 1, icon: '✦', title: 'Senior Product Designer', company: 'Stripe', location: 'Worldwide', salary: '$140k - $190k', dept: 'DESIGN', type: 'FULL-TIME', typeColor: '#137FEC' },
    { id: 2, icon: '☁️', title: 'DevOps Engineer (SRE)', company: 'GitLab', location: 'EU Timezones', salary: '$110k - $160k', dept: 'ENGINEERING', type: 'CONTRACT', typeColor: '#137FEC' },
    { id: 3, icon: '📣', title: 'Growth Marketing Manager', company: 'Shopify', location: 'Remote US/Canada', salary: '$90k - $130k', dept: 'MARKETING', type: 'FULL-TIME', typeColor: '#137FEC' },
  ];

  const quickFilters = ['🌐 Worldwide ▾', '⏰ Flexible Hours ▾', '💰 Min. Salary ▾', '📅 4-Day Week', '✅ Verified Only'];

  const footerCols = {
    'Job Seekers': ['Browse Jobs', 'Remote Companies', 'Job Alerts', 'Salaries'],
    'Employers': ['Post a Job', 'Hiring Solutions', 'Pricing', 'Support'],
    'Platform': ['About Us', 'Privacy Policy', 'Terms of Service', 'Contact'],
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-row { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: box-shadow 0.2s; cursor: pointer; }
        .job-row:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.07); }
        .benefit-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 16px; flex: 1; }
        a { text-decoration: none; color: inherit; }
        a:hover { color: #137FEC; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🌐</div>
            <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>RemoteWork</span>
          </div>
          {['Find Jobs', 'Companies', 'Salaries', 'Resources'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 12px', color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Quick search..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', flex: 1 }} />
          </div>
          <button style={{ padding: '9px 16px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Post a Job</button>
          <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer' }}>👤</div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 16px 0' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '40px' }}>
          {/* Left */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(19,127,236,0.1)', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', color: '#137FEC', letterSpacing: '0.6px', textTransform: 'uppercase', width: 'fit-content' }}>
              📍 2,482 NEW JOBS THIS WEEK
            </span>
            <h1 style={{ fontSize: '60px', fontWeight: '900', color: '#0F172A', lineHeight: '60px', letterSpacing: '-1.5px' }}>
              Find Your Dream<br />
              <span style={{ color: '#137FEC' }}>Remote Job</span><br />
              Globally.
            </h1>
            <p style={{ fontSize: '20px', color: '#475569', lineHeight: '28px', maxWidth: '512px' }}>Connecting top talent with elite work-from-home opportunities in engineering, product, design, and marketing.</p>
            {/* Search Box */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px', gap: '8px', boxShadow: '0px 20px 25px -5px rgba(19,127,236,0.05)', maxWidth: '568px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, borderRight: '1px solid #F1F5F9', padding: '0 12px', gap: '8px', height: '58px' }}>
                <span style={{ color: '#94A3B8', fontSize: '16px' }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title, keywords..." style={{ border: 'none', outline: 'none', fontSize: '16px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', flex: 1 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '0 12px', gap: '8px', height: '58px' }}>
                <span style={{ color: '#94A3B8', fontSize: '16px' }}>📍</span>
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Anywhere" style={{ border: 'none', outline: 'none', fontSize: '16px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', flex: 1 }} />
              </div>
              <button style={{ padding: '12px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", height: '48px', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)', whiteSpace: 'nowrap' }}>Search</button>
            </div>
          </div>
          {/* Right Image */}
          <div style={{ width: '568px', height: '320px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', flexShrink: 0, position: 'relative', background: 'linear-gradient(135deg,#dbeafe,#eff6ff)' }}>
            <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=340&fit=crop" alt="remote work" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display='none'} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(19,127,236,0.2) 0%, transparent 100%)' }} />
          </div>
        </div>

        {/* Quick Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingBottom: '40px' }}>
          {quickFilters.map(f => (
            <button key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '40px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#334155', cursor: 'pointer', fontFamily: "'Inter',sans-serif' " }}>{f}</button>
          ))}
        </div>
      </div>

      {/* BENEFITS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '4px' }}>Top Remote Benefits</h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>Why top companies are hiring remote first.</p>
          </div>
          <a href="#" style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>View All Benefits</a>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {benefits.map(b => (
            <div key={b.title} className="benefit-card">
              <div style={{ width: '48px', height: '48px', background: b.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{b.icon}</div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '7px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '23px' }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LATEST JOBS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px', borderTop: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '32px' }}>Latest Remote Opportunities</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {jobs.map(job => (
            <div key={job.id} className="job-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '64px', height: '64px', background: '#F1F5F9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{job.icon}</div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{job.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{job.company}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#64748B' }}>🌐 {job.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#64748B' }}>💰 {job.salary}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: '#F1F5F9', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', color: '#0F172A', letterSpacing: '0.6px' }}>{job.dept}</span>
                <span style={{ background: 'rgba(19,127,236,0.1)', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', color: '#137FEC', letterSpacing: '0.6px' }}>{job.type}</span>
                <button onClick={() => setSaved(p => p.includes(job.id) ? p.filter(x => x !== job.id) : [...p, job.id])} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: saved.includes(job.id) ? '#137FEC' : '#94A3B8', padding: '8px' }}>🔖</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 32px', background: '#fff', border: '2px solid #137FEC', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Load More Jobs ▾</button>
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px 40px' }}>
        <div style={{ background: '#137FEC', borderRadius: '24px', padding: '64px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '256px', height: '256px', right: '-128px', top: '-128px', background: 'rgba(255,255,255,0.1)', filter: 'blur(32px)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', width: '256px', height: '256px', left: '-128px', bottom: '-128px', background: 'rgba(15,23,42,0.1)', filter: 'blur(32px)', borderRadius: '50%' }} />
          <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#FFFFFF', marginBottom: '16px', position: 'relative' }}>Ready to work from anywhere?</h2>
          <p style={{ fontSize: '20px', color: '#FFFFFF', lineHeight: '28px', marginBottom: '24px', maxWidth: '672px', margin: '0 auto 24px', position: 'relative' }}>Join 50,000+ remote workers getting daily alerts on high-paying global roles.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '16px', position: 'relative' }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ padding: '18px 24px', background: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontFamily: "'Inter',sans-serif", color: '#0F172A', width: '384px', outline: 'none' }} />
            <button style={{ padding: '16px 40px', background: '#0F172A', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1)' }}>Join Now</button>
          </div>
          <p style={{ fontSize: '14px', color: '#FFFFFF', marginTop: '16px', position: 'relative' }}>No spam, just the best jobs. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '48px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0', marginBottom: '32px' }}>
          {/* Brand */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🌐</div>
              <span style={{ fontWeight: '700', fontSize: '20px', color: '#0F172A' }}>RemoteWork</span>
            </div>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '23px', maxWidth: '320px' }}>The world's leading community for remote workers and the companies that hire them. Proudly working from home since 2018.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['🔗', '📧', '📡'].map((icon, i) => (
                <div key={i} style={{ width: '40px', height: '40px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' }}>{icon}</div>
              ))}
            </div>
          </div>
          {/* Links */}
          {Object.entries(footerCols).map(([col, links]) => (
            <div key={col} style={{ flex: 1 }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>{col}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(l => <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B' }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 RemoteWork Inc. Built for the distributed future.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', cursor: 'pointer' }}>🌐 English (US)</span>
            <span style={{ fontSize: '12px', color: '#94A3B8', cursor: 'pointer' }}>☀️ Theme</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RemoteJobs;