/**
 * Jobs.jsx — Light & Colorful Creative Design
 * Warm cream base, bold coral/teal/violet accents, playful editorial feel
 */

import { useState, useEffect } from "react";
import API from "../services/api";

// ─── HELPERS ──────────────────────────────────────────────────
function fmtSalary(min, max) {
  if (!min && !max) return null;
  if (min && max) return `₹${(min / 100000).toFixed(0)}L – ₹${(max / 100000).toFixed(0)}L`;
  if (min) return `₹${(min / 100000).toFixed(0)}L+`;
  return null;
}
function logoLetter(n) { return (n || "?").charAt(0).toUpperCase(); }

const LOGO_COLORS = [
  { bg: "#FFE5D9", color: "#FF4D00" },
  { bg: "#D9F0FF", color: "#0066CC" },
  { bg: "#E5FFD9", color: "#2D8A00" },
  { bg: "#F0D9FF", color: "#7700CC" },
  { bg: "#FFD9F0", color: "#CC0066" },
  { bg: "#FFF5D9", color: "#CC7700" },
  { bg: "#D9FFF0", color: "#007755" },
  { bg: "#FFD9D9", color: "#CC0000" },
];
function logoStyle(n) {
  let h = 0; for (let i = 0; i < (n||"").length; i++) h = n.charCodeAt(i) + ((h << 5) - h);
  return LOGO_COLORS[Math.abs(h) % LOGO_COLORS.length];
}

