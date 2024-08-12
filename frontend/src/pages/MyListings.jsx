import React, { useEffect, useState } from 'react'
import {getMyListings} from '../api'
import Button from '../components/Button';

function MyListings() {
  const [listing, setListing] = useState([])
  useEffect(() => {
    const fetchListings = async () =>{
      const {data} = await getMyListings()
      setListing(data)
    }
   fetchListings()
  }, [])
  console.log(listing)
  
  return (
    <div className="container mx-auto px-4 py-4 md:px-20">
    <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
    {listing.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {listing.map((listing) => (
                <div key={listing._id} className="p-4 shadow rounded-xl hover:shadow-lg">
                    <h2 className="text-xl font-semibold">{listing.name}</h2>
                    <p className="text-zinc-500 text-xl">Location: {listing.location}, India</p>
                    <div className="space-y-1">
                    <p>guests: {listing.capacity} </p>
                    <p>Price: ₹{listing.price}</p>
                    </div>
                    <div className='flex justify-between md:gap-10'>
                    <Button   name={"Delete Booking"}/>
                    {/* <Link to={`/checkout/${li._id}`}>
                         <Button name={"Checkout"}/>
                    </Link> */}
                   
                    </div>
                    <button 
                        // onClick={handleDelete} 
                        className='bg-red-600 p-2 rounded-lg text-sm mt-2'
                    >
                        Are you sure?
                    </button>
                </div>
            ))}
        </div>
    ) : (
        <p>You have no listing.</p>
    )}
</div>
  )
}

export default MyListings
