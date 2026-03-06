import { useState } from "react";

const API = "http://localhost:3000/api";

export default function ResumeModal({ resume, token, user, onClose, onStatusUpdate, onAddNote, onDelete }) {
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [noteError, setNoteError] = useState(null);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setAddingNote(true);
    setNoteError(null);
    const data = await onAddNote(resume._id, noteText.trim());
    if (data.success) setNoteText("");
    else setNoteError(data.message);
    setAddingNote(false);
  };

  const handleDownload = () => {
    fetch(`${API}/resumes/${resume._id}/download`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = resume.file?.originalName || "resume";
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  const c = resume.candidate;
  const a = resume.application;

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal fade-up">
        <div className="modal-header">
          <div>
            <div className="modal-title">{c.name}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{a.jobTitle}{a.department ? ` · ${a.department}` : ""}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className={`status-badge status-${resume.status}`}>{resume.status}</span>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-body">
          {/* Candidate Info */}
          <div style={{ marginBottom: 24 }}>
            <div className="form-section-title">Candidate Information</div>
            <div className="detail-row"><span className="detail-label">Email</span><span className="detail-val">{c.email}</span></div>
            {c.phone && <div className="detail-row"><span className="detail-label">Phone</span><span className="detail-val">{c.phone}</span></div>}
            {c.linkedin && <div className="detail-row"><span className="detail-label">LinkedIn</span><a href={c.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--accent-2)", fontSize: 14 }}>{c.linkedin}</a></div>}
            {c.portfolio && <div className="detail-row"><span className="detail-label">Portfolio</span><a href={c.portfolio} target="_blank" rel="noreferrer" style={{ color: "var(--accent-2)", fontSize: 14 }}>{c.portfolio}</a></div>}
          </div>

          {/* Application Info */}
          <div style={{ marginBottom: 24 }}>
            <div className="form-section-title">Application Details</div>
            <div className="detail-row"><span className="detail-label">Job Title</span><span className="detail-val">{a.jobTitle}</span></div>
            {a.department && <div className="detail-row"><span className="detail-label">Department</span><span className="detail-val">{a.department}</span></div>}
            {a.jobId && <div className="detail-row"><span className="detail-label">Job ID</span><span className="detail-val">{a.jobId}</span></div>}
            {a.yearsOfExperience > 0 && <div className="detail-row"><span className="detail-label">Experience</span><span className="detail-val">{a.yearsOfExperience} years</span></div>}
            {a.expectedSalary && <div className="detail-row"><span className="detail-label">Expected Salary</span><span className="detail-val">{a.expectedSalary}</span></div>}
            <div className="detail-row"><span className="detail-label">Submitted</span><span className="detail-val">{new Date(resume.createdAt).toLocaleString()}</span></div>
            {resume.reviewedAt && <div className="detail-row"><span className="detail-label">Reviewed</span><span className="detail-val">{new Date(resume.reviewedAt).toLocaleString()}</span></div>}
            {resume.assignedTo && <div className="detail-row"><span className="detail-label">Assigned To</span><span className="detail-val">{resume.assignedTo.name}</span></div>}
            <div className="detail-row"><span className="detail-label">Ref Token</span><span className="detail-val" style={{ fontFamily: "monospace", fontSize: 12 }}>{resume.submissionToken}</span></div>
          </div>

          {/* Cover Letter */}
          {a.coverLetter && (
            <div style={{ marginBottom: 24 }}>
              <div className="form-section-title">Cover Letter</div>
              <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7, background: "var(--surface)", borderRadius: 8, padding: 16 }}>
                {a.coverLetter}
              </div>
            </div>
          )}

          {/* Update Status */}
          <div style={{ marginBottom: 24 }}>
            <div className="form-section-title">Update Status</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["pending", "reviewing", "shortlisted", "rejected", "hired"].map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm ${resume.status === s ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => onStatusUpdate(resume._id, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="form-section-title">HR Notes</div>
            {resume.hrNotes?.length > 0 ? (
              <div className="notes-list" style={{ marginBottom: 16 }}>
                {resume.hrNotes.map((n, i) => (
                  <div key={i} className="note-item">
                    <div>{n.note}</div>
                    <div className="note-meta">
                      By {n.addedBy?.name || "HR"} · {new Date(n.addedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>No notes yet.</p>
            )}

            {noteError && <div className="alert alert-error" style={{ marginBottom: 10 }}>⚠️ {noteError}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                style={{ flex: 1, padding: "9px 14px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: 13 }}
                placeholder="Add a note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
              />
              <button className="btn btn-blue btn-sm" onClick={handleAddNote} disabled={addingNote || !noteText.trim()}>
                {addingNote ? "..." : "Add"}
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {user?.role === "admin" && (
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(resume._id)}>Delete Resume</button>
          )}
          <button className="btn btn-blue btn-sm" onClick={handleDownload}>↓ Download Resume</button>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
