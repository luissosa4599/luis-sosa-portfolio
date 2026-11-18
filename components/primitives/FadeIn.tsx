"use client"

import { motion, type Variants } from "framer-motion"
import { fadeUp, fadeLeft, fadeRight, fadeIn, zoomIn, withDelay } from "@/lib/motion"
import { useScrollReveal, instantHidden } from "@/hooks/useScrollReveal"
import { cn } from "@/lib/utils"

type Direction = "up" | "left" | "right" | "zoom" | "none"

const variantMap: Record<Direction, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  zoom: zoomIn,
  none: fadeIn,
}

interface FadeInProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
  /** Use when the parent controls the animation via staggerChildren */
  asChild?: boolean
}

/** Entrada al hacer scroll. Llega visible en el HTML del servidor (ver useScrollReveal). */
export function FadeIn({
  children,
  direction = "up",
  delay,
  className,
  asChild = false,
}: FadeInProps) {
  const { ref, animate } = useScrollReveal<HTMLDivElement>()
  const selected = variantMap[direction]
  const variants = instantHidden(delay ? withDelay(selected, delay) : selected)

  if (asChild) {
    return (
      <motion.div variants={variants} className={cn(className)}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={false}
      animate={animate}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
