"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { register } from "../graphql/queries" // GraphQL register mutation
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, User, UserPlus, Building, Users, Loader2, AlertCircle } from "lucide-react"
import Button from "../components/Button"

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
      // Call GraphQL register mutation
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
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white mt-4 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center mb-4"
              >
                <div className="bg-[#76ABAE]/10 p-4 rounded-full">
                  <UserPlus size={32} className="text-[#76ABAE]" />
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-600 mt-2">Join our community today</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start"
              >
                <AlertCircle size={20} className="mr-2 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                  <User size={16} className="mr-2 text-[#76ABAE]" />
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
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Mail size={16} className="mr-2 text-[#76ABAE]" />
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
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
                  <Lock size={16} className="mr-2 text-[#76ABAE]" />
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
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 flex items-center">
                  {form.role === "customer" ? (
                    <Users size={16} className="mr-2 text-[#76ABAE]" />
                  ) : (
                    <Building size={16} className="mr-2 text-[#76ABAE]" />
                  )}
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:border-transparent"
                >
                  <option value="customer">Customer (Book Properties)</option>
                  <option value="seller">Seller (List Properties)</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  name={
                    isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 size={20} className="animate-spin mr-2" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <UserPlus size={18} className="mr-2" />
                        <span>Create Account</span>
                      </div>
                    )
                  }
                  fullWidth
                  css="py-3"
                />
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-[#76ABAE] hover:text-[#5B8D91]">
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
