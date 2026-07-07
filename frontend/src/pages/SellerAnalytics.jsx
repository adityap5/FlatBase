import { useState, useEffect, lazy, Suspense } from "react"
import { getSellerAnalytics } from "../services/queries"
import { Download, TrendingUp, Calendar, AlertCircle } from "lucide-react"

const SellerCharts = lazy(() => import('../components/shared/SellerCharts'))

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
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <div className="flex gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-1 flex shadow-sm">
            <button 
              onClick={() => setReportType("revenue")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                reportType === "revenue" 
                  ? "bg-[#0B5A42] text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/50"
              }`}
            >
              Revenue
            </button>
            <button 
              onClick={() => setReportType("bookings")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                reportType === "bookings" 
                  ? "bg-[#0B5A42] text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/50"
              }`}
            >
              Bookings
            </button>
          </div>
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B5A42] border border-[#0B5A42]/20 hover:bg-[#EAF4F0]/50 transition-all rounded-2xl shadow-sm text-xs font-bold uppercase tracking-wider"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#EAF4F0] rounded-2xl text-[#0B5A42]">
            {reportType === "revenue" ? <TrendingUp size={20} /> : <Calendar size={20} />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {reportType === "revenue" ? "6-Month Revenue Trend" : "6-Month Booking Volume"}
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {reportType === "revenue" ? "Total earnings per month in INR" : "Number of successful bookings per month"}
            </p>
          </div>
        </div>
        
        <div className="h-[250px] w-full">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-400">Loading charts...</div>}>
            <SellerCharts reportType={reportType} analytics={analytics} />
          </Suspense>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0B5A42] text-white rounded-3xl p-6 shadow-sm relative overflow-hidden min-h-36 flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5" />
          <div>
            <p className="text-[10px] font-bold text-white/80 tracking-widest uppercase mb-1">
              Total Earnings To Date
            </p>
            <h3 className="text-4xl font-extrabold mt-2 tracking-tight">₹{analytics.totalRevenue.toLocaleString()}</h3>
          </div>
          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-bold w-fit">
            All-Time Revenue
          </span>
        </div>

        <div className="bg-white border border-gray-100 text-gray-900 rounded-3xl p-6 shadow-sm relative overflow-hidden min-h-36 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
              Platform Average Rating
            </p>
            <div className="flex items-end gap-3 mt-2">
              <h3 className="text-4xl font-extrabold tracking-tight leading-none">{analytics.avgRating.toFixed(1)}</h3>
              <div className="flex mb-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg 
                    key={star} 
                    className={`w-5 h-5 ${star <= analytics.avgRating ? 'text-[#0B5A42]' : 'text-gray-200'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-[#EAF4F0] text-[#0B5A42] text-[10px] font-bold w-fit">
            Guest Satisfaction
          </span>
        </div>
      </div>
    </div>
  )
}
