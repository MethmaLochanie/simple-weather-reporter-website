import React from 'react';
import { UserOutlined, MailOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface UserProfileInfoProps {
  username?: string;
  email?: string;
  isVerified?: boolean;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ username, email, isVerified }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl p-6 border border-blue-100/50">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <UserOutlined className="mr-2 text-blue-500" />
        Account Information
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm rounded-lg">
          <div className="flex items-center space-x-3">
            <UserOutlined className="text-blue-500" />
            <span className="font-medium text-gray-700">Username</span>
          </div>
          <span className="text-gray-900 font-semibold">{username || 'Not set'}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm rounded-lg">
          <div className="flex items-center space-x-3">
            <MailOutlined className="text-green-500" />
            <span className="font-medium text-gray-700">Email</span>
          </div>
          <span className="text-gray-900 font-semibold">{email || 'Not set'}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm rounded-lg">
          <div className="flex items-center space-x-3">
            {isVerified ? (
              <CheckCircleOutlined className="text-green-500" />
            ) : (
              <ClockCircleOutlined className="text-yellow-500" />
            )}
            <span className="font-medium text-gray-700">Status</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isVerified 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          }`}>
            {isVerified ? 'Verified' : 'Pending Verification'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo; 