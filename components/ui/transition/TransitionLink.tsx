"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

// Animation timing constants
export const TRANSITION_DURATION = 130 // milliseconds

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function TransitionLink({
  href,
  children,
  className = "",
  onClick
}: TransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick()

    // If it's an anchor link on the same page, don't handle the transition
    if (href.startsWith('#')) {
      return
    }

    e.preventDefault()

    // Create overlay element for page transition
    const overlay = document.createElement('div')
    overlay.className = 'fixed inset-0 bg-cornflowerBlue z-50 pointer-events-none'
    overlay.style.opacity = '0'
    document.body.appendChild(overlay)

    // Function to handle fade out and cleanup
    const handleFadeOut = () => {
      // Start fade out
      overlay.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: TRANSITION_DURATION/2,
          fill: 'forwards',
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      )

      // Remove overlay after fade out
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay)
        }
      }, TRANSITION_DURATION/2)
    }

    // Animate overlay fade in
    overlay.animate(
      [
        { opacity: 0 },
        { opacity: 1 },
      ],
      {
        duration: TRANSITION_DURATION/2,
        fill: 'forwards',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    )

    // Navigate after fade in
    setTimeout(() => {
      // Set up mutation observer to watch for page content changes
      const observer = new MutationObserver((mutations, obs) => {
        // Look for significant DOM changes that indicate page load
        const significantChanges = mutations.some(mutation =>
          mutation.addedNodes.length > 0 &&
          Array.from(mutation.addedNodes).some(node => {
            if (node instanceof HTMLElement) {
              // Check for specific sections or elements we know exist on our pages
              const hasMainContent = node.tagName === 'MAIN' ||
                                   node.tagName === 'ARTICLE' ||
                                   node.querySelector('main, article')

              // Check for home page specific elements
              const hasHomeContent = node.classList.contains('content') ||
                                   node.querySelector('.content') ||
                                   node.querySelector('[id="home"]') ||
                                   node.querySelector('[id="products"]') ||
                                   node.querySelector('[id="contact"]')

              return hasMainContent || hasHomeContent
            }
            return false
          })
        )

        if (significantChanges) {
          obs.disconnect()
          // Wait a tiny bit for the content to be properly rendered
          setTimeout(handleFadeOut, 50)
        }
      })

      // Start observing the document body for changes
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      // Start navigation
      router.push(href)

      // Safety timeout (5 seconds)
      setTimeout(() => {
        observer.disconnect()
        if (document.body.contains(overlay)) {
          handleFadeOut()
        }
      }, 5000)
    }, TRANSITION_DURATION/2)
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
