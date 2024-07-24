import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300">
      <img className="h-56 w-full object-cover" src={hotel.images} alt="Hotel" />
      <div className="px-4 py-4 md:px-6 md:py-6">
        <div className="font-bold text-lg md:text-xl mb-2">Rooms in {hotel.location}</div>
        <p className="text-gray-700 overflow-hidden tracking-tighter text-sm md:text-base">
          {hotel.description.substring(0, 86)}..
        </p>
        <p className="mt-2 font-bold text-base md:text-lg text-slate-700">Price: ₹{hotel.price} night</p>
        <Link to={`/hotel/${hotel._id}`} className="text-blue-500 mt-2 block">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;

