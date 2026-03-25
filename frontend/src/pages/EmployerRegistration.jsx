import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f3f5f7;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #2563eb;
  --accent-2: #10b981;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.er-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 32px;
  padding: 56px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.er-hero {
  background: linear-gradient(135deg, #e0f2fe 0%, #ecfeff 45%, #fef3c7 100%);
  border-radius: 28px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow);
}
.er-hero h1 {
  font-family: 'Fraunces', serif;
  font-size: 38px;
  margin: 0 0 12px 0;
}
.er-hero p {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.6;
}
.er-hero-cards { display: grid; gap: 12px; margin-top: 20px; }
.er-hero-card {
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid var(--border);
}
.er-hero-card strong { display: block; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: #1d4ed8; }
.er-hero-card span { font-size: 14px; color: var(--muted); }
.er-panel {
  background: var(--card);
  border-radius: 24px;
  padding: 36px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.er-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  margin: 0 0 8px 0;
}
.er-sub { color: var(--muted); margin-bottom: 24px; }
.er-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.er-field { display: flex; flex-direction: column; gap: 6px; }
.er-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
.er-field input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
}
.er-field input:focus {
  outline: 2px solid rgba(37, 99, 235, 0.2);
  border-color: var(--accent);
}
.er-full { grid-column: 1 / -1; }
.er-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.er-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.er-btn.secondary { background: transparent; color: var(--ink); border: 1px solid var(--border); }
.er-message { margin-top: 12px; font-size: 13px; color: #b91c1c; }
.er-message.success { color: #047857; }
.er-footer { margin-top: 18px; font-size: 13px; color: var(--muted); }
.er-footer a { color: var(--accent-2); text-decoration: none; font-weight: 700; }
@media (max-width: 980px) {
  .er-shell { grid-template-columns: 1fr; padding: 32px; }
}
@media (max-width: 640px) {
  .er-grid { grid-template-columns: 1fr; }
  .er-shell { padding: 20px; }
}
`;

export default function EmployerRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.companyName || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      companyName: form.companyName,
      email: form.email,
      phone: form.phone,
      website: form.website,
      location: form.location,
      role: "employer",
    };
    localStorage.setItem("employer_registration", JSON.stringify(payload));
    setSuccess("Company details saved. You can log in now.");
    setTimeout(() => navigate("/"), 900);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="er-shell">
        <section className="er-hero">
          <div>
            <h1>Register your company.</h1>
            <p>Start hiring with a profile that candidates can trust.</p>
            <div className="er-hero-cards">
              <div className="er-hero-card">
                <strong>Employer brand</strong>
                <span>Showcase culture and mission.</span>
              </div>
              <div className="er-hero-card">
                <strong>Faster hiring</strong>
                <span>Reach the right candidates.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="er-panel">
          <h2 className="er-title">Employer registration</h2>
          <p className="er-sub">We use this to set up your company profile.</p>

          <form onSubmit={handleSubmit}>
            <div className="er-grid">
              <div className="er-field er-full">
                <label>Company name *</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  placeholder="Nimbus Labs"
                />
              </div>
              <div className="er-field">
                <label>Work email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="hr@nimbuslabs.com"
                />
              </div>
              <div className="er-field">
                <label>Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="er-field">
                <label>Website</label>
                <input
                  type="text"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://nimbuslabs.com"
                />
              </div>
              <div className="er-field">
                <label>Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Bengaluru, India"
                />
              </div>
              <div className="er-field">
                <label>Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Create a strong password"
                />
              </div>
              <div className="er-field">
                <label>Confirm password *</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <div className="er-actions">
              <button className="er-btn" type="submit">Create company account</button>
              <Link className="er-btn secondary" to="/">Back to login</Link>
            </div>

            {error && <div className="er-message">{error}</div>}
            {success && <div className="er-message success">{success}</div>}
          </form>

          <div className="er-footer">
            Already registered? <Link to="/">Sign in</Link>
          </div>
        </section>
      </div>
    </>
  );
}
