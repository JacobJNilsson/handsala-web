"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { products } from "@/lib/products"

/* Click the index to cycle its ink. */
const INDEX_SCHEMES = [
  "text-vermillion",
  "text-ink",
  "text-ochre",
  "text-moss",
]

function IndexNumber({ n }: { n: number }) {
  const [scheme, setScheme] = useState(0)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        setScheme((s) => (s + 1) % INDEX_SCHEMES.length)
      }}
      aria-label={`Project ${n}`}
      className={`display-serif select-none text-[clamp(4rem,8vw,7rem)] leading-none transition-colors ${INDEX_SCHEMES[scheme]}`}
    >
      {String(n).padStart(2, "0")}
    </button>
  )
}

export default function ProductsSection() {
  return (
    <section id="products" className="relative z-10 bg-vellum py-24">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-wrap items-end justify-between gap-4 border-t-2 border-ink pt-4"
        >
          <h2 className="display-serif text-4xl text-ink sm:text-6xl">
            Selected <em className="italic">work</em>
          </h2>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
            ({String(products.length).padStart(2, "0")}) experiments &amp; applications
          </p>
        </motion.div>

        <div>
          {products.map((product, index) => {
            const flipped = index % 2 === 1
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-start gap-8 border-t border-ink/20 py-14 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-2">
                  <IndexNumber n={index + 1} />
                </div>

                <div className={`md:col-span-5 ${flipped ? "md:order-3" : ""}`}>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-vermillion">
                    {product.category}
                  </p>
                  <h3 className="mb-5 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                    <Link
                      href={product.url}
                      target={product.url.startsWith("/") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-vermillion"
                    >
                      {product.title}
                    </Link>
                  </h3>

                  <p className="mb-6 max-w-prose text-lg leading-relaxed text-ink-soft">
                    {product.description}
                  </p>

                  <ul className="mb-6 space-y-1.5">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-baseline gap-3 text-base text-ink-soft">
                        <span aria-hidden className="font-mono text-xs text-vermillion">·</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {product.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="border border-ink/25 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-soft"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={product.url}
                  target={product.url.startsWith("/") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group block md:col-span-5 ${flipped ? "md:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink bg-vellum-deep shadow-[10px_10px_0_0_oklch(55%_0.185_33)] transition-shadow duration-300 group-hover:shadow-[10px_10px_0_0_oklch(24%_0.028_270)]">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
