"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { getFlat, updateListing } from "../graphql/queries"
import { Home, MapPin, Users, DollarSign, FileText, Loader2, AlertCircle, ArrowLeft } from "lucide-react"
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
        setLoading(true)
        console.log("Fetching flat with ID:", id) // Debug log
        
        const response = await getFlat(id)
        console.log("Flat data:", response) // Debug log
        
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
      }

      console.log("Updating flat with data:", formData) // Debug log

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
            <Loader2 size={32} className="text-[#76ABAE]" />
          </motion.div>
          <p className="text-gray-500 mt-3">Loading property details...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/mylistings")}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Update Property</h1>
            <p className="text-gray-600 mt-1">Edit your property details</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start"
              >
                <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm underline mt-2 hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              </motion.div>
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
                    placeholder="Enter property name"
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
                    placeholder="Enter monthly rent"
                    min="0"
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
                    required
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
                    placeholder="Number of guests"
                    min="1"
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
                  placeholder="Describe your property..."
                  required
                />
              </div>

              <div className="pt-4 flex gap-4">
                <Button
                  type="button"
                  onClick={() => navigate("/mylistings")}
                  name="Cancel"
                  css="flex-1 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300"
                />
                <Button
                  type="submit"
                  name={
                    isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1, 
                            repeat: Number.POSITIVE_INFINITY, 
                            ease: "easeInOut" 
                          }}
                        >
                          <Loader2 size={18} className="mr-2" />
                        </motion.div>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "Update Property"
                    )
                  }
                  fullWidth
                  css="flex-1 py-3"
                  disabled={isSubmitting}
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