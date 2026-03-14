import { useState, useEffect } from "react"
import { MapPin, Calendar, Trash2, CreditCard, Loader2, AlertCircle, Filter, Search, Star, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { getBookings, deleteBooking, addReview } from "../graphql/queries"

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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {header && <div className="mb-6">{header}</div>}
        <div className="mb-8">{children}</div>
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
  
  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [reviewData, setReviewData] = useState({ rating: 5, text: "" })
  const [reviewingBooking, setReviewingBooking] = useState(null)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

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
        // Filter out bookings where flat was deleted to prevent crashes
        const validBookings = (data.myBookings || []).filter(b => b.flat !== null)
        setBookings(validBookings)
        setFilteredBookings(validBookings)
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

    if (filters.location) {
      filtered = filtered.filter((booking) =>
        booking.flat?.location?.toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter((booking) => booking.totalPrice >= Number.parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((booking) => booking.totalPrice <= Number.parseInt(filters.maxPrice))
    }

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

  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))
  
  const clearFilters = () => setFilters({ location: "", minPrice: "", maxPrice: "", sortBy: "newest" })

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
      setError("Failed to cancel booking.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleReviewClick = (booking) => {
    setReviewingBooking(booking)
    setReviewData({ rating: 5, text: "" })
    setIsReviewOpen(true)
  }

  const submitReview = async () => {
    if (!reviewingBooking) return
    setIsSubmittingReview(true)
    try {
      const userId = localStorage.getItem("userId")
      await addReview({
        flat: reviewingBooking.flat._id,
        user: userId,
        rating: reviewData.rating,
        text: reviewData.text
      })
      alert("Review submitted successfully!")
      setIsReviewOpen(false)
    } catch (err) {
      console.error("Failed to submit review:", err)
      alert("Failed to submit review.")
    } finally {
      setIsSubmittingReview(false)
    }
  }

  if (loading) return <div className="flex justify-center items-center py-20"><Loader2 size={32} className="text-[#76ABAE] animate-spin" /></div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
      <div className="mb-10 content-center text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">My Bookings</h1>
        <p className="text-gray-500">Manage your past and upcoming stays securely.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-white shadow-lg rounded-2xl p-6 mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={20} className="text-[#76ABAE]" />
          <h3 className="font-semibold text-gray-800 text-lg">Filter Bookings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Location</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Where to?"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Min Price</label>
            <input
              type="number"
              placeholder="₹ Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Max Price</label>
            <input
              type="number"
              placeholder="₹ Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all outline-none"
            />
          </div>

          <div>
             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all outline-none"
            >
              <option value="newest">Latest Bookings</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
             Found <strong className="text-gray-800">{filteredBookings.length}</strong> bookings
          </p>
          <button onClick={clearFilters} className="text-sm text-[#76ABAE] hover:text-[#5a878a] font-semibold transition-colors">
            Reset Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                 <img src={booking.flat?.images || "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80"} alt={booking.flat?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 right-4 shadow-md backdrop-blur-md bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-800 uppercase tracking-wider">
                   {booking.paymentStatus === 'paid' ? <span className="text-emerald-600">Paid</span> : <span className="text-orange-500">Pending</span>}
                 </div>
              </div>

              <div className="p-6">
                <Link to={booking.flat?._id ? `/flat/${booking.flat._id}` : "#"} className="hover:text-[#76ABAE] transition-colors">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{booking.flat?.name || "Booked Property"}</h2>
                </Link>
                
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <MapPin size={16} className="mr-1 text-[#76ABAE]" />
                  {booking.flat?.location}, India
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Calendar size={14} /> Duration</span>
                    <span className="font-semibold text-gray-800">{booking.timePeriod} mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total</span>
                    <span className="font-bold text-[#76ABAE] text-lg">₹{booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {booking.paymentStatus === 'paid' ? (
                    <button
                      onClick={() => handleReviewClick(booking)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 font-semibold rounded-xl hover:bg-purple-100 transition-colors"
                    >
                      <MessageSquare size={18} />
                      Write Review
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDeleteClick(booking._id)}
                        className="w-12 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Cancel Booking"
                      >
                        <Trash2 size={18} />
                      </button>
                      <Link to={`/checkout/${booking._id}`} className="flex-1">
                        <button className="w-full shadow-lg shadow-[#76ABAE]/20 flex items-center justify-center gap-2 px-4 py-3 bg-[#76ABAE] text-white font-semibold rounded-xl hover:bg-[#5a878a] transition-colors">
                          <CreditCard size={18} />
                          Pay Now
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-white">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No bookings found</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            {bookings.length === 0 ? "You haven't made any bookings yet." : "No bookings match your current filter criteria."}
          </p>
          <button onClick={() => window.location.href='/'} className="px-8 py-3 bg-[#76ABAE] text-white font-bold rounded-xl hover:bg-[#5a878a] transition-colors shadow-lg shadow-[#76ABAE]/20">
            Explore Properties
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        header={<h2 className="text-2xl font-bold text-gray-800">Cancel Booking</h2>}
        footer={
          <div className="flex justify-end gap-3 mt-8">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              Keep It
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-6 py-3 font-semibold bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
              Confirm Cancel
            </button>
          </div>
        }
      >
        <p className="text-gray-600 text-lg">Are you sure you want to cancel this booking? This action cannot be undone.</p>
      </Modal>

      {/* Write Review Modal */}
      <Modal
        isOpen={isReviewOpen}
        setIsOpen={setIsReviewOpen}
        header={<h2 className="text-2xl font-bold text-gray-800">Rate your stay</h2>}
        footer={
           <div className="flex justify-end gap-3 mt-8">
            <button onClick={() => setIsReviewOpen(false)} className="px-6 py-3 font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button
              onClick={submitReview}
              disabled={isSubmittingReview || !reviewData.text.trim()}
              className="px-6 py-3 font-semibold bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmittingReview ? <Loader2 size={18} className="animate-spin" /> : <MessageSquare size={18} />}
              Submit Review
            </button>
          </div>
        }
      >
        <div>
           <div className="flex justify-center gap-2 mb-8">
             {[1,2,3,4,5].map(s => (
                <Star 
                  key={s} 
                  size={40} 
                  className={`cursor-pointer transition-colors ${s <= reviewData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                  onClick={() => setReviewData({...reviewData, rating: s})} 
                />
             ))}
           </div>
           
           <label className="block text-sm font-bold text-gray-700 mb-2">Share your experience</label>
           <textarea 
             rows={4}
             value={reviewData.text}
             onChange={(e) => setReviewData({...reviewData, text: e.target.value})}
             placeholder="What did you like about this property?"
             className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none resize-none"
           />
        </div>
      </Modal>

    </div>
  )
}

export default BookingPage
