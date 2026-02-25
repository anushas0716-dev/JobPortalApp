import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ScheduleInterview from './pages/ScheduleInterview';
import InterviewList from './pages/InterviewList';
import InterviewDetail from './pages/InterviewDetail';
import RecordFeedback from './pages/RecordFeedback';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="spinner"></div></div>;
  return user ? children : <Navigate to="/login" />;
};

const RecruiterRoute = ({ children }) => {
  const { user, isRecruiter, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (!isRecruiter) return <Navigate to="/dashboard" />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/interviews" element={<ProtectedRoute><InterviewList /></ProtectedRoute>} />
        <Route path="/interviews/:id" element={<ProtectedRoute><InterviewDetail /></ProtectedRoute>} />
        <Route path="/schedule" element={<RecruiterRoute><ScheduleInterview /></RecruiterRoute>} />
        <Route path="/interviews/:id/feedback" element={<RecruiterRoute><RecordFeedback /></RecruiterRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
