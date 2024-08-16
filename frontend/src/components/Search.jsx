import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFlatsByLocation } from '../redux/flatsSlice';
import Button from './Button';

const Search = () => {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchFlatsByLocation(location));
    navigate(`/search?location=${location}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex px-8">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mr-2"
        />
        <Button type="submit" name={"Search"} />
      </div>
    </form>
  );
};

export default Search;
