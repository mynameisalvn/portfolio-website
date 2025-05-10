"use client"
import { motion, AnimatePresence } from "framer-motion"

interface PercentageLoadingIndicatorProps {
  progress: number
  isVisible: boolean
  className?: string
}

export default function PercentageLoadingIndicator({
  progress,
  isVisible,
  className = "",
}: PercentageLoadingIndicatorProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-x-0 top-0 z-[101] ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-1.5 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${clampedProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="absolute top-2 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Math.round(clampedProgress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
