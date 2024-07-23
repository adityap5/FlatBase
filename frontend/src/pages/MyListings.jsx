import React, { useEffect, useState } from 'react'
import {getMyListings} from '../api'
function MyListings() {
  const [listing, setListing] = useState([])
  useEffect(() => {
    const fetchListings = async () =>{
      const {data} = await getMyListings()
      setListing(data)
    }
   fetchListings()
  }, [])
  
  return (
    <div className="container mx-auto px-20 py-4">
            <h1 className="text-2xl font-bold mb-4">Your Listing</h1>
            {listing.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {listing.map((listing) => (
                        <>
                        <div key={listing._id} className="bg-white p-4 shadow rounded-lg space-y-2">
                            <h2 className="text-xl pb-2 font-semibold">{listing.hotel.name}</h2>
                            <p className="text-zinc-500">location : {listing.hotel.location}, India</p>
                            <p>How Long: {listing.timePeriod} month</p>
                            <p>Price:  ₹{listing.totalPrice}</p>

                            <button onClick={()=>setBookingId(listing._id)} className='bg-red-600 text-white p-2 rounded-lg text-sm'>Delete Booking</button>
                            <button onClick={handleBooking} className='bg-red-600 text-white p-2 rounded-lg text-sm'>show Booking</button>
                        </div>
                        </>
                    )
                    )}
                </div>
            ) : (
                <p>You have no listing Yet!!.</p>
            )}
        </div>
  )
}

export default MyListings
