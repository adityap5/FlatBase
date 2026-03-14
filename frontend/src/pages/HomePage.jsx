import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import FlatCard from "../components/FlatCard"
import HomeCardShimmer from "../components/HomeCardShimmer"
import { useDispatch, useSelector } from "react-redux"
import { fetchFlats, fetchFlatsByLocation } from "../redux/flatsSlice"
import Banner from "./Banner"
import Testimonial from "./Testimonial"
import { useNavigate } from "react-router-dom"
import { getPopularFlats, getPopularCities } from "../graphql/queries"
import { TrendingUp, MapPin } from "lucide-react"

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = localStorage.getItem("role")
  
  const [popularFlats, setPopularFlats] = useState([])
  const [popularCities, setPopularCities] = useState([])
  const [loadingPopular, setLoadingPopular] = useState(true)

  const handleSeeAll = (loc) => {
    dispatch(fetchFlatsByLocation(loc))
    navigate(`/search?location=${loc}`)
  }
  
  const { flats, loading } = useSelector((state) => state.flats)

  useEffect(() => {
    if (role === "seller") {
      navigate("/seller/dashboard")
      return
    }

    dispatch(fetchFlats())
    
    // Fetch popular flats and cities
    const fetchPopular = async () => {
      try {
        const [flatsRes, citiesRes] = await Promise.all([
          getPopularFlats(),
          getPopularCities()
        ])
        setPopularFlats(flatsRes.data?.popularFlats || [])
        setPopularCities(citiesRes.data?.popularCities || [])
      } catch (err) {
        console.error("Failed to fetch popular items:", err)
      } finally {
        setLoadingPopular(false)
      }
    }
    fetchPopular()
  }, [dispatch])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-12 space-y-20">
        
        {/* Popular Cities Section */}
        {popularCities && popularCities.length > 0 && (
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl">
                <MapPin size={24} className="text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                Trending Destinations
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularCities.map((cityData) => (
                <motion.div
                  key={cityData.city}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => handleSeeAll(cityData.city)}
                  className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                >
                  <img src={cityData.image} alt={cityData.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{cityData.city}</h3>
                    <p className="text-white/80 flex items-center gap-2">
                       <TrendingUp size={16} className="text-emerald-400" /> {cityData.count} recent bookings
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Popular Flats Section */}
        {popularFlats && popularFlats.length > 0 && (
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-red-50 rounded-xl">
                <TrendingUp size={24} className="text-red-500" />
               </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                Most Booked Properties
              </h2>
            </motion.div>
            
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularFlats.slice(0, 4).map((flat) => <FlatCard key={`pop-${flat._id}`} flat={flat} />)}
            </motion.div>
          </section>
        )}

        {/* All Flats / Recently Added */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Recently Added</h2>
            <button onClick={() => navigate('/search')} className="text-[#76ABAE] font-medium hover:underline">View All</button>
          </motion.div>
  
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? <HomeCardShimmer /> : (flats || []).slice(0, 8).map((flat) => <FlatCard key={flat._id} flat={flat} />)}
          </motion.div>
        </section>

      </div>
      <Testimonial />
    </>
  )
}

export default HomePage