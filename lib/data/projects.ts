import type { ProjectEntry } from "@/lib/types"
import type { Language } from "@/lib/language"

const projectsByLanguage: Record<Language, ProjectEntry[]> = {
  en: [
    {
      slug: "salva-lomitos",
      title: "Salva Lomitos",
      description:
        "A mobile system for identifying lost dogs through biometric nose-print matching, built as the applied product behind my HCI International 2025 paper.",
      tags: ["Computer Vision", "React Native", "Python", "OpenCV"],
      featured: false,
      private: false,
      role: "Solo researcher and builder. I defined the problem, designed the study, built the computer-vision pipeline, and shipped the mobile prototype.",
      highlights: [
        "Designed a biometric matching flow around nose-print recognition and validated it in real-world conditions",
        "Combined computer vision and geolocation to improve matching for dogs reported missing in Mexico City",
        "Published as a peer-reviewed paper at HCI International 2025 through Springer Nature",
      ],
    },
    {
      slug: "operations-dashboard",
      title: "Operations Dashboard",
      description:
        "A full-stack operations platform for a logistics workflow, covering order intake, live status tracking, role-based access, and reporting for internal teams.",
      tags: ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "Recharts"],
      url: "https://github.com/luissosa4599/operations-dashboard",
      githubUrl: "https://github.com/luissosa4599/operations-dashboard",
      featured: true,
      private: false,
      role: "Full-stack lead. I designed the data model, built the API, and owned the frontend across dashboards, delivery workflows, and operational reporting used by internal roles.",
      highlights: [
        "Built interfaces for operational roles that needed to review orders, track delivery state changes, and act quickly without losing context",
        "Implemented real-time order tracking with WebSocket updates and optimistic UI patterns",
        "Built analytics views with custom Recharts components and date-range filtering for operational reporting",
        "Added role-based access control and per-route middleware in Laravel",
        "Streamlined operational workflows and reduced order processing time by roughly 40%",
      ],
    },
  ],
  es: [
    {
      slug: "salva-lomitos",
      title: "Salva Lomitos",
      description:
        "Un sistema móvil para identificar perros perdidos mediante biometría de huella nasal, construido como el producto aplicado detrás de mi paper de HCI International 2025.",
      tags: ["Computer Vision", "React Native", "Python", "OpenCV"],
      featured: false,
      private: false,
      role: "Investigador y builder individual. Definí el problema, diseñé el estudio, construí el pipeline de visión por computadora y llevé el prototipo móvil a una versión funcional.",
      highlights: [
        "Diseñé un flujo biométrico basado en reconocimiento de huella nasal y lo validé en condiciones reales",
        "Combiné visión por computadora y geolocalización para mejorar el matching de perros reportados como perdidos en Ciudad de México",
        "Fue publicado como paper arbitrado en HCI International 2025 a través de Springer Nature",
      ],
    },
    {
      slug: "operations-dashboard",
      title: "Operations Dashboard",
      description:
        "Una plataforma full-stack de operaciones para un flujo logístico, cubriendo ingreso de órdenes, seguimiento en vivo, control de acceso por roles y reporteo para equipos internos.",
      tags: ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "Recharts"],
      url: "https://github.com/luissosa4599/operations-dashboard",
      githubUrl: "https://github.com/luissosa4599/operations-dashboard",
      featured: true,
      private: false,
      role: "Líder full-stack. Diseñé el modelo de datos, construí la API y fui dueño del frontend en dashboards, flujos de entrega y reportes operativos usados por roles internos.",
      highlights: [
        "Construí interfaces para roles operativos que necesitaban revisar órdenes, seguir cambios de estado y actuar rápido sin perder contexto",
        "Implementé tracking en tiempo real con WebSockets y patrones de optimistic UI",
        "Desarrollé vistas analíticas con componentes personalizados en Recharts y filtros por rango de fechas",
        "Agregué control de acceso por roles y middleware por ruta en Laravel",
        "Agilicé flujos operativos y reduje el tiempo de procesamiento de órdenes alrededor de 40%",
      ],
    },
  ],
}

export function getProjects(language: Language) {
  return projectsByLanguage[language]
}
