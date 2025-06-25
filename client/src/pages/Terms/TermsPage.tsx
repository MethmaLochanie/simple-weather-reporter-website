import React, { useEffect } from 'react';
import { Typography, Card, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

const { Title, Paragraph, Text } = Typography;

const TermsPage: React.FC = () => {
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [setLoading]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            className="mb-4"
          >
            Back
          </Button>
        </div>

        <Card className="shadow-lg rounded-xl border-0">
          <div className="p-8">
            <Title level={1} className="text-3xl font-bold mb-6 text-center">
              Terms of Service
            </Title>
            
            <Paragraph className="text-gray-600 mb-6">
              <Text strong>Last updated:</Text> {new Date().toLocaleDateString()}
            </Paragraph>

            <div className="space-y-6">
              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  1. Acceptance of Terms
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  By accessing and using Weather Reporter, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  2. Use License
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  Permission is granted to temporarily download one copy of Weather Reporter for personal, non-commercial transitory viewing only. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </Paragraph>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained in Weather Reporter</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  3. User Account
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  You are responsible for safeguarding the password and for all activities that occur under your account.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  4. Weather Data
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  Weather Reporter provides weather information from third-party sources. While we strive to provide accurate and up-to-date information, 
                  we cannot guarantee the accuracy, completeness, or timeliness of the weather data. 
                  You should not rely solely on this information for critical decisions.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  5. Privacy
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                  to understand our practices regarding the collection and use of your information.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  6. Disclaimer
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  The materials on Weather Reporter are provided on an 'as is' basis. Weather Reporter makes no warranties, 
                  expressed or implied, and hereby disclaims and negates all other warranties including without limitation, 
                  implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  7. Limitations
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  In no event shall Weather Reporter or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the service.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  8. Contact Information
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                  <br />
                  <Text strong>Email:</Text> support@weatherreporter.com
                  <br />
                  <Text strong>Address:</Text> 123 Weather Street, Climate City, CC 12345
                </Paragraph>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage; 