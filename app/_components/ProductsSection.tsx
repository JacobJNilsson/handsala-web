"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="products"
      className="min-h-screen py-16 flex items-center justify-center bg-beige-50 z-2 -mt-2"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-cornflowerBlue mb-4 text-center">
            Stuff I&apos;ve Built
          </h2>
          <p className="text-lg sm:text-xl text-beige-800 mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
            Projects that kept me up at night (in a good way)
          </p>

          <Link href="https://play.google.com/store/apps/details?id=se.handsala.spectrum&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-orangeRed hover:shadow-2xl transition-shadow duration-300">
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-48 sm:h-64 md:h-full bg-beige-100">
                  <Image
                    src="/palette-filled-game.png"
                    alt="Screenshot of Pallet game showing filled puzzle state"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-8">
                  <div className="mb-2">
                    <span className="inline-block bg-coral text-white text-sm font-medium px-3 py-1 rounded-full">
                      Puzzle Game
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                    Palette
                  </h3>
                  <p className="text-beige-800 mb-6 leading-relaxed">
                    A passion project that asks: &quot;What if Sudoku and coloring books had a baby?&quot;
                    It&apos;s a puzzle game with randomly generated areas where you fill in colors following specific rules.
                    Each puzzle is unique, so you&apos;ll never get bored (or I&apos;ll give you your money back... wait, it&apos;s free).
                    {/* Built it with Flutter because I like my apps like I like my development - smooth and cross-platform. */}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                        What Makes It Special
                      </h4>
                      <ul className="list-disc list-inside text-beige-800 space-y-1">
                        <li>Fresh puzzles daily (I don&apos;t sleep, I generate puzzles)</li>
                        <li>Multiple grid sizes for when you&apos;re feeling extra smart</li>
                        <li>Clean, colorful design with no mandatory ads or in-app purchases</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                        Built with
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-beige-100 text-orangeRed px-3 py-1 rounded-full text-sm">
                          Flutter
                        </span>
                        <span className="bg-beige-100 text-cornflowerBlue px-3 py-1 rounded-full text-sm">
                          Dart
                        </span>
                        <span className="bg-beige-100 text-cornflowerBlue px-3 py-1 rounded-full text-sm">
                          Dancing Links
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
