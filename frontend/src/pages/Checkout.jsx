import { Button, IconButton } from '@mui/material';
import FlatCard from '../components/FlatCard';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooking } from '../api';
// import Loader from '../components/Loader';

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
      const bill =()=>{
            console.log('bill pay kar');
      }
  return (
    <div>
      <div className="grid-cols-3 relative mt-10">
               
                    {/* {[1, 1,].map((item) => <CartItems />)} */}
                    {flat &&
    
                <div className="px-5 sticky bg-white top-0 h-auto mt-5 lg:mt-0 shadow-lg rounded-lg">
                    <div className="border-0 rounded-lg px-6 py-4">
                        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Price Details</h2>
                        <hr className="mb-4" />
                        <div className="space-y-4 text-lg mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Price for {flat.timePeriod} month{flat.timePeriod > 1 ? 's' : ''}</span>
                                <span className="font-semibold">₹{flat.totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Security Deposit</span>
                                <span className="font-semibold">₹999</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Advance Payment</span>
                                <span className="font-semibold">₹{Math.round(flat.totalPrice/flat.timePeriod).toLocaleString()}</span>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="flex items-center justify-between py-3 text-xl font-bold">
                            <div>
                                <span className="text-gray-800">Total Charge</span>
                                <p className="text-xs font-normal text-gray-500">(Total Price + Advance + Security Deposit)</p>
                            </div>
                            <span className="text-green-600">₹{(flat.totalPrice + 999 + Math.round(flat.totalPrice/flat.timePeriod)).toLocaleString()}</span>
                        </div>
                        <Button
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
                            onClick={bill}
                        >
                            Proceed to Pay
                        </Button>
                    </div>
                </div>
}
      </div>
    </div>
  )
}

export default Checkout