import { useState } from "react";

const API = "http://localhost:3000/api";

export default function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) { setError("Email and password are required."); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Login failed");
      onLogin(data.token, data.user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="home-bg">
        <div className="grid-overlay" />
        <div className="glow-orb glow-1" />
        <div className="glow-orb glow-2" />
      </div>
      <div className="login-card fade-up">
        <div className="login-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">TalentFlow</span>
        </div>
        <h2 className="login-title">HR Portal</h2>
        <p className="login-sub">Sign in to manage applications and candidates.</p>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <div className="field" style={{ marginBottom: 16 }}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="hr@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>
        <div className="field" style={{ marginBottom: 28 }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }} onClick={handleLogin} disabled={loading}>
          {loading ? <><span className="spinner" /> Signing in...</> : "Sign In →"}
        </button>
        <button className="back-btn" style={{ marginTop: 20, width: "100%", justifyContent: "center" }} onClick={onBack}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
