import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlatCard from '../components/FlatCard';
import {getFlatByLocation} from '../api'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const [flatls, setFlats] = useState([]);
  const query = useQuery();
  const location = query.get('location');

  useEffect(() => {
    const fetchFlats = async () => {
      const {data} = await getFlatByLocation(location);
      setFlats(data);
    };

    fetchFlats();
  }, [location]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Search Results</h1>
      <div className="grid grid-cols-3 gap-4">
        {flats.map((flat) => (
          <FlatCard key={flat._id} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
