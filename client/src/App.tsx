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
import { LoadScript } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places' as const]} loadingElement={<Loader />}>
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
    </LoadScript>
  );
};

export default App;
