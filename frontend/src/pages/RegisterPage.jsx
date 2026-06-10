"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { register } from "../graphql/queries" 
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, User, UserPlus, Building, Users, Loader2, AlertCircle } from "lucide-react"

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data } = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      })

      if (data?.register) {
        localStorage.setItem("token", data.register.token)
        localStorage.setItem("role", data.register.user.role)
        navigate("/")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration failed:", error)
      setError("Registration failed. Please try again with a different email.")
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
        <div className="motionsite-card mt-4 rounded-3xl border border-glass-border overflow-hidden shadow-2xl">
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex justify-center mb-4"
              >
                <div className="bg-primary/10 p-4 rounded-full border border-primary/20">
                  <UserPlus size={28} className="text-primary text-glow" />
                </div>
              </motion.div>

              <h2 className="font-display text-2xl font-bold text-on-background">Create Account</h2>
              <p className="text-on-surface-variant font-body text-sm mt-2 opacity-75">Join our luxury stays community today</p>
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-body font-bold text-on-surface-variant tracking-wider uppercase flex items-center gap-1.5 opacity-80">
                  <User size={14} className="text-primary" />
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
                  placeholder="John Doe"
                />
              </div>

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
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-body font-bold text-on-surface-variant tracking-wider uppercase flex items-center gap-1.5 opacity-80">
                  <Lock size={14} className="text-primary" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-xs font-body font-bold text-on-surface-variant tracking-wider uppercase flex items-center gap-1.5 opacity-80">
                  {form.role === "customer" ? (
                    <Users size={14} className="text-primary" />
                  ) : (
                    <Building size={14} className="text-primary" />
                  )}
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-surface border border-glass-border rounded-2xl text-on-background focus:ring-1 focus:ring-primary focus:border-transparent outline-none font-body text-sm transition-all appearance-none"
                >
                  <option value="customer">Customer (Book Properties)</option>
                  <option value="seller">Seller (List Properties)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-primary text-on-primary py-4 rounded-2xl font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/15 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex justify-center items-center"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <UserPlus size={14} className="mr-2" />
                    <span>Create Account</span>
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8 text-center font-body text-xs tracking-wider uppercase font-semibold">
              <p className="text-on-surface-variant opacity-80">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
