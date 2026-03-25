import React, { useState } from 'react';

const SkillBasedJobRecommendations = () => {
  const [activeTab, setActiveTab] = useState('All Recommendations');
  const [footerEmail, setFooterEmail] = useState('');

  const tabs = ['All Recommendations', 'React.js', 'Product Design', 'TypeScript', 'Tailwind CSS'];

  const reactJobs = [
    {
      id: 1,
      logo: '▣',
      logoBg: '#F1F5F9',
      match: '98% Match',
      matchBg: '#F0FDF4',
      matchColor: '#16A34A',
      title: 'Senior Front-end Engineer',
      company: 'Stripe',
      location: 'San Francisco (Remote)',
      tags: ['REACT', 'TYPESCRIPT', 'ZUSTAND'],
      salary: '$160k – $210k',
      posted: '2 hours ago',
    },
    {
      id: 2,
      logo: '♪',
      logoBg: '#F0FDF4',
      logoColor: '#16A34A',
      match: '94% Match',
      matchBg: '#F0FDF4',
      matchColor: '#16A34A',
      title: 'React Developer (UI/UX Focus)',
      company: 'Spotify',
      location: 'Stockholm • Hybrid',
      tags: ['REACT', 'FRAMER MOTION', 'DESIGN SYSTEMS'],
      salary: '€90k – €120k',
      posted: '5 hours ago',
    },
    {
      id: 3,
      logo: '⬡',
      logoBg: '#FEF3C7',
      logoColor: '#D97706',
      match: '91% Match',
      matchBg: '#F0FDF4',
      matchColor: '#16A34A',
      title: 'Software Engineer, Design Tooling',
      company: 'Airbnb',
      location: 'San Francisco • Remote',
      tags: ['REACT', 'FIGMA PLUGIN API', 'TYPESCRIPT'],
      salary: '$175k – $225k',
      posted: 'Yesterday',
    },
  ];

  const designJobs = [
    {
      id: 4,
      logo: '▶',
      logoBg: '#FEE2E2',
      logoColor: '#EF4444',
      match: '88% Match',
      matchBg: '#EFF6FF',
      matchColor: '#2563EB',
      title: 'Senior Product Designer',
      company: 'YouTube',
      location: 'Los Angeles • On-site',
      tags: ['FIGMA', 'MOTION', 'PROTOTYPING'],
      salary: '$150k – $200k',
      posted: '3 days ago',
    },
    {
      id: 5,
      logo: 'N',
      logoBg: '#FEE2E2',
      logoColor: '#EF4444',
      match: '85% Match',
      matchBg: '#EFF6FF',
      matchColor: '#2563EB',
      title: 'Visual Systems Designer',
      company: 'Netflix',
      location: 'Los Gatos • Hybrid',
      tags: ['FIGMA', 'DESIGN SYSTEMS', 'UI'],
      salary: '$180k – $240k',
      posted: '1 week ago',
    },
  ];

  const skillBars = [
    { label: 'REACT MASTERY', pct: 92, opacity: 1 },
    { label: 'TYPESCRIPT', pct: 68, opacity: 0.7 },
    { label: 'FIGMA', pct: 85, opacity: 0.8 },
  ];

  const stats = [
    { value: '12', label: 'INTERVIEWS SECURED' },
    { value: '450+', label: 'JOB MATCHES' },
    { value: '2.4k', label: 'PROFILE VIEWS' },
    { value: '8', label: 'NEW SKILLS LEARNED' },
  ];

  const JobCard = ({ job }) => (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      padding: '25px',
      flex: 1,
      minWidth: 0,
      position: 'relative',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Top row: logo + match */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: 48, height: 48,
          background: job.logoBg,
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', color: job.logoColor || '#475569', fontWeight: 700,
          flexShrink: 0,
        }}>{job.logo}</div>
        <span style={{
          background: job.matchBg,
          color: job.matchColor,
          fontSize: '12px', fontWeight: 700,
          padding: '4px 8px', borderRadius: '4px',
        }}>{job.match}</span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', lineHeight: '28px' }}>{job.title}</h3>

      {/* Company/Location */}
      <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px' }}>{job.company} • {job.location}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {job.tags.map(tag => (
          <span key={tag} style={{
            background: '#F1F5F9', color: '#475569',
            fontSize: '10px', fontWeight: 700,
            padding: '4px 8px', borderRadius: '4px',
            letterSpacing: '0.3px',
          }}>{tag}</span>
        ))}
      </div>

      {/* Salary + posted */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #F1F5F9', paddingTop: '16px',
      }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{job.salary}</span>
        <span style={{ fontSize: '12px', color: '#94A3B8' }}>{job.posted}</span>
      </div>
    </div>
  );

  const UpskillCard = () => (
    <div style={{
      background: 'rgba(19,127,236,0.05)',
      border: '2px dashed rgba(19,127,236,0.3)',
      borderRadius: '12px',
      padding: '30px 24px',
      flex: 1,
      minWidth: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
    }}>
      <div style={{
        width: 48, height: 48,
        background: 'rgba(19,127,236,0.2)',
        borderRadius: '9999px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', marginBottom: '16px',
      }}>🎓</div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Boost your matches</h3>
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px', marginBottom: '24px' }}>
        Learn Next.js to unlock 45 more high-paying opportunities in your area.
      </p>
      <button style={{
        width: '100%', padding: '8px 0',
        background: '#FFFFFF', border: '1px solid #137FEC',
        borderRadius: '8px', fontSize: '14px', fontWeight: 700,
        color: '#137FEC', cursor: 'pointer', fontFamily: 'inherit',
      }}>Browse Courses</button>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        a:hover { color: #137FEC; }
        .tab-link { cursor: pointer; padding-bottom: 16px; position: relative; border: none; background: none; font-family: 'Inter', sans-serif; font-size: 14px; }
        .tab-link.active { color: #137FEC; font-weight: 700; }
        .tab-link.active::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
          height: 4px; background: #137FEC; border-radius: 9999px 9999px 0 0;
        }
        .tab-link.inactive { color: #64748B; font-weight: 600; }
        .skill-bar-fill { height: 8px; border-radius: 9999px; background: #137FEC; transition: width 0.6s ease; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 80px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid rgba(19,127,236,0.1)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Left: Logo + Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🚀</span>
            <span style={{ fontWeight: 900, fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>SkillMatch</span>
          </div>
          {['Jobs', 'Skills', 'Learning', 'Messages'].map((link, i) => (
            <a key={link} href="#" style={{
              fontSize: '14px',
              fontWeight: i === 0 ? 600 : 500,
              color: i === 0 ? '#137FEC' : '#475569',
              borderBottom: i === 0 ? '2px solid #137FEC' : 'none',
              paddingBottom: i === 0 ? '4px' : '0',
            }}>{link}</a>
          ))}
        </div>

        {/* Right: Search + Notif + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: '#F1F5F9', border: 'none',
            borderRadius: '8px', height: '40px', width: '256px', padding: '0 12px', gap: '8px',
          }}>
            <span style={{ color: '#64748B', fontSize: '13px' }}>🔍</span>
            <input placeholder="Search roles or skills" style={{
              border: 'none', outline: 'none', fontSize: '14px',
              fontFamily: 'Inter, sans-serif', background: 'transparent',
              color: '#0F172A', flex: 1,
            }} />
          </div>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontSize: '20px', color: '#475569' }}>🔔</span>
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 8, height: 8, background: '#EF4444', borderRadius: '50%',
            }} />
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #137FEC, #0EA5E9)',
            border: '2px solid rgba(19,127,236,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
          }}>JD</div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 80px 38px' }}>

        {/* HERO SECTION */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0' }}>
            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(19,127,236,0.1)', borderRadius: '9999px',
                padding: '4px 12px', width: 'fit-content',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#137FEC', letterSpacing: '0.6px', textTransform: 'uppercase' }}>For You</span>
              </div>
              <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0F172A', lineHeight: '45px', letterSpacing: '-0.9px' }}>
                Jobs for your skills
              </h1>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: '28px' }}>
                Based on your proficiency in{' '}
                <a href="#" style={{ color: '#137FEC', fontWeight: 600 }}>React</a>,{' '}
                <a href="#" style={{ color: '#137FEC', fontWeight: 600 }}>Figma</a>, and{' '}
                <a href="#" style={{ color: '#137FEC', fontWeight: 600 }}>TypeScript</a>
              </p>
            </div>

            {/* Right: Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '0 24px', height: '44px',
                background: '#137FEC', border: 'none', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)',
              }}>
                <span>✏️</span> Update Skills
              </button>
              <button style={{
                width: 44, height: 44,
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                borderRadius: '8px', cursor: 'pointer', fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>⚙️</button>
            </div>
          </div>
        </div>

        {/* SKILL TABS */}
        <div style={{ borderBottom: '1px solid #E2E8F0', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '40px' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-link ${activeTab === tab ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab(tab)}
              >{tab}</button>
            ))}
          </div>
        </div>

        {/* SKILL GROUPS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

          {/* GROUP 1: React.js */}
          <div>
            {/* Section header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'rgba(97,218,251,0.1)', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', color: '#61DAFB', fontWeight: 700,
                }}>⟨/⟩</div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>React.js Opportunities</h2>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', letterSpacing: '1.2px', textTransform: 'uppercase' }}>128 NEW MATCHES TODAY</p>
                </div>
              </div>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 700, color: '#137FEC' }}>
                View all <span style={{ fontSize: '12px' }}>→</span>
              </a>
            </div>
            {/* Job cards */}
            <div style={{ display: 'flex', gap: '24px' }}>
              {reactJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </div>

          {/* GROUP 2: Product Design */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'rgba(19,127,236,0.1)', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', color: '#137FEC',
                }}>✦</div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>Product Design Roles</h2>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', letterSpacing: '1.2px', textTransform: 'uppercase' }}>42 PREMIUM MATCHES</p>
                </div>
              </div>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 700, color: '#137FEC' }}>
                View all <span style={{ fontSize: '12px' }}>→</span>
              </a>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              {designJobs.map(job => <JobCard key={job.id} job={job} />)}
              <UpskillCard />
            </div>
          </div>
        </div>

        {/* CAREER PATH / SKILL GROWTH MAP */}
        <div style={{ marginTop: '64px' }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
          }}>
            {/* Left panel */}
            <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>Your Skill Growth Map</h2>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>
                We've mapped your current skills against market demand. You're currently at a "Senior" level for React, but could improve your TypeScript proficiency to reach "Lead" status.
              </p>

              {/* Skill bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
                {skillBars.map(bar => (
                  <div key={bar.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{bar.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{bar.pct}%</span>
                    </div>
                    <div style={{ height: 8, background: '#F1F5F9', borderRadius: '9999px', position: 'relative' }}>
                      <div className="skill-bar-fill" style={{ width: `${bar.pct}%`, opacity: bar.opacity }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <div style={{ paddingTop: '16px' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: '#137FEC' }}>
                  Get personalized learning path <span>📈</span>
                </a>
              </div>
            </div>

            {/* Right panel: Stats grid */}
            <div style={{
              width: '559px', padding: '32px',
              background: '#F8FAFC',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
                {stats.map(stat => (
                  <div key={stat.label} style={{
                    background: '#FFFFFF',
                    border: '1px solid #F1F5F9',
                    boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex', flexDirection: 'column', gap: '4px',
                  }}>
                    <span style={{ fontSize: '30px', fontWeight: 900, color: '#137FEC', lineHeight: '36px' }}>{stat.value}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '48px 80px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '0', marginBottom: '32px' }}>
            {/* Brand */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🚀</span>
                <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>SkillMatch</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '23px', maxWidth: '250px' }}>
                Connecting talented professionals with opportunities based on their true potential and verified skills.
              </p>
            </div>

            {/* Platform */}
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Platform</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Find Jobs', 'Skill Assessments', 'Career Pathing', 'Salary Insights'].map(l => (
                  <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B' }}>{l}</a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Blog', 'User Guides', 'Interview Prep', 'Success Stories'].map(l => (
                  <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B' }}>{l}</a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Newsletter</h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>Get the latest job matches in your inbox.</p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  value={footerEmail}
                  onChange={e => setFooterEmail(e.target.value)}
                  placeholder="Email"
                  style={{
                    flex: 1, height: '40px', padding: '10px 12px',
                    background: '#F8FAFC', border: '1px solid #E2E8F0',
                    borderRadius: '8px', fontSize: '14px',
                    fontFamily: 'inherit', color: '#0F172A', outline: 'none',
                  }}
                />
                <button style={{
                  width: 35, height: 35,
                  background: '#137FEC', border: 'none',
                  borderRadius: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', color: '#fff',
                }}>→</button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid #F1F5F9', paddingTop: '32px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <p style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 SkillMatch Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(l => (
                <a key={l} href="#" style={{ fontSize: '12px', color: '#94A3B8' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillBasedJobRecommendations;