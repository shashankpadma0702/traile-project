// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const loginUser = async (credentials) => {
  const res = await API.post('/users/login', credentials); // ✅ working
  return res.data;
};

export const signupUser = async (userData) => {
  const res = await API.post('/users/register', userData); // ✅ fixed route
  return res.data;
};

export default API;
