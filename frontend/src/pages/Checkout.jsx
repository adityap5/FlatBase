import { Button, IconButton } from '@mui/material';
import FlatCard from '../components/FlatCard';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooking } from '../api';
import Loader from '../components/Loader';

function Checkout() {
    const navigate = useNavigate()
  const { id } = useParams();
  const [flat, setFlat] = useState(null);

  const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFlat = async () => {
          const { data } = await getBooking(id);
          setFlat(data);
          setLoading(false);
        };
    
        fetchFlat();
      }, [id]);
  return (
    <div>
      <div className="grid-cols-3 relative mt-10">
               
                    {/* {[1, 1,].map((item) => <CartItems />)} */}
                    {flat &&
    
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                    <div className="border rounded-lg px-4 py-2">
                        <p className='uppercase font-bold opacity-60 pb-4'>Price details</p>
                        <hr />
                        <div className="space-y-3 font-semibold mb-4 ">
                            <div className="flex justify-between pt-3 ">
                                <span>Price for {flat.timePeriod} month{flat.timePeriod > 1 && 's'}</span>
                                <span>₹{flat.totalPrice} </span>
                            </div>
                            <div className="flex justify-between pt-3">
                                <span>Security Charge</span>
                                <span className="">₹999</span>
                            </div>
                            <div className="flex justify-between pt-3 ">
                                <span>Advance</span>
                                <span className="">₹{flat.totalPrice/flat.timePeriod} </span>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between pt-3 font-bold">
                               <div className="">
                                <span>Total Charge</span>
                                <p className="text-xs font-extralight">(Total Price + Advance + Security Charge )</p>
                               </div>

                                <span className="text-green-600">₹{flat.totalPrice + 999 + (flat.totalPrice/flat.timePeriod)} </span>
                            </div>

                        </div>
                        <Button
                            variant='contained'
                            className='w-full'
                            sx={{ px: '2rem', backgroundColor:'#76ABAE',fontSize:'20px' }}>Pay</Button>
                    </div>
                </div>
}
      </div>
    </div>
  )
}

export default Checkout