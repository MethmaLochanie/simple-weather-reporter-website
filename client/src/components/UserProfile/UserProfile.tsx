import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { fetchReverseGeocode } from '../../hooks/useReverseGeocode';
import { useLocationStatus } from '../../hooks/useLocationStatus';
import { userApis } from '../../api/userApis';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';
import UserProfileTitle from './UserProfileTitle';
import UserProfileCard from './UserProfileCard';
import WeatherInfoBox from '../Weather/WeatherInfoBox';

const areCoordsEqual = (
  a: { latitude: number; longitude: number } | null | undefined,
  b: { latitude: number; longitude: number } | null | undefined
): boolean => {
  if (!a || !b) return false;
  return (
    Math.abs(a.latitude - b.latitude) < 1e-5 &&
    Math.abs(a.longitude - b.longitude) < 1e-5
  );
};

const UserProfile: React.FC = () => {
  const { user, setUser } = useAuth();
  const { locationStatus } = useLocationStatus();
  const { setLoading } = useLoading();
  const [liveLocation, setLiveLocation] = useState<{ latitude: number; longitude: number; lastLocationUpdate: string } | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [loading, setLocalLoading] = useState<boolean>(false);
  const lastProcessedCoords = useRef<string>(''); // Track last processed coordinates

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  // Get live location if permission granted
  useEffect(() => {
    if (!user) return;
    if (locationStatus !== 'granted') {
      setLiveLocation(null);
      return;
    }
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const coordsKey = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
        if (!areCoordsEqual({ latitude, longitude }, user.location)) {
          setLocalLoading(true);
          try {
            await userApis.updateLocation(latitude, longitude);
            const updatedProfile = await userApis.getProfile();
            setUser(updatedProfile);
            setLiveLocation({ latitude, longitude, lastLocationUpdate: new Date().toISOString() });
            lastProcessedCoords.current = coordsKey;
          } catch {
            setLiveLocation({ latitude, longitude, lastLocationUpdate: new Date().toISOString() });
            lastProcessedCoords.current = coordsKey;
          } finally {
            setLocalLoading(false);
          }
        } else {
          setLiveLocation(user.location && typeof user.location.latitude === 'number' && typeof user.location.longitude === 'number'
            ? { latitude: user.location.latitude, longitude: user.location.longitude, lastLocationUpdate: user.location.lastLocationUpdate }
            : null);
        }
      },
      () => {
        setLiveLocation(null);
      }
    );
  }, [locationStatus, user]);

  // Get location name (reverse geocode) only if location changes
  useEffect(() => {
    let loc = null;
    if (locationStatus === 'granted' && liveLocation) {
      loc = liveLocation;
    } else if (user && user.location) {
      loc = user.location;
    }
    if (!loc || typeof loc.latitude !== 'number' || typeof loc.longitude !== 'number' || 
        isNaN(loc.latitude) || isNaN(loc.longitude)) {
      setLocationName('');
      return;
    }
    const coordsKey = `${loc.latitude.toFixed(4)},${loc.longitude.toFixed(4)}`;
    // Only fetch if coordinates have changed
    if (coordsKey === lastProcessedCoords.current && locationName) {
      return; // Use existing location name
    }
    let ignore = false;
    (async () => {
      setLocalLoading(true);
      const name = await fetchReverseGeocode(loc.latitude, loc.longitude);
      if (!ignore) {
        if (name) {
          const parts = name.split(',').map(s => s.trim());
          const validParts = parts.filter(p => /[a-zA-Z]/.test(p));
          setLocationName(validParts.length > 0 ? validParts.slice(0, 2).join(', ') : parts[0] || '');
        } else {
          setLocationName(`${loc.latitude.toFixed(5)}, ${loc.longitude.toFixed(5)}`);
        }
        lastProcessedCoords.current = coordsKey;
      }
      setLocalLoading(false);
    })();
    return () => { ignore = true; };
  }, [liveLocation, user, locationStatus]);

  let locationSource: 'live' | 'saved' | 'none' = 'none';
  const loc: { latitude: number; longitude: number; lastLocationUpdate?: string } | null =
    locationStatus === 'granted' && liveLocation ? liveLocation : user?.location && typeof user?.location.latitude === 'number' && typeof user?.location.longitude === 'number' ? user.location : null;
  if (loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number') {
    locationSource = locationStatus === 'granted' ? 'live' : 'saved';
  }

  return (
    <div className="space-y-6">
      {/* Location Info Box */}
      <WeatherInfoBox message={"You have disabled location access. Enable it for more accurate weather updates."} />
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100/50">
        <UserProfileTitle />
      </div>
      
      {/* User Profile Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6">
          <UserProfileCard
            username={user?.username}
            email={user?.email}
            isVerified={user?.isVerified}
            location={loc}
            locationName={locationName}
            userLocationLastUpdate={user?.location?.lastLocationUpdate}
            locationSource={locationSource}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 