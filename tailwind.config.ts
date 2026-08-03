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
				// Saga manuscript palette (OKLCH)
				vellum: {
					DEFAULT: 'oklch(94.5% 0.021 85 / <alpha-value>)',
					deep: 'oklch(90% 0.032 83 / <alpha-value>)',
					dark: 'oklch(84% 0.04 82 / <alpha-value>)',
				},
				ink: {
					DEFAULT: 'oklch(24% 0.028 270 / <alpha-value>)',
					soft: 'oklch(33% 0.03 270 / <alpha-value>)',
					faint: 'oklch(45% 0.025 270 / <alpha-value>)',
				},
				oxblood: {
					DEFAULT: 'oklch(41% 0.135 27 / <alpha-value>)',
					deep: 'oklch(33% 0.115 27 / <alpha-value>)',
				},
				vermillion: {
					DEFAULT: 'oklch(55% 0.185 33 / <alpha-value>)',
					bright: 'oklch(62% 0.19 36 / <alpha-value>)',
				},
				ochre: 'oklch(71% 0.105 75 / <alpha-value>)',
				gold: {
					DEFAULT: 'oklch(80% 0.105 85 / <alpha-value>)',
					pale: 'oklch(87% 0.07 88 / <alpha-value>)',
				},
				moss: 'oklch(47% 0.075 140 / <alpha-value>)',

				// Legacy scales kept for the blog & older pages
				beige: {
					50: '#fdfbf7',
					100: '#f7f3e8',
					200: '#efe5d1',
					300: '#e5d1b0',
					400: '#dbb98e',
					500: '#d2a072',
					600: '#c5865a',
					700: '#a46a48',
					800: '#87563e',
					900: '#6d4633',
				},
				slate: {
					800: '#2a2d3f',
					900: '#1c1f2e',
				},

				background: 'oklch(94.5% 0.021 85 / <alpha-value>)', // usage: bg-background
				foreground: 'oklch(24% 0.028 270 / <alpha-value>)', // usage: text-foreground
				muted: 'oklch(45% 0.025 270 / <alpha-value>)',

  			card: {
					DEFAULT: 'oklch(96.5% 0.015 86 / <alpha-value>)',
					foreground: 'oklch(24% 0.028 270 / <alpha-value>)'
  			},
  			popover: {
					DEFAULT: 'oklch(96.5% 0.015 86 / <alpha-value>)',
					foreground: 'oklch(24% 0.028 270 / <alpha-value>)'
  			},
  			primary: {
					DEFAULT: 'oklch(24% 0.028 270 / <alpha-value>)',
					foreground: 'oklch(94.5% 0.021 85 / <alpha-value>)'
  			},
  			secondary: {
					DEFAULT: 'oklch(90% 0.032 83 / <alpha-value>)',
					foreground: 'oklch(24% 0.028 270 / <alpha-value>)'
  			},
  			accent: {
					DEFAULT: 'oklch(55% 0.185 33 / <alpha-value>)',
					foreground: 'oklch(94.5% 0.021 85 / <alpha-value>)'
  			},
  			destructive: {
					DEFAULT: '#c2483c',
					foreground: '#fdfbf7'
  			},
				border: 'oklch(84% 0.04 82 / <alpha-value>)',
				input: 'oklch(84% 0.04 82 / <alpha-value>)',
				ring: 'oklch(55% 0.185 33 / <alpha-value>)',
  			chart: {
					'1': 'oklch(41% 0.135 27 / <alpha-value>)',
					'2': 'oklch(71% 0.105 75 / <alpha-value>)',
					'3': 'oklch(47% 0.075 140 / <alpha-value>)',
					'4': 'oklch(33% 0.03 270 / <alpha-value>)',
					'5': 'oklch(80% 0.105 85 / <alpha-value>)'
  			}
  		},
			fontFamily: {
				display: ['var(--font-display)', 'Georgia', 'serif'],
				serif: ['var(--font-display)', 'Georgia', 'serif'],
				sans: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
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
