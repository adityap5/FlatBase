"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getMyListings, deleteListing } from "../api"
import { useNavigate, Link } from "react-router-dom"
import { Home, MapPin, Users, DollarSign, Pencil, Trash2, Eye, Loader2, PlusCircle, AlertCircle } from "lucide-react"
import Button from "../components/Button"
import Modal from "../components/Modal"

function MyListings() {
  const [listings, setListings] = useState([])
  const [selectedListingId, setSelectedListingId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await getMyListings()
        setListings(data)
      } catch (error) {
        console.error("Failed to fetch listings:", error)
        setError("Failed to load your listings. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const handleDelete = async () => {
    if (selectedListingId) {
      try {
        setIsDeleting(true)
        await deleteListing(selectedListingId)
        setListings((prevListings) => prevListings.filter((listing) => listing._id !== selectedListingId))
        setIsOpen(false)
        setSelectedListingId(null)
      } catch (error) {
        console.error("Failed to delete listing:", error)
        setError("Failed to delete listing. Please try again.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const openModal = (id) => {
    setSelectedListingId(id)
    setIsOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 size={32} className="text-[#76ABAE]" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Your Listings</h1>
          <p className="text-gray-600 mt-2">Manage all your properties in one place</p>
        </div>

        <Link to="/add-flat">
          <Button
            name={
              <div className="flex items-center">
                <PlusCircle size={18} className="mr-2" />
                Add New Property
              </div>
            }
            css="mt-4 md:mt-0"
          />
        </Link>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start"
        >
          <AlertCircle size={20} className="mr-2 mt-0.5" />
          <p>{error}</p>
        </motion.div>
      )}

      {listings.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {listings.map((listing) => (
            <motion.div
              key={listing._id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{listing.name || "Unnamed Property"}</h2>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2 text-[#76ABAE]" />
                  <p>{listing.location}, India</p>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-2 text-[#76ABAE]" />
                  <p>Capacity: {listing.capacity} guests</p>
                </div>

                <div className="flex items-center text-gray-600">
                  <DollarSign size={18} className="mr-2 text-[#76ABAE]" />
                  <p className="font-medium">₹{listing.price.toLocaleString()}/month</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Link to={`/flat/${listing._id}`} className="col-span-1">
                  <Button
                    name={
                      <div className="flex items-center justify-center">
                        <Eye size={16} className="mr-2" />
                        <span className="hidden sm:inline">View</span>
                      </div>
                    }
                    fullWidth
                    css="bg-gray-100 text-gray-800 hover:bg-gray-200"
                  />
                </Link>

                <Link to={`/updatePage/${listing._id}`} className="col-span-1">
                  <Button
                    name={
                      <div className="flex items-center justify-center">
                        <Pencil size={16} className="mr-2" />
                        <span className="hidden sm:inline">Edit</span>
                      </div>
                    }
                    fullWidth
                    css="bg-blue-100 text-blue-800 hover:bg-blue-200"
                  />
                </Link>

                <Button
                  name={
                    <div className="flex items-center justify-center">
                      <Trash2 size={16} className="mr-2" />
                      <span className="hidden sm:inline">Delete</span>
                    </div>
                  }
                  onClick={() => openModal(listing._id)}
                  fullWidth
                  css="bg-red-100 text-red-800 hover:bg-red-200"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-gray-50 rounded-xl"
        >
          <div className="mb-4 flex justify-center">
            <Home size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Listings Found</h3>
          <p className="text-gray-500 mb-6">You haven't added any properties yet.</p>
          <Link to="/add-flat">
            <Button
              name={
                <div className="flex items-center">
                  <PlusCircle size={18} className="mr-2" />
                  Add Your First Property
                </div>
              }
            />
          </Link>
        </motion.div>
      )}

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <h2 className="text-lg font-semibold flex items-center">
            <AlertCircle size={20} className="mr-2 text-red-500" />
            Confirm Deletion
          </h2>
        }
        footer={
          <div className="flex justify-end gap-4">
            <Button onClick={() => setIsOpen(false)} name="Cancel" css="bg-gray-200 text-gray-800 hover:bg-gray-300" />
            <Button
              onClick={handleDelete}
              name={
                isDeleting ? (
                  <div className="flex items-center">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    <span>Deleting...</span>
                  </div>
                ) : (
                  "Delete Property"
                )
              }
              css="bg-red-500 hover:bg-red-600"
            />
          </div>
        }
      >
        <p className="text-gray-700 mb-2">Are you sure you want to delete this property?</p>
        <p className="text-gray-500 text-sm">This action cannot be undone and will remove all associated bookings.</p>
      </Modal>
    </div>
  )
}

export default MyListings
