"use client"

import { useTheme } from "next-themes"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

interface GridBackgroundProps {
  className?: string
  highlightColor?: string
  interactive?: boolean
  density?: "low" | "medium" | "high"
  showParticles?: boolean
}

export function GridBackground({
  className = "",
  highlightColor = "#8b5cf6",
  interactive = false,
  density = "medium",
  showParticles = true,
}: GridBackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Grid density settings
  const gridSize = {
    low: "80px",
    medium: "40px",
    high: "20px",
  }

  // Generate random particles
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      if (showParticles) {
        // Generate random particles
        const newParticles = Array.from({ length: 20 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
        }))
        setParticles(newParticles)
      }

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [showParticles])

  // Handle mouse movement for interactive mode
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [interactive])

  // Parallax effect for grid based on scroll
  const gridTranslateY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${
            isDark ? "rgba(120, 120, 255, 0.07)" : "rgba(120, 120, 255, 0.05)"
          } 1px, transparent 1px), 
          linear-gradient(to bottom, ${
            isDark ? "rgba(120, 120, 255, 0.07)" : "rgba(120, 120, 255, 0.05)"
          } 1px, transparent 1px)`,
          backgroundSize: `${gridSize[density]} ${gridSize[density]}`,
          y: gridTranslateY,
        }}
      />

      {/* Highlight circles */}
      <motion.div
        className="absolute rounded-full opacity-20 filter blur-3xl"
        style={{
          background: highlightColor,
          width: "30%",
          height: "30%",
          top: "20%",
          left: "60%",
        }}
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute rounded-full opacity-10 filter blur-3xl"
        style={{
          background: highlightColor,
          width: "40%",
          height: "40%",
          top: "60%",
          left: "30%",
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Interactive highlight that follows mouse */}
      {interactive && windowSize.width > 0 && (
        <motion.div
          className="absolute rounded-full opacity-10 filter blur-3xl pointer-events-none"
          style={{
            background: highlightColor,
            width: "20%",
            height: "20%",
            left: `${(mousePosition.x / windowSize.width) * 100}%`,
            top: `${(mousePosition.y / windowSize.height) * 100}%`,
            x: "-50%",
            y: "-50%",
          }}
          transition={{ type: "spring", damping: 15 }}
        />
      )}

      {/* Floating particles */}
      {showParticles &&
        particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white opacity-50"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: index * 0.2,
            }}
          />
        ))}
    </div>
  )
}
