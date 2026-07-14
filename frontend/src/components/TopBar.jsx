import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

export default function TopBar({ resumes = [] }) {
  const { user } = useContext(AuthContext);

  return (
    <header
      className="topbar-bg h-16 flex items-center justify-between px-6 sticky top-0 z-40"
      style={{ backdropFilter: 'blur(16px)' }}
    >
      {/* Search */}
      <div className="relative w-full max-w-md">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
          <Search size={15} />
        </div>
        <input
          type="text"
          placeholder="Search analyses, keywords..."
          className="w-full rounded-xl pl-10 pr-20 py-2.5 text-sm transition-all"
          style={{
            background: 'var(--bg-hover)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--color-primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.12)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--border-color)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {/* Keyboard shortcut hint */}
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none"
        >
          <kbd
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              fontFamily: 'inherit',
            }}
          >
            Ctrl
          </kbd>
          <kbd
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              fontFamily: 'inherit',
            }}
          >
            K
          </kbd>
        </div>
      </div>

      {/* Right Side — Profile only */}
      <div className="flex items-center gap-3 ml-4">
        <ProfileDropdown resumes={resumes} />
      </div>
    </header>
  );
}
