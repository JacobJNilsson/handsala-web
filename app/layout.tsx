import "./globals.css"
import { NavMenu } from "@/components/ui/nav-menu"
import GrainTuner from "./_components/GrainTuner"
import MotionProvider from "./_components/MotionProvider"
import { Archivo, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Metadata } from 'next/types'

/* Editorial serif (Sentient, Fontshare ITF license) in the Editorial New role */
const sentient = localFont({
  src: [
    { path: './fonts/Sentient-Variable.woff2', weight: '200 700', style: 'normal' },
    { path: './fonts/Sentient-VariableItalic.woff2', weight: '200 700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-display',
})

/* Neutral grotesk in the Neue Haas role */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: "Handsala AB",
  description: "Let's shake on it",
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/favicon-dark.ico',
      media: '(prefers-color-scheme: dark)',
    },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sentient.variable} ${archivo.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <body className={archivo.className}>
        <MotionProvider>
          <div className="noise" />
          <div className="content min-h-screen text-ink">
            <NavMenu />
            {children}
          </div>
          {process.env.NODE_ENV === "development" && <GrainTuner />}
        </MotionProvider>
      </body>
    </html>
  )
}
