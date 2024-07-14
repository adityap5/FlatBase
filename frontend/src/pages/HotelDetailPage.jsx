// src/pages/HotelDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHotel, createBooking } from '../api';
import Calendar from '../components/Calendar';

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  useEffect(() => {
    const fetchHotel = async () => {
      const { data } = await getHotel(id);
      setHotel(data);
    };

    fetchHotel();
  }, [id]);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleBooking = async () => {
   
    if (!localStorage.getItem('token')) {
   
      return navigate('/login');
    }

    const bookingData = {
      hotel: id,
      checkInDate: selectionRange.startDate,
      checkOutDate: selectionRange.endDate,
      totalPrice: hotel.price,
    };

    await createBooking(bookingData);
    // Redirect to bookings page after successful booking
    return navigate('/bookings');
  };

  return (
    <div className="container mx-auto px-4">
      {hotel && (
        <>
          <h1 className="text-3xl font-bold my-4">{hotel.name}</h1>
          <img className="w-80" src={hotel.images} alt="Hotel" />
          <p>{hotel.description}</p>
          <p>Location: {hotel.location}</p>
          <p>Price: ₹{hotel.price}/night</p>
          <Calendar selectionRange={selectionRange} handleSelect={handleSelect} />
          <button onClick={handleBooking} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Book Now
          </button>
        </>
      )}
    </div>
  );
};

export default HotelDetailPage;
