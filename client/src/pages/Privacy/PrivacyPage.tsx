import React from 'react';
import { Typography, Card, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const PrivacyPage: React.FC = () => {
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
              Privacy Policy
            </Title>
            
            <Paragraph className="text-gray-600 mb-6">
              <Text strong>Last updated:</Text> {new Date().toLocaleDateString()}
            </Paragraph>

            <div className="space-y-6">
              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  1. Information We Collect
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  update your profile, or contact us for support. This may include:
                </Paragraph>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                  <li>Name and email address</li>
                  <li>Username and password</li>
                  <li>Location data (when you search for weather information)</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  2. How We Use Your Information
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  We use the information we collect to:
                </Paragraph>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                  <li>Provide, maintain, and improve our weather services</li>
                  <li>Process your transactions and send related information</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                </ul>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  3. Information Sharing
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except in the following circumstances:
                </Paragraph>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With your explicit consent</li>
                  <li>To trusted third-party service providers who assist us in operating our service</li>
                </ul>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  4. Data Security
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                  over the internet or electronic storage is 100% secure.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  5. Cookies and Tracking
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  These technologies help us remember your preferences and provide personalized content.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  6. Third-Party Services
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  Our service may contain links to third-party websites or services. We are not responsible 
                  for the privacy practices of these third parties. We encourage you to review their privacy policies.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  7. Your Rights
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  You have the right to:
                </Paragraph>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  8. Children's Privacy
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  9. Changes to This Policy
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </Paragraph>
              </section>

              <section>
                <Title level={3} className="text-xl font-semibold mb-3">
                  10. Contact Us
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <Text strong>Email:</Text> privacy@weatherreporter.com
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

export default PrivacyPage; 