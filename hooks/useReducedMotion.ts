"use client"

/**
 * Rama inmersivo: siempre false. Por decisión del usuario (2026-11-18) el movimiento no se
 * limita con "reducir movimiento" del sistema: se ve completo para todos. En las otras ramas
 * este hook devuelve la preferencia real (useReducedMotion de Framer Motion).
 */
export function useReducedMotion(): boolean {
  return false
}
