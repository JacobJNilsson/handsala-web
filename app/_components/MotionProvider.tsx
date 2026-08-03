"use client"

import { MotionConfig } from "framer-motion"

/* Respects the system reduced-motion preference for all motion
   components below it. Transform and layout animations then jump to
   their end state; opacity still fades. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
