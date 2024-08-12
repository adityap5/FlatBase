import React, { useEffect, useState } from 'react'
import {getMyListings} from '../api'
import Button from '../components/Button';
import { useNavigate,Link} from 'react-router-dom';

function MyListings() {
  const [listing, setListing] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  useEffect(() => {
    const fetchListings = async () =>{
      const {data} = await getMyListings()
      setListing(data)
    }
   fetchListings()
  }, [])
  const navigate = useNavigate()

  const handleUpdate = () => {
    navigate('/updatePage')
  }
  const handleDelete = () => {
    setDeleteModal(true);
    console.log('deleteModal')
  }
  const DeleteModal =()=>{
   return(
    <>
    <div className="w-40 h-auto bg-opacity-5" >
    <h2 className='text-center'>Are you sure?😮</h2>
    <div className="flex justify-between">

    <button className='bg-red-600 p-2 rounded-lg text-sm px-4 py-2 '>Yes</button>
    <button onclick={() =>setDeleteModal(false)} className='bg-green-600 px-4 py-2 rounded-lg text-sm '>No</button>
    </div>
    </div>
    </>
   )
  }
  return (
    <div className="container mx-auto px-4 py-4 md:px-20">
    <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
    {listing.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {listing.map((listing) => (
                <div key={listing._id} className="p-4 shadow rounded-xl hover:shadow-lg">
                    <h2 className="text-2xl font-semibold">{listing.name}</h2>
                    <p className="text-zinc-500 text-xl">Location: {listing.location}, India</p>
                    <div className="space-y-1 ">
                    <p>guests: {listing.capacity} </p>
                    <p className="text-xl">Price: ₹{listing.price}</p>
                    </div>
                    <div className='flex justify-between md:gap-10'>
                   
                    <Link to={`/updatePage/${listing._id}`}>
                    <Button onClick={handleUpdate}  name={"Update ✍🏻"}/>
                            </Link>
                    <Button onClick={handleDelete}  name={"Delete Listing 🗑️"}/>
                 
                    
                    </div>
                    
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
