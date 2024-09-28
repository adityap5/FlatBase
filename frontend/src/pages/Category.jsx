import { useState, useEffect } from 'react';
import { getFlats } from '../api'
import FlatCard from '../components/FlatCard';
import HomeCardShimmer from '../components/HomeCardShimmer';


const Category = () => {
  const [flats, setFlats] = useState([]);
  const [sortedFlats, setSortedFlats] = useState([]);
  const [sortOption, setSortOption] = useState('select');
  
  useEffect(() => {
    const fetchFlats = async () => {
      const { data } = await getFlats();
      setFlats(data);
      setSortedFlats(data);
    };

    fetchFlats();
  }, []);


  // Handle sorting functionality
  useEffect(() => {
    const sortFlats = () => {
      let sorted = [...flats];

      if (sortOption === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'location') {
        sorted.sort((a, b) => a.location.localeCompare(b.location));
      }else{
        return sorted;
      }

      setSortedFlats(sorted);
    };

    sortFlats();
  }, [sortOption, flats]);

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-zinc-500 p-2 border rounded text-white selection:bg-[#76ABAE]"
        >
          <option value="select" className="hover:bg-[#76ABAE]">Select</option>
          <option value="price-low" className="hover:bg-[#76ABAE]">Price: Low to High</option>
          <option value="price-high" className="hover:bg-[#76ABAE]">Price: High to Low</option>
          <option value="location" className="hover:bg-[#76ABAE]">Location (A-Z)</option>
        </select>
      </div>
    

 

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {!sortedFlats.length ?<HomeCardShimmer/> : sortedFlats.map((flat) => (
    <FlatCard key={flat._id} flat={flat} />
           ))}
      </div>
    </div>
  );
};

export default Category;

