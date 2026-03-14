import { useState, useEffect } from "react"
import { getSellerAnalytics } from "../graphql/queries"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import { Download, TrendingUp, Calendar, AlertCircle } from "lucide-react"

export default function SellerAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reportType, setReportType] = useState("revenue") // "revenue" or "bookings"

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const sellerId = localStorage.getItem("userId")
        const res = await getSellerAnalytics(sellerId)
        setAnalytics(res.data.sellerAnalytics)
      } catch (err) {
        console.error("Error fetching analytics:", err)
        setError("Failed to load analytics data.")
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  const handleDownloadCSV = () => {
    if (!analytics || !analytics.monthlyData) return
    const headers = ["Month", "Revenue (INR)", "Bookings"]
    const rows = analytics.monthlyData.map(d => [d.month, d.revenue, d.bookings])
    
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "seller_analytics_report.csv")
    document.body.appendChild(link) // Required for FF
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[400px] bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500 gap-2">
        <AlertCircle size={20} />
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-800">Performance Analytics</h1>
          <p className="text-gray-500 mt-2">Track your revenue and booking trends</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 flex">
            <button 
              onClick={() => setReportType("revenue")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${reportType === "revenue" ? "bg-[#76ABAE] text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Revenue
            </button>
            <button 
              onClick={() => setReportType("bookings")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${reportType === "bookings" ? "bg-[#76ABAE] text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Bookings
            </button>
          </div>
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-6 py-2 bg-white text-[#76ABAE] border border-[#76ABAE]/20 hover:bg-[#76ABAE]/5 transition-colors rounded-xl shadow-sm text-sm font-medium"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-50 rounded-xl">
            {reportType === "revenue" ? <TrendingUp size={24} className="text-purple-600" /> : <Calendar size={24} className="text-purple-600" />}
          </div>
          <div>
            <h2 className="text-xl font-medium text-gray-800">
              {reportType === "revenue" ? "6-Month Revenue Trend" : "6-Month Booking Volume"}
            </h2>
            <p className="text-sm text-gray-500">
              {reportType === "revenue" ? "Total earnings per month in INR" : "Number of successful bookings per month"}
            </p>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {reportType === "revenue" ? (
              <BarChart data={analytics.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#76ABAE" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            ) : (
              <LineChart data={analytics.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [value, "Bookings"]}
                />
                <Line type="monotone" dataKey="bookings" stroke="#9333ea" strokeWidth={3} dot={{ strokeWidth: 2, r: 6, fill: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100/50">
           <h3 className="text-lg font-medium text-gray-800 mb-2">Total Earnings To Date</h3>
           <p className="text-4xl font-bold text-emerald-600">₹{analytics.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/50">
           <h3 className="text-lg font-medium text-gray-800 mb-2">Platform Average Rating</h3>
           <div className="flex items-center gap-3">
             <p className="text-4xl font-bold text-blue-600">{analytics.avgRating.toFixed(1)}</p>
             <div className="flex">
               {[1,2,3,4,5].map(star => (
                 <svg key={star} className={`w-6 h-6 ${star <= analytics.avgRating ? 'text-blue-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                 </svg>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
