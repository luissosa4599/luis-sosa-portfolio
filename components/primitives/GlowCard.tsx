"use client"

import { motion } from "framer-motion"
import { imageHover } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  /** Enable image-scale hover — use on project image containers */
  scaleOnHover?: boolean
}

export function GlowCard({ children, className, scaleOnHover = false }: GlowCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(
        "relative overflow-hidden rounded-lg",
        "border border-border bg-surface",
        "group",
        className
      )}
    >
      {/* Aqua glow — appears on hover via CSS, avoids Framer re-render */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          "rounded-[inherit]",
          "[background:radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),hsl(170_100%_50%/0.06),transparent_60%)]"
        )}
      />

      {scaleOnHover ? (
        <motion.div variants={imageHover} className="h-full w-full">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}
