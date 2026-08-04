"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import HandshakeClasp from "./HandshakeClasp"

const SHAKE_KEY = "handsala-handshakes"

export default function ContactSection() {
  const [shakes, setShakes] = useState<number | null>(null)
  const [playSignal, setPlaySignal] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(SHAKE_KEY) ?? "0")
    setShakes(Number.isFinite(stored) ? stored : 0)
  }, [])

  const shake = () => {
    const el = headingRef.current
    if (el) {
      el.classList.remove("handshake")
      void el.offsetWidth
      el.classList.add("handshake")
    }
    setPlaySignal((s) => s + 1)
    setShakes((prev) => {
      const next = (prev ?? 0) + 1
      window.localStorage.setItem(SHAKE_KEY, String(next))
      return next
    })
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-vermillion pb-28 pt-16 text-vellum">
      <div className="relative mx-auto max-w-[90rem] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-14 border-t-2 border-vellum/40 pt-4">
            <div className="flex items-center justify-between gap-8">
              <button
                type="button"
                onClick={shake}
                className="block text-left"
                aria-label="Shake hands"
              >
                <h2
                  ref={headingRef}
                  className="display-serif max-w-4xl text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.95] text-vellum"
                >
                  Let&apos;s <em className="italic">shake</em> on&nbsp;it.
                </h2>
              </button>
              <div className="hidden w-44 shrink-0 sm:block md:w-60">
                <HandshakeClasp playSignal={playSignal} onShake={shake} />
              </div>
            </div>
            {shakes !== null && shakes > 0 && (
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.25em] text-vellum/70">
                handshakes so far: {shakes}
                {shakes >= 20 && " · okay, deal, deal, we get it"}
              </p>
            )}
          </div>

          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="max-w-prose text-lg font-light leading-relaxed text-vellum/90">
                I&apos;m open for new projects and odd ideas. Based in Gothenburg, working
                remotely, one message away.
              </p>
            </div>

            <div className="space-y-6 text-xl md:col-span-7 md:pl-6 sm:text-2xl">
              <p className="flex flex-wrap items-baseline gap-x-6">
                <span className="w-16 text-[11px] font-medium uppercase tracking-[0.25em] text-vellum/70">Email</span>
                <a
                  href="mailto:jacob@handsala.com"
                  className="font-display font-medium text-vellum underline decoration-vellum/40 decoration-2 underline-offset-8 transition-colors hover:decoration-vellum"
                >
                  jacob@handsala.com
                </a>
              </p>
              <p className="flex flex-wrap items-baseline gap-x-6">
                <span className="w-16 text-[11px] font-medium uppercase tracking-[0.25em] text-vellum/70">Social</span>
                <a
                  href="https://linkedin.com/in/jacob-john-nilsson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-medium text-vellum underline decoration-vellum/40 decoration-2 underline-offset-8 transition-colors hover:decoration-vellum"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
