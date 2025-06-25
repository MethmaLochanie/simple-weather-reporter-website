import { api } from './axios';

export const userApis = {
  // Get user profile (requires authentication)
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  // Update user location (requires authentication)
  updateLocation: async (latitude: number, longitude: number) => {
    const response = await api.post('/user/location', { latitude, longitude });
    return response.data;
  },
  // // Get user search history for a city
  // getSearchHistory: async (city: string) => {
  //   const response = await api.get(`/user/search-history?city=${encodeURIComponent(city)}`);
  //   return response.data;
  // },
  // // Add to user search history
  // addSearchHistory: async (entry: { city: string; country: string; lat: number; lng: number }) => {
  //   const response = await api.post('/user/search-history', entry);
  //   return response.data;
  // },
};

export default userApis; 