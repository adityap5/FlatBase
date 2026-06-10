"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { MapPin, Star } from "lucide-react"

const FlatCard = ({ flat }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
      className="motionsite-card rounded-3xl overflow-hidden flex flex-col h-full group shadow-xl border border-glass-border"
    >
      <div className="relative h-64 overflow-hidden z-0">
        <motion.img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={flat.images || "/placeholder.svg"}
          alt={flat.name || `Rooms in ${flat.location}`}
        />
        
        {/* Price tag */}
        <div className="absolute top-4 right-4 bg-primary text-on-primary px-4 py-1.5 rounded-full font-body font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all">
          ₹{flat.price?.toLocaleString()}
          <span className="text-[9px] font-semibold opacity-90 ml-0.5">/ mo</span>
        </div>

        {/* Popular indicator */}
        {flat.bookingCount >= 3 && (
          <div className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md border border-secondary/20">
            <Star size={10} className="fill-white" /> Popular
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-on-surface-variant mb-2">
          <MapPin size={12} className="text-primary" />
          <span className="font-body text-[10px] uppercase tracking-widest font-bold opacity-80">{flat.location}</span>
        </div>

        {/* Title */}
        <h4 className="font-display text-lg font-semibold text-on-background mb-3 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {flat.name}
        </h4>

        {/* Description */}
        <p className="text-on-surface-variant font-body text-sm line-clamp-2 mb-6 opacity-70 leading-relaxed">
          {flat.description}
        </p>

        {/* Button */}
        <Link to={`/flat/${flat._id}`} className="mt-auto block w-full">
          <button className="w-full border border-glass-border py-3 rounded-2xl font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 active:scale-[0.98]">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

export default FlatCard
