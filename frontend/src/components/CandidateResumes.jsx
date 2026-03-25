import { useState } from "react";

const candidates = [
  { id: 1,  name: "John Doe",    role: "Python Developer",           location: "Bengaluru", phone: "9876543210", resume: "/John_Doe_resume.pdf" },
  { id: 2,  name: "Jane Smith",  role: "React Developer",            location: "Mumbai",    phone: "9123456780", resume: "/Jane_Smith_resume.pdf" },
  { id: 3,  name: "Ravi Kumar",  role: "Full Stack Developer",       location: "Chennai",   phone: "9988776655", resume: "/Ravi_Kumar_resume.pdf" },
  { id: 4,  name: "Priya Sharma",role: "Data Analyst",               location: "Hyderabad", phone: "9871234567", resume: "/Priya_Sharma_resume.pdf" },
  { id: 5,  name: "Amit Patel",  role: "Backend Developer",          location: "Pune",      phone: "9765432100", resume: "/Amit_Patel_resume.pdf" },
  { id: 6,  name: "Sneha Reddy", role: "UI/UX Designer",             location: "Bengaluru", phone: "9654321098", resume: "/Sneha_Reddy_resume.pdf" },
  { id: 7,  name: "Karan Mehta", role: "DevOps Engineer",            location: "Delhi",     phone: "9543210987", resume: "/Karan_Mehta_resume.pdf" },
  { id: 8,  name: "Divya Nair",  role: "Android Developer",          location: "Kochi",     phone: "9432109876", resume: "/Divya_Nair_resume.pdf" },
  { id: 9,  name: "Arjun Singh", role: "Machine Learning Engineer",  location: "Bengaluru", phone: "9321098765", resume: "/Arjun_Singh_resume.pdf" },
  { id: 10, name: "Meera Joshi", role: "QA Engineer",                location: "Pune",      phone: "9210987654", resume: "/Meera_Joshi_resume.pdf" },
];

const colors = ["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#f97316","#14b8a6","#ec4899","#84cc16"];

export default function CandidateResumes() {
  const [downloading, setDownloading] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const handleDownload = (candidate) => {
    setDownloading(candidate.id);
    const a = document.createElement("a");
    a.href = candidate.resume;
    a.download = `${candidate.name.replace(/\s+/g, "_")}_resume.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => {
      setDownloading(null);
      setToast(`✅ Downloaded ${candidate.name}'s resume!`);
      setTimeout(() => setToast(null), 3000);
    }, 800);
  };

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Segoe UI, sans-serif", padding: "32px 24px" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} .card{transition:box-shadow 0.2s,transform 0.2s} .card:hover{box-shadow:0 6px 20px rgba(0,0,0,0.1)!important;transform:translateY(-2px)}`}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#dcfce7", color: "#15803d", border: "1px solid #86efac", borderRadius: 12, padding: "12px 20px", fontWeight: 600, fontSize: 14, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", zIndex: 9999, animation: "slideUp 0.3s ease" }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 750, margin: "0 auto" }}>

        {/* Header */}
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>📄 Candidate Resumes</h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 24px" }}>Browse and download applicant resumes</p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total", value: candidates.length, color: "#6366f1" },
            { label: "With Resume", value: candidates.filter(c => c.resume).length, color: "#10b981" },
            { label: "Showing", value: filtered.length, color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e8edf3", borderRadius: 10, padding: "12px 18px", flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍  Search by name, role or location…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, marginBottom: 16, boxSizing: "border-box", outline: "none", background: "#fff" }}
        />

        {/* Cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
            <div style={{ fontSize: 40 }}>📂</div>
            <div style={{ fontWeight: 600, marginTop: 10 }}>No candidates found</div>
          </div>
        ) : (
          filtered.map((c, i) => (
            <div key={c.id} className="card" style={{ background: "#fff", border: "1px solid #e8edf3", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>

              {/* Avatar */}
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: colors[i % colors.length], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 17, flexShrink: 0 }}>
                {c.name[0]}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                  💼 {c.role} &nbsp;•&nbsp; 📍 {c.location} &nbsp;•&nbsp; 📞 {c.phone}
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(c)}
                disabled={downloading === c.id}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 9, border: "none",
                  background: downloading === c.id ? "#94a3b8" : `linear-gradient(135deg, ${colors[i % colors.length]}, ${colors[(i+2) % colors.length]})`,
                  color: "#fff", fontWeight: 600, fontSize: 13,
                  cursor: downloading === c.id ? "not-allowed" : "pointer",
                  flexShrink: 0,
                }}
              >
                {downloading === c.id
                  ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Downloading…</>
                  : "⬇ Download"
                }
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
