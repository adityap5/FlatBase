import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { getFlat, createBooking } from '../api';
import Loader from '../components/Loader';
import { Container, Box, Paper } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
// import Button from '../components/Button';

const FlatDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [month, setMonth] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleBooking = async () => {

    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    try {
      const bookingData = {
        flat: id,
        timePeriod: month,
        totalPrice: flat.price * month,
      };


      const response = await createBooking(bookingData);

      if (response.status === 201 || response.status === 200) {

        navigate('/bookings');
      } else {
        setError('Failed to create booking. Please try again.');
      }
    } catch (err) {
      console.error('Error creating booking:', err.response?.data || err.message);
      setError('An error occurred while creating the booking. Please try again.');
    }
  };


  useEffect(() => {
    const fetchFlat = async () => {
      const { data } = await getFlat(id);
      setFlat(data);
      setLoading(false);
    };

    fetchFlat();
  }, [id]);

  const increaseMonth = () => {
    setMonth(month + 1);
  };

  const decreaseMonth = () => {
    setMonth(month > 1 ? month - 1 : 1);
  };


  return (
    <div className="w-full">
      <Loader loading={loading} />
      {flat && (
        <Paper elevation={6} className="p-6">
          <Box className="flex flex-col md:flex-row justify-between items-start md:gap-12">
            <Box className="w-full md:w-1/2">
              <img className="w-3/5 h-auto rounded-lg mx-auto" src={flat.images} alt={flat.name} />
            </Box>
            <Box className="w-full md:w-1/2 mt-8 md:mt-0">
              <h1 className="font-bold text-6xl">{flat.name}</h1>
              <p className="text-2xl text-gray-600">{flat.location}, India</p>
              <h4 className='text-zinc-500 mt-4 '>Details</h4>
              <p className="text-xl">{flat.description}</p>
              <Box className="font-semibold flex gap-8 mt-4">
                <p className="text-zinc-600 text-xl">Capacity: {flat.capacity} guests</p>
                <p className="text-zinc-600 text-xl">Price: ₹{flat.price} / month</p>
              </Box>
              <p className="text-zinc-600 text-xl">Owner&apos;s Name: {flat.seller}</p>
              <Box className="mt-8 flex flex-col justify-center">
                <h2 className="text-3xl mb-4">Book Flat for:</h2>
                <Box className="flex items-center gap-6 mb-4">
                  <button className="rounded-full bg-zinc-400 text-white p-2" onClick={decreaseMonth}>
                    <Remove fontSize="small" />
                  </button>
                  <span className="text-2xl">{month} month{month > 1 && 's'}</span>
                  <button className="rounded-full bg-zinc-400 text-white p-2" onClick={increaseMonth}>
                    <Add fontSize="small" />
                  </button>
                </Box>
              </Box>
              <Button
                // name={"BOOK NOW"}
                variant='contained'
                className='w-full mt-6'
                sx={{
                  py: '0.75rem',
                  backgroundColor: '#76ABAE',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#5B8D91'
                  }
                }}
                onClick={handleBooking}
              >
                BOOK NOW
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default FlatDetailPage;
