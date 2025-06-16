import axios from 'axios';
import { cache, CACHE_TTL } from '../config/cache';

export const fetchWeather = async (city: string) => {
  const now = Date.now();

  const cached = cache.get(city);
  if (cached && cached.expiresAt > now) {
    return { ...cached.data, source: 'cache' };
  }

  const API_KEY = process.env.WEATHER_API_KEY;
  const BASE_URL = process.env.BASE_URL
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await axios.get(url);
    const data = {
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      wind_speed: response.data.current.wind_kph,
      uv_index: response.data.current.uv,
      condition: response.data.current.condition.text,
      icon: response.data.current.condition.icon,
      location: response.data.location.name,
    };

    cache.set(city, { data, expiresAt: now + CACHE_TTL });
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error(`Invalid city: "${city}"`);
    }
    throw new Error('API fetch failed');
  }
};
