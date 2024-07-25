import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFlat, createBooking } from '../api';
import Loader from '../components/Loader';

const FlatDetailPage = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [month, setMonth] = useState(1)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchFlat = async () => {
      const { data } = await getFlat(id);
      setFlat(data);
      setLoading(false);
    };

    fetchFlat();
  }, [id]);

  const incresesMonth = () => {
    setMonth(month + 1)
  }
  const decresesMonth = () => {
    setMonth(month - 1)
  }

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
    return navigate('/bookings');
  };

  return (
    <div className="container mx-auto px-4">
      <Loader loading={loading}/>
      {flat && (
        <>
          <div className="flex justify-center items-center px-10">
            <div className="space-y-4 w-1/2">
              <h1 className="text-3xl font-bold my-4">{flat.name}</h1>
              <img className="w-80" src={flat.images} alt="flat" />
              <p className="tracking-tighter ">{flat.description}</p>
              <div className="flex gap-10 font-semibold">
                <p>Location: {flat.location}, India</p>
                <p>Capacity: {flat.capacity} guests</p>
                <p>Price: ₹{flat.price}/night</p>
              </div>

              <p>Owners Name : {flat.seller.name}</p>
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
              <button onClick={handleBooking} className="bg-[#76ABAE] text-white py-2 px-4 rounded mt-4"> Book Now</button>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default FlatDetailPage;
