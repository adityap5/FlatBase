import { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../api';
import { useNavigate,Link } from 'react-router-dom';
import Button from '../components/Button';

const BookingPage = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const navigate  = useNavigate();

    useEffect(() => {
        const fetchFlat = async () => {
            const { data } = await getBookings();
            setBookings(data);
        };
        
        fetchFlat();
    }, []);

    const handleDelete = async (bookingId) => {
        await deleteBooking(bookingId);
        console.log('Booking deleted');
        setBookings(bookings.filter(booking => booking._id !== bookingId));
    };
    const handleCheckout =() => {
        navigate('/checkout');
    }
    return (
        <div className="container mx-auto px-4 py-4 md:px-20">
            <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="p-4 shadow bg-zinc-100 rounded-xl hover:shadow-lg">
                            <h2 className="text-xl font-semibold">{booking.flat.name}</h2>
                            <p className="text-zinc-500 text-xl">Location: {booking.flat.location}, India</p>
                            <div className="space-y-1">
                            <p>How Long: {booking.timePeriod} month{booking.timePeriod > 1 && 's'}</p>
                            <p>Price: ₹{booking.totalPrice}</p>
                            </div>
                            <div className='flex justify-between md:gap-10'>
                            <Button onClick={() => handleDelete(booking._id)}  name={"Delete Booking"}/>
                            <Link to={`/checkout/${booking._id}`}>
                                 <Button name={"Checkout"}/>
                            </Link>
                            </div>
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
