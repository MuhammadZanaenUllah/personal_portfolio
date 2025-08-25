'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationSystemProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxNotifications?: number;
  autoHideDelay?: number;
}

export default function NotificationSystem({ 
  position = 'top-right', 
  maxNotifications = 5,
  autoHideDelay = 5000 
}: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set up real-time subscriptions for various events
    const contactChannel = supabase
      .channel('notifications-contact')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
        (payload) => {
          const newSubmission = payload.new as any;
          addNotification({
            type: 'info',
            title: 'New Contact Message',
            message: `New message from ${newSubmission.name}: ${newSubmission.subject}`
          });
        }
      )
      .subscribe();

    const personalInfoChannel = supabase
      .channel('notifications-personal')
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'personal_info' },
        () => {
          addNotification({
            type: 'success',
            title: 'Profile Updated',
            message: 'Personal information has been updated successfully'
          });
        }
      )
      .subscribe();

    const projectsChannel = supabase
      .channel('notifications-projects')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          const eventType = payload.eventType;
          let message = '';
          
          switch (eventType) {
            case 'INSERT':
              message = 'New project added to portfolio';
              break;
            case 'UPDATE':
              message = 'Project information updated';
              break;
            case 'DELETE':
              message = 'Project removed from portfolio';
              break;
          }
          
          if (message) {
            addNotification({
              type: 'info',
              title: 'Portfolio Update',
              message
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(personalInfoChannel);
      supabase.removeChannel(projectsChannel);
    };
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, maxNotifications);
      return updated;
    });

    // Auto-hide notification after delay
    if (autoHideDelay > 0) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, autoHideDelay);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50 space-y-2 max-w-sm w-full`}>
      {/* Notification Header */}
      {notifications.length > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-lg border p-2 mb-2">
          <span className="text-sm font-medium text-gray-700">
            {notifications.length} notifications
          </span>
          <button
            onClick={clearAll}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Notifications */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getTypeStyles(notification.type)} border rounded-lg shadow-lg p-4 transition-all duration-300 transform hover:scale-105 ${!notification.read ? 'ring-2 ring-opacity-50' : 'opacity-75'}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getTypeIcon(notification.type)}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-sm mt-1 opacity-90">{notification.message}</p>
                <p className="text-xs mt-2 opacity-70">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs px-2 py-1 rounded hover:bg-black hover:bg-opacity-10"
                  title="Mark as read"
                >
                  ✓
                </button>
              )}
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-xs px-2 py-1 rounded hover:bg-black hover:bg-opacity-10"
                title="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Hook for manually adding notifications
export const useNotifications = () => {
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    // This would need to be connected to a global state management solution
    // For now, we'll use a simple event system
    window.dispatchEvent(new CustomEvent('add-notification', { detail: notification }));
  };

  return { addNotification };
};