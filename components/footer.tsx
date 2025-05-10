"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="py-6 px-4 border-t border-border/30 backdrop-blur-sm bg-background/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">&copy; {currentYear} Alpin. All rights reserved.</div>

          <div className="flex items-center text-sm text-muted-foreground">
            <span>by Alpin</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
