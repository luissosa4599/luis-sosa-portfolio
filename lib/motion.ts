import type { Variants, Transition } from "framer-motion"

// ─── Base transitions ────────────────────────────────────────────────────────

export const transition = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  springGentle: { type: "spring", stiffness: 200, damping: 28 } as Transition,
}

// ─── Reveal variants ─────────────────────────────────────────────────────────

/** Standard scroll-reveal: fade + 16px vertical lift */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: transition.easeOut },
  },
}

/** Reveal from left — used for text columns */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: transition.easeOut },
  },
}

/** Reveal from right — used for image columns */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: transition.easeOut },
  },
}

/** Fade only — no transform. Use for overlays or subtle UI elements */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: transition.ease },
  },
}

// ─── Stagger containers ───────────────────────────────────────────────────────

/**
 * Wrap a list of children with this to stagger their entrance.
 * Children should use `fadeUp` or `fadeLeft` as their variant.
 */
export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Tighter stagger for dense lists (research cards, approach rows) */
export const staggerContainerFast = staggerContainer(0.06)

/** Looser stagger for featured sections */
export const staggerContainerSlow = staggerContainer(0.12)

// ─── Text reveal ─────────────────────────────────────────────────────────────

/** Container for word-by-word stagger on hero headline */
export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

/** Individual word animation — spring-based for organic feel */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.spring,
  },
}

// ─── Hover states ─────────────────────────────────────────────────────────────

/** Subtle lift on interactive cards */
export const cardHover = {
  rest: { y: 0, transition: { duration: 0.2, ease: transition.ease } },
  hover: { y: -2, transition: { duration: 0.2, ease: transition.ease } },
}

/** Image scale on featured project hover */
export const imageHover = {
  rest: { scale: 1, transition: { duration: 0.3, ease: transition.easeOut } },
  hover: { scale: 1.015, transition: { duration: 0.3, ease: transition.easeOut } },
}

// ─── Hero-specific ────────────────────────────────────────────────────────────

/** Sequential entrance for hero elements after headline */
export const heroSequence = (index: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: transition.easeOut,
      delay: 0.3 + index * 0.1,
    },
  },
})

// ─── Viewport config ─────────────────────────────────────────────────────────

/** Standard viewport trigger — fires once, 80px before element enters */
export const viewport = {
  once: true,
  margin: "-80px",
} as const
