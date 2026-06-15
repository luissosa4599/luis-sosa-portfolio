import type { ProjectEntry } from "@/lib/types"
import type { Language } from "@/lib/language"

const projectsByLanguage: Record<Language, ProjectEntry[]> = {
  en: [
    {
      slug: "operations-dashboard",
      title: "Operations Dashboard",
      subtitle: "Full-stack operations platform for a logistics company",
      description:
        "A full-stack operations platform for a logistics workflow, covering order intake, live status tracking, role-based access, and reporting for internal teams.",
      tags: ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "Recharts"],
      url: "https://operations-dashboard-gules.vercel.app/catalogos",
      githubUrl: "https://github.com/luissosa4599/operations-dashboard",
      featured: true,
      private: false,
      role: "Full-stack Lead",
      timeline: "6 months",
      teamSize: "2 engineers",
      context:
        "A logistics company was coordinating 500+ daily shipments using spreadsheets and a WhatsApp group shared between three operational roles. There was no unified view of order status, no audit trail, and no way to generate reports without exporting data manually.\n\nThe goal was to replace this with a purpose-built operations platform: order intake, real-time delivery tracking, role-based access control, and weekly reporting — all from a single interface used by dispatchers, drivers, and managers.",
      myRole:
        "I was the sole frontend engineer on a two-person team. I co-designed the database schema with the backend lead, defined the component architecture from scratch, and built every user-facing surface — auth and role-based routing, the main operations dashboard, delivery workflow views, and the analytics and reporting section.\n\nAll product and UX decisions on the frontend were mine. I also contributed to API design discussions where the data shape directly affected frontend implementation.",
      keyDecisions: [
        {
          title: "Server Components for data-heavy tables",
          body: "Order tables loaded hundreds of rows with multi-column filters. Using Next.js Server Components moved data fetching to the server, reduced JavaScript sent to the client, and kept initial load fast for operators opening the dashboard dozens of times per day.",
        },
        {
          title: "React Query over a global state manager",
          body: "All server state is handled by React Query. Local UI state — modals, sidebar toggles — stays component-local. This avoided Redux overhead and gave me background refetching and cache invalidation that fit the real-time tracking view without extra boilerplate.",
        },
        {
          title: "Recharts for analytics, not a data grid",
          body: "The ops team needed trend charts with date-range overlays, not sortable tables. Recharts gave full control over the visual layer within TypeScript's type system. A data-grid library would have added complexity without solving the actual need.",
        },
        {
          title: "Role enforcement server-side via Laravel middleware",
          body: "Permissions are checked in Laravel middleware before any data is served. The frontend reflects what the server allows — it never makes authorization decisions itself. This makes the access model auditable and closes a class of privilege-escalation bugs that client-side role flags leave open.",
        },
      ],
      screenshots: [
        {
          src: "/dashboard-dark.png",
          srcLight: "/dashboard-light.png",
          alt: "Operations dashboard main view",
          caption:
            "Main dashboard: real-time KPIs, volume trend chart, and distributor breakdown",
        },
      ],
      challenges:
        "The hardest problem was concurrent state. When two operators updated the same order simultaneously, the optimistic UI patterns I had implemented caused silent inconsistencies that only appeared under production load. Reproducing the issue locally took hours.\n\nI resolved this by switching status-change actions to pessimistic updates — waiting for server confirmation before updating the UI — and limiting optimistic patterns to lower-stakes states like sidebar visibility. It was a deliberate tradeoff: slightly slower feedback for operators, in exchange for data accuracy they depended on.",
      impact: [
        "~40% reduction in order processing time per operator",
        "25+ operators using the platform daily",
        "500+ shipments tracked per day",
        "Replaced 3 disconnected spreadsheet workflows",
      ],
      lessons:
        "I'd invest in a design token system before writing the first component. The dashboard grew organically and I later had to retrofit consistent spacing and color tokens across a codebase that had already diverged. The upfront cost is an hour; the retrofit was a day and a half — and that's a small project.",
    },
    {
      slug: "salva-lomitos",
      title: "Salva Lomitos",
      subtitle: "Mobile biometric system for identifying lost dogs via nose-print matching",
      description:
        "A mobile system for identifying lost dogs through biometric nose-print matching, built as the applied product behind my HCI International 2025 paper.",
      tags: ["Computer Vision", "React Native", "Python", "OpenCV"],
      featured: false,
      private: false,
      role: "Solo Researcher & Engineer",
      timeline: "8 months",
      teamSize: "Solo",
      context:
        "In Mexico City, thousands of dogs are reported lost every month. Existing reunification systems rely entirely on visual similarity described by owners — an approach prone to error, fraud, and slow matching. There was no reliable biometric identifier being applied in practice.\n\nThis project built and validated a nose-print recognition system. A dog's nose print is unique, analogous to a human fingerprint, and unlike facial recognition, it remains stable across age, weight changes, and lighting conditions. The research question: could a mobile-first system using nose-print matching improve identification accuracy for lost dogs in real urban conditions?",
      myRole:
        "I was the sole researcher and engineer. I defined the research question, designed the study protocol, collected the dataset in the field, built the computer vision pipeline in Python, developed the mobile prototype in React Native, and authored the paper accepted at HCI International 2025.\n\nThis was intentionally a solo project to test whether a single researcher-engineer could take an idea from literature review to peer-reviewed publication and functional prototype.",
      keyDecisions: [
        {
          title: "Nose-print biometrics over facial recognition",
          body: "Dog facial recognition has poor performance across breeds and lighting conditions. Nose prints are unique per individual, do not change with age, and are non-invasive to capture with a standard phone camera. The biometrics literature on animal identification pointed clearly to nose-print as the most viable approach for real-world conditions.",
        },
        {
          title: "Custom OpenCV pipeline over a pretrained model",
          body: "Rather than a black-box pretrained model, I built a custom preprocessing pipeline with OpenCV. This gave full control over image normalization for the variable lighting of outdoor urban environments. A pretrained model would have given faster initial results but less control over the failure modes that mattered most for field validation.",
        },
        {
          title: "Geolocation as a secondary matching filter",
          body: "Biometric matching alone produces false positives when similar dogs are spread across a large city. Adding geolocation as a configurable secondary filter — matching only within a set radius — reduced false positives significantly without requiring more invasive data collection.",
        },
      ],
      screenshots: [],
      challenges:
        "Collecting field data was harder than expected. Owners were reluctant to have strangers photograph their dogs, and lighting in outdoor Mexico City environments varied enormously by time of day and location. I adjusted the preprocessing pipeline three times during data collection — something a purely lab-based study would not have caught.\n\nThe validation accuracy (92% in controlled conditions) drops in fully uncontrolled conditions. This gap between research prototype and production system was the most important lesson of the project.",
      impact: [
        "Published at HCI International 2025 — Springer Nature",
        "92% matching accuracy in controlled validation",
        "Dataset of 60+ unique dog nose prints collected in the field",
        "Proposed as a model for municipal adoption in Mexico City",
      ],
      lessons:
        "The gap between a research prototype and a production-ready system is larger than I expected. The pipeline works reliably on my validation set but would need significant robustness and adversarial testing before handling the full diversity of real-world submissions at scale. I learned to be precise about what 'validated' means in a research context versus what it means when real users depend on it.",
    },
  ],

  es: [
    {
      slug: "operations-dashboard",
      title: "Operations Dashboard",
      subtitle: "Plataforma full-stack de operaciones para empresa logística",
      description:
        "Una plataforma full-stack de operaciones para un flujo logístico, cubriendo ingreso de órdenes, seguimiento en vivo, control de acceso por roles y reporteo para equipos internos.",
      tags: ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "Recharts"],
      url: "https://operations-dashboard-gules.vercel.app/catalogos",
      githubUrl: "https://github.com/luissosa4599/operations-dashboard",
      featured: true,
      private: false,
      role: "Full-stack Lead",
      timeline: "6 meses",
      teamSize: "2 ingenieros",
      context:
        "Una empresa logística coordinaba más de 500 envíos diarios mediante hojas de cálculo y un grupo de WhatsApp compartido entre tres roles operativos. No había vista unificada del estado de las órdenes, ni historial de cambios, ni forma de generar reportes sin exportar datos manualmente.\n\nEl objetivo era reemplazar esto con una plataforma de operaciones a medida que cubriera ingreso de órdenes, seguimiento en tiempo real, control de acceso por roles y reportes semanales — todo desde una sola interfaz usada por despachadores, conductores y gerentes.",
      myRole:
        "Fui el único ingeniero frontend en un equipo de dos personas, trabajando con un líder de backend. Co-diseñé el esquema de base de datos, definí la arquitectura de componentes desde cero y construí todas las superficies de usuario: autenticación y rutas por rol, el dashboard principal, vistas de flujo de entregas y la sección de analítica y reportes.\n\nTodas las decisiones de producto y UX en el frontend fueron mías. También participé en discusiones de diseño de API donde la forma de los datos afectaba directamente la implementación del frontend.",
      keyDecisions: [
        {
          title: "Server Components para tablas con mucha data",
          body: "Las tablas de órdenes cargaban cientos de filas con filtros multi-columna. Usar Server Components de Next.js movió el fetching al servidor, redujo el JavaScript enviado al cliente y mantuvo la carga inicial rápida para operadores que abrían el dashboard decenas de veces por día.",
        },
        {
          title: "React Query en lugar de un estado global",
          body: "Todo el server state está manejado con React Query. El estado local de UI — modales, toggles del sidebar — se queda en el componente. Esto evitó el overhead de Redux y me dio refetching en background e invalidación de caché que encajaba con la naturaleza en tiempo real de la vista de tracking.",
        },
        {
          title: "Recharts para analítica, no una data grid",
          body: "El equipo de operaciones necesitaba gráficas de tendencia con overlays de rango de fechas, no tablas ordenables. Recharts dio control total sobre la capa visual dentro del sistema de tipos de TypeScript. Una librería de data grid hubiera añadido complejidad sin resolver la necesidad real.",
        },
        {
          title: "Enforcement de roles en el servidor vía middleware de Laravel",
          body: "Los permisos se verifican en middleware de Laravel antes de servir cualquier dato. El frontend refleja lo que el servidor permite — nunca toma decisiones de autorización por sí mismo. Esto hace el modelo de acceso auditable y cierra una clase de bugs de escalada de privilegios que los flags de rol en el cliente dejan abiertos.",
        },
      ],
      screenshots: [
        {
          src: "/dashboard-dark.png",
          srcLight: "/dashboard-light.png",
          alt: "Vista principal del dashboard de operaciones",
          caption:
            "Dashboard principal: KPIs en tiempo real, gráfica de tendencia de volumen y desglose por distribuidor",
        },
      ],
      challenges:
        "El problema más difícil fue el estado concurrente. Cuando dos operadores actualizaban la misma orden simultáneamente, los patrones de optimistic UI causaban inconsistencias silenciosas que solo aparecían bajo carga de producción. Reproducir el problema localmente tomó horas.\n\nLo resolví cambiando las acciones de cambio de estado a actualizaciones pesimistas — esperando la confirmación del servidor antes de actualizar la UI — y limitando los patrones optimistas a estados de menor riesgo como visibilidad del sidebar. Fue un tradeoff deliberado: feedback ligeramente más lento, a cambio de la exactitud de datos de la que dependían los operadores.",
      impact: [
        "~40% de reducción en tiempo de procesamiento de órdenes por operador",
        "25+ operadores usando la plataforma diariamente",
        "500+ envíos rastreados por día",
        "Reemplazó 3 flujos de trabajo en hojas de cálculo desconectadas",
      ],
      lessons:
        "Invertiría antes en un sistema de design tokens antes de escribir el primer componente. El dashboard creció orgánicamente y después tuve que retrofitear tokens consistentes en un codebase que ya había divergido. El costo inicial es una hora; el retrofit fue un día y medio — y eso es un proyecto pequeño.",
    },
    {
      slug: "salva-lomitos",
      title: "Salva Lomitos",
      subtitle: "Sistema móvil biométrico para identificar perros perdidos mediante huella nasal",
      description:
        "Un sistema móvil para identificar perros perdidos mediante biometría de huella nasal, construido como el producto aplicado detrás de mi paper de HCI International 2025.",
      tags: ["Computer Vision", "React Native", "Python", "OpenCV"],
      featured: false,
      private: false,
      role: "Investigador y Engineer Solo",
      timeline: "8 meses",
      teamSize: "Solo",
      context:
        "En Ciudad de México, miles de perros son reportados como perdidos cada mes. Los sistemas existentes de reencuentro dependen enteramente de la similitud visual descrita por los dueños — un enfoque propenso a errores, fraude y matching lento. No había ningún identificador biométrico siendo aplicado en la práctica.\n\nEste proyecto construyó y validó un sistema de reconocimiento de huella nasal. La huella nasal de un perro es única, análoga a la huella dactilar humana, y a diferencia del reconocimiento facial, permanece estable a través del tiempo, cambios de peso y condiciones de iluminación.",
      myRole:
        "Fui el único investigador e ingeniero. Definí la pregunta de investigación, diseñé el protocolo del estudio, recolecté el dataset en campo, construí el pipeline de visión por computadora en Python, desarrollé el prototipo móvil en React Native y escribí el paper aceptado en HCI International 2025.\n\nEste fue intencionalmente un proyecto individual para probar si un researcher-engineer solo podía llevar una idea desde la revisión de literatura hasta una publicación arbitrada y un prototipo funcional.",
      keyDecisions: [
        {
          title: "Biometría de huella nasal sobre reconocimiento facial",
          body: "El reconocimiento facial de perros tiene mal desempeño entre razas y condiciones de luz. Las huellas nasales son únicas por individuo, no cambian con la edad y son no invasivas de capturar con una cámara de celular estándar. La literatura de biometría animal señala claramente la huella nasal como el enfoque más viable para condiciones reales.",
        },
        {
          title: "Pipeline personalizado con OpenCV sobre un modelo preentrenado",
          body: "En lugar de usar un modelo preentrenado de caja negra, construí un pipeline de preprocesamiento personalizado con OpenCV. Esto me dio control total sobre la normalización de imágenes para las condiciones de iluminación variables del entorno urbano exterior. Un modelo preentrenado hubiera dado resultados iniciales más rápidos pero menos control sobre los modos de falla que importaban para la validación en campo.",
        },
        {
          title: "Geolocalización como filtro secundario de matching",
          body: "El matching biométrico solo produce falsos positivos cuando hay perros similares en una ciudad grande. Agregar geolocalización como filtro secundario configurable — haciendo matching solo dentro de un radio establecido — redujo significativamente los falsos positivos sin requerir recolección de datos más invasiva.",
        },
      ],
      screenshots: [],
      challenges:
        "Recolectar datos en campo fue más difícil de lo esperado. Los dueños eran reacios a que extraños fotografiaran a sus perros, y la iluminación en exteriores de Ciudad de México varía enormemente según la hora del día y la ubicación. Ajusté el pipeline de preprocesamiento tres veces durante la recolección de datos — algo que un estudio puramente en laboratorio no hubiera capturado.\n\nLa precisión de validación (92% en condiciones controladas) cae en condiciones completamente no controladas. Esta brecha entre prototipo de investigación y sistema de producción fue la lección más importante del proyecto.",
      impact: [
        "Publicado en HCI International 2025 — Springer Nature",
        "92% de precisión de matching en validación controlada",
        "Dataset de 60+ huellas nasales únicas recolectadas en campo",
        "Propuesto como modelo para adopción municipal en Ciudad de México",
      ],
      lessons:
        "La brecha entre un prototipo de investigación y un sistema listo para producción es más grande de lo que esperaba. El pipeline funciona de forma confiable en mi conjunto de validación pero necesitaría trabajo significativo de robustez y pruebas adversariales antes de manejar la diversidad completa de envíos reales a escala.",
    },
  ],
}

export function getProjects(language: Language): ProjectEntry[] {
  return projectsByLanguage[language]
}

export function getProject(language: Language, slug: string): ProjectEntry | undefined {
  return projectsByLanguage[language].find((p) => p.slug === slug)
}
