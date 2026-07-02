import { useState } from "react"
import { motion } from "framer-motion"
import { login } from "../services/queries"
import { setAuthData } from "../utils/auth"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from "lucide-react"

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data } = await login({
        email: formData.email,
        password: formData.password,
      })

      if (data?.login) {
        setAuthData({ token: data.login.token, user: data.login.user })
        navigate("/")
      } else {
        setError("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login failed:", error)
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="motionsite-card rounded-3xl border border-glass-border overflow-hidden shadow-2xl">
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex justify-center mb-4"
              >
                <div className="bg-primary/10 p-4 rounded-full border border-primary/20">
                  <LogIn size={28} className="text-primary text-glow" />
                </div>
              </motion.div>

              <h2 className="font-display text-2xl font-bold text-on-background">Welcome Back</h2>
              <p className="text-on-surface-variant font-body text-sm mt-2 opacity-75">Sign in to your sanctuary account to continue</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 bg-error/15 border border-error/25 text-error rounded-2xl flex items-start text-xs font-body leading-relaxed font-semibold"
              >
                <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-body font-bold text-on-surface-variant tracking-wider uppercase flex items-center gap-1.5 opacity-80">
                  <Mail size={14} className="text-primary" />
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-body font-bold text-on-surface-variant tracking-wider uppercase flex items-center gap-1.5 opacity-80">
                    <Lock size={14} className="text-primary" />
                    Password
                  </label>
                  <a href="#" className="text-xs font-body font-bold text-primary hover:underline uppercase tracking-wider">
                    Forgot?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-primary text-on-primary py-4 rounded-2xl font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/15 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex justify-center items-center"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn size={14} className="mr-2" />
                    <span>Sign in</span>
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8 text-center font-body text-xs tracking-wider uppercase font-semibold">
              <p className="text-on-surface-variant opacity-80">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="font-bold text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
