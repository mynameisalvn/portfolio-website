"use client"

import type React from "react"

import Image from "next/image"

interface OptimizedImageProps extends React.ComponentProps<typeof Image> {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"
  className?: string
}

export default function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  priority,
  objectFit,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      objectFit={objectFit}
      className={className}
      {...props}
    />
  )
}
