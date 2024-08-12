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
export const addFlat = (flatData) => API.post('/flats', flatData);
export const getFlats = () => API.get('/flats');
export const getFlat = (id) => API.get(`/flats/${id}`);
export const getFlatByLocation = (location) => API.get(`/flats/search?location=${location}`);
export const createBooking = (bookingData) => API.post('/bookings', bookingData);
export const getBookings = () => API.get('/bookings/mybookings');
export const getMyListings = () => API.get('/auth/mylistings');
export const updateListing = (id) => API.put(`/flats/update/${id}`);
export const deleteListing = (id) => API.delete(`/flats/delete/${id}`);
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);
export const getBooking = (id) => API.get(`/bookings/${id}`);
