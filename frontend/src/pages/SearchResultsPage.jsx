import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FlatCard from '../components/FlatCard';

const SearchResultsPage = () => {
  const { flats } = useSelector((state) => state.flats);
  const location = new URLSearchParams(window.location.search).get('location');
  const [sortedFlats, setSortedFlats] = useState(flats);
  const [sortOption, setSortOption] = useState('price-high');

  useEffect(() => {
    const sortFlats = () => {
      let sorted = [...flats];

      if (sortOption === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
      }else{
        return sorted;
      }
      setSortedFlats(sorted);
    };
    sortFlats();
  }, [sortOption, flats]);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Search Results for "{location}"</h1>
      <div className=" flex justify-end mb-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-zinc-500 p-2 border rounded"
        >
          <option value="select">Select</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sortedFlats.length > 0 ? (
          sortedFlats.map((flat) => (
            <FlatCard key={flat._id} flat={flat} />
          ))
        ) : (
          <p>No results found for "{location}" 😥.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
