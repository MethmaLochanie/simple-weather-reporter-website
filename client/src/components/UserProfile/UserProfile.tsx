import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { User } from '../../types/auth';

interface UserProfileProps {
  user: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 