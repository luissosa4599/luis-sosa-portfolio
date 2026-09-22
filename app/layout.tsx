import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { LanguageTransition } from "@/components/layout/LanguageTransition"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { LanguageProvider } from "@/lib/i18n"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Luis Sosa — Full-Stack Engineer",
  description:
    "Full-stack engineer with 4+ years building production software in fintech, payments, SaaS, and enterprise.",
  metadataBase: new URL("https://luissosa.dev"),
  openGraph: {
    title: "Luis Sosa — Full-Stack Engineer",
    description:
      "Full-stack engineer with 4+ years building production software in fintech, payments, SaaS, and enterprise.",
    url: "https://luissosa.dev",
    siteName: "Luis Sosa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Sosa — Full-Stack Engineer",
    description:
      "Full-stack engineer with 4+ years building production software in fintech, payments, SaaS, and enterprise.",
    creator: "@luissosa4599",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <LanguageProvider>
            <LanguageTransition>
              <SmoothScroll>{children}</SmoothScroll>
            </LanguageTransition>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
