import { useState } from 'react';
import { NOTIFICATIONS } from '../data/dashboardData';

export default function NotificationsCard({ onViewAll }) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const dismiss   = (id) => setNotifs((n) => n.map((x) => x.id === id ? { ...x, unread: false } : x));
  const clearAll  = ()   => setNotifs((n) => n.map((x) => ({ ...x, unread: false })));
  const unreadCnt = notifs.filter((n) => n.unread).length;

  return (
    <div className="card">
      <div className="card-hd">
        <div className="card-title">
          🔔 Notifications
          {unreadCnt > 0 && <span className="unread-badge">{unreadCnt}</span>}
        </div>
        <span className="card-link" onClick={onViewAll}>View all</span>
      </div>

      {notifs.map((n) => (
        <div
          key={n.id}
          className={`notif-row${n.unread ? ' notif-unread' : ''}`}
          onClick={() => dismiss(n.id)}
        >
          <div
            className="notif-pip2 live"
            style={{ background: n.unread ? n.dot : 'var(--muted)' }}
          />
          <div>
            <div className="notif-txt">
              <strong>{n.company}</strong> {n.text}
            </div>
            <div className="notif-time">{n.time}</div>
          </div>
        </div>
      ))}

      {/* Interview callout */}
      <div className="interview-callout">
        <div className="callout-title">📅 Interview Tomorrow</div>
        <div className="callout-sub">Apple · Senior Frontend Engineer</div>
        <div className="callout-meta">11:00 AM · Google Meet · Online</div>
        <button
          className="btn btn-ghost"
          style={{ marginTop: 10, width: '100%', fontSize: 11, padding: '6px 12px' }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
