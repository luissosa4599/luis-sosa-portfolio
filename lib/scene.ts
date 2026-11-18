import type { CSSProperties } from "react"

// ─── Escenas: entrar y salir atado al scroll ─────────────────────────────────
// Las animaciones viven en CSS (globals.css, "Escenas") con animation-timeline: view():
// avanzan y retroceden con el scroll, sin JS. Aquí solo están los recorridos de entrada
// de cada dirección, que se pasan como variables CSS (--in-x, --in-y, --in-s) al elemento.
// Los mismos valores que tenían los revelados de Framer (y la landing de Grupo Cumulus).

export type SceneDirection = "up" | "left" | "right" | "zoom" | "pop" | "none"

const PRESETS: Record<SceneDirection, { x: string; y: string; s: number }> = {
  up:    { x: "0px",    y: "80px", s: 0.96 },
  left:  { x: "-160px", y: "0px",  s: 0.95 },
  right: { x: "160px",  y: "0px",  s: 0.95 },
  zoom:  { x: "0px",    y: "60px", s: 0.8 },
  pop:   { x: "0px",    y: "12px", s: 0.82 },
  none:  { x: "0px",    y: "0px",  s: 1 },
}

/**
 * Variables de una escena. `stagger` retrasa la entrada en pasos de scroll (no de tiempo:
 * en una línea de tiempo de scroll no hay delay) para que elementos a la misma altura
 * entren en cascada.
 */
export function sceneVars(direction: SceneDirection = "up", stagger = 0): CSSProperties {
  const p = PRESETS[direction]
  return { "--in-x": p.x, "--in-y": p.y, "--in-s": p.s, "--i": stagger } as CSSProperties
}

/** En una cuadrícula de 2 columnas: la izquierda entra por la izquierda y la derecha por la derecha. */
export const alternate = (index: number): SceneDirection => (index % 2 === 0 ? "left" : "right")
