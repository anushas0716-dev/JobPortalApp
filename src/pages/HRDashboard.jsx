import { useState, useEffect, useCallback } from "react";
import ResumeModal from "../components/ResumeModal";

const API = "http://localhost:3000/api";

const useApi = (token) => {
  const get = useCallback(async (path) => {
    const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.json();
  }, [token]);

  const patch = useCallback(async (path, body) => {
    const res = await fetch(`${API}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    return res.json();
  }, [token]);

  const post = useCallback(async (path, body) => {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    return res.json();
  }, [token]);

  const del = useCallback(async (path) => {
    const res = await fetch(`${API}${path}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    return res.json();
  }, [token]);

  return { get, patch, post, del };
};

export default function HRDashboard({ token, user, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({ status: "", jobTitle: "", page: 1 });
  const [loading, setLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const api = useApi(token);

  // Load stats
  const loadStats = useCallback(async () => {
    const data = await api.get("/resumes/stats");
    if (data.success) setStats(data.data);
  }, [api]);

  // Load resumes list
  const loadResumes = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.jobTitle) params.set("jobTitle", filters.jobTitle);
    params.set("page", filters.page);
    params.set("limit", "12");
    const data = await api.get(`/resumes?${params}`);
    if (data.success) {
      setResumes(data.data);
      setPagination(data.pagination);
    }
    setLoading(false);
  }, [api, filters]);

  // Load individual resume
  const loadResume = async (id) => {
    const data = await api.get(`/resumes/${id}`);
    if (data.success) setSelectedResume(data.data);
  };

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { if (view === "resumes") loadResumes(); }, [loadResumes, view]);

  const handleStatusUpdate = async (id, status) => {
    const data = await api.patch(`/resumes/${id}/status`, { status });
    if (data.success) {
      loadResumes();
      if (selectedResume?._id === id) loadResume(id);
      loadStats();
    }
  };

  const handleAddNote = async (id, note) => {
    const data = await api.post(`/resumes/${id}/notes`, { note });
    if (data.success && selectedResume?._id === id) loadResume(id);
    return data;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume permanently?")) return;
    const data = await api.del(`/resumes/${id}`);
    if (data.success) {
      setSelectedResume(null);
      loadResumes();
      loadStats();
    }
  };

  const statusColors = {
    pending: "var(--warning)", reviewing: "var(--accent-2)",
    shortlisted: "var(--success)", rejected: "var(--danger)", hired: "#7c3aed"
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "resumes", label: "All Resumes", icon: "📋" },
  ];

  return (
    <div className="dashboard-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">TalentFlow</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${view === item.id ? "active" : ""}`}
              onClick={() => setView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-name">{user?.name}</div>
            <div className="user-role">{user?.role}</div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center" }} onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* ── DASHBOARD VIEW ── */}
        {view === "dashboard" && (
          <>
            <div className="dash-header">
              <div>
                <div className="dash-title">Dashboard</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Welcome back, {user?.name}</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setView("resumes")}>View All Resumes →</button>
            </div>
            <div className="dash-content">
              {!stats ? (
                <div className="empty-state"><div className="empty-icon">⏳</div><p>Loading stats...</p></div>
              ) : (
                <>
                  <div className="stats-grid fade-up">
                    {["total", "pending", "reviewing", "shortlisted", "rejected", "hired"].map((key) => (
                      <div key={key} className={`stat-card stat-${key}`}>
                        <div className="stat-num">{stats.totals[key]}</div>
                        <div className="stat-label">{key === "total" ? "Total" : key}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {/* Recent submissions */}
                    <div className="table-card fade-up delay-1">
                      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 14 }}>
                        Recent Applications
                      </div>
                      {stats.recentSubmissions.length === 0 ? (
                        <div className="empty-state"><div className="empty-icon">📭</div><p>No applications yet</p></div>
                      ) : (
                        <table>
                          <tbody>
                            {stats.recentSubmissions.map((r) => (
                              <tr key={r._id} style={{ cursor: "pointer" }} onClick={() => { loadResume(r._id); }}>
                                <td>
                                  <div className="td-name">{r.candidate.name}</div>
                                  <div className="td-email">{r.application.jobTitle}</div>
                                </td>
                                <td><span className={`status-badge status-${r.status}`}>{r.status}</span></td>
                                <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>

                    {/* Top positions */}
                    <div className="table-card fade-up delay-2">
                      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 14 }}>
                        Top Positions
                      </div>
                      <div style={{ padding: "16px 20px" }}>
                        {stats.topPositions.length === 0 ? (
                          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>No data yet</p>
                        ) : (
                          <div className="top-positions">
                            {stats.topPositions.map((p, i) => (
                              <div key={i} className="position-row">
                                <span style={{ fontSize: 12, color: "var(--text-muted)", minWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p._id}</span>
                                <div className="position-bar-bg">
                                  <div className="position-bar" style={{ width: `${(p.count / stats.topPositions[0].count) * 100}%` }} />
                                </div>
                                <span className="position-count">{p.count}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* ── RESUMES VIEW ── */}
        {view === "resumes" && (
          <>
            <div className="dash-header">
              <div className="dash-title">All Resumes</div>
              <button className="btn btn-secondary btn-sm" onClick={() => { loadStats(); loadResumes(); }}>↻ Refresh</button>
            </div>
            <div className="dash-content">
              <div className="table-card fade-up">
                <div className="table-toolbar">
                  <input
                    className="search-input"
                    placeholder="Search by job title..."
                    value={filters.jobTitle}
                    onChange={(e) => setFilters((f) => ({ ...f, jobTitle: e.target.value, page: 1 }))}
                  />
                  <select
                    className="filter-select"
                    value={filters.status}
                    onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value, page: 1 }))}
                  >
                    <option value="">All Statuses</option>
                    {["pending", "reviewing", "shortlisted", "rejected", "hired"].map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-muted)" }}>
                    {pagination.total} total
                  </span>
                </div>

                {loading ? (
                  <div className="empty-state"><div className="empty-icon">⏳</div><p>Loading resumes...</p></div>
                ) : resumes.length === 0 ? (
                  <div className="empty-state"><div className="empty-icon">📭</div><p>No resumes found</p></div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumes.map((r) => (
                        <tr key={r._id}>
                          <td>
                            <div className="td-name">{r.candidate.name}</div>
                            <div className="td-email">{r.candidate.email}</div>
                          </td>
                          <td>
                            <div style={{ fontSize: 13 }}>{r.application.jobTitle}</div>
                            {r.application.department && <div className="td-email">{r.application.department}</div>}
                          </td>
                          <td>
                            <select
                              className="filter-select"
                              value={r.status}
                              style={{ fontSize: 12, padding: "5px 8px" }}
                              onChange={(e) => handleStatusUpdate(r._id, e.target.value)}
                            >
                              {["pending", "reviewing", "shortlisted", "rejected", "hired"].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ fontSize: 12, color: "var(--text-muted)" }}>
                            {r.assignedTo?.name || "—"}
                          </td>
                          <td style={{ fontSize: 12, color: "var(--text-muted)" }}>
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button className="btn btn-secondary btn-sm" onClick={() => loadResume(r._id)}>View</button>
                              <a
                                href={`${API}/resumes/${r._id}/download`}
                                className="btn btn-blue btn-sm"
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: "none" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  fetch(`${API}/resumes/${r._id}/download`, { headers: { Authorization: `Bearer ${token}` } })
                                    .then(res => res.blob())
                                    .then(blob => {
                                      const url = URL.createObjectURL(blob);
                                      const a = document.createElement("a");
                                      a.href = url;
                                      a.download = r.file?.originalName || "resume";
                                      a.click();
                                    });
                                }}
                              >↓</a>
                              {user?.role === "admin" && (
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r._id)}>✕</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {pagination.pages > 1 && (
                  <div className="pagination">
                    <span>Page {pagination.page} of {pagination.pages}</span>
                    <div className="pagination-btns">
                      <button
                        className="page-btn"
                        disabled={pagination.page <= 1}
                        onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                      >←</button>
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          className={`page-btn ${p === pagination.page ? "active" : ""}`}
                          onClick={() => setFilters((f) => ({ ...f, page: p }))}
                        >{p}</button>
                      ))}
                      <button
                        className="page-btn"
                        disabled={pagination.page >= pagination.pages}
                        onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                      >→</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Resume Detail Modal */}
      {selectedResume && (
        <ResumeModal
          resume={selectedResume}
          token={token}
          user={user}
          onClose={() => setSelectedResume(null)}
          onStatusUpdate={handleStatusUpdate}
          onAddNote={handleAddNote}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
