import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { GET_FLATS } from "../services/queries"
import FlatCard from "../components/cards/FlatCard"
import HomeCardShimmer from "../components/skeletons/HomeCardShimmer"
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

  useEffect(() => {
    if (data?.flats) {
      setSortedFlats(data.flats)
    }
  }, [data])

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
    setCurrentPage(1)
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
      rootMargin: '100px'
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-error/15 border border-error/25 text-error p-6 rounded-3xl max-w-md motionsite-card">
          <h2 className="font-display text-xl font-bold mb-2">Error Loading Sanctuaries</h2>
          <p className="text-sm opacity-80 leading-relaxed font-body">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto py-12 px-4 md:px-10 min-h-[80vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-on-background">All Sanctuaries</h1>
            <p className="text-on-surface-variant font-body text-sm mt-2 opacity-75">Explore our handpicked collection of luxury stays</p>
          </div>
          <div className="text-xs font-body font-bold text-on-surface-variant uppercase tracking-wider bg-surface/50 border border-glass-border px-4 py-2 rounded-full">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={12} className="animate-spin text-primary" />
                Querying repository...
              </span>
            ) : (
              <>
                Showing {displayedFlats.length} of {sortedFlats.length} {sortedFlats.length === 1 ? "stay" : "stays"}
              </>
            )}
          </div>
        </div>

        <div className="motionsite-card rounded-3xl p-6 border border-glass-border shadow-2xl bg-surface/40 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
              <input
                type="text"
                placeholder="Search location or name..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="w-full pl-11 pr-4 py-3 bg-surface/60 border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
              />
            </div>

            {/* Price Range */}
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                className="w-full px-4 py-3 bg-surface/60 border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
              />
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full px-4 py-3 bg-surface/60 border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
              />
            </div>

            {/* Sort */}
            <div className="relative group">
              <SlidersHorizontal
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary"
                size={16}
              />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                className="w-full pl-11 pr-10 py-3 bg-surface/60 border border-glass-border rounded-2xl text-on-background focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all appearance-none cursor-pointer"
              >
                <option value="newest" className="bg-[#08080f] text-on-background">Newest First</option>
                <option value="price-low" className="bg-[#08080f] text-on-background">Price: Low to High</option>
                <option value="price-high" className="bg-[#08080f] text-on-background">Price: High to Low</option>
                <option value="location" className="bg-[#08080f] text-on-background">Location (A-Z)</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-center">
              {hasActiveFilters ? (
                <button
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-secondary border border-secondary/35 rounded-2xl bg-secondary/5 hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-all duration-300 font-body text-xs font-bold uppercase tracking-wider"
                >
                  <X size={14} />
                  Clear Filters
                </button>
              ) : (
                <div className="w-full h-full text-center text-[10px] text-on-surface-variant font-body font-semibold tracking-wider uppercase flex items-center justify-center opacity-40 border border-dashed border-glass-border rounded-2xl py-3">
                  Filters Active
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {displayedFlats.length === 0 ? (
              <div className="col-span-full text-center py-20 motionsite-card rounded-3xl border border-glass-border p-8 max-w-2xl mx-auto">
                <p className="text-on-surface-variant font-body text-sm mb-6 opacity-75">
                  {hasActiveFilters ? "No luxury stays match your filter criteria." : "No stays found in the repository."}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bg-primary text-on-primary px-6 py-3 rounded-xl font-body font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all active:scale-[0.98]"
                  >
                    Reset Filter Search
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
            <div className="flex justify-center items-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-surface/50 border border-glass-border px-6 py-3 rounded-full text-primary"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Loader2 size={16} />
                </motion.div>
                <span className="font-body text-xs font-bold tracking-wider uppercase">Loading more properties...</span>
              </motion.div>
            </div>
          )}

          {/* Load More Button (fallback for users who prefer clicking) */}
          {!isLoadingMore && hasMore && displayedFlats.length >= ITEMS_PER_PAGE && (
            <div className="text-center py-12">
              <motion.button
                onClick={loadMore}
                className="px-8 py-4 bg-primary text-on-primary rounded-2xl font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:brightness-110 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
              className="text-center py-12 text-on-surface-variant opacity-60 font-body text-xs font-bold tracking-widest uppercase"
            >
              <p>You&apos;ve reached the end of the collection</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

export default Category