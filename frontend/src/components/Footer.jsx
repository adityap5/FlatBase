"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Github, Linkedin } from "lucide-react"

const LINKS = [
  {
    title: "SUPPORT",
    items: ["Help Centre", "Anti-discrimination", "Flat cover", "Disability support", "Cancellation options"],
  },
  {
    title: "HOSTING",
    items: ["FlatBase your Home", "Hosting resources", "Community forum", "Press", "News"],
  },
  {
    title: "COMPANY",
    items: ["About us", "Careers", "Blog", "Newsletter", "Investors", "New features"],
  },
]

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-surface-container-lowest border-t border-glass-border pt-20 pb-12 mt-32 w-full"
    >
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center mb-6">
                <span className="font-display text-2xl font-bold text-primary tracking-widest text-glow">
                  FLATBASE
                </span>
              </motion.div>
              <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed max-w-sm mb-8">
                Curated escapes for the modern collector. Experience the world's most unique editorial-grade luxury stays.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: <Facebook size={16} />, label: "Facebook" },
                { icon: <Instagram size={16} />, label: "Instagram" },
                { icon: <Twitter size={16} />, label: "Twitter" },
                { icon: <Github size={16} />, label: "GitHub" },
                { icon: <Linkedin size={16} />, label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-full motionsite-card flex items-center justify-center text-on-surface-variant hover:text-on-primary hover:bg-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {LINKS.map(({ title, items }) => (
              <div key={title}>
                <h6 className="font-body text-xs font-bold text-primary tracking-[0.15em] mb-6 uppercase">{title}</h6>
                <ul className="space-y-4">
                  {items.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 3 }}
                        className="text-on-surface-variant hover:text-white transition-all duration-200 font-body text-sm opacity-70 block"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-glass-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-on-surface-variant font-body text-xs opacity-60 tracking-wider">
            &copy; {currentYear} FLATBASE LUXURY RENTALS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap gap-6 text-xs font-body opacity-70">
            <motion.a href="#" whileHover={{ textShadow: "0 0 10px rgba(0,245,255,0.3)" }} className="text-on-surface-variant hover:text-primary transition-colors">
              PRIVACY POLICY
            </motion.a>
            <motion.a href="#" whileHover={{ textShadow: "0 0 10px rgba(0,245,255,0.3)" }} className="text-on-surface-variant hover:text-primary transition-colors">
              TERMS OF SERVICE
            </motion.a>
            <motion.a href="#" whileHover={{ textShadow: "0 0 10px rgba(0,245,255,0.3)" }} className="text-on-surface-variant hover:text-primary transition-colors">
              COOKIE POLICY
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
