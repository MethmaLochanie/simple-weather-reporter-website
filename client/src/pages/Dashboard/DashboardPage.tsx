import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { 
  UserOutlined, 
  CloudOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import Weather from '../../components/Weather/Weather';
import UserProfile from '../../components/UserProfile/UserProfile';
import GradientCloudIcon from '../../components/Icons/GradientCloudIcon';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const DashboardPage: React.FC = () => {
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState('weather');
  const navigate = useNavigate();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      key: 'weather',
      icon: <CloudOutlined />,
      label: 'Weather Dashboard',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <GradientCloudIcon style={{ fontSize: '24px', color: 'white' }} />
          <h1 className="text-white text-xl font-bold m-0 ml-3">Weather Reporter</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">
            Welcome, {user?.username || 'User'}!
          </span>
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            className="text-white hover:text-blue-200"
          >
            Logout
          </Button>
        </div>
      </Header>
      
      <Layout>
        <Sider 
          width={250} 
          className="bg-white border-r border-gray-200"
        >
          <Menu
            mode="inline"
            selectedKeys={[currentView]}
            className="h-full border-r-0"
            items={menuItems}
            onClick={({ key }) => setCurrentView(key)}
          />
        </Sider>
        
        <Layout className="p-6">
          <Content
            className="p-6 bg-white rounded-lg"
            style={{
              minHeight: 280,
              borderRadius: borderRadiusLG,
            }}
          >
            {currentView === 'weather' && <Weather />}
            {currentView === 'profile' && <UserProfile user={user} />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardPage; 