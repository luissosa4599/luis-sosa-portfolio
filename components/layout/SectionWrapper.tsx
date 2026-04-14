import { cn } from "@/lib/utils"
import { Container } from "./Container"

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  containerSize?: "sm" | "md" | "lg" | "full"
  /** Removes default vertical padding — use when the section manages its own spacing */
  noPadding?: boolean
}

export function SectionWrapper({
  children,
  id,
  className,
  containerSize = "lg",
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        !noPadding && "py-24 md:py-32",
        className
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
