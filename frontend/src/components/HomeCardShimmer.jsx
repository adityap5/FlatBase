"use client"

import { motion } from "framer-motion"

const HomeCardShimmer = () => {
  const shimmerCards = Array.from({ length: 8 })

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {shimmerCards.map((_, i) => (
        <motion.div key={i} variants={cardVariants} className="motionsite-card rounded-3xl overflow-hidden border border-glass-border flex flex-col h-full p-0">
          <div className="relative">
            <div className="h-56 w-full bg-surface-container/80 animate-pulse rounded-t-3xl"></div>
          </div>
          <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-3 bg-surface-container/60 animate-pulse rounded-full w-1/4"></div>
              <div className="h-5 bg-surface-container/80 animate-pulse rounded-full w-3/4"></div>
              <div className="h-3.5 bg-surface-container/60 animate-pulse rounded-full w-full"></div>
              <div className="h-3.5 bg-surface-container/60 animate-pulse rounded-full w-5/6"></div>
            </div>
            <div className="h-10 bg-surface-container/80 animate-pulse rounded-2xl w-full mt-6"></div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default HomeCardShimmer
