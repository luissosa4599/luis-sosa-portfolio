"use client"

import { Parallax } from "@/components/primitives/Parallax"
import { cn } from "@/lib/utils"

/**
 * Dos manchas de luz del color de la paleta detrás de una sección, para que el cristal de
 * sus tarjetas (.glass-panel) tenga color que dejar ver. Van en -z-10 dentro del
 * <main> (z-10): detrás del contenido de la sección y delante de la cuadrícula de fondo.
 * La sección debe ser `relative overflow-hidden`. Se mueven con el scroll (parallax).
 */
export function AmbientBlobs({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <Parallax factor={0.2} className="pointer-events-none absolute inset-0 -z-10">
        <div
          aria-hidden
          className={cn("absolute top-10 w-[32rem] h-[32rem] rounded-full", flip ? "-left-40" : "-right-40")}
          style={{ background: "radial-gradient(circle closest-side, var(--blob-a), transparent)" }}
        />
      </Parallax>
      <Parallax factor={-0.15} className="pointer-events-none absolute inset-0 -z-10">
        <div
          aria-hidden
          className={cn("absolute bottom-0 w-[28rem] h-[28rem] rounded-full", flip ? "-right-32" : "-left-32")}
          style={{ background: "radial-gradient(circle closest-side, var(--blob-b), transparent)" }}
        />
      </Parallax>
    </>
  )
}
