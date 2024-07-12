// src/components/Search.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${location}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
