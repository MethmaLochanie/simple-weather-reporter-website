import React, { useEffect } from 'react';
import Auth from '../../components/Auth/Auth';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

const AuthPage: React.FC = () => {
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [setLoading]);
  return <Auth />;
};

export default AuthPage; 