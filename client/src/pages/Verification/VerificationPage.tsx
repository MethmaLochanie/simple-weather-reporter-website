import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Result, Button, Spin } from 'antd';
import AuthHeader from '../../components/Auth/Header/AuthHeader';

const VerificationPage: React.FC = () => {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [status, setStatus] = useState<'processing' | 'error'>('processing');
  const [message, setMessage] = useState('We are verifying your email, please wait...');
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;

    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('No verification token found. Please check your verification link.');
      return;
    }

    const doVerification = async () => {
      hasVerified.current = true;
      try {
        const response = await verifyEmail(token);
        navigate('/auth', { 
          replace: true, 
          state: { 
            message: response.message || 'Email verified successfully! You can now log in.'
          } 
        });
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.error || 'Email verification failed. Please try again.');
        navigate('/verify', { replace: true });
      }
    };

    doVerification();
  }, [searchParams, verifyEmail, navigate]);

  const renderResult = () => {
    if (status === 'processing') {
      return <Result icon={<Spin size="large" />} title="Verifying Email" subTitle={message} />;
    }

    return (
      <Result
        status="error"
        title="Verification Failed"
        subTitle={message}
        extra={
          <Button type="primary" onClick={() => navigate('/auth')}>
            Back to Login
          </Button>
        }
      />
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 bg-pattern">
      <div className="w-full max-w-md">
        <Card 
          className="shadow-2xl rounded-2xl border-0 overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          <AuthHeader activeTab="verification" />
          <div className="p-8">
            {renderResult()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPage; 