import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const UserProfileTitle: React.FC = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <UserOutlined className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          User Profile
        </h2>
      </div>
      <p className="text-gray-600 text-lg">
        Manage your account settings and preferences
      </p>
    </div>
  );
};

export default UserProfileTitle; 