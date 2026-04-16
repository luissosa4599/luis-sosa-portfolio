import type { ApproachPrinciple } from "@/lib/types"
import type { Language } from "@/lib/language"

const approachByLanguage: Record<Language, ApproachPrinciple[]> = {
  en: [
    {
      index: "01",
      heading: "Clarity first",
      body: "Interfaces should help people decide faster. I prioritize hierarchy, readable states, and the right information at the right moment instead of visual noise.",
    },
    {
      index: "02",
      heading: "Product thinking",
      body: "I work from product and business context, not just mockups. Before building, I want to understand the workflow, the constraint, and the decision the interface needs to support.",
    },
    {
      index: "03",
      heading: "Direct communication",
      body: "I surface blockers early, translate technical tradeoffs clearly, and keep stakeholders aligned. Fast projects usually depend more on clean communication than on heroic coding.",
    },
    {
      index: "04",
      heading: "Systems awareness",
      body: "Good frontend depends on understanding the system behind it. I work comfortably across APIs, data flow, and implementation constraints so the UI holds up in production.",
    },
  ],
  es: [
    {
      index: "01",
      heading: "Claridad primero",
      body: "Las interfaces deben ayudar a decidir más rápido. Priorizo jerarquía, estados legibles y la información correcta en el momento correcto, sin ruido visual.",
    },
    {
      index: "02",
      heading: "Pensamiento de producto",
      body: "Trabajo desde el contexto de producto y negocio, no solo desde mockups. Antes de construir, quiero entender el flujo, la restricción y la decisión que la interfaz debe facilitar.",
    },
    {
      index: "03",
      heading: "Comunicación directa",
      body: "Levanto bloqueos temprano, explico tradeoffs técnicos con claridad y mantengo alineados a los stakeholders. Los proyectos rápidos suelen depender más de buena comunicación que de código heroico.",
    },
    {
      index: "04",
      heading: "Visión de sistema",
      body: "Un buen frontend depende de entender el sistema detrás. Me muevo cómodo entre APIs, flujo de datos y restricciones de implementación para que la UI aguante en producción.",
    },
  ],
}

export function getApproach(language: Language) {
  return approachByLanguage[language]
}
