import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../api';
import { useNavigate } from 'react-router-dom';

const BookingPage = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [bookingId, setBookingId] = useState('');
    const navigate  = useNavigate();

    useEffect(() => {
        const fetchFlat = async () => {
            const { data } = await getBookings();
            setBookings(data);
        };
        
        fetchFlat();
    }, []);

    const handleDelete = async () => {
        await deleteBooking(bookingId);
        console.log(bookingId);
        console.log('Booking deleted');
        setBookings(bookings.filter(booking => booking._id !== bookingId));
    };

    return (
        <div className="container mx-auto px-4 py-4 md:px-20">
            <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white p-4 shadow rounded-xl space-y-2 hover:shadow-lg">
                            <h2 className="text-xl pb-2 font-semibold">{booking.flat.name}</h2>
                            <p className="text-zinc-500">Location: {booking.flat.location}, India</p>
                            <p>How Long: {booking.timePeriod} month</p>
                            <p>Price: ₹{booking.totalPrice}</p>
                            <button 
                                onClick={() => setBookingId(booking._id)} 
                                className='bg-red-600 text-white p-2 rounded-lg text-sm'
                            >
                                Delete Booking
                            </button>
                            <button 
                                onClick={handleDelete} 
                                className='bg-red-600 text-white p-2 rounded-lg text-sm mt-2'
                            >
                                Are you sure?
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no bookings.</p>
            )}
        </div>
    );
};

export default BookingPage;
