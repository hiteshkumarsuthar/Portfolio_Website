import axios from 'axios';

/**
 * Axios instance configured for the Portfolio Backend API
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1111';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor for streamlined error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = 'Unable to connect to the server. Please check your network or try again.';
    if (error.response?.data?.error) {
      message = error.response.data.error;
    } else if (error.message) {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
