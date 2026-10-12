import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { site } from "@/content/site"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "TechVaults: inventory software built around your business", template: "%s · TechVaults" },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: "TechVaults", description: site.description },
}

export const viewport: Viewport = { themeColor: "#ffffff" }

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
