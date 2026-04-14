import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: string
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        {children}
      </span>
    </div>
  )
}
