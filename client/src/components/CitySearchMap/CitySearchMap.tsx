import React, { useRef, useState, useCallback } from 'react';
import { StandaloneSearchBox, GoogleMap, Marker } from '@react-google-maps/api';
import { SearchOutlined } from '@ant-design/icons';
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
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  React.useEffect(() => {
    if (initialCenter) {
      setCenter(initialCenter);
      setMarkerPos(initialCenter);
    }
  }, [initialCenter]);

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
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
    <>
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="relative">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <SearchOutlined />
          </span>
          <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={handlePlacesChanged}>
            <input
              type="text"
              placeholder="Search for a city, country, or district..."
              value={value}
              onChange={handleInputChange}
              className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 bg-white text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              autoComplete="off"
            />
          </StandaloneSearchBox>
        </div>
      </form>
      <div className="mt-4 rounded-xl overflow-hidden">
        <GoogleMap
          mapContainerClassName="w-full h-[350px] rounded-xl"
          center={center}
          zoom={markerPos ? 12 : 8}
        >
          {markerPos && <Marker position={markerPos} />}
        </GoogleMap>
      </div>
    </>
  );
};

export default CitySearchMap; 