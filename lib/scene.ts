import type { CSSProperties } from "react"

// ─── Escenas: entrar y salir atado al scroll ─────────────────────────────────
// Las animaciones viven en CSS (globals.css, "Escenas") con animation-timeline: view():
// avanzan y retroceden con el scroll, sin JS. Aquí solo están los recorridos de entrada
// de cada dirección, que se pasan como variables CSS (--in-x, --in-y, --in-s) al elemento.
// Rama inmersivo: recorridos 1.5× los de la landing de Grupo Cumulus (abajo).

export type SceneDirection = "up" | "left" | "right" | "zoom" | "pop" | "none"

// Inmersivo: recorridos 1.5× los de la landing de Cumulus y un giro leve en las laterales
const PRESETS: Record<SceneDirection, { x: string; y: string; s: number; r: string }> = {
  up:    { x: "0px",    y: "120px", s: 0.9,  r: "0deg" },
  left:  { x: "-240px", y: "24px",  s: 0.9,  r: "-4deg" },
  right: { x: "240px",  y: "24px",  s: 0.9,  r: "4deg" },
  zoom:  { x: "0px",    y: "90px",  s: 0.7,  r: "0deg" },
  pop:   { x: "0px",    y: "18px",  s: 0.7,  r: "0deg" },
  none:  { x: "0px",    y: "0px",   s: 1,    r: "0deg" },
}

/**
 * Variables de una escena. `stagger` retrasa la entrada en pasos de scroll (no de tiempo:
 * en una línea de tiempo de scroll no hay delay) para que elementos a la misma altura
 * entren en cascada.
 */
export function sceneVars(direction: SceneDirection = "up", stagger = 0): CSSProperties {
  const p = PRESETS[direction]
  return { "--in-x": p.x, "--in-y": p.y, "--in-s": p.s, "--in-r": p.r, "--i": stagger } as CSSProperties
}

/** En una cuadrícula de 2 columnas: la izquierda entra por la izquierda y la derecha por la derecha. */
export const alternate = (index: number): SceneDirection => (index % 2 === 0 ? "left" : "right")
