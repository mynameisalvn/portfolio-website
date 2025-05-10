"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  loadingProgress: number
  setLoadingProgress: (progress: number) => void
  startLoading: () => void
  incrementProgress: (increment?: number) => void
  completeLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Function to start loading process
  const startLoading = () => {
    setIsLoading(true)
    setLoadingProgress(0)
  }

  // Function to increment progress
  const incrementProgress = (increment = 5) => {
    setLoadingProgress((prev) => {
      // Allow going to 100%
      const newProgress = prev + increment
      return Math.min(newProgress, 100)
    })
  }

  // Function to complete loading
  const completeLoading = () => {
    setLoadingProgress(100)
    // Small delay before hiding the loader to show 100%
    setTimeout(() => setIsLoading(false), 500)
  }

  useEffect(() => {
    // Track page load progress
    const trackPageLoadProgress = () => {
      if (document.readyState === "loading") {
        setLoadingProgress(20)
      }

      // Track resource loading
      if (typeof window !== "undefined") {
        // Count total resources to load
        const resources = Array.from(document.querySelectorAll("img, script, link[rel='stylesheet']"))
        const totalResources = resources.length
        let loadedResources = 0

        // Function to update progress based on loaded resources
        const updateProgress = () => {
          loadedResources++
          const resourceProgress = Math.min(
            70, // Cap resource loading at 70% of total progress
            Math.floor((loadedResources / Math.max(totalResources, 1)) * 70),
          )
          setLoadingProgress(20 + resourceProgress) // Start from 20% (document loading)

          // If all resources are loaded, set to 100%
          if (loadedResources >= totalResources) {
            setTimeout(() => {
              setLoadingProgress(100)
              setTimeout(() => setIsLoading(false), 1500)
            }, 800)
          }
        }

        // Track image loading
        resources.forEach((resource) => {
          if (resource instanceof HTMLImageElement) {
            if (resource.complete) {
              updateProgress()
            } else {
              resource.addEventListener("load", updateProgress, { once: true })
              resource.addEventListener("error", updateProgress, { once: true })
            }
          } else {
            // For other resources, just count them as loaded
            updateProgress()
          }
        })

        // If there are no resources or very few, simulate progress
        if (totalResources < 5) {
          let progress = 20
          const simulateProgress = () => {
            progress += 5 // Slower progress increment
            setLoadingProgress(progress)

            if (progress >= 100) {
              clearInterval(interval)
              setTimeout(() => setIsLoading(false), 1500)
            }
          }

          const interval = setInterval(simulateProgress, 500) // Longer interval
          return () => clearInterval(interval)
        }
      }
    }

    trackPageLoadProgress()

    // When document is fully loaded
    const handleLoad = () => {
      // Ensure we reach 100% and then hide the loader
      setLoadingProgress(100)
      setTimeout(() => setIsLoading(false), 1500)
    }

    window.addEventListener("load", handleLoad)
    return () => window.removeEventListener("load", handleLoad)
  }, [])

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        loadingProgress,
        setLoadingProgress,
        startLoading,
        incrementProgress,
        completeLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
