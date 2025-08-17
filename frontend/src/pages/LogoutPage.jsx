"use client"

import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { LogOut, Home, ArrowRight } from "lucide-react"
import Button from "../components/Button"

const LogoutPage = () => {
  const navigate = useNavigate();

  // Auto-redirect to home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true })
    }, 7000) 

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-100"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="bg-gradient-to-br from-red-100 to-red-50 p-5 rounded-full shadow-sm">
            <LogOut size={50} className="text-red-500" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-gray-800"
        >
          Successfully Logged Out
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 text-lg mb-6"
        >
          Thank you for using our platform. We hope to see you again soon!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-gray-500 mb-8"
        >
          You&apos;ll be redirected to the home page in 5 seconds...
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" className="block">
            <Button
              name={
                <div className="flex items-center justify-center">
                  <Home size={18} className="mr-2" />
                  <span>Go to Home</span>
              </div>
            }
          
            css="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 transition-all duration-200"
            />
            </Link>
          <Link to="/login" className="block">
            <Button
              name={
                <div className="flex items-center justify-center">
                  <ArrowRight size={18} className="mr-2" />
                  <span>Login Again</span>
                </div>
              }
              
              css="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 transition-all duration-200"
            />
          </Link>
        </motion.div>

        {/* Progress bar for 5-second auto-redirect */}
        <motion.div
          className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-blue-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LogoutPage