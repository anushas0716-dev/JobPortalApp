import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import SavedJobs from './pages/SavedJobs';
import CandidateResumes from './components/CandidateResumes';

// Private route component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

// Navbar component
function Navbar() {
  const location = useLocation();
  if (location.pathname === '/') return null; // Hide navbar on login page

  return (
    <nav style={{
      background: '#0d0d0d', borderBottom: '1px solid #1a1a1a',
      padding: '12px 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', fontFamily: "'Syne', sans-serif"
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width:'10px', height:'10px', background:'#ff6b35', borderRadius:'50%', display:'inline-block', boxShadow:'0 0 12px #ff6b35' }} />
        <span style={{ color:'#fff', fontWeight:'800', fontSize:'16px', textTransform:'uppercase', letterSpacing:'.05em' }}>JobPortal</span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link to="/jobs" style={{
          padding: '8px 18px', borderRadius: '8px', textDecoration: 'none',
          fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700',
          background: location.pathname === '/jobs' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/jobs' ? '#fff' : '#555',
          border: '1px solid', borderColor: location.pathname === '/jobs' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>Jobs</Link>
        <Link to="/saved-jobs" style={{
          padding: '8px 18px', borderRadius: '8px', textDecoration: 'none',
          fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700',
          background: location.pathname === '/saved-jobs' ? '#ff6b35' : 'transparent',
          color: location.pathname === '/saved-jobs' ? '#fff' : '#555',
          border: '1px solid', borderColor: location.pathname === '/saved-jobs' ? '#ff6b35' : '#222',
          transition: 'all .15s'
        }}>♥ Saved Jobs</Link>
        <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{
          padding: '8px 18px', borderRadius: '8px', border: '1px solid #222',
          background: 'transparent', color: '#555', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700'
        }}>Logout</button>
      </div>
    </nav>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/saved-jobs" element={<PrivateRoute><SavedJobs /></PrivateRoute>} />
        <Route path="/candidates/resumes" element={<CandidateResumes />} />
      </Routes>
    </Router>
  );
}

export default App;