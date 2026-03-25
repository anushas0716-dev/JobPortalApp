import React, { useState } from 'react';

const AIResumeScreening = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const [search, setSearch] = useState('');

  const stats = [
    { label: 'Total Applicants', value: '1,248', sub: '+12%', subColor: '#10B981', showArrow: true, iconBg: '#F1F5F9', iconColor: '#475569' },
    { label: 'AI Top Matches', value: '42', sub: 'Top 5% tier', subColor: '#94A3B8', showArrow: false, iconBg: 'rgba(19,127,236,0.1)', iconColor: '#137FEC' },
    { label: 'Avg. Match Score', value: '76.4%', sub: '+4.2%', subColor: '#10B981', showArrow: true, iconBg: '#ECFDF5', iconColor: '#059669' },
    { label: 'Screening Time Saved', value: '148h', sub: 'v/s manual', subColor: '#F59E0B', showArrow: false, iconBg: '#FFFBEB', iconColor: '#D97706' },
  ];

  const candidates = [
    { initials: 'SC', bg: '#DBEAFE', color: '#1D4ED8', rank: '1', rankBg: '#137FEC', name: 'Sarah Chen', role: 'Lead UX Designer', score: '98%', scoreColor: '#137FEC', badge: 'PERFECT MATCH', badgeColor: '#059669', highlight: true },
    { initials: 'MR', bg: '#E2E8F0', color: '#475569', rank: '2', rankBg: '#94A3B8', name: 'Marcus Rodriguez', role: 'Sr. Product Designer', score: '94%', scoreColor: '#1E293B', badge: 'STRONG', badgeColor: '#059669', highlight: false },
    { initials: 'EW', bg: '#FEF3C7', color: '#D97706', rank: '3', rankBg: '#94A3B8', name: 'Emily Watson', role: 'UX Architect', score: '89%', scoreColor: '#1E293B', badge: 'POTENTIAL', badgeColor: '#D97706', highlight: false },
  ];

  const chartBars = [
    { label: '0-20', height: 19, color: '#F1F5F9', labelColor: '#94A3B8' },
    { label: '21-40', height: 45, color: '#F1F5F9', labelColor: '#94A3B8' },
    { label: '41-60', height: 83, color: '#F1F5F9', labelColor: '#94A3B8' },
    { label: '61-80', height: 115, color: '#137FEC', labelColor: '#137FEC', tooltip: '42' },
    { label: '81-100', height: 58, color: '#F1F5F9', labelColor: '#94A3B8' },
  ];

  const skills = [
    { label: 'UI Design Excellence', pct: 100 },
    { label: 'User Research', pct: 92 },
    { label: 'Prototyping', pct: 85 },
    { label: 'Leadership', pct: 95 },
  ];

  const strengths = [
    'Design Systems Leadership (8+ years)',
    'Strategic UX Research methodologies',
    'High proficiency in Figma & Prototyping',
  ];

  const gaps = [
    'Limited direct experience in B2B FinTech',
    'Expected salary is at the higher end of range',
  ];

  const questions = [
    '"How would you handle a conflict between a rigorous design system and a tight product deadline?"',
    '"Describe your process for translating complex data analytics into intuitive dashboard visuals."',
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .candidate-row { display: flex; flex-direction: row; align-items: center; padding: 16px; gap: 16px; cursor: pointer; transition: background 0.15s; }
        .candidate-row:hover { background: rgba(19,127,236,0.03); }
        .skill-bar-track { width: 100%; height: 8px; background: #F1F5F9; border-radius: 9999px; overflow: hidden; }
        .skill-bar-fill { height: 8px; background: #137FEC; border-radius: 9999px; box-shadow: 0px 1px 2px rgba(19,127,236,0.4); }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; }
        .nav-link:hover { color: #0F172A; }
      `}</style>

      {/* HEADER */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '61px', background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '23px', background: '#137FEC', borderRadius: '5px' }} />
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.45px' }}>RecruitAI</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', borderBottom: '2px solid #137FEC', paddingBottom: '4px' }}>Dashboard</a>
            <a href="#" className="nav-link">Active oobs</a>
            <a href="#" className="nav-link">Talent Pool</a>
            <a href="#" className="nav-link">Analytics</a>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '36px', width: '256px', padding: '0 12px 0 40px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', color: '#94A3B8', fontSize: '14px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates..." style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#0F172A', flex: 1, fontFamily: 'Inter,sans-serif' }} />
          </div>
          <button style={{ width: '32px', height: '36px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
          <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer' }}>👤</div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1280px', margin: '0 auto' }}>

        {/* Hero Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748B' }}>
              <span>oobs</span><span>/</span>
              <span>Product Designer</span><span>/</span>
              <span style={{ color: '#137FEC', fontWeight: '500' }}>Candidate Screening</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px' }}>Senior Product Designer</h1>
              <span style={{ fontSize: '20px', color: '#94A3B8', letterSpacing: '-0.75px', paddingBottom: '2px' }}>#oD-402</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#0F172A', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              <span style={{ fontSize: '12px' }}>⬇</span> Export Report
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)' }}>
              <span>✦</span> Re-run AI Match
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>{s.label}</span>
                <div style={{ padding: '6px', background: s.iconBg, borderRadius: '8px' }}>
                  <div style={{ width: '15px', height: '11px', background: s.iconColor, borderRadius: '2px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>{s.value}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: s.subColor, paddingBottom: '4px' }}>
                  {s.showArrow && '↑'}{s.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

          {/* LEFT: AI Ranking + Score Distribution */}
          <div style={{ width: '395px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* AI Ranking */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(248,250,252,0.5)', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748B', letterSpacing: '0.7px', textTransform: 'uppercase' }}>AI Ranking</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '700', color: '#137FEC', fontFamily: 'Inter,sans-serif' }}>View All</button>
              </div>
              {candidates.map((c, i) => (
                <div
                  key={i}
                  className="candidate-row"
                  onClick={() => setSelectedCandidate(i)}
                  style={{
                    borderTop: i > 0 ? '1px solid #F1F5F9' : 'none',
                    background: c.highlight ? 'rgba(19,127,236,0.05)' : 'transparent',
                    borderLeft: c.highlight ? '4px solid #137FEC' : '4px solid transparent',
                  }}
                >
                  {/* Avatar with rank badge */}
                  <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0 }}>
                    <div style={{ width: '48px', height: '48px', background: c.bg, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: c.color }}>{c.initials}</div>
                    <div style={{ position: 'absolute', right: '-4px', bottom: '-4px', background: c.rankBg, border: '2px solid #FFFFFF', borderRadius: '9999px', width: '20px', height: '19px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#FFFFFF' }}>{c.rank}</div>
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>{c.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{c.role}</div>
                  </div>
                  {/* Score */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: c.scoreColor }}>{c.score}</div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: c.badgeColor, textTransform: 'uppercase' }}>{c.badge}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Score Distribution */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748B', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Score Distribution</span>
              {/* Chart */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 8px', height: '120px', gap: '8px' }}>
                  {chartBars.map((bar, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', position: 'relative' }}>
                      {bar.tooltip && (
                        <div style={{ position: 'absolute', top: '-28px', background: '#101922', color: '#fff', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>{bar.tooltip}</div>
                      )}
                      <div style={{ width: '100%', height: `${bar.height}px`, background: bar.color, borderRadius: '2px 2px 0 0' }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
                  {chartBars.map((bar, i) => (
                    <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '10px', fontWeight: '700', color: bar.labelColor, letterSpacing: '-0.5px', textTransform: 'uppercase' }}>{bar.label}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Candidate Detail */}
          <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Detail Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', borderBottom: '1px solid #E2E8F0' }}>
              {/* Avatar */}
              <div style={{ width: '80px', height: '80px', background: '#E2E8F0', border: '4px solid #F8FAFC', borderRadius: '16px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: '#1D4ED8', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>SC</div>
              {/* Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>Sarah Chen</h2>
                  <span style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', borderRadius: '9999px', padding: '2px 8px', fontSize: '12px', fontWeight: '700', color: '#047857' }}>Top Candidate</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 San Francisco, CA</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>✉ s.chen@example.com</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>🔗 portfolio.sarah.design</span>
                </div>
              </div>
              {/* Score */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '36px', fontWeight: '900', color: '#137FEC', lineHeight: 1 }}>98</span>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#137FEC', paddingBottom: '2px' }}>/100</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Match Score</div>
              </div>
            </div>

            {/* Analysis Grid */}
            <div style={{ display: 'flex', gap: '0', flex: 1, padding: '24px', gap: '48px' }}>

              {/* Left: AI Summary */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* AI Intelligence Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>🤖</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>AI Intelligence Summary</span>
                  </div>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '8px', padding: '15px 16px' }}>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>
                      Sarah demonstrates exceptional seniority in product design with a strong focus on data-driven UX processes. Her experience at Google and Meta aligns perfectly with our enterprise-scale requirements. She has a proven track record of leading design systems and cross-functional teams.
                    </p>
                  </div>
                </div>

                {/* Key Strengths */}
                <div style={{ background: '#ECFDF5', border: '1px solid #D1FAE5', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#047857' }}>✓</span>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#047857', textTransform: 'uppercase' }}>Key Strengths</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {strengths.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
                        <div style={{ width: '4px', height: '4px', background: '#10B981', borderRadius: '9999px', flexShrink: 0 }} />
                        <span style={{ fontSize: '14px', color: '#065F46' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Potential Gaps */}
                <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#B45309' }}>⚠</span>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#B45309', textTransform: 'uppercase' }}>Potential Gaps</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {gaps.map((g, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '4px', height: '4px', background: '#F59E0B', borderRadius: '9999px', flexShrink: 0 }} />
                        <span style={{ fontSize: '14px', color: '#92400E' }}>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Skills + Questions */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Skills Heading */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>📊</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Requirement Fit</span>
                </div>

                {/* Skill Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {skills.map((sk, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.6px', textTransform: 'uppercase' }}>{sk.label}</span>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#137FEC', letterSpacing: '-0.6px' }}>{sk.pct}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${sk.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interview Questions */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '900', color: '#64748B', textTransform: 'uppercase' }}>AI Recommended Interview Questions</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {questions.map((q, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', flexShrink: 0 }}>{i + 1}.</span>
                        <span style={{ fontSize: '14px', color: '#334155', lineHeight: '20px' }}>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderRadius: '0 0 12px 12px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#64748B', fontFamily: 'Inter,sans-serif' }}>View Original Resume</button>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '8px 20px', background: 'none', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#475569', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Archive</button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)' }}>
                  <span>📅</span> Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIResumeScreening;