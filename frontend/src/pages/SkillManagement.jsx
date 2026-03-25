import React, { useState } from 'react';

const SkillManagement = () => {
  const [activeTab, setActiveTab] = useState('Technical Skills');
  const [search, setSearch] = useState('');

  const tabs = ['Technical Skills', 'Soft Skills', 'Domain Knowledge'];

  const skills = [
    { id: 1, icon: '{ }', iconColor: '#3B82F6', iconBg: '#EFF6FF', name: 'React.js', category: 'Frontend Development', years: '4 Years', level: 'EXPERT', levelColor: '#137FEC', proficiency: 92, barColor: '#137FEC', tags: ['Next.js', 'Tailwind CSS', 'TypeScript'] },
    { id: 2, icon: '🗄', iconColor: '#F97316', iconBg: '#FFF7ED', name: 'PostgreSQL', category: 'Database Design', years: '3 Years', level: 'ADVANCED', levelColor: '#F97316', proficiency: 78, barColor: '#F97316', tags: ['NoSQL', 'Optimization'] },
    { id: 3, icon: '☁', iconColor: '#10B981', iconBg: '#ECFDF5', name: 'AWS Services', category: 'Cloud Architecture', years: '2 Years', level: 'INTERMEDIATE', levelColor: '#10B981', proficiency: 55, barColor: '#10B981', tags: ['Lambda', 'S3', 'IAM'] },
    { id: 4, icon: '🐍', iconColor: '#8B5CF6', iconBg: '#F5F3FF', name: 'Python', category: 'Backend & Automation', years: '5 Years', level: 'EXPERT', levelColor: '#8B5CF6', proficiency: 88, barColor: '#8B5CF6', tags: ['Django', 'Pandas'] },
  ];

  const trendSkills = [
    { name: 'TypeScript Mastery', change: '+12% this month', value: 72 },
    { name: 'Kubernetes', change: '+5% this month', value: 45 },
  ];

  const distribution = [
    { label: 'Frontend (45%)', color: '#137FEC' },
    { label: 'DevOps (15%)', color: '#8B5CF6' },
    { label: 'Database (20%)', color: '#F97316' },
    { label: 'Other (20%)', color: '#CBD5E1' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .skill-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; transition: box-shadow 0.2s; }
        .skill-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .tag { background: #F1F5F9; border: 1px solid #E2E8F0; color: #475569; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 9999px; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; width: 100%; }
        .nav-item:hover { background: #F1F5F9; }
        .icon-btn { background: none; border: none; cursor: pointer; color: #94A3B8; font-size: 14px; padding: 2px; }
        .icon-btn:hover { color: #475569; }
        .search-input { border: none; outline: none; font-size: 14px; font-family: 'Inter', sans-serif; background: transparent; width: 100%; color: #0F172A; }
        .search-input::placeholder { color: #94A3B8; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', height: '56px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#137FEC', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px' }}>▶</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A' }}>SkillsPro</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{ width: '36px', height: '36px', background: 'none', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>🔔</button>
          <div style={{ width: '36px', height: '36px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer' }}>👤</div>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR */}
        <aside style={{ width: '192px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', marginBottom: '8px' }}>
            <div style={{ width: '40px', height: '40px', background: '#137FEC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>👤</div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>Alex Johnson</p>
              <p style={{ fontSize: '11px', color: '#64748B' }}>Senior Fullstack Eng.</p>
            </div>
          </div>

          {[
            { icon: '⊞', label: 'Dashboard', path: '/candidate-dashboard' },
            { icon: '🎯', label: 'Skills Manager', path: '/skills', active: true },
            { icon: '📈', label: 'Growth Path', path: '#' },
            { icon: '🎓', label: 'Training', path: '#' },
            { icon: '⚙️', label: 'Settings', path: '/profile-settings' },
          ].map(item => (
            <div key={item.label} className="nav-item"
              style={{ background: item.active ? 'rgba(19,127,236,0.1)' : 'transparent' }}
              onClick={() => window.location.href = item.path}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: item.active ? '700' : '500', color: item.active ? '#137FEC' : '#475569' }}>{item.label}</span>
            </div>
          ))}
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>Professional Skills</h1>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Audit, refine, and rank your expertise across disciplines.</p>
            </div>
            <button style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
              + Add New Skill
            </button>
          </div>

          {/* Search + Filter Row */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 16px', gap: '10px' }}>
              <span style={{ color: '#94A3B8', fontSize: '16px' }}>🔍</span>
              <input className="search-input" placeholder="Search by name, category, or level..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              ⚙️ Filter
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              ↕ Sort
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', border: 'none', background: 'none', fontSize: '14px', fontWeight: '600', color: activeTab === tab ? '#137FEC' : '#64748B', cursor: 'pointer', fontFamily: "'Inter', sans-serif", borderBottom: activeTab === tab ? '2px solid #137FEC' : '2px solid transparent', marginBottom: '-1px' }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {skills.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase())).map(skill => (
              <div key={skill.id} className="skill-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: skill.iconBg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{skill.icon}</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="icon-btn">✏️</button>
                    <button className="icon-btn">🗑️</button>
                  </div>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>{skill.name}</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>{skill.category} • {skill.years}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: skill.levelColor, letterSpacing: '0.5px' }}>{skill.level}</span>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{skill.proficiency}% Proficiency</span>
                </div>
                <div style={{ background: '#F1F5F9', borderRadius: '9999px', height: '6px', marginBottom: '12px' }}>
                  <div style={{ background: skill.barColor, borderRadius: '9999px', height: '6px', width: `${skill.proficiency}%`, transition: 'width 0.3s' }} />
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {skill.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            ))}

            {/* Add Skill Card */}
            <div style={{ border: '2px dashed #E2E8F0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '180px', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#137FEC'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}>
              <div style={{ width: '40px', height: '40px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#94A3B8' }}>+</div>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Add Technical Skill</p>
              <p style={{ fontSize: '12px', color: '#94A3B8' }}>Add details about your stack</p>
            </div>
          </div>

          {/* Skills in High Demand */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Skills in High Demand</h2>
            <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.15)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
                <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '16px 20px', textAlign: 'center', flexShrink: 0 }}>
                  <p style={{ fontSize: '20px', fontWeight: '800', color: '#137FEC' }}>AI</p>
                  <p style={{ fontSize: '10px', color: '#64748B' }}>Market Need</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>Generative AI Integration</h3>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>Companies are rapidly looking for engineers who can integrate LLMs into existing workflows. Consider taking the LLM Mastery course.</p>
                </div>
              </div>
              <button style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>
                Explore Training
              </button>
            </div>
          </div>

          {/* Bottom Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* Expertise Distribution */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '24px' }}>Expertise Distribution</h3>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                {/* Donut Chart */}
                <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                  <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)', width: '160px', height: '160px' }}>
                    <circle cx="80" cy="80" r="60" fill="none" stroke="#F1F5F9" strokeWidth="20" />
                    {/* Frontend 45% */}
                    <circle cx="80" cy="80" r="60" fill="none" stroke="#137FEC" strokeWidth="20" strokeDasharray={`${0.45 * 2 * Math.PI * 60} ${2 * Math.PI * 60}`} strokeDashoffset="0" />
                    {/* Database 20% */}
                    <circle cx="80" cy="80" r="60" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray={`${0.20 * 2 * Math.PI * 60} ${2 * Math.PI * 60}`} strokeDashoffset={`-${0.45 * 2 * Math.PI * 60}`} />
                    {/* DevOps 15% */}
                    <circle cx="80" cy="80" r="60" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeDasharray={`${0.15 * 2 * Math.PI * 60} ${2 * Math.PI * 60}`} strokeDashoffset={`-${0.65 * 2 * Math.PI * 60}`} />
                    {/* Other 20% */}
                    <circle cx="80" cy="80" r="60" fill="none" stroke="#CBD5E1" strokeWidth="20" strokeDasharray={`${0.20 * 2 * Math.PI * 60} ${2 * Math.PI * 60}`} strokeDashoffset={`-${0.80 * 2 * Math.PI * 60}`} />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A' }}>12</p>
                    <p style={{ fontSize: '10px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Skills</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
                  {distribution.map(d => (
                    <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', color: '#475569' }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Proficiency Trends */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Proficiency Trends</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {trendSkills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', color: '#475569' }}>{skill.name}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981' }}>{skill.change}</span>
                    </div>
                    <div style={{ background: '#F1F5F9', borderRadius: '9999px', height: '6px' }}>
                      <div style={{ background: '#137FEC', borderRadius: '9999px', height: '6px', width: `${skill.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendation */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '4px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>✨</span>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '20px' }}>
                  <strong>Recommendation:</strong> Your growth in TypeScript is impressive! We suggest focusing on <span style={{ color: '#137FEC', textDecoration: 'underline', cursor: 'pointer' }}>GraphQL</span> next to complement your stack.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkillManagement;