"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { GET_FLATS } from "../graphql/queries"
import FlatCard from "../components/FlatCard"
import HomeCardShimmer from "../components/HomeCardShimmer"
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react"

const Category = () => {
  const { data, loading, error } = useQuery(GET_FLATS)
  const [sortedFlats, setSortedFlats] = useState([])
  const [displayedFlats, setDisplayedFlats] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  })
  
  const observerRef = useRef()
  const ITEMS_PER_PAGE = 8

  // Whenever data changes, update sortedFlats
  useEffect(() => {
    if (data?.flats) {
      setSortedFlats(data.flats)
    }
  }, [data])

  // Filter and sort flats whenever filters or data change
  useEffect(() => {
    if (!data?.flats) return

    let filtered = [...data.flats]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (flat) =>
          flat.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          flat.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          flat.description?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Price range filter (handle null prices)
    if (filters.minPrice) {
      filtered = filtered.filter((flat) => (flat.price || 0) >= Number.parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((flat) => (flat.price || 0) <= Number.parseInt(filters.maxPrice))
    }

    // Sorting
    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
    } else if (filters.sortBy === "location") {
      filtered.sort((a, b) => (a.location || '').localeCompare(b.location || ''))
    }

    setSortedFlats(filtered)
    setCurrentPage(1) // Reset pagination when filters change
  }, [filters, data])

  // Update displayed flats when sortedFlats or currentPage changes
  useEffect(() => {
    const startIndex = 0
    const endIndex = currentPage * ITEMS_PER_PAGE
    const newDisplayedFlats = sortedFlats.slice(startIndex, endIndex)
    
    setDisplayedFlats(newDisplayedFlats)
    setHasMore(endIndex < sortedFlats.length)
  }, [sortedFlats, currentPage])

  // Load more flats
  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return
    
    setIsLoadingMore(true)
    
    // Simulate loading delay (remove this in production if not needed)
    setTimeout(() => {
      setCurrentPage(prev => prev + 1)
      setIsLoadingMore(false)
    }, 500)
  }, [hasMore, isLoadingMore])

  // Intersection Observer for infinite scroll
  const lastFlatElementRef = useCallback((node) => {
    if (loading || isLoadingMore) return
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px' // Start loading 100px before the element comes into view
    })
    
    if (node) observerRef.current.observe(node)
  }, [loading, isLoadingMore, hasMore, loadMore])

  const clearFilters = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
    })
  }

  const hasActiveFilters = filters.search || filters.minPrice || filters.maxPrice || filters.sortBy !== "newest"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error fetching flats: {error.message}</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">All Properties</h1>
          <div className="text-sm text-gray-600">
            {loading ? (
              "Loading properties..."
            ) : (
              <>
                Showing {displayedFlats.length} of {sortedFlats.length} {sortedFlats.length === 1 ? "property" : "properties"}
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search location or name..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
              />
            </div>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent appearance-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="location">Location (A-Z)</option>
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-4 py-2 text-[#76ABAE] border border-[#76ABAE] rounded-lg hover:bg-[#76ABAE] hover:text-white transition-colors"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <HomeCardShimmer key={index} />
          ))}
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {displayedFlats.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {hasActiveFilters ? "No properties match your filters." : "No properties found."}
                </p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="mt-4 text-[#76ABAE] hover:underline">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              displayedFlats.map((flat, index) => {
                // Add ref to the last element for intersection observer
                const isLastElement = index === displayedFlats.length - 1
                return (
                  <motion.div
                    key={flat._id}
                    variants={itemVariants}
                    ref={isLastElement ? lastFlatElementRef : null}
                  >
                    <FlatCard flat={flat} />
                  </motion.div>
                )
              })
            )}
          </motion.div>

          {/* Loading More Indicator */}
          {isLoadingMore && (
            <div className="flex justify-center items-center py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-[#76ABAE]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Loader2 size={20} />
                </motion.div>
                <span>Loading more properties...</span>
              </motion.div>
            </div>
          )}

          {/* Load More Button (fallback for users who prefer clicking) */}
          {!isLoadingMore && hasMore && displayedFlats.length >= ITEMS_PER_PAGE && (
            <div className="text-center py-8">
              <motion.button
                onClick={loadMore}
                className="px-6 py-3 bg-[#76ABAE] text-white rounded-lg hover:bg-[#5a8a8d] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Properties
              </motion.button>
            </div>
          )}

          {/* End Message */}
          {!hasMore && displayedFlats.length > ITEMS_PER_PAGE && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <p>You&apos;ve reached the end of all properties!</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

export default Category