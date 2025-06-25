import React, { useState, useEffect} from 'react';
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
        <WeatherHeader onGetCurrentLocation={handleGetCurrentLocation} />
        <WeatherInfoBox message={infoBoxMsg} />
        <CitySearchMap 
          onCitySelect={handleCitySelect} 
          value={searchValue}
          onChange={setSearchValue}
          initialCenter={selectedCity ? { lat: selectedCity.lat, lng: selectedCity.lng } : undefined}
        />
        <WeatherError error={weatherError} />
        {weatherData && selectedCity && (
          <WeatherDataCard weatherData={weatherData} selectedCity={selectedCity} />
        )}
      </div>
    </div>
  );
};

export default Weather; 