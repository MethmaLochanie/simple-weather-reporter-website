import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Button, theme, message, Avatar, Dropdown, Space, Badge, Drawer } from 'antd';
import { 
  UserOutlined, 
  CloudOutlined, 
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import Weather from '../../components/Weather/Weather';
import UserProfile from '../../components/UserProfile/UserProfile';
import GradientCloudIcon from '../../components/Icons/GradientCloudIcon';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../../api/userApis';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

const { Header, Content, Sider } = Layout;

const DashboardPage: React.FC = () => {
  const { logout, user, setUser, isLoading } = useAuth();
  const { setLoading } = useLoading();
  const [currentView, setCurrentView] = useState('weather');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const navigate = useNavigate();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const locationUpdateAttemptedRef = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
      setCollapsed(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      icon: <CloudOutlined className="text-lg" />,
      label: 'Weather Dashboard',
    },
    {
      key: 'profile',
      icon: <UserOutlined className="text-lg" />,
      label: 'Profile',
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header
        className={
          `flex items-center justify-between px-4 md:px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-lg relative overflow-hidden ` +
          (isMobile ? 'fixed top-0 left-0 w-full z-50' : '')
        }
        style={isMobile ? { height: 64, minHeight: 64 } : {}}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="flex items-center space-x-4 relative z-10">
          {/* Clickable logo and app name */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <span className="inline-flex items-center justify-center">
              <GradientCloudIcon style={{ fontSize: '32px', color: 'white', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))' }} />
            </span>
            <h1 className="text-white text-lg md:text-xl font-bold m-0 ml-3 hidden sm:block">
              Weather Reporter
            </h1>
          </div>
        </div>
        <div className={`items-center space-x-4 relative z-10 ${isMobile ? 'hidden' : 'flex'}`}>
          <Button
            type="text"
            icon={<CloudOutlined />}
            className="bg-transparent text-white text-base font-medium"
            style={{
              boxShadow: 'none',
              background: 'transparent',
              color: 'white',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
            onFocus={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
            onBlur={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
            onClick={() => setCurrentView('weather')}
          >
            <span className="hidden md:inline">Dashboard</span>
          </Button>
          <div
            className="flex items-center space-x-2 cursor-pointer group bg-transparent rounded px-2 py-1"
            onClick={() => setCurrentView('profile')}
          >
            <Avatar 
              size={32}
              icon={<UserOutlined />}
              className=""
              style={{ background: 'transparent', boxShadow: 'none' }}
            />
            <span className="text-white text-sm hidden md:block font-medium transition-colors duration-200">
              {user?.username || 'User'}
            </span>
          </div>
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            className="bg-transparent text-white rounded transition-colors duration-200"
            style={{ boxShadow: 'none' }}
            aria-label="Logout"
          />
        </div>
        {/* Hamburger for mobile */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: 'white' }} />}
            className="bg-transparent text-white flex md:hidden"
            style={{ boxShadow: 'none' }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          />
        )}
      </Header>
      
      {/* Mobile Drawer Menu */}
      {isMobile && (
        <Drawer
          title={
            <div className="flex items-center space-x-2">
              <GradientCloudIcon style={{ fontSize: '28px' }} />
              <span className="font-bold text-lg">Menu</span>
            </div>
          }
          placement="left"
          closable={true}
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="vertical"
            selectedKeys={[currentView]}
            items={menuItems}
            onClick={({ key }) => {
              setCurrentView(key);
              setMobileMenuOpen(false);
            }}
            style={{ border: 'none' }}
          />
          <div className="flex items-center px-4 py-3 border-t">
            <Avatar size={32} icon={<UserOutlined />} className="mr-2" />
            <span className="font-medium">{user?.username || 'User'}</span>
          </div>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-3 text-red-600"
            style={{ boxShadow: 'none' }}
          >
            Logout
          </Button>
        </Drawer>
      )}
      
      {/* Main Content Area */}
      <Layout className="relative">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0 opacity-5 transition-opacity duration-1000"
        />
        
        <Content className="relative z-10 p-4 md:p-6 lg:p-8">
          <div 
            className="min-h-[calc(100vh-120px)] bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
            style={{
              borderRadius: borderRadiusLG,
            }}
          >            
            <div className="p-6">
              {currentView === 'weather' && <Weather />}
              {currentView === 'profile' && <UserProfile />}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage; 