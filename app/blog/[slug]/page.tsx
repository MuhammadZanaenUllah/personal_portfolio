import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/supabase";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const blogPosts = await getBlogPosts();
    return blogPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  try {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      notFound();
    }

    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
        <article className="prose prose-lg max-w-2xl w-full px-4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>{new Date(post.published_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.read_time} min read</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </header>
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}