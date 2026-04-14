import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccentLinkProps {
  href: string
  children: string
  className?: string
  external?: boolean
}

export function AccentLink({
  href,
  children,
  className,
  external = false,
}: AccentLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium",
        "text-muted hover:text-accent transition-colors duration-200",
        "group",
        className
      )}
    >
      {children}
      <ArrowUpRight
        size={14}
        className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
      />
    </a>
  )
}
