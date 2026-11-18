"use client"

import { useSyncExternalStore } from "react"
import {
  DEFAULT_GLASS,
  DEFAULT_PALETTE,
  GLASS_MAX,
  GLASS_MIN,
  GLASS_STORAGE_KEY,
  PALETTE_IDS,
  PALETTE_STORAGE_KEY,
  type PaletteId,
} from "@/lib/palette-config"

export { PALETTES, GLASS_MIN, GLASS_MAX, type PaletteId } from "@/lib/palette-config"

function applyPalette(id: PaletteId) {
  const root = document.documentElement
  if (id === DEFAULT_PALETTE) delete root.dataset.palette
  else root.dataset.palette = id
}

function applyGlass(value: number) {
  document.documentElement.style.setProperty("--glass-opacity", String(value))
}

// ─── Store sobre localStorage (mismo patrón que lib/i18n.tsx) ──────────────────
// El snapshot del servidor es el valor por defecto: SSR e hidratación pintan azul y React
// vuelve a renderizar con lo guardado justo después, sin hydration mismatch. El color real
// ya lo aplicó PALETTE_BOOT_SCRIPT (layout.tsx) antes del primer pintado.
const listeners = new Set<() => void>()
let memoryPalette: PaletteId = DEFAULT_PALETTE
let memoryGlass = DEFAULT_GLASS

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function readPalette(): PaletteId {
  try {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY)
    return PALETTE_IDS.includes(stored ?? "") ? (stored as PaletteId) : DEFAULT_PALETTE
  } catch {
    return memoryPalette
  }
}

function readGlass(): number {
  try {
    const stored = parseFloat(window.localStorage.getItem(GLASS_STORAGE_KEY) ?? "")
    return stored >= GLASS_MIN && stored <= GLASS_MAX ? stored : DEFAULT_GLASS
  } catch {
    return memoryGlass
  }
}

function notify() {
  listeners.forEach((listener) => listener())
}

/** Cambia la paleta con la misma transición de color que el cambio de tema. */
export function setPalette(id: PaletteId) {
  memoryPalette = id
  try {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, id)
  } catch {
    // Storage no disponible (modo privado): la elección no se guarda
  }
  const root = document.documentElement
  root.classList.add("theme-transitioning")
  applyPalette(id)
  setTimeout(() => root.classList.remove("theme-transitioning"), 600)
  notify()
}

export function setGlass(value: number) {
  memoryGlass = value
  try {
    window.localStorage.setItem(GLASS_STORAGE_KEY, String(value))
  } catch {
    // Storage no disponible: la elección no se guarda
  }
  applyGlass(value)
  notify()
}

export function usePalette(): PaletteId {
  return useSyncExternalStore(subscribe, readPalette, () => DEFAULT_PALETTE)
}

export function useGlass(): number {
  return useSyncExternalStore(subscribe, readGlass, () => DEFAULT_GLASS)
}
