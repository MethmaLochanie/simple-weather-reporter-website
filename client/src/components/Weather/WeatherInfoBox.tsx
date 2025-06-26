import React from 'react';
import { Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface WeatherInfoBoxProps {
  message: string | null;
}

const WeatherInfoBox: React.FC<WeatherInfoBoxProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="animate-fade-in">
      <Alert
        message="Location Information"
        description={message}
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        className="rounded-xl border-orange-200 bg-orange-50/80 backdrop-blur-sm"
      />
    </div>
  );
};

export default WeatherInfoBox; 