import React from 'react';
import { Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const AuthFooter: React.FC = () => {
  return (
    <>
      <Divider className="my-6">
        <Text type="secondary">or</Text>
      </Divider>

      <div className="text-center">
        <div className="mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Home
          </Link>
        </div>
        <Text type="secondary">
          By continuing, you agree to our&nbsp;
          <Link 
            to="/terms"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link 
            to="/privacy"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Privacy Policy
          </Link>
        </Text>
      </div>
    </>
  );
};

export default AuthFooter; 