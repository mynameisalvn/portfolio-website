"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

type AnimateInViewProps = {
  children: ReactNode
  animation?: "fade" | "slide-up" | "slide-right" | "scale" | "none"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number
}

const animations = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
}

export default function AnimateInView({
  children,
  animation = "fade",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  amount = 0.3,
}: AnimateInViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  const selectedAnimation = animations[animation]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedAnimation}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
