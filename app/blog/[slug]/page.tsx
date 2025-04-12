import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug, getAllPostsSync, getPostBySlugSync } from "@/lib/blog/markdown"
import BlogLayout from "@/app/blog/_components/BlogLayout"
import MarkdownRenderer from "@/app/blog/_components/MarkdownRenderer"
import BlogImage from "@/app/blog/_components/BlogImage"

// Generate metadata for the page based on the post data
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

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

// Use synchronous execution for static export
export default function BlogPostPage(props: { params: { slug: string } }) {
  const { params } = props;
  const post = getPostBySlugSync(params.slug);
  const allPosts = getAllPostsSync();

  // If the post doesn't exist, show 404 page
  if (!post) {
    return notFound();
  }

  return (
    <BlogLayout posts={allPosts} currentSlug={params.slug}>
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

