'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type BlogPost } from '@/lib/blog/markdown';
import { useMemo } from 'react';

interface BlogLayoutProps {
  children: React.ReactNode;
  posts: BlogPost[];
  currentSlug?: string;
}

interface CategoryMap {
  [key: string]: BlogPost[];
}

export default function BlogLayout({ children, posts, currentSlug }: BlogLayoutProps) {
  const pathname = usePathname();
  const isRootBlogPage = pathname === '/blog';

  // Group posts by category (derived from their path)
  const categorizedPosts = useMemo(() => {
    const categories: CategoryMap = {
      'All Posts': posts,
    };

    // Group by folder (first part of the path)
    posts.forEach(post => {
      if (post.path.includes('/')) {
        const category = post.path.split('/')[0];
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(post);
      }
    });

    return categories;
  }, [posts]);

  // Convert categories to array and sort alphabetically (with 'All Posts' first)
  const sortedCategories = useMemo(() => {
    return Object.keys(categorizedPosts)
      .sort((a, b) => {
        if (a === 'All Posts') return -1;
        if (b === 'All Posts') return 1;
        return a.localeCompare(b);
      });
  }, [categorizedPosts]);

  return (
    <div className="min-h-screen bg-cornflowerBlue relative">
      {/* Apply noise texture to the entire page */}
      <div className="noise absolute z-0"/>

      {/* Main content area with proper z-index */}
      <div className="relative z-1 pt-20">
        {/* Hero section with title */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 lora-regular">
              {isRootBlogPage ? 'Handsala Blog' : posts.find(p => p.slug === currentSlug)?.title}
            </h1>
            {isRootBlogPage && (
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-2">
                Thoughts, insights, and updates from me
              </p>
            )}
          </div>
        </div>

        {/* Main content with sidebar and posts */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Blog Sidebar */}
            <aside className="w-full md:w-1/4">
              <div className="bg-beige-50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-cornflowerBlue/20 hover:shadow-xl transition-shadow duration-300 sticky top-24">
                {/* Category navigation */}
                {sortedCategories.length > 1 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4 text-cornflowerBlue lora-regular">Categories</h2>
                    <div className="mb-6 space-y-1">
                      {sortedCategories.map(category => (
                        <div key={category} className="mb-4">
                          <h3 className="font-medium text-beige-800 mb-2 capitalize lora-regular">{category}</h3>
                          <ul className="space-y-2 pl-2">
                            {categorizedPosts[category].map(post => (
                              <li key={post.slug} className="text-sm">
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className={`block hover:bg-beige-100 p-2 rounded-lg transition-colors ${
                                    currentSlug === post.slug ? 'bg-beige-100 font-semibold' : ''
                                  }`}
                                >
                                  <span className="block text-xs text-beige-600">{post.date}</span>
                                  <span className="font-medium">{post.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Simple post list (when no categories) */}
                {sortedCategories.length <= 1 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4 text-cornflowerBlue lora-regular">Posts</h2>
                    <ul className="space-y-2">
                      {posts.map(post => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className={`block hover:bg-beige-100 p-2 rounded-lg transition-colors ${
                              currentSlug === post.slug ? 'bg-beige-100 font-semibold' : ''
                            }`}
                          >
                            <span className="block text-sm text-beige-600">{post.date}</span>
                            <span className="font-medium">{post.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {!isRootBlogPage && (
                  <div className="mt-6">
                    <Link
                      href="/blog"
                      className="text-cornflowerBlue hover:underline inline-flex items-center gap-1"
                    >
                      ← Back to all posts
                    </Link>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <main className="w-full md:w-3/4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
