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
}; 