import React, { useEffect, useState } from 'react';
import { getMyListings, deleteListing } from '../api';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import Modal from '../components/Modal';

function MyListings() {
  const [listings, setListings] = useState([]);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await getMyListings();
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };
    fetchListings();
  }, []);

  const handleDelete = async () => {
    if (selectedListingId) {
      try {
        await deleteListing(selectedListingId);
        setListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== selectedListingId)
        );
        setIsOpen(false);
        setSelectedListingId(null); // Reset selected listing after deletion
      } catch (error) {
        console.error('Failed to delete listing:', error);
      }
    }
  };

  const openModal = (id) => {
    setSelectedListingId(id);
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      {listings.length > 0 ?
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {listings.map((listing) => (
            <div key={listing._id} className="p-4 shadow rounded-xl hover:shadow-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">{listing.name}</h2>
                <Link className="" to={`/flat/${listing._id}`}>
                  <Button name={"View"} />
                </Link>
              </div>
              <p className="text-zinc-500 text-xl">Location: {listing.location}, India</p>
              <div className="space-y-1 ">
                <p>Guests: {listing.capacity} </p>
                <p className="text-xl">Price: ₹{listing.price}</p>
              </div>
              <div className="flex justify-between md:gap-10">
                <Link to={`/updatePage/${listing._id}`}>
                  <Button name={"Update ✍🏻"} />
                </Link>
                <Button name={"Delete Listing 🗑️"} />
              </div>
            </div>
          ))}
        </div>
        : <>

          <p>You have no listings.</p>
        </>
      }
      <button onClick={() => openModal()}> op</button>
      {isOpen && (
        <Modal
          header={<div className="text-xl font-bold text-black">Are you sure you want to delete?</div>}
          footer={
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-[#76ABAE] px-6 py-2 font-semibold hover:bg-gray-400/80 active:bg-gray-400/60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-6 py-2 font-semibold hover:bg-blue-400/80 active:bg-blue-400/60"
              >
                Delete
              </button>
            </div>
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <p className="text-lg text-zinc-700">
            You are about to delete the listing with ID: {selectedListingId}.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default MyListings;
