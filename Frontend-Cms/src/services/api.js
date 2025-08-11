// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/'; // Your backend URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sending cookies with auth tokens
});

export default api;