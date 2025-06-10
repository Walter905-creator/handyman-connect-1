import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:10000',
  withCredentials: true, // optional, useful for auth later
});

export default api;
