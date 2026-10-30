import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1111';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Admin JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('metis_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Unable to connect to the backend server. Please check MongoDB connection.';
    if (error.response?.data?.error) {
      message = error.response.data.error;
    } else if (error.message) {
      message = error.message;
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('metis_admin_token');
      localStorage.removeItem('metis_admin_user');
      window.dispatchEvent(new CustomEvent('metis:unauthorized'));
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
