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
    if (!localStorage.getItem("token")) {
      navigate("/login")
      return
    } else if (localStorage.getItem("role") === "customer") {
      try {
        setIsBooking(true)
        const bookingData = {
          flat: id,
          timePeriod: month,
          totalPrice: flat.price * month,
        }

        const response = await createBooking(bookingData)

        if (response.status === 201 || response.status === 200) {
          navigate("/bookings")
        } else {
          setError("Failed to create booking. Please try again.")
        }
      } catch (err) {
        console.error("Error creating booking:", err.response?.data || err.message)
        setError("An error occurred while creating the booking. Please try again.")
      } finally {
        setIsBooking(false)
      }
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const { data } = await getFlat(id)
        setFlat(data)
      } catch (err) {
        setError("Failed to load flat details")
      } finally {
        setLoading(false)
      }
    }

    fetchFlat()
  }, [id])

  const increaseMonth = () => {
    setMonth(month + 1)
  }

  const decreaseMonth = () => {
    setMonth(month > 1 ? month - 1 : 1)
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
                    <p className="text-gray-700">Owner: {flat.seller?.name}</p>
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

              <Button
                name={isBooking ? "Processing..." : "BOOK NOW"}
                fullWidth
                onClick={handleBooking}
                css="py-3 text-lg font-bold"
              />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlatDetailPage
