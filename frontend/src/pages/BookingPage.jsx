"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getBookings, deleteBooking } from "../api"
import { useNavigate, Link } from "react-router-dom"
import { Home, MapPin, Calendar, Trash2, CreditCard, Loader2, AlertCircle } from "lucide-react"
import Button from "../components/Button"
import Modal from "../components/Modal"

const BookingPage = () => {
  const [bookings, setBookings] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await getBookings()
        setBookings(data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setError("Failed to load bookings. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const handleDeleteClick = (bookingId) => {
    setSelectedBooking(bookingId)
    setIsModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      if (selectedBooking) {
        setIsDeleting(true)
        await deleteBooking(selectedBooking)
        setBookings(bookings.filter((booking) => booking._id !== selectedBooking))
        setIsModalOpen(false)
        setSelectedBooking(null)
      }
    } catch (error) {
      console.error("Error deleting booking:", error)
      setError("Failed to delete booking. Please try again.")
    } finally {
      setIsDeleting(false)
    }
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
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Your Bookings</h1>
        <p className="text-gray-600 mt-2">Manage all your property bookings in one place</p>
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

      {bookings.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold">{booking.flat.name || "Booked Property"}</h2>
                <div className="px-3 py-1 bg-[#76ABAE]/10 text-[#76ABAE] rounded-full text-sm font-medium">Active</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2 text-[#76ABAE]" />
                  <p>{booking.flat.location}, India</p>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2 text-[#76ABAE]" />
                  <p>
                    Duration: {booking.timePeriod} month{booking.timePeriod > 1 && "s"}
                  </p>
                </div>

                <div className="flex items-center text-gray-600">
                  <Home size={18} className="mr-2 text-[#76ABAE]" />
                  <p>Capacity: {booking.flat.capacity} guests</p>
                </div>

                <div className="flex items-center font-medium text-lg">
                  <span>Total Price:</span>
                  <span className="ml-auto">₹{booking.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  name={
                    <div className="flex items-center">
                      <Trash2 size={16} className="mr-2" />
                      Cancel Booking
                    </div>
                  }
                  onClick={() => handleDeleteClick(booking._id)}
                  css="bg-red-500 hover:bg-red-600"
                />
                <Link to={`/checkout/${booking._id}`} className="flex-1">
                  <Button
                    name={
                      <div className="flex items-center">
                        <CreditCard size={16} className="mr-2" />
                        Checkout
                      </div>
                    }
                    fullWidth
                  />
                </Link>
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
            <Calendar size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Bookings Found</h3>
          <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
          <Link to="/category">
            <Button name="Browse Properties" />
          </Link>
        </motion.div>
      )}

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        header={
          <h2 className="text-lg font-semibold flex items-center">
            <AlertCircle size={20} className="mr-2 text-red-500" />
            Confirm Cancellation
          </h2>
        }
        footer={
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => setIsModalOpen(false)}
              name="Keep Booking"
              css="bg-gray-200 text-gray-800 hover:bg-gray-300"
            />
            <Button
              onClick={confirmDelete}
              name={
                isDeleting ? (
                  <div className="flex items-center">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    <span>Cancelling...</span>
                  </div>
                ) : (
                  "Cancel Booking"
                )
              }
              css="bg-red-500 hover:bg-red-600"
            />
          </div>
        }
      >
        <p className="text-gray-700 mb-2">Are you sure you want to cancel this booking?</p>
        <p className="text-gray-500 text-sm">This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default BookingPage
