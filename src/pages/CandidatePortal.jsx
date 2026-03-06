import { useState } from "react";

const API = "http://localhost:3000/api";

export default function CandidatePortal({ onBack }) {
  const [tab, setTab] = useState("submit"); // submit | status
  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin: "", portfolio: "",
    jobTitle: "", department: "", jobId: "", yearsOfExperience: "",
    expectedSalary: "", coverLetter: "",
  });
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Status check
  const [token, setToken] = useState("");
  const [statusResult, setStatusResult] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  const handleSubmit = async () => {
    if (!file) { setError("Please attach your resume file."); return; }
    if (!form.name || !form.email || !form.jobTitle) {
      setError("Name, email, and job title are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      fd.append("resume", file);
      const res = await fetch(`${API}/resumes/submit`, { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Submission failed");
      setSuccess(data.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!token.trim()) return;
    setStatusLoading(true);
    setStatusError(null);
    setStatusResult(null);
    try {
      const res = await fetch(`${API}/resumes/status/${token.trim()}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatusResult(data.data);
    } catch (e) {
      setStatusError(e.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const statusIcon = (s) => ({ pending: "⏳", reviewing: "🔍", shortlisted: "⭐", rejected: "❌", hired: "🎉" }[s] || "❓");

  if (success) return (
    <div className="page-shell">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
        <div className="logo-mark"><span className="logo-icon">⬡</span><span className="logo-text">TalentFlow</span></div>
      </header>
      <div className="page-content" style={{ maxWidth: 560 }}>
        <div className="status-result fade-up">
          <div className="status-icon">🎉</div>
          <h3>Application Submitted!</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
            Your resume has been received. Save your reference ID to track your application.
          </p>
          <div style={{ background: "var(--surface)", borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Reference ID</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "0.08em", color: "var(--accent)" }}>{success.submissionToken}</div>
          </div>
          <div style={{ textAlign: "left", fontSize: 13, color: "var(--text-muted)" }}>
            <div className="detail-row"><span className="detail-label">Candidate</span><span className="detail-val">{success.candidateName}</span></div>
            <div className="detail-row"><span className="detail-label">Position</span><span className="detail-val">{success.jobTitle}</span></div>
            <div className="detail-row"><span className="detail-label">Submitted</span><span className="detail-val">{new Date(success.submittedAt).toLocaleString()}</span></div>
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={() => { setSuccess(null); setForm({ name:"",email:"",phone:"",linkedin:"",portfolio:"",jobTitle:"",department:"",jobId:"",yearsOfExperience:"",expectedSalary:"",coverLetter:"" }); setFile(null); }}>Submit Another</button>
            <button className="btn btn-secondary" onClick={() => { setTab("status"); setToken(success.submissionToken); setSuccess(null); }}>Track Status</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-shell">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
        <div className="logo-mark"><span className="logo-icon">⬡</span><span className="logo-text">TalentFlow</span></div>
      </header>
      <div className="page-content">
        <h1 className="page-title fade-up">Candidate Portal</h1>
        <p className="page-desc fade-up delay-1">Apply for a position or track the status of your existing application.</p>

        <div className="tabs fade-up delay-2">
          <button className={`tab ${tab === "submit" ? "active" : ""}`} onClick={() => setTab("submit")}>📄 Submit Resume</button>
          <button className={`tab ${tab === "status" ? "active" : ""}`} onClick={() => setTab("status")}>🔍 Check Status</button>
        </div>

        {tab === "submit" && (
          <div className="form-card fade-up">
            {error && <div className="alert alert-error">⚠️ {error}</div>}

            <div className="form-section">
              <div className="form-section-title">Personal Information</div>
              <div className="form-grid">
                <div className="field">
                  <label>Full Name <span className="req">*</span></label>
                  <input placeholder="Jane Smith" value={form.name} onChange={set("name")} />
                </div>
                <div className="field">
                  <label>Email Address <span className="req">*</span></label>
                  <input type="email" placeholder="jane@example.com" value={form.email} onChange={set("email")} />
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <input placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")} />
                </div>
                <div className="field">
                  <label>LinkedIn Profile</label>
                  <input placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={set("linkedin")} />
                </div>
                <div className="field form-full">
                  <label>Portfolio / Website</label>
                  <input placeholder="https://yoursite.com" value={form.portfolio} onChange={set("portfolio")} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Application Details</div>
              <div className="form-grid">
                <div className="field">
                  <label>Job Title <span className="req">*</span></label>
                  <input placeholder="Senior Frontend Engineer" value={form.jobTitle} onChange={set("jobTitle")} />
                </div>
                <div className="field">
                  <label>Department</label>
                  <input placeholder="Engineering" value={form.department} onChange={set("department")} />
                </div>
                <div className="field">
                  <label>Job ID / Reference</label>
                  <input placeholder="ENG-2024-001" value={form.jobId} onChange={set("jobId")} />
                </div>
                <div className="field">
                  <label>Years of Experience</label>
                  <input type="number" min="0" max="50" placeholder="5" value={form.yearsOfExperience} onChange={set("yearsOfExperience")} />
                </div>
                <div className="field">
                  <label>Expected Salary</label>
                  <input placeholder="$80,000 – $100,000" value={form.expectedSalary} onChange={set("expectedSalary")} />
                </div>
                <div className="field form-full">
                  <label>Cover Letter</label>
                  <textarea placeholder="Tell us why you're a great fit..." value={form.coverLetter} onChange={set("coverLetter")} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">Resume File</div>
              <div
                className={`file-drop ${drag ? "drag-over" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={handleDrop}
              >
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                <div className="file-drop-icon">📎</div>
                <div className="file-drop-text">
                  <strong>Click to upload</strong> or drag & drop<br />
                  <span style={{ fontSize: 12 }}>PDF, DOC, DOCX • Max 5MB</span>
                </div>
                {file && <div className="file-chosen">✓ {file.name} ({(file.size / 1024).toFixed(0)} KB)</div>}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <><span className="spinner" /> Submitting...</> : "Submit Application →"}
              </button>
            </div>
          </div>
        )}

        {tab === "status" && (
          <div className="form-card fade-up">
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
              Enter the reference ID you received after submitting your application.
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <input
                className="search-input"
                style={{ flex: 1, width: "auto" }}
                placeholder="e.g. A1B2C3D4E5F6"
                value={token}
                onChange={(e) => setToken(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleCheckStatus()}
              />
              <button className="btn btn-primary" onClick={handleCheckStatus} disabled={statusLoading}>
                {statusLoading ? <><span className="spinner" /> Checking...</> : "Check Status"}
              </button>
            </div>

            {statusError && <div className="alert alert-error">⚠️ {statusError}</div>}

            {statusResult && (
              <div className="status-result">
                <div className="status-icon">{statusIcon(statusResult.status)}</div>
                <h3>{statusResult.candidateName}</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>{statusResult.jobTitle}</p>
                <span className={`status-badge status-${statusResult.status}`} style={{ fontSize: 15, padding: "8px 18px" }}>
                  {statusResult.status}
                </span>
                <div style={{ textAlign: "left", marginTop: 24 }}>
                  <div className="detail-row"><span className="detail-label">Reference ID</span><span className="detail-val" style={{ fontFamily: "monospace" }}>{statusResult.referenceId}</span></div>
                  <div className="detail-row"><span className="detail-label">Submitted</span><span className="detail-val">{new Date(statusResult.submittedAt).toLocaleDateString()}</span></div>
                  {statusResult.reviewedAt && <div className="detail-row"><span className="detail-label">Reviewed</span><span className="detail-val">{new Date(statusResult.reviewedAt).toLocaleDateString()}</span></div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
