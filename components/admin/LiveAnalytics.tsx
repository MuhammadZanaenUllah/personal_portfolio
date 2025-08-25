'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Card from '@/components/ui/Card';

interface AnalyticsData {
  totalVisitors: number;
  activeUsers: number;
  pageViews: number;
  contactSubmissions: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: string;
  type: 'contact' | 'page_view' | 'admin_action';
  description: string;
  timestamp: Date;
  metadata?: any;
}

interface LiveAnalyticsProps {
  refreshInterval?: number;
}

export default function LiveAnalytics({ refreshInterval = 30000 }: LiveAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    activeUsers: 0,
    pageViews: 0,
    contactSubmissions: 0,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadAnalytics();
    
    // Set up real-time subscriptions
    const contactChannel = supabase
      .channel('analytics-contact')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
        (payload) => {
          const newSubmission = payload.new as any;
          addActivity({
            type: 'contact',
            description: `New contact from ${newSubmission.name}`,
            metadata: { email: newSubmission.email, subject: newSubmission.subject }
          });
          
          // Update contact submissions count
          setAnalytics(prev => ({
            ...prev,
            contactSubmissions: prev.contactSubmissions + 1
          }));
        }
      )
      .subscribe();

    const personalInfoChannel = supabase
      .channel('analytics-personal')
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'personal_info' },
        () => {
          addActivity({
            type: 'admin_action',
            description: 'Personal information updated'
          });
        }
      )
      .subscribe();

    const projectsChannel = supabase
      .channel('analytics-projects')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          const eventType = payload.eventType;
          let description = '';
          
          switch (eventType) {
            case 'INSERT':
              description = 'New project added';
              break;
            case 'UPDATE':
              description = 'Project updated';
              break;
            case 'DELETE':
              description = 'Project deleted';
              break;
          }
          
          if (description) {
            addActivity({
              type: 'admin_action',
              description
            });
          }
        }
      )
      .subscribe();

    // Set up periodic refresh
    const interval = setInterval(() => {
      loadAnalytics();
    }, refreshInterval);

    return () => {
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(personalInfoChannel);
      supabase.removeChannel(projectsChannel);
      clearInterval(interval);
    };
  }, [refreshInterval]);

  const loadAnalytics = async () => {
    try {
      // Load basic counts from database
      const [contactRes, projectsRes, skillsRes, blogRes] = await Promise.all([
        supabase.from('contact_submissions').select('id', { count: 'exact' }),
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('skills').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' })
      ]);

      // Load recent contact submissions for activity feed
      const { data: recentContacts } = await supabase
        .from('contact_submissions')
        .select('id, name, email, subject, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Convert recent contacts to activity items
      const contactActivities: ActivityItem[] = (recentContacts || []).map(contact => ({
        id: contact.id,
        type: 'contact' as const,
        description: `New contact from ${contact.name}`,
        timestamp: new Date(contact.created_at),
        metadata: { email: contact.email, subject: contact.subject }
      }));

      // Simulate some analytics data (in a real app, you'd track this properly)
      const now = new Date();
      const hoursSinceStart = Math.floor((now.getTime() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60));
      
      setAnalytics(prev => ({
        ...prev,
        totalVisitors: Math.floor(Math.random() * 100) + 50, // Simulated
        activeUsers: Math.floor(Math.random() * 10) + 1, // Simulated
        pageViews: Math.floor(Math.random() * 500) + 200, // Simulated
        contactSubmissions: contactRes.count || 0,
        recentActivity: contactActivities
      }));
      
      setLastUpdate(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading analytics:', error);
      setIsLoading(false);
    }
  };

  const addActivity = (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setAnalytics(prev => ({
      ...prev,
      recentActivity: [newActivity, ...prev.recentActivity].slice(0, 10)
    }));
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'contact':
        return '📧';
      case 'page_view':
        return '👁️';
      case 'admin_action':
        return '⚙️';
      default:
        return '📊';
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'contact':
        return 'text-blue-600';
      case 'page_view':
        return 'text-green-600';
      case 'admin_action':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
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
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{analytics.activeUsers}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.totalVisitors}</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-purple-600">{analytics.pageViews}</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-2xl font-bold text-orange-600">{analytics.contactSubmissions}</p>
            </div>
            <div className="text-2xl">📧</div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {analytics.recentActivity.length > 0 ? (
            analytics.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${getActivityColor(activity.type)}`}>
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.timestamp.toLocaleTimeString()}
                  </p>
                  {activity.metadata && (
                    <div className="text-xs text-gray-400 mt-1">
                      {activity.metadata.email && `Email: ${activity.metadata.email}`}
                      {activity.metadata.subject && ` | Subject: ${activity.metadata.subject}`}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <p>No recent activity</p>
              <p className="text-sm">Activity will appear here in real-time</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}