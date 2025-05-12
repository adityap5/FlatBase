"use client"

import { motion } from "framer-motion"

const HomeCardShimmer = () => {
  const shimmerCards = Array.from({ length: 8 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {shimmerCards.map((_, i) => (
        <motion.div key={i} variants={cardVariants} className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="relative">
            <div className="h-56 w-full bg-gray-200 animate-pulse rounded-t-xl"></div>
          </div>
          <div className="p-5">
            <div className="h-4 bg-gray-200 animate-pulse rounded-full w-3/4 mb-3"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded-full w-5/6 mb-3"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-full w-full mb-3"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-full w-4/5 mb-4"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-full"></div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default HomeCardShimmer
