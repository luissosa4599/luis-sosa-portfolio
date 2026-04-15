import type { ProjectEntry } from "@/lib/types"

export const projects: ProjectEntry[] = [
  {
    slug: "operations-dashboard",
    title: "Operations Dashboard",
    description:
      "A full-stack order management and analytics platform for logistics operations.",
    tags: ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "Recharts"],
    url: "https://github.com/luissosa4599/operations-dashboard",
    githubUrl: "https://github.com/luissosa4599/operations-dashboard",
    featured: true,
    private: false,
    role: "Full-stack lead — designed the data model, built the API, and owned the entire frontend.",
    highlights: [
      "Real-time order tracking with WebSocket updates and optimistic UI",
      "Analytics dashboard with custom Recharts components and date-range filtering",
      "Role-based access control with per-route middleware on Laravel",
      "Reduced order processing time by ~40% through workflow automation",
    ],
  },
  {
    slug: "internal-platform",
    title: "Internal Operations Platform",
    description:
      "Designed and built an internal platform from raw business requirements, focused on usability and real-world workflows.",
    tags: ["Vue.js", "Nuxt", "TypeScript", "REST APIs"],
    featured: false,
    private: true,
  },
]
