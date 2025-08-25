'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Extract unique categories from blog posts
  const blogCategories = Array.from(new Set(blogPosts.map(post => post.category)));
  const categories = ["All", ...blogCategories];

  const allTags = useMemo(() => {
    const tags = blogPosts.flatMap(post => post.tags);
    return [...new Set(tags)].sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thoughts on web development, design, technology trends, and lessons learned from building digital experiences.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 animate-fade-in-up animation-delay-200">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-black focus:outline-none transition-all duration-300 bg-white shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedTag('');
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Filter */}
          {selectedTag && (
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
                <span>Filtered by tag: <strong>{selectedTag}</strong></span>
                <button 
                  onClick={() => setSelectedTag('')}
                  className="text-blue-500 hover:text-blue-700 font-bold"
                >
                  ×
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && !searchTerm && !selectedTag && (
          <div className="mb-20 animate-fade-in-up animation-delay-300">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-xl card-hover group">
                  <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl opacity-50">📝</div>
                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span>{formatDate(post.published_at)}</span>
                      <span>•</span>
                      <span>{post.read_time} min read</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTag(tag)}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition-colors duration-300"
                        >
                          {tag}
                        </button>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                    >
                      Read Article
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="animate-fade-in-up animation-delay-400">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              <span className="text-lg font-normal text-gray-500 ml-2">({filteredPosts.length})</span>
            </h2>
            {filteredPosts.length === 0 && (
              <p className="text-gray-500">No articles found matching your criteria.</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-4xl opacity-50">📄</div>
                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      ⭐
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <span>{formatDate(post.published_at)}</span>
                    <span>•</span>
                    <span>{post.read_time} min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTag(tag)}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 transition-colors duration-300"
                      >
                        {tag}
                      </button>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-black font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Read More
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 text-center bg-white rounded-3xl p-12 shadow-xl animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest articles and insights delivered directly to your inbox. No spam, just quality content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full focus:border-black focus:outline-none transition-all duration-300"
            />
            <button className="px-8 py-3 bg-black text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-700">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Topics</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {allTags.slice(0, 12).map((tag, index) => (
              <button
                key={index}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}