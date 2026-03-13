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
import CandidateResumes from './components/CandidateResumes';
import ResumeUpload from './pages/ResumeUpload';

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
    '/',
    '/register',
    '/forgot-password',
    '/otp-verification',
    '/reset-password',
  ]);
  if (hiddenRoutes.has(location.pathname)) return null;

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: '10px',
          height: '10px',
          background: '#ff6b35',
          borderRadius: '50%',
          display: 'inline-block',
          boxShadow: '0 0 12px #ff6b35'
        }} />
        <span style={{
          color: '#fff',
          fontWeight: '800',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '.05em'
        }}>JobPortal</span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {userRole === 'employer' ? (
          <>
            <Link to="/company-dashboard" style={{
              padding: '8px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: "'Syne', sans-serif",
              fontSize: '13px',
              fontWeight: '700',
              background: location.pathname === '/company-dashboard' ? '#ff6b35' : 'transparent',
              color: location.pathname === '/company-dashboard' ? '#fff' : '#555',
              border: '1px solid',
              borderColor: location.pathname === '/company-dashboard' ? '#ff6b35' : '#222',
              transition: 'all .15s'
            }}>Dashboard</Link>

            <Link to="/employer/post-job" style={{
              padding: '8px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: "'Syne', sans-serif",
              fontSize: '13px',
              fontWeight: '700',
              background: location.pathname === '/employer/post-job' ? '#ff6b35' : 'transparent',
              color: location.pathname === '/employer/post-job' ? '#fff' : '#555',
              border: '1px solid',
              borderColor: location.pathname === '/employer/post-job' ? '#ff6b35' : '#222',
              transition: 'all .15s'
            }}>Post Job</Link>

            <Link to="/employer/candidates" style={{
              padding: '8px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: "'Syne', sans-serif",
              fontSize: '13px',
              fontWeight: '700',
              background: location.pathname === '/employer/candidates' ? '#ff6b35' : 'transparent',
              color: location.pathname === '/employer/candidates' ? '#fff' : '#555',
              border: '1px solid',
              borderColor: location.pathname === '/employer/candidates' ? '#ff6b35' : '#222',
              transition: 'all .15s'
            }}>Candidates</Link>

            <Link to="/employer/profile" style={{
              padding: '8px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: "'Syne', sans-serif",
              fontSize: '13px',
              fontWeight: '700',
              background: location.pathname === '/employer/profile' ? '#ff6b35' : 'transparent',
              color: location.pathname === '/employer/profile' ? '#fff' : '#555',
              border: '1px solid',
              borderColor: location.pathname === '/employer/profile' ? '#ff6b35' : '#222',
              transition: 'all .15s'
            }}>Profile</Link>
          </>
        ) : (
          <>
        <Link to="/candidate-dashboard" style={{
          padding: '8px 18px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
          fontSize: '13px',
          fontWeight: '700',
          background: location.pathname === '/candidate-dashboard' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/candidate-dashboard' ? '#fff' : '#555',
          border: '1px solid',
          borderColor: location.pathname === '/candidate-dashboard' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>Dashboard</Link>

        <Link to="/candidate-profile" style={{
          padding: '8px 18px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
          fontSize: '13px',
          fontWeight: '700',
          background: location.pathname === '/candidate-profile' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/candidate-profile' ? '#fff' : '#555',
          border: '1px solid',
          borderColor: location.pathname === '/candidate-profile' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>Profile</Link>

        <Link to="/jobs" style={{
          padding: '8px 18px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
          fontSize: '13px',
          fontWeight: '700',
          background: location.pathname === '/jobs' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/jobs' ? '#fff' : '#555',
          border: '1px solid',
          borderColor: location.pathname === '/jobs' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>Jobs</Link>

        <Link to="/saved-jobs" style={{
          padding: '8px 18px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
          fontSize: '13px',
          fontWeight: '700',
          background: location.pathname === '/saved-jobs' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/saved-jobs' ? '#fff' : '#555',
          border: '1px solid',
          borderColor: location.pathname === '/saved-jobs' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>♥ Saved Jobs</Link>

        <Link to="/resumes" style={{
          padding: '8px 18px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
          fontSize: '13px',
          fontWeight: '700',
          background: location.pathname === '/resumes' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/resumes' ? '#fff' : '#555',
          border: '1px solid',
          borderColor: location.pathname === '/resumes' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>📄 Resumes</Link>

        <Link to="/profile-settings" style={{
          padding: '8px 18px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
          fontSize: '13px',
          fontWeight: '700',
          background: location.pathname === '/profile-settings' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/profile-settings' ? '#fff' : '#555',
          border: '1px solid',
          borderColor: location.pathname === '/profile-settings' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>Settings</Link>
          </>
        )}

        <button
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          style={{
            padding: '8px 18px',
            borderRadius: '8px',
            border: '1px solid #222',
            background: 'transparent',
            color: '#555',
            cursor: 'pointer',
            fontFamily: "'Syne', sans-serif",
            fontSize: '13px',
            fontWeight: '700'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<CandidateRegistration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/candidate-dashboard" element={<PrivateRoute><CandidateDashboard /></PrivateRoute>} />
        <Route path="/candidate-profile" element={<PrivateRoute><CandidateProfile /></PrivateRoute>} />
        <Route path="/profile-settings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
        <Route path="/company-dashboard" element={<PrivateRoute><CompanyDashboard /></PrivateRoute>} />
        <Route path="/employer/register" element={<EmployerRegistration />} />
        <Route path="/employer/post-job" element={<PrivateRoute><EmployerPostJob /></PrivateRoute>} />
        <Route path="/employer/candidates" element={<PrivateRoute><EmployerCandidates /></PrivateRoute>} />
        <Route path="/employer/profile" element={<PrivateRoute><EmployerProfile /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/saved-jobs" element={<PrivateRoute><SavedJobs /></PrivateRoute>} />
        <Route path="/candidates/resumes" element={<CandidateResumes />} />
        <Route path="/resumes" element={<PrivateRoute><ResumeUpload /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