function timeAgo(d) {
  if (!d) return "";
  const days = Math.floor((new Date() - new Date(d)) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days/7)}w ago`;
  return `${Math.floor(days/30)}mo ago`;
}

const TYPE_LABEL = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const TYPE_COLORS = {
  full_time:  { bg: "#E8F5E9", color: "#2E7D32", border: "#A5D6A7" },
  part_time:  { bg: "#FFF3E0", color: "#E65100", border: "#FFCC80" },
  contract:   { bg: "#F3E5F5", color: "#6A1B9A", border: "#CE93D8" },
  internship: { bg: "#E3F2FD", color: "#1565C0", border: "#90CAF9" },
};

const FILTERS = ["All", "Full-time", "Part-time", "Contract", "Internship"];

// ═════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═════════════════════════════════════════════════════════════
export default function Jobs() {
  const [jobs,     setJobs]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("All");
  const [selected, setSelected] = useState(null);
  const [saved,    setSaved]    = useState({});
  const [toast,    setToast]    = useState(null);

  useEffect(() => {
    Promise.all([
      API.get('/jobs/'),
      API.get('/saved-jobs/'),
    ]).then(([jobsRes, savedRes]) => {
      const jobsData = jobsRes.data.results || jobsRes.data;
      setJobs(jobsData);
      if (jobsData.length > 0) setSelected(jobsData[0]);
      const savedData = savedRes.data.results || savedRes.data;
      const savedMap = {};
      savedData.forEach(item => { savedMap[item.job] = item.id; });
      setSaved(savedMap);
    }).catch(() => setError("Failed to load jobs."))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const toggleSave = (job) => {
    if (saved[job.id]) {
      API.delete(`/saved-jobs/${saved[job.id]}/`)
        .then(() => {
          setSaved(s => { const n = {...s}; delete n[job.id]; return n; });
          showToast("Removed from saved", "info");
        })
        .catch(() => showToast("Failed to remove", "error"));
    } else {
      API.post('/saved-jobs/', { job: job.id })
        .then(res => {
          setSaved(s => ({ ...s, [job.id]: res.data.id }));
          showToast("Job saved! ✓");
        })
        .catch(err => {
          if (err.response?.data?.detail === "Job already saved.") {
            showToast("Already saved ✓", "info");
          } else {
            showToast("Failed to save", "error");
          }
        });
    }
  };

  const visible = jobs.filter(j => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (j.title || "").toLowerCase().includes(q) ||
      (j.company_name || "").toLowerCase().includes(q) ||
      (j.location || "").toLowerCase().includes(q) ||
      (j.skills || []).some(s => s.toLowerCase().includes(q));
    const matchFilter = filter === "All" || TYPE_LABEL[j.employment_type] === filter;
    return matchSearch && matchFilter;
  });

  if (loading) return (
    <>
      <style>{CSS}</style>
      <div className="jb-loading">
        <div className="jb-loading-dots">
          <span /><span /><span />
        </div>
        <p>Finding opportunities for you…</p>
      </div>
    </>
  );

  if (error) return (
    <>
      <style>{CSS}</style>
      <div className="jb-loading">
        <p style={{ color: "#FF4D00" }}>{error}</p>
        <button className="jb-btn-primary" onClick={() => window.location.href='/'} style={{ marginTop: 16 }}>Go to Login</button>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>

      {toast && (
        <div className={`jb-toast jb-toast-${toast.type}`}>{toast.msg}</div>
      )}

      <div className="jb-root">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="jb-sidebar">

          {/* Search */}
          <div className="jb-search-wrap">
            <span className="jb-search-ico">🔍</span>
            <input
              className="jb-search"
              placeholder="Search jobs, skills, companies…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="jb-search-x" onClick={() => setSearch("")}>×</button>}
          </div>

          {/* Filter pills */}
          <div className="jb-filters">
            {FILTERS.map(f => (
              <button key={f} className={`jb-pill ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          {/* Count */}
          <div className="jb-sidebar-meta">
            <span className="jb-count-badge">{visible.length}</span>
            <span className="jb-count-label">positions found</span>
          </div>

          {/* Job Cards List */}
          <div className="jb-list">
            {visible.length === 0 ? (
              <div className="jb-empty">
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔎</div>
                <p>No jobs match your search</p>
              </div>
            ) : visible.map((job, i) => {
              const logo = logoStyle(job.company_name);
              const typeColor = TYPE_COLORS[job.employment_type] || { bg: "#F5F5F5", color: "#555", border: "#DDD" };
              const isSaved = !!saved[job.id];
              const isSelected = selected?.id === job.id;
              return (
                <div
                  key={job.id}
                  className={`jb-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelected(job)}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Card accent bar */}
                  <div className="jb-card-bar" style={{ background: logo.color }} />

                  <div className="jb-card-head">
                    <div className="jb-logo" style={{ background: logo.bg, color: logo.color }}>
                      {logoLetter(job.company_name)}
                    </div>
                    <div className="jb-card-info">
                      <div className="jb-card-title">{job.title}</div>
                      <div className="jb-card-company">{job.company_name}</div>
                    </div>
                    <button
                      className={`jb-heart ${isSaved ? "saved" : ""}`}
                      onClick={e => { e.stopPropagation(); toggleSave(job); }}
                    >{isSaved ? "♥" : "♡"}</button>
                  </div>

                  <div className="jb-card-meta">
                    <span className="jb-meta-loc">📍 {job.location || "Remote"}</span>
                    {job.employment_type && (
                      <span className="jb-type-badge" style={{ background: typeColor.bg, color: typeColor.color, borderColor: typeColor.border }}>
                        {TYPE_LABEL[job.employment_type]}
                      </span>
                    )}
                  </div>

                  {fmtSalary(job.salary_min, job.salary_max) && (
                    <div className="jb-card-salary">{fmtSalary(job.salary_min, job.salary_max)}<span className="jb-yr"> /yr</span></div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── RIGHT DETAIL ── */}
        <main className="jb-detail">
          {selected ? (
            <DetailView job={selected} saved={!!saved[selected.id]} onSave={() => toggleSave(selected)} />
          ) : (
            <div className="jb-detail-empty">
              <div style={{ fontSize: 48, marginBottom: 16 }}>👈</div>
              <p>Select a job to see details</p>
            </div>
          )}
        </main>

      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════════
//  DETAIL VIEW
// ═════════════════════════════════════════════════════════════
function DetailView({ job, saved, onSave }) {
  const salary = fmtSalary(job.salary_min, job.salary_max);
  const logo = logoStyle(job.company_name);
  const typeColor = TYPE_COLORS[job.employment_type] || { bg: "#F5F5F5", color: "#555", border: "#DDD" };

  return (
    <div className="jb-dv">

      {/* Hero banner */}
      <div className="jb-dv-banner" style={{ background: `linear-gradient(135deg, ${logo.bg}, #fff)` }}>
        <div className="jb-dv-banner-logo" style={{ background: logo.bg, color: logo.color, border: `3px solid ${logo.color}20` }}>
          {logoLetter(job.company_name)}
        </div>
        <div className="jb-dv-banner-text">
          <h1 className="jb-dv-title">{job.title}</h1>
          <p className="jb-dv-company">{job.company_name}</p>
        </div>
        <button className={`jb-dv-save-btn ${saved ? "saved" : ""}`} onClick={onSave} style={{ borderColor: saved ? logo.color : "#DDD", color: saved ? logo.color : "#AAA", background: saved ? logo.bg : "#fff" }}>
          {saved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>

      {/* Tags row */}
      <div className="jb-dv-tags">
        {job.location && <span className="jb-dtag loc">📍 {job.location}</span>}
        {job.employment_type && (
          <span className="jb-dtag" style={{ background: typeColor.bg, color: typeColor.color, borderColor: typeColor.border }}>
            {TYPE_LABEL[job.employment_type]}
          </span>
        )}
        {job.status === "active" && <span className="jb-dtag active">✦ Active</span>}
        {job.created_at && <span className="jb-dtag time">🕐 {timeAgo(job.created_at)}</span>}
      </div>

      {/* Salary highlight */}
      {salary && (
        <div className="jb-dv-salary" style={{ background: `linear-gradient(135deg, ${logo.bg}, #fff)`, borderColor: `${logo.color}30` }}>
          <div className="jb-dv-salary-label">💰 Salary Range</div>
          <div className="jb-dv-salary-val" style={{ color: logo.color }}>{salary}</div>
          <div className="jb-dv-salary-sub">per year</div>
        </div>
      )}

      {/* Skills */}
      {(job.skills || []).length > 0 && (
        <div className="jb-dv-section">
          <div className="jb-dv-sec-head">
            <span className="jb-dv-sec-icon">⚡</span>
            <span className="jb-dv-sec-title">Required Skills</span>
          </div>
          <div className="jb-dv-skills">
            {job.skills.map((s, i) => (
              <span key={s} className="jb-skill-chip" style={{ animationDelay: `${i * 40}ms`, borderColor: `${logo.color}40`, color: logo.color, background: logo.bg }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {job.description && (
        <div className="jb-dv-section">
          <div className="jb-dv-sec-head">
            <span className="jb-dv-sec-icon">📋</span>
            <span className="jb-dv-sec-title">About the Role</span>
          </div>
          <p className="jb-dv-desc">{job.description}</p>
        </div>
      )}

      {/* Actions */}
      <div className="jb-dv-actions">
        <button className="jb-apply-btn" style={{ background: logo.color }}>
          Apply Now →
        </button>
        <button
          className={`jb-save-btn-lg ${saved ? "saved" : ""}`}
          onClick={onSave}
          style={saved ? { background: logo.bg, borderColor: logo.color, color: logo.color } : {}}
        >
          {saved ? "♥ Saved" : "♡ Save Job"}
        </button>
      </div>

    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  STYLES
// ═════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { background: #FAF9F6; }

.jb-loading {
  min-height: 80vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif; color: #888;
  background: #FAF9F6;
}
.jb-loading p { font-size: 14px; margin-top: 16px; }
.jb-loading-dots { display: flex; gap: 8px; }
.jb-loading-dots span {
  width: 10px; height: 10px; border-radius: 50%;
  animation: dotBounce 1s ease infinite;
}
.jb-loading-dots span:nth-child(1) { background: #FF6B6B; animation-delay: 0s; }
.jb-loading-dots span:nth-child(2) { background: #4ECDC4; animation-delay: .15s; }
.jb-loading-dots span:nth-child(3) { background: #FFE66D; animation-delay: .3s; }
@keyframes dotBounce { 0%,80%,100% { transform: scale(0.7); opacity:.5; } 40% { transform: scale(1.2); opacity:1; } }

/* Toast */
.jb-toast {
  position: fixed; top: 20px; right: 20px; z-index: 9999;
  padding: 12px 20px; border-radius: 12px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700;
  animation: slideIn .25s ease; box-shadow: 0 4px 20px rgba(0,0,0,.12);
}
.jb-toast-success { background: #E8F5E9; color: #2E7D32; border: 1.5px solid #A5D6A7; }
.jb-toast-info    { background: #E3F2FD; color: #1565C0; border: 1.5px solid #90CAF9; }
.jb-toast-error   { background: #FFEBEE; color: #C62828; border: 1.5px solid #EF9A9A; }
@keyframes slideIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:none; } }

/* Root layout */
.jb-root {
  display: flex; height: calc(100vh - 57px);
  background: #FAF9F6; font-family: 'Plus Jakarta Sans', sans-serif;
  overflow: hidden;
}

/* ── SIDEBAR ── */
.jb-sidebar {
  width: 400px; flex-shrink: 0;
  background: #fff; border-right: 1.5px solid #EEE;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 4px 0 24px rgba(0,0,0,.04);
}

.jb-search-wrap {
  position: relative; margin: 20px 16px 12px;
}
.jb-search-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 14px; pointer-events: none; }
.jb-search {
  width: 100%; padding: 12px 38px 12px 40px;
  background: #FAF9F6; border: 1.5px solid #EEE;
  border-radius: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13.5px; color: #333; outline: none; transition: all .2s;
}
.jb-search:focus { border-color: #FF6B6B; background: #fff; box-shadow: 0 0 0 3px #FF6B6B18; }
.jb-search::placeholder { color: #BBB; }
.jb-search-x { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #BBB; cursor: pointer; font-size: 18px; }

.jb-filters {
  display: flex; gap: 6px; padding: 0 16px 12px; flex-wrap: wrap;
}
.jb-pill {
  padding: 6px 14px; border-radius: 20px; border: 1.5px solid #EEE;
  background: #FAF9F6; color: #888; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s;
}
.jb-pill.on { background: #FF6B6B; border-color: #FF6B6B; color: #fff; box-shadow: 0 4px 12px #FF6B6B30; }
.jb-pill:hover:not(.on) { border-color: #FF6B6B; color: #FF6B6B; }

.jb-sidebar-meta {
  display: flex; align-items: center; gap: 8px;
  padding: 0 20px 12px; border-bottom: 1.5px solid #F5F5F5;
}
.jb-count-badge {
  background: #FF6B6B; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px; font-weight: 800; padding: 3px 10px; border-radius: 20px;
}
.jb-count-label { font-size: 12px; color: #BBB; font-weight: 600; }

.jb-list { flex: 1; overflow-y: auto; padding: 12px; }
.jb-list::-webkit-scrollbar { width: 4px; }
.jb-list::-webkit-scrollbar-thumb { background: #EEE; border-radius: 4px; }

.jb-empty { text-align: center; padding: 60px 20px; color: #CCC; font-size: 14px; }

/* Job card */
.jb-card {
  background: #fff; border: 1.5px solid #F0F0F0; border-radius: 16px;
  padding: 16px; margin-bottom: 8px; cursor: pointer;
  transition: all .2s; position: relative; overflow: hidden;
  animation: cardIn .3s ease both;
}
@keyframes cardIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
.jb-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; opacity: 0; transition: opacity .2s; }
.jb-card:hover { border-color: #DDD; box-shadow: 0 6px 24px rgba(0,0,0,.08); transform: translateY(-2px); }
.jb-card:hover .jb-card-bar { opacity: 1; }
.jb-card.selected { border-color: #FF6B6B; box-shadow: 0 6px 24px #FF6B6B20; }
.jb-card.selected .jb-card-bar { opacity: 1; }

.jb-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.jb-logo {
  width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 800;
}
.jb-card-info { flex: 1; min-width: 0; }
.jb-card-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: #222; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.jb-card-company { font-size: 12px; color: #AAA; margin-top: 2px; }
.jb-heart { background: none; border: none; cursor: pointer; font-size: 18px; color: #DDD; transition: all .2s; padding: 2px; flex-shrink: 0; }
.jb-heart:hover { transform: scale(1.2); color: #FF6B6B; }
.jb-heart.saved { color: #FF6B6B; }

.jb-card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
.jb-meta-loc { font-size: 11.5px; color: #AAA; }
.jb-type-badge { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 6px; border: 1px solid; }
.jb-card-salary { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: #333; }
.jb-yr { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; color: #AAA; font-weight: 400; }

/* ── DETAIL ── */
.jb-detail {
  flex: 1; overflow-y: auto; background: #FAF9F6;
}
.jb-detail::-webkit-scrollbar { width: 4px; }
.jb-detail::-webkit-scrollbar-thumb { background: #EEE; border-radius: 4px; }

.jb-detail-empty {
  height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  color: #CCC; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
}

.jb-dv {
  max-width: 760px; margin: 0 auto; padding: 32px 40px 80px;
  animation: dvIn .25s ease;
}
@keyframes dvIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

.jb-dv-banner {
  border-radius: 20px; padding: 28px; margin-bottom: 24px;
  display: flex; align-items: flex-start; gap: 20px;
  border: 1.5px solid #EEE;
}
.jb-dv-banner-logo {
  width: 72px; height: 72px; border-radius: 18px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 800;
}
.jb-dv-banner-text { flex: 1; }
.jb-dv-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 800; color: #111; line-height: 1.2; margin-bottom: 6px; }
.jb-dv-company { font-size: 15px; color: #888; font-weight: 500; }

.jb-dv-save-btn {
  padding: 10px 18px; border-radius: 12px; border: 1.5px solid;
  cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px; font-weight: 700; transition: all .2s;
  flex-shrink: 0; white-space: nowrap;
}

.jb-dv-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.jb-dtag {
  font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px;
  border: 1.5px solid; font-family: 'Plus Jakarta Sans', sans-serif;
}
.jb-dtag.loc { background: #F5F5F5; color: #888; border-color: #E8E8E8; }
.jb-dtag.active { background: #E8F5E9; color: #2E7D32; border-color: #A5D6A7; }
.jb-dtag.time { background: #FFF3E0; color: #E65100; border-color: #FFCC80; }

.jb-dv-salary {
  border-radius: 16px; padding: 20px 24px; margin-bottom: 28px;
  border: 1.5px solid; display: flex; align-items: center; gap: 20px;
}
.jb-dv-salary-label { font-size: 13px; font-weight: 700; color: #888; }
.jb-dv-salary-val { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 800; flex: 1; }
.jb-dv-salary-sub { font-size: 12px; color: #AAA; font-weight: 500; }

.jb-dv-section { margin-bottom: 28px; }
.jb-dv-sec-head { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.jb-dv-sec-icon { font-size: 16px; }
.jb-dv-sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 800; color: #333; text-transform: uppercase; letter-spacing: .06em; }

.jb-dv-skills { display: flex; flex-wrap: wrap; gap: 8px; }
.jb-skill-chip {
  padding: 8px 16px; border-radius: 10px; border: 1.5px solid;
  font-size: 13px; font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  animation: chipIn .3s ease both; transition: transform .15s;
}
.jb-skill-chip:hover { transform: translateY(-2px); }
@keyframes chipIn { from { opacity:0; transform:scale(.9); } to { opacity:1; transform:scale(1); } }

.jb-dv-desc { font-size: 14.5px; color: #666; line-height: 1.85; white-space: pre-wrap; }

.jb-dv-actions { display: flex; gap: 12px; margin-top: 36px; padding-top: 24px; border-top: 1.5px solid #EEE; }

.jb-apply-btn {
  flex: 1; padding: 16px; border: none; border-radius: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 800;
  color: #fff; cursor: pointer; transition: all .2s; letter-spacing: .01em;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
}
.jb-apply-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.2); }

.jb-save-btn-lg {
  padding: 16px 24px; background: #fff; border: 1.5px solid #DDD;
  border-radius: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px; font-weight: 700; color: #AAA; cursor: pointer; transition: all .2s;
}
.jb-save-btn-lg:hover { border-color: #FF6B6B; color: #FF6B6B; }

.jb-btn-primary {
  padding: 12px 24px; background: #FF6B6B; border: none; border-radius: 10px;
  color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
  font-weight: 700; cursor: pointer;
}

@media (max-width: 768px) {
  .jb-root { flex-direction: column; height: auto; overflow: auto; }
  .jb-sidebar { width: 100%; max-height: 50vh; }
  .jb-detail { min-height: 50vh; }
  .jb-dv { padding: 20px 16px 40px; }
  .jb-dv-banner { flex-direction: column; }
}
`;