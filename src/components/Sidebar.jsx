import { NAV_SECTIONS } from '../data/dashboardData';

export default function Sidebar({ activeNav, setActiveNav }) {
  let globalIndex = 0;

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-mark">◈</div>
        JobSphere
      </div>

      {NAV_SECTIONS.map((sec) => (
        <div key={sec.title}>
          <div className="nav-section">{sec.title}</div>
          {sec.items.map((item) => {
            const gi = globalIndex++;
            return (
              <div
                key={gi}
                className={`nav-item${activeNav === gi ? ' active' : ''}`}
                onClick={() => setActiveNav(gi)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            );
          })}
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="ava">AS</div>
        <div>
          <div className="ava-name">Arjun Sharma</div>
          <div className="ava-role">Full Stack Dev</div>
        </div>
      </div>
    </aside>
  );
}
