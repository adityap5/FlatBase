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
      <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden z-0">
        <motion.img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={flat.images || "/placeholder.svg"}
          alt={flat.name || `Rooms in ${flat.location}`}
        />
        
        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-primary text-on-primary px-3 py-1 rounded-full font-body font-bold text-[10px] sm:text-xs tracking-wider uppercase shadow-lg hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all">
          ₹{flat.price?.toLocaleString()}
          <span className="text-[8px] font-semibold opacity-90 ml-0.5">/ mo</span>
        </div>

        {/* Popular indicator */}
        {flat.bookingCount >= 3 && (
          <div className="absolute top-3 left-3 bg-secondary text-on-secondary px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md border border-secondary/20">
            <Star size={9} className="fill-white" /> Popular
          </div>
        )}
      </div>

      <div className="p-3.5 sm:p-5 md:p-6 flex flex-col flex-grow">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-on-surface-variant mb-1.5">
          <MapPin size={10} className="text-primary" />
          <span className="font-body text-[8px] sm:text-[10px] uppercase tracking-widest font-bold opacity-80">{flat.location}</span>
        </div>

        {/* Title */}
        <h4 className="font-display text-sm sm:text-base md:text-lg font-semibold text-on-background mb-1.5 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {flat.name}
        </h4>

        {/* Description */}
        <p className="text-on-surface-variant font-body text-[11px] sm:text-xs md:text-sm line-clamp-2 mb-3.5 opacity-70 leading-relaxed">
          {flat.description}
        </p>

        {/* Button */}
        <Link to={`/flat/${flat._id}`} className="mt-auto block w-full">
          <button className="w-full border border-glass-border py-2.5 sm:py-3 rounded-2xl font-body font-bold text-[10px] sm:text-xs uppercase tracking-wider text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 active:scale-[0.98]">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

export default FlatCard
