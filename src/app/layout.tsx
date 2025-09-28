import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"
import { Toaster } from "sonner"
//  import { GoogleAdSenseScript } from "@/components/public/google-adsense"

// Load Inter font from Google
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Republic Mirror - Reflection of Truth",
  description: "Your trusted source for news and information",
  generator: "Republic Mirror",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Optional: Add any analytics or ads scripts here */}
        {/* <GoogleAdSenseScript /> */}
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <LanguageProvider>
          <Toaster position="top-right" />
          <Suspense fallback={null}>{children}</Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
