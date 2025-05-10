"use client"

import { useState, useEffect } from "react"
import { useLoading } from "@/components/providers/loading-provider"

interface UseFetchWithProgressOptions<T> {
  url: string
  initialData?: T
  dependencies?: any[]
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useFetchWithProgress<T>({
  url,
  initialData,
  dependencies = [],
  onSuccess,
  onError,
}: UseFetchWithProgressOptions<T>) {
  const [data, setData] = useState<T | undefined>(initialData)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { startLoading, incrementProgress, completeLoading } = useLoading()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        startLoading()

        // Simulate progress during fetch
        const progressInterval = setInterval(() => {
          incrementProgress(5)
        }, 100)

        // Fetch data
        const response = await fetch(url)

        // Clear progress interval
        clearInterval(progressInterval)

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Parse response
        const result = await response.json()

        // Update state
        setData(result)
        setError(null)

        // Call success callback
        if (onSuccess) {
          onSuccess(result)
        }

        // Complete loading
        completeLoading()
      } catch (err) {
        // Handle error
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)

        // Call error callback
        if (onError) {
          onError(error)
        }

        // Complete loading
        completeLoading()
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, error, isLoading }
}
