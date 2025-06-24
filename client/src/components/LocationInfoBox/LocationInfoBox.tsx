import React from 'react';
import InfoBox from '../InfoBox/InfoBox';
import { useLocationStatus } from '../../hooks/useLocationStatus';

interface LocationInfoBoxProps {
  deniedMessage?: React.ReactNode;
  defaultMessage?: React.ReactNode;
  showDefault?: boolean;
}

const LocationInfoBox: React.FC<LocationInfoBoxProps> = ({
  deniedMessage = "You have disabled location access. Enable it for more accurate weather updates.",
  defaultMessage,
  showDefault = false,
}) => {
  const { locationStatus } = useLocationStatus();

  if (locationStatus === 'denied') {
    return (
      <InfoBox type="warning" icon="location_off">
        {deniedMessage}
      </InfoBox>
    );
  }
  if (showDefault && defaultMessage) {
    return (
      <InfoBox type="info" icon="info">
        {defaultMessage}
      </InfoBox>
    );
  }
  return null;
};

export default LocationInfoBox; 