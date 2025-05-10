"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

export default function ExperienceItem({ title, company, period, description, technologies }: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="border rounded-lg p-6 transition-all hover:shadow-sm bg-background/80 backdrop-blur-sm"
      whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
    >
      <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-primary font-medium">{company}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-muted-foreground">{period}</span>
          <motion.button
            className="mt-2 text-muted-foreground hover:text-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
