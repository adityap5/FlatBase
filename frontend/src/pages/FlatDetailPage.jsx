import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_FLAT, CREATE_BOOKING } from "../services/queries"
import { getFlatReviews } from "../services/queries"
import {
  Users,
  MapPin,
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
  MessageSquare,
  ShieldAlert
} from "lucide-react"
import MonthCalendar from "../components/shared/MonthCalendar"

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
    if (flat) {
      document.title = `${flat.name || `Rooms in ${flat.location}`} | FlatBase`
    }
    return () => {
      document.title = "FlatBase | Premium Luxury Rentals"
    }
  }, [flat])

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

  const checkAvailability = () => {
    if (!startMonth || !endMonth || monthsCount <= 0) return false

    const blocked = flat?.blockedMonths || []
    const start = new Date(startMonth)
    const end = new Date(endMonth)
    let current = new Date(start.getFullYear(), start.getMonth(), 1)

    while (current <= end) {
      const monthStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`
      if (blocked.includes(monthStr)) {
        return false
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
      setErrorMsg("Only customers can book properties.")
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
      <div className="flex justify-center items-center py-40">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Loader2 size={32} className="text-primary animate-spin" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-error font-body font-bold">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen pb-20 max-w-container-max mx-auto px-6 md:px-margin-desktop">
      {flat && (
        <div className="space-y-12">
          {/* Hero Gallery Section */}
          <section className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[300px] md:h-[500px]">
              {/* Featured Image */}
              <div className="md:col-span-8 overflow-hidden rounded-3xl group relative border border-glass-border">
                <img
                  alt={flat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={flat.images || "/placeholder.svg"}
                  loading="eager"
                  decoding="async"
                  width="900"
                  height="500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              <div className="hidden md:col-span-4 md:flex flex-col gap-4">
                <div className="h-1/2 overflow-hidden rounded-3xl border border-glass-border group">
                  <img
                    alt="Interior 1"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="250"
                  />
                </div>
                <div className="h-1/2 overflow-hidden rounded-3xl border border-glass-border relative group">
                  <img
                    alt="Interior 2"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="250"
                  />
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center cursor-pointer">
                    <span className="font-body text-xs font-bold text-white bg-glass-white px-4 py-2 rounded-full border border-glass-border backdrop-blur-md">
                      View Photos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Details & Booking Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            <div className="col-span-12 lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2.5">
                  <span className="bg-secondary/20 text-on-secondary px-3.5 py-1 rounded-full font-body text-[10px] font-bold tracking-widest uppercase border border-secondary/30">
                    Featured
                  </span>
                  <span className="bg-primary/10 text-primary px-3.5 py-1 rounded-full font-body text-[10px] font-bold tracking-widest uppercase border border-primary/25">
                    Modern Suite
                  </span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl text-on-background leading-tight">
                  {flat.name || `Rooms in ${flat.location}`}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-body text-sm font-semibold opacity-85">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-primary" /> {flat.location}, India
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} className="text-primary" /> up to {flat.capacity} guests
                  </div>
                </div>
              </div>

              {/* Description Sheet */}
              <div className="motionsite-card p-8 rounded-3xl space-y-4 border border-glass-border">
                <h3 className="font-display text-xl font-bold text-on-background">About this sanctuary</h3>
                <p className="font-body text-on-surface-variant leading-relaxed opacity-90 whitespace-pre-wrap">
                  {flat.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div className="space-y-6">
                <h3 className="font-display text-xl font-bold text-on-background">What this sanctuary offers</h3>
                {flat.amenities && flat.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {flat.amenities.map(item => {
                      const Icon = ICON_MAP[item] || Home
                      return (
                        <div key={item} className="flex items-center text-on-surface motionsite-card p-4 rounded-2xl border border-glass-border">
                          <Icon size={18} className="text-primary mr-3" />
                          <span className="font-body text-sm font-semibold">{item}</span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-on-surface-variant italic opacity-60">No amenities listed by host.</p>
                )}
              </div>

              {/* About Your Host */}
              <div className="motionsite-card p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-glass-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {(flat.seller?.name || "H")[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-on-background">Hosted by {flat.seller?.name || "Property Host"}</h4>
                    <p className="text-on-surface-variant font-body text-xs opacity-75">{flat.seller?.email}</p>
                  </div>
                </div>
                {flat.seller?.bio && (
                  <p className="text-on-surface-variant font-body text-sm italic border-l-2 border-primary pl-4 opacity-90 max-w-md">
                    "{flat.seller.bio}"
                  </p>
                )}
              </div>

              {/* Reviews Section */}
              <div className="motionsite-card p-8 rounded-3xl space-y-6 border border-glass-border">
                <h3 className="font-display text-xl font-bold text-on-background flex items-center gap-2">
                  <MessageSquare className="text-primary" /> Guest Reviews
                </h3>

                {loadingReviews ? (
                  <div className="flex justify-center p-4"><Loader2 className="animate-spin text-primary" /></div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review._id} className="bg-surface-container/60 p-5 rounded-2xl border border-glass-border/30">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-display font-semibold text-on-background text-sm">{review.user?.name || "Guest"}</p>
                            <p className="text-[10px] text-on-surface-variant font-body opacity-60 mt-0.5">{new Date(Number(review.createdAt)).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} size={12} className={star <= review.rating ? "text-primary fill-primary" : "text-on-surface-variant/30"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-on-surface-variant font-body text-sm leading-relaxed opacity-95">{review.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-on-surface-variant opacity-75 font-body">
                    <Star size={32} className="mx-auto text-on-surface-variant/40 mb-2" />
                    <p className="text-sm">No reviews yet. Be the first to review after booking!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Reservation widget */}
            <aside className="col-span-12 lg:col-span-4 h-fit lg:sticky lg:top-28 z-10">
              {localStorage.getItem('role') === 'seller' ? (
                <div className="motionsite-card p-8 rounded-3xl border border-error/20 text-center space-y-4 bg-error/5 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
                    <ShieldAlert size={24} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-on-background">Booking Restricted</h4>
                  <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed">
                    Sellers cannot reserve properties. Please register or log in as a customer to book stays.
                  </p>
                </div>
              ) : (
                <div className="motionsite-card p-8 rounded-3xl shadow-2xl border border-glass-border space-y-6">
                  <div className="flex justify-between items-end pb-4 border-b border-glass-border">
                    <div>
                      <span className="font-display text-2xl font-bold text-primary text-glow">₹{(flat.price || 0).toLocaleString()}</span>
                      <span className="text-on-surface-variant font-body text-xs opacity-75"> / month</span>
                    </div>
                    {flat.bookingCount >= 3 && (
                      <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-body text-[9px] font-bold uppercase tracking-widest">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="block font-body text-xs font-bold text-on-surface-variant tracking-widest uppercase">Select Stays</label>
                    <MonthCalendar
                      blockedMonths={flat.blockedMonths || []}
                      onDateSelect={({ start, end }) => {
                        setStartMonth(start);
                        setEndMonth(end);
                      }}
                    />
                  </div>

                  {/* Calculations */}
                  {monthsCount > 0 && (
                    <div className="pt-4 border-t border-glass-border space-y-3 font-body text-sm tracking-wide">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Rent ({monthsCount} months)</span>
                        <span>₹{(flat.price * monthsCount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Lumière Service Fee</span>
                        <span>₹1,500</span>
                      </div>
                      <div className="flex justify-between text-on-background font-bold pt-3 border-t border-glass-border/40 text-base">
                        <span>Estimated Total</span>
                        <span className="text-primary">₹{((flat.price * monthsCount) + 1500).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-4 bg-error/15 border border-error/25 text-error rounded-2xl text-xs font-body leading-relaxed font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    onClick={handleBooking}
                    disabled={isBooking || monthsCount <= 0}
                    className="w-full bg-primary text-on-primary py-4 rounded-2xl font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/15 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex justify-center items-center"
                  >
                    {isBooking ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                    {isBooking ? "Reserving Stay..." : "Book Sanctuary"}
                  </button>

                  <p className="text-center text-on-surface-variant font-body text-xs opacity-75">
                    You won't be charged in this step
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlatDetailPage
