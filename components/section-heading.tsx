import type { ReactNode } from "react"
import AnimateInView from "./animate-in-view"

interface SectionHeadingProps {
  icon: ReactNode
  title: string
  className?: string
}

export function SectionHeading({ icon, title, className = "" }: SectionHeadingProps) {
  return (
    <AnimateInView animation="slide-up">
      <div className={`flex items-center justify-center gap-3 mb-12 ${className}`}>
        <div className="text-purple-500">{icon}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>
      </div>
    </AnimateInView>
  )
}
