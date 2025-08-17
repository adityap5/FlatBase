"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { getBooking, getFlat } from "../graphql/queries"
import { CreditCard, Shield, MapPin, Loader2 } from "lucide-react"

// GraphQL Mutations for Razorpay
const CREATE_ORDER = gql`
  mutation CreateOrder($amount: Float!, $currency: String) {
    createOrder(amount: $amount, currency: $currency) {
      id
      amount
      currency
      receipt
    }
  }
`

const VERIFY_PAYMENT = gql`
  mutation VerifyPayment(
    $razorpay_order_id: String!
    $razorpay_payment_id: String!
    $razorpay_signature: String!
    $bookingId: ID!
  ) {
    verifyPayment(
      razorpay_order_id: $razorpay_order_id
      razorpay_payment_id: $razorpay_payment_id
      razorpay_signature: $razorpay_signature
      bookingId: $bookingId
    )
  }
`

function Checkout() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  const [flatDetails, setFlatDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  // GraphQL mutations
  const [createOrder] = useMutation(CREATE_ORDER)
  const [verifyPayment] = useMutation(VERIFY_PAYMENT)

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch booking by ID using GraphQL
        const bookingRes = await getBooking(id)
        const bookingData = bookingRes.data.booking
        setBooking(bookingData)

        // Fetch flat details using booking.flat._id
        if (bookingData?.flat?._id) {
          const flatRes = await getFlat(bookingData.flat._id)
          setFlatDetails(flatRes.data.flat)
        }
      } catch (err) {
        console.error("Error fetching booking or flat:", err)
        setError("Failed to load booking details")
      } finally {
        setLoading(false)
      }
    }

    loadRazorpay()
    fetchData()
  }, [id])

  const handlePayment = async () => {
    if (!booking) return
    setIsProcessing(true)

    const razorpayLoaded = await loadRazorpay()
    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load. Are you online?")
      setIsProcessing(false)
      return
    }

    try {
      // Calculate total amount
      const securityDeposit = 999
      const advancePayment = Math.round(booking.totalPrice / booking.timePeriod)
      const totalAmount = booking.totalPrice + securityDeposit + advancePayment

      // Create order using GraphQL
      const { data: orderData } = await createOrder({
        variables: {
          amount: totalAmount,
          currency: "INR",
        },
      })

      const order = orderData.createOrder

      const options = {
        key: "rzp_test_POjN4Ulq8Q6my8",
        amount: order.amount,
        currency: order.currency,
        name: "Flat Booking",
        description: "Booking Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment using GraphQL
            const { data: verifyData } = await verifyPayment({
              variables: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking._id,
              },
            })

            if (verifyData.verifyPayment) {
              // Payment successful, navigate to success page
              navigate("/success")
            } else {
              setError("Payment verification failed!")
            }
          } catch (err) {
            console.error("Payment verification failed", err)
            setError("Payment verification failed. Please try again.")
          } finally {
            setIsProcessing(false)
          }
        },
        prefill: {
          name: booking.user?.name || "",
          email: booking.user?.email || "",
        },
        theme: {
          color: "#76ABAE",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (err) {
      console.error("Payment failed", err)
      setError("Payment initialization failed. Please try again.")
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 size={24} className="text-[#76ABAE]" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => navigate(-1)} className="text-[#76ABAE] hover:text-[#62989a] font-medium">
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!booking || !flatDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-6">Booking details not found</p>
          <button onClick={() => navigate(-1)} className="text-[#76ABAE] hover:text-[#62989a] font-medium">
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  const securityDeposit = 999
  const advancePayment = Math.round(booking.totalPrice / booking.timePeriod)
  const totalAmount = booking.totalPrice + securityDeposit + advancePayment

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <h1 className="text-2xl font-light text-gray-900 mb-2">Complete Your Booking</h1>
            <div className="w-12 h-0.5 bg-[#76ABAE] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              {/* Property Overview */}
              <div className="mb-10">
                <div className="flex items-start space-x-4">
                  {flatDetails.images && (
                    <img
                      src={flatDetails.images || "/placeholder.svg"}
                      alt="Property"
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-900 mb-1">{flatDetails.name}</h2>
                    <p className="text-gray-500 text-sm mb-2 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {flatDetails.location}, India
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">{flatDetails.description}</p>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {booking.timePeriod} month{booking.timePeriod > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium">{flatDetails.capacity} guests</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Host</span>
                  <span className="font-medium capitalize">{flatDetails.seller?.name}</span>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Method</h3>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                  <CreditCard size={20} className="text-[#76ABAE]" />
                  <div>
                    <p className="font-medium text-gray-900">Razorpay</p>
                    <p className="text-gray-500 text-sm">Secure payment processing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-xl p-8 sticky top-8"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-8">Summary</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Rent ({booking.timePeriod} month{booking.timePeriod > 1 ? "s" : ""})
                    </span>
                    <span className="font-medium">₹{booking.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Security deposit</span>
                    <span className="font-medium">₹{securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Advance payment</span>
                    <span className="font-medium">₹{advancePayment.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-[#76ABAE] hover:bg-[#62989a] text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Complete Payment"
                  )}
                </button>

                <div className="mt-6 flex items-start space-x-2">
                  <Shield size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout
