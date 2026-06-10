"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { SlidersHorizontal, ArrowUpDown, Search, MapPin } from "lucide-react"
import FlatCard from "../components/FlatCard"
import HomeCardShimmer from "../components/HomeCardShimmer"
import { fetchFlats, fetchFlatsByLocation } from "../redux/flatsSlice"

const SearchResultsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { flats, loading } = useSelector((state) => state.flats)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchLocation = searchParams.get("location")

  const [sortedFlats, setSortedFlats] = useState([])
  const [sortOption, setSortOption] = useState("select")

  useEffect(() => {
    if (searchLocation) {
      dispatch(fetchFlatsByLocation(searchLocation))
    } else {
      dispatch(fetchFlats())
    }
  }, [dispatch, searchLocation])

  useEffect(() => {
    if (flats && flats.length > 0) {
      setSortedFlats([...flats])
    } else {
      setSortedFlats([])
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
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 min-h-[75vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
      >
        <div className="mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20 mr-4 shadow-[0_0_15px_rgba(0,245,255,0.05)]">
              <Search size={22} className="text-primary text-glow animate-pulse" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-on-background">Search Results</h1>
          </div>
          <div className="flex items-center mt-3 text-on-surface-variant font-body text-sm opacity-80">
            <MapPin size={15} className="mr-2 text-primary" />
            <p>
              Showing properties in <span className="font-bold text-on-background">{searchLocation || "All Locations"}</span>
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center bg-surface/50 backdrop-blur-md border border-glass-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors duration-300">
            <div className="px-4 py-3 border-r border-glass-border flex items-center justify-center">
              <SlidersHorizontal size={16} className="text-primary" />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-surface text-on-background py-3 pl-3 pr-10 focus:outline-none font-body text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <option value="select" className="bg-[#08080f] text-on-background">Sort By</option>
              <option value="price-low" className="bg-[#08080f] text-on-background">Price: Low to High</option>
              <option value="price-high" className="bg-[#08080f] text-on-background">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute right-4 flex items-center text-primary">
              <ArrowUpDown size={14} />
            </div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <HomeCardShimmer />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          {sortedFlats.length > 0 ? (
            sortedFlats.map((flat) => <FlatCard key={flat._id} flat={flat} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-20 motionsite-card rounded-3xl border border-glass-border p-8 max-w-2xl mx-auto"
            >
              <div className="inline-block p-5 rounded-full bg-primary/10 border border-primary/20 mb-6 shadow-[0_0_20px_rgba(0,245,255,0.05)]">
                <Search size={42} className="text-primary text-glow" />
              </div>
              <h3 className="font-display text-2xl font-bold text-on-background mb-3">No sanctuaries found</h3>
              <p className="text-on-surface-variant font-body text-sm opacity-70 max-w-md mx-auto leading-relaxed mb-6">
                We couldn&apos;t find any properties matching &quot;{searchLocation}&quot;. Try a different location or browse all properties.
              </p>
              <button
                onClick={() => navigate("/category")}
                className="bg-primary text-on-primary px-6 py-3 rounded-xl font-body font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all active:scale-[0.98]"
              >
                Browse All Properties
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SearchResultsPage
