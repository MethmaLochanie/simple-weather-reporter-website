import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext/AuthContext';
import WelcomePage from './pages/Welcome/WelcomePage';
import AuthPage from './pages/Auth/AuthPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TermsPage from './pages/Terms/TermsPage';
import PrivacyPage from './pages/Privacy/PrivacyPage';
import VerificationPage from './pages/Verification/VerificationPage';
import { LoadScript } from '@react-google-maps/api';
import { LoadingProvider, useLoading } from './contexts/LoadingContext/LoadingContext';
import Loader from './components/Loader/Loader';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isLoading } = useLoading();
  const location = useLocation();

  return (
    <>
      {isLoading && <Loader />}
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places' as const]} loadingElement={<Loader />}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" state={{ from: location }} replace />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LoadScript>
    </>
  );
};

const App: React.FC = () => (
  <LoadingProvider>
    <AppRoutes />
  </LoadingProvider>
);

export default App;
