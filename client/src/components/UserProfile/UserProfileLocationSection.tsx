import React from 'react';

interface UserProfileLocationSectionProps {
  location: { latitude: number; longitude: number; lastLocationUpdate?: string } | null;
  locationName: string;
  userLocationLastUpdate?: string;
}

const UserProfileLocationSection: React.FC<UserProfileLocationSectionProps> = ({
  location,
  locationName,
  userLocationLastUpdate
}) => {
  if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
    return (
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-600">Current Location:</span>
          <span className="text-gray-900">
            {locationName}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-600">Last Updated:</span>
          <span className="text-gray-900">
            {new Date((location.lastLocationUpdate || userLocationLastUpdate || Date.now()) as string | number).toLocaleString()}
          </span>
        </div>
        <div className="mt-4 rounded overflow-hidden h-[250px]">
          <iframe
            title="Google Map"
            className="w-full h-full border-0"
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }

  return null;
};

export default UserProfileLocationSection; 