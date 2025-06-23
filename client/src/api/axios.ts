import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Disable credentials since currently  sending the auth token in the Authorization header
  withCredentials: false, 
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('=== ERROR DETAILS ===');
    if (error.response) {
      console.error('Response Error Status:', error.response.status);
      console.error('Response Error Data:', error.response.data);
      console.error('Response Error Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request Error: No response received');
      console.error('Request details:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    console.error('Full error object:', error);
    return Promise.reject(error);
  }
); 