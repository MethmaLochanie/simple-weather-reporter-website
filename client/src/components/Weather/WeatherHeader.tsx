import React from "react";
import { Button, Space } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import WeatherTitle from "./WeatherTitle";

interface WeatherHeaderProps {
  onGetCurrentLocation: () => void;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  onGetCurrentLocation,
}) => {
  return (
    <div className="space-y-6">
      <WeatherTitle />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            Real-time weather updates
          </span>
        </div>

        <Space size="middle">
          <Button
            type="primary"
            icon={<EnvironmentOutlined />}
            onClick={onGetCurrentLocation}
            className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Current Location
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default WeatherHeader;
