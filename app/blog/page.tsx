import { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog/markdown"
import BlogLayout from "@/app/blog/_components/BlogLayout"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Blog | Handsala",
  description: "A blog about my projects and thoughts"
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <BlogLayout posts={posts}>
      <div className="prose max-w-none text-white">
        <h2 className="text-2xl font-bold mb-6 text-white lora-regular">Recent Posts</h2>

        {posts.length === 0 ? (
          <p className="text-white/90">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <Link
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}
