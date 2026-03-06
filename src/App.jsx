import { useState } from "react";
import CandidatePortal from "./pages/CandidatePortal";
import HRDashboard from "./pages/HRDashboard";
import LoginPage from "./pages/LoginPage";
import "./index.css";

export default function App() {
  const [view, setView] = useState("home"); // home | candidate | hr-login | hr-dashboard
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    setView("hr-dashboard");
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    setView("home");
  };

  if (view === "candidate") return <CandidatePortal onBack={() => setView("home")} />;
  if (view === "hr-login") return <LoginPage onLogin={handleLogin} onBack={() => setView("home")} />;
  if (view === "hr-dashboard") return <HRDashboard token={authToken} user={user} onLogout={handleLogout} />;

  return (
    <div className="home-root">
      <div className="home-bg">
        <div className="grid-overlay" />
        <div className="glow-orb glow-1" />
        <div className="glow-orb glow-2" />
      </div>
      <nav className="home-nav">
        <div className="logo-mark">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">TalentFlow</span>
        </div>
      </nav>
      <main className="home-hero">
        <div className="hero-badge">Hiring Infrastructure</div>
        <h1 className="hero-title">
          Resume Management<br />
          <em>Reimagined</em>
        </h1>
        <p className="hero-sub">
          A modern platform for candidates to apply and HR teams to manage, review, and hire talent — all in one place.
        </p>
        <div className="hero-cards">
          <button className="portal-card candidate-card" onClick={() => setView("candidate")}>
            <div className="card-icon">📄</div>
            <div className="card-content">
              <h3>Candidate Portal</h3>
              <p>Submit your resume and track your application status in real time.</p>
            </div>
            <span className="card-arrow">→</span>
          </button>
          <button className="portal-card hr-card" onClick={() => setView("hr-login")}>
            <div className="card-icon">🏢</div>
            <div className="card-content">
              <h3>HR Dashboard</h3>
              <p>Review applications, manage candidates, and collaborate with your team.</p>
            </div>
            <span className="card-arrow">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
