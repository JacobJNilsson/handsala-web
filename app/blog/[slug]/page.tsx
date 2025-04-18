import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/blog/markdown"
import ClientBlogPostPage from "@/app/blog/_components/ClientBlogPostPage"

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
export const generateStaticParams = async () => {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  const allPosts = await getAllPosts()

  if (!post) {
    return notFound()
  }

  return <ClientBlogPostPage post={post} allPosts={allPosts} slug={params.slug} />
}

