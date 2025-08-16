"use client"

import { useEffect, useState } from "react"
import { getMyListings, deleteListing } from "../graphql/queries"
import { useNavigate, Link } from "react-router-dom"
import { MapPin, Users, DollarSign, Pencil, Trash2, Plus, AlertCircle } from "lucide-react"
import Modal from "../components/Modal"

function MyListings() {
  const [listings, setListings] = useState([])
  const [selectedListingId, setSelectedListingId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
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
        console.log("Fetched listings:", listings) // Debug log
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500">Loading your listings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">My Listings</h1>
          <p className="text-gray-500 mt-1">Manage your properties</p>
        </div>

        <Link to="/add-flat">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors">
            <Plus size={16} />
            Add Property
          </button>
        </Link>
      </div>

      {error && (
        <div className="mb-8 p-4 border border-red-200 bg-red-50 text-red-700 text-sm">
          <div className="flex items-start gap-2">
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

      {listings.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {listings.map((listing) => (
            <div key={listing._id} className="border border-gray-200 bg-white">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <Link to={`/flat/${listing._id}`}>
                    <h2 className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-1">
                      {listing.name || "Unnamed Property"}
                    </h2>
                  </Link>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1">Active</span>
                </div>

                {listing.images && (
                  <div className="mb-3 h-32 bg-gray-100 overflow-hidden">
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

                <div className="mb-4 text-xs text-gray-600">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 flex-1 min-w-0">
                      <MapPin size={12} />
                      <span className="truncate">{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{listing.capacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign size={12} />
                    <span className="font-medium">₹{listing.price?.toLocaleString()}/mo</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/updatePage/${listing._id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-1 px-2 py-1.5 border border-gray-300 text-gray-700 text-xs hover:bg-gray-50 transition-colors">
                      <Pencil size={12} />
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => openModal(listing._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border border-red-300 text-red-700 text-xs hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          /* Simplified empty state */
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <div className="w-12 h-12 border-2 border-gray-200 rounded mx-auto mb-4"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-500 mb-6">Add your first property to get started</p>
            <Link to="/add-flat">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors mx-auto">
                <Plus size={16} />
                Add Property
              </button>
            </Link>
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
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
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
