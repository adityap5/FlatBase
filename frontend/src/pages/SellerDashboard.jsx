import { useState, useEffect } from "react"
import { getSellerAnalytics, getSellerBookings } from "../graphql/queries"
import { motion } from "framer-motion"
import { 
  Building, 
  CreditCard, 
  TrendingUp, 
  Star,
  Download,
  Calendar,
  IndianRupee 
} from "lucide-react"

export default function SellerDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const sellerId = localStorage.getItem("userId")
        const [analyticsRes, bookingsRes] = await Promise.all([
          getSellerAnalytics(sellerId),
          getSellerBookings(sellerId)
        ])
        
        setAnalytics(analyticsRes.data.sellerAnalytics)
        setRecentBookings(bookingsRes.data.sellerBookings.slice(0, 5)) // get top 5 latest
      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="h-32 bg-gray-200 rounded-2xl"></div>
            <div className="h-32 bg-gray-200 rounded-2xl"></div>
            <div className="h-32 bg-gray-200 rounded-2xl"></div>
            <div className="h-32 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  const StatCard = ({ title, value, growth, icon: Icon, isFeatured, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-6 rounded-3xl border shadow-sm relative overflow-hidden transition-all duration-300 ${
        isFeatured 
          ? "bg-[#0B5A42] border-[#0B5A42] text-white" 
          : "bg-white border-gray-100 text-gray-900 hover:border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${isFeatured ? "text-white/80" : "text-gray-400"}`}>
            {title}
          </p>
          <h3 className="text-4xl font-extrabold mt-2 tracking-tight">{value}</h3>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
          isFeatured 
            ? "border-white/20 bg-white/10 text-white hover:bg-white/20" 
            : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
        }`}>
          <Icon size={14} className={isFeatured ? "text-white" : "text-gray-500"} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-bold">
        <span className={`px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
          isFeatured 
            ? "bg-white/15 text-white" 
            : "bg-[#EAF4F0] text-[#0B5A42]"
        }`}>
          {growth}
        </span>
        <span className={isFeatured ? "text-white/60" : "text-gray-400"}>
          Increased from last month
        </span>
      </div>
    </motion.div>
  )

  const totalRevenue = analytics?.totalRevenue || 0
  const activeListings = analytics?.activeListings || 0
  const monthlyBookings = analytics?.monthlyBookings || 0
  const avgRating = analytics?.avgRating || 0.0

  return (
    <div className="space-y-8">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString()}`} 
          growth="5% ↑" 
          icon={IndianRupee}
          isFeatured={true}
          delay={0.1}
        />
        <StatCard 
          title="Active Listings" 
          value={activeListings} 
          growth="10%" 
          icon={Building}
          isFeatured={false}
          delay={0.2}
        />
        <StatCard 
          title="Bookings (This Month)" 
          value={monthlyBookings} 
          growth="2% ↑" 
          icon={Calendar}
          isFeatured={false}
          delay={0.3}
        />
        <StatCard 
          title="Average Rating" 
          value={avgRating.toFixed(1)} 
          growth="4.8 On Discuss" 
          icon={Star}
          isFeatured={false}
          delay={0.4}
        />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
              <p className="text-xs text-gray-400 font-medium">Verify your property check-ins</p>
            </div>
            <span className="text-xs font-bold text-[#0B5A42] bg-[#EAF4F0] px-3 py-1 rounded-full">
              Live Updates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-semibold text-gray-700">
                {recentBookings.map((b) => (
                  <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-900">{b.flat?.name || 'Listing'}</td>
                    <td className="py-4 px-4 text-gray-500 font-medium">{b.user?.name}</td>
                    <td className="py-4 px-4 text-gray-500 font-medium">{b.timePeriod} mo</td>
                    <td className="py-4 px-4 text-gray-900 font-bold">₹{b.totalPrice.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                        b.paymentStatus === 'paid' 
                          ? 'bg-[#EAF4F0] text-[#0B5A42]' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {b.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentBookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">
                      No recent bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar columns */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Reminders Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between h-48">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">
                Reminders
              </p>
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                Review check-in list with guest group
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-1">
                Time: 02.00 pm - 04.00 pm
              </p>
            </div>
            <button className="w-full bg-[#0B5A42] text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-[#186a54] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#0B5A42]/10">
              Start Meeting
            </button>
          </div>

          {/* Occupancy Progress Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col items-center">
            <div className="w-full text-left">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">
                Occupancy Progress
              </p>
            </div>
            <div className="relative flex items-center justify-center py-2">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-gray-100"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-[#0B5A42]"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={327}
                  strokeDashoffset={327 * 0.36}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-extrabold text-gray-900 block leading-none">64%</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider mt-1 block">Stays Occupied</span>
              </div>
            </div>
            <div className="flex justify-between w-full mt-4 text-[9px] font-bold text-gray-400">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0B5A42]" />
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300" />
                <span>In discussion</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-200" />
                <span>Empty</span>
              </div>
            </div>
          </div>

          
      
        </div>

      </div>
    </div>
  )
}
