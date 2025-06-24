import React, { useEffect } from 'react';
import WelcomeHero from '../../components/WelcomeHero/WelcomeHero';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

const WelcomePage: React.FC = () => {
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [setLoading]);
  return <WelcomeHero />;
};

export default WelcomePage; 