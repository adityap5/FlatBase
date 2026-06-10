"use client"

import { motion } from "framer-motion"
import Search from "../components/Search"

const Banner = () => {
  return (
    <section className="relative h-screen min-h-[650px] w-full flex items-center justify-center overflow-hidden -mt-28 z-0">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover" 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-container-max px-6 md:px-margin-desktop text-center mt-12 flex flex-col items-center">
        <motion.h1 
          className="font-display text-4xl md:text-6xl lg:text-7xl text-on-background mb-6 leading-tight max-w-4xl mx-auto font-bold tracking-tight text-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find Your Perfect Stay
        </motion.h1>
        
        <motion.p 
          className="font-body text-base md:text-lg lg:text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover comfortable and affordable accommodations for your next editorial-grade luxury adventure.
        </motion.p>

        <motion.div 
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Search css="w-full" />
        </motion.div>
      </div>
    </section>
  )
}

export default Banner
