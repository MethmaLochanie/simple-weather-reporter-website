import React, { useRef } from 'react';
import { Button, Card, Row, Col, Typography, Space } from 'antd';
import { 
  CloudOutlined, 
  ThunderboltOutlined,
  SafetyOutlined,
  RocketOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { features, benefits, type Feature } from '../../data/features';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const { Title, Paragraph, Text } = Typography;

// Icon mapping object
const iconMap = {
  CloudOutlined: CloudOutlined,
  ThunderboltOutlined: ThunderboltOutlined,
  SafetyOutlined: SafetyOutlined,
  RocketOutlined: RocketOutlined,
};

const WelcomeHero: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const featuresRef = useRef<HTMLDivElement>(null);
  const renderIcon = (feature: Feature) => {
    const IconComponent = iconMap[feature.iconName as keyof typeof iconMap];
    return <IconComponent className={`text-3xl ${feature.iconColor}`} />;
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleLearnMore = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <CloudOutlined className="text-4xl text-white" />
              </div>
            </div>
            
            <Title level={1} className="text-5xl md:text-6xl font-bold mb-6 text-gradient-primary">
              Weather Reporter
            </Title>
            
            <Paragraph className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the most accurate and beautiful weather application. 
              Get real-time weather updates, detailed forecasts, and stunning visualizations 
              for any location worldwide.
            </Paragraph>
            
            <Space size="large" className="mb-16">
              <Button 
                type="primary" 
                size="large" 
                onClick={handleGetStarted}
                className="h-12 px-8 text-lg gradient-primary border-0 hover:from-blue-600 hover:to-purple-700"
                icon={<RocketOutlined />}
              >
                Get Started
              </Button>
              <Button 
                size="large" 
                className="h-12 px-8 text-lg"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </Space>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-4xl font-bold mb-4">
              Why Choose Weather Reporter?
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the most comprehensive weather information with a beautiful, 
              user-friendly interface that makes checking the weather a delightful experience.
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]} className="mb-16">
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card 
                  className="text-center h-full border-0 shadow-custom hover:shadow-custom-hover transition-all duration-300 hover:-translate-y-2"
                  bodyStyle={{ padding: '2rem 1.5rem' }}
                >
                  <div className="mb-4">
                    {renderIcon(feature)}
                  </div>
                  <Title level={4} className="mb-3">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-gray-600">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-4xl font-bold mb-4">
              Everything You Need
            </Title>
            <Paragraph className="text-xl text-gray-600">
              Our weather app provides all the information you need to plan your day perfectly.
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
                <CheckCircleOutlined className="text-green-500 text-xl" />
                <Text className="text-lg">{benefit}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title level={2} className="text-4xl font-bold mb-6 text-white">
            Ready to Get Started?
          </Title>
          <Paragraph className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust Weather Reporter for their daily weather updates.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            onClick={handleGetStarted}
            className="h-12 px-8 text-lg bg-white text-blue-600 border-0 hover:bg-gray-100"
            icon={<RocketOutlined />}
          >
            Start Now - It's Free!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero; 