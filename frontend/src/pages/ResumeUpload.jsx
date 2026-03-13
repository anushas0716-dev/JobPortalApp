/**
 * ResumeUpload.jsx — Connected to Real Django API
 * ─────────────────────────────────────────────────
 * API Endpoints used:
 *  GET    /api/resumes/                  → list resumes
 *  POST   /api/resumes/                  → upload resume
 *  PATCH  /api/resumes/<id>/set-default/ → set as default
 *  DELETE /api/resumes/<id>/             → delete resume
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ── CONFIG ─────────────────────────────────────────────────────
const BASE_URL = "http://127.0.0.1:8000";

// Gets JWT token from localStorage (stored during login)
function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function ResumeUpload() {
  const [resumes,   setResumes]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver,  setDragOver]  = useState(false);
  const [title,     setTitle]     = useState("");
  const [preview,   setPreview]   = useState(null);
  const [toasts,    setToasts]    = useState([]);
  const [error,     setError]     = useState(null);
  const fileRef = useRef();

  // ── Toast notification ──────────────────────────────────────
  const toast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  // ── FETCH all resumes from Django API ───────────────────────
  const fetchResumes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/resumes/`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setResumes(Array.isArray(data) ? data : data.results ?? []);
    } catch (e) {
      setError(e.message);
      toast("Failed to load resumes", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchResumes(); }, [fetchResumes]);

  // ── Validate file before upload ─────────────────────────────
  const handleFileSelect = (file) => {
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      toast("Only PDF, DOC or DOCX files allowed", "error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast("File must be under 10MB", "error");
      return;
    }
    setPreview(file);
    if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
  };

  // ── UPLOAD resume to Django API ─────────────────────────────
  const handleUpload = async () => {
    if (!preview) {
      toast("Please select a file first", "error");
      return;
    }
    setUploading(true);
    try {
      // Use FormData for file upload — DO NOT set Content-Type manually
      const fd = new FormData();
      fd.append("file", preview);
      fd.append("title", title || preview.name);

      const res = await fetch(`${BASE_URL}/api/resumes/`, {
        method: "POST",
        headers: authHeaders(), // only Authorization, no Content-Type
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err.detail ||
          Object.values(err).flat().join(" ") ||
          `Upload failed (${res.status})`
        );
      }

      const created = await res.json();
      setResumes(p => [created, ...p]);
      setPreview(null);
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
      toast("Resume uploaded successfully! ✓");
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setUploading(false);
    }
  };

  // ── SET DEFAULT resume ──────────────────────────────────────
  const handleSetDefault = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/resumes/${id}/set-default/`, {
        method: "PATCH",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setResumes(p => p.map(r => ({ ...r, is_default: r.id === id })));
      toast("Set as default resume!");
    } catch (e) {
      toast(e.message, "error");
    }
  };

  // ── DELETE resume ───────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/resumes/${id}/`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setResumes(p => p.filter(r => r.id !== id));
      toast("Resume deleted");
    } catch (e) {
      toast(e.message, "error");
    }
  };

  // ── Drag & Drop handlers ────────────────────────────────────
  const onDragOver  = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);
  const onDrop      = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  return (
    <>
      <style>{CSS}</style>

      {/* Toasts */}
      <div className="ru-toasts">
        {toasts.map(t => (
          <div key={t.id} className={`ru-toast ru-toast-${t.type}`}>{t.msg}</div>
        ))}
      </div>

      <div className="ru-page">

        {/* ── Page Header ── */}
        <div className="ru-header">
          <div className="ru-header-left">
            <div className="ru-header-icon">📄</div>
            <div>
              <h1 className="ru-title">My Resumes</h1>
              <p className="ru-subtitle">Upload and manage resumes to send to HR</p>
            </div>
          </div>
          <div className="ru-stats">
            <div className="ru-stat">
              <div className="ru-stat-n">{resumes.length}</div>
              <div className="ru-stat-l">Total</div>
            </div>
            <div className="ru-stat">
              <div className="ru-stat-n">{resumes.filter(r => r.is_default).length}</div>
              <div className="ru-stat-l">Default</div>
            </div>
          </div>
        </div>

        <div className="ru-body">

          {/* ── LEFT: Upload Panel ── */}
          <div className="ru-upload-panel">
            <h2 className="ru-panel-title">Upload New Resume</h2>

            {/* Drag & Drop Zone */}
            <div
              className={`ru-dropzone ${dragOver ? "drag-over" : ""} ${preview ? "has-file" : ""}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => !preview && fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={e => handleFileSelect(e.target.files[0])}
              />
              {preview ? (
                <div className="ru-file-preview">
                  <div className="ru-file-icon">
                    {preview.name.endsWith(".pdf") ? "📕" : "📘"}
                  </div>
                  <div className="ru-file-info">
                    <div className="ru-file-name">{preview.name}</div>
                    <div className="ru-file-size">
                      {(preview.size / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  <button
                    className="ru-file-remove"
                    onClick={e => {
                      e.stopPropagation();
                      setPreview(null);
                      setTitle("");
                    }}
                  >✕</button>
                </div>
              ) : (
                <>
                  <div className="ru-drop-icon">⬆️</div>
                  <div className="ru-drop-title">Drag & drop your resume here</div>
                  <div className="ru-drop-sub">or click to browse files</div>
                  <div className="ru-drop-hint">PDF, DOC, DOCX · Max 10MB</div>
                </>
              )}
            </div>

            {/* Title Input */}
            <div className="ru-field">
              <label className="ru-label">Resume Title</label>
              <input
                className="ru-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Software Engineer Resume"
              />
            </div>

            {/* Upload Button */}
            <button
              className="ru-upload-btn"
              onClick={handleUpload}
              disabled={!preview || uploading}
            >
              {uploading
                ? <><span className="ru-spin">⟳</span> Uploading…</>
                : "Upload Resume →"
              }
            </button>

            {/* Tips */}
            <div className="ru-tips">
              <div className="ru-tips-title">💡 Tips</div>
              <ul className="ru-tips-list">
                <li>Use PDF format for best compatibility</li>
                <li>Keep resume under 2 pages</li>
                <li>Set one resume as Default for quick apply</li>
              </ul>
            </div>
          </div>

          {/* ── RIGHT: Resume List ── */}
          <div className="ru-list-panel">
            <div className="ru-list-header">
              <h2 className="ru-panel-title">Uploaded Resumes</h2>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span className="ru-count">
                  {resumes.length} file{resumes.length !== 1 ? "s" : ""}
                </span>
                <button className="ru-refresh-btn" onClick={fetchResumes}>
                  ↻ Refresh
                </button>
              </div>
            </div>

            {/* Loading skeletons */}
            {loading ? (
              <div className="ru-skels">
                {[1,2,3].map(i => <div key={i} className="ru-skel" />)}
              </div>

            /* Error state */
            ) : error ? (
              <div className="ru-empty">
                <div className="ru-empty-icon">⚠️</div>
                <h3>Failed to load resumes</h3>
                <p>{error}</p>
                <button
                  className="ru-upload-btn"
                  style={{ marginTop:14 }}
                  onClick={fetchResumes}
                >↻ Retry</button>
              </div>

            /* Empty state */
            ) : resumes.length === 0 ? (
              <div className="ru-empty">
                <div className="ru-empty-icon">📭</div>
                <h3>No resumes uploaded yet</h3>
                <p>Upload your first resume using the panel on the left</p>
              </div>

            /* Resume cards */
            ) : (
              <div className="ru-list">
                {resumes.map(resume => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onSetDefault={() => handleSetDefault(resume.id)}
                    onDelete={() => handleDelete(resume.id)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
//  RESUME CARD
// ═══════════════════════════════════════════════════════════════
function ResumeCard({ resume, onSetDefault, onDelete }) {
  const isPDF = (resume.file || "").toLowerCase().endsWith(".pdf") ||
                (resume.title || "").toLowerCase().includes("pdf");

  function fmtDate(d) {
    return d ? new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    }) : "—";
  }

  return (
    <div className={`ru-card ${resume.is_default ? "default" : ""}`}>
      <div className="ru-card-left">
        <div className="ru-card-icon">{isPDF ? "📕" : "📘"}</div>
        <div className="ru-card-info">
          <div className="ru-card-title">
            {resume.title || "Resume"}
            {resume.is_default && (
              <span className="ru-default-badge">⭐ Default</span>
            )}
          </div>
          <div className="ru-card-meta">
            {resume.file_size && <span>{resume.file_size}</span>}
            {resume.file_size && <span>·</span>}
            <span>Uploaded {fmtDate(resume.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="ru-card-actions">
        {/* View */}
        {resume.file_url && (
          <a
            className="ru-action-btn"
            href={resume.file_url}
            target="_blank"
            rel="noreferrer"
          >👁 View</a>
        )}
        {/* Set Default */}
        {!resume.is_default && (
          <button className="ru-action-btn" onClick={onSetDefault}>
            ⭐ Set Default
          </button>
        )}
        {/* Delete */}
        <button className="ru-action-btn danger" onClick={onDelete}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'Nunito',sans-serif; background:#f3f5f7; color:#111827; }

.ru-toasts { position:fixed; top:18px; right:18px; z-index:9999; display:flex; flex-direction:column; gap:8px; }
.ru-toast { padding:11px 18px; border-radius:10px; font-size:13.5px; font-weight:700; animation:toastIn .25s ease; box-shadow:0 4px 16px rgba(0,0,0,.08); }
.ru-toast-success { background:#fff; color:#16a34a; border:1.5px solid #bbf7d0; }
.ru-toast-error   { background:#fff; color:#dc2626; border:1.5px solid #fecaca; }
@keyframes toastIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }

.ru-page { max-width:1100px; margin:0 auto; padding:32px 28px 60px; min-height:100vh; }
.ru-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:16px; }
.ru-header-left { display:flex; align-items:center; gap:14px; }
.ru-header-icon { font-size:36px; }
.ru-title { font-family:'Fraunces',serif; font-size:28px; color:#111827; letter-spacing:-.3px; }
.ru-subtitle { font-size:13px; color:#6b7280; margin-top:3px; }
.ru-stats { display:flex; gap:10px; }
.ru-stat { background:#fff; border:1.5px solid #e5e7eb; border-radius:12px; padding:12px 20px; text-align:center; min-width:80px; }
.ru-stat-n { font-family:'Fraunces',serif; font-size:22px; color:#111827; }
.ru-stat-l { font-size:11px; color:#6b7280; font-weight:700; text-transform:uppercase; letter-spacing:.05em; margin-top:2px; }

.ru-body { display:flex; gap:20px; align-items:flex-start; }

.ru-upload-panel { width:320px; flex-shrink:0; background:#fff; border:1.5px solid #e5e7eb; border-radius:16px; padding:22px; display:flex; flex-direction:column; gap:18px; position:sticky; top:24px; }
.ru-panel-title { font-family:'Fraunces',serif; font-size:18px; color:#111827; }

.ru-dropzone { border:2px dashed #e5e7eb; border-radius:13px; padding:28px 20px; text-align:center; cursor:pointer; transition:all .2s; background:#f8fafc; display:flex; flex-direction:column; align-items:center; gap:8px; min-height:160px; justify-content:center; }
.ru-dropzone:hover,.ru-dropzone.drag-over { border-color:#ff6b35; background:#fff7ed; }
.ru-dropzone.has-file { cursor:default; border-style:solid; border-color:#ff6b35; background:#fff7ed; }
.ru-drop-icon { font-size:32px; }
.ru-drop-title { font-family:'Fraunces',serif; font-size:15px; color:#111827; }
.ru-drop-sub { font-size:13px; color:#6b7280; }
.ru-drop-hint { font-size:11.5px; color:#9ca3af; background:#fff7ed; padding:4px 12px; border-radius:20px; }

.ru-file-preview { display:flex; align-items:center; gap:12px; width:100%; text-align:left; }
.ru-file-icon { font-size:32px; flex-shrink:0; }
.ru-file-info { flex:1; min-width:0; }
.ru-file-name { font-size:13.5px; font-weight:700; color:#111827; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ru-file-size { font-size:12px; color:#6b7280; margin-top:2px; }
.ru-file-remove { background:#fef2f2; border:none; color:#ef4444; cursor:pointer; width:26px; height:26px; border-radius:6px; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

.ru-field { display:flex; flex-direction:column; gap:6px; }
.ru-label { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; }
.ru-input { padding:11px 13px; background:#f8fafc; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'Nunito',sans-serif; font-size:13.5px; color:#111827; outline:none; transition:border-color .15s; }
.ru-input:focus { border-color:#ff6b35; background:#fff; }
.ru-input::placeholder { color:#cbd5e1; }

.ru-upload-btn { width:100%; padding:13px; background:#ff6b35; color:#fff; border:none; border-radius:11px; cursor:pointer; font-family:'Nunito',sans-serif; font-size:14px; font-weight:800; transition:background .15s; display:flex; align-items:center; justify-content:center; gap:8px; }
.ru-upload-btn:hover:not(:disabled) { background:#ea580c; }
.ru-upload-btn:disabled { background:#e8e4de; color:#bbb; cursor:not-allowed; }
.ru-spin { display:inline-block; animation:spin .7s linear infinite; }
@keyframes spin { to{transform:rotate(360deg)} }

.ru-tips { background:#fff7ed; border:1.5px solid #fed7aa; border-radius:11px; padding:14px 16px; }
.ru-tips-title { font-size:13px; font-weight:800; color:#7c2d12; margin-bottom:8px; }
.ru-tips-list { list-style:none; display:flex; flex-direction:column; gap:6px; }
.ru-tips-list li { font-size:12.5px; color:#6b7280; padding-left:14px; position:relative; }
.ru-tips-list li::before { content:'→'; position:absolute; left:0; color:#ff6b35; }

.ru-list-panel { flex:1; min-width:0; }
.ru-list-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.ru-count { background:#fff7ed; color:#c2410c; font-size:12px; font-weight:800; padding:3px 10px; border-radius:20px; }
.ru-refresh-btn { background:none; border:1.5px solid #e5e7eb; padding:5px 12px; border-radius:8px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; color:#6b7280; cursor:pointer; transition:all .15s; }
.ru-refresh-btn:hover { border-color:#ff6b35; color:#ff6b35; }

.ru-skels { display:flex; flex-direction:column; gap:10px; }
.ru-skel { height:90px; background:linear-gradient(90deg,#f1f5f9 25%,#ffffff 50%,#f1f5f9 75%); background-size:200% 100%; border-radius:13px; animation:shimmer 1.4s infinite; }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

.ru-empty { text-align:center; padding:60px 20px; color:#9ca3af; }
.ru-empty-icon { font-size:44px; margin-bottom:12px; opacity:.4; }
.ru-empty h3 { font-family:'Fraunces',serif; font-size:18px; color:#6b7280; margin-bottom:6px; }
.ru-empty p { font-size:13.5px; }

.ru-list { display:flex; flex-direction:column; gap:12px; }
.ru-card { background:#fff; border:1.5px solid #e5e7eb; border-radius:14px; padding:16px 20px; display:flex; align-items:center; justify-content:space-between; gap:14px; transition:all .2s; flex-wrap:wrap; }
.ru-card:hover { border-color:#ff6b35; box-shadow:0 4px 18px rgba(255,107,53,.12); }
.ru-card.default { border-color:#ff6b35; background:#fff7ed; }
.ru-card-left { display:flex; align-items:center; gap:14px; flex:1; min-width:0; }
.ru-card-icon { font-size:32px; flex-shrink:0; }
.ru-card-title { font-family:'Fraunces',serif; font-size:15.5px; color:#111827; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.ru-default-badge { background:#ffedd5; color:#c2410c; font-family:'Nunito',sans-serif; font-size:11px; font-weight:800; padding:2px 9px; border-radius:20px; border:1px solid #fdba74; }
.ru-card-meta { font-size:12px; color:#6b7280; margin-top:4px; display:flex; gap:6px; }
.ru-card-actions { display:flex; gap:6px; flex-wrap:wrap; flex-shrink:0; }
.ru-action-btn { padding:6px 13px; border-radius:8px; border:1.5px solid #e5e7eb; background:#f8fafc; color:#374151; font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; cursor:pointer; transition:all .15s; text-decoration:none; display:inline-flex; align-items:center; gap:4px; white-space:nowrap; }
.ru-action-btn:hover { background:#fff7ed; }
.ru-action-btn.danger { color:#ef4444; border-color:#fecaca; background:#fff; }
.ru-action-btn.danger:hover { background:#fef2f2; }

@media (max-width:860px) {
  .ru-body { flex-direction:column; }
  .ru-upload-panel { width:100%; position:static; }
  .ru-card { flex-direction:column; align-items:flex-start; }
}
`;
