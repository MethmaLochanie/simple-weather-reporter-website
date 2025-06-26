import React, { useState } from 'react';
import { Card, Progress, Tooltip, Switch, Space, Button } from 'antd';
import { 
  CloudOutlined, 
  ThunderboltOutlined, 
  SunOutlined,
  DropboxOutlined,
  FireOutlined,
  RocketOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  BgColorsOutlined
} from '@ant-design/icons';
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
  lastUpdateTime?: Date | null;
  onRefresh?: () => void;
}

const WeatherDataCard: React.FC<WeatherDataCardProps> = ({ weatherData, selectedCity, lastUpdateTime, onRefresh }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  // Convert temperature between Celsius and Fahrenheit
  const convertTemperature = (temp: number, toCelsius: boolean) => {
    if (toCelsius) {
      return temp;
    } else {
      return (temp * 9/5) + 32;
    }
  };

  const displayTemperature = convertTemperature(weatherData.temperature, isCelsius);
  const temperatureUnit = isCelsius ? '°C' : '°F';

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <DropboxOutlined className="text-4xl text-blue-500" />;
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return <ThunderboltOutlined className="text-4xl text-yellow-500" />;
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return <CloudOutlined className="text-4xl text-gray-500" />;
    } else {
      return <SunOutlined className="text-4xl text-yellow-500" />;
    }
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: '#52c41a' };
    if (uv <= 5) return { level: 'Moderate', color: '#faad14' };
    if (uv <= 7) return { level: 'High', color: '#fa8c16' };
    if (uv <= 10) return { level: 'Very High', color: '#f5222d' };
    return { level: 'Extreme', color: '#722ed1' };
  };

  const uvInfo = getUVLevel(weatherData.uv_index);

  return (
    <div className="space-y-6">
      {/* Main Weather Display */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 border border-blue-100/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {selectedCity.name}
          </h2>
          <p className="text-gray-600 text-lg">Current Weather</p>
          
          {/* Temperature Unit Toggle, Last Updated, and Refresh */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">°C</span>
              <Switch 
                checked={!isCelsius} 
                onChange={(checked) => setIsCelsius(!checked)}
                size="small"
                className="bg-blue-500"
              />
              <span className="text-sm text-gray-600">°F</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ClockCircleOutlined />
              <span>
                Last updated: {lastUpdateTime ? lastUpdateTime.toLocaleTimeString() : 'Loading...'}
              </span>
              {onRefresh && (
                <Button
                  type="text"
                  icon={<ReloadOutlined />}
                  onClick={onRefresh}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  aria-label="Refresh weather data"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Weather Icon and Temperature */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={`https:${weatherData.icon}`}
                  alt={weatherData.condition}
                  className="w-24 h-24 md:w-32 md:h-32 drop-shadow-lg"
                />
                <div className="absolute -top-2 -right-2">
                  {getWeatherIcon(weatherData.condition)}
                </div>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-gray-800">
                  {displayTemperature.toFixed(1)}{temperatureUnit}
                </p>
                <p className="text-xl md:text-2xl font-medium text-gray-600">
                  {weatherData.condition}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Feels like {displayTemperature.toFixed(1)}{temperatureUnit}
                </p>
              </div>
            </div>
          </div>

          {/* Weather Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Tooltip title="Humidity Level">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/90 transition-all duration-300">
                  <BgColorsOutlined className="text-2xl text-blue-500 mb-2" />
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-xl font-bold text-gray-800">{weatherData.humidity}%</p>
                  <Progress 
                    percent={weatherData.humidity} 
                    showInfo={false} 
                    strokeColor="#1890ff"
                    size="small"
                    className="mt-2"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Wind Speed">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/90 transition-all duration-300">
                  <RocketOutlined className="text-2xl text-green-500 mb-2" />
                  <p className="text-sm text-gray-600">Wind</p>
                  <p className="text-xl font-bold text-gray-800">{weatherData.wind_speed} km/h</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {weatherData.wind_speed < 10 ? 'Light' : 
                     weatherData.wind_speed < 20 ? 'Moderate' : 'Strong'} breeze
                  </div>
                </div>
              </Tooltip>

              <Tooltip title={`UV Index: ${uvInfo.level}`}>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/90 transition-all duration-300">
                  <FireOutlined className="text-2xl text-orange-500 mb-2" />
                  <p className="text-sm text-gray-600">UV Index</p>
                  <p className="text-xl font-bold text-gray-800">{weatherData.uv_index}</p>
                  <div 
                    className="mt-2 text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: uvInfo.color }}
                  >
                    {uvInfo.level}
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Weather Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-start">
        {/* Weather Summary */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mx-auto md:col-span-2 md:w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <CloudOutlined className="mr-2 text-blue-500" />
            Weather Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Condition</span>
              <span className="font-medium text-gray-800">{weatherData.condition}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Temperature</span>
              <span className="font-medium text-gray-800">{displayTemperature.toFixed(1)}{temperatureUnit}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Feels Like</span>
              <span className="font-medium text-gray-800">{displayTemperature.toFixed(1)}{temperatureUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDataCard; 