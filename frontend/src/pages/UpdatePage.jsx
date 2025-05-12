"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { getFlat, updateListing } from "../api"
import { Home, MapPin, Users, DollarSign, FileText, Loader2, AlertCircle } from "lucide-react"
import Button from "../components/Button"

function UpdatePage() {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const { data } = await getFlat(id)
        setName(data.name || "")
        setPrice(data.price || "")
        setLocation(data.location || "")
        setCapacity(data.capacity || "")
        setDescription(data.description || "")
      } catch (err) {
        console.error("Error fetching flat:", err)
        setError("Failed to load property details")
      } finally {
        setLoading(false)
      }
    }

    fetchFlat()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = {
      name,
      price,
      location,
      description,
      capacity,
    }

    try {
      await updateListing(id, formData)
      navigate("/mylistings")
    } catch (err) {
      console.error(err)
      setError("Failed to update property. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const locations = [
    "Chandigarh",
    "Agra",
    "Jaipur",
    "NewDelhi",
    "Banglore",
    "Hyderabad",
    "Haryana",
    "Mathura",
    "Varanasi",
    "Shimla",
    "Noida",
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 size={32} className="text-[#76ABAE]" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8">Update Property</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start">
                <AlertCircle size={20} className="mr-2 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                    <Home size={16} className="mr-2 text-[#76ABAE]" />
                    Property Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 flex items-center">
                    <DollarSign size={16} className="mr-2 text-[#76ABAE]" />
                    Monthly Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 flex items-center">
                    <MapPin size={16} className="mr-2 text-[#76ABAE]" />
                    Location
                  </label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 flex items-center">
                    <Users size={16} className="mr-2 text-[#76ABAE]" />
                    Guests Allowed
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FileText size={16} className="mr-2 text-[#76ABAE]" />
                  Property Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                  required
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  name={
                    isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 size={18} className="animate-spin mr-2" />
                        <span>Updating Property...</span>
                      </div>
                    ) : (
                      "Update Property"
                    )
                  }
                  fullWidth
                  css="py-3"
                />
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UpdatePage
