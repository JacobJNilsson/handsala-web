import { Metadata } from "next"
import { getAllPosts } from "@/lib/blog/markdown"
import BlogLayout from "@/app/blog/_components/BlogLayout"
import Image from "next/image"
import TransitionLink from "@/components/ui/transition/TransitionLink"

export const metadata: Metadata = {
  title: "Blog | Handsala",
  description: "A blog about my projects and thoughts"
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <BlogLayout posts={posts}>
      <div className="prose max-w-none text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white lora-regular">Recent Posts</h2>
          <TransitionLink
            href="/"
            className="px-4 py-2 bg-cornflowerBlue/20 hover:bg-cornflowerBlue/30 text-white/90 hover:text-white rounded-lg transition-all duration-300"
          >
            Back to Home
          </TransitionLink>
        </div>

        {posts.length === 0 ? (
          <p className="text-white/90">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <TransitionLink
                key={post.slug}
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
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}
