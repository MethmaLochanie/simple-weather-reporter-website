import React, { useRef, useState } from 'react';
import { StandaloneSearchBox, GoogleMap, Marker } from '@react-google-maps/api';
import { SearchOutlined } from '@ant-design/icons';
import type { CityType } from '../../types/weather';

const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Colombo

interface CitySearchMapProps {
  onCitySelect?: (city: CityType) => void;
}

const CitySearchMap: React.FC<CitySearchMapProps> = ({ onCitySelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [center, setCenter] = useState(defaultCenter);
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(defaultCenter);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setSelectedPlace(place);
        setSearchValue(place.formatted_address || place.name || '');
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCenter({ lat, lng });
          setMarkerPos({ lat, lng });
          if (onCitySelect) {
            onCitySelect({
              name: place.name || '',
              lat,
              lng,
              country: place.address_components?.find((c: any) => c.types.includes('country'))?.long_name || '',
            });
          }
        }
      }
    }
  };

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
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