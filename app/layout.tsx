import "./globals.css"
import { NavMenu } from "@/components/ui/nav-menu"
import { Lora, Poiret_One } from 'next/font/google'
import { Metadata } from 'next/types'

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

const poiretOne = Poiret_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poiret-one',
})

export const metadata: Metadata = {
  title: "Handsala AB",
  description: "Built on trust, honor, and mutual respect",
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
    <html lang="en" className={`${lora.variable} ${poiretOne.variable}`}>
      <body>
        <div className="content">
          <NavMenu />
          {children}
        </div>
      </body>
    </html>
  )
}
