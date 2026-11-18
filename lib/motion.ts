import type { Transition } from "framer-motion"

// Curvas de las animaciones que siguen en Framer Motion (título rotativo del hero, header,
// selector de color). Las entradas y salidas al hacer scroll ya no viven aquí: son CSS
// scroll-driven (ver lib/scene.ts y "Escenas" en globals.css).

export const transition = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  springGentle: { type: "spring", stiffness: 200, damping: 28 } as Transition,
}
