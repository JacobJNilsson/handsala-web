"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function NavMenu() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const onInk = isHomePage && !scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getHomeLink = (section: string) => (isHomePage ? `#${section}` : `/#${section}`)

  const linkClass = `relative text-xs font-medium uppercase tracking-[0.25em] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-vermillion-bright after:transition-all after:duration-300 hover:after:w-full ${
    onInk ? "text-vellum/80 hover:text-vellum" : "text-ink hover:text-vermillion"
  }`

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b-2 border-ink bg-vellum py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Link
            href={getHomeLink("home")}
            className={`font-mono text-xl font-bold tracking-tight transition-colors ${
              onInk ? "text-vellum hover:text-vermillion-bright" : "text-ink hover:text-vermillion"
            }`}
          >
            Handsala
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors md:hidden ${onInk ? "text-vellum" : "text-ink"}`}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden items-center gap-10 md:flex">
            <Link href={getHomeLink("products")} className={linkClass}>Work</Link>
            <Link href="/blog" className={linkClass}>Blog</Link>
            <Link href={getHomeLink("contact")} className={linkClass}>Contact</Link>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="mt-3 flex flex-col gap-1 border-2 border-ink bg-vellum p-4"
                onClick={() => setIsOpen(false)}
              >
                <Link href={getHomeLink("products")} className="px-2 py-3 text-sm font-medium uppercase tracking-[0.25em] text-ink hover:text-vermillion">Work</Link>
                <Link href="/blog" className="px-2 py-3 text-sm font-medium uppercase tracking-[0.25em] text-ink hover:text-vermillion">Blog</Link>
                <Link href={getHomeLink("contact")} className="px-2 py-3 text-sm font-medium uppercase tracking-[0.25em] text-ink hover:text-vermillion">Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
