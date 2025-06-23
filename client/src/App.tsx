import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Loader from './components/Loader/Loader';
import WelcomePage from './pages/Welcome/WelcomePage';
import AuthPage from './pages/Auth/AuthPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TermsPage from './pages/Terms/TermsPage';
import PrivacyPage from './pages/Privacy/PrivacyPage';
import VerificationPage from './pages/Verification/VerificationPage';

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<WelcomePage />}
      />
      <Route
        path="/auth"
        element={
          !isAuthenticated ? (
            <AuthPage />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage />
          ) : (
            <Navigate to="/auth" state={{ from: location }} replace />
          )
        }
      />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
