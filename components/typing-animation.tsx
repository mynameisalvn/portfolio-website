"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypingAnimationProps {
  text: string | string[]
  className?: string
  speed?: number
  delay?: number
  loop?: boolean
  cursor?: boolean
}

export default function TypingAnimation({
  text,
  className = "",
  speed = 70,
  delay = 1000,
  loop = true,
  cursor = true,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const texts = Array.isArray(text) ? text : [text]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(timeout)
    }

    const currentText = texts[currentTextIndex]

    if (isDeleting) {
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        }, speed / 1.5) // Deleting is faster
      } else {
        setIsDeleting(false)
        setCurrentTextIndex((currentTextIndex + 1) % texts.length)
        timeout = setTimeout(() => {}, speed * 2)
      }
    } else {
      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, speed)
      } else if (loop) {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, delay)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, currentTextIndex, delay, isDeleting, isTyping, loop, speed, texts])

  return (
    <span className={className}>
      {displayText}
      <AnimatePresence>
        {cursor && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="inline-block ml-0.5 w-0.5 h-5 bg-primary"
          />
        )}
      </AnimatePresence>
    </span>
  )
}
