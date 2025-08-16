"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { getBooking, getFlat } from "../graphql/queries"
import { CreditCard, Shield, Calendar, Home, MapPin, Loader2 } from "lucide-react"
import Button from "../components/Button"

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
          currency: "INR"
        }
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
                bookingId: booking._id
              }
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
          color: "#76ABAE" 
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          }
        }
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
      <div className="flex justify-center items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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

  if (!booking || !flatDetails) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">Booking or flat details not found</p>
        <Button name="Go Back" onClick={() => navigate(-1)} />
      </div>
    )
  }

  const securityDeposit = 999
  const advancePayment = Math.round(booking.totalPrice / booking.timePeriod)
  const totalAmount = booking.totalPrice + securityDeposit + advancePayment

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
                      <div className="flex items-center text-zinc-700 mt-1">
                        <p className="mr-4 font-bold">{flatDetails.name}</p>
                        <MapPin size={14} className="mr-1" />
                        <span>{flatDetails.location}, India</span>
                      </div>
                      <div className="flex items-center gap-8 text-gray-500 mt-1">
                        <span>Host: {flatDetails.seller?.name}</span>
                        <span>Email: {flatDetails.seller?.email}</span>
                      </div>
                      <p className="text-zinc-400 tracking-tighter mt-1">{flatDetails.description}</p>
                    </div>
                  </div>

                  {flatDetails.images && (
                    <img
                      src={flatDetails.images}
                      alt="Flat"
                      className="rounded-lg mt-4 w-full max-h-64 object-cover"
                    />
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    <Calendar size={20} className="text-[#76ABAE]" />
                    <span>{booking.timePeriod} Month{booking.timePeriod > 1 && "s"} Booking</span>
                    <span className="ml-4">Capacity: {flatDetails.capacity}</span>
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
                        Price for {booking.timePeriod} month{booking.timePeriod > 1 ? "s" : ""}
                      </span>
                      <span className="font-medium">₹{booking.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-medium">₹{securityDeposit}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Advance Payment</span>
                      <span className="font-medium">₹{advancePayment}</span>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  name={isProcessing ? "Processing..." : "Pay Now"}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="mt-6 w-full bg-[#76ABAE] hover:bg-[#62989a] text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button onClick={handlePayment}>Pay Now</button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Checkout