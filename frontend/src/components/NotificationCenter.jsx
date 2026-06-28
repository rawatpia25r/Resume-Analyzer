import React, { useState, useContext, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Sparkles, TrendingUp, FileText, Target, Zap } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    icon: TrendingUp,
    color: '#10B981',
    title: 'ATS Score Improved',
    message: 'Your latest resume scored 82/100 — up from 67.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    icon: Sparkles,
    color: '#8B5CF6',
    title: 'AI Tip: Add Metrics',
    message: 'Quantify your achievements to boost your score by ~15 points.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    icon: Target,
    color: '#3B82F6',
    title: 'New Keyword Suggestion',
    message: '"Machine Learning" is trending for your target roles.',
    time: '3 hours ago',
    read: false,
  },
  {
    id: 4,
    icon: FileText,
    color: '#F59E0B',
    title: 'Resume Analysis Complete',
    message: 'Your Software Engineer resume has been fully analyzed.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 5,
    icon: Zap,
    color: '#EF4444',
    title: 'Job Match Alert',
    message: 'Found 3 new jobs matching your profile with 80%+ match.',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef(null);

  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{
          background: 'var(--bg-hover)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-secondary)',
        }}
      >
        <Bell size={16} />
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            style={{ background: '#EF4444', fontSize: '9px' }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="notification-dropdown absolute right-0 mt-2 w-80 rounded-2xl overflow-hidden shadow-2xl z-[100]"
          style={{
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Notifications</p>
              {unread > 0 && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{unread} unread</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-medium px-2 py-1 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <CheckCheck size={14} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-72 overflow-y-auto scrollbar-hide">
            {notifications.length === 0 ? (
              <div className="py-10 text-center" style={{ color: 'var(--text-muted)' }}>
                <Bell size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className="w-full text-left px-4 py-3 flex gap-3 items-start transition-colors hover:bg-[var(--bg-hover)] border-b last:border-b-0"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: `${notif.color}15`, color: notif.color }}
                  >
                    <notif.icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                      {notif.title}
                      {!notif.read && (
                        <span className="ml-2 w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                      )}
                    </p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {notif.message}
                    </p>
                    <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{notif.time}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t text-center" style={{ borderColor: 'var(--border-color)' }}>
              <button
                onClick={clearAll}
                className="text-xs font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
