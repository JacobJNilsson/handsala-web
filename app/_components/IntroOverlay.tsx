"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion"
import ClaspAnimation from "./ClaspAnimation"

/* The skip check must run before the first paint, or a skipped intro
   still flashes one orange frame. */
const useBeforePaint = typeof window !== "undefined" ? useLayoutEffect : useEffect

/* Module scope: survives route changes, resets on a full page load.
   The intro greets every real entry to the site, but does not replay
   when the visitor navigates back to the front page. */
let playedThisPageLoad = false

/* The CSS bail-out (see globals.css) slides the overlay away after
   this delay, with no JavaScript. Its clock starts at first paint,
   so at performance.now() >= BAIL_MS the slide may already run. */
const BAIL_MS = 4000

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [bail, setBail] = useState(true)
  const [play, setPlay] = useState(false)
  const [armExtend, setArmExtend] = useState(0)
  const reduceMotion = useReducedMotion()
  const overlayY = useMotionValue(0)
  const finished = useRef(false)

  const finish = useRef(async (skip: boolean) => {
    if (finished.current) return
    finished.current = true
    playedThisPageLoad = true
    document.body.style.overflow = ""
    await animate(overlayY, -window.innerHeight * 1.02, {
      duration: skip ? 0.35 : 0.6,
      ease: [0.76, 0, 0.24, 1],
    })
    setVisible(false)
  })

  useBeforePaint(() => {
    // a full page load resets the module flag, so navigation from an
    // own page (for example the blog) must not replay the intro; a
    // reload or a real entry from outside still plays it
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
    const type = nav?.type ?? "navigate"
    const internal = document.referrer.startsWith(window.location.origin)
    const skip = type === "back_forward" || (type === "navigate" && internal)
    if (playedThisPageLoad || skip || reduceMotion) {
      finished.current = true
      setVisible(false)
      return
    }
    /* Late hydration: the CSS bail-out may already slide the overlay
       away. A replay would pop it back over content the visitor
       reads. The visitor also waited long enough; show the page. */
    if (performance.now() >= BAIL_MS) {
      finished.current = true
      playedThisPageLoad = true
      setVisible(false)
      return
    }
    setBail(false)
    document.body.style.overflow = "hidden"
    // measure how far the viewport reaches past the scene box, so the
    // arm lines can end outside the view at any window size
    const vw = window.innerWidth
    const vh = window.innerHeight
    const boxW = Math.min(vw, (vh * 1024) / 950)
    const overhang = Math.max(0, (vw - boxW) / 2 / (boxW / 1024))
    setArmExtend(overhang + 126)
    setPlay(true)
    /* A scroll gesture lifts the overlay in phase with the gesture,
       like a curtain. The page below stays locked until the overlay
       is gone, so the visitor always lands on the hero. A short
       gesture falls back; a pull past the commit point completes. */
    let lift = 0
    let settle: number | undefined
    const applyLift = (delta: number) => {
      if (finished.current) return
      lift = Math.min(Math.max(lift + delta, 0), window.innerHeight)
      overlayY.set(-lift)
      window.clearTimeout(settle)
      if (lift >= window.innerHeight) {
        finish.current(true)
        return
      }
      settle = window.setTimeout(() => {
        if (finished.current || lift === 0) return
        if (lift >= window.innerHeight * 0.2) {
          finish.current(true)
        } else {
          animate(overlayY, 0, { duration: 0.3, ease: [0.22, 1, 0.36, 1] })
          lift = 0
        }
      }, 180)
    }
    const onWheel = (e: WheelEvent) => applyLift(e.deltaY)
    let touchY: number | null = null
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) {
        touchY = e.touches[0].clientY
        return
      }
      applyLift(touchY - e.touches[0].clientY)
      touchY = e.touches[0].clientY
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    return () => {
      document.body.style.overflow = ""
      window.clearTimeout(settle)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <motion.div
      style={{ y: overlayY }}
      onClick={() => finish.current(true)}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-vermillion${
        bail ? " intro-bail" : ""
      }`}
    >
      <div className="noise" />
      {play && (
        <ClaspAnimation
          autoPlay="mount"
          speed={4}
          overshoot
          armExtend={armExtend}
          onDone={() => {
            window.setTimeout(() => finish.current(false), 350)
          }}
          className="block h-auto w-[min(100vw,107.8vh)] overflow-visible"
        />
      )}
    </motion.div>
  )
}
