import { SAVED, RECENT } from '../data/dashboardData';

export default function SavedAndRecent() {
  return (
    <div className="card">
      {/* Saved Jobs */}
      <div className="card-hd">
        <div className="card-title">🔖 Saved Jobs</div>
        <span className="card-link">Manage →</span>
      </div>

      {SAVED.map((job) => (
        <div className="job-row" key={job.id}>
          <div
            className="co-logo"
            style={{ background: job.bg, width: 34, height: 34, flexShrink: 0 }}
          >
            {job.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              className="job-name"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {job.title}
            </div>
            <div className="job-sub">
              {job.company} · {job.salary}
            </div>
          </div>
          <span className="deadline-pill">{job.deadline}</span>
        </div>
      ))}

      {/* Recently Viewed */}
      <div className="section-divider">
        <div className="card-hd" style={{ marginBottom: 10 }}>
          <div className="card-title" style={{ fontSize: 13 }}>🕐 Recently Viewed</div>
        </div>

        {RECENT.slice(0, 3).map((job) => (
          <div className="job-row" key={job.id}>
            <div
              className="co-logo"
              style={{ background: job.bg, width: 30, height: 30, flexShrink: 0 }}
            >
              {job.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="recent-title">{job.title}</div>
              <div className="job-sub">{job.company}</div>
            </div>
            <div className="recent-time">{job.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
