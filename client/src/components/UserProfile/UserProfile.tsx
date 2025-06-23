import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import type { User } from '../../types/auth';
import { useReverseGeocode } from '../../hooks/useReverseGeocode';

interface UserProfileProps {
  user: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const locationName = useReverseGeocode(user?.location?.latitude, user?.location?.longitude);
  return (
    <div className="text-center py-8">
      <UserOutlined className="text-6xl text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Username:</span>
            <span className="text-gray-900">{user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              user?.isVerified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user?.isVerified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
          {/* Location Section */}
          {user?.location &&
            typeof user.location.latitude === 'number' &&
            typeof user.location.longitude === 'number' ? (
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-600">Current Location:</span>
                <span className="text-gray-900">
                  {locationName
                    ? locationName.split(',')[0]
                    : `${user.location.latitude.toFixed(5)}, ${user.location.longitude.toFixed(5)}`}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-600">Last Updated:</span>
                <span className="text-gray-900">
                  {new Date(user.location.lastLocationUpdate).toLocaleString()}
                </span>
              </div>
              <div className="mt-4 rounded overflow-hidden h-[250px]">
                <iframe
                  title="Google Map"
                  className="w-full h-full border-0"
                  src={`https://www.google.com/maps?q=${user.location.latitude},${user.location.longitude}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center text-gray-500">
              <EnvironmentOutlined className="text-3xl mb-2" />
              <span className="text-base font-medium">
                Location not set. Enable location access for a better experience.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 