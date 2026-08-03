"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useAnimationControls, useInView, useReducedMotion } from "framer-motion"
import { HandshakeArt, runClaspSequence, settleClasp } from "./handshake-art"

export default function HandshakeClasp({
  playSignal,
  onShake,
}: {
  playSignal: number
  onShake: () => void
}) {
  const rootRef = useRef<SVGSVGElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const left = useAnimationControls()
  const right = useAnimationControls()
  const body = useAnimationControls()
  const [clasped, setClasped] = useState(false)
  const playing = useRef(false)

  const play = useCallback(async () => {
    if (playing.current) return
    playing.current = true
    try {
      if (reduceMotion) {
        settleClasp({ left, right, setClasped })
        return
      }
      await runClaspSequence({ left, right, body, setClasped })
    } finally {
      playing.current = false
    }
  }, [left, right, body, reduceMotion])

  useEffect(() => {
    if (inView) play()
  }, [inView, play])

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    play()
  }, [playSignal, play])

  return (
    <button type="button" onClick={onShake} aria-label="Shake hands" className="block w-full">
      <HandshakeArt
        svgRef={rootRef}
        clasped={clasped}
        left={left}
        right={right}
        body={body}
        className="block h-auto w-full text-vellum"
      />
    </button>
  )
}
