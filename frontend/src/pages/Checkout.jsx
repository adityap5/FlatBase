"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { getBooking } from "../api"
import { CreditCard, Shield, Calendar, Home, MapPin, Loader2 } from "lucide-react"
import Button from "../components/Button"

function Checkout() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [flat, setFlat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  const loadRazorpay = async () => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
  }

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const { data } = await getBooking(id)
        setFlat(data)
      } catch (err) {
        console.error("Error fetching booking:", err)
        setError("Failed to load booking details")
      } finally {
        setLoading(false)
      }
    }
    loadRazorpay()
    fetchFlat()
  }, [id])

  const handlePayment = async () => {
    if (!flat) return
    setIsProcessing(true)

    const token = localStorage.getItem("token")

    try {
      const { data: order } = await axios.post(
        "https://flatbase.onrender.com/api/bookings/create-order",
        { amount: flat.totalPrice + 999 + Math.round(flat.totalPrice / flat.timePeriod) },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      const options = {
        key: "rzp_test_POjN4Ulq8Q6my8",
        amount: order.amount,
        currency: order.currency,
        name: "Flat Booking",
        description: "Booking Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "https://flatbase.onrender.com/api/bookings/verify-payment",
              {
                ...response,
                bookingId: flat._id,
              },
              { headers: { Authorization: `Bearer ${token}` } },
            )

            if (verifyRes.data.success) {
              navigate("/success")
            } else {
              setError("Payment Verification Failed!")
            }
          } catch (error) {
            console.error("Payment verification failed", error)
            setError("Payment verification failed. Please try again.")
          } finally {
            setIsProcessing(false)
          }
        },
        theme: { color: "#76ABAE" },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Payment failed", error)
      setError("Payment initialization failed. Please try again.")
      setIsProcessing(false)
    }
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
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-6 rounded-lg inline-block">
          <p className="text-red-600 mb-4">{error}</p>
          <Button name="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    )
  }

  if (!flat) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">Booking not found</p>
        <Button name="Go Back" onClick={() => navigate(-1)} />
      </div>
    )
  }

  const securityDeposit = 999
  const advancePayment = Math.round(flat.totalPrice / flat.timePeriod)
  const totalAmount = flat.totalPrice + securityDeposit + advancePayment

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Home size={20} className="text-[#76ABAE] mr-3" />
                    <div>
                      <p className="font-medium">{flat.flat.name || "Booked Property"}</p>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{flat.flat.location}, India</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar size={20} className="text-[#76ABAE] mr-3" />
                    <div>
                      <p className="font-medium">
                        {flat.timePeriod} Month{flat.timePeriod > 1 && "s"} Booking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="flex items-center p-4 border rounded-lg mb-4">
                  <CreditCard size={24} className="text-[#76ABAE] mr-3" />
                  <div>
                    <p className="font-medium">Razorpay</p>
                    <p className="text-gray-500 text-sm">Secure online payment</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                  <Shield size={20} className="text-blue-500 mr-3 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your payment information is processed securely. We do not store credit card details nor have access
                    to your credit card information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md sticky top-6"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                <div className="space-y-4 divide-y">
                  <div className="pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">
                        Price for {flat.timePeriod} month{flat.timePeriod > 1 ? "s" : ""}
                      </span>
                      <span className="font-medium">₹{flat.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-medium">₹{securityDeposit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Advance Payment</span>
                      <span className="font-medium">₹{advancePayment.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <span className="text-lg font-bold">Total Amount</span>
                        <p className="text-xs text-gray-500">(Total Price + Advance + Security Deposit)</p>
                      </div>
                      <span className="text-xl font-bold text-[#76ABAE]">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    name={
                      isProcessing ? (
                        <div className="flex items-center justify-center">
                          <Loader2 size={20} className="animate-spin mr-2" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <CreditCard size={18} className="mr-2" />
                          <span>Proceed to Pay</span>
                        </div>
                      )
                    }
                    onClick={handlePayment}
                    fullWidth
                    css="py-3 text-lg font-medium"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Checkout
