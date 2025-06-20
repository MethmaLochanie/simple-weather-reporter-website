import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../api/weatherApi';
import type { WeatherData } from '../types/weather';

export const useWeather = (city: string | null) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', city],
    queryFn: () => weatherApi.getWeather(city!),
    enabled: !!city,
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    retry: 2,
  });
}; 