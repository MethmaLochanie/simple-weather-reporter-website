import React, { useRef, useState, useCallback } from 'react';
import { StandaloneSearchBox, GoogleMap, Marker } from '@react-google-maps/api';
import { SearchOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { CityType } from '../../types/weather';

const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Colombo

interface CitySearchMapProps {
  onCitySelect?: (city: CityType) => void;
  value?: string;
  onChange?: (value: string) => void;
  initialCenter?: { lat: number; lng: number };
}

// Debounce function to limit API calls
const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};

const CitySearchMap: React.FC<CitySearchMapProps> = ({ onCitySelect, value, onChange, initialCenter }) => {
  const [center, setCenter] = useState(initialCenter || defaultCenter);
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(initialCenter || defaultCenter);
  const [isSearching, setIsSearching] = useState(false);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  React.useEffect(() => {
    if (initialCenter) {
      setCenter(initialCenter);
      setMarkerPos(initialCenter);
    }
  }, [initialCenter]);

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      setIsSearching(true);
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (onChange) {
          onChange(place.formatted_address || place.name || '');
        }
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCenter({ lat, lng });
          setMarkerPos({ lat, lng });
          if (onCitySelect) {
            onCitySelect({
              name: place.name || place.formatted_address || '',
              lat,
              lng,
              country: place.address_components?.find((c: any) => c.types.includes('country'))?.long_name || '',
            });
          }
        }
      }
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  // Debounced input change handler
  const debouncedOnChange = useDebounce((newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  }, 500); // 500ms delay

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Update the input value immediately for UI responsiveness
    if (onChange) {
      onChange(newValue);
    }
    // Debounce the actual search trigger
    debouncedOnChange(newValue);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <SearchOutlined className="text-blue-500 text-lg" />
          <h3 className="text-lg font-semibold text-gray-800">Search Location</h3>
        </div>
        
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300">
              <EnvironmentOutlined className="text-lg" />
            </div>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={handlePlacesChanged}>
              <input
                type="text"
                placeholder="Search for a city, country, or district..."
                value={value}
                onChange={handleInputChange}
                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-base focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-sm transition-all duration-300 hover:border-gray-300"
                autoComplete="off"
              />
            </StandaloneSearchBox>
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </form>
        
        <p className="text-sm text-gray-500 flex items-center space-x-1">
          <InfoCircleOutlined />
          <span>Search for a location to get weather information</span>
        </p>
      </div>

      {/* Map Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Interactive Map</h3>
          {markerPos && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Location selected</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none z-10"></div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <GoogleMap
              mapContainerClassName="w-full h-[400px] md:h-[450px]"
              center={center}
              zoom={markerPos ? 12 : 8}
              options={{
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ],
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true
              }}
            >
              {markerPos && (
                <Marker 
                  position={markerPos}
                  options={{
                    icon: {
                      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231890ff'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
                      scaledSize: new google.maps.Size(40, 40),
                      anchor: new google.maps.Point(20, 40)
                    }
                  }}
                />
              )}
            </GoogleMap>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      {/* <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <h4 className="font-medium text-blue-800 mb-2">💡 Quick Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Type a city name to search and get instant weather data</li>
          <li>• Click anywhere on the map to select a location</li>
          <li>• Use the search box for precise location finding</li>
        </ul>
      </div> */}
    </div>
  );
};

export default CitySearchMap; 