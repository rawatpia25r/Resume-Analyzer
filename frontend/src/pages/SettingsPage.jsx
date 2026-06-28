import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Palette, Database, ChevronRight, Check, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';

const Section = ({ title, icon: Icon, color, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="theme-card p-5"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15`, color }}>
        <Icon size={15} />
      </div>
      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
        {title}
      </h3>
    </div>
    {children}
  </motion.div>
);

const ToggleRow = ({ label, description, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0"
      style={{ borderColor: 'var(--border-color)' }}>
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {description && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{description}</p>}
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
        style={{ background: checked ? 'var(--color-primary)' : 'var(--bg-hover)', border: '1px solid var(--border-color)' }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  );
};

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 pb-10 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Manage your preferences and account settings
        </p>
      </motion.div>

      {/* Appearance */}
      <Section title="Appearance" icon={Palette} color="#8B5CF6">
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Theme</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Currently using {isDark ? 'Dark' : 'Light'} mode
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => !isDark && toggleTheme()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: isDark ? 'rgba(59,130,246,0.15)' : 'var(--bg-hover)',
                border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid var(--border-color)',
                color: isDark ? '#3B82F6' : 'var(--text-muted)',
              }}
            >
              <Moon size={12} /> Dark
            </button>
            <button
              onClick={() => isDark && toggleTheme()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: !isDark ? 'rgba(245,158,11,0.15)' : 'var(--bg-hover)',
                border: !isDark ? '1px solid rgba(245,158,11,0.3)' : '1px solid var(--border-color)',
                color: !isDark ? '#D97706' : 'var(--text-muted)',
              }}
            >
              <Sun size={12} /> Light
            </button>
          </div>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" icon={Bell} color="#3B82F6">
        <ToggleRow label="ATS Score Updates" description="Get notified when new analysis completes" defaultChecked={true} />
        <ToggleRow label="Job Match Alerts" description="Receive alerts for new job matches" defaultChecked={true} />
        <ToggleRow label="Resume Tips" description="Weekly AI tips to improve your resume" defaultChecked={false} />
        <ToggleRow label="Email Notifications" description="Receive updates via email" defaultChecked={false} />
      </Section>

      {/* Security */}
      <Section title="Security" icon={Shield} color="#10B981">
        <div className="space-y-3">
          <div className="p-3 rounded-xl flex items-center justify-between"
            style={{ background: 'var(--bg-hover)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Change Password</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Update your account password</p>
            </div>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className="p-3 rounded-xl flex items-center justify-between"
            style={{ background: 'var(--bg-hover)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Two-Factor Auth</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Add an extra layer of security</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>
              Coming Soon
            </span>
          </div>
        </div>
      </Section>

      {/* Data */}
      <Section title="Data & Privacy" icon={Database} color="#F59E0B">
        <div className="space-y-3">
          <button
            onClick={() => toast.success('Export started — check your email')}
            className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors"
            style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Export My Data</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Download all your analysis data</p>
            </div>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
          <button
            onClick={() => toast.error('Contact support to delete your account')}
            className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors"
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: '#EF4444' }}>Delete Account</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Permanently delete your account</p>
            </div>
            <ChevronRight size={14} style={{ color: '#EF4444' }} />
          </button>
        </div>
      </Section>
    </div>
  );
}
