"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"
import type { ReactNode } from "react"

export function LanguageTransition({ children }: { children: ReactNode }) {
  const { language } = useLanguage()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={language}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
