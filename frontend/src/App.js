import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import CandidateRegistration from './pages/CandidateRegistration';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateProfile from './pages/CandidateProfile';
import ProfileSettings from './pages/ProfileSettings';
import CompanyDashboard from './pages/CompanyDashboard';
import EmployerPostJob from './pages/EmployerPostJob';
import EmployerCandidates from './pages/EmployerCandidates';
import EmployerProfile from './pages/EmployerProfile';
import EmployerRegistration from './pages/EmployerRegistration';
import Jobs from './pages/Jobs';
import SavedJobs from './pages/SavedJobs';
import ResumeUpload from './pages/ResumeUpload';
import CandidateResumes from './components/CandidateResumes';
import NotificationsPage, { NotificationBell } from './pages/Notifications';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function Navbar() {
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  let userRole = null;
  if (storedUser) {
    try {
      userRole = JSON.parse(storedUser).role || null;
    } catch (err) {
      userRole = null;
    }
  }

  const hiddenRoutes = new Set([
    '/', '/register', '/forgot-password', '/otp-verification', '/reset-password',
  ]);
  if (hiddenRoutes.has(location.pathname)) return null;

  const navLink = (to, label) => (
    <Link to={to} style={{
      padding: '8px 18px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontFamily: "'Syne', sans-serif",
      fontSize: '13px',
      fontWeight: '700',
      background: location.pathname === to ? '#ff6b35' : 'transparent',
      color: location.pathname === to ? '#fff' : '#555',
      border: '1px solid',
      borderColor: location.pathname === to ? '#ff6b35' : '#222',
      transition: 'all .15s'
    }}>{label}</Link>
  );

  return (
    <nav style={{
      background: '#0d0d0d',
      borderBottom: '1px solid #1a1a1a',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: "'Syne', sans-serif"
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: '10px', height: '10px', background: '#ff6b35',
          borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 12px #ff6b35'
        }} />
        <span style={{
          color: '#fff', fontWeight: '800', fontSize: '16px',
          textTransform: 'uppercase', letterSpacing: '.05em'
        }}>JobPortal</span>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {userRole === 'employer' ? (
          <>
            {navLink('/company-dashboard', 'Dashboard')}
            {navLink('/employer/post-job', 'Post Job')}
            {navLink('/employer/candidates', 'Candidates')}
            {navLink('/employer/profile', 'Profile')}
          </>
        ) : (
          <>
            {navLink('/candidate-dashboard', 'Dashboard')}
            {navLink('/candidate-profile', 'Profile')}
            {navLink('/jobs', 'Jobs')}
            {navLink('/saved-jobs', '♥ Saved')}
            {navLink('/resumes', '📄 Resumes')}
            {navLink('/profile-settings', 'Settings')}
          </>
        )}

        {/* Notification Bell */}
        <NotificationBell />

        {/* Logout */}
        <button
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          style={{
            padding: '8px 18px', borderRadius: '8px', border: '1px solid #222',
            background: 'transparent', color: '#555', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700'
          }}
        >Logout</button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"                       element={<Login />} />
        <Route path="/register"               element={<CandidateRegistration />} />
        <Route path="/forgot-password"        element={<ForgotPassword />} />
        <Route path="/otp-verification"       element={<OtpVerification />} />
        <Route path="/reset-password"         element={<ResetPassword />} />
        <Route path="/candidate-dashboard"    element={<PrivateRoute><CandidateDashboard /></PrivateRoute>} />
        <Route path="/candidate-profile"      element={<PrivateRoute><CandidateProfile /></PrivateRoute>} />
        <Route path="/profile-settings"       element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
        <Route path="/company-dashboard"      element={<PrivateRoute><CompanyDashboard /></PrivateRoute>} />
        <Route path="/employer/register"      element={<EmployerRegistration />} />
        <Route path="/employer/post-job"      element={<PrivateRoute><EmployerPostJob /></PrivateRoute>} />
        <Route path="/employer/candidates"    element={<PrivateRoute><EmployerCandidates /></PrivateRoute>} />
        <Route path="/employer/profile"       element={<PrivateRoute><EmployerProfile /></PrivateRoute>} />
        <Route path="/jobs"                   element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/saved-jobs"             element={<PrivateRoute><SavedJobs /></PrivateRoute>} />
        <Route path="/resumes"                element={<PrivateRoute><ResumeUpload /></PrivateRoute>} />
        <Route path="/candidates/resumes"     element={<PrivateRoute><CandidateResumes /></PrivateRoute>} />
        <Route path="/notifications"          element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;