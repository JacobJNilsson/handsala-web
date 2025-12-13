import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
				// Minimalistic Beige Palette
				beige: {
					50: '#fdfbf7',
					100: '#f7f3e8',
					200: '#efe5d1',
					300: '#e5d1b0',
					400: '#dbb98e',
					500: '#d2a072',
					600: '#c5865a',
					700: '#a46a48', // Text/Accent
					800: '#87563e',
					900: '#6d4633',
				},
				slate: {
					800: '#1e293b',
					900: '#0f172a',
				},
				// Mapping old specific colors to new theme (soft migration or direct replacement)
				cornflowerBlue: '#2d3748', // Replace blue with dark slate for text/headers to be "dev minimalistic"
				orangeRed: '#e53e3e',

				background: '#f8eedbff', // usage: bg-background
				foreground: '#1e293b', // usage: text-foreground
				muted: '#64748b',

  			card: {
					DEFAULT: '#fdfbf7e4',
					foreground: '#1e293b'
  			},
  			popover: {
					DEFAULT: '#ffffff',
					foreground: '#1e293b'
  			},
  			primary: {
					DEFAULT: '#1e293b',
					foreground: '#fdfbf7'
  			},
  			secondary: {
					DEFAULT: '#efe5d1',
					foreground: '#1e293b'
  			},
  			accent: {
					DEFAULT: '#d2a072',
					foreground: '#fdfbf7'
  			},
  			destructive: {
					DEFAULT: '#ef4444',
					foreground: '#fdfbf7'
  			},
				border: '#e2e8f0',
				input: '#e2e8f0',
				ring: '#cbd5e1',
  			chart: {
					'1': '#64748b',
					'2': '#94a3b8',
					'3': '#cbd5e1',
					'4': '#e2e8f0',
					'5': '#f1f5f9'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [animate],
}
export default config
