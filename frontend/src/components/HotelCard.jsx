// src/components/HotelCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="h-4/6 object-cover" src={hotel.images} alt="Hotel" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Rooms in {hotel.location}</div>
        <p className="text-gray-700 overflow-hidden tracking-tighter text-base">{hotel.description.substring(0,86)}..</p>
        <p className='mt-2 font-bold text-lg'>Price: ₹{hotel.price} night</p>
        <Link to={`/hotel/${hotel._id}`} className="text-blue-500 mt-2">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
