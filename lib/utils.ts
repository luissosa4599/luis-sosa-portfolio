import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Los tamaños de texto propios (@theme en globals.css) se registran para que tailwind-merge no
// los confunda con colores. Sin esto, cn("text-section text-foreground") borraba text-section:
// el título de Contacto y los textos de FadeIn salían a 16 px (detectado 2026-11-20).
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["section", "lead", "body", "meta"] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
