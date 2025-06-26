import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { Card, Result, Button, Spin } from 'antd';
import AuthHeader from '../../components/Auth/Header/AuthHeader';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

const VerificationPage: React.FC = () => {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setLoading } = useLoading();
  
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('We are verifying your email, please wait...');
  const hasVerified = useRef(false);

  useEffect(() => {
    setLoading(status === 'processing');
  }, [status, setLoading]);

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
        setStatus('success');
        setMessage(response.message || 'Email verified successfully! You can now log in.');
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.error || 'Email verification failed. Please try again.');
      }
    };

    doVerification();
  }, [searchParams, verifyEmail]);

  const renderResult = () => {
    if (status === 'processing') {
      return <Result icon={<Spin size="large" />} title="Verifying Email" subTitle={message} />;
    }
    if (status === 'success') {
      return (
        <Result
          status="success"
          title="Verification Successful!"
          subTitle={message}
          extra={
            <Button
              type="primary"
              className="w-full h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => navigate('/auth')}
            >
              Go to Login
            </Button>
          }
        />
      );
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