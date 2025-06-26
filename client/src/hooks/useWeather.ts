import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../api/weatherApis';
import type { WeatherData } from '../types/weather';

export const useWeather = (city: string | null, refreshKey: number = 0) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', city, refreshKey],
    queryFn: () => weatherApi.getWeather(city!),
    enabled: !!city,
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    retry: 2,
  });
}; 