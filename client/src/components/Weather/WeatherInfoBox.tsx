import React from 'react';
import InfoBox from '../InfoBox/InfoBox';

interface WeatherInfoBoxProps {
  message: string | null;
}

const WeatherInfoBox: React.FC<WeatherInfoBoxProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <InfoBox type="warning" icon="location_off">
      {message}
    </InfoBox>
  );
};

export default WeatherInfoBox; 