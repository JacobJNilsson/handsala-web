"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NAME = "Handsala"
const RUNES: Record<string, string> = {
  H: "ᚺ",
  A: "ᚨ",
  N: "ᚾ",
  D: "ᛞ",
  S: "ᛊ",
  L: "ᛚ",
}

export default function HeroSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [discovered, setDiscovered] = useState<Set<number>>(new Set())

  const allFound = discovered.size === NAME.length

  const touch = (i: number) => {
    setHovered(i)
    setDiscovered((prev) => {
      if (prev.has(i)) return prev
      const next = new Set(prev)
      next.add(i)
      return next
    })
  }

  return (
    <section
      id="home"
      className="relative z-0 flex min-h-screen flex-col justify-end overflow-hidden bg-ink text-vellum"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 pb-14 pt-28 sm:px-10">
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 flex flex-wrap items-baseline justify-between gap-2 border-t border-vellum/15 pt-4 text-[11px] font-medium uppercase tracking-[0.25em] text-vellum/60"
        >
          <span>Handsala AB</span>
          <span>Gothenburg, Sweden</span>
          <span className="hidden sm:inline">Developer &amp; builder</span>
        </motion.div>

        {/* The name */}
        <h1 className="display-serif mb-10 flex flex-nowrap whitespace-nowrap text-[clamp(3rem,15.5vw,15.5rem)] leading-[0.95] text-vellum">
          {NAME.split("").map((letter, i) => {
            const isRune = hovered === i
            return (
              <motion.button
                key={i}
                type="button"
                aria-label={`Letter ${letter}`}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => touch(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => touch(i)}
                onBlur={() => setHovered(null)}
                onClick={() => touch(i)}
                className={`[font:inherit] cursor-default transition-colors duration-150 ${
                  isRune ? "text-vermillion-bright" : "text-vellum"
                }`}
              >
                {isRune ? RUNES[letter.toUpperCase()] : letter}
              </motion.button>
            )
          })}
        </h1>

        <div className="grid gap-10 border-t border-vellum/15 pt-10 md:grid-cols-12">
          {/* Definition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <p className="font-display text-2xl font-light italic leading-snug text-vellum/90 sm:text-3xl">
              <strong className="not-italic font-medium text-vermillion-bright">hand·sala</strong>{" "}
              (að), v.: to make over (confirm) by shaking hands.
            </p>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.25em] text-vellum/45">
              Concise Dictionary of Old Icelandic
            </p>
            <AnimatePresence>
              {allFound && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-[11px] font-medium uppercase tracking-[0.25em] text-vermillion-bright"
                >
                  All eight found. You read runes now.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 md:pl-6"
          >
            <p className="max-w-prose text-lg font-light leading-relaxed text-vellum/85 sm:text-xl">
              Hey! I&apos;m <span className="font-medium text-vellum">Jacob</span>, a developer who
              finds joy in the logic of code and the chaos of the real world. Whether I&apos;m
              debugging in a café or renovating a house in the woods, I&apos;m always building
              something.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-vermillion px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] text-vellum transition-colors hover:bg-vermillion-bright"
              >
                Shake on it
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">⟶</span>
              </a>
              <a
                href="#products"
                className="inline-flex items-center border border-vellum/30 px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] text-vellum transition-colors hover:border-vellum hover:bg-vellum/5"
              >
                Selected work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
