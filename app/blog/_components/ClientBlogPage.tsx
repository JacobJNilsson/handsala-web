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
      <div className="prose max-w-none text-white">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-2xl font-bold text-white lora-regular"
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
              className="px-4 py-2 bg-cornflowerBlue/20 hover:bg-cornflowerBlue/30 text-white/90 hover:text-white rounded-lg transition-all duration-300"
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
            className="text-white/90"
          >
            No posts yet. Check back soon!
          </motion.p>
        ) : (
          <div className="space-y-8">
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
                  className="block hover:-translate-y-1 transition-all duration-300"
                >
                  <article
                    className="bg-beige-50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 md:grid md:grid-cols-[1fr_1.618fr]"
                  >
                    {post.coverImage && (
                      <div className="relative h-48 sm:h-64 md:h-full bg-beige-100 mb-4 md:mb-0">
                        <Image
                          src={post.coverImage}
                          alt={`Cover image for ${post.title}`}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-cornflowerBlue">
                        {post.title}
                      </h3>
                      <time className="text-sm text-beige-600 mb-3 block">{post.date}</time>
                      <p className="mb-0 text-beige-800">{post.excerpt}</p>
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
