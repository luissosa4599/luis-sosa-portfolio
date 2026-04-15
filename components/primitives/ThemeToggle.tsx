"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-8 w-8" />
  }

  const isDark = resolvedTheme === "dark"

  function toggle() {
    document.documentElement.classList.add("theme-transitioning")
    setTheme(isDark ? "light" : "dark")
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning")
    }, 600)
  }

  return (
    <motion.button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      whileTap={{ scale: 0.88 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "no-theme-transition relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground overflow-hidden",
        "hover:bg-accent/10 hover:text-foreground transition-colors",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute flex items-center justify-center"
          >
            <Sun size={15} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute flex items-center justify-center"
          >
            <Moon size={15} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
