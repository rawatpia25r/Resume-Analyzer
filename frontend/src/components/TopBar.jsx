import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';
import ProfileDropdown from './ProfileDropdown';

export default function TopBar({ resumes = [] }) {
  const { user } = useContext(AuthContext);

  return (
    <header
      className="topbar-bg h-16 flex items-center justify-between px-6 sticky top-0 z-40"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
          <Search size={15} />
        </div>
        <input
          type="text"
          placeholder="Search analyses, keywords..."
          className="w-full rounded-xl pl-10 pr-4 py-2 text-sm transition-all"
          style={{
            background: 'var(--bg-hover)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--color-primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.12)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--border-color)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <NotificationCenter />
        <div className="w-px h-6" style={{ background: 'var(--border-color)' }} />
        <ProfileDropdown resumes={resumes} />
      </div>
    </header>
  );
}
