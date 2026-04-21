"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SectionProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent origin-left pointer-events-none"
      style={{ scaleX: pct }}
    />
  )
}
