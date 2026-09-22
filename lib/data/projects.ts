import type { ProjectEntry } from "@/lib/types"
import type { Language } from "@/lib/language"

const projectsByLanguage: Record<Language, ProjectEntry[]> = {
  en: [
    {
      slug: "tempo",
      title: "Tempo",
      subtitle: "Cross-platform booking engine for shared spaces — iOS, Android and Web",
      description:
        "A real-time booking platform for shared spaces, shipped to iOS, Android and Web from one TypeScript codebase, with a .NET 10 backend, a notification microservice and a live Android app on Google Play.",
      tags: ["React Native", "Expo", "TypeScript", ".NET 10", "PostgreSQL", "Google Cloud"],
      url: "https://tempo-cyan-alpha.vercel.app",
      githubUrl: "https://github.com/luissosa4599/booking-platform",
      featured: true,
      private: false,
      role: "Solo Full-stack Engineer",
      timeline: "1 month",
      teamSize: "Solo",
      context:
        "Booking a shared space — a study cubicle, a reading room, an auditorium — usually means queues, spreadsheets or slow apps that show availability nobody trusts. When two people want the last seat, most systems either overbook or fail with an unhelpful error.\n\nTempo lets you book, in one tap, a space that's free right now, from a list or a map sorted by distance. It also has an automatic waitlist, push reminders and a QR pass for check-in. There are two roles: guests search, book, cancel and check in; hosts publish spaces with photos, a weekly schedule and a map location, block time slots and scan guests' QR codes at the door. The demo is seeded with realistic data from UNAM and IPN campuses.",
      myRole:
        "I built the whole product on my own: domain model and API design, the .NET 10 backend and its worker service, the React Native app for three platforms, the test suites, the CI pipeline, the cloud infrastructure and the Google Play release.\n\nThat included the less visible work that production needs: OAuth consent-screen publishing, API-key scoping, signing certificates, a privacy policy with an account-deletion flow, the Data Safety form and store listing assets.",
      keyDecisions: [
        {
          title: "Optimistic concurrency and idempotency instead of locks",
          body: "Seat conflicts are handled with PostgreSQL's native xmin system column as a row version, so two users racing for the last seat never overbook — one gets a 409. POST /bookings requires an Idempotency-Key, and a unique index resolves two identical requests racing each other without a 500. Every 409 carries nearby alternative slots with capacity, so the app turns a failure into a one-tap retry.",
        },
        {
          title: "Transactional Outbox and a separate worker",
          body: "Cancelling a booking writes an outbox row in the same transaction as the cancellation, so a 'slot opened' event is never lost even if the worker is down. A separately deployed .NET worker promotes the next person on the waitlist, sends reminders 30 minutes before each booking, dedupes every send and cleans up dead push tokens on its own.",
        },
        {
          title: "Security in the API, not in the client",
          body: "Short-lived JWTs with rotating refresh tokens: reusing an old token revokes the user's whole token chain. Identity always comes from the token, never from client-supplied IDs, and another user's resource returns 404 as if it didn't exist. Photos upload straight to Cloud Storage through keyless V4 signed URLs, the Calendar refresh token is encrypted with AES-256-GCM, and a per-IP rate limiter covers every endpoint.",
        },
        {
          title: "One offline-first codebase, three layouts",
          body: "Expo Router and NativeWind run the same screens on phone, tablet and desktop: a bottom tab bar, a side rail, or a master–detail view with the selection kept in the URL. TanStack Query persists the cache so the app stays usable offline — stale data is stamped 'updated X ago', and favorites and check-ins queue until the connection returns.",
        },
        {
          title: "Scale-to-zero infrastructure",
          body: "The API runs on Cloud Run, the worker as a Cloud Run Job triggered by Cloud Scheduler, PostgreSQL on Neon with separate production and dev branches, and the web app on Vercel. Everything scales to zero and runs for about $0 a month, with budget alerts in place.",
        },
      ],
      screenshots: [
        {
          src: "/tempo/explore-map-dark.jpg",
          srcLight: "/tempo/explore-map-light.jpg",
          alt: "Tempo Explore map view on desktop with a selected space",
          caption:
            "Explore on desktop: live map of available spaces, colored by status, with the selected space's slots in the side panel",
        },
        {
          src: "/tempo/explore-list-dark.jpg",
          srcLight: "/tempo/explore-list-light.jpg",
          alt: "Tempo Explore list view with the detail pane",
          caption:
            "List view sorted by distance, next-booking banner and a master–detail pane for one-tap booking",
        },
        {
          src: "/tempo/resource-dark.jpg",
          srcLight: "/tempo/resource-light.jpg",
          alt: "Tempo space detail screen with photos and time slots",
          caption: "Space detail: photo carousel, party size, day picker and live remaining capacity per slot",
        },
      ],
      challenges:
        "The hardest bugs came from the gaps between platforms, not from any single one. On web, React Native's Modal renders through a DOM portal, so theme colors defined as CSS variables never reached anything inside a sheet: buttons and highlights silently rendered with no color at all. The gesture system also never delivered mouse-drag events, so custom sliders didn't move. I fixed the first at the root by resolving colors in JavaScript and applying them as inline styles, and the second by layering an invisible native range input over the themed slider.\n\nThe undo-cancel flow had its own race: after the delete succeeded, the stale cache briefly showed the cancelled booking again before the refetch landed. I fixed it by patching the cache in the same tick as the success. None of these bugs showed up in a screenshot — each needed an end-to-end run that waited the real five seconds, or reading the computed styles directly.",
      impact: [
        "Live in production: web app, API, worker and an Android app on Google Play (internal and closed testing)",
        "~121 integration tests against a real PostgreSQL via Testcontainers, plus Playwright end-to-end tests in light and dark mode",
        "CI with 4 parallel jobs on every push: API tests, app checks, Docker builds and end-to-end",
        "3 platforms from a single TypeScript codebase",
        "~$0/month operating cost on scale-to-zero infrastructure",
      ],
      lessons:
        "Test on a real device early. The web build and the emulator both looked fine, but the Play Store build had a black map and a Google Sign-In that hung. The cause was that Google re-signs the app with its own Play App Signing certificate, and that SHA-1 wasn't allowed on the API keys. Now I treat the release-signed build on real hardware as its own environment, not as a formality after web works.",
    },
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
      slug: "tempo",
      title: "Tempo",
      subtitle: "Motor de reservas multiplataforma para espacios compartidos — iOS, Android y Web",
      description:
        "Una plataforma de reservas en tiempo real para espacios compartidos, publicada en iOS, Android y Web desde una sola base de código en TypeScript, con backend en .NET 10, un microservicio de notificaciones y una app Android en Google Play.",
      tags: ["React Native", "Expo", "TypeScript", ".NET 10", "PostgreSQL", "Google Cloud"],
      url: "https://tempo-cyan-alpha.vercel.app",
      githubUrl: "https://github.com/luissosa4599/booking-platform",
      featured: true,
      private: false,
      role: "Ingeniero Full-stack (solo)",
      timeline: "1 mes",
      teamSize: "Solo",
      context:
        "Apartar un espacio compartido — un cubículo, una sala de lectura, un auditorio — suele implicar filas, hojas de cálculo o apps lentas con una disponibilidad en la que nadie confía. Cuando dos personas quieren el último lugar, la mayoría de los sistemas sobrevenden o fallan con un error poco útil.\n\nCon Tempo reservas en un toque un espacio libre ahora mismo, desde una lista o un mapa ordenados por cercanía. Además tiene lista de espera automática, recordatorios push y un pase QR para registrar la entrada. Hay dos roles: el huésped busca, reserva, cancela y registra su entrada; el anfitrión publica espacios con fotos, horario semanal y ubicación en mapa, bloquea horarios y escanea los QR en la puerta. El demo trae datos realistas de campus de la UNAM y del IPN.",
      myRole:
        "Construí el producto completo yo solo: modelo de dominio y diseño de la API, el backend en .NET 10 y su servicio worker, la app en React Native para tres plataformas, las suites de pruebas, el pipeline de CI, la infraestructura en la nube y la publicación en Google Play.\n\nEso incluyó el trabajo menos visible que exige producción: publicar la pantalla de consentimiento de OAuth, restringir las llaves de API, certificados de firma, una política de privacidad con flujo de eliminación de cuenta, el formulario de seguridad de datos y el material gráfico de la ficha de la tienda.",
      keyDecisions: [
        {
          title: "Concurrencia optimista e idempotencia en lugar de bloqueos",
          body: "Los conflictos por lugar se resuelven con la columna de sistema xmin de PostgreSQL como versión de fila: dos usuarios que compiten por el último lugar nunca sobrevenden, uno recibe un 409. POST /bookings exige un Idempotency-Key, y un índice único resuelve dos peticiones idénticas simultáneas sin llegar a un 500. Cada 409 incluye horarios alternativos cercanos con cupo, así que la app convierte el error en un reintento de un toque.",
        },
        {
          title: "Transactional Outbox y un worker independiente",
          body: "Al cancelar una reserva se escribe un registro de outbox en la misma transacción que la cancelación, así que el evento de 'se liberó un lugar' nunca se pierde aunque el worker esté caído. Un worker de .NET desplegado por separado promueve a la siguiente persona de la lista de espera, manda recordatorios 30 minutos antes de cada reserva, evita envíos duplicados y limpia solo los tokens de push inválidos.",
        },
        {
          title: "La seguridad vive en la API, no en el cliente",
          body: "JWT de corta duración con refresh tokens rotativos: reutilizar un token viejo revoca toda la cadena del usuario. La identidad siempre sale del token, nunca de IDs que manda el cliente, y el recurso de otro usuario responde 404 como si no existiera. Las fotos se suben directo a Cloud Storage con URLs firmadas V4 sin llaves, el token de Calendar se cifra con AES-256-GCM y hay rate limiting por IP en todos los endpoints.",
        },
        {
          title: "Una sola base de código offline-first, tres layouts",
          body: "Expo Router y NativeWind corren las mismas pantallas en teléfono, tablet y escritorio: barra de pestañas, barra lateral o vista maestro-detalle con la selección guardada en la URL. TanStack Query persiste el caché para que la app siga usable sin conexión: los datos viejos se marcan con 'actualizado hace X' y los favoritos y check-ins quedan en cola hasta que vuelve la red.",
        },
        {
          title: "Infraestructura que escala a cero",
          body: "La API corre en Cloud Run, el worker como Cloud Run Job disparado por Cloud Scheduler, PostgreSQL en Neon con ramas separadas de producción y desarrollo, y la web en Vercel. Todo escala a cero y cuesta alrededor de $0 al mes, con alertas de presupuesto configuradas.",
        },
      ],
      screenshots: [
        {
          src: "/tempo/explore-map-dark.jpg",
          srcLight: "/tempo/explore-map-light.jpg",
          alt: "Vista de mapa de Explorar en Tempo, en escritorio, con un espacio seleccionado",
          caption:
            "Explorar en escritorio: mapa en vivo de espacios disponibles, coloreados por estado, con los horarios del espacio seleccionado en el panel lateral",
        },
        {
          src: "/tempo/explore-list-dark.jpg",
          srcLight: "/tempo/explore-list-light.jpg",
          alt: "Vista de lista de Explorar en Tempo con el panel de detalle",
          caption:
            "Lista ordenada por cercanía, aviso de la próxima reserva y panel maestro-detalle para reservar con un toque",
        },
        {
          src: "/tempo/resource-dark.jpg",
          srcLight: "/tempo/resource-light.jpg",
          alt: "Pantalla de detalle de un espacio en Tempo con fotos y horarios",
          caption: "Detalle del espacio: carrusel de fotos, número de personas, selector de día y cupo restante en vivo por horario",
        },
      ],
      challenges:
        "Los bugs más difíciles salieron de las diferencias entre plataformas, no de una sola. En web, el Modal de React Native se renderiza a través de un portal del DOM, así que los colores del tema definidos como variables CSS nunca llegaban a lo que había dentro de una hoja: botones y resaltados se pintaban sin color, sin ningún error. Además, el sistema de gestos nunca entregaba el arrastre del mouse, así que los sliders no se movían. El primero lo resolví de raíz, resolviendo los colores en JavaScript y aplicándolos como estilos en línea; el segundo, poniendo un input de rango nativo invisible encima del slider con el tema de la app.\n\nEl flujo de cancelar con deshacer tenía su propia condición de carrera: después de que el borrado tenía éxito, el caché viejo mostraba por un momento la reserva cancelada antes de que llegara la recarga. Lo resolví actualizando el caché en el mismo tick del éxito. Ninguno de estos bugs aparecía en una captura: cada uno necesitó una prueba end-to-end que esperara los cinco segundos reales, o leer directamente los estilos calculados.",
      impact: [
        "En producción: web, API, worker y app Android en Google Play (pruebas internas y cerradas)",
        "~121 pruebas de integración contra PostgreSQL real con Testcontainers, más pruebas end-to-end con Playwright en modo claro y oscuro",
        "CI con 4 jobs en paralelo en cada push: pruebas de API, chequeos de la app, builds de Docker y end-to-end",
        "3 plataformas desde una sola base de código en TypeScript",
        "~$0/mes de costo operativo con infraestructura que escala a cero",
      ],
      lessons:
        "Probar pronto en un dispositivo real. La web y el emulador se veían bien, pero la versión de Play Store tenía el mapa en negro y el inicio de sesión con Google se quedaba colgado. La causa: Google vuelve a firmar la app con su propio certificado de Play App Signing, y ese SHA-1 no estaba permitido en las llaves de API. Ahora trato el build firmado para release en hardware real como un entorno propio, no como un trámite después de que la web funciona.",
    },
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
