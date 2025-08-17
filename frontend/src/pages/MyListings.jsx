"use client"

import { useEffect, useState } from "react"
import { getMyListings, deleteListing } from "../graphql/queries"
import { useNavigate, Link } from "react-router-dom"
import { MapPin, Users, DollarSign, Pencil, Trash2, Plus, AlertCircle, Search, Filter } from "lucide-react"
import Modal from "../components/Modal"

function MyListings() {
  const [listings, setListings] = useState([])
  const [selectedListingId, setSelectedListingId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        const sellerId = localStorage.getItem("userId")

        if (!sellerId) {
          setError("Please login to view your listings.")
          setLoading(false)
          return
        }

        const listings = await getMyListings(sellerId)
       
        setListings(listings || [])
        setError(null)
      } catch (error) {
        console.error("Failed to fetch listings:", error)
        setError("Failed to load your listings. Please try again.")
        setListings([])
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const handleDelete = async () => {
    if (selectedListingId) {
      try {
        setIsDeleting(true)
        await deleteListing(selectedListingId)
        setListings((prevListings) => prevListings.filter((listing) => listing._id !== selectedListingId))
        setIsOpen(false)
        setSelectedListingId(null)
        setError(null)
      } catch (error) {
        console.error("Failed to delete listing:", error)
        setError("Failed to delete listing. Please try again.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const openModal = (id) => {
    setSelectedListingId(id)
    setIsOpen(true)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
    })
  }

  const filteredListings = listings
    .filter((listing) => {
      const matchesLocation =
        !filters.location || listing.location?.toLowerCase().includes(filters.location.toLowerCase())

      const matchesMinPrice = !filters.minPrice || (listing.price && listing.price >= Number.parseInt(filters.minPrice))

      const matchesMaxPrice = !filters.maxPrice || (listing.price && listing.price <= Number.parseInt(filters.maxPrice))

      return matchesLocation && matchesMinPrice && matchesMaxPrice
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0)
        case "price-high":
          return (b.price || 0) - (a.price || 0)
        case "capacity":
          return (b.capacity || 0) - (a.capacity || 0)
        case "newest":
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }
    })

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500 text-sm">Loading your listings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">My Properties</h1>
          <p className="text-gray-500 mt-1">Manage your listings</p>
        </div>

        <Link to="/add-flat">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#76ABAE] text-white text-sm rounded-lg hover:bg-[#76ABAE]/90 transition-colors">
            <Plus size={16} />
            Add Property
          </button>
        </Link>
      </div>

      <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-[#76ABAE]" />
          <h3 className="font-medium text-gray-900">Filters</h3>
          <span className="text-sm text-gray-500">({filteredListings.length} properties)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search location..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#76ABAE] transition-colors"
            />
          </div>

          <input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#76ABAE] transition-colors"
          />

          <input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#76ABAE] transition-colors"
          />

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#76ABAE] transition-colors"
          >
            <option value="newest">Newest first</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="capacity">Capacity</option>
          </select>
        </div>

        {(filters.location || filters.minPrice || filters.maxPrice || filters.sortBy !== "newest") && (
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-[#76ABAE] hover:text-[#76ABAE]/80 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {error && (
        <div className="mb-8 p-4 border-l-4 border-red-400 bg-red-50 text-red-700 text-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <div>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="underline mt-1 hover:no-underline">
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#76ABAE]/30 transition-colors"
            >
              {listing.images && (
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={listing.images || "/placeholder.svg"}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none"
                    }}
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <Link to={`/flat/${listing._id}`}>
                    <h2 className="font-medium text-gray-900 hover:text-[#76ABAE] transition-colors line-clamp-1">
                      {listing.name || "Unnamed Property"}
                    </h2>
                  </Link>
                  <span className="text-xs text-[#76ABAE] bg-[#76ABAE]/10 px-2 py-1 rounded-full">Active</span>
                </div>

                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#76ABAE]" />
                    <span className="truncate">{listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#76ABAE]" />
                      <span>{listing.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium text-gray-900">
                      <DollarSign size={14} />
                      <span>₹{listing.price?.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/updatePage/${listing._id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                      <Pencil size={14} />
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => openModal(listing._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-16">
            {listings.length > 0 ? (
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matching properties</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-[#76ABAE] text-white text-sm rounded-lg hover:bg-[#76ABAE]/90 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                <p className="text-gray-500 mb-6">Add your first property to get started</p>
                <Link to="/add-flat">
                  <button className="flex items-center gap-2 px-6 py-2 bg-[#76ABAE] text-white text-sm rounded-lg hover:bg-[#76ABAE]/90 transition-colors mx-auto">
                    <Plus size={16} />
                    Add Property
                  </button>
                </Link>
              </div>
            )}
          </div>
        )
      )}

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <h2 className="text-lg font-medium flex items-center gap-2">
            <AlertCircle size={18} className="text-red-500" />
            Delete Property
          </h2>
        }
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        }
      >
        <div className="text-gray-700 text-sm">
          <p className="mb-2">Are you sure you want to delete this property?</p>
          <p className="text-gray-500">This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  )
}

export default MyListings
