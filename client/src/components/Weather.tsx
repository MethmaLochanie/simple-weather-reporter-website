import React, { useState } from 'react';
import { Input, Card, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useWeather } from '../hooks/useWeather';

const Weather: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data: weatherData, isLoading, error } = useWeather(searchQuery);

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Weather Reporter
        </h1>
        
        <div className="mb-8">
          <Input.Search
            placeholder="Enter city name"
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            className="rounded-lg shadow-lg"
          />
        </div>

        {error && (
          <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        {isLoading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : weatherData ? (
          <Card className="shadow-xl rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-4">{weatherData.location}</h2>
              <img
                src={`https:${weatherData.icon}`}
                alt={weatherData.condition}
                className="mx-auto mb-4"
              />
              <p className="text-2xl font-medium mb-2">{weatherData.condition}</p>
              <p className="text-4xl font-bold mb-6">{weatherData.temperature}°C</p>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-gray-600">Humidity</p>
                  <p className="text-xl font-semibold">{weatherData.humidity}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Wind Speed</p>
                  <p className="text-xl font-semibold">{weatherData.wind_speed} km/h</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">UV Index</p>
                  <p className="text-xl font-semibold">{weatherData.uv_index}</p>
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