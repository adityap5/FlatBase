import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBookings, deleteBooking } from '../api';


const BookingPage = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [bookingId, setBookingId] = useState('');
    useEffect(() => {
        const fetchHotel = async () => {
          const { data } = await getBookings();
        //   const {delete} = await deleteBooking(bookingId)
          setBookings(data);
          console.log(data)
        };
    
        fetchHotel();
      }, []);
const handleBooking =()=>{
    console.log(bookingId)
}
    return (
        <div className="container mx-auto px-20 py-4">
            <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {bookings.map((bookings) => (
                        <>
                        <div key={bookings._id} className="bg-white p-4 shadow rounded-lg space-y-2">
                            <h2 className="text-xl pb-2 font-semibold">{bookings.hotel.name}</h2>
                            <p className="text-zinc-500">location : {bookings.hotel.location}, India</p>
                            <p>How Long: {bookings.timePeriod} month</p>
                            <p>Price:  ₹{bookings.totalPrice}</p>

                            <button onClick={()=>setBookingId(bookings._id)} className='bg-red-600 text-white p-2 rounded-lg text-sm'>Delete Booking</button>
                            <button onClick={handleBooking} className='bg-red-600 text-white p-2 rounded-lg text-sm'>show Booking</button>
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
