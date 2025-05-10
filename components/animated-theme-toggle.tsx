"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function AnimatedThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md shadow-md flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-muted animate-pulse"></div>
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md shadow-md flex items-center justify-center relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br"
        animate={{
          background:
            theme === "dark"
              ? "linear-gradient(to bottom right, #0f172a, #1e293b)"
              : "linear-gradient(to bottom right, #fef9c3, #fde68a)",
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="relative z-10"
        animate={{
          rotate: theme === "dark" ? 360 : 0,
        }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </motion.button>
  )
}

function SunIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <circle cx="12" cy="12" r="5"></circle>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </motion.g>
    </motion.svg>
  )
}

function MoonIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      <motion.circle
        cx="7"
        cy="10"
        r="1"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.circle
        cx="12"
        cy="8"
        r="0.5"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.3 }}
      />
      <motion.circle
        cx="10"
        cy="14"
        r="0.7"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.4 }}
      />
    </motion.svg>
  )
}
