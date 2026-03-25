import React, { useState } from 'react';

const LandingPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const categories = [
    { icon: '💻', name: 'Engineering', jobs: '1,245 open roles' },
    { icon: '🎨', name: 'Design', jobs: '840 open roles' },
    { icon: '📊', name: 'Marketing', jobs: '512 open roles' },
    { icon: '💰', name: 'Sales & Finance', jobs: '320 open roles' },
  ];

  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', color: '#0F172A', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { color: #0F172A; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; font-family: 'Inter', sans-serif; }
        .nav-link:hover { color: #137FEC; }
        .category-card { background: #F6F7F8; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.2s; }
        .category-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .search-input { border: none; outline: none; font-size: 16px; font-family: 'Inter', sans-serif; background: transparent; width: 100%; color: #0F172A; }
        .search-input::placeholder { color: #94A3B8; }
        .footer-link { color: #94A3B8; text-decoration: none; font-size: 14px; transition: color 0.2s; font-family: 'Inter', sans-serif; font-weight: 400; line-height: 20px; }
        .footer-link:hover { color: #fff; }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '65px', background: 'rgba(246,247,248,0.8)', borderBottom: '1px solid #E2E8F0', backdropFilter: 'blur(6px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '6px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>C</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>CareerFlow</span>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Find Jobs', 'Companies', 'Salaries', 'Resources'].map(item => (
            <a key={item} href="#" className="nav-link">{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => window.location.href = '/'} style={{ background: 'transparent', color: '#334155', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Login</button>
          <button onClick={() => window.location.href = '/employer/register'} style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Post a Job</button>
        </div>
      </nav>

      <section style={{ padding: '96px 32px 128px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px' }}>
          <div style={{ width: '592px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1 style={{ fontSize: '60px', fontWeight: '900', lineHeight: '60px', color: '#0F172A' }}>
              Your next career move <span style={{ color: '#137FEC' }}>starts right here</span>
            </h1>
            <div style={{ paddingBottom: '16px' }}>
              <p style={{ fontSize: '18px', fontWeight: '400', lineHeight: '28px', color: '#475569' }}>
                Join 2 million+ professionals finding roles at world-class companies. We use AI to match your skills with the perfect opportunity.
              </p>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px', boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', flex: 1 }}>
                  <span style={{ color: '#94A3B8', marginRight: '12px' }}>🔍</span>
                  <input className="search-input" placeholder="Job title or keywords" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', flex: 1 }}>
                  <span style={{ color: '#94A3B8', marginRight: '12px' }}>📍</span>
                  <input className="search-input" placeholder="City or remote" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <button onClick={() => window.location.href = '/jobs'} style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '20px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>Search Jobs</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingTop: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B' }}>Popular:</span>
              {['Product Design', 'React Developer', 'Data Science', 'UI/UX'].map(tag => (
                <a key={tag} href="/jobs" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{tag}</a>
              ))}
            </div>
          </div>

          <div style={{ width: '576px', height: '576px', position: 'relative' }}>
            <div style={{ width: '576px', height: '576px', background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)', borderRadius: '16px', border: '4px solid #FFFFFF', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '100px', marginBottom: '16px' }}>👩‍💼</div>
                <p style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A' }}>2M+ Professionals</p>
                <p style={{ fontSize: '14px', color: '#64748B' }}>Finding their dream jobs</p>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)', borderRadius: '12px', padding: '16px', boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', width: '56px', height: '32px' }}>
                <div style={{ width: '32px', height: '32px', background: '#E2E8F0', borderRadius: '50%', border: '2px solid #fff', position: 'absolute', right: 0 }} />
                <div style={{ width: '32px', height: '32px', background: '#137FEC', borderRadius: '50%', border: '2px solid #fff', position: 'absolute', left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#fff' }}>+12</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', lineHeight: '16px' }}>New roles today</p>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>In your location</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', lineHeight: '36px' }}>Explore Categories</h2>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>Find the right role for your expertise</p>
            </div>
            <a href="/jobs" style={{ fontSize: '16px', fontWeight: '600', color: '#137FEC', textDecoration: 'none' }}>View All →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {categories.map(cat => (
              <div key={cat.name} className="category-card" onClick={() => window.location.href = '/jobs'}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '25px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{cat.name}</h3>
                <p style={{ fontSize: '14px', color: '#64748B' }}>{cat.jobs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>Top Companies Hiring</h2>
          <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '32px' }}>Work with the innovators and market leaders</p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', opacity: 0.6 }}>
            {companies.map(c => (
              <div key={c} style={{ fontSize: '14px', fontWeight: '700', color: '#64748B', cursor: 'pointer' }} onClick={() => window.location.href = '/jobs'}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 32px 64px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ background: '#137FEC', borderRadius: '24px', padding: '64px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(103.97% 365.4% at 100% 0%, #FFFFFF 0%, rgba(255,255,255,0) 50%)', opacity: 0.1 }} />
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#FFFFFF', lineHeight: '40px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>Ready to take the next step?</h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', lineHeight: '28px', maxWidth: '520px', margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
            Create your profile today and start receiving personalized job recommendations directly in your inbox.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', paddingTop: '16px', position: 'relative', zIndex: 1 }}>
            <button onClick={() => window.location.href = '/select-role'} style={{ background: '#FFFFFF', color: '#137FEC', border: 'none', padding: '17px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)' }}>Join Now — It's Free</button>
            <button onClick={() => window.location.href = '/employer/register'} style={{ background: 'rgba(19,127,236,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>For Employers</button>
          </div>
        </div>
      </section>

      <footer style={{ background: '#0F172A', padding: '64px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#137FEC', borderRadius: '4px', padding: '4px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '10px', fontWeight: '800' }}>C</span>
                </div>
                <span style={{ fontWeight: '700', fontSize: '20px', color: '#FFFFFF', letterSpacing: '-0.5px' }}>CareerFlow</span>
              </div>
              <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '24px', maxWidth: '294px' }}>Simplifying the hunt for your dream job with AI-powered matching and verified listings.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                {['🌐', '📧', '↗'].map((icon, i) => (<span key={i} style={{ fontSize: '18px', color: '#94A3B8', cursor: 'pointer' }}>{icon}</span>))}
              </div>
            </div>
            {[
              { title: 'Platform', links: ['Browse Jobs', 'Career Advice', 'Job Alerts', 'Salaries'] },
              { title: 'Company', links: ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'] },
              { title: 'Support', links: ['Help Center', 'Accessibility', 'Partner Program'] },
            ].map(col => (
              <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h4 style={{ fontWeight: '700', fontSize: '16px', color: '#FFFFFF' }}>{col.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {col.links.map(link => (<a key={link} href="#" className="footer-link">{link}</a>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #1E293B', paddingTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>© 2024 CareerFlow Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;