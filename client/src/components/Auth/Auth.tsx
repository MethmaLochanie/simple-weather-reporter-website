import React, { useState, useEffect } from 'react';
import { Card, Tabs, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import type { AuthFormData } from '../../types/auth';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import AuthHeader from './Header/AuthHeader';
import AuthFooter from './Footer/AuthFooter';

const { TabPane } = Tabs;

const Auth: React.FC = () => {
  const { login, register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      message.success(location.state.message);
      // Clean the state to prevent the message from showing again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleLogin = async (values: AuthFormData) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Login successful!');
    } catch (error: any) {
      const errMsg = error.response?.data?.error || 'Login failed. Please try again.';
      if (errMsg === 'Please verify your email before logging in.') {
        navigate('/verify', { state: { fromSignup: true, email: values.email } });
      } else {
        message.error(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: AuthFormData) => {
    setLoading(true);
    try {
      await register(values.username!, values.email, values.password);
      // Set next allowed resend time (now + 5 minutes) for countdown
      const next = Date.now() + 5 * 60 * 1000;
      localStorage.setItem('nextResendTime', next.toString());
      navigate('/verify', { state: { fromSignup: true, email: values.email } });
    } catch (error: any) {
      const errMsg = error.response?.data?.error || 'Registration failed. Please try again.';
      if (errMsg === 'This email is registered but not yet verified.') {
        navigate('/verify', {
          state: {
            fromSignup: true,
            verificationMessage: 'This email is registered but not yet verified. Please check your email for the verification link or resend it.',
            email: values.email
          }
        });
      } else {
        message.error(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 bg-pattern">
      <div className="w-full max-w-md">
        <Card 
          className="shadow-2xl rounded-2xl border-0 overflow-hidden transition-all duration-300 hover:-translate-y-1"
          bodyStyle={{ padding: 0 }}
        >
          <AuthHeader activeTab={activeTab} />

          <div className="p-8">
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              centered
              className="auth-tabs"
            >
              <TabPane tab="Sign In" key="login">
                <LoginForm onLogin={handleLogin} loading={loading} />
              </TabPane>
              <TabPane tab="Sign Up" key="register">
                <RegisterForm onRegister={handleRegister} loading={loading} />
              </TabPane>
            </Tabs>
            
            <AuthFooter />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth; 