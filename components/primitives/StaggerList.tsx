"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { staggerContainer } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { usePageReady } from "@/lib/page-ready"
import { cn } from "@/lib/utils"

interface StaggerListProps {
  children: React.ReactNode
  className?: string
  /** Delay between each child animation */
  stagger?: number
  /** Initial delay before first child animates */
  delay?: number
  as?: "div" | "ul" | "ol"
}

export function StaggerList({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as: Tag = "div",
}: StaggerListProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  const reduced = useReducedMotion()
  const ready = usePageReady()
  const inView = useInView(ref, { once: true, margin: "0px" })
  const MotionTag = motion[Tag]

  if (reduced) {
    return <Tag className={cn(className)}>{children}</Tag>
  }

  return (
    <MotionTag
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={inView && ready ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
