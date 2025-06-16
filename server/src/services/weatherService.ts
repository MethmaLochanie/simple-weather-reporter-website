import axios from 'axios';
import { WeatherData } from '../types/types';

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  const API_KEY = process.env.WEATHER_API_KEY;
  const BASE_URL = process.env.BASE_URL;
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&aqi=yes`;

  const { data } = await axios.get(url);

  return {
    temperature: data.current.temp_c,
    humidity: data.current.humidity,
    wind_speed: data.current.wind_kph,
    uv_index: data.current.uv,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    location: data.location.name
  };
};
