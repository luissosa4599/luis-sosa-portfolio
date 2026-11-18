import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "full"
}

const sizes = {
  sm: "max-w-2xl",
  md: "max-w-[70rem]", // 1120 px con margen → ~1040 px de contenido (antes 896)
  lg: "max-w-[80rem]", // 1280 px con margen → 1200 px de contenido (antes 1152)
  full: "max-w-none",
}

export function Container({
  children,
  className,
  size = "lg",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[clamp(1.25rem,4vw,2.5rem)]", // 20 → 40 px, fluido
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  )
}
