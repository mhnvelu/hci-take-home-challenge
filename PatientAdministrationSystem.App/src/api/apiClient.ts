import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5272/api', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;