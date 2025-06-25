import React, { useState } from 'react';
import { Form, Input, Button, Progress} from 'antd';
import { 
  UserOutlined,
  MailOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import type { AuthFormData } from '../../../types/auth';

interface RegisterFormProps {
  onRegister: (values: AuthFormData) => Promise<void>;
  loading: boolean;
}

interface PasswordRequirement {
  text: string;
  regex: RegExp;
  met: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, loading }) => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordRequirements: PasswordRequirement[] = [
    { text: 'At least 8 characters', regex: /.{8,}/, met: false },
    { text: 'At least one uppercase letter', regex: /[A-Z]/, met: false },
    { text: 'At least one lowercase letter', regex: /[a-z]/, met: false },
    { text: 'At least one number', regex: /\d/, met: false },
    { text: 'At least one special character', regex: /[!@#$%^&*(),.?":{}|<>]/, met: false },
  ];

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    const requirements = passwordRequirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));

    requirements.forEach(req => {
      if (req.met) strength += 20;
    });

    return { strength, requirements };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { strength } = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 20) return '#ff4d4f';
    if (strength <= 40) return '#faad14';
    if (strength <= 60) return '#1890ff';
    if (strength <= 80) return '#52c41a';
    return '#52c41a';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 20) return 'Very Weak';
    if (strength <= 40) return 'Weak';
    if (strength <= 60) return 'Fair';
    if (strength <= 80) return 'Good';
    return 'Strong';
  };

  const { requirements } = calculatePasswordStrength(password);

  return (
    <Form
      form={form}
      name="register"
      onFinish={onRegister}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 3, message: 'Username must be at least 3 characters!' },
          { max: 20, message: 'Username must be less than 20 characters!' },
          { 
            pattern: /^[a-zA-Z0-9_]+$/, 
            message: 'Username can only contain letters, numbers, and underscores!' 
          }
        ]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="Enter your username"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input 
          prefix={<MailOutlined />} 
          placeholder="Enter your email"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters!' },
          { 
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            message: 'Password must contain uppercase, lowercase, number, and special character!'
          }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className="rounded-lg"
          onChange={handlePasswordChange}
        />
      </Form.Item>

      {/* Password Strength Indicator */}
      {password && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Password Strength:</span>
            <span 
              className="text-sm font-medium"
              style={{ color: getPasswordStrengthColor(passwordStrength) }}
            >
              {getPasswordStrengthText(passwordStrength)}
            </span>
          </div>
          <Progress 
            percent={passwordStrength} 
            strokeColor={getPasswordStrengthColor(passwordStrength)}
            showInfo={false}
            size="small"
          />
          
          {/* Password Requirements */}
          <div className="mt-3 space-y-1">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center text-xs">
                {req.met ? (
                  <CheckCircleOutlined className="text-green-500 mr-2" />
                ) : (
                  <CloseCircleOutlined className="text-red-500 mr-2" />
                )}
                <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm your password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          className="w-full h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 hover:-translate-y-0.5"
        >
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm; 