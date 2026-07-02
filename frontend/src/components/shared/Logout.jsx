
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { clearAuthData } from "../../utils/auth"
import { LogOut } from "lucide-react"

export function Logout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    
    clearAuthData();
    
    navigate("/logout")
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleLogout}
      className="flex items-center text-on-surface-variant hover:text-error transition-colors duration-300 font-body text-xs font-bold uppercase tracking-wider gap-1.5"
    >
      <LogOut size={14} className="text-glow-purple" />
      <span>Logout</span>
    </motion.button>
  )
}