"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, Trash2, CreditCard, Loader2, AlertCircle, Filter, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { getBookings, deleteBooking } from "../graphql/queries"

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

const Modal = ({ isOpen, setIsOpen, header, footer, children }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
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
  const [filteredBookings, setFilteredBookings] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  })

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) {
          setError("No user ID found. Please log in.")
          setLoading(false)
          return
        }
        const { data } = await getBookings(userId)
        setBookings(data.myBookings || [])
        setFilteredBookings(data.myBookings || [])
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setError("Failed to load bookings. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  useEffect(() => {
    let filtered = [...bookings]

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((booking) =>
        booking.flat.location.toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter((booking) => booking.totalPrice >= Number.parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((booking) => booking.totalPrice <= Number.parseInt(filters.maxPrice))
    }

    // Sort bookings
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.totalPrice - b.totalPrice
        case "price-high":
          return b.totalPrice - a.totalPrice
        case "duration":
          return b.timePeriod - a.timePeriod
        case "newest":
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }
    })

    setFilteredBookings(filtered)
  }, [bookings, filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
    })
  }

  const handleDeleteClick = (bookingId) => {
    setSelectedBooking(bookingId)
    setIsModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedBooking) return
    try {
      setIsDeleting(true)
      await deleteBooking(selectedBooking)
      setBookings((prev) => prev.filter((b) => b._id !== selectedBooking))
      setIsModalOpen(false)
      setSelectedBooking(null)
    } catch (error) {
      console.error("Error deleting booking:", error)
      setError("Failed to delete booking. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedBooking(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 size={24} className="text-[#76ABAE] animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Your Bookings</h1>
        <p className="text-gray-500 mt-1">Manage your property reservations</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-[#76ABAE]" />
          <h3 className="font-medium text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search location..."
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE] outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              placeholder="₹0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE] outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              placeholder="₹100000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE] outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE] outline-none text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
          <button onClick={clearFilters} className="text-sm text-[#76ABAE] hover:text-[#76ABAE]/80 font-medium">
            Clear Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 border-l-4 border-red-400 bg-red-50 text-red-700 text-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:border-[#76ABAE]/30 transition-colors"
            >
              <div className="mb-2">
                <Link to={`/flat/${booking.flat._id}`} className="hover:underline">
                <h2 className="text-lg font-medium text-gray-900 mb-2">{booking.flat.name || "Booked Property"}</h2>
                </Link>
                <div className="flex justify-between items-center">

                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={14} className="mr-1" />
                  {booking.flat.location}, India
                </div>

                <span className="px-3 py-1 bg-[#76ABAE]/10 text-[#76ABAE] text-xs font-medium rounded-full">
                  Active
                </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={14} className="mr-2 text-[#76ABAE]" />
                    {booking.timePeriod} month{booking.timePeriod > 1 ? "s" : ""}
                  </div>
                  <p className="text-lg font-medium text-gray-900">₹{booking.totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className=" flex justify-between items-center gap-2">
                <button
                  onClick={() => handleDeleteClick(booking._id)}
                  className="w-1/2 flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                  Cancel
                </button>
                <Link to={`/checkout/${booking._id}`} className="block w-1/2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#76ABAE] text-white rounded-lg hover:bg-[#76ABAE]/90 transition-colors">
                    <CreditCard size={14} />
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {bookings.length === 0 ? "No bookings yet" : "No bookings match your filters"}
          </h3>
          <p className="text-gray-500 mb-6">
            {bookings.length === 0
              ? "Start exploring properties to make your first booking"
              : "Try adjusting your filters to see more results"}
          </p>
          {bookings.length === 0 ? (
            <button className="px-6 py-2 bg-[#76ABAE] text-white text-sm rounded-lg hover:bg-[#76ABAE]/90 transition-colors">
              Browse Properties
            </button>
          ) : (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#76ABAE] text-white text-sm rounded-lg hover:bg-[#76ABAE]/90 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        header={
          <h2 className="text-lg font-medium flex items-center gap-2">
            <AlertCircle size={18} className="text-red-500" />
            Cancel Booking
          </h2>
        }
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Keep Booking
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Cancelling...
                </div>
              ) : (
                "Cancel Booking"
              )}
            </button>
          </div>
        }
      >
        <div className="text-gray-700 text-sm">
          <p className="mb-2">Are you sure you want to cancel this booking?</p>
          <p className="text-gray-500">This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  )
}

export default BookingPage
