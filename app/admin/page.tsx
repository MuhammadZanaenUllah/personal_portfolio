'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LiveAnalytics from '@/components/admin/LiveAnalytics';
import ContentManager from '@/components/admin/ContentManager';
import LoginForm from '@/components/admin/LoginForm';

interface AdminStats {
  projects: number;
  skills: number;
  blogPosts: number;
  contactSubmissions: number;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

interface PersonalInfo {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, error: authError, signOut } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    projects: 0,
    skills: 0,
    blogPosts: 0,
    contactSubmissions: 0
  });
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<PersonalInfo>>({});
  const [loading, setLoading] = useState(true);
  // const [refreshKey, setRefreshKey] = useState(0);

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
    
    // Set up real-time subscriptions
    const contactChannel = supabase
      .channel('contact-submissions')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'contact_submissions' },
        (payload) => {
          console.log('Contact submission change:', payload);
          loadContactSubmissions();
          loadStats();
        }
      )
      .subscribe();

    const personalInfoChannel = supabase
      .channel('personal-info')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'personal_info' },
        (payload) => {
          console.log('Personal info change:', payload);
          loadPersonalInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(personalInfoChannel);
    };
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    await Promise.all([
      loadStats(),
      loadContactSubmissions(),
      loadPersonalInfo()
    ]);
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const [projectsRes, skillsRes, blogRes, contactRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('skills').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('contact_submissions').select('id', { count: 'exact' })
      ]);

      setStats({
        projects: projectsRes.count || 0,
        skills: skillsRes.count || 0,
        blogPosts: blogRes.count || 0,
        contactSubmissions: contactRes.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadContactSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setContactSubmissions(data || []);
    } catch (error) {
      console.error('Error loading contact submissions:', error);
    }
  };

  const loadPersonalInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .single();

      if (error) throw error;
      setPersonalInfo(data);
      setEditForm(data);
    } catch (error) {
      console.error('Error loading personal info:', error);
    }
  };

  const updateContactStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setContactSubmissions(prev => 
        prev.map(submission => 
          submission.id === id ? { ...submission, status } : submission
        )
      );
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const updatePersonalInfo = async () => {
    if (!personalInfo) return;

    try {
      const { error } = await supabase
        .from('personal_info')
        .update(editForm)
        .eq('id', personalInfo.id);

      if (error) throw error;
      
      setPersonalInfo({ ...personalInfo, ...editForm });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating personal info:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLoginSuccess = () => {
    // setRefreshKey(prev => prev + 1);
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  // Show login form if user is not authenticated
  if (!user) {
    return (
      <div>
        {authError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            {authError}
          </div>
        )}
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your portfolio content and monitor activity</p>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Sign Out
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.projects}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Skills</p>
                <p className="text-2xl font-bold text-gray-900">{stats.skills}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.blogPosts}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.contactSubmissions}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Analytics */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Real-time Analytics</h2>
          <LiveAnalytics refreshInterval={30000} />
        </div>

        {/* Content Management */}
        <div className="mb-8">
          <ContentManager />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Info Management */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "secondary" : "primary"}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {personalInfo && (
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        id="edit-name"
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        id="edit-title"
                        type="text"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        id="edit-email"
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        id="edit-bio"
                        value={editForm.bio || ''}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button onClick={updatePersonalInfo} className="w-full">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Name</p>
                      <p className="text-gray-900">{personalInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Title</p>
                      <p className="text-gray-900">{personalInfo.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email</p>
                      <p className="text-gray-900">{personalInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bio</p>
                      <p className="text-gray-900 text-sm">{personalInfo.bio}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>

          {/* Contact Submissions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Messages</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contactSubmissions.map((submission) => (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{submission.name}</h3>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{submission.email}</p>
                  <p className="text-sm font-medium text-gray-800 mb-2">{submission.subject}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{submission.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateContactStatus(submission.id, 'read')}
                        className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                      >
                        Mark Read
                      </button>
                      <button
                        onClick={() => updateContactStatus(submission.id, 'replied')}
                        className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                      >
                        Mark Replied
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {contactSubmissions.length === 0 && (
                <p className="text-gray-500 text-center py-8">No messages yet</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}