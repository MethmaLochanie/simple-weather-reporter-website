export interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  uv_index: number;
  condition: string;
  icon: string;
  location: string;
}

export interface CityType {
  name: string;
  lat: number;
  lng: number;
  country?: string;
} 