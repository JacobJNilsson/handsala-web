"use client"

import { useState } from "react"
import ClaspAnimation from "../_components/ClaspAnimation"

/* Lab wrapper around the site's clasp animation. Click to replay. */
export default function ClaspDemo({ speed = 1 }: { speed?: number }) {
  const [signal, setSignal] = useState(0)
  return (
    <button
      type="button"
      onClick={() => setSignal((s) => s + 1)}
      className="block w-full"
      aria-label="Play the clasp"
    >
      <div className="overflow-hidden bg-vermillion">
        <ClaspAnimation
          autoPlay="inView"
          speed={speed}
          playSignal={signal}
          className="mx-auto block h-auto w-full max-w-3xl"
        />
      </div>
    </button>
  )
}
