import React from 'react';

interface UserProfileInfoProps {
  username?: string;
  email?: string;
  isVerified?: boolean;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ username, email, isVerified }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="font-medium text-gray-600">Username:</span>
        <span className="text-gray-900">{username}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-gray-600">Email:</span>
        <span className="text-gray-900">{email}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-gray-600">Status:</span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          isVerified 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isVerified ? 'Verified' : 'Pending Verification'}
        </span>
      </div>
    </div>
  );
};

export default UserProfileInfo; 