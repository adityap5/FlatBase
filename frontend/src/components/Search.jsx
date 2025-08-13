"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SearchIcon } from 'lucide-react'
import { fetchFlatsByLocation } from "../redux/flatsSlice"
import Button from "./Button"

const Search = ({ css }) => {
  const [location, setLocation] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle typing detection
  useEffect(() => {
    if (location) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 1000) // Stop considering "typing" after 1 second of no changes

      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [location])

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

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <motion.form onSubmit={handleSearch} className={`${css} relative`}>
      <div className="relative flex items-center">
        {/* Glow effect container - only active when not typing */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            !isTyping && !isFocused 
              ? 'bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-sm animate-pulse' 
              : ''
          }`}
        />
        
        {/* Static glow for focus state */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isFocused && !isTyping
              ? 'bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-md' 
              : ''
          }`}
        />

        <div className="absolute left-4 z-10">
          <SearchIcon 
            size={20} 
            className={`transition-colors duration-300 ${
              isFocused ? 'text-blue-500' : 'text-black'
            }`}
          />
        </div>

        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search by location (e.g., Mumbai, Delhi)"
          className={`
            relative z-10 w-full py-3 pl-12 pr-24 
            bg-white/90 backdrop-blur-sm rounded-full 
            text-gray-700 placeholder-gray-400
            border-2 transition-all duration-300
            focus:outline-none focus:bg-white/95
            ${isFocused 
              ? 'border-blue-400/50 shadow-lg shadow-blue-500/20' 
              : 'border-gray-200/50 shadow-lg'
            }
            ${isTyping 
              ? 'border-gray-300 shadow-md' 
              : ''
            }
          `}
        />

        {/* <div className="absolute right-2 z-10">
          <Button type="submit" name="Search" css="rounded-full" />
        </div> */}
      </div>
    </motion.form>
  )
}

export default Search
