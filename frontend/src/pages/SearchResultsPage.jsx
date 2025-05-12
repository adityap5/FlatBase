"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { SlidersHorizontal, ArrowUpDown, Search, MapPin } from "lucide-react"
import FlatCard from "../components/FlatCard"
import HomeCardShimmer from "../components/HomeCardShimmer"

const SearchResultsPage = () => {
  const { flats, loading } = useSelector((state) => state.flats)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchLocation = searchParams.get("location")

  const [sortedFlats, setSortedFlats] = useState([])
  const [sortOption, setSortOption] = useState("select")

  useEffect(() => {
    if (flats && flats.length > 0) {
      setSortedFlats([...flats])
    }
  }, [flats])

  useEffect(() => {
    const sortFlats = () => {
      const sorted = [...flats]

      if (sortOption === "price-low") {
        sorted.sort((a, b) => a.price - b.price)
      } else if (sortOption === "price-high") {
        sorted.sort((a, b) => b.price - a.price)
      }

      setSortedFlats(sorted)
    }

    sortFlats()
  }, [sortOption, flats])

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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div className="mb-4 md:mb-0">
          <div className="flex items-center">
            <Search size={24} className="text-[#76ABAE] mr-3" />
            <h1 className="text-3xl font-bold">Search Results</h1>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin size={16} className="mr-1" />
            <p>
              Showing properties in <span className="font-medium">{searchLocation || "All Locations"}</span>
            </p>
          </div>
        </div>

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
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ArrowUpDown size={16} />
            </div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <HomeCardShimmer />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedFlats.length > 0 ? (
            sortedFlats.map((flat) => <FlatCard key={flat._id} flat={flat} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-16"
            >
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <Search size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500">
                We couldn't find any properties matching "{searchLocation}". Try a different location or browse all
                properties.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SearchResultsPage
