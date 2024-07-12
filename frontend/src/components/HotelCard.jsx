// src/components/HotelCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://via.placeholder.com/400" alt="Hotel" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{hotel.name}</div>
        <p className="text-gray-700 text-base">{hotel.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={`/hotel/${hotel._id}`} className="text-blue-500">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
