import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import FlatCard from "../components/FlatCard"
import HomeCardShimmer from "../components/HomeCardShimmer"
import { useDispatch, useSelector } from "react-redux"
import { fetchFlats, fetchFlatsByLocation } from "../redux/flatsSlice"
import Banner from "./Banner"
import Testimonial from "./Testimonial"
import { useNavigate, Link } from "react-router-dom"
import { getPopularFlats, getPopularCities } from "../graphql/queries"
import { TrendingUp, MapPin, Star } from "lucide-react"

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

  // Bento layout data slices
  const featuredFlat = flats && flats.length > 0 ? flats[0] : null
  const sideFlats = flats && flats.length > 1 ? flats.slice(1, 3) : []
  const remainingFlats = flats && flats.length > 3 ? flats.slice(3, 7) : []

  return (
    <div className="w-full flex flex-col bg-background text-on-background">
      {/* Hero Banner */}
      <Banner />

      {/* Content wrapper with custom margins */}
      <div className="w-full flex flex-col space-y-20 md:space-y-28">
        
        {/* Popular Cities Section (Trending Destinations) */}
        {popularCities && popularCities.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-4 md:px-10 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <TrendingUp size={24} className="text-glow" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-on-background">
                Trending Destinations
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {popularCities.slice(0, 3).map((cityData) => (
                <motion.div
                  key={cityData.city}
                  whileHover={{ y: -5, scale: 1.01 }}
                  onClick={() => handleSeeAll(cityData.city)}
                  className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-glass-border/30"
                >
                  <img 
                    src={cityData.image} 
                    alt={cityData.city} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent flex flex-col justify-end p-8">
                    <h3 className="font-display text-2xl font-bold text-on-background mb-2 group-hover:text-primary transition-colors duration-300">
                      {cityData.city}
                    </h3>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Star size={14} className="text-secondary fill-secondary" />
                      <span className="font-body text-xs font-bold uppercase tracking-widest opacity-80">
                        {cityData.count} recent bookings
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Popular Flats Section (Most Booked Properties) */}
        {popularFlats && popularFlats.length > 0 && (
          <section className="bg-surface-container-lowest py-16 w-full">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                  <Star size={24} className="fill-secondary animate-pulse" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-on-background">
                  Most Booked Properties
                </h2>
              </motion.div>
              
              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter"
              >
                {popularFlats.slice(0, 4).map((flat) => (
                  <FlatCard key={`pop-${flat._id}`} flat={flat} />
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* All Flats / Bento Layout Section */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-10 w-full">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-body text-xs text-primary font-bold tracking-[0.2em] block mb-2 uppercase">
                LATEST COLLECTIONS
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-on-background">
                Recently Added
              </h2>
            </div>
            <button 
              onClick={() => navigate('/search')} 
              className="text-primary hover:underline font-body font-bold text-sm tracking-wide uppercase transition-all"
            >
              View All
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter">
              <HomeCardShimmer />
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {/* Bento Grid */}
              {featuredFlat && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[600px]">
                  {/* Large Featured Card */}
                  <div className="md:col-span-8 h-80 md:h-full motionsite-card rounded-3xl overflow-hidden relative group border border-glass-border">
                    <img 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      src={featuredFlat.images} 
                      alt={featuredFlat.name} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                      <span className="bg-secondary text-on-secondary px-4 py-1.5 rounded-full font-body text-[10px] font-bold tracking-widest uppercase mb-4 inline-block shadow-md">
                        FEATURED SUITE
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl text-on-background mb-4 leading-tight">
                        Rooms in {featuredFlat.location}
                      </h3>
                      <p className="text-on-surface-variant font-body text-sm md:text-base max-w-xl mb-6 opacity-90 line-clamp-2 leading-relaxed">
                        {featuredFlat.description}
                      </p>
                      <Link to={`/flat/${featuredFlat._id}`}>
                        <button className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-wider hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all">
                          Explore Suite
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Side Small Cards */}
                  <div className="md:col-span-4 flex flex-col gap-8 h-full">
                    {sideFlats.map((flat) => (
                      <div key={flat._id} className="flex-grow h-60 md:h-1/2 motionsite-card rounded-3xl overflow-hidden relative group border border-glass-border">
                        <img 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          src={flat.images} 
                          alt={flat.name} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                          <h4 className="font-display text-xl text-on-background mb-1">
                            Rooms in {flat.location}
                          </h4>
                          <p className="text-on-surface-variant text-xs font-body opacity-80 mb-4 flex items-center gap-1">
                            <MapPin size={12} className="text-primary" /> {flat.location}
                          </p>
                          <Link 
                            to={`/flat/${flat._id}`}
                            className="text-primary hover:underline text-xs font-body font-bold tracking-wider uppercase"
                          >
                            View Details &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Remaining Cards List */}
              {remainingFlats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter mt-8">
                  {remainingFlats.map((flat) => (
                    <FlatCard key={flat._id} flat={flat} />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Testimonials */}
        <Testimonial />
      </div>
    </div>
  )
}

export default HomePage