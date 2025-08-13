"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { getFlat, createBooking } from "../api"
import { Users, MapPin, User, Calendar, Plus, Minus, Loader2, Wifi, Car, Utensils, Tv, Wind, Waves, Shield, Coffee, Bath, Bed, Home, Star } from 'lucide-react'
import Button from "../components/Button"

const FlatDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [flat, setFlat] = useState(null)
  const [month, setMonth] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isBooking, setIsBooking] = useState(false)

  // ... existing code ...

  const handleBooking = async () => {
    console.log("Token:", localStorage.getItem("token"))
    console.log("Role:", localStorage.getItem("role"))
    console.log("Flat ID:", id)
    console.log("Month:", month)
    console.log("Flat data:", flat)

    if (!localStorage.getItem("token")) {
      console.log("❌ No token found, redirecting to login")
      navigate("/login")
      return
    }

    if (localStorage.getItem("role") !== "customer") {
      console.log("❌ User is not a customer, redirecting to home")
      navigate("/")
      return
    }

    try {
      setIsBooking(true)
      setError(null)
      
      const bookingData = {
        flat: id,
        timePeriod: month,
        totalPrice: flat.price * month,
      }

      console.log("📤 Sending booking data:", bookingData)

      const response = await createBooking(bookingData)
      
      console.log("📥 Booking response:", response)
      console.log("📥 Response status:", response.status)
      console.log("📥 Response data:", response.data)

      if (response.status === 201 || response.status === 200) {
        console.log("✅ Booking successful, navigating to bookings page")
        navigate("/bookings")
      } else {
        console.log("❌ Unexpected response status:", response.status)
        setError("Failed to create booking. Please try again.")
      }
    } catch (err) {
      console.error("💥 Error creating booking:", err)
      console.error("💥 Error response:", err.response)
      console.error("💥 Error message:", err.message)
      
      if (err.response) {
        console.error("💥 Error response data:", err.response.data)
        console.error("💥 Error response status:", err.response.status)
        setError(err.response.data?.message || "Server error occurred")
      } else if (err.request) {
        console.error("💥 No response received:", err.request)
        setError("Network error. Please check your connection.")
      } else {
        console.error("💥 Request setup error:", err.message)
        setError("An unexpected error occurred.")
      }
    } finally {
      setIsBooking(false)
    }
  }

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        console.log("🏠 Fetching flat with ID:", id)
        const { data } = await getFlat(id)
        console.log("🏠 Flat data received:", data)
        setFlat(data)
      } catch (err) {
        console.error("💥 Error fetching flat:", err)
        setError("Failed to load flat details")
      } finally {
        setLoading(false)
      }
    }

    fetchFlat()
  }, [id])

  const increaseMonth = () => {
    console.log("➕ Increasing month from", month, "to", month + 1)
    setMonth(month + 1)
  }

  const decreaseMonth = () => {
    console.log("➖ Decreasing month from", month, "to", month > 1 ? month - 1 : 1)
    setMonth(month > 1 ? month - 1 : 1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        {/* <CHANGE> Changed animation from rotation to pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Loader2 size={32} className="text-[#76ABAE]" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">{error}</p>
        <Button name="Go Back" onClick={() => navigate(-1)} css="mt-4" />
      </div>
    )
  }

  // <CHANGE> Added comprehensive amenities list
  const amenities = [
    { icon: Wifi, name: "Free WiFi", available: true },
    { icon: Car, name: "Parking", available: true },
    { icon: Utensils, name: "Kitchen", available: true },
    { icon: Tv, name: "Smart TV", available: true },
    { icon: Wind, name: "Air Conditioning", available: true },
    { icon: Waves, name: "Swimming Pool", available: false },
    { icon: Shield, name: "Security", available: true },
    { icon: Coffee, name: "Coffee Machine", available: true },
    { icon: Bath, name: "Private Bathroom", available: true },
    { icon: Bed, name: "Queen Bed", available: true },
    { icon: Home, name: "Balcony", available: true },
    { icon: Star, name: "Premium Location", available: true }
  ]

  return (
    <div className="w-full py-8">
      {flat && (
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            {/* <CHANGE> Enhanced image section with slide-in animation instead of rotation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 p-6 lg:p-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-[300px] lg:h-[400px] object-cover"
                  src={flat.images || "/placeholder.svg"}
                  alt={flat.name}
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ₹{flat.price}/month
                </div>
              </div>
            </motion.div>

            {/* <CHANGE> Enhanced details section with fade-up animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-1/2 p-6 lg:p-10"
            >
              <div className="flex items-center mb-3">
                <MapPin size={20} className="text-emerald-600 mr-2" />
                <p className="text-gray-600 font-medium">{flat.location}, India</p>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {flat.name || `Beautiful Flat in ${flat.location}`}
              </h1>

              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl mb-6 border border-white/30 shadow-lg">
                <h4 className="text-xl font-semibold mb-3 text-gray-800">Property Details</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">{flat.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center bg-emerald-50 p-3 rounded-lg">
                    <Users size={20} className="text-emerald-600 mr-3" />
                    <p className="text-gray-700 font-medium">Capacity: {flat.capacity} guests</p>
                  </div>
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                    <User size={20} className="text-blue-600 mr-3" />
                    <p className="text-gray-700 font-medium">Host: {
                      typeof flat.seller === 'object' && flat.seller?.name 
                        ? flat.seller.name 
                        : 'Property Owner'
                    }</p>
                  </div>
                </div>
              </div>

              {/* <CHANGE> Added comprehensive amenities section */}
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl mb-6 border border-white/30 shadow-lg">
                <h4 className="text-xl font-semibold mb-4 text-gray-800">Amenities & Features</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity, index) => (
                    <motion.div
                      key={amenity.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                        amenity.available 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-gray-50 text-gray-400 border border-gray-200'
                      }`}
                    >
                      <amenity.icon size={16} className="mr-2" />
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl mb-6 border border-white/30 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Book Flat for:</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={decreaseMonth}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Minus size={18} />
                    </motion.button>

                    <div className="flex items-center mx-6 bg-white/80 px-4 py-2 rounded-full shadow-md">
                      <Calendar size={20} className="text-emerald-600 mr-2" />
                      <span className="text-xl font-bold text-gray-800">
                        {month} month{month > 1 && "s"}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={increaseMonth}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>

                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    ₹{flat.price * month}
                  </div>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl shadow-md"
                >
                  <p className="text-red-600 font-medium">Error:</p>
                  <p className="text-red-500">{error}</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* <CHANGE> Moved booking button to bottom center as a sticky floating button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="sticky bottom-0 p-6 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-md border-t border-white/30"
          >
            <div className="max-w-md mx-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                disabled={isBooking}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 hover:from-emerald-600 hover:via-teal-700 hover:to-blue-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="mr-2"
                    >
                      <Loader2 size={20} />
                    </motion.div>
                    Adding to Bookings...
                  </div>
                ) : (
                  "Add to My Bookings"
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default FlatDetailPage
