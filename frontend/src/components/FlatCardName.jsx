"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { MapPin, Home } from "lucide-react"
import Button from "./Button"


const FlatCard = ({ flat }) => {

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="h-56 w-full object-cover"
          src={flat.images}
          alt={flat.name || "Flat"}
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
          ₹{flat.price}/month
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center mb-2">
          <MapPin size={16} className="text-[#76ABAE] mr-1" />
          
          <h2 className="font-medium text-gray-500">{flat.location}</h2>
        </div>

        <h1 className="font-bold text-xl mb-2 line-clamp-1">
          {/* <Home size={18} className="inline mr-1 text-[#76ABAE]" /> */}
          {flat.name}
        </h1>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{flat.description}</p>

        <Link to={`/flat/${flat._id}`}>
          <Button name="View Details" fullWidth />
        </Link>
      </div>
    </motion.div>
  )
}

export default FlatCard
