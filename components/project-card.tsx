"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl: string
  codeUrl: string
}

export default function ProjectCard({ title, description, image, technologies, demoUrl, codeUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden flex items-center justify-center bg-background/50">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <span className="text-muted-foreground text-sm">Loading...</span>
            </div>
          )}
          <Image
            src={image || "/images/placeholder.jpg"}
            alt={title}
            fill
            className={cn(
              "transition-transform duration-500 object-cover",
              isHovered && "scale-105",
              !imageLoaded && "opacity-0",
              imageLoaded && "opacity-100",
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <CardContent className="p-5 space-y-4 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm flex-grow">{description}</p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button asChild size="sm" variant="outline">
              <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={codeUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-3 w-3" /> Code
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
