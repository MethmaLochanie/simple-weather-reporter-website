import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Button, theme, message } from 'antd';
import { 
  UserOutlined, 
  CloudOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import Weather from '../../components/Weather/Weather';
import UserProfile from '../../components/UserProfile/UserProfile';
import GradientCloudIcon from '../../components/Icons/GradientCloudIcon';
import { useNavigate } from 'react-router-dom';
import userApis from '../../api/userApis';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

const { Header, Content, Sider } = Layout;

const DashboardPage: React.FC = () => {
  const { logout, user, setUser, isLoading } = useAuth();
  const { setLoading } = useLoading();
  const [currentView, setCurrentView] = useState('weather');
  const navigate = useNavigate();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const locationUpdateAttemptedRef = useRef(false);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (!user) return;
    if (!navigator.geolocation) return;
    if (locationUpdateAttemptedRef.current) return;

    // Only run if location is missing or invalid
    const last = user.location;
    const needsLocation =
      !last ||
      typeof last.latitude !== 'number' ||
      typeof last.longitude !== 'number';

    if (!needsLocation) {
      locationUpdateAttemptedRef.current = true;
      return;
    }

    locationUpdateAttemptedRef.current = true; // Set immediately to prevent race
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await userApis.updateLocation(latitude, longitude);
          const updatedProfile = await userApis.getProfile();
          setUser(updatedProfile);
          message.success(res.message);
        } catch (err) {
          message.error('Failed to update location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        // User denied location or error occurred: do nothing
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );
  }, [user, setUser, setLoading]);

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
            {currentView === 'profile' && <UserProfile />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardPage; 