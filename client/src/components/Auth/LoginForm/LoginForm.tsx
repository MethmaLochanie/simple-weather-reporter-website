import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  LoadingOutlined
} from '@ant-design/icons';
import type { AuthFormData } from '../../../types/auth';

interface LoginFormProps {
  onLogin: (values: AuthFormData) => Promise<void>;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="login"
      onFinish={onLogin}
      layout="vertical"
      size="large"
    >
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
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item>
        <Row justify="space-between" align="middle">
          <Col>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <a href="#" className="text-blue-600 hover:text-blue-800">Forgot password?</a>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:-translate-y-0.5"
        >
          {loading ? <LoadingOutlined /> : 'Sign In'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm; 