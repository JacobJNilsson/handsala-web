"use client"

import { useEffect, useState } from "react"

/* Development panel that tunes the grain overlay live. It writes
   inline styles onto every .noise element. Read the values off the
   panel and set them in globals.css when they look right. */
export default function GrainTuner() {
  const [open, setOpen] = useState(false)
  const [opacity, setOpacity] = useState(0.14)
  const [size, setSize] = useState(900)
  const [freq, setFreq] = useState(1)
  const [octaves, setOctaves] = useState(1)

  useEffect(() => {
    const svg = `<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${octaves}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>`
    for (const el of document.querySelectorAll<HTMLElement>(".noise")) {
      el.style.opacity = String(opacity)
      el.style.backgroundSize = `${size}px ${size}px`
      el.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
    }
  }, [opacity, size, freq, octaves])

  return (
    <div className="fixed bottom-4 right-4 z-[200] font-mono text-[11px] text-ink">
      {open ? (
        <div className="w-64 border-2 border-ink bg-vellum p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold uppercase tracking-[0.2em]">Grain</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
          </div>
          <label className="mb-3 block">
            opacity: {opacity.toFixed(2)}
            <input
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="mt-1 w-full"
            />
          </label>
          <label className="mb-3 block">
            size: {size}px
            <input
              type="range"
              min={200}
              max={2400}
              step={50}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mt-1 w-full"
            />
          </label>
          <label className="mb-3 block">
            frequency: {freq.toFixed(2)}
            <input
              type="range"
              min={0.2}
              max={4}
              step={0.05}
              value={freq}
              onChange={(e) => setFreq(Number(e.target.value))}
              className="mt-1 w-full"
            />
          </label>
          <label className="block">
            octaves: {octaves}
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={octaves}
              onChange={(e) => setOctaves(Number(e.target.value))}
              className="mt-1 w-full"
            />
          </label>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border-2 border-ink bg-vellum px-3 py-2 font-bold uppercase tracking-[0.2em]"
        >
          Grain
        </button>
      )}
    </div>
  )
}
