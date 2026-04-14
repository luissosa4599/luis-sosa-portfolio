"use client"

import { motion } from "framer-motion"
import { staggerContainer, viewport } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
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
  const reduced = useReducedMotion()
  const MotionTag = motion[Tag]

  if (reduced) {
    return <Tag className={cn(className)}>{children}</Tag>
  }

  return (
    <MotionTag
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
