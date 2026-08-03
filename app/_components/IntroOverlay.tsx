"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import { HandshakeArt, runClaspSequence } from "./handshake-art"

const INTRO_KEY = "handsala-intro-played"

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [clasped, setClasped] = useState(false)
  const reduceMotion = useReducedMotion()
  const left = useAnimationControls()
  const right = useAnimationControls()
  const body = useAnimationControls()
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
    let cancelled = false
    const run = async () => {
      await new Promise((r) => setTimeout(r, 400))
      if (cancelled || finished.current) return
      await runClaspSequence({ left, right, body, setClasped })
      if (cancelled || finished.current) return
      await new Promise((r) => setTimeout(r, 350))
      finish.current(false)
    }
    run()
    return () => {
      cancelled = true
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
      <HandshakeArt
        clasped={clasped}
        left={left}
        right={right}
        body={body}
        className="block h-auto w-full text-vellum"
      />
    </motion.div>
  )
}
