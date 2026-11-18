// Datos de las paletas y script de arranque. Sin React: lo importa layout.tsx (servidor).
// La tienda y los hooks viven en lib/palette.ts (cliente).

// Cada paleta solo cambia el tono (--hue) o quita el croma (neutral): ver "Paleta" en
// globals.css. La muestra del selector es el acento de esa paleta.
export const PALETTES = [
  { id: "blue",    label: { en: "Blue",      es: "Azul" },     swatch: "oklch(0.55 0.17 255)" },
  { id: "violet",  label: { en: "Violet",    es: "Violeta" },  swatch: "oklch(0.55 0.17 292)" },
  { id: "teal",    label: { en: "Turquoise", es: "Turquesa" }, swatch: "oklch(0.55 0.17 195)" },
  { id: "pink",    label: { en: "Pink",      es: "Rosa" },     swatch: "oklch(0.55 0.17 350)" },
  { id: "amber",   label: { en: "Amber",     es: "Ámbar" },    swatch: "oklch(0.55 0.17 70)" },
  { id: "neutral", label: { en: "Neutral",   es: "Neutral" },  swatch: "oklch(0.55 0 0)" },
] as const

export type PaletteId = (typeof PALETTES)[number]["id"]
export const DEFAULT_PALETTE: PaletteId = "blue"
export const PALETTE_IDS = PALETTES.map((p) => p.id) as readonly string[]

// Intensidad del cristal (deslizante de iOS 27: Transparente ↔ Tintado)
export const GLASS_MIN = 0.35
export const GLASS_MAX = 0.9
export const GLASS_STEP = 0.05
export const DEFAULT_GLASS = 0.6

export const PALETTE_STORAGE_KEY = "portfolio-palette"
export const GLASS_STORAGE_KEY = "portfolio-glass"
/** Candado de la apariencia: "1" se mantiene lo guardado, "0" se sortea en cada carga. */
export const LOCK_STORAGE_KEY = "portfolio-appearance-lock"

/** Cristal al azar en pasos del deslizante (0.35, 0.40 … 0.90). */
export function randomGlass(): number {
  const steps = Math.round((GLASS_MAX - GLASS_MIN) / GLASS_STEP)
  return Number((GLASS_MIN + Math.floor(Math.random() * (steps + 1)) * GLASS_STEP).toFixed(2))
}

/**
 * Se ejecuta en <head> antes del primer pintado (layout.tsx), para que no haya destello del
 * azul por defecto. Decide la apariencia de esta carga:
 * - Candado abierto ("0"): sortea paleta y cristal (cada recarga) y los guarda, para que el
 *   panel de Apariencia muestre la combinación que salió. Claro/oscuro no se sortea: sigue al
 *   sistema (o a lo elegido), lo maneja next-themes.
 * - Candado cerrado ("1"): aplica la paleta y el cristal guardados.
 * - Sin candado guardado (primera carga con esta versión): si ya había paleta o cristal
 *   guardados, los eligió el visitante → se cierra el candado; si no, se abre.
 * La lógica del sorteo es la misma que randomGlass() y shuffleAppearance() (lib/palette.ts):
 * aquí va como texto porque corre antes de React.
 */
export const PALETTE_BOOT_SCRIPT = `(function(){try{var d=document.documentElement,s=localStorage,ids=${JSON.stringify(PALETTE_IDS)},k=s.getItem("${LOCK_STORAGE_KEY}");if(k!=="0"&&k!=="1"){k=(s.getItem("${PALETTE_STORAGE_KEY}")||s.getItem("${GLASS_STORAGE_KEY}"))?"1":"0";s.setItem("${LOCK_STORAGE_KEY}",k)}var p,g;if(k==="1"){p=s.getItem("${PALETTE_STORAGE_KEY}");g=parseFloat(s.getItem("${GLASS_STORAGE_KEY}"))}else{p=ids[Math.floor(Math.random()*ids.length)];var n=Math.round((${GLASS_MAX}-${GLASS_MIN})/${GLASS_STEP});g=+(${GLASS_MIN}+Math.floor(Math.random()*(n+1))*${GLASS_STEP}).toFixed(2);s.setItem("${PALETTE_STORAGE_KEY}",p);s.setItem("${GLASS_STORAGE_KEY}",String(g))}if(p&&p!=="${DEFAULT_PALETTE}"&&ids.indexOf(p)>-1)d.dataset.palette=p;if(g>=${GLASS_MIN}&&g<=${GLASS_MAX})d.style.setProperty("--glass-opacity",String(g))}catch(e){}})()`
