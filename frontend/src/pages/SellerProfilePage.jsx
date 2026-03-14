import { useState, useEffect } from "react"
import { updateSellerProfile, getUser } from "../graphql/queries"
import { User, Mail, Phone, FileText, CheckCircle, Loader2 } from "lucide-react"

export default function SellerProfilePage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", bio: "" })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("userId")
        if (!id) return
        
        const res = await getUser(id)
        if (res.data.user) {
          setFormData({
            name: res.data.user.name || "",
            email: res.data.user.email || "",
            phone: res.data.user.phone || "",
            bio: res.data.user.bio || ""
          })
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err)
      } finally {
        setLoadingData(false)
      }
    }
    
    fetchProfile()
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const id = localStorage.getItem("userId")
      await updateSellerProfile({ id, ...formData })
      localStorage.setItem("userName", formData.name)
      localStorage.setItem("userEmail", formData.email)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error(err)
      setError("Failed to update profile.")
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white p-8">
           <div className="animate-pulse space-y-6">
             <div className="h-8 bg-gray-200 rounded w-1/4"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="h-12 bg-gray-200 rounded-xl"></div>
               <div className="h-12 bg-gray-200 rounded-xl"></div>
             </div>
             <div className="h-12 bg-gray-200 rounded-xl"></div>
             <div className="h-24 bg-gray-200 rounded-xl"></div>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white p-8">
        <h1 className="text-3xl font-medium text-gray-800 mb-8 flex items-center gap-3">
          <User className="text-[#76ABAE]" size={32} />
          Seller Profile
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2">
            <CheckCircle size={20} />
            <span>Profile updated successfully!</span>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-[#76ABAE]" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/50 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-[#76ABAE]" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/50 transition-all"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone size={16} className="text-[#76ABAE]" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/50 transition-all"
                placeholder="Enter your contact number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={16} className="text-[#76ABAE]" /> Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/50 transition-all"
                placeholder="Tell guests about yourself..."
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#76ABAE] text-white rounded-xl font-medium hover:bg-[#76ABAE]/90 transition-all flex items-center gap-2 shadow-lg shadow-[#76ABAE]/20 disabled:opacity-70"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
