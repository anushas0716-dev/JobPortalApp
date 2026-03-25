import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://127.0.0.1:8000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function NotificationBell() {
  const [unread,  setUnread]  = useState(0);
  const [open,    setOpen]    = useState(false);
  const [notifs,  setNotifs]  = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/notifications/unread-count/`, {
        headers: authHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setUnread(data.unread_count);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/notifications/`, {
        headers: authHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setNotifs(Array.isArray(data) ? data : data.results ?? []);
      }
    } catch (e) {}
    finally { setLoading(false); }
  };

  const handleBellClick = () => {
    setOpen(o => !o);
    if (!open) fetchNotifications();
  };

  const markRead = async (id) => {
    try {
      await fetch(`${BASE_URL}/notifications/${id}/mark-read/`, {
        method: "PATCH",
        headers: authHeaders()
      });
      setNotifs(n => n.map(x => x.id === id ? { ...x, is_read: true } : x));
      setUnread(u => Math.max(0, u - 1));
    } catch (e) {}
  };

  const markAllRead = async () => {
    try {
      await fetch(`${BASE_URL}/notifications/mark-all-read/`, {
        method: "PATCH",
        headers: authHeaders()
      });
      setNotifs(n => n.map(x => ({ ...x, is_read: true })));
      setUnread(0);
    } catch (e) {}
  };

  function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60)   return "just now";
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400)return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  }

  return (
    <>
      <style>{BELL_CSS}</style>
      <div className="nb-wrap">

        {/* Bell Button */}
        <button className="nb-bell" onClick={handleBellClick}>
          🔔
          {unread > 0 && (
            <span className="nb-badge">{unread > 9 ? "9+" : unread}</span>
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="nb-dropdown">
            <div className="nb-drop-header">
              <span className="nb-drop-title">Notifications</span>
              {unread > 0 && (
                <button className="nb-mark-all" onClick={markAllRead}>
                  Mark all read
                </button>
              )}
            </div>

            {loading ? (
              <div className="nb-empty">Loading...</div>
            ) : notifs.length === 0 ? (
              <div className="nb-empty">No notifications yet</div>
            ) : (
              <div className="nb-list">
                {notifs.map(n => (
                  <div
                    key={n.id}
                    className={`nb-item ${!n.is_read ? "unread" : ""}`}
                    onClick={() => !n.is_read && markRead(n.id)}
                  >
                    <div className="nb-item-title">{n.title}</div>
                    <div className="nb-item-msg">{n.message}</div>
                    <div className="nb-item-time">{timeAgo(n.created_at)}</div>
                    {!n.is_read && <div className="nb-dot" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}

export default function NotificationsPage() {
  const [notifs,  setNotifs]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [toasts,  setToasts]  = useState([]);

  const toast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/notifications/`, {
        headers: authHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setNotifs(Array.isArray(data) ? data : data.results ?? []);
      }
    } catch (e) {
      toast("Failed to load notifications", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const markRead = async (id) => {
    try {
      await fetch(`${BASE_URL}/notifications/${id}/mark-read/`, {
        method: "PATCH", headers: authHeaders()
      });
      setNotifs(n => n.map(x => x.id === id ? { ...x, is_read: true } : x));
    } catch (e) {}
  };

  const markAllRead = async () => {
    try {
      await fetch(`${BASE_URL}/notifications/mark-all-read/`, {
        method: "PATCH", headers: authHeaders()
      });
      setNotifs(n => n.map(x => ({ ...x, is_read: true })));
      toast("All notifications marked as read ✓");
    } catch (e) {
      toast("Failed", "error");
    }
  };

  function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60)    return "just now";
    if (diff < 3600)  return `${Math.floor(diff/60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)} hr ago`;
    return `${Math.floor(diff/86400)} days ago`;
  }

  const unreadCount = notifs.filter(n => !n.is_read).length;

  return (
    <>
      <style>{PAGE_CSS}</style>

      {/* Toasts */}
      <div className="np-toasts">
        {toasts.map(t => (
          <div key={t.id} className={`np-toast np-toast-${t.type}`}>{t.msg}</div>
        ))}
      </div>

      <div className="np-page">

        {/* Header */}
        <div className="np-header">
          <div className="np-header-left">
            <div className="np-icon">🔔</div>
            <div>
              <h1 className="np-title">Notifications</h1>
              <p className="np-sub">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
          </div>
          <div className="np-header-right">
            {unreadCount > 0 && (
              <button className="np-mark-all-btn" onClick={markAllRead}>
                ✓ Mark all read
              </button>
            )}
            <button className="np-refresh-btn" onClick={fetchNotifications}>
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="np-skels">
            {[1,2,3].map(i => <div key={i} className="np-skel" />)}
          </div>

        /* Empty */
        ) : notifs.length === 0 ? (
          <div className="np-empty">
            <div className="np-empty-icon">🔕</div>
            <h3>No notifications yet</h3>
            <p>You will be notified when new jobs match your skills</p>
          </div>

        /* List */
        ) : (
          <div className="np-list">
            {notifs.map(n => (
              <div
                key={n.id}
                className={`np-card ${!n.is_read ? "unread" : ""}`}
                onClick={() => !n.is_read && markRead(n.id)}
              >
                <div className="np-card-icon">
                  {n.title.includes("💼") ? "💼" : "🎯"}
                </div>
                <div className="np-card-body">
                  <div className="np-card-title">{n.title}</div>
                  <div className="np-card-msg">{n.message}</div>
                  <div className="np-card-time">{timeAgo(n.created_at)}</div>
                </div>
                {!n.is_read && (
                  <div className="np-unread-dot" title="Unread" />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

const BELL_CSS = `
.nb-wrap { position:relative; }
.nb-bell { background:none; border:1.5px solid #222; border-radius:8px; padding:7px 12px; font-size:16px; cursor:pointer; position:relative; transition:border-color .15s; }
.nb-bell:hover { border-color:#ff6b35; }
.nb-badge { position:absolute; top:-6px; right:-6px; background:#ff6b35; color:#fff; font-size:10px; font-weight:800; min-width:18px; height:18px; border-radius:10px; display:flex; align-items:center; justify-content:center; padding:0 4px; font-family:'Nunito',sans-serif; }
.nb-dropdown { position:absolute; top:calc(100% + 8px); right:0; width:320px; background:#fff; border:1.5px solid #e8e4de; border-radius:14px; box-shadow:0 8px 32px rgba(0,0,0,.12); z-index:9999; overflow:hidden; }
.nb-drop-header { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1.5px solid #f0ede8; }
.nb-drop-title { font-family:'DM Serif Display',serif; font-size:15px; color:#111; }
.nb-mark-all { background:none; border:none; font-size:12px; font-weight:700; color:#c9a96e; cursor:pointer; font-family:'Nunito',sans-serif; }
.nb-list { max-height:320px; overflow-y:auto; }
.nb-item { padding:12px 16px; border-bottom:1px solid #f7f6f2; cursor:pointer; transition:background .15s; position:relative; }
.nb-item:hover { background:#faf9f6; }
.nb-item.unread { background:#fffdf8; }
.nb-item-title { font-size:13px; font-weight:800; color:#111; margin-bottom:3px; }
.nb-item-msg { font-size:12px; color:#888; line-height:1.4; }
.nb-item-time { font-size:11px; color:#bbb; margin-top:4px; }
.nb-dot { position:absolute; top:14px; right:14px; width:8px; height:8px; background:#ff6b35; border-radius:50%; }
.nb-empty { padding:24px; text-align:center; font-size:13px; color:#bbb; }
`;

const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Nunito:wght@400;500;600;700;800&display=swap');
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'Nunito',sans-serif; background:#f7f6f2; color:#111; }

.np-toasts { position:fixed; top:18px; right:18px; z-index:9999; display:flex; flex-direction:column; gap:8px; }
.np-toast { padding:11px 18px; border-radius:10px; font-size:13.5px; font-weight:700; animation:toastIn .25s ease; box-shadow:0 4px 16px rgba(0,0,0,.08); }
.np-toast-success { background:#fff; color:#16a34a; border:1.5px solid #bbf7d0; }
.np-toast-error   { background:#fff; color:#dc2626; border:1.5px solid #fecaca; }
@keyframes toastIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }

.np-page { max-width:800px; margin:0 auto; padding:32px 24px 60px; min-height:100vh; }

.np-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
.np-header-left { display:flex; align-items:center; gap:14px; }
.np-icon { font-size:36px; }
.np-title { font-family:'DM Serif Display',serif; font-size:26px; color:#111; }
.np-sub { font-size:13px; color:#aaa; margin-top:3px; }
.np-header-right { display:flex; gap:8px; }
.np-mark-all-btn { padding:9px 18px; background:#111; color:#fff; border:none; border-radius:10px; font-family:'Nunito',sans-serif; font-size:13px; font-weight:800; cursor:pointer; }
.np-mark-all-btn:hover { background:#333; }
.np-refresh-btn { padding:9px 16px; background:#fff; border:1.5px solid #e8e4de; border-radius:10px; font-family:'Nunito',sans-serif; font-size:13px; font-weight:700; color:#aaa; cursor:pointer; }
.np-refresh-btn:hover { border-color:#c9a96e; color:#c9a96e; }

.np-list { display:flex; flex-direction:column; gap:10px; }
.np-card { background:#fff; border:1.5px solid #e8e4de; border-radius:14px; padding:16px 20px; display:flex; align-items:flex-start; gap:14px; cursor:pointer; transition:all .15s; position:relative; }
.np-card:hover { border-color:#c9a96e; box-shadow:0 4px 16px rgba(201,169,110,.1); }
.np-card.unread { background:#fffdf8; border-color:#f0d9b0; }
.np-card-icon { font-size:28px; flex-shrink:0; margin-top:2px; }
.np-card-body { flex:1; min-width:0; }
.np-card-title { font-family:'DM Serif Display',serif; font-size:15px; color:#111; margin-bottom:5px; }
.np-card-msg { font-size:13px; color:#666; line-height:1.5; }
.np-card-time { font-size:12px; color:#bbb; margin-top:6px; }
.np-unread-dot { width:10px; height:10px; background:#ff6b35; border-radius:50%; flex-shrink:0; margin-top:6px; }

.np-skels { display:flex; flex-direction:column; gap:10px; }
.np-skel { height:90px; background:linear-gradient(90deg,#f0ede8 25%,#faf9f7 50%,#f0ede8 75%); background-size:200% 100%; border-radius:14px; animation:shimmer 1.4s infinite; }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

.np-empty { text-align:center; padding:60px 20px; }
.np-empty-icon { font-size:48px; opacity:.3; margin-bottom:14px; }
.np-empty h3 { font-family:'DM Serif Display',serif; font-size:20px; color:#999; margin-bottom:6px; }
.np-empty p { font-size:13.5px; color:#bbb; }
`;