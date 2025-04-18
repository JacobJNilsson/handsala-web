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
      <div className="prose max-w-none">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-beige-50 rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg"
        >
          <div className="mb-8">
            {post.coverImage && (
              <div className="mb-6 rounded-xl overflow-hidden shadow-md relative aspect-video">
                <BlogImage
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                />
              </div>
            )}

            <time className="text-sm text-beige-600 block">{post.date}</time>
          </div>

          <MarkdownRenderer markdown={post.content} />
        </motion.article>
      </div>
    </BlogLayout>
  )
}
