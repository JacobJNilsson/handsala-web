import { getAllPosts } from "@/lib/blog/markdown"
import { Metadata } from "next"
import ClientBlogPage from "@/app/blog/_components/ClientBlogPage"

export const metadata: Metadata = {
  title: "Blog | Handsala",
  description: "A blog about my projects and thoughts"
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <ClientBlogPage posts={posts} />;
}
