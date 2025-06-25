import React from 'react';
import WeatherTitle from './WeatherTitle';

interface WeatherHeaderProps {
  onGetCurrentLocation: () => void;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ onGetCurrentLocation }) => {
  return (
    <>
      <WeatherTitle />
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          onClick={onGetCurrentLocation}
        >
          Get Current Location
        </button>
      </div>
    </>
  );
};

export default WeatherHeader; 