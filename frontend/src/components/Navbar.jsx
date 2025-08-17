"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, NavLink } from "react-router-dom"
import { Menu, X, Home, LogOut, User, BookOpen, Building, Plus, MountainIcon } from "lucide-react"
import { Logout } from "../components/Logout"

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const token = localStorage.getItem("token")
  const isSeller = localStorage.getItem("role") === "seller"
  const isBuyer = localStorage.getItem("role") === "customer"
  const navigate = useNavigate()

  const handleHome = () => {
    navigate("/")
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  const navItems = [
    {
      name: "Explore",
      path: "/category",
      icon: <MountainIcon size={18} />,
      show: true,
    },
    {
      name: "Register",
      path: "/register",
      icon: <User size={18} />,
      show: !token,
    },
    {
      name: "Login",
      path: "/login",
      icon: <LogOut size={18} />,
      show: !token,
    },
    {
      name: "My Listings",
      path: "/mylistings",
      icon: <Building size={18} />,
      show: isSeller,
    },
    {
      name: "My Bookings",
      path: "/bookings",
      icon: <BookOpen size={18} />,
      show: isBuyer,
    },
    {
      name: "Add Property",
      path: "/add-flat",
      icon: <Plus size={18} />,
      show: isSeller,
    },
  ]

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-gray-800 rounded-xl mt-2 shadow-md"
    >
      <div className="flex justify-between items-center px-4 py-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center cursor-pointer"
          onClick={handleHome}
        >
          <div className="bg-[#76ABAE] text-white p-2 rounded-lg mr-3">
            <Home size={20} />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#76ABAE] to-[#5B8D91] bg-clip-text text-transparent">
            FlatBase
          </h1>
        </motion.div>

        <div className="md:hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDrawer(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </motion.button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navItems
            .filter((item) => item.show)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#76ABAE] font-medium flex items-center"
                    : "text-gray-600 hover:text-[#76ABAE] transition-colors duration-200 flex items-center"
                }
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          {token && <Logout />}
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold text-[#76ABAE]">Menu</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDrawer(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col space-y-1 px-4">
                  {navItems
                    .filter((item) => item.show)
                    .map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={toggleDrawer(false)}
                        className={({ isActive }) =>
                          `${
                            isActive ? "bg-[#76ABAE]/10 text-[#76ABAE]" : "text-gray-700 hover:bg-gray-100"
                          } flex items-center px-4 py-3 rounded-lg transition-colors duration-200`
                        }
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </NavLink>
                    ))}
                  {token && (
                    <div onClick={toggleDrawer(false)}>
                      <Logout />
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {drawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleDrawer(false)}
        />
      )}
    </motion.div>
  )
}

export default Navbar
