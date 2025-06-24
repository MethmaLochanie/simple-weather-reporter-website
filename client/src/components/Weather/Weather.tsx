import React, { useState, useEffect} from 'react';
import { Card } from 'antd';
import { useWeather } from '../../hooks/useWeather';
import CitySearchMap from '../CitySearchMap/CitySearchMap';
import type { CityType } from '../../types/weather';
import { fetchReverseGeocode } from '../../hooks/useReverseGeocode';
import { useLoading } from '../../contexts/LoadingContext/LoadingContext';

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
  const { setLoading } = useLoading();

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useWeather(selectedCity?.name ?? null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-gray-800">
          Weather Reporter
        </h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
            onClick={handleGetCurrentLocation}
          >
            Get Current Location
          </button>
        </div>
        {infoBoxMsg && (
          <div className="border-l-4 p-4 mb-4 rounded flex items-center shadow-sm bg-yellow-100 border-yellow-400 text-yellow-800">
            <span className="material-icons align-middle mr-2">location_off</span>
            <div className="flex-1">{infoBoxMsg}</div>
          </div>
        )}
        <CitySearchMap 
          onCitySelect={handleCitySelect} 
          value={searchValue}
          onChange={setSearchValue}
          initialCenter={selectedCity ? { lat: selectedCity.lat, lng: selectedCity.lng } : undefined}
        />
        {weatherError && (
          <div className="mb-4 text-red-600 text-center">{weatherError.message}</div>
        )}
        {weatherData && selectedCity ? (
          <Card className="shadow-xl rounded-lg mb-6">
            <div className="text-center p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">{selectedCity.name}</h2>
              <img
                src={`https:${weatherData.icon}`}
                alt={weatherData.condition}
                className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20"
              />
              <p className="text-xl sm:text-2xl font-medium mb-2">{weatherData.condition}</p>
              <p className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{weatherData.temperature}°C</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="bg-white/50 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-600 text-sm sm:text-base">Humidity</p>
                  <p className="text-lg sm:text-xl font-semibold">{weatherData.humidity}%</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-600 text-sm sm:text-base">Wind Speed</p>
                  <p className="text-lg sm:text-xl font-semibold">{weatherData.wind_speed} km/h</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-600 text-sm sm:text-base">UV Index</p>
                  <p className="text-lg sm:text-xl font-semibold">{weatherData.uv_index}</p>
                </div>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default Weather; 