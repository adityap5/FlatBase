"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { getFlat, createBooking } from "../api"
import { Users, MapPin, User, Calendar, Plus, Minus, Loader2 } from "lucide-react"
import Button from "../components/Button"

const FlatDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [flat, setFlat] = useState(null)
  const [month, setMonth] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isBooking, setIsBooking] = useState(false)

  const handleBooking = async () => {
    console.log("🔥 BOOK NOW BUTTON CLICKED!")
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

  // Debug button click
  const debugButtonClick = () => {
    console.log("🐛 DEBUG: Button component clicked")
    handleBooking()
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

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">{error}</p>
        <Button name="Go Back" onClick={() => navigate(-1)} css="mt-4" />
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      {flat && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 p-6 lg:p-10"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  className="w-full h-[300px] lg:h-[400px] object-cover"
                  src={flat.images || "/placeholder.svg"}
                  alt={flat.name}
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold">
                  ₹{flat.price}/month
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 p-6 lg:p-10"
            >
              <div className="flex items-center mb-2">
                <MapPin size={18} className="text-[#76ABAE] mr-2" />
                <p className="text-gray-600">{flat.location}, India</p>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {flat.name || `Beautiful Flat in ${flat.location}`}
              </h1>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-medium mb-2">Details</h4>
                <p className="text-gray-700 mb-4">{flat.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Users size={18} className="text-[#76ABAE] mr-2" />
                    <p className="text-gray-700">Capacity: {flat.capacity} guests</p>
                  </div>
                  <div className="flex items-center">
                    <User size={18} className="text-[#76ABAE] mr-2" />
                    <p className="text-gray-700">Host: {
                      typeof flat.seller === 'object' && flat.seller?.name 
                        ? flat.seller.name 
                        : 'Property Owner'
                    }</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-medium mb-4">Book Flat for:</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={decreaseMonth}
                      className="bg-[#76ABAE] text-white p-2 rounded-full"
                    >
                      <Minus size={16} />
                    </motion.button>

                    <div className="flex items-center mx-4">
                      <Calendar size={18} className="text-[#76ABAE] mr-2" />
                      <span className="text-xl font-medium">
                        {month} month{month > 1 && "s"}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={increaseMonth}
                      className="bg-[#76ABAE] text-white p-2 rounded-full"
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>

                  <div className="text-xl font-bold">₹{flat.price * month}</div>
                </div>
              </div>

              {/* Debug Info */}
              {/* <div className="bg-yellow-50 p-4 rounded-lg mb-4 text-sm">
                <h3 className="font-bold mb-2">🐛 DEBUG INFO:</h3>
                <p>Token: {localStorage.getItem("token") ? "✅ Present" : "❌ Missing"}</p>
                <p>Role: {localStorage.getItem("role") || "❌ Not set"}</p>
                <p>Flat ID: {id}</p>
                <p>Month: {month}</p>
                <p>Total Price: ₹{flat.price * month}</p>
                <p>Is Booking: {isBooking ? "Yes" : "No"}</p>
              </div> */}

              {/* Original Button */}
              <button
                onClick={handleBooking}
                disabled={isBooking}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold"
              >
                {isBooking ? "Adding..." : "Add to My Bookings"}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium">Error:</p>
                  <p className="text-red-500">{error}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlatDetailPage