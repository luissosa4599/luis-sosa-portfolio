import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { Research } from "@/components/sections/Research"
import { Approach } from "@/components/sections/Approach"
import { Contact } from "@/components/sections/Contact"
import { SectionProgress } from "@/components/primitives/SectionProgress"

export default function Home() {
  return (
    <>
      {/* Dot-grid background — fixed, full page */}
      <div
        aria-hidden
        className="dot-grid fixed inset-0 pointer-events-none z-0"
        style={{ maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)" }}
      />
      <SiteHeader />
      <SectionProgress />
      <main className="relative z-10">
        <Hero />
        <Research />
        <Projects />
        <Approach />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
