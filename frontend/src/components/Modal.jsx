"use client"

import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

export default function Modal({ isOpen, setIsOpen, header, footer, children }) {
  if (!isOpen) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl w-full max-w-md md:max-w-lg z-10 overflow-hidden"
          >
            {header && (
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex-1">{header}</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </motion.button>
              </div>
            )}

            <div className="p-6">{children}</div>

            {footer && <div className="p-4 border-t bg-gray-50">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal") || document.body,
  )
}
