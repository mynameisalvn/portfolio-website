import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  className?: string
}

export default function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <div className={cn("px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium", className)}>{name}</div>
  )
}
