"use client"

import { motion } from "framer-motion"
import { wordContainer, wordReveal } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

interface RevealTextProps {
  children: string
  className?: string
  /** Element to render — defaults to span for inline use inside headings */
  as?: "span" | "p" | "h1" | "h2" | "h3"
}

export function RevealText({
  children,
  className,
  as: Tag = "span",
}: RevealTextProps) {
  const reduced = useReducedMotion()
  const words = children.split(" ")

  if (reduced) {
    return <Tag className={cn(className)}>{children}</Tag>
  }

  const MotionTag = motion[Tag]

  return (
    <MotionTag
      variants={wordContainer}
      initial="hidden"
      animate="visible"
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
      aria-label={children}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordReveal}
          className="inline-block"
          aria-hidden
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}
