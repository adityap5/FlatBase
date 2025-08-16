"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_FLAT, CREATE_BOOKING } from "../graphql/queries"
import {
  Users,
  MapPin,
  User,
  Calendar,
  Plus,
  Minus,
  Loader2,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Waves,
  Shield,
  Coffee,
  Bath,
  Bed,
  Home,
  Star,
} from "lucide-react"
import Button from "../components/Button"

const FlatDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [month, setMonth] = useState(1)
  const [isBooking, setIsBooking] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  // GraphQL hooks
  const { data, loading, error } = useQuery(GET_FLAT, {
    variables: { id },
  })

  const [createBookingMutation] = useMutation(CREATE_BOOKING, {
    onCompleted: (data) => {
      navigate(`/checkout/${data.createBooking._id}`)
    },
    onError: (error) => {
      setErrorMsg(error.message || "Failed to create booking.")
      setIsBooking(false)
    },
  })

  const flat = data?.flat

  const handleBooking = async () => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const userId = localStorage.getItem("userId") 

    if (!token) {
      navigate("/login")
      return
    }

    if (role !== "customer") {
      setErrorMsg("Only customers can book flats.")
      return
    }

    if (!userId) {
      setErrorMsg("User information not found. Please login again.")
      navigate("/login")
      return
    }

    try {
      setIsBooking(true)
      setErrorMsg(null)

      await createBookingMutation({
        variables: {
          flat: id,
          user: userId,
          timePeriod: month.toString(),
          totalPrice: (flat.price || 0) * month,
        },
      })
    } catch (err) {
      console.error("Error creating booking:", err)
      setErrorMsg(err.message || "Failed to create booking.")
      setIsBooking(false)
    }
  }

  const increaseMonth = () => setMonth((prev) => prev + 1)
  const decreaseMonth = () => setMonth((prev) => (prev > 1 ? prev - 1 : 1))

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
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
        <p className="text-red-500">{error.message}</p>
        <Button name="Go Back" onClick={() => navigate(-1)} css="mt-4" />
      </div>
    )
  }

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
    { icon: Star, name: "Premium Location", available: true },
  ]

  return (
    <div className="w-full min-h-screen">
      {flat && (
        <div className="bg-gradient-to-br mt-4 from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full p-6 lg:p-10 flex items-center"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-sm w-full">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-[260px] lg:h-[80vh] object-cover"
                    src={flat.images || "/placeholder.svg"}
                    alt={flat.name}
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ₹{(flat.price || 0).toLocaleString()}/month
                  </div>

                  {/* Optional: Add overlay with quick details */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{flat.name || `Beautiful Flat in ${flat.location}`}</h3>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{flat.location}, India</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-1/2 lg:overflow-y-auto lg:max-h-screen scrollbar-hide"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* Internet Explorer 10+ */,
              }}
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="p-6 lg:p-10 space-y-6">
                <div className="flex items-center mb-3">
                  <MapPin size={20} className="text-emerald-600 mr-2" />
                  <p className="text-gray-600 font-medium">{flat.location}, India</p>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {flat.name || `Beautiful Flat in ${flat.location}`}
                </h1>

                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">Property Details</h4>
                  <p className="text-gray-700 mb-4 leading-relaxed">{flat.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center bg-emerald-50 p-3 rounded-lg">
                      <Users size={20} className="text-emerald-600 mr-3" />
                      <p className="text-gray-700 font-medium">Capacity: {flat.capacity} guests</p>
                    </div>
                    <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <User size={20} className="text-blue-600 mr-3" />
                      <p className="text-gray-700 font-medium">Host: {flat.seller?.name || "Property Owner"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
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
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-50 text-gray-400 border border-gray-200"
                        }`}
                      >
                        <amenity.icon size={16} className="mr-2" />
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Book Flat for:</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <motion.button
                        onClick={decreaseMonth}
                        disabled={isBooking}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-full shadow-lg disabled:opacity-50 hover:shadow-xl transition-shadow"
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
                        onClick={increaseMonth}
                        disabled={isBooking}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-full shadow-lg disabled:opacity-50 hover:shadow-xl transition-shadow"
                      >
                        <Plus size={18} />
                      </motion.button>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ₹{((flat.price || 0) * month).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">Location & Neighborhood</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <MapPin size={16} className="text-emerald-600 mr-2" />
                      <span>Prime location in {flat.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Home size={16} className="text-blue-600 mr-2" />
                      <span>Close to shopping centers and transportation</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Shield size={16} className="text-purple-600 mr-2" />
                      <span>Safe and secure neighborhood</span>
                    </div>
                  </div>
                </div>

                {/* Host Information */}
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">About Your Host</h4>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {(flat.seller?.name || "H")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{flat.seller?.name || "Property Host"}</p>
                      <p className="text-gray-600 text-sm">Experienced host with great reviews</p>
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl shadow-md"
                  >
                    <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                  </motion.div>
                )}

                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/30">
                  <motion.button
                    onClick={handleBooking}
                    disabled={isBooking}
                    whileHover={!isBooking ? { scale: 1.02 } : {}}
                    whileTap={!isBooking ? { scale: 0.98 } : {}}
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl disabled:opacity-50 transition-all duration-200"
                  >
                    {isBooking ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <Loader2 size={20} />
                        </motion.div>
                        Creating Booking...
                      </div>
                    ) : (
                      "Add This Flat to My Bookings"
                    )}
                  </motion.button>

                  {!isBooking && (
                    <p className="text-center text-gray-500 text-sm mt-2">
                      You&apos;ll be redirected to checkout after booking
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlatDetailPage
