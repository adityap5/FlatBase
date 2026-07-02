import { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { motion } from "framer-motion"
import { GET_POPULAR_CITIES, SEARCH_FLATS } from "../../services/queries"
import IndiaMap from "./IndiaMap"
import CityFlatList from "./CityFlatList"
import { Loader2 } from "lucide-react"

export default function MapExplorer() {
  const [selectedCity, setSelectedCity] = useState(null)

  const { 
    data: popularCitiesData, 
    loading: loadingCities, 
    error: errorCities 
  } = useQuery(GET_POPULAR_CITIES)

  const [searchFlats, { data: flatsData, loading: loadingFlats, error: errorFlats }] = useLazyQuery(SEARCH_FLATS)

  const handleCitySelect = (cityName) => {
    // If clicking same city, do nothing or refetch. We'll just set it.
    if (selectedCity === cityName) return
    setSelectedCity(cityName)
    searchFlats({ variables: { location: cityName } })
  }

  const flats = flatsData?.searchFlats || []

  if (loadingCities) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-on-surface-variant gap-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="font-body text-sm font-bold tracking-widest uppercase">Loading Explorer Map...</span>
      </div>
    )
  }

  if (errorCities) {
    return (
      <div className="p-8 text-center text-error bg-error/10 border border-error/20 rounded-3xl">
        <p className="font-bold font-body">{errorCities.message || "Failed to load map data."}</p>
      </div>
    )
  }

  const popularCities = popularCitiesData?.popularCities || []

  return (
    <div className={`flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-[1440px] mx-auto min-h-[50vh] ${!selectedCity ? 'justify-center items-center' : 'items-start'}`}>
      {/* Map Column */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ layout: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
        className={`flex-shrink-0 sticky top-28 ${
          selectedCity 
            ? "w-full md:w-[50%] lg:w-[60%] h-[400px] md:h-[500px] lg:h-[700px]" 
            : "w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-[350px] md:h-[500px] lg:h-[600px]"
        }`}
      >
        <IndiaMap 
          popularCities={popularCities}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
        />
        {!selectedCity && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center font-body text-on-surface-variant font-bold tracking-widest uppercase text-xs mt-6"
          >
            Select a pin to explore luxury stays
          </motion.p>
        )}
      </motion.div>

      {/* Flats Column */}
      {selectedCity && (
        <motion.div 
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex-1 min-w-0"
        >
          <CityFlatList 
            flats={flats}
            loading={loadingFlats}
            error={errorFlats}
            selectedCity={selectedCity}
          />
        </motion.div>
      )}
    </div>
  )
}
