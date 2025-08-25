import { getBlogPosts } from '@/lib/supabase';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zanaen.pk';
  
  // Get blog posts for dynamic URLs
  const blogPosts = await getBlogPosts();
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: '',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: '/about',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: '/skills',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: '/projects',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: '/blog',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: '/contact',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: '/sitemap',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.3
    }
  ];

  // Dynamic blog post pages
  const blogPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastModified: post.updated_at || post.published_at,
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  // Combine all pages
  const allPages = [...staticPages, ...blogPages];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}