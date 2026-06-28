import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, BarChart3, FileText, TrendingUp, Calendar } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function ProfileDropdown({ resumes = [] }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'PR';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Compute stats from resumes
  const totalAnalyses = resumes.length;
  const avgScore = totalAnalyses > 0
    ? Math.round(resumes.reduce((acc, r) => acc + (r.atsScore || 0), 0) / totalAnalyses)
    : 0;
  const bestScore = totalAnalyses > 0
    ? Math.max(...resumes.map(r => r.atsScore || 0))
    : 0;

  const registrationDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'N/A';

  const stats = [
    { label: 'Total Analyses', value: totalAnalyses, icon: FileText, color: '#3B82F6' },
    { label: 'Avg ATS Score', value: avgScore, icon: TrendingUp, color: '#10B981' },
    { label: 'Best Score', value: bestScore, icon: BarChart3, color: '#8B5CF6' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm transition-all duration-200 group-hover:scale-105 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
          }}
        >
          {getInitials(user?.name)}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {user?.name || 'User'}
          </p>
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {user?.email?.split('@')[0] || 'account'}
          </p>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="profile-dropdown absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden shadow-2xl z-[100]"
          style={{
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Profile Header */}
          <div
            className="px-5 py-4 border-b"
            style={{
              borderColor: 'var(--border-color)',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-lg"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
              >
                {getInitials(user?.name)}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {user?.name || 'User'}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {user?.email}
                </p>
                {registrationDate !== 'N/A' && (
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar size={10} style={{ color: 'var(--text-muted)' }} />
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      Member since {registrationDate}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div
            className="grid grid-cols-3 border-b"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-3 py-3 text-center border-r last:border-r-0"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center mx-auto mb-1"
                  style={{ background: `${stat.color}15`, color: stat.color }}
                >
                  <stat.icon size={11} />
                </div>
                <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-[9px] leading-tight" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="py-1.5">
            {[
              { label: 'Profile', icon: User, path: '/profile' },
              { label: 'Settings', icon: Settings, path: '/settings' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => { navigate(item.path); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
            <div className="my-1 border-t" style={{ borderColor: 'var(--border-color)' }} />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors"
              style={{ color: '#EF4444' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
