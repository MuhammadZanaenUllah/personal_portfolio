'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ImageUpload from '@/components/ui/ImageUpload';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image?: string;
  technologies: string[];
  category?: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  status?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at?: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  description?: string;
  years_experience?: number;
  created_at: string;
  updated_at?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  updated_at?: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  read_time: number;
  views: number;
  likes: number;
  slug: string;
}

type ContentType = 'projects' | 'skills' | 'blog';
type EditingItem = Project | Skill | BlogPost | null;

export default function ContentManager() {
  const [activeTab, setActiveTab] = useState<ContentType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<EditingItem>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadContent();
    setupRealtimeSubscriptions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setupRealtimeSubscriptions = () => {
    // Projects subscription
    const projectsChannel = supabase
      .channel('content-projects')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        () => loadProjects()
      )
      .subscribe();

    // Skills subscription
    const skillsChannel = supabase
      .channel('content-skills')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'skills' },
        () => loadSkills()
      )
      .subscribe();

    // Blog posts subscription
    const blogChannel = supabase
      .channel('content-blog')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'blog_posts' },
        () => loadBlogPosts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(skillsChannel);
      supabase.removeChannel(blogChannel);
    };
  };

  const loadContent = async () => {
    setLoading(true);
    await Promise.all([
      loadProjects(),
      loadSkills(),
      loadBlogPosts()
    ]);
    setLoading(false);
  };

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const handleEdit = (item: Project | Skill | BlogPost) => {
    setEditingItem({ ...item });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      let table = '';
      switch (activeTab) {
        case 'projects':
          table = 'projects';
          break;
        case 'skills':
          table = 'skills';
          break;
        case 'blog':
          table = 'blog_posts';
          break;
      }

      const { error } = await supabase
        .from(table)
        .update(editingItem)
        .eq('id', editingItem.id);

      if (error) throw error;
      
      // Update local state immediately
      switch (activeTab) {
        case 'projects':
          setProjects(prev => prev.map(p => 
            p.id === editingItem.id ? { ...p, ...editingItem } : p
          ));
          break;
        case 'skills':
          setSkills(prev => prev.map(s => 
            s.id === editingItem.id ? { ...s, ...editingItem } : s
          ));
          break;
        case 'blog':
          setBlogPosts(prev => prev.map(b => 
            b.id === editingItem.id ? { ...b, ...editingItem } : b
          ));
          break;
      }
      
      setIsEditing(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let table = '';
      switch (activeTab) {
        case 'projects':
          table = 'projects';
          break;
        case 'skills':
          table = 'skills';
          break;
        case 'blog':
          table = 'blog_posts';
          break;
      }

      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state immediately
      switch (activeTab) {
        case 'projects':
          setProjects(prev => prev.filter(p => p.id !== id));
          break;
        case 'skills':
          setSkills(prev => prev.filter(s => s.id !== id));
          break;
        case 'blog':
          setBlogPosts(prev => prev.filter(b => b.id !== id));
          break;
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured: !project.featured })
        .eq('id', project.id);

      if (error) throw error;
      
      // Update local state immediately
      setProjects(prev => prev.map(p => 
        p.id === project.id ? { ...p, featured: !p.featured } : p
      ));
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ featured: !post.featured })
        .eq('id', post.id);

      if (error) throw error;
      
      // Update local state immediately
      setBlogPosts(prev => prev.map(p => 
        p.id === post.id ? { ...p, featured: !p.featured } : p
      ));
    } catch (error) {
      console.error('Error toggling published:', error);
    }
  };

  const renderProjects = () => (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                {project.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-4 text-sm text-gray-500">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    GitHub
                  </a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => toggleFeatured(project)}
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                {project.featured ? 'Unfeature' : 'Feature'}
              </Button>
              <Button
                onClick={() => handleEdit(project)}
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(project.id)}
                variant="secondary"
                className="text-xs px-2 py-1 text-red-600 hover:bg-red-50"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      {skills.map((skill) => (
        <Card key={skill.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {skill.icon && <span className="text-2xl">{skill.icon}</span>}
              <div>
                <h3 className="font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Level:</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{skill.level}%</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEdit(skill)}
                  variant="secondary"
                  className="text-xs px-2 py-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(skill.id)}
                  variant="secondary"
                  className="text-xs px-2 py-1 text-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderBlogPosts = () => (
    <div className="space-y-4">
      {blogPosts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <Badge className={post.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {post.featured ? 'Featured' : 'Regular'}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-800 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Published: {new Date(post.published_at).toLocaleDateString()}
                {post.updated_at && ` | Updated: ${new Date(post.updated_at).toLocaleDateString()}`}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => togglePublished(post)}
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                {post.featured ? 'Unfeature' : 'Feature'}
              </Button>
              <Button
                onClick={() => handleEdit(post)}
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(post.id)}
                variant="secondary"
                className="text-xs px-2 py-1 text-red-600 hover:bg-red-50"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Content Management</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live updates enabled</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'projects', label: 'Projects', count: projects.length },
          { key: 'skills', label: 'Skills', count: skills.length },
          { key: 'blog', label: 'Blog Posts', count: blogPosts.length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as ContentType)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'skills' && renderSkills()}
        {activeTab === 'blog' && renderBlogPosts()}
      </div>

      {/* Edit Modal (Enhanced) */}
      {isEditing && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit {activeTab.slice(0, -1)}</h3>
            <div className="space-y-4">
              {/* Title/Name Field */}
              <div>
                <label htmlFor="edit-title-name" className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'projects' ? 'Title' : activeTab === 'skills' ? 'Name' : 'Title'}
                </label>
                <input
                  type="text"
                  id="edit-title-name"
                  placeholder={`Enter ${activeTab === 'skills' ? 'skill name' : 'title'}`}
                  value={editingItem && 'title' in editingItem ? editingItem.title : editingItem && 'name' in editingItem ? editingItem.name : ''}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    [activeTab === 'skills' ? 'name' : 'title']: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description/Excerpt Field */}
              {(activeTab === 'projects' || activeTab === 'blog') && (
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                    {activeTab === 'projects' ? 'Description' : 'Excerpt'}
                  </label>
                  <textarea
                    id="edit-description"
                    rows={3}
                    placeholder={`Enter ${activeTab === 'projects' ? 'description' : 'excerpt'}`}
                    value={editingItem && 'description' in editingItem ? editingItem.description : editingItem && 'excerpt' in editingItem ? editingItem.excerpt : ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      [activeTab === 'projects' ? 'description' : 'excerpt']: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Image Upload Field */}
              {(activeTab === 'projects' || activeTab === 'blog') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <ImageUpload
                    value={editingItem && 'image' in editingItem ? editingItem.image || '' : ''}
                    onChange={(url) => setEditingItem({
                      ...editingItem,
                      image: url || ''
                    })}
                    accept="image/*"
                    maxSize={5}
                  />
                </div>
              )}

              {/* Category Field */}
              {(activeTab === 'projects' || activeTab === 'blog') && (
                <div>
                  <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="edit-category"
                    placeholder="Enter category"
                    value={editingItem && 'category' in editingItem ? editingItem.category || '' : ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      category: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Skills Level Field */}
              {activeTab === 'skills' && (
                <div>
                  <label htmlFor="edit-level" className="block text-sm font-medium text-gray-700 mb-1">Level (%)</label>
                  <input
                    type="number"
                    id="edit-level"
                    min="0"
                    max="100"
                    placeholder="Enter level percentage (0-100)"
                    value={editingItem && 'level' in editingItem ? editingItem.level || 0 : 0}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      level: parseInt(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Skills Category Field */}
              {activeTab === 'skills' && (
                <div>
                  <label htmlFor="edit-skill-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    id="edit-skill-category"
                    placeholder="Enter skill category"
                    value={editingItem && 'category' in editingItem ? editingItem.category || '' : ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      category: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Featured Toggle */}
              {(activeTab === 'projects' || activeTab === 'blog') && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingItem && 'featured' in editingItem ? editingItem.featured || false : false}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      featured: e.target.checked
                    })}
                    className="mr-2"
                  />
                  <label htmlFor="edit-featured" className="text-sm font-medium text-gray-700">
                    Featured
                  </label>
                </div>
              )}
            </div>
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
              <Button 
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}