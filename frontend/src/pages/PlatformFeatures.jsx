import React from 'react';

const PlatformFeatures = () => {
  const seekerFeatures = [
    {
      icon: '🎯',
      title: 'Smart Matchmaking',
      desc: 'Our proprietary AI scans thousands of data points to find roles that perfectly align with your skills, values, and career goals.'
    },
    {
      icon: '⚡',
      title: 'One-Click Apply',
      desc: "Don't waste time on repetitive forms. Apply to multiple positions instantly with your verified professional profile and resume."
    },
    {
      icon: '📊',
      title: 'Company Insights',
      desc: 'Get a look behind the curtain with real employee data, growth trajectories, and culture scores for every hiring partner.'
    },
  ];

  const employerFeatures = [
    {
      icon: '📈',
      title: 'Talent Analytics',
      desc: 'Visualize your hiring funnel, identify bottlenecks, track diversity metrics, and optimize your recruitment ROI in real-time.'
    },
    {
      icon: '👥',
      title: 'Collaborative Hiring',
      desc: 'Shared candidate feedback loops, internal rating systems, and integrated interview scheduling for your entire team.'
    },
    {
      icon: '🛡️',
      title: 'Automated Screening',
      desc: 'Focus only on the most qualified applicants. Our smart filters pre-screen candidates based on your custom requirements.'
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#0f172a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { color: #334155; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #137FEC; }
        .feature-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; transition: all 0.2s; }
        .feature-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .check-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 24px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '65px',
        background: 'rgba(246,247,248,0.8)', borderBottom: '1px solid #e2e8f0',
        backdropFilter: 'blur(6px)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '6px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px' }}>JobPortal</span>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {['Solutions', 'Pricing', 'Resources'].map(item => (
            <a key={item} href="#" className="nav-link">{item}</a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
            padding: '8px 12px', width: '200px'
          }}>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>🔍</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>Search features</span>
          </div>
          <button style={{
            background: '#137FEC', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: '8px', fontSize: '14px',
            fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
          }}>Sign Up</button>
          <button style={{
            background: 'transparent', color: '#334155', border: 'none',
            padding: '8px 16px', borderRadius: '8px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
          }}>Log In</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{ background: '#f6f7f8', padding: '96px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '48px' }}>
          {/* Left */}
          <div style={{ flex: 1, maxWidth: '592px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#e0f0ff', borderRadius: '20px', padding: '4px 12px',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '12px' }}>⚙️</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#137FEC', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform Ecosystem</span>
            </div>

            <h1 style={{
              fontSize: '60px', fontWeight: '900', lineHeight: '1.05',
              color: '#0f172a', marginBottom: '24px'
            }}>
              The future of work<br />
              is <span style={{ color: '#137FEC' }}>intelligent.</span>
            </h1>

            <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.7', marginBottom: '36px', maxWidth: '500px' }}>
              Our platform bridges the gap between top-tier talent and industry leaders using advanced AI, real-time analytics, and seamless matching workflows.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: '#137FEC', color: '#fff', border: 'none',
                padding: '14px 28px', borderRadius: '8px', fontSize: '15px',
                fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
              }}>Get Started Free</button>
              <button style={{
                background: '#fff', color: '#334155', border: '1px solid #e2e8f0',
                padding: '14px 28px', borderRadius: '8px', fontSize: '15px',
                fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
              }}>View Demo</button>
            </div>
          </div>

          {/* Right - Dashboard mockup */}
          <div style={{ flex: 1, maxWidth: '576px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fde8d8 0%, #fdf0e8 100%)',
              borderRadius: '16px', height: '400px', overflow: 'hidden',
              border: '4px solid #fff', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Dashboard mockup */}
              <div style={{
                background: '#1e293b', borderRadius: '12px', padding: '20px',
                width: '85%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                  {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                    <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ background: '#334155', borderRadius: '6px', height: '40px' }} />
                  ))}
                </div>
                <div style={{
                  background: '#137FEC', borderRadius: '50%', width: '80px', height: '80px',
                  margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', fontWeight: '800', color: '#fff'
                }}>AI</div>
                <div style={{ background: '#334155', borderRadius: '6px', height: '12px', marginBottom: '6px' }} />
                <div style={{ background: '#334155', borderRadius: '6px', height: '12px', width: '70%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOB SEEKERS SECTION */}
      <section style={{ padding: '80px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#137FEC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                JOB SEEKERS
              </p>
              <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0f172a' }}>
                Empower your career growth
              </h2>
            </div>
            <a href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', textDecoration: 'none' }}>
              Explore all seeker tools →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {seekerFeatures.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{
                  width: '44px', height: '44px', background: '#e8f4ff',
                  borderRadius: '10px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '22px', marginBottom: '16px'
                }}>{f.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYERS SECTION */}
      <section style={{ padding: '80px 32px', background: '#f6f7f8' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', textDecoration: 'none' }}>
              Discover employer solutions →
            </a>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#137FEC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                EMPLOYERS
              </p>
              <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0f172a' }}>
                Hire better, faster, and smarter
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {employerFeatures.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{
                  width: '44px', height: '44px', background: '#e8f4ff',
                  borderRadius: '10px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '22px', marginBottom: '16px'
                }}>{f.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECISION MATCHING SECTION */}
      <section style={{ padding: '80px 32px', background: '#0f172a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '80px' }}>
          {/* Left */}
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: '40px', fontWeight: '900', color: '#fff',
              lineHeight: '1.2', marginBottom: '36px'
            }}>
              Precision matching<br />that evolves with you.
            </h2>

            {[
              { title: 'Dynamic Resume Parsing', desc: 'Our AI understands context, not just keywords, ensuring better quality matches.' },
              { title: 'Predictive Salary Benchmarking', desc: 'Stay competitive with real-time market data integrated directly into your job posts.' },
              { title: 'Seamless Integration', desc: 'Connect with Slack, Zoom, Greenhouse, and more in just two clicks.' },
            ].map(item => (
              <div key={item.title} className="check-item">
                <div style={{
                  width: '22px', height: '22px', background: '#137FEC',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                }}>
                  <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>
                </div>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '15px', color: '#fff', marginBottom: '4px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Video placeholder */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: '#1e293b', borderRadius: '16px', height: '320px',
              border: '1px solid #334155', display: 'flex', alignItems: 'center',
              justifyContent: 'center', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                width: '56px', height: '56px', background: 'rgba(255,255,255,0.15)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backdropFilter: 'blur(4px)'
              }}>
                <span style={{ color: '#fff', fontSize: '20px', marginLeft: '4px' }}>▶</span>
              </div>
              <p style={{ position: 'absolute', bottom: '16px', color: '#64748b', fontSize: '13px' }}>Watch Demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '80px 32px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>
            Ready to find your perfect match?
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.7', marginBottom: '36px' }}>
            Join over 10,000+ companies and 2 million+ job seekers already using<br />
            JobPortal to redefine their professional future.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{
              background: '#137FEC', color: '#fff', border: 'none',
              padding: '14px 32px', borderRadius: '8px', fontSize: '15px',
              fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
            }}>Create Profile</button>
            <button style={{
              background: 'transparent', color: '#334155', border: 'none',
              padding: '14px 32px', borderRadius: '8px', fontSize: '15px',
              fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
            }}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '24px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ background: '#137FEC', borderRadius: '4px', padding: '4px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '10px', fontWeight: '800' }}>J</span>
            </div>
            <span style={{ fontWeight: '700', fontSize: '14px' }}>JobPortal © 2024</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(link => (
              <a key={link} href="#" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['🌐', '@', '↗'].map((icon, i) => (
              <span key={i} style={{ fontSize: '16px', color: '#94a3b8', cursor: 'pointer' }}>{icon}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlatformFeatures;