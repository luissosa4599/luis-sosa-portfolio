import type { MetadataRoute } from "next"
import { getProjects } from "@/lib/data/projects"

const BASE_URL = "https://luissosa.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    ...getProjects("en").map((p) => ({
      url: `${BASE_URL}/work/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ]
}
