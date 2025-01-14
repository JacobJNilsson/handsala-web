import "./globals.css"
import { NavMenu } from "@/components/ui/nav-menu"

export const metadata = {
  title: "Handsala AB",
  description: "Built on trust, honor, and mutual respect",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Poiret+One&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="content">
          <NavMenu />
          {children}
        </div>
      </body>
    </html>
  )
}
