"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import ClaspAnimation from "./ClaspAnimation"

/* The skip check must run before the first paint, or a skipped intro
   still flashes one orange frame. */
const useBeforePaint = typeof window !== "undefined" ? useLayoutEffect : useEffect

/* Module scope: survives route changes, resets on a full page load.
   The intro greets every real entry to the site, but does not replay
   when the visitor navigates back to the front page. */
let playedThisPageLoad = false

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [play, setPlay] = useState(false)
  const reduceMotion = useReducedMotion()
  const overlay = useAnimationControls()
  const finished = useRef(false)

  const finish = useRef(async (skip: boolean) => {
    if (finished.current) return
    finished.current = true
    playedThisPageLoad = true
    document.body.style.overflow = ""
    await overlay.start({
      y: "-100%",
      transition: { duration: skip ? 0.35 : 0.6, ease: [0.76, 0, 0.24, 1] },
    })
    setVisible(false)
  })

  useBeforePaint(() => {
    if (playedThisPageLoad || reduceMotion) {
      finished.current = true
      setVisible(false)
      return
    }
    document.body.style.overflow = "hidden"
    setPlay(true)
    return () => {
      document.body.style.overflow = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <motion.div
      animate={overlay}
      onClick={() => finish.current(true)}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-vermillion"
    >
      <div className="noise" />
      {play && (
        <ClaspAnimation
          autoPlay="mount"
          speed={4}
          overshoot
          onDone={() => {
            window.setTimeout(() => finish.current(false), 350)
          }}
          className="block h-auto w-[min(100vw,107.8vh)] overflow-visible"
        />
      )}
    </motion.div>
  )
}
