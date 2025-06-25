import React from 'react';
import { Card } from 'antd';
import type { CityType } from '../../types/weather';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  uv_index: number;
}

interface WeatherDataCardProps {
  weatherData: WeatherData;
  selectedCity: CityType;
}

const WeatherDataCard: React.FC<WeatherDataCardProps> = ({ weatherData, selectedCity }) => {
  return (
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
  );
};

export default WeatherDataCard; 