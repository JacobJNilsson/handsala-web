"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { type BlogPost } from "@/lib/blog/markdown"

const EASE = [0.22, 1, 0.36, 1] as const

export default function ClientBlogPage({ posts }: { posts: BlogPost[] }) {
  return (
    <main className="min-h-screen bg-vellum pb-28 pt-32">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-4 flex flex-wrap items-end justify-between gap-4 border-t-2 border-ink pt-4"
        >
          <h1 className="display-serif text-5xl text-ink sm:text-7xl">Blog</h1>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
            ({String(posts.length).padStart(2, "0")}) posts
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="mt-12 text-lg text-ink-soft">No posts yet.</p>
        ) : (
          <div>
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: EASE }}
                className="grid items-start gap-6 border-t border-ink/20 py-12 first:border-t-0 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-3">
                  <time className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
                    {post.date}
                  </time>
                  {post.readingTime && (
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
                      {post.readingTime}
                    </p>
                  )}
                </div>

                <div className={post.coverImage ? "md:col-span-6" : "md:col-span-9"}>
                  <h2 className="display-serif text-3xl leading-tight text-ink sm:text-5xl">
                    <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-vermillion">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {post.coverImage && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block md:col-span-3"
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink bg-vellum-deep shadow-[8px_8px_0_0_oklch(55%_0.185_33)] transition-shadow duration-300 group-hover:shadow-[8px_8px_0_0_oklch(24%_0.028_270)]">
                      <Image
                        src={post.coverImage}
                        alt={`Cover image for ${post.title}`}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
