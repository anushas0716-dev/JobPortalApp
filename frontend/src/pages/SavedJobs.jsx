/**
 * SavedJobs.jsx — Clean Light Template
 * ─────────────────────────────────────
 * Ready-to-use template. Replace SAMPLE_JOBS with your API data.
 *
 * Includes:
 *  - Search bar
 *  - Filter tabs (All / Active / Expiring / Expired)
 *  - Sort dropdown
 *  - Grid & List view toggle
 *  - Job cards (tags, salary, skills, deadline, apply status)
 *  - Detail side panel with notes
 *  - Remove (unsave) button
 *  - Apply button with status tracking
 *  - Toast notifications
 *
 * To use with real API:
 *  - Replace SAMPLE_JOBS with: const [jobs, setJobs] = useState([]);
 *  - Fetch from GET /api/saved-jobs/ on mount
 *  - Wire removeJob() → DELETE /api/saved-jobs/<id>/
 *  - Wire applyJob()  → POST /api/applications/
 *  - Wire notes save  → PATCH /api/saved-jobs/<id>/
 */

import { useState } from "react";

// ─── SAMPLE DATA — swap with your API ────────────────────────
const SAMPLE_JOBS = [
  {
    id: 1,
    job_title: "Senior Frontend Developer",
    job_company: "Stripe",
    job_location: "Bengaluru, KA",
    job_type: "full_time",
    job_mode: "remote",
    job_salary_min: 1800000,
    job_salary_max: 2400000,
    job_deadline: "2026-03-20",
    job_status: "active",
    job_skills: ["React", "TypeScript", "GraphQL"],
    saved_at: "2026-02-20",
    notes: "",
    apply_status: null,
  },
  {
    id: 2,
    job_title: "Product Designer",
    job_company: "Figma",
    job_location: "Mumbai, MH",
    job_type: "full_time",
    job_mode: "hybrid",
    job_salary_min: 1400000,
    job_salary_max: 2000000,
    job_deadline: "2026-03-05",
    job_status: "active",
    job_skills: ["Figma", "UX Research", "Prototyping"],
    saved_at: "2026-02-22",
    notes: "Referral from Riya",
    apply_status: "applied",
  },
  {
    id: 3,
    job_title: "Backend Engineer",
    job_company: "Notion",
    job_location: "Remote",
    job_type: "full_time",
    job_mode: "remote",
    job_salary_min: 1600000,
    job_salary_max: 2200000,
    job_deadline: "2026-02-28",
    job_status: "active",
    job_skills: ["Node.js", "PostgreSQL", "Redis"],
    saved_at: "2026-02-18",
    notes: "",
    apply_status: null,
  },
  {
    id: 4,
    job_title: "Data Scientist",
    job_company: "Anthropic",
    job_location: "Hyderabad, TS",
    job_type: "full_time",
    job_mode: "on_site",
    job_salary_min: 2200000,
    job_salary_max: 3200000,
    job_deadline: "2026-04-01",
    job_status: "active",
    job_skills: ["Python", "ML", "PyTorch"],
    saved_at: "2026-02-26",
    notes: "Dream job!",
    apply_status: null,
  },
  {
    id: 5,
    job_title: "DevOps Engineer",
    job_company: "Vercel",
    job_location: "Remote",
    job_type: "contract",
    job_mode: "remote",
    job_salary_min: 1200000,
    job_salary_max: 1600000,
    job_deadline: "2026-02-10",
    job_status: "expired",
    job_skills: ["AWS", "Kubernetes", "Terraform"],
    saved_at: "2026-02-10",
    notes: "",
    apply_status: null,
  },
  {
    id: 6,
    job_title: "iOS Engineer",
    job_company: "Linear",
    job_location: "Pune, MH",
    job_type: "full_time",
    job_mode: "hybrid",
    job_salary_min: 1500000,
    job_salary_max: 2100000,
    job_deadline: "2026-03-25",
    job_status: "active",
    job_skills: ["Swift", "SwiftUI", "Xcode"],
    saved_at: "2026-02-25",
    notes: "",
    apply_status: "interview",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────
function getStatus(job) {
  if (job.job_status === "expired" || job.job_status === "closed") return "expired";
  if (!job.job_deadline) return "active";
  const days = Math.ceil((new Date(job.job_deadline) - new Date()) / 86400000);
  if (days < 0) return "expired";
  if (days <= 7) return "expiring";
  return "active";
}
function daysLeft(d) { return d ? Math.ceil((new Date(d) - new Date()) / 86400000) : null; }
function fmtSalary(min, max) {
  if (!min) return null;
  return `₹${(min / 100000).toFixed(0)}L – ₹${(max / 100000).toFixed(0)}L`;
}
function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
}
function logoLetter(n) { return (n || "?").charAt(0).toUpperCase(); }
function logoColor(n) {
  const p = ["#6366f1","#f43f5e","#0ea5e9","#8b5cf6","#f59e0b","#10b981","#ef4444","#ec4899"];
  let h = 0; for (let i = 0; i < (n||"").length; i++) h = n.charCodeAt(i) + ((h << 5) - h);
  return p[Math.abs(h) % p.length];
}

// ─── TAG STYLES ────────────────────────────────────────────────
const MODE_S = {
  remote:  { bg:"#ecfdf5", color:"#059669", label:"Remote" },
  hybrid:  { bg:"#eff6ff", color:"#2563eb", label:"Hybrid" },
  on_site: { bg:"#fff7ed", color:"#d97706", label:"On-site" },
};
const TYPE_S = {
  full_time:  { bg:"#f0fdf4", color:"#16a34a", label:"Full-time" },
  part_time:  { bg:"#fff7ed", color:"#ea580c", label:"Part-time" },
  contract:   { bg:"#fdf4ff", color:"#9333ea", label:"Contract" },
  internship: { bg:"#f0f9ff", color:"#0284c7", label:"Internship" },
};
const APPLY_S = {
  applied:   { bg:"#eff6ff", color:"#2563eb", label:"Applied" },
  interview: { bg:"#fdf4ff", color:"#9333ea", label:"Interview" },
  offered:   { bg:"#f0fdf4", color:"#16a34a", label:"Offered 🎉" },
  rejected:  { bg:"#fef2f2", color:"#dc2626", label:"Rejected" },
};
const TABS = ["All","Active","Expiring Soon","Expired"];

// ═════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═════════════════════════════════════════════════════════════
export default function SavedJobs() {
  const [jobs,     setJobs]     = useState(SAMPLE_JOBS);
  const [tab,      setTab]      = useState("All");
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("recent");
  const [view,     setView]     = useState("grid");
  const [selected, setSelected] = useState(null);
  const [toasts,   setToasts]   = useState([]);

  // Toast
  const toast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  // Remove saved job
  const removeJob = (id) => {
    setJobs(j => j.filter(x => x.id !== id));
    if (selected?.id === id) setSelected(null);
    toast("Job removed from saved list");
    // TODO: await apiFetch(`/saved-jobs/${id}/`, { method: "DELETE" });
  };

  // Mark as applied
  const applyJob = (id) => {
    setJobs(j => j.map(x => x.id === id ? { ...x, apply_status: "applied" } : x));
    if (selected?.id === id) setSelected(s => ({ ...s, apply_status: "applied" }));
    toast("Application submitted! ✓");
    // TODO: await apiFetch(`/applications/`, { method: "POST", body: JSON.stringify({ job: id }) });
  };

  // Save notes
  const saveNotes = (id, notes) => {
    setJobs(j => j.map(x => x.id === id ? { ...x, notes } : x));
    if (selected?.id === id) setSelected(s => ({ ...s, notes }));
    // TODO: await apiFetch(`/saved-jobs/${id}/`, { method: "PATCH", body: JSON.stringify({ notes }) });
  };

  // Filter + sort
  const visible = jobs
    .filter(j => {
      const s = getStatus(j);
      if (tab === "Active"         && s !== "active")   return false;
      if (tab === "Expiring Soon"  && s !== "expiring") return false;
      if (tab === "Expired"        && s !== "expired")  return false;
      const q = search.toLowerCase();
      if (!q) return true;
      return (
        (j.job_title   || "").toLowerCase().includes(q) ||
        (j.job_company || "").toLowerCase().includes(q) ||
        (j.job_skills  || []).some(s => s.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "recent")   return new Date(b.saved_at) - new Date(a.saved_at);
      if (sort === "deadline") return new Date(a.job_deadline || "9999") - new Date(b.job_deadline || "9999");
      if (sort === "salary")   return (b.job_salary_max || 0) - (a.job_salary_max || 0);
      return 0;
    });

  const counts = {
    "All":           jobs.length,
    "Active":        jobs.filter(j => getStatus(j) === "active").length,
    "Expiring Soon": jobs.filter(j => getStatus(j) === "expiring").length,
    "Expired":       jobs.filter(j => getStatus(j) === "expired").length,
  };

  return (
    <>
      <style>{CSS}</style>

      {/* Toasts */}
      <div className="sj-toasts">
        {toasts.map(t => (
          <div key={t.id} className={`sj-toast sj-toast-${t.type}`}>{t.msg}</div>
        ))}
      </div>

      <div className="sj-page">

        {/* ── Header ── */}
        <div className="sj-header">
          <div className="sj-header-left">
            <h1 className="sj-title">Saved Jobs</h1>
            <span className="sj-total-badge">{jobs.length} saved</span>
          </div>
          <div className="sj-view-toggle">
            <button className={`sj-vbtn ${view === "grid" ? "on" : ""}`} onClick={() => setView("grid")} title="Grid">⊞</button>
            <button className={`sj-vbtn ${view === "list" ? "on" : ""}`} onClick={() => setView("list")} title="List">☰</button>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="sj-toolbar">
          <div className="sj-search-wrap">
            <span className="sj-search-ico">🔍</span>
            <input
              className="sj-search"
              placeholder="Search title, company or skill…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="sj-search-x" onClick={() => setSearch("")}>✕</button>}
          </div>
          <select className="sj-sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recent">Recently Saved</option>
            <option value="deadline">By Deadline</option>
            <option value="salary">By Salary</option>
          </select>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="sj-tabs">
          {TABS.map(t => (
            <button key={t} className={`sj-tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
              {t}
              <span className="sj-tab-n">{counts[t]}</span>
            </button>
          ))}
          <span className="sj-result-count">{visible.length} result{visible.length !== 1 ? "s" : ""}</span>
        </div>

        {/* ── Body ── */}
        <div className="sj-body">

          {/* Cards */}
          <div className="sj-cards-wrap">
            {visible.length === 0 ? (
              <div className="sj-empty">
                <div className="sj-empty-ico">🔖</div>
                <h3>{search ? "No results found" : "No saved jobs yet"}</h3>
                <p>{search ? "Try different keywords" : "Browse jobs and bookmark ones you like"}</p>
              </div>
            ) : (
              <div className={view === "grid" ? "sj-grid" : "sj-list"}>
                {visible.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    selected={selected?.id === job.id}
                    listMode={view === "list"}
                    onClick={() => setSelected(job)}
                    onRemove={() => removeJob(job.id)}
                    onApply={() => applyJob(job.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <DetailPanel
              job={selected}
              onClose={() => setSelected(null)}
              onRemove={() => removeJob(selected.id)}
              onApply={() => applyJob(selected.id)}
              onSaveNotes={(notes) => saveNotes(selected.id, notes)}
            />
          )}

        </div>
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════════
//  JOB CARD
// ═════════════════════════════════════════════════════════════
function JobCard({ job, selected, listMode, onClick, onRemove, onApply }) {
  const status  = getStatus(job);
  const days    = daysLeft(job.job_deadline);
  const salary  = fmtSalary(job.job_salary_min, job.job_salary_max);
  const modeTag = MODE_S[job.job_mode] || { bg:"#f3f4f6", color:"#6b7280", label: job.job_mode };
  const typeTag = TYPE_S[job.job_type] || { bg:"#f3f4f6", color:"#6b7280", label: job.job_type };
  const appTag  = APPLY_S[job.apply_status];
  const applied = !!job.apply_status;
  const expired = status === "expired";

  return (
    <div
      className={`sj-card ${selected ? "selected" : ""} ${listMode ? "list" : ""}`}
      onClick={onClick}
    >
      {/* Top row */}
      <div className="sj-card-top">
        <div className="sj-logo" style={{ background: logoColor(job.job_company) }}>
          {logoLetter(job.job_company)}
        </div>
        <div className="sj-card-titles">
          <div className="sj-job-title">{job.job_title}</div>
          <div className="sj-job-company">{job.job_company} · {job.job_location}</div>
        </div>
        <button className="sj-x-btn" title="Remove" onClick={e => { e.stopPropagation(); onRemove(); }}>✕</button>
      </div>

      {/* Tag row */}
      <div className="sj-tag-row">
        <span className="sj-tag" style={{ background: typeTag.bg, color: typeTag.color }}>{typeTag.label}</span>
        <span className="sj-tag" style={{ background: modeTag.bg, color: modeTag.color }}>{modeTag.label}</span>
        <span className={`sj-status-chip st-${status}`}>
          <i className="sj-dot" />
          {status === "expiring" ? "Expiring soon" : status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {appTag && <span className="sj-tag" style={{ background: appTag.bg, color: appTag.color }}>{appTag.label}</span>}
      </div>

      {/* Grid-only info */}
      {!listMode && (
        <>
          {salary && <div className="sj-salary">{salary}<span className="sj-pa"> / yr</span></div>}
          <div className="sj-skills">
            {(job.job_skills || []).slice(0, 3).map(s => <span key={s} className="sj-skill">{s}</span>)}
            {(job.job_skills || []).length > 3 && <span className="sj-skill faded">+{job.job_skills.length - 3}</span>}
          </div>
          {job.notes && <div className="sj-note-chip">📝 {job.notes}</div>}
        </>
      )}

      {/* Footer */}
      <div className="sj-card-footer">
        <span className={`sj-dl ${status === "expiring" ? "urgent" : status === "expired" ? "grey" : ""}`}>
          {expired ? "Closed" : days !== null ? (days <= 0 ? "Past deadline" : `${days}d left`) : fmtDate(job.job_deadline)}
        </span>
        <button
          className={`sj-apply ${applied ? "applied" : expired ? "disabled" : ""}`}
          disabled={applied || expired}
          onClick={e => { e.stopPropagation(); if (!applied && !expired) onApply(); }}
        >
          {applied ? (appTag?.label || "Applied") : expired ? "Closed" : "Apply →"}
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  DETAIL PANEL
// ═════════════════════════════════════════════════════════════
function DetailPanel({ job, onClose, onRemove, onApply, onSaveNotes }) {
  const [notes, setNotes] = useState(job.notes || "");
  const status  = getStatus(job);
  const days    = daysLeft(job.job_deadline);
  const salary  = fmtSalary(job.job_salary_min, job.job_salary_max);
  const modeTag = MODE_S[job.job_mode] || { bg:"#f3f4f6", color:"#6b7280", label: job.job_mode };
  const typeTag = TYPE_S[job.job_type] || { bg:"#f3f4f6", color:"#6b7280", label: job.job_type };
  const appTag  = APPLY_S[job.apply_status];
  const applied = !!job.apply_status;
  const expired = status === "expired";

  return (
    <aside className="sj-panel">

      {/* Panel header */}
      <div className="sj-panel-head">
        <button className="sj-panel-close" onClick={onClose}>✕</button>
        <div className="sj-panel-logo" style={{ background: logoColor(job.job_company) }}>
          {logoLetter(job.job_company)}
        </div>
        <h2 className="sj-panel-title">{job.job_title}</h2>
        <p className="sj-panel-company">{job.job_company}</p>
        {job.job_location && <p className="sj-panel-loc">📍 {job.job_location}</p>}
        <div className="sj-tag-row mt8">
          <span className="sj-tag" style={{ background: typeTag.bg, color: typeTag.color }}>{typeTag.label}</span>
          <span className="sj-tag" style={{ background: modeTag.bg, color: modeTag.color }}>{modeTag.label}</span>
          {appTag && <span className="sj-tag" style={{ background: appTag.bg, color: appTag.color }}>{appTag.label}</span>}
        </div>
      </div>

      {/* Panel body */}
      <div className="sj-panel-body">

        {/* Info boxes */}
        <div className="sj-info-grid">
          {salary && (
            <div className="sj-info-box full">
              <div className="sj-info-label">Salary Range</div>
              <div className="sj-info-val big">{salary} / year</div>
            </div>
          )}
          <div className="sj-info-box">
            <div className="sj-info-label">Deadline</div>
            <div className="sj-info-val" style={{ color: status === "expiring" ? "#dc2626" : status === "expired" ? "#ccc" : "#333" }}>
              {expired ? "Closed" : days !== null ? (days <= 0 ? "Past" : `${days} days left`) : fmtDate(job.job_deadline)}
            </div>
          </div>
          <div className="sj-info-box">
            <div className="sj-info-label">Saved On</div>
            <div className="sj-info-val">{fmtDate(job.saved_at)}</div>
          </div>
        </div>

        {/* Skills */}
        {(job.job_skills || []).length > 0 && (
          <div className="sj-panel-sec">
            <div className="sj-sec-label">Required Skills</div>
            <div className="sj-skills">
              {job.job_skills.map(s => <span key={s} className="sj-skill">{s}</span>)}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="sj-panel-sec">
          <div className="sj-sec-label">My Notes</div>
          <textarea
            className="sj-notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            onBlur={() => onSaveNotes(notes)}
            placeholder="Add notes, reminders, or interview tips…"
            rows={3}
          />
          <div className="sj-notes-hint">Auto-saves when you click away</div>
        </div>

      </div>

      {/* Panel footer */}
      <div className="sj-panel-footer">
        <button
          className={`sj-apply-lg ${applied ? "applied" : expired ? "disabled" : ""}`}
          disabled={applied || expired}
          onClick={() => { if (!applied && !expired) onApply(); }}
        >
          {applied ? (appTag?.label || "✓ Applied") : expired ? "Position Closed" : "Apply Now →"}
        </button>
        <button className="sj-remove-lg" onClick={onRemove}>
          🗑 Remove from Saved
        </button>
      </div>

    </aside>
  );
}

// ═════════════════════════════════════════════════════════════
//  STYLES
// ═════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Nunito:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Nunito', sans-serif; background: #f7f6f2; color: #111; }

/* Toasts */
.sj-toasts { position:fixed; top:18px; right:18px; z-index:9999; display:flex; flex-direction:column; gap:8px; }
.sj-toast {
  padding:11px 18px; border-radius:10px; font-family:'Nunito',sans-serif;
  font-size:13.5px; font-weight:700; animation:toastIn .25s ease;
  box-shadow:0 4px 16px rgba(0,0,0,.08);
}
.sj-toast-success { background:#fff; color:#16a34a; border:1.5px solid #bbf7d0; }
.sj-toast-error   { background:#fff; color:#dc2626; border:1.5px solid #fecaca; }
@keyframes toastIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }

/* Page */
.sj-page { max-width:1200px; margin:0 auto; padding:32px 28px 60px; min-height:100vh; }

/* Header */
.sj-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
.sj-header-left { display:flex; align-items:baseline; gap:12px; }
.sj-title { font-family:'DM Serif Display',serif; font-size:30px; font-weight:400; color:#111; letter-spacing:-.3px; }
.sj-total-badge { background:#ece9e3; color:#999; font-size:12.5px; font-weight:800; padding:3px 11px; border-radius:20px; }
.sj-view-toggle { display:flex; background:#ece9e3; padding:4px; border-radius:10px; gap:3px; }
.sj-vbtn { width:34px; height:34px; border:none; background:transparent; border-radius:7px; font-size:17px; cursor:pointer; color:#bbb; transition:all .15s; display:flex; align-items:center; justify-content:center; }
.sj-vbtn.on { background:#fff; color:#111; box-shadow:0 1px 4px rgba(0,0,0,.1); }

/* Toolbar */
.sj-toolbar { display:flex; gap:10px; margin-bottom:16px; }
.sj-search-wrap { flex:1; position:relative; min-width:200px; }
.sj-search-ico { position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:14px; pointer-events:none; }
.sj-search {
  width:100%; padding:11px 36px; background:#fff; border:1.5px solid #e5e1da;
  border-radius:11px; font-family:'Nunito',sans-serif; font-size:14px; color:#111;
  outline:none; transition:border-color .15s;
}
.sj-search:focus { border-color:#c9a96e; }
.sj-search::placeholder { color:#bbb; }
.sj-search-x { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:#bbb; cursor:pointer; font-size:12px; }
.sj-sort {
  padding:11px 14px; background:#fff; border:1.5px solid #e5e1da; border-radius:11px;
  font-family:'Nunito',sans-serif; font-size:13.5px; color:#555; outline:none; cursor:pointer; min-width:160px;
}

/* Tabs */
.sj-tabs { display:flex; align-items:center; gap:2px; border-bottom:1.5px solid #e5e1da; margin-bottom:24px; }
.sj-tab {
  display:flex; align-items:center; gap:7px; padding:11px 16px;
  background:none; border:none; border-bottom:2.5px solid transparent; margin-bottom:-1.5px;
  cursor:pointer; font-family:'Nunito',sans-serif; font-size:14px; font-weight:700;
  color:#bbb; transition:all .15s; white-space:nowrap;
}
.sj-tab.on { color:#111; border-bottom-color:#c9a96e; }
.sj-tab:hover:not(.on) { color:#666; }
.sj-tab-n { background:#eee; color:#bbb; font-size:11px; font-weight:800; padding:2px 7px; border-radius:20px; }
.sj-tab.on .sj-tab-n { background:#fef3c7; color:#c9a96e; }
.sj-result-count { margin-left:auto; font-size:12.5px; color:#ccc; font-weight:600; }

/* Body layout */
.sj-body { display:flex; gap:20px; align-items:flex-start; }
.sj-cards-wrap { flex:1; min-width:0; }

/* Grid / List */
.sj-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(282px,1fr)); gap:14px; }
.sj-list { display:flex; flex-direction:column; gap:10px; }

/* Empty */
.sj-empty { text-align:center; padding:80px 20px; color:#bbb; }
.sj-empty-ico { font-size:46px; margin-bottom:14px; opacity:.4; }
.sj-empty h3 { font-family:'DM Serif Display',serif; font-size:20px; color:#999; margin-bottom:6px; }
.sj-empty p { font-size:14px; }

/* Job card */
.sj-card {
  background:#fff; border:1.5px solid #e8e4de; border-radius:14px; padding:18px;
  cursor:pointer; transition:all .2s; position:relative; overflow:hidden;
}
.sj-card::before {
  content:''; position:absolute; inset:0 0 auto 0; height:3px;
  border-radius:14px 14px 0 0; background:transparent; transition:background .2s;
}
.sj-card:hover { border-color:#c9a96e; box-shadow:0 4px 22px rgba(201,169,110,.14); transform:translateY(-1px); }
.sj-card:hover::before { background:linear-gradient(90deg,#c9a96e,#f0d79a); }
.sj-card.selected { border-color:#c9a96e; background:#fffdf8; box-shadow:0 4px 22px rgba(201,169,110,.18); }
.sj-card.selected::before { background:linear-gradient(90deg,#c9a96e,#f0d79a); }

/* List mode */
.sj-card.list { display:flex; align-items:center; gap:14px; padding:14px 18px; }
.sj-card.list .sj-card-top { margin-bottom:0; flex:1; }
.sj-card.list .sj-tag-row { margin-bottom:0; }
.sj-card.list .sj-card-footer { margin-top:0; padding-top:0; border-top:none; flex-shrink:0; }

.sj-card-top { display:flex; align-items:flex-start; gap:12px; margin-bottom:12px; }
.sj-logo { width:44px; height:44px; border-radius:11px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:'DM Serif Display',serif; font-size:19px; color:#fff; }
.sj-card-titles { flex:1; min-width:0; }
.sj-job-title { font-family:'DM Serif Display',serif; font-size:15px; color:#111; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; line-height:1.3; }
.sj-job-company { font-size:12.5px; color:#aaa; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sj-x-btn { background:none; border:none; cursor:pointer; color:#ddd; font-size:13px; padding:3px 5px; border-radius:5px; transition:all .15s; flex-shrink:0; line-height:1; }
.sj-x-btn:hover { color:#ef4444; background:#fef2f2; }

.sj-tag-row { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:10px; align-items:center; }
.sj-tag-row.mt8 { margin-top:8px; margin-bottom:0; }
.sj-tag { font-size:11px; font-weight:800; padding:3px 9px; border-radius:6px; white-space:nowrap; }

.sj-status-chip { display:flex; align-items:center; gap:4px; font-size:11.5px; font-weight:700; color:#aaa; }
.sj-dot { width:6px; height:6px; border-radius:50%; display:inline-block; flex-shrink:0; }
.st-active   .sj-dot { background:#22c55e; }
.st-expiring .sj-dot { background:#f59e0b; }
.st-expired  .sj-dot { background:#d1d5db; }

.sj-salary { font-family:'DM Serif Display',serif; font-size:17px; color:#111; margin-bottom:8px; }
.sj-pa { font-family:'Nunito',sans-serif; font-size:11px; color:#aaa; font-weight:400; }
.sj-skills { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:10px; }
.sj-skill { background:#f5f3ef; color:#666; font-size:11.5px; font-weight:700; padding:3px 10px; border-radius:6px; border:1px solid #e8e4de; }
.sj-skill.faded { color:#bbb; }
.sj-note-chip { font-size:11.5px; color:#aaa; background:#f9f7f3; padding:6px 10px; border-radius:7px; margin-bottom:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

.sj-card-footer { display:flex; align-items:center; justify-content:space-between; padding-top:12px; border-top:1.5px solid #f0ece6; }
.sj-dl { font-size:12px; font-weight:700; color:#aaa; }
.sj-dl.urgent { color:#dc2626; }
.sj-dl.grey   { color:#d1d5db; }

.sj-apply {
  padding:7px 16px; border-radius:8px; border:none; cursor:pointer;
  font-family:'Nunito',sans-serif; font-size:13px; font-weight:800;
  background:#111; color:#fff; transition:all .15s;
}
.sj-apply:hover:not(:disabled) { background:#333; }
.sj-apply.applied  { background:#f0fdf4; color:#16a34a; cursor:default; border:1.5px solid #bbf7d0; }
.sj-apply.disabled { background:#f5f3ef; color:#ccc; cursor:not-allowed; }

/* Detail panel */
.sj-panel {
  width:340px; flex-shrink:0; background:#fff; border:1.5px solid #e8e4de; border-radius:16px;
  position:sticky; top:24px; max-height:calc(100vh - 80px); display:flex; flex-direction:column;
  box-shadow:0 8px 32px rgba(0,0,0,.07); overflow:hidden;
}
.sj-panel-head { padding:22px 20px 16px; border-bottom:1.5px solid #f0ece6; background:#fffdf8; position:relative; }
.sj-panel-close { position:absolute; top:14px; right:14px; background:#f0ece6; border:none; color:#aaa; cursor:pointer; width:26px; height:26px; border-radius:6px; font-size:12px; display:flex; align-items:center; justify-content:center; transition:all .15s; }
.sj-panel-close:hover { background:#e5e1da; color:#111; }
.sj-panel-logo { width:50px; height:50px; border-radius:12px; margin-bottom:12px; display:flex; align-items:center; justify-content:center; font-family:'DM Serif Display',serif; font-size:22px; color:#fff; }
.sj-panel-title { font-family:'DM Serif Display',serif; font-size:19px; color:#111; line-height:1.25; margin-bottom:4px; }
.sj-panel-company { font-size:13px; color:#aaa; }
.sj-panel-loc { font-size:12px; color:#bbb; margin-top:3px; }

.sj-panel-body { flex:1; overflow-y:auto; padding:18px 20px; display:flex; flex-direction:column; gap:18px; }
.sj-panel-body::-webkit-scrollbar { width:4px; }
.sj-panel-body::-webkit-scrollbar-thumb { background:#e8e4de; border-radius:4px; }

.sj-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.sj-info-box { background:#f7f6f2; border-radius:9px; padding:11px 13px; }
.sj-info-box.full { grid-column:1/-1; }
.sj-info-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.07em; color:#ccc; margin-bottom:4px; }
.sj-info-val { font-size:13.5px; font-weight:700; color:#333; }
.sj-info-val.big { font-family:'DM Serif Display',serif; font-size:16px; color:#111; }

.sj-panel-sec { display:flex; flex-direction:column; gap:8px; }
.sj-sec-label { font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:.07em; color:#ccc; }

.sj-notes {
  width:100%; padding:11px 13px; background:#f7f6f2; border:1.5px solid #e8e4de;
  border-radius:9px; font-family:'Nunito',sans-serif; font-size:13px; color:#111;
  resize:vertical; outline:none; line-height:1.6; transition:border-color .15s;
}
.sj-notes:focus { border-color:#c9a96e; background:#fff; }
.sj-notes::placeholder { color:#ccc; }
.sj-notes-hint { font-size:11px; color:#ccc; }

.sj-panel-footer { padding:14px 20px; border-top:1.5px solid #f0ece6; display:flex; flex-direction:column; gap:8px; }

.sj-apply-lg {
  width:100%; padding:12px; border:none; border-radius:11px; cursor:pointer;
  font-family:'Nunito',sans-serif; font-size:14px; font-weight:800;
  background:#111; color:#fff; transition:background .15s;
}
.sj-apply-lg:hover:not(:disabled) { background:#333; }
.sj-apply-lg.applied  { background:#f0fdf4; color:#16a34a; cursor:default; border:1.5px solid #bbf7d0; }
.sj-apply-lg.disabled { background:#f5f3ef; color:#ccc; cursor:not-allowed; }

.sj-remove-lg {
  width:100%; padding:10px; background:#f7f6f2; border:1.5px solid #e8e4de; border-radius:11px;
  cursor:pointer; font-family:'Nunito',sans-serif; font-size:13.5px; font-weight:700; color:#aaa; transition:all .15s;
}
.sj-remove-lg:hover { background:#fef2f2; border-color:#fecaca; color:#dc2626; }

@media (max-width:860px) {
  .sj-page { padding:20px 16px 40px; }
  .sj-panel { display:none; }
  .sj-grid { grid-template-columns:1fr; }
}
`;