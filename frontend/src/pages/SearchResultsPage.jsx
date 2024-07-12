// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import HotelCard from '../components/HotelCard';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const [hotels, setHotels] = useState([]);
  const query = useQuery();
  const location = query.get('location');

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get(`http://localhost:5000/api/hotels/search?location=${location}`);
      setHotels(response.data);
    };

    fetchHotels();
  }, [location]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Search Results</h1>
      <div className="grid grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
