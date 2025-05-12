"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { AlertTriangle, Home } from "lucide-react"
import Button from "./Button"

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-red-100 p-6 rounded-full inline-block">
          <AlertTriangle size={60} className="text-red-500" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl md:text-7xl font-bold mb-4 text-gray-800"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-600 max-w-md mb-8"
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/">
          <Button
            name={
              <div className="flex items-center">
                <Home size={18} className="mr-2" />
                <span>Back to Home</span>
              </div>
            }
          />
        </Link>
      </motion.div>
    </div>
  )
}

export default Error404
