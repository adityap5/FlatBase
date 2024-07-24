import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FlatDetailPage from './pages/FlatDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import AddFlatPage from './pages/AddFlatPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BookingPage from './pages/BookingPage';
import MyListings from './pages/MyListings';

const App = () => {
  return (
    <div className="px-10">
   
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flat/:id" element={<FlatDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-flat" element={<AddFlatPage />} />
        <Route path="/search" element={<SearchResultsPage/>} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/my-listings" element={<MyListings />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
