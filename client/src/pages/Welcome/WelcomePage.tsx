import React, { useEffect, useState } from 'react';
import WelcomeHero from '../../components/WelcomeHero/WelcomeHero';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

const WelcomePage: React.FC = () => {
  const { setLoading } = useLoading();
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [setLoading]);

  // Check if API is available
  useEffect(() => {
    const checkApi = async () => {
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/health`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        if (!response.ok) setDemoMode(true);
      } catch {
        setDemoMode(true);
      }
    };
    
    checkApi();
  }, []);

  // Show demo message if API is not available
  if (demoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-8">
            <div className="text-6xl mb-4">🎬</div>
            <h1 className="text-3xl font-bold text-amber-800 mb-4">
              Demo Mode
            </h1>
            <p className="text-lg text-amber-700 mb-6">
              This demo is for portfolio purposes only. API access has been disabled after recording.
            </p>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
              <p className="text-sm text-amber-600">
                This is an educational project showcasing a full-stack weather application. 
                The app demonstrates modern web development practices including React, TypeScript, 
                Node.js, and real-time weather data integration.
              </p>
            </div>
            <div className="mt-6">
              <p className="text-sm text-amber-600">
                In a live environment, this would be a fully functional weather application 
                with real-time data, user authentication, and location-based services.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <WelcomeHero />;
};

export default WelcomePage; 