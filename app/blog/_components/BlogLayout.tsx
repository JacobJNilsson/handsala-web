'use client';

import { usePathname } from 'next/navigation';
import { type BlogPost } from '@/lib/blog/markdown';
import { useMemo } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-beige-50 pb-20">

      {/* Main content area */}
      <div className="relative pt-24">
        {/* Header section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-mono tracking-tight">
              {isRootBlogPage ? 'Handsala Blog' : posts.find(p => p.slug === currentSlug)?.title}
            </h1>
            {isRootBlogPage && (
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2 font-light">
                Thoughts, insights, and updates.
              </p>
            )}
          </div>
        </div>

        {/* Main content with sidebar and posts */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Blog Sidebar */}
            <aside className="w-full md:w-1/4">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                  {/* Category navigation */}
                  {sortedCategories.length > 1 && (
                    <div className="space-y-6">
                      <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-800 font-mono border-b border-slate-100 pb-2">Categories</h2>
                      <div className="space-y-4">
                        {sortedCategories.map(category => (
                            <div key={category}>
                              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 font-mono">{category}</h3>
                              <ul className="space-y-1">
                                {categorizedPosts[category].map(post => (
                                  <li key={post.slug}>
                                    <Link
                                      href={`/blog/${post.slug}`}
                                      className={`block px-2 py-1.5 rounded-md text-sm transition-colors ${currentSlug === post.slug
                                          ? 'bg-slate-100 text-slate-900 font-medium'
                                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                    >
                                      {post.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Simple post list (when no categories) */}
                  {sortedCategories.length <= 1 && (
                    <div>
                      <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-800 font-mono mb-4 border-b border-slate-100 pb-2">Posts</h2>
                      <ul className="space-y-1">
                        {posts.map(post => (
                          <li key={post.slug}>
                            <Link
                              href={`/blog/${post.slug}`}
                                className={`block px-2 py-1.5 rounded-md text-sm transition-colors ${currentSlug === post.slug
                                    ? 'bg-slate-100 text-slate-900 font-medium'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                  }`}
                              >
                                {post.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {!isRootBlogPage && (
                    <div className="mt-8 pt-4 border-t border-slate-100">
                      <Link
                        href="/blog"
                        className="text-slate-500 hover:text-slate-800 text-sm font-mono inline-flex items-center gap-2 transition-colors"
                      >
                        ← All Posts
                      </Link>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <Link
                      href="/"
                      className="text-slate-500 hover:text-slate-800 text-sm font-mono inline-flex items-center gap-2 transition-colors"
                    >
                      Home
                    </Link>
                  </div>
                </div>
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
