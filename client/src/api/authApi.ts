import { api } from './axios';

export const authApi = {
  // Register a new user
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  // Login user
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Verify email with token
  verifyEmail: async (token: string) => {
    const response = await api.get(`/auth/verify?token=${token}`);
    return response.data;
  },

  // Get user profile (requires authentication)
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default authApi; 