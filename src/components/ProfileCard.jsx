const CHECKLIST = [
  { done: true,  label: 'Basic info complete' },
  { done: true,  label: 'Resume uploaded (2 files)' },
  { done: true,  label: 'Skills added (8 skills)' },
  { done: false, label: 'Add work experience' },
  { done: false, label: 'Add certifications' },
];

export default function ProfileCard({ progress, onEdit }) {
  return (
    <div className="card">
      <div className="card-hd">
        <div className="card-title">👤 Profile</div>
        <span className="card-link" onClick={onEdit}>Edit →</span>
      </div>

      <div className="prof-ava">AS</div>
      <div className="prof-name">Arjun Sharma</div>
      <div className="prof-role">Full Stack Developer · Bengaluru, IN</div>

      <div className="prog-lbl">
        <span>Profile Completion</span>
        <span>{progress}%</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="chk-list">
        {CHECKLIST.map((c, i) => (
          <div className="chk-item" key={i}>
            <span className="chk-icon">{c.done ? '✅' : '○'}</span>
            <span style={{ color: c.done ? 'var(--text)' : 'var(--muted)' }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mini-stats">
        {[
          { label: 'Profile Views',   val: '28',  color: 'var(--accent)' },
          { label: 'Search Appears',  val: '142', color: 'var(--a3)' },
        ].map((m, i) => (
          <div className="mini-stat" key={i}>
            <div className="mini-stat-num" style={{ color: m.color }}>{m.val}</div>
            <div className="mini-stat-label">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
