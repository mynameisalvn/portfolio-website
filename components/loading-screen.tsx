"use client"

import { motion, AnimatePresence } from "framer-motion"
import LoadingAnimation from "./loading-animation"
import { useLoading } from "@/components/providers/loading-provider"
import PercentageLoadingIndicator from "./percentage-loading-indicator"
import Image from "next/image"

export default function LoadingScreen() {
  const { isLoading, loadingProgress } = useLoading()

  return (
    <>
      {/* Always show the progress indicator when loading, even for subsequent loads */}
      <PercentageLoadingIndicator progress={loadingProgress} isVisible={isLoading} />

      {/* Full screen loading overlay only for initial page load */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="relative flex flex-col items-center">
              {/* Logo animation */}
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0 }}
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <Image src="/favicon.png" alt="AL Logo" width={64} height={64} className="object-contain" />
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                  />
                </div>
              </motion.div>

              {/* Loading animation */}
              <LoadingAnimation />

              {/* Loading text with percentage */}
              <motion.div
                className="mt-12 text-sm text-muted-foreground flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p>Loading portfolio...</p>
                <p className="text-purple-500 font-medium mt-2">{Math.round(loadingProgress)}%</p>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -z-10">
                <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
