import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher({ showLabel = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 hover:scale-105"
      style={{
        background: isDark
          ? 'rgba(59, 130, 246, 0.1)'
          : 'rgba(251, 191, 36, 0.1)',
        border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(251, 191, 36, 0.3)'}`,
        color: isDark ? '#3B82F6' : '#D97706',
      }}
      aria-label="Toggle theme"
    >
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent)'
            : 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15), transparent)',
        }}
      />
      {isDark ? (
        <Sun size={16} className="relative z-10" />
      ) : (
        <Moon size={16} className="relative z-10" />
      )}
    </button>
  );
}
