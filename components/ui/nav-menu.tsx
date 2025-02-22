"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function NavMenu() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            href="#home"
            className={`text-2xl font-bold transition-all duration-300 poiret-one-regular ${
              scrolled ? "text-beige-50" : "text-beige-50"
            } hover:opacity-80`}
          >
            Handsala
          </Link>

          <div className="flex space-x-8">
            <Link
              href="#products"
              className={`text-lg transition-all duration-300 py-1 ${
                scrolled
                  ? "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
                  : "text-beige-50 hover:text-beige-200 border-b-2 border-transparent hover:border-beige-50"
              }`}
            >
              Products
            </Link>
            <Link
              href="#contact"
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
      </div>
    </nav>
  )
}
