/**
 * SavedJobs.jsx — Light & Colorful, matches Jobs.jsx design
 * Connected to Django REST API
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

function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
}
function daysLeft(d) {
  if (!d) return null;
  return Math.ceil((new Date(d) - new Date()) / 86400000);
}
function getStatus(job) {
  if (job.job_status === "expired" || job.job_status === "closed") return "expired";
  if (!job.job_deadline) return "active";
  const days = Math.ceil((new Date(job.job_deadline) - new Date()) / 86400000);
  if (days < 0) return "expired";
  if (days <= 7) return "expiring";
  return "active";
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

const TABS = ["All", "Active", "Expiring Soon", "Expired"];

// ═════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═════════════════════════════════════════════════════════════
export default function SavedJobs() {
  const [jobs,     setJobs]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [tab,      setTab]      = useState("All");
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("recent");
  const [selected, setSelected] = useState(null);
  const [toast,    setToast]    = useState(null);

  useEffect(() => {
    API.get('/saved-jobs/')
      .then(res => {
        const data = res.data.results || res.data;
        const mapped = data.map(item => ({
          id:            item.id,
          job:           item.job,
          job_title:     item.job_title,
          job_company:   item.job_company,
          job_location:  item.job_location,
          job_type:      item.job_type,
          job_salary_min: parseFloat(item.job_salary_min) || null,
          job_salary_max: parseFloat(item.job_salary_max) || null,
          job_deadline:  item.job_deadline,
          job_status:    item.job_status,
          job_skills:    item.job_skills || [],
          saved_at:      item.saved_at,
          notes:         item.notes || "",
        }));
        setJobs(mapped);
        if (mapped.length > 0) setSelected(mapped[0]);
      })
      .catch(() => setError("Failed to load saved jobs."))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const removeJob = (id) => {
    API.delete(`/saved-jobs/${id}/`)
      .then(() => {
        setJobs(j => j.filter(x => x.id !== id));
        if (selected?.id === id) setSelected(null);
        showToast("Job removed from saved list", "info");
      })
      .catch(() => showToast("Failed to remove", "error"));
  };

  const saveNotes = (id, notes) => {
    setJobs(j => j.map(x => x.id === id ? { ...x, notes } : x));
    if (selected?.id === id) setSelected(s => ({ ...s, notes }));
    API.patch(`/saved-jobs/${id}/`, { notes })
      .catch(() => showToast("Failed to save notes", "error"));
  };

  const counts = {
    "All":           jobs.length,
    "Active":        jobs.filter(j => getStatus(j) === "active").length,
    "Expiring Soon": jobs.filter(j => getStatus(j) === "expiring").length,
    "Expired":       jobs.filter(j => getStatus(j) === "expired").length,
  };

  const visible = jobs
    .filter(j => {
      const s = getStatus(j);
      if (tab === "Active"        && s !== "active")   return false;
      if (tab === "Expiring Soon" && s !== "expiring") return false;
      if (tab === "Expired"       && s !== "expired")  return false;
      const q = search.toLowerCase();
      if (!q) return true;
      return (
        (j.job_title   || "").toLowerCase().includes(q) ||
        (j.job_company || "").toLowerCase().includes(q) ||
        (j.job_skills  || []).some(sk => sk.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "recent")   return new Date(b.saved_at) - new Date(a.saved_at);
      if (sort === "deadline") return new Date(a.job_deadline || "9999") - new Date(b.job_deadline || "9999");
      if (sort === "salary")   return (b.job_salary_max || 0) - (a.job_salary_max || 0);
      return 0;
    });

  if (loading) return (
    <>
      <style>{CSS}</style>
      <div className="sj-loading">
        <div className="sj-loading-dots"><span /><span /><span /></div>
        <p>Loading your saved jobs…</p>
      </div>
    </>
  );

  if (error) return (
    <>
      <style>{CSS}</style>
      <div className="sj-loading">
        <p style={{ color: "#FF4D00" }}>{error}</p>
        <button className="sj-btn-primary" onClick={() => window.location.href='/'} style={{ marginTop: 16 }}>Go to Login</button>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>

      {toast && <div className={`sj-toast sj-toast-${toast.type}`}>{toast.msg}</div>}

      <div className="sj-root">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="sj-sidebar">

          {/* Search */}
          <div className="sj-search-wrap">
            <span className="sj-search-ico">🔍</span>
            <input
              className="sj-search"
              placeholder="Search title, company or skill…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="sj-search-x" onClick={() => setSearch("")}>×</button>}
          </div>

          {/* Sort */}
          <div style={{ padding: "0 16px 12px", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#AAA", fontWeight: 600 }}>Sort:</span>
            <select className="sj-sort" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="recent">Recently Saved</option>
              <option value="deadline">By Deadline</option>
              <option value="salary">By Salary</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="sj-tabs">
            {TABS.map(t => (
              <button key={t} className={`sj-tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
                {t}
                <span className="sj-tab-n">{counts[t]}</span>
              </button>
            ))}
          </div>

          {/* Count */}
          <div className="sj-sidebar-meta">
            <span className="sj-count-badge">{visible.length}</span>
            <span className="sj-count-label">saved jobs</span>
          </div>

          {/* Job list */}
          <div className="sj-list">
            {visible.length === 0 ? (
              <div className="sj-empty">
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔖</div>
                <p>{search ? "No results found" : "No saved jobs yet"}</p>
                <p style={{ fontSize: 12, marginTop: 6 }}>{!search && "Browse jobs and save ones you like"}</p>
              </div>
            ) : visible.map((job, i) => {
              const logo = logoStyle(job.job_company);
              const typeColor = TYPE_COLORS[job.job_type] || { bg: "#F5F5F5", color: "#555", border: "#DDD" };
              const status = getStatus(job);
              const days = daysLeft(job.job_deadline);
              const isSelected = selected?.id === job.id;

              return (
                <div
                  key={job.id}
                  className={`sj-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelected(job)}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="sj-card-bar" style={{ background: logo.color }} />

                  <div className="sj-card-head">
                    <div className="sj-logo" style={{ background: logo.bg, color: logo.color }}>
                      {logoLetter(job.job_company)}
                    </div>
                    <div className="sj-card-info">
                      <div className="sj-card-title">{job.job_title}</div>
                      <div className="sj-card-company">{job.job_company}</div>
                    </div>
                    <button
                      className="sj-remove-btn"
                      onClick={e => { e.stopPropagation(); removeJob(job.id); }}
                      title="Remove"
                    >✕</button>
                  </div>

                  <div className="sj-card-meta">
                    {job.job_location && <span className="sj-meta-loc">📍 {job.job_location}</span>}
                    {job.job_type && (
                      <span className="sj-type-badge" style={{ background: typeColor.bg, color: typeColor.color, borderColor: typeColor.border }}>
                        {TYPE_LABEL[job.job_type] || job.job_type}
                      </span>
                    )}
                    <span className={`sj-status-chip st-${status}`}>
                      <i className="sj-dot" />
                      {status === "expiring" ? "Expiring" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>

                  {fmtSalary(job.job_salary_min, job.job_salary_max) && (
                    <div className="sj-card-salary" style={{ color: logo.color }}>
                      {fmtSalary(job.job_salary_min, job.job_salary_max)}<span className="sj-yr"> /yr</span>
                    </div>
                  )}

                  <div className="sj-card-footer">
                    <span className={`sj-dl ${status === "expiring" ? "urgent" : status === "expired" ? "grey" : ""}`}>
                      {status === "expired" ? "Closed" : days !== null ? (days <= 0 ? "Past deadline" : `${days}d left`) : fmtDate(job.job_deadline)}
                    </span>
                    {job.notes && <span className="sj-note-icon" title={job.notes}>📝</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── RIGHT DETAIL ── */}
        <main className="sj-detail">
          {selected ? (
            <DetailPanel
              job={selected}
              onRemove={() => removeJob(selected.id)}
              onSaveNotes={(notes) => saveNotes(selected.id, notes)}
              onClose={() => setSelected(null)}
            />
          ) : (
            <div className="sj-detail-empty">
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔖</div>
              <p>Select a saved job to see details</p>
            </div>
          )}
        </main>

      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════════
//  DETAIL PANEL
// ═════════════════════════════════════════════════════════════
function DetailPanel({ job, onRemove, onSaveNotes, onClose }) {
  const [notes, setNotes] = useState(job.notes || "");
  const logo = logoStyle(job.job_company);
  const typeColor = TYPE_COLORS[job.job_type] || { bg: "#F5F5F5", color: "#555", border: "#DDD" };
  const status = getStatus(job);
  const days = daysLeft(job.job_deadline);
  const salary = fmtSalary(job.job_salary_min, job.job_salary_max);

  useEffect(() => { setNotes(job.notes || ""); }, [job.id]);

  return (
    <div className="sj-dv">

      {/* Hero banner */}
      <div className="sj-dv-banner" style={{ background: `linear-gradient(135deg, ${logo.bg}, #fff)` }}>
        <div className="sj-dv-banner-logo" style={{ background: logo.bg, color: logo.color, border: `3px solid ${logo.color}20` }}>
          {logoLetter(job.job_company)}
        </div>
        <div className="sj-dv-banner-text">
          <h1 className="sj-dv-title">{job.job_title}</h1>
          <p className="sj-dv-company">{job.job_company}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="sj-dv-tags">
        {job.job_location && <span className="sj-dtag loc">📍 {job.job_location}</span>}
        {job.job_type && (
          <span className="sj-dtag" style={{ background: typeColor.bg, color: typeColor.color, borderColor: typeColor.border }}>
            {TYPE_LABEL[job.job_type] || job.job_type}
          </span>
        )}
        <span className={`sj-dtag st-chip st-${status}`}>
          <i className="sj-dot" />
          {status === "expiring" ? "Expiring Soon" : status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Info grid */}
      <div className="sj-info-grid">
        {salary && (
          <div className="sj-info-box full" style={{ background: `linear-gradient(135deg, ${logo.bg}, #fff)`, borderColor: `${logo.color}30` }}>
            <div className="sj-info-label">💰 Salary Range</div>
            <div className="sj-info-val big" style={{ color: logo.color }}>{salary}</div>
            <div className="sj-info-sub">per year</div>
          </div>
        )}
        <div className="sj-info-box">
          <div className="sj-info-label">⏰ Deadline</div>
          <div className="sj-info-val" style={{ color: status === "expiring" ? "#E65100" : status === "expired" ? "#CCC" : "#333" }}>
            {status === "expired" ? "Closed" : days !== null ? (days <= 0 ? "Past" : `${days} days left`) : fmtDate(job.job_deadline)}
          </div>
        </div>
        <div className="sj-info-box">
          <div className="sj-info-label">📅 Saved On</div>
          <div className="sj-info-val">{fmtDate(job.saved_at)}</div>
        </div>
      </div>

      {/* Skills */}
      {(job.job_skills || []).length > 0 && (
        <div className="sj-dv-section">
          <div className="sj-dv-sec-head">
            <span className="sj-dv-sec-icon">⚡</span>
            <span className="sj-dv-sec-title">Required Skills</span>
          </div>
          <div className="sj-dv-skills">
            {job.job_skills.map((s, i) => (
              <span key={s} className="sj-skill-chip" style={{ animationDelay: `${i * 40}ms`, borderColor: `${logo.color}40`, color: logo.color, background: logo.bg }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="sj-dv-section">
        <div className="sj-dv-sec-head">
          <span className="sj-dv-sec-icon">📝</span>
          <span className="sj-dv-sec-title">My Notes</span>
        </div>
        <textarea
          className="sj-notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          onBlur={() => onSaveNotes(notes)}
          placeholder="Add notes, reminders, or interview tips…"
          rows={3}
          style={{ borderColor: notes ? `${logo.color}40` : "#EEE" }}
        />
        <div className="sj-notes-hint">Auto-saves when you click away</div>
      </div>

      {/* Actions */}
      <div className="sj-dv-actions">
        <button className="sj-apply-btn" style={{ background: logo.color }}>Apply Now →</button>
        <button className="sj-remove-lg" onClick={onRemove}>🗑 Remove</button>
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

.sj-loading {
  min-height: 80vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif; color: #888; background: #FAF9F6;
}
.sj-loading p { font-size: 14px; margin-top: 16px; }
.sj-loading-dots { display: flex; gap: 8px; }
.sj-loading-dots span { width: 10px; height: 10px; border-radius: 50%; animation: dotBounce 1s ease infinite; }
.sj-loading-dots span:nth-child(1) { background: #FF6B6B; animation-delay: 0s; }
.sj-loading-dots span:nth-child(2) { background: #4ECDC4; animation-delay: .15s; }
.sj-loading-dots span:nth-child(3) { background: #FFE66D; animation-delay: .3s; }
@keyframes dotBounce { 0%,80%,100% { transform:scale(.7); opacity:.5; } 40% { transform:scale(1.2); opacity:1; } }

.sj-toast { position: fixed; top: 20px; right: 20px; z-index: 9999; padding: 12px 20px; border-radius: 12px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; animation: slideIn .25s ease; box-shadow: 0 4px 20px rgba(0,0,0,.12); }
.sj-toast-success { background: #E8F5E9; color: #2E7D32; border: 1.5px solid #A5D6A7; }
.sj-toast-info    { background: #E3F2FD; color: #1565C0; border: 1.5px solid #90CAF9; }
.sj-toast-error   { background: #FFEBEE; color: #C62828; border: 1.5px solid #EF9A9A; }
@keyframes slideIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:none; } }

.sj-root { display: flex; height: calc(100vh - 57px); background: #FAF9F6; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; }

/* ── SIDEBAR ── */
.sj-sidebar { width: 400px; flex-shrink: 0; background: #fff; border-right: 1.5px solid #EEE; display: flex; flex-direction: column; overflow: hidden; box-shadow: 4px 0 24px rgba(0,0,0,.04); }

.sj-search-wrap { position: relative; margin: 20px 16px 12px; }
.sj-search-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 14px; pointer-events: none; }
.sj-search { width: 100%; padding: 12px 38px 12px 40px; background: #FAF9F6; border: 1.5px solid #EEE; border-radius: 14px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; color: #333; outline: none; transition: all .2s; }
.sj-search:focus { border-color: #FF6B6B; background: #fff; box-shadow: 0 0 0 3px #FF6B6B18; }
.sj-search::placeholder { color: #BBB; }
.sj-search-x { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #BBB; cursor: pointer; font-size: 18px; }

.sj-sort { padding: 6px 12px; background: #FAF9F6; border: 1.5px solid #EEE; border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: #666; outline: none; cursor: pointer; }

.sj-tabs { display: flex; border-bottom: 1.5px solid #F0F0F0; padding: 0 12px; overflow-x: auto; }
.sj-tab { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: none; border: none; border-bottom: 2.5px solid transparent; margin-bottom: -1.5px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12.5px; font-weight: 700; color: #BBB; transition: all .15s; white-space: nowrap; }
.sj-tab.on { color: #FF6B6B; border-bottom-color: #FF6B6B; }
.sj-tab-n { background: #F0F0F0; color: #BBB; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 10px; }
.sj-tab.on .sj-tab-n { background: #FFE5E5; color: #FF6B6B; }

.sj-sidebar-meta { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-bottom: 1.5px solid #F5F5F5; }
.sj-count-badge { background: #FF6B6B; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 800; padding: 3px 10px; border-radius: 20px; }
.sj-count-label { font-size: 12px; color: #BBB; font-weight: 600; }

.sj-list { flex: 1; overflow-y: auto; padding: 12px; }
.sj-list::-webkit-scrollbar { width: 4px; }
.sj-list::-webkit-scrollbar-thumb { background: #EEE; border-radius: 4px; }

.sj-empty { text-align: center; padding: 60px 20px; color: #CCC; font-size: 14px; }

/* Cards */
.sj-card { background: #fff; border: 1.5px solid #F0F0F0; border-radius: 16px; padding: 16px; margin-bottom: 8px; cursor: pointer; transition: all .2s; position: relative; overflow: hidden; animation: cardIn .3s ease both; }
@keyframes cardIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
.sj-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; opacity: 0; transition: opacity .2s; }
.sj-card:hover { border-color: #DDD; box-shadow: 0 6px 24px rgba(0,0,0,.08); transform: translateY(-2px); }
.sj-card:hover .sj-card-bar { opacity: 1; }
.sj-card.selected { border-color: #FF6B6B; box-shadow: 0 6px 24px #FF6B6B20; }
.sj-card.selected .sj-card-bar { opacity: 1; }

.sj-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.sj-logo { width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 800; }
.sj-card-info { flex: 1; min-width: 0; }
.sj-card-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: #222; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sj-card-company { font-size: 12px; color: #AAA; margin-top: 2px; }
.sj-remove-btn { background: none; border: none; cursor: pointer; color: #DDD; font-size: 13px; transition: all .15s; flex-shrink: 0; padding: 4px; border-radius: 6px; }
.sj-remove-btn:hover { color: #FF4444; background: #FFF0F0; }

.sj-card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
.sj-meta-loc { font-size: 11.5px; color: #AAA; }
.sj-type-badge { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 6px; border: 1px solid; }

.sj-status-chip { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #AAA; }
.sj-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.st-active   .sj-dot { background: #4CAF50; }
.st-expiring .sj-dot { background: #FF9800; }
.st-expired  .sj-dot { background: #DDD; }

.sj-card-salary { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.sj-yr { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; color: #AAA; font-weight: 400; }

.sj-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid #F5F5F5; }
.sj-dl { font-size: 11.5px; font-weight: 700; color: #AAA; }
.sj-dl.urgent { color: #E65100; }
.sj-dl.grey   { color: #CCC; }
.sj-note-icon { font-size: 14px; }

/* ── DETAIL ── */
.sj-detail { flex: 1; overflow-y: auto; background: #FAF9F6; }
.sj-detail::-webkit-scrollbar { width: 4px; }
.sj-detail::-webkit-scrollbar-thumb { background: #EEE; border-radius: 4px; }
.sj-detail-empty { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #CCC; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; }

.sj-dv { max-width: 760px; margin: 0 auto; padding: 32px 40px 80px; animation: dvIn .25s ease; }
@keyframes dvIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

.sj-dv-banner { border-radius: 20px; padding: 28px; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 20px; border: 1.5px solid #EEE; }
.sj-dv-banner-logo { width: 72px; height: 72px; border-radius: 18px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 800; }
.sj-dv-banner-text { flex: 1; }
.sj-dv-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 800; color: #111; line-height: 1.2; margin-bottom: 6px; }
.sj-dv-company { font-size: 15px; color: #888; font-weight: 500; }

.sj-dv-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.sj-dtag { font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px; border: 1.5px solid; font-family: 'Plus Jakarta Sans', sans-serif; }
.sj-dtag.loc { background: #F5F5F5; color: #888; border-color: #E8E8E8; }
.sj-dtag.st-chip { display: inline-flex; align-items: center; gap: 6px; }
.st-chip.st-active   { background: #E8F5E9; color: #2E7D32; border-color: #A5D6A7; }
.st-chip.st-expiring { background: #FFF3E0; color: #E65100; border-color: #FFCC80; }
.st-chip.st-expired  { background: #F5F5F5; color: #AAA;    border-color: #DDD; }

.sj-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
.sj-info-box { background: #F9F9F7; border-radius: 14px; padding: 14px 16px; border: 1.5px solid #EEE; }
.sj-info-box.full { grid-column: 1/-1; }
.sj-info-label { font-size: 11px; font-weight: 700; color: #AAA; margin-bottom: 6px; text-transform: uppercase; letter-spacing: .05em; }
.sj-info-val { font-size: 14px; font-weight: 700; color: #333; }
.sj-info-val.big { font-family: 'Playfair Display', serif; font-size: 26px; }
.sj-info-sub { font-size: 11px; color: #AAA; margin-top: 2px; }

.sj-dv-section { margin-bottom: 28px; }
.sj-dv-sec-head { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.sj-dv-sec-icon { font-size: 16px; }
.sj-dv-sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 800; color: #333; text-transform: uppercase; letter-spacing: .06em; }

.sj-dv-skills { display: flex; flex-wrap: wrap; gap: 8px; }
.sj-skill-chip { padding: 8px 16px; border-radius: 10px; border: 1.5px solid; font-size: 13px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; animation: chipIn .3s ease both; transition: transform .15s; }
.sj-skill-chip:hover { transform: translateY(-2px); }
@keyframes chipIn { from { opacity:0; transform:scale(.9); } to { opacity:1; transform:scale(1); } }

.sj-notes { width: 100%; padding: 12px 14px; background: #FAF9F6; border: 1.5px solid #EEE; border-radius: 12px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; color: #333; resize: vertical; outline: none; line-height: 1.7; transition: all .2s; }
.sj-notes:focus { border-color: #FF6B6B; background: #fff; box-shadow: 0 0 0 3px #FF6B6B10; }
.sj-notes::placeholder { color: #CCC; }
.sj-notes-hint { font-size: 11px; color: #CCC; margin-top: 6px; }

.sj-dv-actions { display: flex; gap: 12px; margin-top: 36px; padding-top: 24px; border-top: 1.5px solid #EEE; }

.sj-apply-btn { flex: 1; padding: 16px; border: none; border-radius: 14px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 800; color: #fff; cursor: pointer; transition: all .2s; box-shadow: 0 4px 16px rgba(0,0,0,.15); }
.sj-apply-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.2); }

.sj-remove-lg { padding: 16px 20px; background: #fff; border: 1.5px solid #EEE; border-radius: 14px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: #AAA; cursor: pointer; transition: all .2s; }
.sj-remove-lg:hover { background: #FFF0F0; border-color: #FFAAAA; color: #FF4444; }

.sj-btn-primary { padding: 12px 24px; background: #FF6B6B; border: none; border-radius: 10px; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; }

@media (max-width: 768px) {
  .sj-root { flex-direction: column; height: auto; overflow: auto; }
  .sj-sidebar { width: 100%; max-height: 50vh; }
  .sj-detail { min-height: 50vh; }
  .sj-dv { padding: 20px 16px 40px; }
  .sj-dv-banner { flex-direction: column; }
  .sj-info-grid { grid-template-columns: 1fr; }
}
`;