"use client"

import { useState, useEffect } from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  // Handle scroll events for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header at the top of the page
      if (currentScrollY < 20) {
        setIsVisible(true)
        setScrollY(currentScrollY)
        return
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > scrollY + 10) {
        setIsVisible(false)
      } else if (currentScrollY < scrollY - 10) {
        setIsVisible(true)
      }

      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  // Handle scroll to determine active section
  useEffect(() => {
    const handleActiveSection = () => {
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

    window.addEventListener("scroll", handleActiveSection, { passive: true })
    handleActiveSection() // Initial check

    return () => window.removeEventListener("scroll", handleActiveSection)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 py-3 px-4 bg-background/80 backdrop-blur-md border-b border-border/40 sm:hidden"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : -60,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Left icons - can be customized */}
            <Link
              href="#home"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                activeSection === "home" && "text-purple-500",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="sr-only">Home</span>
            </Link>
            <Link
              href="#projects"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                activeSection === "projects" && "text-purple-500",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                <rect width="7" height="7" x="3" y="14" rx="1"></rect>
              </svg>
              <span className="sr-only">Projects</span>
            </Link>
            <Link
              href="#contact"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                activeSection === "contact" && "text-purple-500",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="sr-only">Contact</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme toggle button */}
            <motion.button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-500 text-white"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Menu button */}
            <motion.button
              onClick={toggleMenu}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-500 text-white"
              aria-label="Open menu"
              aria-expanded={isOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={18} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 sm:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-background z-50 shadow-lg p-6 sm:hidden"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-muted"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <nav className="space-y-4">
                {navItems.map((item) => {
                  const isActive = activeSection === item.name.toLowerCase()
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block py-2 px-4 hover:bg-muted rounded-md transition-colors",
                        isActive && "bg-purple-500/10 text-purple-500 font-medium",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
