import type { Metadata } from "next"
import { Nunito, Nunito_Sans } from "next/font/google"
import clsx from "clsx"
import "./globals.css"
import { createClient } from "@/prismicio"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle("settings")
  return {
    title: page.data.site_title || "Flowrise",
    description:
      page.data.meta_description || "Flowrise is the relaxing app for you.",
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunito_sans.variable)}>
      <body>
        <header className="font-display">Header!</header>
        {children}
        <footer className="font-display">Footer!</footer>
      </body>
    </html>
  )
}
