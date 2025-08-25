import { getBlogPosts, type BlogPost } from '@/lib/supabase';
import BlogClient from './BlogClient';

// ISR: Revalidate every 30 minutes for new blog posts
export const revalidate = 1800;

async function getBlogPageData(): Promise<{ blogPosts: BlogPost[] }> {
  try {
    const blogPosts = await getBlogPosts();
    return { blogPosts };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { blogPosts: [] };
  }
}

export default async function BlogPage() {
  const { blogPosts } = await getBlogPageData();

  return <BlogClient blogPosts={blogPosts} />;
}