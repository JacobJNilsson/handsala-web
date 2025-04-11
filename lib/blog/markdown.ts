import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the blog posts directory
const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

// Define the BlogPost type
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  path: string; // The relative path to the markdown file (including subdirectories)
};

/**
 * Get all blog posts, sorted by date
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // Check if the directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  // Function to recursively get markdown files from directories
  const getMarkdownFiles = (dir: string, baseDir = ''): string[] => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.join(dir, dirent.name);
      const relativePath = path.join(baseDir, dirent.name);
      if (dirent.isDirectory()) {
        return getMarkdownFiles(res, relativePath);
      }
      return dirent.name.endsWith('.md') ? relativePath : null;
    });
    return Array.prototype.concat(...files).filter(Boolean) as string[];
  };

  // Get all markdown files
  const markdownFiles = getMarkdownFiles(POSTS_DIRECTORY);

  // Parse each file and get metadata
  const posts = markdownFiles.map((relativePath) => {
    const fullPath = path.join(POSTS_DIRECTORY, relativePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract the date and name from filename (assuming format: YYYY-MM-DD-title.md)
    const fileName = path.basename(relativePath);
    const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);

    // Use filename parts or fallback to frontmatter
    const date = dateMatch ? dateMatch[1] : (data.date || '1970-01-01');
    const slug = dateMatch
      ? dateMatch[2]
      : fileName.replace(/\.md$/, '');

    return {
      slug,
      title: data.title || slug,
      date: date,
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content,
      coverImage: data.coverImage,
      author: data.author,
      category: data.category,
      tags: data.tags,
      readingTime: data.readingTime,
      path: relativePath,
    };
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a specific blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  return post;
}
