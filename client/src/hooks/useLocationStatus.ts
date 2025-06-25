import { useState, useEffect, useCallback } from 'react';

export function useLocationStatus() {
  const [locationStatus, setLocationStatus] = useState<'pending' | 'granted' | 'denied'>('pending');

  useEffect(() => {
    if (navigator.geolocation && navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
        setLocationStatus(result.state as 'pending' | 'granted' | 'denied');
      });
    } else {
      setLocationStatus('denied');
    }
  }, []);

  const requestLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationStatus('granted'),
        () => setLocationStatus('denied')
      );
    } else {
      setLocationStatus('denied');
    }
  }, []);

  return { locationStatus, requestLocation };
} 