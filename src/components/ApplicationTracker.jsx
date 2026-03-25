import { useState } from 'react';
import { APPLICATIONS, BAR_DATA } from '../data/dashboardData';

const TABS = ['All', 'Interview', 'Shortlisted', 'Review', 'Applied'];

function BarChart({ animate }) {
  const max = Math.max(...BAR_DATA.map((d) => d.value));
  return (
    <div className="bar-wrap">
      {BAR_DATA.map((d, i) => (
        <div className="bar-col" key={i}>
          <div
            className="bar-fill"
            title={`${d.label}: ${d.value}`}
            style={{
              background: d.color,
              height: animate ? `${(d.value / max) * 64}px` : '0px',
              transition: `height 0.7s ${i * 0.08}s ease`,
            }}
          />
          <div className="bar-lbl">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function ApplicationTracker({ chartAnim }) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? APPLICATIONS
      : APPLICATIONS.filter(
          (a) => a.statusClass === activeTab.toLowerCase().replace(' ', '')
        );

  return (
    <div className="card">
      <div className="card-hd">
        <div className="card-title">📊 Application Tracker</div>
        <span className="card-link">All apps →</span>
      </div>

      <BarChart animate={chartAnim} />

      <div className="tabs">
        {TABS.map((t) => (
          <div
            key={t}
            className={`tab${activeTab === t ? ' active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </div>
        ))}
      </div>

      {filtered.map((app) => (
        <div className="job-row" key={app.id}>
          <div
            className="co-logo"
            style={{ background: app.bg, width: 34, height: 34, flexShrink: 0 }}
          >
            {app.icon}
          </div>
          <div>
            <div className="job-name">{app.title}</div>
            <div className="job-sub">{app.company}</div>
          </div>
          <span className={`app-status ${app.statusClass}`}>{app.status}</span>
        </div>
      ))}
    </div>
  );
}
