"use client"

import { motion } from "framer-motion"
import BlogLayout from "./BlogLayout"
import Image from "next/image"
import Link from "next/link"
import { type BlogPost } from "@/lib/blog/markdown"

interface ClientBlogPageProps {
  posts: BlogPost[]
}

export default function ClientBlogPage({ posts }: ClientBlogPageProps) {
  return (
    <BlogLayout posts={posts}>
      <div className="max-w-none">
        <div className="flex justify-between items-center mb-10 border-b border-slate-400 pb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-2xl font-bold text-slate-800 font-mono tracking-tight"
          >
            Recent Posts
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-slate-800 text-beige-50 font-mono text-sm rounded-lg hover:bg-slate-700 transition-all duration-300"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>

        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="text-slate-600 font-light"
          >
            No posts yet. Check back soon!
          </motion.p>
        ) : (
            <div className="space-y-12">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article
                    className="bg-card overflow-hidden shadow-none border border-[#e2e0d6] hover:border-slate-400 transition-all duration-300"
                  >
                    <div className="md:grid md:grid-cols-[1fr_2fr]">
                      {positionImage(post)}
                      <div className="p-6 md:p-6 flex flex-col justify-center">
                        <div className="flex items-center text-[10px] text-slate-400 mb-2 font-mono uppercase tracking-wider space-x-2">
                          <time>{post.date}</time>
                          {/* Add category if available later */}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-slate-800 group-hover:text-slate-600 transition-colors font-mono tracking-tight">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed font-light text-sm line-clamp-2">{post.excerpt}</p>
                        <div className="mt-3 flex items-center text-xs text-slate-500 font-mono group-hover:text-slate-800 transition-colors">
                          Read more <span className="ml-2">→</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}

function positionImage(post: BlogPost) {
  if (!post.coverImage) return null;
  return (
    <div className="relative h-48 sm:h-64 md:h-full bg-[#e6e4dc] overflow-hidden">
      <Image
        src={post.coverImage}
        alt={`Cover image for ${post.title}`}
        fill
        className="object-cover object-center group-hover:scale-105 transition-all duration-500 opacity-90 group-hover:opacity-100"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  )
}
