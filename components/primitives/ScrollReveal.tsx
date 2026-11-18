"use client"

import { motion, type Variants } from "framer-motion"
import { useScrollReveal, instantHidden } from "@/hooks/useScrollReveal"
import { cn } from "@/lib/utils"

type Tag = "div" | "article" | "section" | "li"

interface ScrollRevealProps {
  children: React.ReactNode
  variants: Variants
  as?: Tag
  className?: string
  style?: React.CSSProperties
  transition?: Record<string, unknown>
}

/**
 * Como FadeIn pero con cualquier tag y variantes propias; los hijos con `variants` heredan
 * los estados. Llega visible en el HTML del servidor (ver useScrollReveal).
 */
export function ScrollReveal({
  children,
  variants,
  as: Tag = "div",
  className,
  style,
  transition,
}: ScrollRevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ref, animate } = useScrollReveal<any>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[Tag] as any

  return (
    <MotionTag
      ref={ref}
      variants={instantHidden(variants)}
      initial={false}
      animate={animate}
      className={cn(className)}
      style={style}
      transition={transition}
    >
      {children}
    </MotionTag>
  )
}
