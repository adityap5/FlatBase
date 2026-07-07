import { motion, AnimatePresence } from "framer-motion"
import FlatCard from "../cards/FlatCard"
import HomeCardShimmer from "../skeletons/HomeCardShimmer"

export default function CityFlatList({ flats, loading, error, selectedCity }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <HomeCardShimmer key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-error/15 border border-error/25 text-error rounded-3xl motionsite-card text-center">
        <h3 className="font-display font-bold text-lg mb-2">Error loading properties</h3>
        <p className="text-sm font-body opacity-80">{error.message || "Failed to load flats."}</p>
      </div>
    )
  }

  if (!flats || flats.length === 0) {
    return (
      <motion.div
        key="empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center py-16 motionsite-card rounded-3xl border border-glass-border p-8"
      >
        <p className="text-on-surface-variant font-body text-sm opacity-75">
          {selectedCity 
            ? `No luxury stays available in ${selectedCity} right now.` 
            : "Select a city from the map to explore properties."}
        </p>
      </motion.div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.12 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedCity || "none"}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-4"
      >
        {flats.map((flat, idx) => (
          <motion.div key={flat._id} variants={itemVariants}>
            <FlatCard flat={flat} isFirst={idx === 0} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
