import type { Variants, Transition } from "framer-motion"

// ─── Base transitions ────────────────────────────────────────────────────────

export const transition = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  springGentle: { type: "spring", stiffness: 200, damping: 28 } as Transition,
}

// ─── Reveal variants ─────────────────────────────────────────────────────────

/** Standard scroll-reveal: fade + lift. Matches hero style, faster duration. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: transition.easeOut },
  },
}

/** Card reveal — adds a subtle scale for a more tactile entrance */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: transition.easeOut },
  },
}

/** Reveal from left — used for text columns */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: transition.easeOut },
  },
}

/** Reveal from right — used for image columns */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: transition.easeOut },
  },
}

/** Fade only — no transform. Use for overlays or subtle UI elements */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: transition.ease },
  },
}

// ─── Hero-specific ────────────────────────────────────────────────────────────

/** Sequential entrance for hero elements after headline */
export const heroSequence = (index: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: transition.easeOut,
      delay: 0.55 + index * 0.12,
    },
  },
})

// ─── Viewport config ─────────────────────────────────────────────────────────

/** Standard viewport trigger — fires once, 80px before element enters */
export const viewport = {
  once: true,
  margin: "-80px",
} as const
