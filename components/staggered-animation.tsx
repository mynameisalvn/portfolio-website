"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type StaggeredAnimationProps = {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

export default function StaggeredAnimation({
  children,
  className = "",
  delay = 0.2,
  staggerDelay = 0.1,
}: StaggeredAnimationProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
