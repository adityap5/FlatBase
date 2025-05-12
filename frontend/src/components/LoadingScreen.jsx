"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingScreen = ({ minimal = false }) => {
  if (minimal) {
    return (
      <div className="flex justify-center items-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 size={32} className="text-[#76ABAE]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 size={48} className="text-[#76ABAE]" />
        </motion.div>
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-bold tracking-tight"
      >
        DISCOVER BOOK LIVE
      </motion.h1>
    </div>
  );
};

export default LoadingScreen;
