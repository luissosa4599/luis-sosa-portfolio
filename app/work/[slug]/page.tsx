import { CaseStudyView } from "@/components/sections/CaseStudyView"

export async function generateStaticParams() {
  return [
    { slug: "operations-dashboard" },
    { slug: "salva-lomitos" },
  ]
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <CaseStudyView slug={slug} />
}
