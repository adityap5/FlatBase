// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import Search from '../components/Search';
import {getHotels} from '../api'

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const {data} = await getHotels();
      setHotels(data);
    };

    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Popular Hotels</h1>
      <Search />
      <div className="grid grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
