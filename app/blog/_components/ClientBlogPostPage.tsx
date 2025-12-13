"use client"

import { motion } from "framer-motion"
import BlogLayout from "./BlogLayout"
import MarkdownRenderer from "./MarkdownRenderer"
import BlogImage from "./BlogImage"
import { type BlogPost } from "@/lib/blog/markdown"

interface ClientBlogPostPageProps {
  post: BlogPost
  allPosts: BlogPost[]
  slug: string
}

export default function ClientBlogPostPage({
  post,
  allPosts,
  slug
}: ClientBlogPostPageProps) {
  return (
    <BlogLayout posts={allPosts} currentSlug={slug}>
      <div className="max-w-4xl mx-auto">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12"
        >
          <header className="mb-10 text-center border-b border-slate-100 pb-10">
            <time className="text-sm text-slate-400 font-mono block mb-4 uppercase tracking-widest">{post.date}</time>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 font-mono tracking-tight leading-tight">{post.title}</h1>
            {post.coverImage && (
              <div className="mt-8 rounded-lg overflow-hidden shadow-sm aspect-video relative">
                <BlogImage
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                />
              </div>
            )}
          </header>

          <div className="prose prose-slate prose-lg max-w-none">
            <MarkdownRenderer markdown={post.content} />
          </div>
        </motion.article>
      </div>
    </BlogLayout>
  )
}
