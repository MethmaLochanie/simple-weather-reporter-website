import React, { useState, useEffect, useRef } from 'react';
import { useWeather } from '../../hooks/useWeather';
import CitySearchMap from '../CitySearchMap/CitySearchMap';
import type { CityType } from '../../types/weather';
import { fetchReverseGeocode } from '../../hooks/useReverseGeocode';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';
import WeatherHeader from './WeatherHeader';
import WeatherInfoBox from './WeatherInfoBox';
import WeatherError from './WeatherError';
import WeatherDataCard from './WeatherDataCard';

const getInitialCity = () => {
  const saved = localStorage.getItem('selectedCity');
  return saved ? JSON.parse(saved) : null;
};

const Weather: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityType | null>(getInitialCity);
  const [searchValue, setSearchValue] = useState(selectedCity?.name || '');
  const [hasSearched, setHasSearched] = useState(false);
  const [dbLocation, setDbLocation] = useState<CityType | null>(getInitialCity);
  const [infoBoxMsg, setInfoBoxMsg] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const { setLoading } = useLoading();
  const lastLocationCoords = useRef<string>(''); // Track last location coordinates
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useWeather(selectedCity?.name ?? null, refreshKey);

  // Update last update time when weather data changes
  useEffect(() => {
    if (weatherData) {
      setLastUpdateTime(new Date());
    }
  }, [weatherData]);

  useEffect(() => {
    setLoading(weatherLoading);
  }, [weatherLoading, setLoading]);

  useEffect(() => {
    // On mount, try to get geolocation if not already granted/denied
    if (selectedCity === null && !hasSearched) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const city: CityType = { name: 'Current Location', lat, lng };
            setSelectedCity(city);
            setSearchValue('Current Location');
            setDbLocation(city);
            localStorage.setItem('selectedCity', JSON.stringify(city));
          },
          () => {
            setSelectedCity(null);
          }
        );
      } else {
        setSelectedCity(null);
      }
    }
  }, [selectedCity, hasSearched]);

  const handleCitySelect = (city: CityType) => {
    setSelectedCity(city);
    setSearchValue(city.name);
    setHasSearched(true);
    localStorage.setItem('selectedCity', JSON.stringify(city));
  };

  const handleGetCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const coordsKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
          
          // Check if we already have this location cached
          if (coordsKey === lastLocationCoords.current && selectedCity?.name && selectedCity.name !== 'Current Location') {
            // Use existing city data if coordinates haven't changed
            setInfoBoxMsg(null);
            return;
          }

          let name = '';
          try {
            const geoLocationName = await fetchReverseGeocode(lat, lng);
            if (geoLocationName) {
              const parts = geoLocationName.split(',').map(s => s.trim());
              const validParts = parts.filter(p => /[a-zA-Z]/.test(p));
              if (validParts.length > 0) {
                name = validParts.slice(0, 2).join(', ');
              } else {
                name = parts[0] || '';
              }
            }
          } catch {
            name = '';
          }
          
          const city: CityType = { name, lat, lng };
          setSelectedCity(city);
          setSearchValue(name);
          setHasSearched(false);
          setInfoBoxMsg(null);
          localStorage.setItem('selectedCity', JSON.stringify(city));
          lastLocationCoords.current = coordsKey;
        },
        () => {
          if (dbLocation && dbLocation.lat && dbLocation.lng) {
            setSelectedCity(dbLocation);
            setSearchValue(dbLocation.name);
            setHasSearched(false);
            setInfoBoxMsg('You have disabled location access. Showing your last known location. For real-time weather, please enable location access.');
          } else {
            setSelectedCity(null);
            setSearchValue('');
            setHasSearched(false);
            setInfoBoxMsg('You have disabled location access. For real-time weather, please enable location access.');
          }
        }
      );
    } else {
      setInfoBoxMsg('You have disabled location access. For real-time weather, please enable location access.');
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Weather Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100/50">
        <WeatherHeader onGetCurrentLocation={handleGetCurrentLocation} />
      </div>

      {/* Info Box */}
      <WeatherInfoBox message={infoBoxMsg} />

      {/* City Search and Map Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6">
          <CitySearchMap 
            onCitySelect={handleCitySelect} 
            value={searchValue}
            onChange={setSearchValue}
            initialCenter={selectedCity ? { lat: selectedCity.lat, lng: selectedCity.lng } : undefined}
          />
        </div>
      </div>

      {/* Weather Data Section */}
      <div className="space-y-4">
        <WeatherError error={weatherError} />
        {weatherData && selectedCity && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Weather Information</h3>
                  <p className="text-gray-600 text-sm">Current weather data for {selectedCity.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Live Data</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <WeatherDataCard 
                weatherData={weatherData} 
                selectedCity={selectedCity} 
                lastUpdateTime={lastUpdateTime}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {/* {weatherData && selectedCity && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300">
              <div className="text-2xl mb-2">🌤️</div>
              <div className="font-medium">Save Location</div>
              <div className="text-sm opacity-80">Add to favorites</div>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium">Share Weather</div>
              <div className="text-sm opacity-80">Send to friends</div>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300">
              <div className="text-2xl mb-2">🔔</div>
              <div className="font-medium">Set Alert</div>
              <div className="text-sm opacity-80">Weather notifications</div>
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Weather; 