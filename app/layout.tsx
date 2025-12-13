import "./globals.css"
import { NavMenu } from "@/components/ui/nav-menu"
import { Roboto, Roboto_Mono } from 'next/font/google'
import { Metadata } from 'next/types'
import { Suspense } from "react"

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
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
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <body className={robotoMono.className}>
        <div className="noise" />
        <div className="content min-h-screen text-slate-800 selection:bg-slate-200">
          <NavMenu />
          {children}
        </div>
      </body>
    </html>
  )
}
