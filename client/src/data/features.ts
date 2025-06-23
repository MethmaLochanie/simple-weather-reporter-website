export interface Feature {
  iconName: string;
  title: string;
  description: string;
  iconColor: string;
}

export const features: Feature[] = [
  {
    iconName: 'CloudOutlined',
    title: 'Real-time Weather',
    description: 'Get accurate weather information for any city around the world',
    iconColor: 'text-blue-500'
  },
  {
    iconName: 'ThunderboltOutlined',
    title: 'Lightning Fast',
    description: 'Instant weather updates with our optimized API',
    iconColor: 'text-yellow-500'
  },
  {
    iconName: 'SafetyOutlined',
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security',
    iconColor: 'text-green-500'
  },
  {
    iconName: 'RocketOutlined',
    title: 'Modern Interface',
    description: 'Beautiful, responsive design that works on all devices',
    iconColor: 'text-purple-500'
  }
];

export const benefits: string[] = [
  'Accurate weather forecasts',
  'Real-time temperature updates',
  'Humidity and wind speed data',
  'UV index information',
  'Beautiful weather icons',
  'Mobile-friendly design'
]; 