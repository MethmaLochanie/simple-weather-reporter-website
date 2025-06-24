import React, { useState } from 'react';
import { Card } from 'antd';
import { useWeather } from '../../hooks/useWeather';
import CitySearchMap from '../CitySearchMap/CitySearchMap';
import Loader from '../Loader/Loader';
import type { CityType } from '../../types/weather';

const getInitialCity = () => {
  const saved = localStorage.getItem('selectedCity');
  return saved ? JSON.parse(saved) : null;
};

const Weather: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityType | null>(getInitialCity);
  const [searchValue, setSearchValue] = useState(selectedCity?.name || '');
  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useWeather(selectedCity?.name ?? null);

  const handleCitySelect = (city: CityType) => {
    setSelectedCity(city);
    setSearchValue(city.name);
    localStorage.setItem('selectedCity', JSON.stringify(city));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-gray-800">
          Weather Reporter
        </h1>
        <CitySearchMap 
          onCitySelect={handleCitySelect} 
          value={searchValue}
          onChange={setSearchValue}
          initialCenter={selectedCity ? { lat: selectedCity.lat, lng: selectedCity.lng } : undefined}
        />
        {weatherError && (
          <div className="mb-4 text-red-600 text-center">{weatherError.message}</div>
        )}
        {weatherLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : weatherData && selectedCity ? (
          <Card className="shadow-xl rounded-lg mb-6">
            <div className="text-center p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">{selectedCity.name}</h2>
              <img
                src={`https:${weatherData.icon}`}
                alt={weatherData.condition}
                className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20"
              />
              <p className="text-xl sm:text-2xl font-medium mb-2">{weatherData.condition}</p>
              <p className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{weatherData.temperature}°C</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="bg-white/50 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-600 text-sm sm:text-base">Humidity</p>
                  <p className="text-lg sm:text-xl font-semibold">{weatherData.humidity}%</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-600 text-sm sm:text-base">Wind Speed</p>
                  <p className="text-lg sm:text-xl font-semibold">{weatherData.wind_speed} km/h</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-600 text-sm sm:text-base">UV Index</p>
                  <p className="text-lg sm:text-xl font-semibold">{weatherData.uv_index}</p>
                </div>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default Weather; 