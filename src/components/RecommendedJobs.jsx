import { RECOMMENDED } from '../data/dashboardData';

function CompanyLogo({ icon, bg, size = 38 }) {
  return (
    <div
      className="co-logo"
      style={{ background: bg, width: size, height: size, flexShrink: 0 }}
    >
      {icon}
    </div>
  );
}

export default function RecommendedJobs() {
  return (
    <div className="card">
      <div className="card-hd">
        <div className="card-title">✨ Recommended for You</div>
        <span className="card-link">View all →</span>
      </div>

      {RECOMMENDED.map((job) => (
        <div className="job-row" key={job.id}>
          <CompanyLogo icon={job.icon} bg={job.bg} />
          <div>
            <div className="job-name">{job.title}</div>
            <div className="job-sub">{job.company} · {job.location}</div>
          </div>
          <div className="job-r">
            <div className="job-sal">{job.salary}</div>
            <div className="job-typ">{job.type}</div>
          </div>
          <span className="match-pill">{job.match}% match</span>
        </div>
      ))}
    </div>
  );
}
