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
