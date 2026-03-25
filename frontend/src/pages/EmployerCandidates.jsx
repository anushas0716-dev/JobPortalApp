import { Link } from "react-router-dom";

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
.ec-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.ec-hero {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  background: linear-gradient(135deg, #e0f2fe 0%, #ecfeff 45%, #fef3c7 100%);
  border-radius: 28px;
  padding: 28px 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.ec-hero h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.ec-hero p { color: var(--muted); margin: 6px 0 0; }
.ec-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  background: #fff;
  color: var(--ink);
  border: 1px solid var(--border);
}
.ec-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}
.ec-card {
  background: var(--card);
  border-radius: 20px;
  padding: 18px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: grid;
  gap: 10px;
}
.ec-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.ec-avatar {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #eff6ff;
  color: #1d4ed8;
  display: grid;
  place-items: center;
  font-weight: 800;
}
.ec-name { font-weight: 700; }
.ec-role { color: var(--muted); font-size: 13px; }
.ec-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.ec-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #0f172a;
}
.ec-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.ec-actions button {
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  font-weight: 700;
  cursor: pointer;
  font-size: 12px;
}
.ec-actions .primary { background: var(--accent); color: #fff; }
.ec-actions .secondary { background: #fff; color: var(--ink); border: 1px solid var(--border); }
.ec-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: #ecfdf3;
  color: #047857;
}
@media (max-width: 900px) {
  .ec-shell { padding: 24px; }
}
`;

const candidates = [
  { name: 'Ritika Sharma', role: 'Frontend Engineer', status: 'Shortlisted', skills: ['React', 'TypeScript', 'UI'] },
  { name: 'Arjun Patel', role: 'Product Designer', status: 'Screening', skills: ['Figma', 'UX', 'Research'] },
  { name: 'Meera Nair', role: 'Backend Engineer', status: 'Interviewing', skills: ['Python', 'Django', 'Postgres'] },
  { name: 'Karan Mehta', role: 'Data Analyst', status: 'New', skills: ['SQL', 'Python', 'Tableau'] },
];

export default function EmployerCandidates() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ec-shell">
        <section className="ec-hero">
          <div>
            <h2>Candidates</h2>
            <p>Review, shortlist, and schedule interviews.</p>
          </div>
          <Link className="ec-btn" to="/company-dashboard">Back to dashboard</Link>
        </section>

        <div className="ec-grid">
          {candidates.map((c) => (
            <div key={c.name} className="ec-card">
              <div className="ec-top">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div className="ec-avatar">{c.name.charAt(0)}</div>
                  <div>
                    <div className="ec-name">{c.name}</div>
                    <div className="ec-role">{c.role}</div>
                  </div>
                </div>
                <div className="ec-pill">{c.status}</div>
              </div>
              <div className="ec-tags">
                {c.skills.map((skill) => (
                  <span key={skill} className="ec-tag">{skill}</span>
                ))}
              </div>
              <div className="ec-actions">
                <button className="primary" type="button">View profile</button>
                <button className="secondary" type="button">Schedule</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
