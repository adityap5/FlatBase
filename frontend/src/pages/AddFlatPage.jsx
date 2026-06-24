"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Home, MapPin, Users, DollarSign, FileText, Upload, Loader2, Wifi, Car, Utensils, Wind, Waves, ShieldCheck, Dumbbell, Tv, CheckSquare } from "lucide-react"
import Confetti from "react-confetti"
import { addFlat } from "../graphql/queries"

const Modal = ({ message, type, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className={`bg-white rounded-3xl p-6 shadow-xl text-center w-[90%] max-w-md border border-gray-100`}>
      <p className={`text-base font-bold mb-6 ${type === "error" ? "text-red-600" : "text-[#0B5A42]"}`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className="px-6 py-2.5 bg-[#0B5A42] text-white rounded-xl hover:bg-[#186a54] transition shadow-md shadow-[#0B5A42]/10 text-xs font-bold uppercase tracking-wider"
      >
        OK
      </button>
    </div>
  </div>
)

const AddFlatPage = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("Chandigarh")
  const [capacity, setCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [amenities, setAmenities] = useState([])
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setImage(null)
      setImagePreview(null)
      setModalMessage("File size should be less than 2MB.")
      setModalType("error")
      setShowModal(true)
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result)
    reader.readAsDataURL(file)
    setImagePreview(URL.createObjectURL(file))
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")

      // Validate required data
      if (!token) {
        setModalMessage("Please login first.")
        setModalType("error")
        setShowModal(true)
        setIsSubmitting(false)
        return
      }

      if (!userId) {
        setModalMessage("User ID not found. Please login again.")
        setModalType("error")
        setShowModal(true)
        setIsSubmitting(false)
        return
      }

      const flatData = {
        name,
        price: parseFloat(price),
        location,
        capacity: parseInt(capacity),
        description,
        amenities,
        images: image,
        seller: userId
      }

      const response = await addFlat(flatData)
      
      setModalMessage("Property added successfully!")
      setModalType("success")
      setShowModal(true)
      setShowConfetti(true)

      // Reset form
      setName("")
      setPrice("")
      setLocation("Chandigarh")
      setCapacity("")
      setDescription("")
      setAmenities([])
      setImage(null)
      setImagePreview(null)

    } catch (err) {
      console.error("Full error:", err)
      console.error("GraphQL errors:", err.graphQLErrors)
      console.error("Network error:", err.networkError)
      
      let errorMessage = "Failed to add property. Please try again."
      
      // More specific error handling
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        errorMessage = err.graphQLErrors[0].message
      } else if (err.networkError) {
        errorMessage = "Network error. Please check your connection."
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setModalMessage(errorMessage)
      setModalType("error")
      setShowModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    if (modalType === "success") {
      setTimeout(() => navigate("/"), 300)
    }
    setShowConfetti(false)
  }

  const locations = [
    "Chandigarh", "Agra", "Jaipur", "NewDelhi", "Banglore", "Hyderabad",
    "Haryana", "Mathura", "Varanasi", "Shimla", "Noida"
  ]

  return (
    <div className="max-w-4xl mx-auto relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      {showModal && <Modal message={modalMessage} type={modalType} onClose={closeModal} />}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <Home size={14} className="mr-2 text-[#0B5A42]" /> Property Name
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400" 
                  placeholder="Enter property name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <DollarSign size={14} className="mr-2 text-[#0B5A42]" /> Monthly Price (₹)
                </label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                  min="0"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400" 
                  placeholder="Enter monthly rent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <MapPin size={14} className="mr-2 text-[#0B5A42]" /> Location
                </label>
                <select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <Users size={14} className="mr-2 text-[#0B5A42]" /> Guests Allowed
                </label>
                <input 
                  type="number" 
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)} 
                  required 
                  min="1"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400" 
                  placeholder="Number of guests"
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
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                <FileText size={14} className="mr-2 text-[#0B5A42]" /> Property Description
              </label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={4} 
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B5A42]/10 focus:border-[#0B5A42] focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400" 
                placeholder="Describe your property..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                <Upload size={14} className="mr-2 text-[#0B5A42]" /> Property Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 hover:border-[#0B5A42]/50 transition-all">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Click to upload or drag & drop</p>
                      <p className="text-[10px] text-gray-400">PNG, JPG or JPEG (MAX. 2MB)</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" required />
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-1.5 px-6 py-3 bg-[#0B5A42] text-white rounded-xl hover:bg-[#186a54] transition-all text-xs font-bold uppercase tracking-wider shadow-md shadow-[#0B5A42]/10 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Adding Property...</span>
                  </>
                ) : (
                  "Add Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AddFlatPage