// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HotelDetailPage from './pages/HotelDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import AddHotelPage from './pages/AddHotelPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BookingPage from './pages/BookingPage';

const App = () => {
  return (
    <div className="py-3 px-10">
   
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-hotel" element={<AddHotelPage />} />
        <Route path="/search" element={<SearchResultsPage/>} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
