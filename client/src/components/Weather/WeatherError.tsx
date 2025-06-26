import React from 'react';
import { Alert } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

interface WeatherErrorProps {
  error: Error | null;
}

const WeatherError: React.FC<WeatherErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="animate-fade-in">
      <Alert
        message="Weather Data Error"
        description={error.message}
        type="error"
        showIcon
        icon={<CloseCircleOutlined />}
        className="rounded-xl border-red-200 bg-red-50/80 backdrop-blur-sm"
        action={
          <button className="text-red-600 hover:text-red-800 font-medium text-sm">
            Try Again
          </button>
        }
      />
    </div>
  );
};

export default WeatherError; 