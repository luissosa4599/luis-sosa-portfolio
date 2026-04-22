"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const ANIMS = ["dust-float-a", "dust-float-b", "dust-float-c", "dust-float-d"]

export function DustField() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const container = ref.current
    if (!container) return

    const created: HTMLElement[] = []

    for (let i = 0; i < 22; i++) {
      const el = document.createElement("div")
      const size  = 1.5 + Math.random() * 2.5
      const op    = (0.10 + Math.random() * 0.20).toFixed(2)
      const dur   = 14 + Math.random() * 20
      const delay = Math.random() * 12
      const anim  = ANIMS[Math.floor(Math.random() * ANIMS.length)]

      el.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: var(--dust-color);
        opacity: ${op};
        pointer-events: none;
        animation: ${anim} ${dur}s ease-in-out ${delay}s infinite;
      `
      container.appendChild(el)
      created.push(el)
    }

    return () => created.forEach((el) => el.remove())
  }, [reduced])

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    />
  )
}
