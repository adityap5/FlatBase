import React, { useState, useEffect } from 'react';
import FlatCard from '../components/FlatCard';
import Search from '../components/Search';
import { getFlats } from '../api'
import Loader from '../components/Loader';
import HomeCardShimmer from '../components/HomeCardShimmer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlats } from '../redux/flatsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  // const [flats, setFlats] = useState([]);
  // const [loading, setLoading] = useState(true);

  const { flats, loading } = useSelector((state) => state.flats);

  useEffect(() => {
    dispatch(fetchFlats());
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchFlats = async () => {
  //     const { data } = await getFlats();
  //     setFlats(data);
  //     setLoading(false);
  //   };

  //   fetchFlats();
  // }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Popular Flats</h1>
      <Search />
     
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {!flats.length ? <HomeCardShimmer /> : flats.map((flat) => (
            <FlatCard key={flat._id} flat={flat} />
          ))}
        </div>

    </div>
  );
};

export default HomePage;
