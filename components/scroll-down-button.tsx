"use client"

import { motion } from "framer-motion"

interface ScrollDownButtonProps {
  targetId: string
  className?: string
}

export default function ScrollDownButton({ targetId, className = "" }: ScrollDownButtonProps) {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.button
      onClick={scrollToTarget}
      className={`flex flex-col items-center justify-center text-gray-400 hover:text-purple-400 transition-colors ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      aria-label="Scroll down"
    >
      <span className="text-sm font-medium mb-2">Scroll Down</span>
      <motion.div
        className="w-5 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center"
        initial={{ y: 0 }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-purple-500"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </motion.div>
    </motion.button>
  )
}
