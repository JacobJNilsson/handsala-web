"use client"

import { useState } from "react"

export default function Colophon() {
  const [found, setFound] = useState(false)

  return (
    <footer className="bg-ink px-6 py-12 text-vellum/55">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 border-t border-vellum/15 pt-6 text-[11px] font-medium uppercase tracking-[0.25em]">
        <p>© {new Date().getFullYear()} Handsala AB</p>
        <p>Set in Sentient &amp; Archivo</p>
        <button
          type="button"
          onClick={() => setFound(true)}
          className="select-none text-base text-vellum/20 transition-colors hover:text-vellum/70"
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
