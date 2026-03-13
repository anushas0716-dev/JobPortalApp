import { useState } from "react";
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
.pj-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.pj-hero {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  background: linear-gradient(135deg, #e0f2fe 0%, #ecfeff 45%, #fef3c7 100%);
  border-radius: 28px;
  padding: 28px 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.pj-hero h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.pj-hero p { color: var(--muted); margin: 6px 0 0; }
.pj-card {
  max-width: 1100px;
  margin: 0 auto;
  background: var(--card);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.pj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.pj-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.pj-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
.pj-field input,
.pj-field select,
.pj-field textarea {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
}
.pj-field textarea { min-height: 120px; resize: vertical; }
.pj-field input:focus,
.pj-field select:focus,
.pj-field textarea:focus {
  outline: 2px solid rgba(37, 99, 235, 0.2);
  border-color: var(--accent);
}
.pj-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.pj-btn {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.pj-btn.primary { background: var(--accent); color: #fff; }
.pj-btn.secondary { background: #fff; color: var(--ink); border: 1px solid var(--border); }
.pj-note { margin-top: 12px; color: var(--muted); font-size: 13px; }
.pj-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
@media (max-width: 900px) {
  .pj-shell { padding: 24px; }
}
`;

export default function EmployerPostJob() {
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "full_time",
    salary: "",
    description: "",
    requirements: "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <style>{CSS}</style>
      <div className="pj-shell">
        <section className="pj-hero">
          <h2>Post a new job</h2>
          <p>Share the role details and start collecting candidates.</p>
        </section>

        <section className="pj-card">
          <div className="pj-top">
            <strong style={{ fontSize: '18px' }}>Job details</strong>
            <Link className="pj-btn secondary" to="/company-dashboard">Back to dashboard</Link>
          </div>

          <div className="pj-grid">
            <div className="pj-field">
              <label>Job title</label>
              <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Senior Backend Engineer" />
            </div>
            <div className="pj-field">
              <label>Department</label>
              <input value={form.department} onChange={(e) => update('department', e.target.value)} placeholder="Engineering" />
            </div>
            <div className="pj-field">
              <label>Location</label>
              <input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Bengaluru, Hybrid" />
            </div>
            <div className="pj-field">
              <label>Employment type</label>
              <select value={form.type} onChange={(e) => update('type', e.target.value)}>
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="pj-field">
              <label>Salary range</label>
              <input value={form.salary} onChange={(e) => update('salary', e.target.value)} placeholder="₹18L - ₹24L" />
            </div>
            <div className="pj-field" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe responsibilities and impact" />
            </div>
            <div className="pj-field" style={{ gridColumn: '1 / -1' }}>
              <label>Requirements</label>
              <textarea value={form.requirements} onChange={(e) => update('requirements', e.target.value)} placeholder="Required skills, experience, tools" />
            </div>
          </div>

          <div className="pj-actions">
            <button className="pj-btn secondary" type="button">Save draft</button>
            <button className="pj-btn primary" type="button">Publish job</button>
          </div>
          <div className="pj-note">Demo mode only. Connect this to your backend to publish jobs.</div>
        </section>
      </div>
    </>
  );
}
