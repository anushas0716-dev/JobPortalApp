import { useState, useEffect } from 'react';
import '../styles/dashboard.css';

import Sidebar            from './Sidebar';
import StatCards          from './StatCards';
import RecommendedJobs    from './RecommendedJobs';
import ProfileCard        from './ProfileCard';
import ApplicationTracker from './ApplicationTracker';
import SavedAndRecent     from './SavedAndRecent';
import NotificationsCard  from './NotificationsCard';

import FindJobs           from '../pages/FindJobs';
import SavedJobs          from '../pages/SavedJobs';
import Applications       from '../pages/Applications';
import MyProfile          from '../pages/MyProfile';
import Resumes            from '../pages/Resumes';
import Messages           from '../pages/Messages';
import Interviews         from '../pages/Interviews';
import Notifications      from '../pages/Notifications';
import Settings           from '../pages/Settings';

const PAGE_MAP = {
  0:'dashboard', 1:'findjobs', 2:'savedjobs', 3:'applications',
  4:'profile',   5:'resumes',  6:'messages',  7:'interviews',
  8:'notifications', 9:'settings',
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState(0);
  const [chartAnim, setChartAnim] = useState(false);
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setChartAnim(true), 400);
    const t2 = setTimeout(() => setProgress(72), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const page = PAGE_MAP[activeNav] || 'dashboard';

  const renderPage = () => {
    switch (page) {
      case 'findjobs':      return <FindJobs />;
      case 'savedjobs':     return <SavedJobs />;
      case 'applications':  return <Applications />;
      case 'profile':       return <MyProfile />;
      case 'resumes':       return <Resumes />;
      case 'messages':      return <Messages />;
      case 'interviews':    return <Interviews />;
      case 'notifications': return <Notifications />;
      case 'settings':      return <Settings />;
      default:              return (
        <>
          <StatCards />
          <div className="row row-2">
            <RecommendedJobs />
            <ProfileCard progress={progress} onEdit={() => setActiveNav(4)} />
          </div>
          <div className="row row-3">
            <ApplicationTracker chartAnim={chartAnim} />
            <SavedAndRecent />
            <NotificationsCard onViewAll={() => setActiveNav(8)} />
          </div>
        </>
      );
    }
  };

  return (
    <div className="dash-wrap">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="main">
        {page === 'dashboard' && (
          <div className="topbar">
            <div className="greeting">
              <h1>Good morning, Arjun 👋</h1>
              <p>You have 3 new matches &amp; 2 application updates today.</p>
            </div>
            <div className="topbar-actions">
              <div className="icon-btn" onClick={() => setActiveNav(8)} title="Notifications">
                🔔 <div className="notif-pip live" />
              </div>
              <button className="btn btn-ghost" onClick={() => setActiveNav(4)}>Update Profile</button>
              <button className="btn btn-primary" onClick={() => setActiveNav(1)}>+ Find Jobs</button>
            </div>
          </div>
        )}
        {renderPage()}
      </main>
    </div>
  );
}
