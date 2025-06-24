import React from 'react';

interface LocationStatusProps {
  source: 'live' | 'saved' | 'none';
}

const LocationStatus: React.FC<LocationStatusProps> = ({ source }) => {
  if (source === 'none') return null;
  return (
    <div className="flex items-center justify-center mb-2">
      <span className="font-semibold">
        {source === 'live'
          ? 'Current Location (Live)'
          : 'Last Known Location (Saved)'}
      </span>
    </div>
  );
};

export default LocationStatus; 