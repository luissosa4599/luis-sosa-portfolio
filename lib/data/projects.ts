import type { ProjectEntry } from "@/lib/types"

export const projects: ProjectEntry[] = [
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
]
