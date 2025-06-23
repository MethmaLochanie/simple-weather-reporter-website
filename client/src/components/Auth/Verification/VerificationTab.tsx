import React from 'react';
import { Button, Result } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, MailOutlined } from '@ant-design/icons';

interface VerificationTabProps {
  status: 'pending' | 'success' | 'error';
  message: string;
  onBackToLogin: () => void;
  onTryAgain: () => void;
}

const VerificationTab: React.FC<VerificationTabProps> = ({ status, message, onBackToLogin, onTryAgain }) => {
  if (status === 'pending') {
    return (
      <Result
        icon={<MailOutlined style={{ color: '#1890ff' }} />}
        title="Check Your Email"
        subTitle={message}
        extra={[
          <Button type="default" key="login" onClick={onBackToLogin}>
            Back to Login
          </Button>,
        ]}
      />
    );
  }

  if (status === 'success') {
    return (
      <Result
        status="success"
        icon={<CheckCircleOutlined />}
        title="Verification Successful!"
        subTitle={message}
        extra={[
          <Button type="primary" key="login" onClick={onBackToLogin}>
            Continue to Login
          </Button>,
        ]}
      />
    );
  }

  if (status === 'error') {
    return (
      <Result
        status="error"
        icon={<CloseCircleOutlined />}
        title="Verification Failed"
        subTitle={message}
        extra={[
          <Button type="primary" key="try-again" onClick={onTryAgain}>
            Try Again
          </Button>,
        ]}
      />
    );
  }

  return null;
};

export default VerificationTab; 