"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useCursor } from "@/hooks/useCursor"

const SPRING_CONFIG = { damping: 28, stiffness: 300, mass: 0.5 }

export default function CustomCursor() {
  const { label } = useCursor()
  const hasLabel = label.length > 0

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const x = useSpring(rawX, SPRING_CONFIG)
  const y = useSpring(rawY, SPRING_CONFIG)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [rawX, rawY])

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={
            hasLabel
              ? {
                  width: "auto",
                  height: 28,
                  borderRadius: 9999,
                  paddingLeft: 12,
                  paddingRight: 12,
                  backgroundColor: "hsl(213 90% 53%)",
                  opacity: 1,
                }
              : {
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  paddingLeft: 0,
                  paddingRight: 0,
                  backgroundColor: "hsla(213, 90%, 53%, 0.25)",
                  opacity: 1,
                }
          }
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center justify-center overflow-hidden"
          style={{
            border: "1.5px solid hsl(213 90% 53%)",
            minWidth: hasLabel ? undefined : 10,
          }}
        >
          <motion.span
            animate={{ opacity: hasLabel ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            className="text-xs font-medium text-white whitespace-nowrap leading-none"
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}
