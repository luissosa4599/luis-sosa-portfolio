import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Hero } from "@/components/sections/Hero"
import { Research } from "@/components/sections/Research"
import { Approach } from "@/components/sections/Approach"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Research />
        <Approach />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
