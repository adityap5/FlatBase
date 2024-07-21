// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from '../components/HotelCard';
import Search from '../components/Search';
import AddHotelPage from './AddHotelPage';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const isSeller = localStorage.getItem('role') === 'seller';

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get('http://localhost:5000/api/hotels');
      setHotels(response.data);
    };

    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Popular Hotels</h1>
      <Search />
      <div className="grid grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
