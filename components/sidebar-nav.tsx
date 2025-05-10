"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, User, Briefcase, Code, Mail, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { AnimatedThemeToggle } from "./animated-theme-toggle"

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState("home")

  // Handle scroll to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "contact"]
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Special case for bottom of page (contact section)
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection("contact")
        return
      }

      // Check other sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && scrollPosition >= section.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Updated navigation items with work experience icon and reordered sections
  const navItems = [
    { name: "home", href: "#home", icon: Home },
    { name: "about", href: "#about", icon: User },
    { name: "skills", href: "#skills", icon: Code },
    { name: "experience", href: "#experience", icon: Building },
    { name: "projects", href: "#projects", icon: Briefcase },
    { name: "contact", href: "#contact", icon: Mail },
  ]

  return (
    <div className="fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center justify-center px-2 py-8 sidebar-nav hidden sm:flex">
      <nav className="flex flex-col items-center space-y-8 bg-background/80 backdrop-blur-md rounded-full py-6 px-3 shadow-md">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.name

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
                isActive ? "text-white" : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActiveSection(item.name)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-purple-500 rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span className="relative z-10">
                <Icon className="h-5 w-5" />
              </span>
              <span className="sr-only">{item.name}</span>
              <span className="nav-tooltip">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-8">
        <AnimatedThemeToggle />
      </div>
    </div>
  )
}
