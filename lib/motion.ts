import type { Variants, Transition } from "framer-motion"

// ─── Base transitions ────────────────────────────────────────────────────────

export const transition = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  springGentle: { type: "spring", stiffness: 200, damping: 28 } as Transition,
}

// ─── Reveal variants ─────────────────────────────────────────────────────────
// Recorridos amplios y curva suave de salida (mismos valores que la landing de Grupo
// Cumulus): el transform dura 1.2 s y la opacidad 0.9 s, para que el bloque "llegue"
// en vez de solo aparecer. Los laterales (±160 px) necesitan overflow-x: clip en <body>
// (globals.css) para no crear scroll horizontal en celular.

/** Curva de los revelados: arranca rápido y frena largo. */
export const revealEase = [0.16, 0.85, 0.2, 1] as const

const revealTransition: Transition = {
  duration: 1.2,
  ease: revealEase,
  opacity: { duration: 0.9, ease: "easeOut" },
}

/** Standard scroll-reveal: sube con un leve zoom. Títulos y bloques de texto. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: revealTransition },
}

/** Entra desde la izquierda. */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -160, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: revealTransition },
}

/** Entra desde la derecha. */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 160, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: revealTransition },
}

/** Sube creciendo desde más chico. */
export const zoomIn: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: revealTransition },
}

/** Card reveal — sube con zoom (tarjetas sueltas). */
export const cardReveal: Variants = zoomIn

/**
 * Alterna la entrada de los elementos de una cuadrícula de 2 columnas: la columna
 * izquierda entra desde la izquierda y la derecha desde la derecha.
 */
export const alternateReveal = (index: number): Variants =>
  index % 2 === 0 ? fadeLeft : fadeRight

/**
 * Agrega un retraso a una variante. Hace falta porque el `transition` de la variante
 * tiene prioridad sobre la prop `transition` del componente (que no se mezclan): pasar
 * `transition={{ delay }}` al componente no retrasaba nada.
 */
export function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible as { transition?: Transition }
  return {
    ...variants,
    visible: { ...visible, transition: { ...(visible.transition ?? {}), delay } },
  }
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
