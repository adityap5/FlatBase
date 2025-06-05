import { useState, useEffect } from "react"
import { Home, MapPin, Calendar, Trash2, CreditCard, Loader2, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
// Import your actual API functions
import { getBookings, deleteBooking } from "../api"

// Button Component
const Button = ({ name, onClick, css = "", fullWidth = false, ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
      fullWidth ? "w-full" : ""
    } ${css || "bg-[#76ABAE] hover:bg-[#76ABAE]/90 text-white"}`}
    {...props}
  >
    {name}
  </button>
)

// Modal Component
const Modal = ({ isOpen, setIsOpen, header, footer, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {header && <div className="mb-4">{header}</div>}
        <div className="mb-6">{children}</div>
        {footer && <div>{footer}</div>}
      </div>
    </div>
  )
}

const BookingPage = () => {
  const [bookings, setBookings] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

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
    console.log("Delete clicked for booking:", bookingId) // Debug log
    setSelectedBooking(bookingId)
    setIsModalOpen(true)
  }

  const confirmDelete = async () => {
    console.log("Confirm delete called for:", selectedBooking) // Debug log
    
    if (!selectedBooking) {
      console.error("No booking selected for deletion")
      return
    }

    try {
      setIsDeleting(true)
      await deleteBooking(selectedBooking)
      
      // Remove booking from state
      setBookings(prevBookings => 
        prevBookings.filter(booking => booking._id !== selectedBooking)
      )
      
      // Close modal and reset state
      setIsModalOpen(false)
      setSelectedBooking(null)
      console.log("Booking deleted successfully")
      
    } catch (error) {
      console.error("Error deleting booking:", error)
      setError("Failed to delete booking. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleModalClose = () => {
    console.log("Modal closing") // Debug log
    setIsModalOpen(false)
    setSelectedBooking(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin">
          <Loader2 size={32} className="text-[#76ABAE]" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Bookings</h1>
        <p className="text-gray-600 mt-2">Manage all your property bookings in one place</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start">
          <AlertCircle size={20} className="mr-2 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold">{booking.flat.name || "Booked Property"}</h2>
                <div className="px-3 py-1 bg-[#76ABAE]/10 text-[#76ABAE] rounded-full text-sm font-medium">
                  Active
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2 text-[#76ABAE]" />
                  <p>{booking.flat.location}, India</p>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2 text-[#76ABAE]" />
                  <p>
                    Duration: {booking.timePeriod} month{booking.timePeriod > 1 ? "s" : ""}
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
                  css="bg-red-500 hover:bg-red-600 text-white"
                />
                <Link to={`/checkout/${booking._id}`} className="flex-1">
                
                <Button
                  name={
                    <div className="flex items-center">
                      <CreditCard size={16} className="mr-2" />
                      Checkout
                    </div>
                  }
                  css="bg-green-500 hover:bg-green-600 text-white"
                />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="mb-4 flex justify-center">
            <Calendar size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Bookings Found</h3>
          <p className="text-gray-500 mb-6">You haven&apos;t made any bookings yet.</p>
          <Button name="Browse Properties" />
        </div>
      )}

      {/* Debug Info */}
      {/* <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>Modal Open: {isModalOpen ? "Yes" : "No"}</p>
        <p>Selected Booking: {selectedBooking || "None"}</p>
        <p>Is Deleting: {isDeleting ? "Yes" : "No"}</p>
        <p>Bookings Count: {bookings.length}</p>
      </div> */}

      {/* Confirmation Modal */}
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
              onClick={handleModalClose}
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
              css="bg-red-500 hover:bg-red-600 text-white"
              disabled={isDeleting}
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