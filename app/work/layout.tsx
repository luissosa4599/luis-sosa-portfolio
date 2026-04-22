import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CaseStudyHeader />
      {children}
      <SiteFooter />
    </>
  )
}
