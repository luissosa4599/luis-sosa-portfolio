import type { Metadata, ResolvingMetadata } from "next"
import { CaseStudyView } from "@/components/sections/CaseStudyView"
import { getProject, getProjects } from "@/lib/data/projects"

// Unknown slugs return a real 404 instead of rendering a "not found" view
export const dynamicParams = false

export function generateStaticParams() {
  return getProjects("en").map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: PageProps<"/work/[slug]">,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const project = getProject("en", slug)
  if (!project) return {}

  // Overriding openGraph/twitter drops the root opengraph-image — keep it
  const { openGraph, twitter } = await parent

  const title = `${project.title} — Luis Sosa`
  return {
    title,
    description: project.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description: project.description,
      url: `/work/${slug}`,
      type: "article",
      images: openGraph?.images,
    },
    twitter: { title, description: project.description, images: twitter?.images },
  }
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params
  return <CaseStudyView slug={slug} />
}
