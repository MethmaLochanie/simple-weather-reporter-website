import React from 'react';
import { EnvironmentOutlined, ClockCircleOutlined, GlobalOutlined } from '@ant-design/icons';
import LocationStatus from '../LocationStatus/LocationStatus';

interface UserProfileLocationSectionProps {
  location: { latitude: number; longitude: number; lastLocationUpdate?: string } | null;
  locationName: string;
  userLocationLastUpdate?: string;
  locationSource?: 'live' | 'saved' | 'none';
}

const UserProfileLocationSection: React.FC<UserProfileLocationSectionProps> = ({
  location,
  locationName,
  userLocationLastUpdate,
  locationSource
}) => {
  if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
    return (
      <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-xl p-6 border border-green-100/50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <EnvironmentOutlined className="mr-2 text-green-500" />
          Location Information
        </h3>
        {locationSource && <LocationStatus source={locationSource} />}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm rounded-lg">
            <div className="flex items-center space-x-3">
              <GlobalOutlined className="text-blue-500" />
              <span className="font-medium text-gray-700">Current Location</span>
            </div>
            <span className="text-gray-900 font-semibold text-right max-w-xs truncate">
              {locationName || 'Unknown Location'}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm rounded-lg">
            <div className="flex items-center space-x-3">
              <ClockCircleOutlined className="text-purple-500" />
              <span className="font-medium text-gray-700">Last Updated</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {new Date((location.lastLocationUpdate || userLocationLastUpdate || Date.now()) as string | number).toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm rounded-lg">
            <div className="flex items-center space-x-3">
              <EnvironmentOutlined className="text-orange-500" />
              <span className="font-medium text-gray-700">Coordinates</span>
            </div>
            <span className="text-gray-900 font-semibold text-sm">
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="Google Map"
              className="w-full h-[300px] border-0"
              src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <EnvironmentOutlined className="mr-2 text-gray-500" />
        Location Information
      </h3>
      {locationSource && <LocationStatus source={locationSource} />}
      <div className="text-center py-8">
        <EnvironmentOutlined className="text-4xl text-gray-400 mb-4" />
        <p className="text-gray-600">No location data available</p>
        <p className="text-sm text-gray-500 mt-2">Enable location access to see your current location</p>
      </div>
    </div>
  );
};

export default UserProfileLocationSection; 