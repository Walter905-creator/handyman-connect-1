import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://handyman-connect-1-1.onrender.com',
  withCredentials: true, // important for CORS with credentials
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
