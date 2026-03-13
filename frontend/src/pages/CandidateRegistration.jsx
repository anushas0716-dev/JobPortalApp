import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f6f2ea;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #ff6b35;
  --accent-2: #0f766e;
  --accent-3: #f59e0b;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.cr-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 32px;
  padding: 56px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
  position: relative;
  overflow: hidden;
}
.cr-shell::before,
.cr-shell::after {
  content: '';
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  filter: blur(0px);
  opacity: 0.5;
  z-index: 0;
}
.cr-shell::before {
  background: radial-gradient(circle at top, #ffe8d6, transparent 70%);
  top: -120px;
  left: -120px;
}
.cr-shell::after {
  background: radial-gradient(circle at top, #d1fae5, transparent 70%);
  bottom: -160px;
  right: -120px;
}
.cr-hero, .cr-panel { position: relative; z-index: 1; }
.cr-hero {
  background: linear-gradient(140deg, #fff7ed, #fef3c7 55%, #ecfeff 100%);
  border-radius: 28px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow);
}
.cr-hero h1 {
  font-family: 'Fraunces', serif;
  font-size: 40px;
  margin: 0 0 12px 0;
}
.cr-hero p {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.6;
}
.cr-steps {
  margin-top: 24px;
  display: grid;
  gap: 14px;
}
.cr-step {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid var(--border);
}
.cr-step span {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: #fff1e6;
  color: var(--accent);
  display: grid;
  place-items: center;
  font-weight: 800;
}
.cr-step strong { display: block; font-size: 14px; }
.cr-step em { font-style: normal; font-size: 12px; color: var(--muted); }
.cr-panel {
  background: var(--card);
  border-radius: 24px;
  padding: 36px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cr-title {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  margin: 0 0 8px 0;
}
.cr-sub {
  color: var(--muted);
  margin-bottom: 24px;
}
.cr-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.cr-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cr-field label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
.cr-field input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
}
.cr-field input:focus {
  outline: 2px solid rgba(255, 107, 53, 0.2);
  border-color: var(--accent);
}
.cr-full { grid-column: 1 / -1; }
.cr-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}
.cr-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.cr-btn.secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.cr-note {
  font-size: 13px;
  color: var(--muted);
  margin-top: 16px;
}
.cr-message {
  margin-top: 12px;
  font-size: 13px;
  color: #b91c1c;
}
.cr-message.success {
  color: #047857;
}
.cr-footer {
  margin-top: 18px;
  font-size: 13px;
  color: var(--muted);
}
.cr-footer a { color: var(--accent-2); text-decoration: none; font-weight: 700; }
@media (max-width: 980px) {
  .cr-shell { grid-template-columns: 1fr; padding: 32px; }
}
@media (max-width: 640px) {
  .cr-grid { grid-template-columns: 1fr; }
  .cr-shell { padding: 20px; }
}
`;

export default function CandidateRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      location: form.location,
      role: "candidate",
    };
    localStorage.setItem("candidate_registration", JSON.stringify(payload));
    setSuccess("Registration details saved. You can log in now.");
    setTimeout(() => navigate("/"), 900);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="cr-shell">
        <section className="cr-hero">
          <div>
            <h1>Create a profile recruiters trust.</h1>
            <p>
              Your candidate profile is the backbone of every application. Let’s build it clean and ready for discovery.
            </p>
            <div className="cr-steps">
              <div className="cr-step">
                <span>1</span>
                <div>
                  <strong>Core details</strong>
                  <em>Name, role, and location</em>
                </div>
              </div>
              <div className="cr-step">
                <span>2</span>
                <div>
                  <strong>Profile setup</strong>
                  <em>Upload resumes and skills</em>
                </div>
              </div>
              <div className="cr-step">
                <span>3</span>
                <div>
                  <strong>Visibility</strong>
                  <em>Control how you appear</em>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cr-panel">
          <h2 className="cr-title">Candidate registration</h2>
          <p className="cr-sub">We use this to prefill your profile builder.</p>

          <form onSubmit={handleSubmit}>
            <div className="cr-grid">
              <div className="cr-field cr-full">
                <label>Full name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="cr-field">
                <label>Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@email.com"
                />
              </div>
              <div className="cr-field">
                <label>Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="cr-field cr-full">
                <label>Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Bengaluru, Karnataka"
                />
              </div>
              <div className="cr-field">
                <label>Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Create a strong password"
                />
              </div>
              <div className="cr-field">
                <label>Confirm password *</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <div className="cr-actions">
              <button className="cr-btn" type="submit">Create account</button>
              <Link className="cr-btn secondary" to="/">Back to login</Link>
            </div>

            {error && <div className="cr-message">{error}</div>}
            {success && <div className="cr-message success">{success}</div>}
          </form>

          <div className="cr-note">Tip: you can edit these later inside the profile builder.</div>
          <div className="cr-footer">
            Already have an account? <Link to="/">Sign in</Link>
          </div>
        </section>
      </div>
    </>
  );
}
