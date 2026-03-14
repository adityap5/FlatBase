import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_FLAT, CREATE_BOOKING } from "../graphql/queries"
import { getFlatReviews } from "../graphql/queries"
import {
  Users,
  MapPin,
  User,
  Calendar,
  Loader2,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Waves,
  ShieldCheck,
  Dumbbell,
  Home,
  Star,
  MessageSquare
} from "lucide-react"
import MonthCalendar from "../components/MonthCalendar"

const FlatDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [startMonth, setStartMonth] = useState("")
  const [endMonth, setEndMonth] = useState("")
  const [monthsCount, setMonthsCount] = useState(0)
  const [isBooking, setIsBooking] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(true)

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

  useEffect(() => {
    // Calculate months difference when dates change
    if (startMonth && endMonth) {
      const start = new Date(startMonth)
      const end = new Date(endMonth)
      if (end >= start) {
        const diff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1
        setMonthsCount(diff)
        setErrorMsg(null)
      } else {
        setMonthsCount(0)
        setErrorMsg("End month must be after start month.")
      }
    }
  }, [startMonth, endMonth])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getFlatReviews(id)
        setReviews(res.data.flatReviews)
      } catch (err) {
        console.error("Failed to fetch reviews", err)
      } finally {
        setLoadingReviews(false)
      }
    }
    if (id) fetchReviews()
  }, [id])

  // Get current YYYY-MM for min attribute
  const today = new Date()
  const currentMonthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`

  const checkAvailability = () => {
    if (!startMonth || !endMonth || monthsCount <= 0) return false
    
    // Check if any month in range is in blockedMonths
    const blocked = flat?.blockedMonths || []
    const start = new Date(startMonth)
    const end = new Date(endMonth)
    let current = new Date(start.getFullYear(), start.getMonth(), 1)
    
    while (current <= end) {
      const monthStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`
      if (blocked.includes(monthStr)) {
        return false // Conflict
      }
      current.setMonth(current.getMonth() + 1)
    }
    return true
  }

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

    if (!startMonth || !endMonth || monthsCount <= 0) {
      setErrorMsg("Please select valid start and end months.")
      return
    }

    if (!checkAvailability()) {
      setErrorMsg("Selected dates are partially or fully booked. Please check calendar.")
      return
    }

    try {
      setIsBooking(true)
      setErrorMsg(null)

      await createBookingMutation({
        variables: {
          flat: id,
          user: userId,
          timePeriod: monthsCount.toString(),
          totalPrice: (flat.price || 0) * monthsCount,
          startDate: startMonth,
          endDate: endMonth
        },
      })
    } catch (err) {
      console.error("Error creating booking:", err)
      setErrorMsg(err.message || "Failed to create booking.")
      setIsBooking(false)
    }
  }

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
      </div>
    )
  }

  const ICON_MAP = {
    "WiFi": Wifi,
    "Parking": Car,
    "Kitchen": Utensils,
    "TV": Tv,
    "AC": Wind,
    "Pool": Waves,
    "Security": ShieldCheck,
    "Gym": Dumbbell
  }

  return (
    <div className="w-full min-h-screen pb-20">
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
                    className="w-full h-[300px] lg:h-[80vh] object-cover"
                    src={flat.images || "/placeholder.svg"}
                    alt={flat.name}
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#76ABAE] to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ₹{(flat.price || 0).toLocaleString()}/month
                  </div>
                  {flat.bookingCount >= 3 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Popular ({flat.bookingCount} booked)
                    </div>
                  )}

                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white pt-20">
                    <h3 className="text-2xl font-bold mb-2">{flat.name || `Beautiful Flat in ${flat.location}`}</h3>
                    <div className="flex items-center text-white/90">
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
            >
              <div className="p-6 lg:p-10 space-y-8">
                <div>
                   <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800">
                    {flat.name || `Beautiful Flat in ${flat.location}`}
                   </h1>
                   <div className="flex items-center text-gray-500 gap-4 mb-6">
                      <div className="flex items-center">
                        <MapPin size={18} className="text-[#76ABAE] mr-1" /> {flat.location}
                      </div>
                      <div className="flex items-center">
                        <Users size={18} className="text-[#76ABAE] mr-1" /> up to {flat.capacity} guests
                      </div>
                   </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white">
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">About this space</h4>
                   <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{flat.description}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white">
                   <h4 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Amenities</h4>
                   {flat.amenities && flat.amenities.length > 0 ? (
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {flat.amenities.map(item => {
                         const Icon = ICON_MAP[item] || Home
                         return (
                           <div key={item} className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100">
                             <Icon size={18} className="text-[#76ABAE] mr-3" />
                             <span className="font-medium text-sm">{item}</span>
                           </div>
                         )
                       })}
                     </div>
                   ) : (
                     <p className="text-gray-500 italic">No amenities listed by host.</p>
                   )}
                </div>

                {localStorage.getItem('role') === 'seller' ? (
                  <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100 text-center">
                    <h2 className="text-xl font-semibold mb-2 text-red-800">Booking Restricted</h2>
                    <p className="text-red-600">Sellers cannot book properties. Only users can book flights and stays.</p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm border border-purple-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                      <Calendar className="text-purple-600" /> Select Booking Dates
                    </h2>
                    
                    <div className="mb-4">
                       <MonthCalendar 
                          blockedMonths={flat.blockedMonths || []}
                          onDateSelect={({ start, end }) => {
                             setStartMonth(start);
                             setEndMonth(end);
                          }}
                       />
                    </div>

                    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mt-6">
                      <div>
                         <p className="text-gray-500 text-sm">Duration</p>
                         <p className="text-xl font-bold text-gray-800">{monthsCount} months</p>
                      </div>
                      <div className="text-right">
                         <p className="text-gray-500 text-sm">Total Price</p>
                         <p className="text-2xl font-bold text-[#76ABAE]">₹{((flat.price || 0) * (monthsCount > 0 ? monthsCount : 0)).toLocaleString()}</p>
                      </div>
                    </div>

                    {errorMsg && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                        {errorMsg}
                      </motion.div>
                    )}

                    <button
                      onClick={handleBooking}
                      disabled={isBooking || monthsCount <= 0}
                      className="mt-6 w-full bg-[#76ABAE] hover:bg-[#5a878a] text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 transition-all flex justify-center items-center"
                    >
                      {isBooking ? <Loader2 className="animate-spin mr-2" /> : null}
                      {isBooking ? "Reserving..." : "Book Now"}
                    </button>
                  </div>
                )}

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white">
                   <h4 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">About Your Host</h4>
                   <div className="flex items-center">
                     <div className="w-14 h-14 bg-gradient-to-r from-teal-400 to-[#76ABAE] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-inner">
                       {(flat.seller?.name || "H")[0].toUpperCase()}
                     </div>
                     <div>
                       <p className="font-bold text-lg text-gray-800">{flat.seller?.name || "Property Host"}</p>
                       <p className="text-gray-500">{flat.seller?.email}</p>
                       {flat.seller?.bio && <p className="text-gray-600 mt-2 italic text-sm border-l-2 border-[#76ABAE] pl-3">{flat.seller.bio}</p>}
                     </div>
                   </div>
                </div>
                
                {/* Reviews Section */}
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white">
                  <h4 className="text-xl font-semibold mb-6 flex items-center text-gray-800 border-b pb-2">
                    <MessageSquare className="mr-2 text-[#76ABAE]" /> Guest Reviews
                  </h4>
                  
                  {loadingReviews ? (
                    <div className="flex justify-center p-4"><Loader2 className="animate-spin text-gray-400" /></div>
                  ) : reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review._id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                             <div>
                               <p className="font-semibold text-gray-800">{review.user?.name || "Guest"}</p>
                               <p className="text-xs text-gray-400">{new Date(Number(review.createdAt)).toLocaleDateString()}</p>
                             </div>
                             <div className="flex">
                               {[1,2,3,4,5].map(star => (
                                 <Star key={star} size={14} className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                               ))}
                             </div>
                          </div>
                          <p className="text-gray-600 text-sm">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Star size={40} className="mx-auto text-gray-300 mb-2 opacity-50" />
                      <p>No reviews yet. Be the first to review after booking!</p>
                    </div>
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
