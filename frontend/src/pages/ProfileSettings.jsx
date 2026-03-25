import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DEFAULT_SETTINGS = {
  profileVisible: true,
  resumeVisible: true,
  showContact: false,
  openToWork: true,
  showSalary: false,
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
:root {
  --bg: #f2f4f7;
  --card: #ffffff;
  --ink: #111827;
  --muted: #6b7280;
  --accent: #0ea5e9;
  --accent-2: #22c55e;
  --accent-3: #f97316;
  --border: #e5e7eb;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}
* { box-sizing: border-box; }
body { background: var(--bg); }
.ps-shell {
  min-height: 100vh;
  padding: 40px;
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
}
.ps-header {
  max-width: 1100px;
  margin: 0 auto 24px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.ps-title {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  margin: 0;
}
.ps-layout {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
}
.ps-card {
  background: var(--card);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.ps-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.ps-row:last-child { border-bottom: none; }
.ps-row h4 {
  margin: 0 0 6px 0;
  font-size: 16px;
}
.ps-row p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}
.ps-toggle {
  position: relative;
  width: 52px;
  height: 30px;
}
.ps-toggle input { display: none; }
.ps-toggle span {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #d1d5db;
  transition: all 0.2s ease;
}
.ps-toggle span::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  top: 3px;
  left: 3px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.ps-toggle input:checked + span {
  background: var(--accent);
}
.ps-toggle input:checked + span::after {
  transform: translateX(22px);
}
.ps-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.ps-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}
.ps-btn.secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
}
.ps-note {
  margin-top: 14px;
  font-size: 13px;
  color: var(--muted);
}
.ps-preview {
  background: linear-gradient(140deg, #fff7ed, #ecfeff 55%, #eef2ff 100%);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: grid;
  gap: 16px;
}
.ps-preview h3 { margin: 0; font-size: 18px; }
.ps-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #fff;
  border: 1px solid var(--border);
}
.ps-pill span { color: var(--muted); font-weight: 600; }
.ps-preview-card {
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid var(--border);
}
.ps-preview-card strong { display: block; font-size: 14px; }
.ps-preview-card p { margin: 6px 0 0; color: var(--muted); font-size: 13px; }
@media (max-width: 900px) {
  .ps-shell { padding: 24px; }
  .ps-layout { grid-template-columns: 1fr; }
}
`;

export default function ProfileSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("candidate_visibility_settings");
    if (raw) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
      } catch (_) {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("candidate_visibility_settings", JSON.stringify(settings));
  }, [settings]);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ps-shell">
        <div className="ps-header">
          <div>
            <h2 className="ps-title">Profile visibility settings</h2>
            <div style={{ color: '#6b7280' }}>Control how recruiters discover you.</div>
          </div>
          <Link className="ps-btn secondary" to="/candidate-dashboard">Back to dashboard</Link>
        </div>

        <div className="ps-layout">
          <div className="ps-card">
            <div className="ps-row">
              <div>
                <h4>Profile visibility</h4>
                <p>Allow employers to discover your profile in search.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.profileVisible}
                  onChange={() => toggle("profileVisible")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Resume visibility</h4>
                <p>Let recruiters download your default resume.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.resumeVisible}
                  onChange={() => toggle("resumeVisible")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Show contact details</h4>
                <p>Display email and phone on your public profile.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.showContact}
                  onChange={() => toggle("showContact")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Open to work</h4>
                <p>Let employers know you are actively looking.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.openToWork}
                  onChange={() => toggle("openToWork")}
                />
                <span />
              </label>
            </div>

            <div className="ps-row">
              <div>
                <h4>Show salary expectations</h4>
                <p>Share expected salary range on your profile.</p>
              </div>
              <label className="ps-toggle">
                <input
                  type="checkbox"
                  checked={settings.showSalary}
                  onChange={() => toggle("showSalary")}
                />
                <span />
              </label>
            </div>

            <div className="ps-actions">
              <button className="ps-btn" type="button" onClick={handleSave}>Save changes</button>
              <Link className="ps-btn secondary" to="/candidate-profile">Edit profile</Link>
            </div>
            {saved && <div className="ps-note">Settings saved.</div>}
            {!saved && <div className="ps-note">Changes are stored locally for now.</div>}
          </div>

          <aside className="ps-preview">
            <h3>Preview snapshot</h3>
            <div className="ps-pill">Visibility <span>{settings.profileVisible ? 'Public' : 'Private'}</span></div>
            <div className="ps-preview-card">
              <strong>Recruiter view</strong>
              <p>{settings.resumeVisible ? 'Resume available for download.' : 'Resume hidden from recruiters.'}</p>
            </div>
            <div className="ps-preview-card">
              <strong>Contact details</strong>
              <p>{settings.showContact ? 'Email + phone visible.' : 'Contact details hidden.'}</p>
            </div>
            <div className="ps-preview-card">
              <strong>Status badge</strong>
              <p>{settings.openToWork ? 'Open to work displayed.' : 'Open to work hidden.'}</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
