import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Brain } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
          >
            <Brain size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-base leading-none block" style={{ color: 'var(--text-primary)' }}>
              Resume
            </span>
            <span className="font-semibold text-xs" style={{ color: 'var(--color-primary)' }}>
              Intelligence
            </span>
          </div>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive('/dashboard') ? 'rgba(59,130,246,0.1)' : 'transparent',
                  color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${isActive('/dashboard') ? 'rgba(59,130,246,0.2)' : 'transparent'}`,
                }}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl transition-all"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-xl transition-all"
                style={{ color: 'var(--text-secondary)' }}
              >
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm px-5 py-2">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
