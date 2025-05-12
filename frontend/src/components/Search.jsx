"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import { fetchFlatsByLocation } from "../redux/flatsSlice"
import Button from "./Button"

const Search = ({ css }) => {
  const [location, setLocation] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (location.trim()) {
      dispatch(fetchFlatsByLocation(location))
      navigate(`/search?location=${location}`)
    }
  }

  return (
    <motion.form onSubmit={handleSearch} className={`${css} relative`}>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <SearchIcon size={20} />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location (e.g., Mumbai, Delhi)"
          className="w-full py-3 pl-12 pr-24 bg-white rounded-full shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
        />
        <div className="absolute right-2">
          <Button type="submit" name="Search" css="py-2 px-6 rounded-full" />
        </div>
      </div>
    </motion.form>
  )
}

export default Search
