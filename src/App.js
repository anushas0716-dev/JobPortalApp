import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { CompanyRegistration } from './pages/CompanyRegistration';
import { CompanyDashboard } from './pages/CompanyDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Dashboard />
          {/* You can switch between components if needed */}
          {/* <CompanyRegistration /> */}
          {/* <CompanyDashboard /> */}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;