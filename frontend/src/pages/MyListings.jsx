import React, { useEffect, useState } from 'react'
import { getMyListings,deleteListing } from '../api'
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';

function MyListings() {
  const [listing, setListing] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [listingToDelete, setListingToDelete] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await getMyListings()
      setListing(data)
    }
    fetchListings()
  }, [])


  const handleUpdate = () => {
   navigate('/updatePage')
  };
  const handleDeleteClick = (listingId) => {
    setListingToDelete(listingId);
    setDeleteModal(true);
  };
  const handleDeleteConfirm = async () => {
    if (listingToDelete) {
      try {
        await deleteListing(listingToDelete, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setListing(listing.filter((item) => item._id !== listingToDelete));
      } catch (err) {
        console.error(err);
      } finally {
        setDeleteModal(false);
        setListingToDelete(null);
      }
    }
  };
  const handleCloseModal = () => {
    setDeleteModal(false);
    setListingToDelete(null);
  };
  return (
    <div className="container mx-auto px-4 py-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      {listing.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {listing.map((listing) => (
            <div key={listing._id}  className="p-4 shadow rounded-xl hover:shadow-lg">
              <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">{listing.name}</h2>
              <Link className="" to={`/flat/${listing._id}`}>
          <Button name={"View"}/>
        </Link>
              </div>
              <p className="text-zinc-500 text-xl">Location: {listing.location}, India</p>
              <div className="space-y-1 ">
                <p>guests: {listing.capacity} </p>
                <p className="text-xl">Price: ₹{listing.price}</p>
              </div>
              <div className='flex justify-between md:gap-10'>
              <Link to={`/updatePage/${listing._id}`} >
                  <Button onClick={handleUpdate} name={"Update ✍🏻"} />
                </Link>
                <Button onClick={() => handleDeleteClick(listing._id)} name={"Delete Listing 🗑️"} />

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no listing.</p>
      )}
      {deleteModal && (<DeleteModal
        show={deleteModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
      />)}
    </div>
  )
}

export default MyListings
