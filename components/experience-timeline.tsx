"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ExperienceTimelineItemProps {
  title: string
  company: string
  companyUrl?: string
  location: string
  period: string
  description: string
  technologies: string[]
  logo?: string
  isLast?: boolean
}

export function ExperienceTimelineItem({
  title,
  company,
  companyUrl,
  location,
  period,
  description,
  technologies,
  logo,
  isLast = false,
}: ExperienceTimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-purple-500/20"></div>
      )}

      <div className="relative ml-14 md:ml-16">
        {/* Timeline dot with logo */}
        <motion.div
          className="absolute -left-14 md:-left-16 top-4 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-md overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {logo ? (
            <div className="w-full h-full flex items-center justify-center bg-white">
              <Image src={logo || "/placeholder.svg"} alt={company} width={24} height={24} className="object-contain" />
            </div>
          ) : (
            <span className="text-white text-xs font-bold">{company.charAt(0)}</span>
          )}
        </motion.div>

        <motion.div
          className="bg-background/80 backdrop-blur-md rounded-xl border border-purple-500/20 overflow-hidden mb-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div
            className={cn(
              "p-6 cursor-pointer transition-colors",
              isExpanded ? "bg-purple-500/5" : "hover:bg-purple-500/5",
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{period}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-3">
              <div className="flex items-center text-primary font-medium">
                {companyUrl ? (
                  <Link
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {company}
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </Link>
                ) : (
                  company
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-1.5">
                {technologies.slice(0, isExpanded ? technologies.length : 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="bg-purple-500/10 text-xs">
                    {tech}
                  </Badge>
                ))}
                {!isExpanded && technologies.length > 3 && (
                  <Badge variant="outline" className="bg-purple-500/5 text-xs">
                    +{technologies.length - 3} more
                  </Badge>
                )}
              </div>
              <button
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={isExpanded ? "Show less" : "Show more"}
              >
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-border/50">
                  <p className="text-muted-foreground whitespace-pre-line">{description}</p>

                  {technologies.length > 0 && isExpanded && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="bg-purple-500/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default function ExperienceTimeline({ experiences }: { experiences: ExperienceTimelineItemProps[] }) {
  return (
    <div className="relative py-4">
      {experiences.map((experience, index) => (
        <ExperienceTimelineItem
          key={`${experience.company}-${index}`}
          {...experience}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  )
}
