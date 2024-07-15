// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const addHotel = (hotelData) => API.post('/hotels', hotelData);
export const getHotels = () => API.get('/hotels');
export const getHotel = (id) => API.get(`/hotels/${id}`);
export const getHotelByLocation = (location) => API.get(`/search?location=${location}`);
export const createBooking = (bookingData) => API.post('/bookings', bookingData);
export const getBookings = () => API.get('/bookings/mybookings');
