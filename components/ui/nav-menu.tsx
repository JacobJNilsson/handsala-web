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

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create links that point to sections on the home page
  const getHomeLink = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 font-mono ${
        scrolled
        ? "bg-background/80 backdrop-blur-md border-b border-slate-800/5 py-4"
        : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href={getHomeLink("home")}
            className="text-xl font-bold text-slate-800 hover:opacity-70 transition-opacity tracking-tight"
          >
            Handsala
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800 hover:bg-slate-800/5 p-2 rounded-md transition-colors"
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
          <div className="hidden md:flex space-x-8 text-sm">
            <Link
              href={getHomeLink("products")}
              className="text-slate-800 hover:text-slate-600 transition-colors uppercase tracking-wider"
            >
              Products
            </Link>
            <Link
              href="/blog"
              className="text-slate-800 hover:text-slate-600 transition-colors uppercase tracking-wider"
            >
              Blog
            </Link>
            <Link
              href={getHomeLink("contact")}
              className="text-slate-800 hover:text-slate-600 transition-colors uppercase tracking-wider"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card border border-slate-200 shadow-lg rounded-lg mt-2 font-mono text-sm">
                <Link
                  href={getHomeLink("products")}
                  className="relative block px-4 py-3 text-slate-800 uppercase tracking-wider after:absolute after:bottom-2 after:left-4 after:h-[1px] after:bg-slate-400 after:w-0 hover:after:w-[calc(100%-2rem)] after:transition-all after:duration-300 after:ease-out"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/blog"
                  className="relative block px-4 py-3 text-slate-800 uppercase tracking-wider after:absolute after:bottom-2 after:left-4 after:h-[1px] after:bg-slate-400 after:w-0 hover:after:w-[calc(100%-2rem)] after:transition-all after:duration-300 after:ease-out"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href={getHomeLink("contact")}
                  className="relative block px-4 py-3 text-slate-800 uppercase tracking-wider after:absolute after:bottom-2 after:left-4 after:h-[1px] after:bg-slate-400 after:w-0 hover:after:w-[calc(100%-2rem)] after:transition-all after:duration-300 after:ease-out"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
