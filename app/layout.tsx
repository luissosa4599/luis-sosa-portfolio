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
  title: "Luis Sosa — Frontend Engineer",
  description:
    "Frontend engineer building dashboards, internal tools, and product interfaces for data-heavy teams.",
  metadataBase: new URL("https://luissosa.dev"),
  openGraph: {
    title: "Luis Sosa — Frontend Engineer",
    description:
      "Frontend engineer building dashboards, internal tools, and product interfaces for data-heavy teams.",
    url: "https://luissosa.dev",
    siteName: "Luis Sosa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Sosa — Frontend Engineer",
    description:
      "Frontend engineer building dashboards, internal tools, and product interfaces for data-heavy teams.",
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
          defaultTheme="dark"
          enableSystem={false}
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
