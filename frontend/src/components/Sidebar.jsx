import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Mail, Briefcase, 
  User, Settings, ChevronLeft, ChevronRight,
  Wand2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import BrandLogo from './BrandLogo';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analysis', path: '/', icon: FileText },
    { name: 'Resume Builder', path: '/resume-builder', icon: Wand2 },
    { name: 'Cover Letter', path: '/cover-letter', icon: Mail },
    { name: 'Job Match', path: '/job-match', icon: Briefcase },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname.startsWith('/resume/');
    return location.pathname === path;
  };

  return (
    <aside
      className="sidebar-bg flex flex-col h-screen fixed left-0 top-0 z-50 overflow-hidden transition-all duration-300"
      style={{ width: collapsed ? '72px' : '248px' }}
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <BrandLogo size="md" collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              title={collapsed ? item.name : ''}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? 'sidebar-item-active'
                  : 'hover:bg-[var(--bg-hover)]'
              }`}
              style={{ color: active ? 'var(--color-primary)' : 'var(--text-secondary)' }}
            >
              <item.icon
                size={18}
                className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
              {!collapsed && (
                <span className="truncate">{item.name}</span>
              )}
              {/* Active dot indicator when collapsed */}
              {collapsed && active && (
                <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Theme + Collapse */}
      <div className="px-2 py-4 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
        {/* Theme Switcher */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between px-2'}`}>
          {!collapsed && (
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Theme</span>
          )}
          <ThemeSwitcher />
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all hover:bg-[var(--bg-hover)]"
          style={{ color: 'var(--text-muted)' }}
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
