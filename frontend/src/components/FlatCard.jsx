import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const FlatCard = ({ flat }) => {
  return (
    <div className="bg-[#] max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl overflow-hidden shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300">
      <img className="h-56 w-full object-cover" src={flat.images} alt="Flat" />
      <div className="px-4 py-4 md:px-6 md:py-6">
        <div className="font-bold text-lg md:text-xl mb-2">Rooms in {flat.location}</div>
        <p className="text-gray-400 overflow-hidden tracking-tighter text-sm md:text-base">
          {flat.description.substring(0, 86)}..
        </p>
        <p className="mt-2 mb-4 font-bold text-base md:text-lg ">Price: ₹{flat.price} night</p>
        <Link to={`/flat/${flat._id}`}>
          <Button name={"View Details"}/>
        </Link>
      </div>
    </div>
  );
};

export default FlatCard;

