"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center bg-beige-50 z-0 relative overflow-hidden">
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center z-10 relative"
          >
            <div className="mb-12 font-mono">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-slate-800 mb-6 tracking-tight">
                Handsala
              </h1>
              <div className="text-xl sm:text-2xl text-slate-800/80 max-w-2xl mx-auto font-light leading-relaxed">
                <p className="mb-2 italic font-serif opacity-75">
                  (að), v. to make over (confirm) by shaking hands.
                </p>
                <p className="text-sm uppercase tracking-widest text-slate-800/50 mt-4">
                  Concise Dictionary of Old Icelandic
                </p>
              </div>
            </div>

            <div className="bg-white backdrop-blur-sm p-6 sm:p-10 border border-slate-800/10 shadow-sm max-w-2xl mx-auto text-left">
              <p className="text-slate-800 leading-relaxed text-lg sm:text-xl font-light">
                Hey! I&apos;m <span className="font-semibold">Jacob</span>. A developer who finds joy in the logic of code and the chaos of the real world.
                Whether I&apos;m debugging in a cafe or renovating a house in the woods, I&apos;m always building something.
                From architecture to AI workflows, I believe in structured creativity. Let&apos;s build something lasting.
              </p>

              <div className="mt-8 flex gap-4">
                <a href="#contact" className="inline-block px-6 py-2 bg-slate-800 text-beige-50 font-mono text-sm rounded-lg hover:bg-slate-700 transition-colors">
                  Get in touch
                </a>
                <a href="#products" className="inline-block px-6 py-2 border border-slate-800 text-slate-800 font-mono text-sm rounded-lg hover:bg-slate-800/5 transition-colors">
                  View Work
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
