"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { LogOut, Home, ArrowRight } from "lucide-react"
import Button from "../components/Button"

const LogoutPage = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleHome = () => {
    navigate("/")
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="bg-red-100 p-5 rounded-full">
            <LogOut size={50} className="text-red-500" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-gray-800"
        >
          You have been logged out
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 text-lg mb-8"
        >
          We hope to see you again soon!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            name={
              <div className="flex items-center">
                <Home size={18} className="mr-2" />
                <span>Go to Home</span>
              </div>
            }
            onClick={handleHome}
          />

          <Button
            name={
              <div className="flex items-center">
                <ArrowRight size={18} className="mr-2" />
                <span>Login Again</span>
              </div>
            }
            onClick={handleLogin}
            css="bg-blue-600 hover:bg-blue-700"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LogoutPage
