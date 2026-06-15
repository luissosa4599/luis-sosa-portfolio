"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { usePageReady } from "@/lib/page-ready"
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

export function ScrollReveal({
  children,
  variants,
  as: Tag = "div",
  className,
  style,
  transition,
}: ScrollRevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  const reduced = useReducedMotion()
  const ready = usePageReady()
  const inView = useInView(ref, { once: true, margin: "0px" })
  const controls = useAnimation()

  useEffect(() => {
    if (inView && ready) controls.start("visible")
  }, [inView, ready, controls])

  if (reduced) {
    const PlainTag = Tag
    return <PlainTag className={cn(className)} style={style}>{children}</PlainTag>
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[Tag] as any

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={cn(className)}
      style={style}
      transition={transition}
    >
      {children}
    </MotionTag>
  )
}
