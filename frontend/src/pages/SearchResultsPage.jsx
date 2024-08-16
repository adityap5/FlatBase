import React from 'react';
import { useSelector } from 'react-redux';
import FlatCard from '../components/FlatCard';

const SearchResultsPage = () => {
  const { flats } = useSelector((state) => state.flats);
  const location = new URLSearchParams(window.location.search).get('location');

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Search Results for "{location}"</h1>
      <div className="grid grid-cols-3 gap-4">
        {flats.length > 0 ? (
          flats.map((flat) => (
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
