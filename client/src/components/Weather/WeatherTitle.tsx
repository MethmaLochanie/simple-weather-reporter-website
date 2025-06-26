import React from 'react';
import { CloudOutlined } from '@ant-design/icons';

const WeatherTitle: React.FC = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <div className="w-12 h-12 aspect-square bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <CloudOutlined className="text-2xl text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Weather Dashboard
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Get accurate weather information for any location worldwide
      </p>
    </div>
  );
};

export default WeatherTitle; 