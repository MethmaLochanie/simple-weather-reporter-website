import React from 'react';
import { Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface AuthHeaderProps {
  activeTab: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ activeTab }) => {
  const titles: { [key: string]: string } = {
    login: 'Welcome Back',
    register: 'Create Account',
    verification: 'Email Verification',
  };

  const subtitles: { [key: string]: string } = {
    login: 'Sign in to your account to continue',
    register: 'Sign up to get started with Weather Reporter',
    verification: 'Please follow the steps to verify your email',
  };

  const title = titles[activeTab] || 'Welcome';
  const subtitle = subtitles[activeTab] || 'Get started with Weather Reporter';
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <UserOutlined className="text-2xl" />
      </div>
      <Title level={2} className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-2 font-bold">
        {title}
      </Title>
      <Text className="text-blue-50 font-medium">
        {subtitle}
      </Text>
    </div>
  );
};

export default AuthHeader; 