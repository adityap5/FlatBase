import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFlatsByLocation } from '../redux/flatsSlice';
import Button from './Button';

const Search = ({css}) => {
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
      <div className="px-8">
        <div className="flex flex-col md:flex-row w-full">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search by location"
            className={`${css} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 md:mb-0 md:mr-2`}
          />
          <Button 
            type="submit" 
            name="Search" 
            css="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-30px] w-50% md:hidden"
          />
        </div>
      </div>
    </form>
  );
};

export default Search;
