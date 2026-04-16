import type { ResearchEntry } from "@/lib/types"
import type { Language } from "@/lib/language"

const researchByLanguage: Record<Language, ResearchEntry[]> = {
  en: [
    {
      title:
        "Application for Locating Dogs in México City Through Pattern Recognition",
      venue: "HCI International 2025",
      publisher: "Springer Nature",
      year: 2025,
      abstract:
        "Peer-reviewed paper published through HCI International 2025 and Springer Nature. It presents a mobile system that uses biometric nose-print identification and geolocation matching to help locate lost dogs in Mexico City, validated in real-world conditions.",
      url: "https://link.springer.com/chapter/10.1007/978-3-032-12767-9_33",
      tags: ["Computer Vision", "Pattern Recognition", "HCI", "Mobile"],
    },
  ],
  es: [
    {
      title:
        "Aplicación para localizar perros en Ciudad de México mediante reconocimiento de patrones",
      venue: "HCI International 2025",
      publisher: "Springer Nature",
      year: 2025,
      abstract:
        "Paper arbitrado publicado en HCI International 2025 y Springer Nature. Presenta un sistema móvil que usa identificación biométrica por huella nasal y matching por geolocalización para ayudar a localizar perros perdidos en Ciudad de México, validado en condiciones reales.",
      url: "https://link.springer.com/chapter/10.1007/978-3-032-12767-9_33",
      tags: ["Computer Vision", "Pattern Recognition", "HCI", "Mobile"],
    },
  ],
}

export function getResearch(language: Language) {
  return researchByLanguage[language]
}
