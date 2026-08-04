"use client"

import { useState } from "react"

export default function Colophon() {
  const [found, setFound] = useState(false)

  return (
    <footer className="bg-ink px-6 py-12 text-vellum/55">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-4 border-t border-vellum/15 pt-6 text-[11px] font-medium uppercase tracking-[0.25em] sm:grid-cols-3 sm:items-center">
        <p>© {new Date().getFullYear()} Handsala AB</p>
        <p className="sm:text-center">Set in Sentient &amp; Archivo</p>
        <button
          type="button"
          onClick={() => setFound(true)}
          className="select-none text-base text-vellum/20 transition-colors hover:text-vellum/70 sm:justify-self-end"
          aria-label="A stray character"
        >
          ᛟ
        </button>
      </div>
      {found && (
        <p className="mx-auto mt-4 max-w-[90rem] text-right font-mono text-[11px] normal-case tracking-normal text-vellum/60">
          That one means inheritance. Thanks for reading to the end.
        </p>
      )}
    </footer>
  )
}
