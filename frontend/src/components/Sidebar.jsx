import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Mail, Briefcase, 
  User, Settings, ChevronLeft, ChevronRight,
  Wand2
} from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analysis', path: '/', icon: FileText },
    { name: 'Resume Builder', path: '/resume-builder', icon: Wand2 },
    { name: 'Cover Letter', path: '/cover-letter', icon: Mail },
    { name: 'Job Match', path: '/job-match', icon: Briefcase },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const utilityItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname.startsWith('/resume/');
    return location.pathname === path;
  };

  const renderNavItem = (item) => {
    const active = isActive(item.path);
    return (
      <Link
        key={item.name}
        to={item.path}
        title={collapsed ? item.name : ''}
        className={`sidebar-nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
          active
            ? 'sidebar-item-active'
            : 'hover:bg-[var(--bg-hover)]'
        }`}
        style={{ color: active ? 'var(--color-primary)' : 'var(--text-secondary)' }}
      >
        {/* Slim active indicator — 3px left bar */}
        {active && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
            style={{
              height: '60%',
              background: 'linear-gradient(180deg, #60A5FA, #3B82F6)',
              boxShadow: '0 0 8px rgba(59,130,246,0.4)',
            }}
          />
        )}
        <item.icon
          size={18}
          className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ marginLeft: active ? '4px' : '0' }}
        />
        {!collapsed && (
          <span className="truncate">{item.name}</span>
        )}
      </Link>
    );
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

      {/* Main Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-hide">
        {mainNavItems.map(renderNavItem)}
      </nav>

      {/* Bottom: Utility (Settings) + Collapse */}
      <div className="px-2 pb-3 pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
        {/* Settings — separated utility section */}
        <div className="mb-2">
          {utilityItems.map(renderNavItem)}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all hover:bg-[var(--bg-hover)]"
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
