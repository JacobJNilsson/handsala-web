"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import MarkdownRenderer from "./MarkdownRenderer"
import BlogImage from "./BlogImage"
import { type BlogPost } from "@/lib/blog/markdown"

const EASE = [0.22, 1, 0.36, 1] as const

export default function ClientBlogPostPage({
  post,
}: {
  post: BlogPost
  allPosts: BlogPost[]
  slug: string
}) {
  // the page header already shows the title, so a leading h1 in the
  // markdown would duplicate it
  const body = post.content.replace(/^\s*#\s.+\r?\n/, "")
  return (
    <main className="min-h-screen bg-vellum pb-28 pt-32">
      <article className="mx-auto max-w-[90rem] px-6 sm:px-10">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="border-t-2 border-ink pt-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <Link
              href="/blog"
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint transition-colors hover:text-vermillion"
            >
              ← All posts
            </Link>
            <time className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
              {post.date}
            </time>
          </div>

          <h1 className="display-serif mt-8 max-w-5xl text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] text-ink">
            {post.title}
          </h1>

          {post.coverImage && (
            <div className="relative mt-12 aspect-video max-w-4xl overflow-hidden border-2 border-ink bg-vellum-deep shadow-[10px_10px_0_0_oklch(55%_0.185_33)]">
              <BlogImage src={post.coverImage} alt={`Cover image for ${post.title}`} />
            </div>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-14 md:grid md:grid-cols-12"
        >
          <div className="md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-3">
            <MarkdownRenderer markdown={body} />
          </div>
        </motion.div>
      </article>
    </main>
  )
}
