"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"

export function Logout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")  
    
    navigate("/logout")
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200"
    >
      <LogOut size={18} className="mr-1" />
      <span>Logout</span>
    </motion.button>
  )
}