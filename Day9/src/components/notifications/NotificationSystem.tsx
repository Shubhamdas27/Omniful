import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  Info, 
  AlertTriangle, 
  XCircle, 
  CheckCircle,
  Clock
} from 'lucide-react';
import Button from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'system' | 'assignment' | 'attendance' | 'announcement' | 'grade';
  actionable?: boolean;
  actionText?: string;
  onAction?: () => void;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function NotificationSystem({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  className = ''
}: NotificationSystemProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Notification['category']>('all');
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'high' && notification.priority !== 'high') return false;
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 top-12 w-96 z-50"
          >
            <Card className="shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{unreadCount} unread</span>
                  {highPriorityCount > 0 && (
                    <Badge variant="error" className="text-xs">
                      {highPriorityCount} high priority
                    </Badge>
                  )}
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-3">
                  {(['all', 'unread', 'high'] as const).map((filterType) => (
                    <Button
                      key={filterType}
                      variant={filter === filterType ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(filterType)}
                      className="text-xs"
                    >
                      {filterType === 'all' ? 'All' : filterType === 'unread' ? 'Unread' : 'High Priority'}
                    </Button>
                  ))}
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  aria-label="Filter notifications by category"
                >
                  <option value="all">All Categories</option>
                  <option value="system">System</option>
                  <option value="assignment">Assignments</option>
                  <option value="attendance">Attendance</option>
                  <option value="announcement">Announcements</option>
                  <option value="grade">Grades</option>
                </select>

                {/* Actions */}
                {unreadCount > 0 && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onMarkAllAsRead}
                      className="flex-1 text-xs"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Mark all read
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearAll}
                      className="text-red-600 hover:text-red-700 text-xs"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No notifications to show</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`
                          p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors
                          ${!notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className={`
                                  text-sm font-medium mb-1
                                  ${!notification.read 
                                    ? 'text-gray-900 dark:text-white' 
                                    : 'text-gray-700 dark:text-gray-300'
                                  }
                                `}>
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {notification.message}
                                </p>
                              </div>

                              {/* Actions Menu */}
                              <div className="flex items-center gap-1">
                                {notification.priority === 'high' && (
                                  <Badge variant="error" className="text-xs">
                                    High
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDismiss(notification.id)}
                                  className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTimeAgo(notification.timestamp)}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {notification.category}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onMarkAsRead(notification.id)}
                                    className="text-xs text-blue-600 hover:text-blue-700"
                                  >
                                    Mark read
                                  </Button>
                                )}
                                {notification.actionable && notification.actionText && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={notification.onAction}
                                    className="text-xs"
                                  >
                                    {notification.actionText}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {filteredNotifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => {
                      // Navigate to full notifications page
                      setIsOpen(false);
                    }}
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
