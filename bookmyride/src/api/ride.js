import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const bookRide = async (rideDetails) => {
  const res = await API.post('/ride/book', rideDetails);
  return res.data;
};

export const getRideStatus = async (rideId) => {
  const res = await API.get(`/ride/status/${rideId}`);
  return res.data;
};
