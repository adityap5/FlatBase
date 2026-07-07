
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { getFlat, updateListing } from "../services/queries"
import { Home, MapPin, Users, DollarSign, FileText, Loader2, AlertCircle, ArrowLeft, Wifi, Car, Utensils, Wind, Waves, ShieldCheck, Dumbbell, Tv, CheckSquare } from "lucide-react"
import Button from "../components/ui/Button"
import { LOCATIONS} from "../utils/constants"

function UpdatePage() {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [amenities, setAmenities] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        setLoading(true)
        const response = await getFlat(id)
        // Handle different response structures
        const flatData = response.data?.flat || response.data || response

        if (!flatData) {
          throw new Error("Property not found")
        }

        setName(flatData.name || "")
        setPrice(flatData.price?.toString() || "")
        setLocation(flatData.location || "Chandigarh")
        setCapacity(flatData.capacity?.toString() || "")
        setDescription(flatData.description || "")
        setAmenities(flatData.amenities || [])
        setError(null)

      } catch (err) {
        console.error("Error fetching flat:", err)
        setError("Failed to load property details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchFlat()
    } else {
      setError("Invalid property ID")
      setLoading(false)
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = {
        name: name.trim(),
        price: parseFloat(price),
        location,
        description: description.trim(),
        capacity: parseInt(capacity),
        amenities,
      }

      await updateListing(id, formData)

      // Show success and navigate back
      navigate("/mylistings", {
        state: { message: "Property updated successfully!" }
      })

    } catch (err) {
      console.error("Update error:", err)
      let errorMessage = "Failed to update property. Please try again."

      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        errorMessage = err.graphQLErrors[0].message
      } else if (err.networkError) {
        errorMessage = "Network error. Please check your connection."
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }



  const handleAmenityToggle = (amenity) => {
    setAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  const AVAILABLE_AMENITIES = [
    { id: "WiFi", icon: Wifi },
    { id: "Parking", icon: Car },
    { id: "Kitchen", icon: Utensils },
    { id: "AC", icon: Wind },
    { id: "Pool", icon: Waves },
    { id: "Security", icon: ShieldCheck },
    { id: "Gym", icon: Dumbbell },
    { id: "TV", icon: Tv },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          >
            <Loader2 size={32} className="text-[#0B5A42]" />
          </motion.div>
          <p className="text-gray-500 mt-3">Loading property details...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/mylistings")}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold uppercase tracking-wider shadow-sm font-semibold"
          >
            <ArrowLeft size={14} />
            Back to listings
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-start gap-2.5"
            >
              <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs underline mt-2 hover:no-underline font-bold"
                >
                  Try again
                </button>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <Home size={14} className="mr-2 text-[#0B5A42]" /> Property Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter property name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <DollarSign size={14} className="mr-2 text-[#0B5A42]" /> Monthly Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter monthly rent"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <MapPin size={14} className="mr-2 text-[#0B5A42]" /> Location
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400"
                  required
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="capacity" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <Users size={14} className="mr-2 text-[#0B5A42]" /> Guests Allowed
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400"
                  placeholder="Number of guests"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                <CheckSquare size={14} className="mr-2 text-[#0B5A42]" /> Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const Icon = amenity.icon
                  const isSelected = amenities.includes(amenity.id)
                  return (
                    <div
                      key={amenity.id}
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isSelected
                          ? "bg-[#EAF4F0] border-[#0B5A42] text-[#0B5A42] shadow-sm font-semibold"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
                        }`}
                    >
                      <Icon size={16} className={isSelected ? "text-[#0B5A42]" : "text-gray-400"} />
                      <span className="font-semibold text-xs">{amenity.id}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                <FileText size={14} className="mr-2 text-[#0B5A42]" /> Property Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400"
                placeholder="Describe your property..."
                required
              />
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/mylistings")}
                className="flex-1 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold uppercase tracking-wider shadow-sm font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-1.5 px-6 py-3 bg-[#0B5A42] text-white rounded-xl hover:bg-[#186a54] transition-all text-xs font-bold uppercase tracking-wider shadow-md shadow-[#0B5A42]/10 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  "Update Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default UpdatePage