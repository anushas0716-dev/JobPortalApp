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
.ep-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.ep-hero {
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
.ep-hero h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.ep-hero p { color: var(--muted); margin: 6px 0 0; }
.ep-btn {
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
.ep-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
}
.ep-card {
  background: var(--card);
  border-radius: 20px;
  padding: 22px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.ep-card h3 { margin: 0 0 12px 0; font-size: 18px; }
.ep-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); }
.ep-row:last-child { border-bottom: none; }
.ep-label { color: var(--muted); font-size: 13px; }
.ep-value { font-weight: 700; }
.ep-about { color: var(--muted); line-height: 1.6; font-size: 14px; }
.ep-actions { display: grid; gap: 10px; }
.ep-actions button {
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  background: var(--accent);
  color: #fff;
}
.ep-actions button.secondary { background: #fff; color: var(--ink); border: 1px solid var(--border); }
@media (max-width: 900px) {
  .ep-shell { padding: 24px; }
  .ep-grid { grid-template-columns: 1fr; }
}
`;

export default function EmployerProfile() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ep-shell">
        <section className="ep-hero">
          <div>
            <h2>Company profile</h2>
            <p>Showcase your brand and hiring culture.</p>
          </div>
          <Link className="ep-btn" to="/company-dashboard">Back to dashboard</Link>
        </section>

        <div className="ep-grid">
          <div className="ep-card">
            <h3>Company details</h3>
            <div className="ep-row">
              <span className="ep-label">Company name</span>
              <span className="ep-value">Nimbus Labs</span>
            </div>
            <div className="ep-row">
              <span className="ep-label">Industry</span>
              <span className="ep-value">Technology</span>
            </div>
            <div className="ep-row">
              <span className="ep-label">Location</span>
              <span className="ep-value">Bengaluru, India</span>
            </div>
            <div className="ep-row">
              <span className="ep-label">Team size</span>
              <span className="ep-value">150 employees</span>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h3>About</h3>
              <p className="ep-about">
                Nimbus Labs builds productivity tools for fast-moving teams. We care about craftsmanship, clarity,
                and thoughtful hiring. Share your story to attract candidates who align with your culture.
              </p>
            </div>
          </div>

          <div className="ep-card">
            <h3>Profile actions</h3>
            <div className="ep-actions">
              <button type="button">Edit company profile</button>
              <button className="secondary" type="button">Upload brand assets</button>
              <button className="secondary" type="button">Preview public page</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
