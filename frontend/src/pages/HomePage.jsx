// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { getHotels } from '../api';
import HotelCard from '../components/HotelCard';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await getHotels();
      setHotels(data);
    };

    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Popular Hotels</h1>
      <div className="grid grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
