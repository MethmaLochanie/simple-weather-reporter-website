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
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  email,
  isVerified,
  location,
  locationName,
  userLocationLastUpdate
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <UserProfileInfo 
        username={username}
        email={email}
        isVerified={isVerified}
      />
      <UserProfileLocationSection
        location={location}
        locationName={locationName}
        userLocationLastUpdate={userLocationLastUpdate}
      />
    </div>
  );
};

export default UserProfileCard; 