"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Home, MapPin, Users, DollarSign, FileText, Upload, Loader2 } from "lucide-react"
import Confetti from "react-confetti"
import Button from "../components/Button"

const Modal = ({ message, type, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className={`bg-white rounded-xl p-6 shadow-lg text-center w-[90%] max-w-md ${type === "error" ? "border-red-500" : "border-green-500"} border`}>
      <p className={`text-lg font-semibold mb-4 ${type === "error" ? "text-red-600" : "text-green-600"}`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-[#76ABAE] text-white rounded-md hover:bg-[#5a8f92] transition"
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
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const navigate = useNavigate()

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) { // 5 MB
    setImage(null);
    setImagePreview(null);
    setModalMessage("File size should be less than 2MB.");
    setModalType("error");
    setShowModal(true);
    return; 
  }

  setImage(file);
  const reader = new FileReader();
  reader.onloadend = () => setImagePreview(reader.result);
  reader.readAsDataURL(file);
};
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("location", location)
    formData.append("description", description)
    formData.append("capacity", capacity)
    formData.append("image", image)

    try {
      await axios.post("https://flatbase.onrender.com/api/flats", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setModalMessage("Property added successfully! 🎉")
      setModalType("success")
      setShowModal(true)
      setShowConfetti(true)

    } catch (err) {
      console.error(err)
      if (err?.response?.data?.message?.includes("File too large")) {
        setModalMessage("Image is too large. Please upload an image under 5MB.")
      } else {
        setModalMessage("Failed to add property. Please try again.")
      }
      setModalType("error")
      setShowModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    if (modalType === "success") {
      setTimeout(() => navigate("/"), 300) // navigate after closing success modal
    }
    setShowConfetti(false)
  }

  const locations = [
    "Chandigarh", "Agra", "Jaipur", "NewDelhi", "Banglore", "Hyderabad",
    "Haryana", "Mathura", "Varanasi", "Shimla", "Noida"
  ]

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {showModal && (
        <Modal message={modalMessage} type={modalType} onClose={closeModal} />
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium flex items-center">
                    <Home size={16} className="mr-2 text-[#76ABAE]" /> Property Name
                  </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="shadow-sm rounded-md w-full px-3 py-2 border" />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium flex items-center">
                    <DollarSign size={16} className="mr-2 text-[#76ABAE]" /> Monthly Price (₹)
                  </label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="shadow-sm rounded-md w-full px-3 py-2 border" />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium flex items-center">
                    <MapPin size={16} className="mr-2 text-[#76ABAE]" /> Location
                  </label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border">
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium flex items-center">
                    <Users size={16} className="mr-2 text-[#76ABAE]" /> Guests Allowed
                  </label>
                  <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required className="shadow-sm rounded-md w-full px-3 py-2 border" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium flex items-center">
                  <FileText size={16} className="mr-2 text-[#76ABAE]" /> Property Description
                </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required className="shadow-sm rounded-md w-full px-3 py-2 border" />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium flex items-center">
                  <Upload size={16} className="mr-2 text-[#76ABAE]" /> Property Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                    )}
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" required />
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  name={isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 size={18} className="animate-spin mr-2" /> Adding Property...
                    </div>
                  ) : "Add Property"}
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

export default AddFlatPage
