import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const FlatCard = ({ flat }) => {
  // const   renderLoader = () => <div className="loader"></div>;
  return (
  
 <div className="relative group  max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl overflow-hidden shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300">
      <img className="h-56 w-full object-cover" src={flat.images} alt="Flat" /> 
      
      <div className="px-4 py-4 md:px-6 md:py-6">
      <h1 className="font-bold font-zain text-2xl md:text-3xl mb-2">Rooms in {flat.location}</h1>
      </div>
      <div className="absolute inset-0 pt-20 items-center justify-center bg-gray-800 bg-opacity-75 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
   
        <p className="text-gray-400 line-clamp-2 overflow-hidden tracking-tighter text-xl md:text-base">
          {flat.description}
        </p>

   
    
        <div className="flex justify-between mt-2">
        <p className="mt-2 mb-4 font-bold text-base md:text-lg ">Price:  ₹{flat.price} night</p>
        
        <Link className="" to={`/flat/${flat._id}`}>
          <Button name={"View Details"}/>
        </Link>
        </div>
        </div>   
      </div>
   
  
   
  );
};

export default FlatCard;

