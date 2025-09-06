import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/supabase';

interface SitemapItem {
  url: string;
  title: string;
  description?: string;
  lastModified?: string;
  priority?: number;
}

const SitemapPage = async () => {
  // Get blog posts for dynamic URLs
  const blogPosts = await getBlogPosts();
  
  // Static pages
  const staticPages: SitemapItem[] = [
    {
      url: '/',
      title: 'Home',
      description: 'Welcome to M.Zanaen Ullah\'s portfolio - Full Stack Developer',
      priority: 1.0
    },
    {
      url: '/about',
      title: 'About',
      description: 'Learn more about M.Zanaen Ullah - Full Stack Developer with 5+ years of experience',
      priority: 0.9
    },
    {
      url: '/skills',
      title: 'Skills',
      description: 'Technical skills and expertise in modern web development',
      priority: 0.8
    },
    {
      url: '/projects',
      title: 'Projects',
      description: 'Portfolio of web development projects and applications',
      priority: 0.9
    },
    {
      url: '/blog',
      title: 'Blog',
      description: 'Latest articles and insights on web development',
      priority: 0.8
    },
    {
      url: '/contact',
      title: 'Contact',
      description: 'Get in touch for collaboration and opportunities',
      priority: 0.7
    },
    {
      url: '/sitemap',
      title: 'Sitemap',
      description: 'Complete site navigation and page structure',
      priority: 0.3
    }
  ];

  // Dynamic blog post pages
  const blogPages: SitemapItem[] = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt || post.content?.substring(0, 160) + '...',
    lastModified: post.updated_at || post.published_at,
    priority: 0.6
  }));

  // Combine all pages
  const allPages = [...staticPages, ...blogPages];

  // Group pages by section
  const pageGroups = {
    'Main Pages': staticPages.filter(page => ['/', '/about', '/skills', '/projects', '/contact'].includes(page.url)),
    'Blog': [staticPages.find(page => page.url === '/blog')!, ...blogPages],
    'Other': staticPages.filter(page => !['/blog', '/', '/about', '/skills', '/projects', '/contact'].includes(page.url))
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority?: number) => {
    if (!priority) return 'text-gray-500';
    if (priority >= 0.8) return 'text-green-600';
    if (priority >= 0.6) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sitemap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete navigation structure of the website. Find all pages, blog posts, and resources in one place.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border px-6 py-3">
              <span className="text-sm text-gray-500">Total Pages: </span>
              <span className="font-semibold text-gray-900">{allPages.length}</span>
            </div>
          </div>
        </div>

        {/* Page Groups */}
        <div className="space-y-12">
          {Object.entries(pageGroups).map(([groupName, pages]) => (
            <div key={groupName} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  {groupName}
                </h2>
                <p className="text-gray-300 mt-1">
                  {pages.length} page{pages.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4">
                  {pages.map((page) => (
                    <div key={page.url} className="group">
                      <div className="flex items-start justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Link 
                              href={page.url}
                              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300 group-hover:underline"
                            >
                              {page.title}
                            </Link>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(page.priority)} bg-gray-100`}>
                              Priority: {page.priority?.toFixed(1) || 'N/A'}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-2 leading-relaxed">
                            {page.description || 'No description available'}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                              {page.url}
                            </span>
                            {page.lastModified && (
                              <span>
                                Last updated: {formatDate(page.lastModified)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <Link
                            href={page.url}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                          >
                            Visit
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* XML Sitemap Link */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              XML Sitemap
            </h3>
            <p className="text-gray-600 mb-4">
              For search engines and automated tools
            </p>
            <Link
              href="/sitemap.xml"
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download XML Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;

// Metadata for SEO
export const metadata = {
  title: 'Sitemap | M.Zanaen Ullah - Full Stack Developer',
  description: 'Complete sitemap of M.Zanaen Ullah\'s portfolio website. Find all pages, blog posts, and resources.',
  keywords: 'sitemap, navigation, portfolio, web developer, M.Zanaen Ullah'
};