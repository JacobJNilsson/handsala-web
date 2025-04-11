import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/blog/markdown"
import BlogLayout from "@/app/blog/_components/BlogLayout"
import MarkdownRenderer from "@/app/blog/_components/MarkdownRenderer"
import BlogImage from "@/app/blog/_components/BlogImage"

// Generate metadata for the page based on the post data
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | Handsala",
      description: "The requested blog post could not be found"
    };
  }

  return {
    title: `${post.title} | Handsala Blog`,
    description: post.excerpt,
  };
}

// This function is used by Next.js for static generation
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  const allPosts = await getAllPosts();

  // If the post doesn't exist, show 404 page
  if (!post) {
    notFound();
  }

  return (
    <BlogLayout posts={allPosts} currentSlug={resolvedParams.slug}>
      <article className="bg-beige-50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
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
      </article>
    </BlogLayout>
  )
}

