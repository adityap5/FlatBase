import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100">
            <h1 className="text-4xl font-bold text-green-700">Payment Successful 🎉</h1>
            <p className="text-lg mt-4">Your booking has been confirmed and deleted from our records.</p>
            <Link to="/bookings" className="mt-6 px-6 py-3 bg-[#76ABAE] hover:bg-[#5a8a8d] transition-colors text-white rounded-lg text-lg">
                Go to My Bookings
            </Link>
        </div>
    );
};

export default Success;
