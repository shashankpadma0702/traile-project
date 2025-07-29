import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getRewards = async () => {
  const res = await API.get('/rewards');
  return res.data;
};

export const redeemReward = async (rewardId) => {
  const res = await API.post('/rewards/redeem', { rewardId });
  return res.data;
};
