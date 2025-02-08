import { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';

const BookingPage = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlat = async () => {
            try {
                const { data } = await getBookings();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchFlat();
    }, []);

    const handleDeleteClick = (bookingId) => {
        setSelectedBooking(bookingId);
        setIsModalOpen(true);  // Open the modal
    };

    const confirmDelete = async () => {
        try {
            if (selectedBooking) {
                await deleteBooking(selectedBooking);
                setBookings(bookings.filter(booking => booking._id !== selectedBooking));
                setIsModalOpen(false);  // Close the modal
                setSelectedBooking(null);
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

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
                                <Button onClick={() => handleDeleteClick(booking._id)} name={"Delete Booking"} />
                                <Link to={`/checkout/${booking._id}`}>
                                    <Button name={"Checkout"} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no bookings.</p>
            )}

            {/* Modal for Confirm Delete */}
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                header={<h2 className="text-lg font-semibold">Confirm Deletion</h2>}
                footer={(
                    <div className="flex justify-end gap-4">
                        <Button onClick={() => setIsModalOpen(false)} name="Cancel" />
                        <Button onClick={confirmDelete} name="Delete" />
                    </div>
                )}
            >
                <p>Are you sure you want to delete this booking?</p>
            </Modal>
        </div>
    );
};

export default BookingPage;
