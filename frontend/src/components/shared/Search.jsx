import { useState } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SearchIcon } from 'lucide-react'
import { fetchFlatsByLocation } from "../../store/flatsSlice"

const Search = ({ css }) => {
  const [location, setLocation] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (location.trim()) {
      dispatch(fetchFlatsByLocation(location))
      navigate(`/search?location=${location}`)
    }
  }

  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }

  return (
    <motion.form 
      onSubmit={handleSearch} 
      className={`${css} relative z-10 max-w-3xl mx-auto`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`flex items-center motionsite-card rounded-full p-2 shadow-2xl transition-all duration-300 ${
          isFocused 
            ? 'border-primary/50 shadow-[0_0_30px_rgba(0,245,255,0.2)] scale-[1.01]' 
            : 'border-glass-border'
        }`}
      >
        <div className="flex-grow flex items-center px-4 md:px-6 gap-3 md:gap-4">
          <SearchIcon 
            size={18} 
            className={`transition-colors duration-300 ${
              isFocused ? 'text-primary' : 'text-on-surface-variant'
            }`}
          />
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search by location (e.g., Noida, Delhi)"
            className="bg-transparent border-none outline-none focus:outline-none focus:border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 w-full font-body text-sm text-white py-2"
          />
        </div>
        <button 
          type="submit" 
          className="bg-primary text-on-primary rounded-full px-6 md:px-8 py-3.5 font-body font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] hover:brightness-110 active:scale-95 transition-all duration-300"
        >
          Search
        </button>
      </div>
    </motion.form>
  )
}

export default Search
