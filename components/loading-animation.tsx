"use client"

import { motion } from "framer-motion"

export default function LoadingAnimation() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Animated circles */}
      <div className="relative h-16 w-16">
        {/* Outer circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0 }}
        />

        {/* Spinning circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Inner circle with pulse */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500"
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      </div>

      {/* Animated dots */}
      <div className="absolute -bottom-8 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-purple-500"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
