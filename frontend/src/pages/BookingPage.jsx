import { useState, useEffect } from "react"
import { MapPin, Calendar, Trash2, CreditCard, Loader2, AlertCircle, Filter, Search, Star, MessageSquare, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { getBookings, deleteBooking, addReview } from "../graphql/queries"

const Button = ({ name, onClick, css = "", variant = "primary", fullWidth = false, ...props }) => {
  const baseClasses = "px-4 py-3 rounded-2xl font-body font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-1.5"
  const variantClasses = variant === "primary"
    ? "bg-primary text-on-primary hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:brightness-110"
    : "bg-surface-container border border-glass-border text-on-surface hover:text-white hover:bg-glass-white hover:border-primary"
  const widthClass = fullWidth ? "w-full" : ""

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${widthClass} ${css}`}
      {...props}
    >
      {name}
    </button>
  )
}

const Modal = ({ isOpen, setIsOpen, header, footer, children }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative motionsite-card rounded-3xl border border-glass-border shadow-2xl max-w-md w-full p-8 z-10">
        {header && <div className="mb-6">{header}</div>}
        <div className="mb-6">{children}</div>
        {footer && <div className="mt-8">{footer}</div>}
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

  if (loading) return <div className="flex justify-center items-center py-40"><Loader2 size={32} className="text-primary animate-spin" /></div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <span className="font-body text-xs text-primary font-bold tracking-[0.2em] block mb-2 uppercase">YOUR STAYS</span>
        <h1 className="font-display text-3xl md:text-4xl text-on-background">My Bookings</h1>
        <p className="text-on-surface-variant font-body text-sm opacity-80 mt-2">Manage your past and upcoming stays securely.</p>
      </div>

      {/* Filters box */}
      <div className="motionsite-card border border-glass-border rounded-3xl p-6 mb-12 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={18} className="text-primary" />
          <h3 className="font-display font-semibold text-on-background">Filter Bookings</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-body text-xs tracking-wider uppercase font-semibold">
          <div>
            <label className="block text-on-surface-variant mb-2 opacity-75">Location</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/60" />
              <input
                type="text"
                placeholder="Where to?"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-on-surface-variant mb-2 opacity-75">Min Price</label>
            <input
              type="number"
              placeholder="₹ Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-on-surface-variant mb-2 opacity-75">Max Price</label>
            <input
              type="number"
              placeholder="₹ Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-on-surface-variant mb-2 opacity-75">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="newest">Latest Bookings</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-glass-border/30 text-xs font-body tracking-wider uppercase font-semibold">
          <p className="text-on-surface-variant opacity-80">
             Found <strong className="text-on-background">{filteredBookings.length}</strong> bookings
          </p>
          <button onClick={clearFilters} className="text-primary hover:underline transition-colors">
            Reset Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-error/15 border border-error/25 rounded-2xl text-error flex items-center gap-3 text-sm font-semibold font-body">
          <AlertCircle size={18} />
          <p>{error}</p>
        </div>
      )}

      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="motionsite-card rounded-3xl border border-glass-border overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden z-0">
                 <img 
                   src={booking.flat?.images || "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80"} 
                   alt={booking.flat?.name} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
                 <div className="absolute top-4 right-4 shadow-md backdrop-blur-md bg-background/90 border border-glass-border px-3.5 py-1.5 rounded-full text-[9px] font-bold text-on-background uppercase tracking-widest">
                   {booking.paymentStatus === 'paid' ? <span className="text-success">Paid</span> : <span className="text-secondary">Pending</span>}
                 </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <Link to={booking.flat?._id ? `/flat/${booking.flat._id}` : "#"} className="hover:text-primary transition-colors duration-300">
                  <h2 className="font-display text-lg font-bold text-on-background mb-2 truncate">{booking.flat?.name || "Booked Property"}</h2>
                </Link>
                
                <div className="flex items-center text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-6 opacity-80">
                  <MapPin size={12} className="mr-1 text-primary" />
                  {booking.flat?.location}, India
                </div>

                <div className="bg-surface-container/60 rounded-2xl border border-glass-border/30 p-4 mb-6 space-y-2.5 font-body text-xs tracking-wider uppercase font-semibold">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant opacity-80 flex items-center gap-1.5"><Calendar size={12} /> Duration</span>
                    <span className="font-bold text-on-background">{booking.timePeriod} mo</span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-glass-border/20">
                    <span className="text-on-surface-variant opacity-80">Total Price</span>
                    <span className="font-bold text-primary">₹{booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  {booking.paymentStatus === 'paid' ? (
                    <Button
                      name={
                        <div className="flex items-center gap-1.5">
                          <MessageSquare size={14} /> Write Review
                        </div>
                      }
                      variant="secondary"
                      onClick={() => handleReviewClick(booking)}
                      fullWidth
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => handleDeleteClick(booking._id)}
                        className="w-12 h-10 flex items-center justify-center text-on-surface-variant hover:text-error motionsite-card rounded-2xl border border-glass-border hover:bg-error/5 hover:border-error/30 transition-all duration-300 active:scale-[0.98]"
                        title="Cancel Booking"
                      >
                        <Trash2 size={16} />
                      </button>
                      <Link to={`/checkout/${booking._id}`} className="flex-1">
                        <Button 
                          name={
                            <div className="flex items-center gap-1.5">
                              <CreditCard size={14} /> Pay Now
                            </div>
                          }
                          fullWidth
                        />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 motionsite-card border border-glass-border rounded-3xl">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 border border-glass-border">
            <Calendar size={28} className="text-primary" />
          </div>
          <h3 className="font-display text-xl font-bold text-on-background mb-3">No bookings found</h3>
          <p className="text-on-surface-variant font-body text-sm mb-8 max-w-sm mx-auto opacity-75">
            {bookings.length === 0 ? "You haven't made any bookings yet." : "No bookings match your current filter criteria."}
          </p>
          <Button name="Explore Properties" onClick={() => window.location.href='/'} css="mx-auto" />
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        header={<h2 className="font-display text-xl font-bold text-on-background">Cancel Booking</h2>}
        footer={
          <div className="flex justify-end gap-3">
            <Button name="Keep It" variant="secondary" onClick={() => setIsModalOpen(false)} />
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-5 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider bg-error text-white hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Confirm Cancel
            </button>
          </div>
        }
      >
        <p className="text-on-surface-variant font-body text-sm leading-relaxed opacity-90">Are you sure you want to cancel this booking? This action cannot be undone.</p>
      </Modal>

      {/* Write Review Modal */}
      <Modal
        isOpen={isReviewOpen}
        setIsOpen={setIsReviewOpen}
        header={<h2 className="font-display text-xl font-bold text-on-background">Rate your stay</h2>}
        footer={
           <div className="flex justify-end gap-3">
            <Button name="Cancel" variant="secondary" onClick={() => setIsReviewOpen(false)} />
            <button
              onClick={submitReview}
              disabled={isSubmittingReview || !reviewData.text.trim()}
              className="px-5 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider bg-primary text-on-primary hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              {isSubmittingReview ? <Loader2 size={14} className="animate-spin" /> : <MessageSquare size={14} />}
              Submit Review
            </button>
          </div>
        }
      >
        <div className="space-y-6">
           <div className="flex justify-center gap-2">
             {[1,2,3,4,5].map(s => (
                <Star 
                  key={s} 
                  size={32} 
                  className={`cursor-pointer transition-all duration-300 ${s <= reviewData.rating ? 'text-primary fill-primary hover:scale-110' : 'text-on-surface-variant/30 hover:text-primary'}`}
                  onClick={() => setReviewData({...reviewData, rating: s})} 
                />
             ))}
           </div>
           
           <div className="space-y-2">
             <label className="block text-xs font-bold text-on-surface-variant tracking-wider uppercase opacity-75">Share your experience</label>
             <textarea 
               rows={4}
               value={reviewData.text}
               onChange={(e) => setReviewData({...reviewData, text: e.target.value})}
               placeholder="What did you like about this sanctuary?"
               className="w-full bg-surface border border-glass-border rounded-2xl focus:ring-1 focus:ring-primary outline-none p-4 text-on-background font-body text-sm resize-none"
             />
           </div>
        </div>
      </Modal>

    </div>
  )
}

export default BookingPage
