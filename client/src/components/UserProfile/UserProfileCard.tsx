import React from 'react';
import UserProfileInfo from './UserProfileInfo';
import UserProfileLocationSection from './UserProfileLocationSection';

interface UserProfileCardProps {
  username?: string;
  email?: string;
  isVerified?: boolean;
  location: { latitude: number; longitude: number; lastLocationUpdate?: string } | null;
  locationName: string;
  userLocationLastUpdate?: string;
  locationSource?: 'live' | 'saved' | 'none';
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  email,
  isVerified,
  location,
  locationName,
  userLocationLastUpdate,
  locationSource
}) => {
  return (
    <div className="space-y-6">
      <UserProfileInfo 
        username={username}
        email={email}
        isVerified={isVerified}
      />
      <UserProfileLocationSection
        location={location}
        locationName={locationName}
        userLocationLastUpdate={userLocationLastUpdate}
        locationSource={locationSource}
      />
    </div>
  );
};

export default UserProfileCard; 