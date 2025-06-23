import { api } from './axios';

export const userApis = {
  // Get user profile (requires authentication)
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
};

export default userApis; 