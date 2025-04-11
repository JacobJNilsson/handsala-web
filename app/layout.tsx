import "./globals.css"
import { NavMenu } from "@/components/ui/nav-menu"
import { Lora, Poiret_One } from 'next/font/google'
import Script from 'next/script'

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

export const metadata = {
  title: "Handsala AB",
  description: "Built on trust, honor, and mutual respect",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-dark.ico' },
    ],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lora.variable} ${poiretOne.variable}`}>
      <head>
        <Script id="dark-mode-favicon" strategy="afterInteractive">
          {`
            // Function to change favicon based on dark mode
            function updateFavicon() {
              const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
              const faviconLinks = document.querySelectorAll('link[rel="icon"]');

              // If in dark mode, use the white background favicon
              if (darkModeMediaQuery.matches) {
                faviconLinks.forEach(link => {
                  link.setAttribute('href', '/favicon-dark.ico');
                });
              } else {
                // Restore default favicon in light mode
                faviconLinks.forEach(link => {
                  link.setAttribute('href', '/favicon.ico');
                });
              }
            }

            // Run once on page load
            updateFavicon();

            // Listen for changes in color scheme preference
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>
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
