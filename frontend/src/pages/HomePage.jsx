import React, { useState, useEffect } from 'react';
import FlatCard from '../components/FlatCard';
import Search from '../components/Search';
import {getFlats} from '../api'

const HomePage = () => {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    const fetchFlats = async () => {
      const {data} = await getFlats();
      setFlats(data);
    };

    fetchFlats();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Popular Flats</h1>
      <Search />
      <div className="grid grid-cols-4 gap-6">
        {flats.map((flat) => (
          <FlatCard key={flat._id} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
