import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBookings } from '../api';


const BookingPage = ({ userId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchHotel = async () => {
          const { data } = await getBookings();
          setBookings(data);
          console.log(data);
        };
    
        fetchHotel();
      }, []);

    return (
        <div className="container mx-auto px-20 py-4">
            <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {bookings.map((bookings) => (
                        <>
                        <div key={bookings._id} className="bg-white p-4 shadow rounded-lg space-y-2">
                            <h2 className="text-xl pb-2 font-semibold">{bookings.hotel.name}</h2>
                            <p>Check-in: {new Date(bookings.checkInDate).toLocaleDateString()}</p>
                            <p>Check-out: {new Date(bookings.checkOutDate).toLocaleDateString()}</p>
                            <p>Price: ${bookings.hotel.price}</p>
                        </div>
                        </>
                    )
                    )}
                </div>
            ) : (
                <p>You have no bookings.</p>
            )}
        </div>
    );
};

export default BookingPage;
