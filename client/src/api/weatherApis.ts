import { api } from './axios';
import type { WeatherData } from '../types/weather';

// Cache for ongoing weather requests
const ongoingWeatherRequests = new Map<string, Promise<WeatherData>>();

export const weatherApi = {
  getWeather: async (city: string): Promise<WeatherData> => {
    const requestKey = `weather_${city.toLowerCase()}`;
    
    // Check if there's already an ongoing request for this city
    const ongoingRequest = ongoingWeatherRequests.get(requestKey);
    if (ongoingRequest) {
      return ongoingRequest;
    }

    // Create new request
    const newRequest = api.get<WeatherData>(`/weather?city=${city}`)
      .then(response => response.data)
      .finally(() => {
        // Clean up the request from the cache when it completes
        ongoingWeatherRequests.delete(requestKey);
      });

    // Store the request in the cache
    ongoingWeatherRequests.set(requestKey, newRequest);

    return newRequest;
  },
}; 