"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Github, Linkedin, Heart } from "lucide-react"

const LINKS = [
  {
    title: "Support",
    items: ["Help Centre", "Anti-discrimination", "Flat cover", "Disability support", "Cancellation options"],
  },
  {
    title: "Hosting",
    items: ["FlatBase your Home", "Hosting resources", "Community forum", "Press", "News"],
  },
  {
    title: "FlatBase",
    items: ["About us", "Careers", "Blog", "Newsletter", "Investors", "New features"],
  },
]

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full mt-20 pt-10 bg-gray-50 text-gray-800 rounded-t-3xl"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center mb-4">
              <div className="bg-[#76ABAE] text-white p-2 rounded-lg mr-3">
                <Heart size={20} />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#76ABAE] to-[#5B8D91] bg-clip-text text-transparent">
                FlatBase
              </h2>
            </motion.div>
            <p className="text-gray-600 mb-6">
              Find your perfect stay with FlatBase. We connect travelers with unique accommodations around the world.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={18} />, label: "Facebook" },
                { icon: <Instagram size={18} />, label: "Instagram" },
                { icon: <Twitter size={18} />, label: "Twitter" },
                { icon: <Github size={18} />, label: "GitHub" },
                { icon: <Linkedin size={18} />, label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, color: "#76ABAE" }}
                  className="text-gray-500 hover:text-[#76ABAE]"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <h3 className="font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3, color: "#76ABAE" }}
                      className="text-gray-600 hover:text-[#76ABAE] transition-colors duration-200"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">&copy; {currentYear} FlatBase. All Rights Reserved.</p>
            <div className="flex space-x-6 text-sm">
              <motion.a href="#" whileHover={{ color: "#76ABAE" }} className="text-gray-600">
                Privacy Policy
              </motion.a>
              <motion.a href="#" whileHover={{ color: "#76ABAE" }} className="text-gray-600">
                Terms of Service
              </motion.a>
              <motion.a href="#" whileHover={{ color: "#76ABAE" }} className="text-gray-600">
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
