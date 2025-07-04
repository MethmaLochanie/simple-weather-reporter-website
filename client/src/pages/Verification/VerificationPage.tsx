import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { Card, Result, Button, message } from 'antd';
import { MailOutlined, ReloadOutlined } from '@ant-design/icons';
import AuthHeader from '../../components/Auth/Header/AuthHeader';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';
import Loader from '../../components/Loader/Loader';

const VerificationPage: React.FC = () => {
  const { verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { setLoading } = useLoading();
  
  const [status, setStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('processing');
  const [statusMessage, setStatusMessage] = useState('We are verifying your email, please wait...');
  const emailFromState = location.state?.email || '';
  const [email] = useState(emailFromState);
  const [resendLoading, setResendLoading] = useState(false);
  const hasVerified = useRef(false);
  const [nextResendTime, setNextResendTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const verificationMessage = location.state?.verificationMessage;

  useEffect(() => {
    setLoading(status === 'processing');
  }, [status, setLoading]);

  useEffect(() => {
    const token = searchParams.get('token');
    const isPostSignup = location.state?.fromSignup;

    if (!token && !isPostSignup) {
      setStatus('error');
      setStatusMessage('No verification token found. Please check your verification link.');
      return;
    }

    // If this is a post-signup redirect, show pending state
    if (isPostSignup) {
      setStatus('pending');
      setStatusMessage('A verification email has been sent to your address. Please check your inbox and follow the instructions to verify your account.');
      return;
    }

    // If there's a token, proceed with verification
    if (token && !hasVerified.current) {
      const doVerification = async () => {
        hasVerified.current = true;
        try {
          const response = await verifyEmail(token);
          setStatus('success');
          setStatusMessage(response.message || 'Email verified successfully! You can now log in.');
        } catch (error: any) {
          setStatus('error');
          setStatusMessage(error.response?.data?.error || 'Email verification failed. Please try again.');
        }
      };

      doVerification();
    }
  }, [searchParams, location.state, verifyEmail]);

  // On mount, restore timer from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('nextResendTime');
    if (stored) {
      const next = parseInt(stored, 10);
      if (next > Date.now()) setNextResendTime(next);
      else localStorage.removeItem('nextResendTime');
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (!nextResendTime) return;
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((nextResendTime - Date.now()) / 1000));
      setCountdown(diff);
      if (diff === 0) {
        setNextResendTime(null);
        localStorage.removeItem('nextResendTime');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextResendTime]);

  const handleResendEmail = async () => {
    if (!email) {
      message.error('No email found. Please go back and try again.');
      return;
    }
    setResendLoading(true);
    try {
      const response = await resendVerification(email);
      message.success(response.message);
      // Set next allowed resend time (now + 5 minutes)
      const next = Date.now() + 5 * 60 * 1000;
      setNextResendTime(next);
      localStorage.setItem('nextResendTime', next.toString());
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to resend verification email. Please try again.';
      message.error(errorMessage);
      // If rate limit error, set timer
      if (errorMessage.includes('You can only resend')) {
        const next = Date.now() + 5 * 60 * 1000;
        setNextResendTime(next);
        localStorage.setItem('nextResendTime', next.toString());
      }
    } finally {
      setResendLoading(false);
    }
  };

  const renderResult = () => {
    if (status === 'pending') {
      return (
        <Result
          icon={<MailOutlined style={{ color: '#1890ff' }} />}
          title={<span className="text-blue-600 font-semibold">Check Your Email</span>}
          subTitle={
            <div className="text-left">
              <p className="mb-3">{statusMessage}</p>
              {verificationMessage && (
                <div className="mb-4 p-3 rounded bg-yellow-50 border border-yellow-200 text-yellow-800 font-medium">
                  {verificationMessage}
                </div>
              )}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">📧 What to look for:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Check your inbox and spam/junk folder</li>
                  <li>• Look for an email from our service</li>
                  <li>• Subject line: "Verify Your Email - Weather Reporter"</li>
                  <li>• Click the verification link in the email</li>
                </ul>
                <p className="text-xs text-blue-600 mt-3">
                  💡 <strong>Tip:</strong> Emails may take 5-10 minutes to arrive. If you don't see it, check your spam folder.
                </p>
              </div>
              {/* Resend Email Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">📬 Didn't receive the email?</h4>
                {email ? (
                  <>
                    <div className="mb-2 text-sm text-gray-700">
                      <span className="font-medium">Your email:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">{email}</span>
                    </div>
                    <Button
                      type="primary"
                      icon={<ReloadOutlined />}
                      loading={resendLoading}
                      onClick={handleResendEmail}
                      className="w-full h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                      disabled={!!nextResendTime && countdown > 0}
                    >
                      {nextResendTime && countdown > 0
                        ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`
                        : 'Resend Verification Email'}
                    </Button>
                  </>
                ) : (
                  <div className="text-red-600 text-sm">No email found. Please go back and try again.</div>
                )}
              </div>
            </div>
          }
          extra={
            <Button
              type="primary"
              className="w-full h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => navigate('/auth')}
            >
              Back to Login
            </Button>
          }
        />
      );
    }

    if (status === 'processing') {
      return <Result icon={<Loader />} title="Verifying Email" subTitle={statusMessage} />;
    }
    if (status === 'success') {
      return (
        <Result
          status="success"
          title="Verification Successful!"
          subTitle={statusMessage}
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
        subTitle={statusMessage}
        extra={
          <Button 
            type="primary" 
            className="w-full h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => navigate('/auth')}
          >
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