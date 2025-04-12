"use client"

import { motion } from "framer-motion"
import { ReactNode, useEffect } from "react"
import { useBackgroundColor } from "./PageTransitionContext"
import { TRANSITION_DURATION } from "./TransitionLink"

interface PageTransitionProps {
  children: ReactNode
  bgColor?: string
}

export default function PageTransition({ children, bgColor = "slate-800" }: PageTransitionProps) {
  const { backgroundColor, setBackgroundColor, endTransition } = useBackgroundColor()

  useEffect(() => {
    // Set the background color when the component mounts
    setBackgroundColor(bgColor)

    // End the transition after content has faded in
    const timer = setTimeout(() => {
      endTransition();
    }, (TRANSITION_DURATION/2));

    return () => clearTimeout(timer);
  }, [bgColor, setBackgroundColor, endTransition])

  return (
    <div className="relative">
      {/* Fixed background */}
      <div
        className="fixed inset-0 -z-10"
        style={{ backgroundColor }}
      />

      {/* Content with fade in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: TRANSITION_DURATION/2/1000,
          ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier curve for smoother motion
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
