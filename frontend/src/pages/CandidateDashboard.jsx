import { useMemo } from "react";
import { Link } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f3f5f7;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #ff6b35;
  --accent-2: #2563eb;
  --accent-3: #10b981;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.cd-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.cd-hero {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  background: linear-gradient(135deg, #fff7ed 0%, #ecfeff 45%, #eef2ff 100%);
  border-radius: 28px;
  padding: 28px 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: grid;
  gap: 16px;
}
.cd-hero h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.cd-hero p { color: var(--muted); margin: 0; }
.cd-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.cd-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}
.cd-btn.primary { background: var(--accent); color: #fff; }
.cd-btn.secondary { background: #fff; color: var(--ink); border: 1px solid var(--border); }
.cd-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.cd-card {
  background: var(--card);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cd-card h4 { margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
.cd-card strong { font-size: 26px; }
.cd-progress {
  margin-top: 16px;
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}
.cd-progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent-2), var(--accent-3));
}
.cd-section {
  max-width: 1100px;
  margin: 28px auto 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
}
.cd-list {
  background: var(--card);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cd-list h3 { margin: 0 0 12px 0; font-size: 18px; }
.cd-item { padding: 12px 0; border-bottom: 1px solid var(--border); }
.cd-item:last-child { border-bottom: none; }
.cd-item-title { font-weight: 700; }
.cd-item-meta { color: var(--muted); font-size: 13px; }
.cd-quick {
  display: grid;
  gap: 12px;
}
.cd-quick a {
  display: block;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: #fff;
  text-decoration: none;
  color: var(--ink);
  font-weight: 700;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.cd-quick a:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15,23,42,0.08);
}
.cd-insights {
  max-width: 1100px;
  margin: 24px auto 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}
.cd-insight {
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cd-insight strong { display: block; margin-bottom: 6px; }
.cd-insight span { font-size: 13px; color: var(--muted); }
@media (max-width: 900px) {
  .cd-shell { padding: 24px; }
  .cd-section { grid-template-columns: 1fr; }
}
`;

export default function CandidateDashboard() {
  const metrics = useMemo(
    () => [
      { label: "Applications", value: 12 },
      { label: "Saved jobs", value: 8 },
      { label: "Interview invites", value: 2 },
      { label: "Profile strength", value: "76%" },
    ],
    []
  );

  const activity = [
    { title: "Frontend Engineer", company: "Luna Labs", time: "Applied 2 days ago" },
    { title: "Product Designer", company: "Fieldnote", time: "Saved yesterday" },
    { title: "Data Analyst", company: "BrightPath", time: "Profile viewed today" },
  ];

  const insights = [
    { title: "Recruiter views", note: "5 views in the last 7 days" },
    { title: "Search ranking", note: "Top 18% for React roles" },
    { title: "Resume downloads", note: "2 recruiters downloaded your resume" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="cd-shell">
        <section className="cd-hero">
          <div>
            <h2>Candidate dashboard</h2>
            <p>Track your applications and keep your profile fresh.</p>
          </div>
          <div className="cd-actions">
            <Link className="cd-btn primary" to="/jobs">Browse jobs</Link>
            <Link className="cd-btn secondary" to="/candidate-profile">Edit profile</Link>
            <Link className="cd-btn secondary" to="/profile-settings">Visibility</Link>
          </div>
        </section>

        <div className="cd-grid">
          {metrics.map((item) => (
            <div key={item.label} className="cd-card">
              <h4>{item.label}</h4>
              <strong>{item.value}</strong>
              {item.label === "Profile strength" && (
                <div className="cd-progress">
                  <span style={{ width: item.value }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="cd-section">
          <div className="cd-list">
            <h3>Recent activity</h3>
            {activity.map((item) => (
              <div key={item.title} className="cd-item">
                <div className="cd-item-title">{item.title}</div>
                <div className="cd-item-meta">{item.company} · {item.time}</div>
              </div>
            ))}
          </div>

          <div className="cd-quick">
            <Link to="/resumes">Upload resume</Link>
            <Link to="/profile-settings">Profile visibility</Link>
            <Link to="/saved-jobs">View saved jobs</Link>
            <Link to="/candidate-profile">Profile builder</Link>
          </div>
        </div>

        <div className="cd-insights">
          {insights.map((item) => (
            <div key={item.title} className="cd-insight">
              <strong>{item.title}</strong>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
