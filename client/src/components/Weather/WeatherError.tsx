import React from 'react';

interface WeatherErrorProps {
  error: Error | null;
}

const WeatherError: React.FC<WeatherErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mb-4 text-red-600 text-center">{error.message}</div>
  );
};

export default WeatherError; 