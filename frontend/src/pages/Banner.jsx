"use client"

import { motion } from "framer-motion"
import Search from "../components/Search"

const Banner = () => {
  return (
    <div className="w-full relative mt-8">
      <div className="relative rounded-2xl overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-[50vh] md:h-[70vh] object-cover"
          src="https://images.unsplash.com/photo-1421941027568-40ab08ee5592?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Banner background"
        />

        <div className="absolute inset-0 bg-black/30 rounded-2xl" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Discover comfortable and affordable accommodations for your next adventure
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full max-w-2xl"
          >
            <Search css="w-full" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Banner
