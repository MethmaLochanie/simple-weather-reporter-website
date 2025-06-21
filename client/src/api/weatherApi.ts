import { api } from './axios';
import type { WeatherData } from '../types/weather';

export const weatherApi = {
  getWeather: async (city: string): Promise<WeatherData> => {
    const response = await api.get<WeatherData>(`/api/weather?city=${city}`);
    return response.data;
  },
}; 