import { useEffect, useState } from 'react';

export function useReverseGeocode(lat?: number, lon?: number) {
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lon == null) {
      setLocationName(null);
      return;
    }
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(res => res.json())
      .then(data => {
        setLocationName(data.display_name || null);
      })
      .catch(() => setLocationName(null));
  }, [lat, lon]);

  return locationName;
} 