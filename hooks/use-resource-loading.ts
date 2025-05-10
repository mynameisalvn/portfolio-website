"use client"

import { useState } from "react"
import { useLoading } from "@/components/providers/loading-provider"

export function useResourceLoading() {
  const { startLoading, incrementProgress, completeLoading } = useLoading()
  const [isTracking, setIsTracking] = useState(false)

  // Start tracking resource loading
  const trackResourceLoading = () => {
    if (isTracking) return

    setIsTracking(true)
    startLoading()

    // Count total resources to load
    const resources = Array.from(document.querySelectorAll("img, script, link[rel='stylesheet']"))
    const totalResources = resources.length
    let loadedResources = 0

    // Function to update progress based on loaded resources
    const updateProgress = () => {
      loadedResources++
      const resourceProgress = Math.floor((loadedResources / Math.max(totalResources, 1)) * 100)
      incrementProgress(resourceProgress - loadedResources)

      // If all resources are loaded, complete
      if (loadedResources >= totalResources) {
        setTimeout(() => {
          completeLoading()
          setIsTracking(false)
        }, 300)
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

    // If there are no resources, simulate progress
    if (totalResources === 0) {
      let progress = 0
      const simulateProgress = () => {
        progress += 5 // Slower progress increment
        incrementProgress(5)

        if (progress >= 100) {
          clearInterval(interval)
          completeLoading()
          setIsTracking(false)
        }
      }

      // Simulate progress every 300ms
      const interval = setInterval(simulateProgress, 300)

      // After 4 seconds, complete loading if not already completed
      setTimeout(() => {
        clearInterval(interval)
        completeLoading()
        setIsTracking(false)
      }, 4000)

      return () => clearInterval(interval)
    }
  }

  return { trackResourceLoading, isTracking }
}
