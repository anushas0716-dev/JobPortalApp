import React, { useState } from 'react';

const JobDetail = () => {
  const [activeFilter, setActiveFilter] = useState('All Jobs');
  const [selectedJob, setSelectedJob] = useState(0);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');

  const filters = ['All Jobs', 'Remote', 'Design'];

  const jobList = [
    { id: 0, icon: '🏢', title: 'Senior UI Designer', company: 'Tech Corp', location: 'Remote', salary: '$120k – $150k', type: 'Full-time', posted: '2d ago', active: true },
    { id: 1, icon: '🎨', title: 'Product Designer', company: 'Creative Solutions', location: 'New York', salary: '$110k – $140k', type: 'Contract', posted: '5h ago' },
    { id: 2, icon: '⚡', title: 'Lead Visual Artist', company: 'Neon Studios', location: 'Los Angeles', salary: '$140k – $180k', type: 'Full-time', posted: '1d ago' },
    { id: 3, icon: '🔷', title: 'UX Researcher', company: 'Growth Metrics', location: 'Remote', salary: '$95k – $130k', type: 'Remote', posted: '3d ago' },
  ];

  const job = jobList[selectedJob];

  const requirements = [
    '5+ years of professional experience in UI/Visual Design.',
    'Exceptional portfolio demonstrating expertise in typography, color theory, and layout.',
    'Expert proficiency in Figma and design systems management.',
    'Strong understanding of accessibility standards (WCAG 2.1).',
    'Experience collaborating with developers on handover and implementation.',
  ];

  const benefits = [
    { icon: '🏥', label: 'Premium Healthcare' },
    { icon: '🏖️', label: 'Unlimited PTO' },
    { icon: '🏠', label: 'Remote-first Culture' },
    { icon: '💪', label: 'Fitness Stipend' },
  ];

  const salaryMap = ['$120,000 - $150,000 / year', '$110,000 - $140,000 / year', '$140,000 - $180,000 / year', '$95,000 - $130,000 / year'];
  const typeMap = ['Full-time', 'Contract', 'Full-time', 'Remote'];
  const locationMap = ['San Francisco (Remote OK)', 'New York, NY', 'Los Angeles, CA', 'Remote'];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-list-item { padding: 16px; cursor: pointer; border-bottom: 1px solid #E2E8F0; transition: background 0.15s; position: relative; }
        .job-list-item:hover { background: #F8FAFC; }
        .active-job { background: rgba(19,127,236,0.05) !important; border-bottom: 1px solid rgba(19,127,236,0.2) !important; }
        .active-job::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #137FEC; border-radius: 0; }
        .filter-pill { padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; font-family: 'Inter', sans-serif; border: none; }
        .benefit-card { background: rgba(248,250,252,0.5); border: 1px solid #F1F5F9; border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 16px; flex: 1; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏢</div>
            <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>JobBoard</span>
          </div>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px', overflow: 'hidden' }}>
            <div style={{ padding: '0 16px', color: '#64748B', fontSize: '13px', flexShrink: 0 }}>🔍</div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs, companies..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#64748B', flex: 1 }} />
          </div>
        </div>
        {/* Nav + Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Find Jobs', 'Company Reviews', 'Salaries'].map(l => (
              <a key={l} href="/jobs" style={{ fontSize: '14px', fontWeight: '500', color: '#334155', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>💬</button>
            <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
              <span style={{ fontSize: '18px' }}>👤</span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN — Two-panel layout */}
      <div style={{ flex: 1, display: 'flex', height: 'calc(100vh - 65px)', overflow: 'hidden' }}>

        {/* LEFT PANEL — Job List */}
        <aside style={{ width: '450px', flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Jobs for you</h3>
              <span style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC', fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '4px' }}>124 matches</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', paddingBottom: '8px' }}>
              {filters.map(f => (
                <button key={f} className="filter-pill" onClick={() => setActiveFilter(f)}
                  style={{ background: activeFilter === f ? '#137FEC' : '#F1F5F9', color: activeFilter === f ? '#fff' : '#475569', fontWeight: activeFilter === f ? '600' : '500' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Job Items */}
          {jobList.map((j, i) => (
            <div key={j.id} className={`job-list-item ${selectedJob === i ? 'active-job' : ''}`} onClick={() => setSelectedJob(i)}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{j.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{j.title}</h4>
                    <span style={{ fontSize: '10px', fontWeight: '500', color: '#64748B' }}>{j.posted}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#475569', marginBottom: '6px' }}>{j.company} • {j.location}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{j.salary}</span>
                    <div style={{ width: '4px', height: '4px', background: '#CBD5E1', borderRadius: '50%' }} />
                    <span style={{ fontSize: '10px', color: '#64748B' }}>{j.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* RIGHT PANEL — Job Detail */}
        <section style={{ flex: 1, background: '#FFFFFF', overflowY: 'auto' }}>
          <div style={{ padding: '40px', maxWidth: '896px' }}>

            {/* Job Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '32px', borderBottom: '1px solid #E2E8F0', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '80px', height: '80px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>{job.icon}</div>
                <div>
                  <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>{job.title}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '500', color: '#475569' }}>Tech Corp</span>
                    <div style={{ width: '4px', height: '4px', background: '#CBD5E1', borderRadius: '50%' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '16px', color: '#475569' }}>📍 {locationMap[selectedJob]}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                <button style={{ padding: '11px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)', minWidth: '120px' }}>Apply Now</button>
                <button onClick={() => setSaved(!saved)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                  {saved ? '🔖' : '🔖'} Save
                </button>
              </div>
            </div>

            {/* Two columns: content + sidebar */}
            <div style={{ display: 'flex', gap: '32px' }}>
              {/* Left Content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Job Description */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Job Description</h3>
                  <p style={{ fontSize: '16px', color: '#475569', lineHeight: '26px', marginBottom: '16px' }}>
                    Tech Corp is seeking a visionary Senior UI Designer to lead the visual language of our core products. You will be responsible for creating high-fidelity interface designs that are not only aesthetically stunning but also intuitive and accessible.
                  </p>
                  <p style={{ fontSize: '16px', color: '#475569', lineHeight: '26px' }}>
                    Working closely with our Product and Engineering teams, you will translate complex technical requirements into elegant user experiences. This is a pivotal role where your design decisions will impact millions of users worldwide.
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Requirements</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {requirements.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ marginTop: '2px', flexShrink: 0 }}>
                          <div style={{ width: '20px', height: '20px', background: '#137FEC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#fff', fontSize: '11px', fontWeight: '700' }}>✓</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Benefits</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {benefits.map((b, i) => (
                      <div key={i} className="benefit-card">
                        <div style={{ width: '36px', height: '36px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{b.icon}</div>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div style={{ width: '229px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Job Details Card */}
                <div style={{ background: 'rgba(248,250,252,0.5)', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Job Details</h4>
                  {[
                    { label: 'Salary Range', value: salaryMap[selectedJob] },
                    { label: 'Job Type', value: typeMap[selectedJob] },
                    { label: 'Experience Level', value: 'Senior Level' },
                    { label: 'Location', value: locationMap[selectedJob] },
                  ].map(d => (
                    <div key={d.label}>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>{d.label}</p>
                      <p style={{ fontSize: '16px', fontWeight: '500', color: '#0F172A', lineHeight: '24px' }}>{d.value}</p>
                    </div>
                  ))}
                </div>

                {/* About Company Card */}
                <div style={{ background: 'rgba(248,250,252,0.5)', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>About Tech Corp</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🏢</div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Tech Corp</p>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>500-1000 employees</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px', marginBottom: '12px' }}>Building the next generation of financial tools for creators and small businesses. Founded in 2018.</p>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '600', color: '#137FEC', textDecoration: 'none' }}>
                    View Company Profile →
                  </a>
                </div>

                {/* CTA Card */}
                <div style={{ background: '#137FEC', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>Ready to apply?</h4>
                  <p style={{ fontSize: '14px', color: '#FFFFFF', lineHeight: '20px', marginBottom: '8px' }}>Your profile matches 90% of the requirements for this position.</p>
                  <button style={{ width: '100%', padding: '10px 0', background: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                    Complete Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetail;