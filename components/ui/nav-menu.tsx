"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function NavMenu() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
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
      className={`fixed w-full z-10 transition-all duration-300 ${
        scrolled
          ? "bg-cornflowerBlue shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={getHomeLink("home")}
            className={`text-xl sm:text-2xl font-bold transition-all duration-300 poiret-one-regular ${
              scrolled ? "text-beige-50" : "text-beige-50"
            } hover:opacity-80`}
          >
            Handsala
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-beige-50 hover:text-beige-200 focus:outline-none"
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
          <div className="hidden md:flex space-x-8">
            <Link
              href={getHomeLink("products")}
              className={`text-lg transition-all duration-300 py-1 ${
                scrolled
                  ? "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
                  : "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
              }`}
            >
              Products
            </Link>
            <Link
              href="/blog"
              className={`text-lg transition-all duration-300 py-1 ${
                scrolled
                  ? "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
                  : "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
              }`}
            >
              Blog
            </Link>
            <Link
              href={getHomeLink("contact")}
              className={`text-lg transition-all duration-300 py-1 ${
                scrolled
                  ? "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
                  : "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-cornflowerBlue shadow-lg rounded-b-lg">
              <Link
                href={getHomeLink("products")}
                className="block px-3 py-2 text-base font-medium text-beige-50 hover:text-beige-200 hover:bg-cornflowerBlue/80 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-beige-50 hover:text-beige-200 hover:bg-cornflowerBlue/80 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href={getHomeLink("contact")}
                className="block px-3 py-2 text-base font-medium text-beige-50 hover:text-beige-200 hover:bg-cornflowerBlue/80 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
