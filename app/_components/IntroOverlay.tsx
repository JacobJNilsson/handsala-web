"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import ClaspAnimation from "./ClaspAnimation"

const INTRO_KEY = "handsala-intro-played"

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [play, setPlay] = useState(false)
  const reduceMotion = useReducedMotion()
  const overlay = useAnimationControls()
  const finished = useRef(false)

  const finish = useRef(async (skip: boolean) => {
    if (finished.current) return
    finished.current = true
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1")
    } catch {}
    document.body.style.overflow = ""
    await overlay.start({
      y: "-100%",
      transition: { duration: skip ? 0.35 : 0.6, ease: [0.76, 0, 0.24, 1] },
    })
    setVisible(false)
  })

  useEffect(() => {
    let played = false
    try {
      played = Boolean(window.sessionStorage.getItem(INTRO_KEY))
    } catch {}
    if (played || reduceMotion) {
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
      className="fixed inset-0 z-[100] flex items-center overflow-hidden bg-vermillion"
    >
      <div className="noise" />
      {play && (
        <ClaspAnimation
          autoPlay="mount"
          speed={4}
          onDone={() => {
            window.setTimeout(() => finish.current(false), 350)
          }}
          className="block h-auto w-full"
        />
      )}
    </motion.div>
  )
}
