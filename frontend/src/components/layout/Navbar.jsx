import { useState, useEffect, useMemo, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, NavLink } from "react-router-dom"
import { Menu, X, Compass, User, LayoutDashboard, BookOpen } from "lucide-react"
import { Logout } from "../../components/shared/Logout"

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = useMemo(
    () => [
      {
        name: "Destinations",
        path: "/category",
        icon: <Compass size={16} />,
        show: !isSeller,
      },
      {
        name: "Register",
        path: "/register",
        icon: <User size={16} />,
        show: !token,
      },
      {
        name: "Dashboard",
        path: "/seller/dashboard",
        icon: <LayoutDashboard size={16} />,
        show: isSeller,
      },
      {
        name: "My Bookings",
        path: "/bookings",
        icon: <BookOpen size={16} />,
        show: isBuyer,
      },
    ],
    [token, isSeller, isBuyer]
  )

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 border rounded-full ${
          isScrolled 
            ? "py-3 bg-surface/90 backdrop-blur-[25px] border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]" 
            : "py-5 bg-glass-white backdrop-blur-[15px] border-glass-border shadow-sm"
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 md:px-8 h-10">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center cursor-pointer gap-2"
            onClick={handleHome}
          >
            <span className="font-display text-xl font-bold tracking-widest text-on-background hover:text-primary transition-colors duration-300 text-glow">
              FLATBASE
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-1 font-body text-xs tracking-wider uppercase transition-all"
                      : "text-on-surface-variant hover:text-on-background transition-colors duration-300 font-body text-xs tracking-wider uppercase"
                  }
                >
                  <div className="flex items-center gap-1.5">
                    {item.name}
                  </div>
                </NavLink>
              ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="hidden md:block">
                <Logout />
              </div>
            ) : (
              <button 
                onClick={() => navigate("/login")}
                className="hidden md:block bg-primary text-on-primary px-5 py-2 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-95 transition-all duration-300"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDrawer(true)}
                className="p-1.5 rounded-full text-primary hover:bg-glass-white border border-transparent hover:border-glass-border transition-all"
              >
                <Menu size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to push content below sticky floating navbar */}
      <div className="h-28" />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-64 bg-surface-container-low/95 backdrop-blur-[20px] border-l border-glass-border shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-glass-border">
              <h2 className="text-lg font-bold font-display text-primary tracking-wider uppercase">Menu</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDrawer(false)}
                className="p-2 rounded-full text-primary hover:bg-glass-white border border-glass-border"
              >
                <X size={18} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
              <nav className="flex flex-col space-y-2 px-6">
                {navItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={toggleDrawer(false)}
                      className={({ isActive }) =>
                        `${
                          isActive 
                            ? "bg-primary/10 text-primary font-bold border border-primary/20" 
                            : "text-on-surface-variant hover:bg-glass-white hover:text-white border border-transparent"
                        } flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-body text-xs tracking-wider uppercase`
                      }
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </NavLink>
                  ))}
                
                {token ? (
                  <div onClick={toggleDrawer(false)} className="pt-4 border-t border-glass-border mt-4">
                    <Logout />
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      navigate("/login")
                      setDrawerOpen(false)
                    }}
                    className="w-full mt-4 bg-primary text-on-primary py-3 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {drawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          onClick={toggleDrawer(false)}
        />
      )}
    </>
  )
}

export default memo(Navbar)
