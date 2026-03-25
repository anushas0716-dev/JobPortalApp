const STATS = [
  { ico: '📨', label: 'Total Applications', val: 24, glow: '#6c63ff', sub: <>+3 <em>this week</em></> },
  { ico: '✅', label: 'Shortlisted',        val: 7,  glow: '#43e97b', sub: <>+2 <em>from last week</em></> },
  { ico: '🗓️', label: 'Interviews',         val: 2,  glow: '#f7971e', sub: <>Next: <em>Tomorrow 11AM</em></> },
  { ico: '🔖', label: 'Saved Jobs',         val: 12, glow: '#ff6584', sub: <><em>4</em> expiring soon</> },
];

export default function StatCards() {
  return (
    <div className="stats">
      {STATS.map((s, i) => (
        <div className="stat-card" key={i}>
          <div className="stat-glow" style={{ background: s.glow }} />
          <div className="stat-ico">{s.ico}</div>
          <div className="stat-label">{s.label}</div>
          <div className="stat-num">{s.val}</div>
          <div className="stat-sub">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
