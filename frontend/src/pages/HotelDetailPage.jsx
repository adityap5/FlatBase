// src/pages/HotelDetailPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHotel, createBooking } from '../api';

const HotelDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [month, setMonth] = useState(1)


  useEffect(() => {
    const fetchHotel = async () => {
      const { data } = await getHotel(id);
      setHotel(data);
    };

    fetchHotel();
  }, [id]);

  const incresesMonth=()=>{
   setMonth(month+1)
  }
  const decresesMonth=()=>{
   setMonth(month-1)
  }

  const handleBooking = async () => {
    if (!localStorage.getItem('token')) {
      return navigate('/login');
    }

    const bookingData = {
      hotel: id,
      timePeriod:month,
      totalPrice: hotel.price * month,
    };

    await createBooking(bookingData);
    return navigate('/bookings');
  };

  return (
    <div className="container mx-auto px-4">
      {hotel && (
        <>
        <div className="flex justify-center items-center px-10">
          <div className="space-y-4 w-1/2">
          <h1 className="text-3xl font-bold my-4">{hotel.name}</h1>
          <img className="w-80" src={hotel.images} alt="Hotel" />
          <p className="tracking-tighter text-zinc-600">{hotel.description}</p>
          <div className="flex gap-10 font-semibold">
          <p>Location: {hotel.location}, India</p> 
          <p>Capacity: {hotel.capacity} guests</p>
          <p>Price: ₹{hotel.price}/night</p>
          </div>
          
          <p>Owners Name : {hotel.seller.name}</p>
          </div>
          <div className='w-1/2 '>
          {/* <Calendar selectionRange={selectionRange} handleSelect={handleSelect} /> */}
          <div className="flex gap-4">
            <h1 className="text-4xl ">Book Flat for : </h1>
            <p className="text-4xl">{month} month</p>
            <div className=" text-white">
            <button onClick={incresesMonth} className="py-2 px-4 bg-zinc-500 mr-4">+</button>
            <button onClick={decresesMonth} className="py-2 px-4 bg-zinc-500">-</button>
            </div>
          </div>
         <button onClick={handleBooking} className="bg-blue-500 text-white py-2 px-4 rounded mt-4"> Book Now</button>
          </div>
        </div>
            
        </>
      )}
    </div>
  );
};

export default HotelDetailPage;
