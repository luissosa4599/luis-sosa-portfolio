import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Research } from "@/components/sections/Research"
import { Approach } from "@/components/sections/Approach"
import { Testimonials } from "@/components/sections/Testimonials"
import { Contact } from "@/components/sections/Contact"
import { SectionProgress } from "@/components/primitives/SectionProgress"
import { DustField } from "@/components/primitives/DustField"
import { PageReveal } from "@/components/primitives/PageReveal"
import { BackToTop } from "@/components/primitives/BackToTop"

export default function Home() {
  return (
    <PageReveal>
      {/* Dot-grid background — fixed, full page */}
      <div
        aria-hidden
        className="dot-grid fixed inset-0 pointer-events-none z-0"
        style={{ maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)" }}
      />
      <DustField />
      <SiteHeader />
      <SectionProgress />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Research />
        <Approach />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </PageReveal>
  )
}
