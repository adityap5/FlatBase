import React, { useState, useEffect } from 'react';
import FlatCard from '../components/FlatCard';
import Search from '../components/Search';
import { getFlats } from '../api'
import Loader from '../components/Loader';

const HomePage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetchFlats = async () => {
      const { data } = await getFlats();
      setFlats(data);
      setLoading(false);
    };

    fetchFlats();
  }, []);

  return (
    <div className="container mx-auto px-4">

      <h1 className="text-3xl font-bold my-4">Popular Flats</h1>
      <Search />
      {/* <Loader loading={loading}/> */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {flats.map((flat) => (
          <FlatCard key={flat._id} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
