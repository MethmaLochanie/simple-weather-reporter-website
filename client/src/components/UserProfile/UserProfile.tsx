import React, { useEffect, useState } from 'react';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { fetchReverseGeocode } from '../../hooks/useReverseGeocode';
import LocationStatus from '../LocationStatus/LocationStatus';
import LocationInfoBox from '../LocationInfoBox/LocationInfoBox';
import { useLocationStatus } from '../../hooks/useLocationStatus';
import userApis from '../../api/userApis';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

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
        if (!areCoordsEqual({ latitude, longitude }, user.location)) {
          setLocalLoading(true);
          try {
            await userApis.updateLocation(latitude, longitude);
            const updatedProfile = await userApis.getProfile();
            setUser(updatedProfile);
            setLiveLocation({ latitude, longitude, lastLocationUpdate: new Date().toISOString() });
          } catch {
            setLiveLocation({ latitude, longitude, lastLocationUpdate: new Date().toISOString() });
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
    if (!loc) {
      setLocationName('');
      return;
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
    <div className="text-center py-8">
      <LocationInfoBox />
      <UserOutlined className="text-6xl text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <LocationStatus source={locationSource} />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Username:</span>
            <span className="text-gray-900">{user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              user?.isVerified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user?.isVerified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
          {/* Location Section */}
          {loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number' ? (
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-600">Current Location:</span>
                <span className="text-gray-900">
                  {loading ? 'Loading...' : locationName}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-600">Last Updated:</span>
                <span className="text-gray-900">
                  {new Date((loc.lastLocationUpdate || user?.location?.lastLocationUpdate || Date.now()) as string | number).toLocaleString()}
                </span>
              </div>
              <div className="mt-4 rounded overflow-hidden h-[250px]">
                <iframe
                  title="Google Map"
                  className="w-full h-full border-0"
                  src={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center text-gray-500">
              <EnvironmentOutlined className="text-3xl mb-2" />
              <span className="text-base font-medium">
                Location not set. Enable location access for a better experience.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 