import type { Metadata } from "next"
import { Inter, Playfair_Display } from 'next/font/google'
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Mystic Quiz Hub",
  description: "Discover Your Cosmic Truth",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${playfairDisplay.variable} min-h-screen transition-colors duration-300 font-body antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-[#1B1B1B] transition-all duration-300">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
