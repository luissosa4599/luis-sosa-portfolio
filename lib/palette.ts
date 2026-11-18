"use client"

import { useSyncExternalStore } from "react"
import {
  DEFAULT_GLASS,
  DEFAULT_PALETTE,
  GLASS_MAX,
  GLASS_MIN,
  GLASS_STORAGE_KEY,
  LOCK_STORAGE_KEY,
  PALETTE_IDS,
  PALETTE_STORAGE_KEY,
  randomGlass,
  type PaletteId,
} from "@/lib/palette-config"

export { PALETTES, GLASS_MIN, GLASS_MAX, GLASS_STEP, type PaletteId } from "@/lib/palette-config"

function applyPalette(id: PaletteId) {
  const root = document.documentElement
  // Misma transición de color que el cambio de tema
  root.classList.add("theme-transitioning")
  if (id === DEFAULT_PALETTE) delete root.dataset.palette
  else root.dataset.palette = id
  setTimeout(() => root.classList.remove("theme-transitioning"), 600)
}

function applyGlass(value: number) {
  document.documentElement.style.setProperty("--glass-opacity", String(value))
}

function store(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage no disponible (modo privado): la elección no se guarda
  }
}

// ─── Store sobre localStorage (mismo patrón que lib/i18n.tsx) ──────────────────
// El snapshot del servidor es el valor por defecto: SSR e hidratación pintan azul y React
// vuelve a renderizar con lo guardado justo después, sin hydration mismatch. El color real
// (guardado o sorteado) ya lo aplicó PALETTE_BOOT_SCRIPT (layout.tsx) antes del primer pintado.
const listeners = new Set<() => void>()
let memoryPalette: PaletteId = DEFAULT_PALETTE
let memoryGlass = DEFAULT_GLASS
let memoryLocked = false

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

function readLocked(): boolean {
  try {
    return window.localStorage.getItem(LOCK_STORAGE_KEY) === "1"
  } catch {
    return memoryLocked
  }
}

function notify() {
  listeners.forEach((listener) => listener())
}

/** Candado: cerrado, la apariencia actual se mantiene al recargar; abierto, se sortea. */
export function setLocked(locked: boolean) {
  memoryLocked = locked
  store(LOCK_STORAGE_KEY, locked ? "1" : "0")
  notify()
}

/** Elección a mano: aplica la paleta y cierra el candado (se respeta en las siguientes cargas). */
export function setPalette(id: PaletteId) {
  memoryPalette = id
  store(PALETTE_STORAGE_KEY, id)
  applyPalette(id)
  setLocked(true)
}

/** Elección a mano del cristal: también cierra el candado. */
export function setGlass(value: number) {
  memoryGlass = value
  store(GLASS_STORAGE_KEY, String(value))
  applyGlass(value)
  setLocked(true)
}

/**
 * Dado: sortea otra paleta (distinta de la actual) y otro cristal al momento, sin tocar el
 * candado. Con el candado cerrado, la nueva combinación es la que se mantiene.
 */
export function shuffleAppearance() {
  const current = readPalette()
  const others = PALETTE_IDS.filter((id) => id !== current) as PaletteId[]
  const palette = others[Math.floor(Math.random() * others.length)]
  const glass = randomGlass()
  memoryPalette = palette
  memoryGlass = glass
  store(PALETTE_STORAGE_KEY, palette)
  store(GLASS_STORAGE_KEY, String(glass))
  applyPalette(palette)
  applyGlass(glass)
  notify()
}

export function usePalette(): PaletteId {
  return useSyncExternalStore(subscribe, readPalette, () => DEFAULT_PALETTE)
}

export function useGlass(): number {
  return useSyncExternalStore(subscribe, readGlass, () => DEFAULT_GLASS)
}

export function useLocked(): boolean {
  return useSyncExternalStore(subscribe, readLocked, () => false)
}
