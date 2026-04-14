"use client"

import { useReducedMotion as useFramerReducedMotion } from "framer-motion"

/**
 * Returns true if the user has requested reduced motion.
 * Use this to gate animations and respect accessibility preferences.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false
}
