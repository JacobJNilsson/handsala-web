"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMenu() {
  const pathname = usePathname()

  return (
    <nav className="bg-beige-50/99 backdrop-blur-sm border-b border-cornflowerBlue fixed w-full z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="#home"
            className="text-2xl font-bold text-beige-900 hover:text-cornflowerBlue transition-all duration-300 poiret-one-regular"
          >
            Handsala
          </Link>

          <div className="flex space-x-8">
            <Link
              href="#products"
              className={`text-lg ${
                pathname === "/products"
                  ? "text-cornflowerBlue font-medium border-b-2 border-blue"
                  : "text-beige-800 hover:text-blue border-b-2 border-transparent"
              } transition-all duration-300 py-1`}
            >
              Products
            </Link>
            <Link
              href="#contact"
              className={`text-lg ${
                pathname === "/contact"
                  ? "text-cornflowerBlue font-medium border-b-2 border-blue"
                  : "text-beige-800 hover:text-blue border-b-2 border-transparent"
              } transition-all duration-300 py-1`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
