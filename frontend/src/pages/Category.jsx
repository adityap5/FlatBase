"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { GET_FLATS } from "../graphql/queries"
import FlatCard from "../components/FlatCard"
import HomeCardShimmer from "../components/HomeCardShimmer"
import { SlidersHorizontal, ArrowUpDown } from "lucide-react"

const Category = () => {
  const { data, loading, error } = useQuery(GET_FLATS)
  const [sortedFlats, setSortedFlats] = useState([])
  const [sortOption, setSortOption] = useState("select")

  // Whenever data changes, update sortedFlats
  useEffect(() => {
    if (data?.flats) {
      setSortedFlats(data.flats)
    }
  }, [data])

  // Handle sorting functionality
  useEffect(() => {
    if (!data?.flats) return

    const sorted = [...data.flats]

    if (sortOption === "price-low") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortOption === "location") {
      sorted.sort((a, b) => a.location.localeCompare(b.location))
    }

    setSortedFlats(sorted)
  }, [sortOption, data])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error fetching flats: {error.message}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4 md:mb-0">All Properties</h1>

        <div className="relative">
          <div className="flex items-center bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-3 py-2 border-r">
              <SlidersHorizontal size={18} className="text-gray-500" />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-transparent py-2 pl-2 pr-8 focus:outline-none text-gray-700"
            >
              <option value="select">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="location">Location (A-Z)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ArrowUpDown size={16} />
            </div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <HomeCardShimmer />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {sortedFlats.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No properties found.</p>
            </div>
          ) : (
            sortedFlats.map((flat) => <FlatCard key={flat._id} flat={flat} />)
          )}
        </motion.div>
      )}
    </div>
  )
}

export default Category
