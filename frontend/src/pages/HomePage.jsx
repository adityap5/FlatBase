"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import FlatCard from "../components/FlatCard"
import HomeCardShimmer from "../components/HomeCardShimmer"
import { useDispatch, useSelector } from "react-redux"
import { fetchFlats } from "../redux/flatsSlice"
import Banner from "./Banner"
import Testimonial from "./Testimonial"

const HomePage = () => {
  const dispatch = useDispatch()
  const { flats, loading } = useSelector((state) => state.flats)

  useEffect(() => {
    dispatch(fetchFlats())
  }, [dispatch])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold">Popular Flats</h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {!flats.length ? (
            <HomeCardShimmer />
          ) : (
            flats.slice(4, 12).map((flat) => <FlatCard key={flat._id} flat={flat} />)
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 mt-8"
        >
          {/* <h1 className="text-4xl font-bold">Popular Flats in Chandigarh</h1> */}
          <p className="text-4xl font-bold text-gray-700">Discover the best flats in Chandigarh</p>
          <p className="">See all</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {!flats.length ? (
            <HomeCardShimmer />
          ) : (
            flats
              .filter((flat) => flat.location?.toLowerCase() === "chandigarh")
              .slice(0, 4)
              .map((flat) => <FlatCard key={flat._id} flat={flat} />)
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 mt-8 "
        >
                 <p className="text-4xl font-bold text-gray-700">Discover the best flats in New Delhi</p>

        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {!flats.length ? (
            <HomeCardShimmer />
          ) : (
            flats
              .filter((flat) => flat.location?.toLowerCase() === "newdelhi")
              .slice(0, 4)
              .map((flat) => <FlatCard key={flat._id} flat={flat} />)
          )}
        </motion.div>
      </div>
      <Testimonial />
    </>
  )
}

export default HomePage
