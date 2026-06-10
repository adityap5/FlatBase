"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { getBooking } from "../graphql/queries"
import { CreditCard, Shield, MapPin, Loader2, ArrowLeft } from "lucide-react"

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
        const bookingRes = await getBooking(id)
        const bookingData = bookingRes.data.booking
        setBooking(bookingData)

        if (bookingData?.flat) {
          setFlatDetails(bookingData.flat)
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
      const securityDeposit = 999
      const advancePayment = Math.round(booking.totalPrice / parseInt(booking.timePeriod || "1"))
      const totalAmount = booking.totalPrice + securityDeposit + advancePayment

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
            const { data: verifyData } = await verifyPayment({
              variables: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking._id,
              },
            })

            if (verifyData.verifyPayment) {
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
          color: "#00f5ff",
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
      <div className="min-h-[85vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 size={32} className="text-primary animate-spin" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6">
        <div className="text-center motionsite-card p-8 rounded-3xl border border-glass-border">
          <p className="text-error font-body font-bold mb-6">{error}</p>
          <button onClick={() => navigate(-1)} className="text-primary hover:underline font-body font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 mx-auto">
            <ArrowLeft size={14} /> Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!booking || !flatDetails) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6">
        <div className="text-center motionsite-card p-8 rounded-3xl border border-glass-border">
          <p className="text-on-surface-variant font-body mb-6">Booking details not found</p>
          <button onClick={() => navigate(-1)} className="text-primary hover:underline font-body font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 mx-auto">
            <ArrowLeft size={14} /> Go Back
          </button>
        </div>
      </div>
    )
  }

  const securityDeposit = 999
  const advancePayment = Math.round(booking.totalPrice / parseInt(booking.timePeriod || "1"))
  const totalAmount = booking.totalPrice + securityDeposit + advancePayment

  return (
    <div className="w-full min-h-screen pb-20 max-w-5xl mx-auto px-6 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        <div className="text-center pt-8">
          <span className="font-body text-xs text-primary font-bold tracking-[0.2em] block mb-2 uppercase">SECURE CHECKOUT</span>
          <h1 className="font-display text-3xl md:text-4xl text-on-background">Complete Your Booking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-10">
            {/* Property Overview */}
            <div className="motionsite-card p-6 rounded-3xl flex items-start gap-4 border border-glass-border">
              {flatDetails.images && (
                <img
                  src={flatDetails.images || "/placeholder.svg"}
                  alt="Property"
                  className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 border border-glass-border"
                />
              )}
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-lg font-bold text-on-background truncate mb-1">{flatDetails.name || `Beautiful stay in ${flatDetails.location}`}</h2>
                <p className="text-on-surface-variant text-xs font-semibold mb-3 flex items-center opacity-80">
                  <MapPin size={12} className="mr-1 text-primary" />
                  {flatDetails.location}, India
                </p>
                <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2 opacity-75">{flatDetails.description}</p>
              </div>
            </div>

            {/* Booking Summary parameters */}
            <div className="motionsite-card p-6 rounded-3xl border border-glass-border space-y-4 font-body text-sm tracking-wide text-on-surface">
              <div className="flex items-center justify-between py-2 border-b border-glass-border/30">
                <span className="text-on-surface-variant opacity-80">Duration</span>
                <span className="font-bold text-on-background">
                  {booking.timePeriod} month{parseInt(booking.timePeriod) > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-glass-border/30">
                <span className="text-on-surface-variant opacity-80">Guest Capacity</span>
                <span className="font-bold text-on-background">{flatDetails.capacity} guests max</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-on-surface-variant opacity-80">Sanctuary Host</span>
                <span className="font-bold text-on-background capitalize">{flatDetails.seller?.name || "Verified Host"}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-on-background">Payment Method</h3>
              <div className="flex items-center gap-4 p-5 motionsite-card rounded-3xl border border-glass-border">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-body text-sm font-bold text-on-background">Razorpay Portal</p>
                  <p className="text-on-surface-variant text-xs opacity-75">Secure processing (UPI, Cards, NetBanking)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Widget Sticky) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="motionsite-card p-8 rounded-3xl border border-glass-border shadow-2xl sticky top-28 space-y-6"
            >
              <h3 className="font-display text-lg font-bold text-on-background pb-3 border-b border-glass-border">Payment Summary</h3>

              <div className="space-y-4 font-body text-sm tracking-wide text-on-surface">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant opacity-80">
                    Rent ({booking.timePeriod} mo)
                  </span>
                  <span className="font-semibold text-on-background">₹{booking.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant opacity-80">Security Deposit</span>
                  <span className="font-semibold text-on-background">₹{securityDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant opacity-80">Advance Rent</span>
                  <span className="font-semibold text-on-background">₹{advancePayment.toLocaleString()}</span>
                </div>

                <div className="border-t border-glass-border/40 pt-5 mt-4">
                  <div className="flex justify-between items-center text-base font-bold">
                    <span className="text-on-background">Total Amount</span>
                    <span className="text-primary text-glow">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-primary text-on-primary py-4 rounded-2xl font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/15 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex justify-center items-center"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing Securely...</span>
                  </div>
                ) : (
                  "Complete Payment"
                )}
              </button>

              <div className="flex items-start gap-2.5 text-on-surface-variant/70">
                <Shield size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-[11px] font-body leading-relaxed opacity-75">
                  Your transaction is secure. Razorpay compiles with standard PCI-DSS regulations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Checkout
