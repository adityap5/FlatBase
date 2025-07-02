"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Home, MapPin, Users, DollarSign, FileText, Upload, Loader2 } from "lucide-react"
import Button from "../components/Button"

const AddFlatPage = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("Chandigarh")
  const [capacity, setCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("location", location)
    formData.append("description", description)
    formData.append("capacity", capacity)
    formData.append("image", image)

    try {
      await axios.post("http://flatbase.ap-south-1.elasticbeanstalk.com/api/flats", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      navigate("/")
    } catch (err) {
      console.error(err)
      setError("Failed to add flat. Please try again.")
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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
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
                    placeholder="e.g. Cozy Studio Apartment"
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
                    placeholder="e.g. 15000"
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
                    placeholder="e.g. 2"
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
                  placeholder="Describe your property..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Upload size={16} className="mr-2 text-[#76ABAE]" />
                  Property Image
                </label>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      id="image"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  name={
                    isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 size={18} className="animate-spin mr-2" />
                        <span>Adding Property...</span>
                      </div>
                    ) : (
                      "Add Property"
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

export default AddFlatPage
