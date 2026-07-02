
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { LogOut, Home, ArrowRight } from "lucide-react"
import Button from "../components/ui/Button"

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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="motionsite-card p-8 md:p-10 rounded-3xl border border-glass-border max-w-md w-full text-center shadow-2xl"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="bg-error/10 p-5 rounded-full border border-error/20 shadow-lg shadow-error/5">
            <LogOut size={42} className="text-error text-glow" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-display text-2xl md:text-3xl font-bold mb-4 text-on-background"
        >
          Successfully Logged Out
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-on-surface-variant font-body text-sm mb-6 opacity-80 leading-relaxed"
        >
          Thank you for using our platform. We hope to see you again soon!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xs font-body font-semibold text-on-surface-variant/60 uppercase tracking-wider mb-8"
        >
          You&apos;ll be redirected to the home page in 5 seconds...
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" className="w-full">
            <button className="w-full flex items-center justify-center gap-2 border border-glass-border py-3.5 rounded-2xl font-body font-bold text-xs uppercase tracking-widest text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 active:scale-[0.98]">
              <Home size={14} />
              <span>Go to Home</span>
            </button>
          </Link>
          <Link to="/login" className="w-full">
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3.5 rounded-2xl font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/15 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all duration-300">
              <ArrowRight size={14} />
              <span>Login Again</span>
            </button>
          </Link>
        </motion.div>

        {/* Progress bar for auto-redirect */}
        <div className="mt-8 h-1 bg-surface border border-glass-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(0,245,255,0.5)]"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default LogoutPage