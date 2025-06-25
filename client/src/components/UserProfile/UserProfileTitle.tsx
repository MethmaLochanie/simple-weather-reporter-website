import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const UserProfileTitle: React.FC = () => {
  return (
    <>
      <UserOutlined className="text-6xl text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
    </>
  );
};

export default UserProfileTitle; 