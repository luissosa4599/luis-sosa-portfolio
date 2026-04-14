"use client"

import { motion, type Variants } from "framer-motion"
import { fadeUp, fadeLeft, fadeRight, fadeIn, viewport } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type Direction = "up" | "left" | "right" | "none"

const variantMap: Record<Direction, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  none: fadeIn,
}

const instant: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

interface FadeInProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
  /** Use when the parent controls the animation via staggerChildren */
  asChild?: boolean
}

export function FadeIn({
  children,
  direction = "up",
  delay,
  className,
  asChild = false,
}: FadeInProps) {
  const reduced = useReducedMotion()
  const selected = variantMap[direction]

  const resolvedVariants: Variants = reduced
    ? instant
    : delay
    ? {
        ...selected,
        visible: {
          ...(selected.visible as object),
          transition: {
            ...((selected.visible as { transition?: object }).transition ?? {}),
            delay,
          },
        },
      }
    : selected

  if (asChild) {
    return (
      <motion.div variants={resolvedVariants} className={cn(className)}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
