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

  const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-xl ${color}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-t-4', 'bg-opacity-20')} bg-white`}>
          <Icon size={24} className="text-gray-700" />
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-medium text-gray-800">Overview</h1>
          <p className="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="px-4 py-2 bg-white text-[#76ABAE] border border-[#76ABAE]/20 rounded-xl hover:bg-[#76ABAE]/5 transition-colors flex items-center gap-2 shadow-sm font-medium">
          <Download size={18} />
          Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Total Revenue" 
          value={`₹${analytics?.totalRevenue?.toLocaleString() || 0}`} 
          icon={IndianRupee} 
          color="border-t-4 border-t-emerald-400"
          delay={0.1}
        />
        <StatCard 
          title="Active Listings" 
          value={analytics?.activeListings || 0} 
          icon={Building} 
          color="border-t-4 border-t-blue-400"
          delay={0.2}
        />
        <StatCard 
          title="Bookings (This Month)" 
          value={analytics?.monthlyBookings || 0} 
          icon={Calendar} 
          color="border-t-4 border-t-purple-400"
          delay={0.3}
        />
        <StatCard 
          title="Average Rating" 
          value={analytics?.avgRating?.toFixed(1) || "0.0"} 
          icon={Star} 
          color="border-t-4 border-t-orange-400"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-xl p-6">
          <h2 className="text-xl font-medium text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#76ABAE]" />
            Recent Bookings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-sm">
                  <th className="py-3 px-4 font-medium">Property</th>
                  <th className="py-3 px-4 font-medium">Guest</th>
                  <th className="py-3 px-4 font-medium">Period</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-800">{b.flat?.name || 'Listing'}</td>
                    <td className="py-4 px-4 text-gray-600">{b.user?.name}</td>
                    <td className="py-4 px-4 text-gray-600">{b.timePeriod} mo</td>
                    <td className="py-4 px-4 text-gray-800 font-medium">₹{b.totalPrice.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        b.paymentStatus === 'paid' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {b.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentBookings.length === 0 && (
                   <tr>
                     <td colSpan="5" className="py-8 text-center text-gray-500">No recent bookings found.</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#76ABAE]/10 to-purple-100/30 backdrop-blur-md rounded-2xl border border-white shadow-xl p-6 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
            <CreditCard size={32} className="text-[#76ABAE]" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Detailed Analytics</h3>
          <p className="text-gray-500 mb-8 text-sm px-4">
            View full revenue charts, export CSV reports, and track your property growth.
          </p>
          <a href="/seller/analytics" className="px-6 py-3 bg-white text-[#76ABAE] border border-[#76ABAE]/20 hover:bg-[#76ABAE] hover:text-white transition-all rounded-xl shadow-sm w-full font-medium">
            View Reports
          </a>
        </div>
      </div>
    </div>
  )
}
