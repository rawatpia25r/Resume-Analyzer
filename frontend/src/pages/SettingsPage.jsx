import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell, Shield, Palette, Database, ChevronRight, Moon, Sun, Monitor,
  Smartphone, UserCircle, Key, LogOut, CheckCircle2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';

const Section = ({ title, description, icon: Icon, color, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="theme-card overflow-hidden"
  >
    <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-hover)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
          style={{ background: `linear-gradient(135deg, ${color}22, ${color}11)`, color }}>
          <Icon size={18} />
        </div>
        <div>
          <h3 className="font-extrabold text-base font-heading" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          {description && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{description}</p>}
        </div>
      </div>
    </div>
    <div className="p-6 space-y-2">
      {children}
    </div>
  </motion.div>
);

const ToggleRow = ({ label, description, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-white/5"
      style={{ border: '1px solid transparent' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
    >
      <div>
        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {description && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{description}</p>}
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-card)]"
        style={{ 
          background: checked ? 'var(--color-primary)' : 'var(--bg-hover)', 
          border: '1px solid var(--border-color)',
          boxShadow: checked ? '0 0 10px rgba(96,165,250,0.4)' : 'none'
        }}
      >
        <div
          className="absolute top-[1px] w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"
          style={{ transform: checked ? 'translateX(24px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  );
};

export default function SettingsPage() {
  const { themePref, setTheme } = useTheme();

  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun, desc: 'Clean bright interface' },
    { key: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
    { key: 'system', label: 'System', icon: Monitor, desc: 'Match your OS' },
  ];

  return (
    <div className="space-y-8 pb-12 relative z-10 max-w-4xl">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
        <h1 className="text-3xl font-extrabold font-heading" style={{ color: 'var(--text-primary)' }}>
          Account Settings
        </h1>
        <p className="text-sm mt-1.5 font-medium" style={{ color: 'var(--text-secondary)' }}>
          Manage your personal preferences, security, and notification settings.
        </p>
      </motion.div>

      {/* Grid Layout for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Account Details */}
        <Section title="Account" description="Manage your personal information" icon={UserCircle} color="#3B82F6" delay={0.1}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Full Name</label>
              <input type="text" defaultValue="User Name" className="input-premium py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Email Address</label>
              <input type="email" defaultValue="user@example.com" className="input-premium py-2 text-sm" />
            </div>
            <div className="pt-2">
              <button className="btn-primary text-xs px-4 py-2 flex items-center gap-2">
                <CheckCircle2 size={14} /> Save Changes
              </button>
            </div>
          </div>
        </Section>

        {/* Appearance — Light / Dark / System */}
        <Section title="Appearance" description="Customize your UI experience" icon={Palette} color="#3B82F6" delay={0.2}>
          <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-hover)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Interface Theme</p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Choose how Resume Intelligence looks for you</p>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map(opt => {
                const selected = themePref === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setTheme(opt.key)}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all border-2"
                    style={{
                      borderColor: selected ? '#60A5FA' : 'transparent',
                      background: selected ? 'rgba(96,165,250,0.1)' : 'var(--bg-input)',
                    }}
                    onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'var(--bg-card)'; }}
                    onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'var(--bg-input)'; }}
                  >
                    <opt.icon size={22} style={{ color: selected ? '#60A5FA' : 'var(--text-muted)' }} />
                    <span className="text-xs font-bold" style={{ color: selected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {opt.label}
                    </span>
                    <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" description="Control what alerts you receive" icon={Bell} color="#10B981" delay={0.3}>
          <div className="space-y-1">
            <ToggleRow label="Analysis Alerts" description="Get notified when ATS scoring completes" defaultChecked={true} />
            <ToggleRow label="Job Matches" description="Weekly alerts for new compatible roles" defaultChecked={true} />
            <ToggleRow label="Product Updates" description="News about Resume Intelligence features" defaultChecked={false} />
            <ToggleRow label="Security Alerts" description="Important notifications about your account" defaultChecked={true} />
          </div>
        </Section>

        {/* Security */}
        <Section title="Security" description="Protect your account and data" icon={Shield} color="#F59E0B" delay={0.4}>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors hover:bg-white/5" style={{ border: '1px solid transparent' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-color)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}><Key size={16} /></div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Change Password</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Updated 3 months ago</p>
                </div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors hover:bg-white/5" style={{ border: '1px solid transparent' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-color)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}><Smartphone size={16} /></div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Active Sessions</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage devices logged into your account</p>
                </div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </button>
          </div>
        </Section>

        {/* Data & Privacy */}
        <div className="md:col-span-2">
          <Section title="Data & Privacy" description="Manage your data and account status" icon={Database} color="#EC4899" delay={0.5}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => toast.success('Data export initiated')}
                className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all hover:-translate-y-1"
                style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Download My Data</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Get a copy of all your resumes and scores</p>
                </div>
                <Database size={18} style={{ color: 'var(--color-primary)' }} />
              </button>

              <button
                onClick={() => toast.error('Account deletion is disabled in demo mode')}
                className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all hover:-translate-y-1"
                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                <div>
                  <p className="text-sm font-bold text-red-500">Delete Account</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Permanently erase all your data</p>
                </div>
                <LogOut size={18} className="text-red-500" />
              </button>
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
}
