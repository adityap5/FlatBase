import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFlat, createBooking } from '../api';
import Loader from '../components/Loader';
import { Container, Box, Typography, IconButton, Paper } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import Button from '../components/Button';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Bounce } from 'react-toastify';
const FlatDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [month, setMonth] = useState(1);
  const [loading, setLoading] = useState(true);

  // const notify = () =>
  //   toast.success('Removed from cart!', {
  //     position: 'top-right',
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'dark',
  //     transition: Bounce,
  //   });

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

  const handleBooking = async () => {
    if (!localStorage.getItem('token')) {
      return navigate('/login');
    }
    const bookingData = {
      flat: id,
      timePeriod: month,
      totalPrice: flat.price * month,
    };

    await createBooking(bookingData);
    return  navigate('/bookings');
  };

  return (
    <Container className="mx-auto px-4 py-8">
      <Loader loading={loading} />
      {flat && (
        <Paper elevation={3} className="p-4">
          <Box className="flex flex-col md:flex-row justify-center items-center md:gap-10">
            <Box className="space-y-4 w-full md:w-1/2">
              <h1 className="font-bold text-2xl">
                {flat.name}
              </h1>
              <img className="w-full md:w-80" src={flat.images} alt="flat" />
              <p variant="body1" className="text-lg">
                {flat.description}
              </p>
              <Box className="flex flex-col md:flex-row gap-4 font-semibold">
                <p className="text-zinc-600">Location: {flat.location}, India</p>
                <p className="text-zinc-600">Capacity: {flat.capacity} guests</p>
                <p className="text-zinc-600">Price: ₹{flat.price}/night</p>
              </Box>
              <p>Owner's Name: {flat.seller}</p>
            </Box>
            <Box className="w-full md:w-1/2 mt-6 md:mt-0">
              <Box className="flex items-center gap-4">
                <h2 className="text-2xl">Book Flat for:</h2>
                <span className="text-xl">{month} month{month > 1 && 's'}</span>
                <Box className="flex items-center ">
                  <button className="rounded-full bg-zinc-600 text-white" onClick={increaseMonth}>
                    <Add />
                  </button>
                  <button className="rounded-full bg-zinc-600 text-white ml-1" onClick={decreaseMonth} color="primary">
                    <Remove />
                  </button>
                </Box>
              </Box>
              <Button
                onClick={handleBooking}
                name={"BOOK NOW"}
              />
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default FlatDetailPage;
