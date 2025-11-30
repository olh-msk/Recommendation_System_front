import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
});

// Attach Authorization header when token is present in localStorage
axiosClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default axiosClient;
