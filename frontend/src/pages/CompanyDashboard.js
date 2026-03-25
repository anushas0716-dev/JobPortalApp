import React from 'react';
import { Link } from 'react-router-dom';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f3f5f7;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #2563eb;
  --accent-2: #10b981;
  --accent-3: #f97316;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.ed-shell {
  min-height: 100vh;
  padding: 36px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.ed-hero {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  background: linear-gradient(135deg, #e0f2fe 0%, #ecfeff 45%, #fef3c7 100%);
  border-radius: 28px;
  padding: 28px 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: grid;
  gap: 12px;
}
.ed-hero h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.ed-hero p { color: var(--muted); margin: 0; }
.ed-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.ed-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.ed-btn.primary { background: var(--accent); color: #fff; }
.ed-btn.secondary { background: #fff; color: var(--ink); border: 1px solid var(--border); }
.ed-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.ed-card {
  background: var(--card);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.ed-card h4 { margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
.ed-card strong { font-size: 26px; }
.ed-section {
  max-width: 1100px;
  margin: 28px auto 0 auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 20px;
}
.ed-panel {
  background: var(--card);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.ed-panel h3 { margin: 0 0 12px 0; font-size: 18px; }
.ed-row { padding: 12px 0; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; gap: 12px; }
.ed-row:last-child { border-bottom: none; }
.ed-row-title { font-weight: 700; }
.ed-row-meta { color: var(--muted); font-size: 13px; }
.ed-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #eff6ff;
  color: #1d4ed8;
}
.ed-quick {
  display: grid;
  gap: 12px;
}
.ed-quick button {
  display: block;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--ink);
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.ed-quick button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15,23,42,0.08);
}
.ed-metrics {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}
.ed-metric {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: #f8fafc;
}
.ed-metric strong { display: block; }
.ed-metric span { font-size: 12px; color: var(--muted); }
@media (max-width: 900px) {
  .ed-shell { padding: 24px; }
  .ed-section { grid-template-columns: 1fr; }
}
`;

const stats = [
  { label: 'Active jobs', value: 12 },
  { label: 'Applicants', value: 248 },
  { label: 'Interviews', value: 8 },
  { label: 'Offers sent', value: 3 },
];

const pipeline = [
  { stage: 'New applications', count: 56 },
  { stage: 'Screening', count: 22 },
  { stage: 'Interviewing', count: 8 },
  { stage: 'Final review', count: 4 },
];

const applicants = [
  { name: 'Ritika Sharma', role: 'Frontend Engineer', time: 'Applied 2h ago' },
  { name: 'Arjun Patel', role: 'Product Designer', time: 'Applied yesterday' },
  { name: 'Meera Nair', role: 'Backend Engineer', time: 'Applied 2 days ago' },
];

export default function CompanyDashboard() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ed-shell">
        <section className="ed-hero">
          <div>
            <h2>Employer dashboard</h2>
            <p>Manage roles, track candidates, and keep hiring moving.</p>
          </div>
          <div className="ed-actions">
            <Link className="ed-btn primary" to="/employer/post-job">Post a job</Link>
            <Link className="ed-btn secondary" to="/employer/candidates">View candidates</Link>
            <Link className="ed-btn secondary" to="/employer/profile">Company profile</Link>
          </div>
        </section>

        <div className="ed-grid">
          {stats.map((item) => (
            <div key={item.label} className="ed-card">
              <h4>{item.label}</h4>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="ed-section">
          <div className="ed-panel">
            <h3>Hiring pipeline</h3>
            {pipeline.map((row) => (
              <div key={row.stage} className="ed-row">
                <div>
                  <div className="ed-row-title">{row.stage}</div>
                  <div className="ed-row-meta">Active candidates in this stage</div>
                </div>
                <div className="ed-pill">{row.count}</div>
              </div>
            ))}

            <h3 style={{ marginTop: '18px' }}>Recent applicants</h3>
            {applicants.map((row) => (
              <div key={row.name} className="ed-row">
                <div>
                  <div className="ed-row-title">{row.name}</div>
                  <div className="ed-row-meta">{row.role}</div>
                </div>
                <div className="ed-row-meta">{row.time}</div>
              </div>
            ))}
          </div>

          <div className="ed-panel">
            <h3>Quick actions</h3>
            <div className="ed-quick">
              <button type="button">Review new applications</button>
              <button type="button">Schedule interviews</button>
              <button type="button">Send offer letters</button>
            </div>

            <div className="ed-metrics">
              <div className="ed-metric">
                <strong>Average time to hire</strong>
                <span>18 days this month</span>
              </div>
              <div className="ed-metric">
                <strong>Response rate</strong>
                <span>82% of candidates replied</span>
              </div>
              <div className="ed-metric">
                <strong>Open roles</strong>
                <span>3 roles need attention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
