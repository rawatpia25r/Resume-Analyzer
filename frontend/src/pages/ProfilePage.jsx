import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Calendar, BarChart3, TrendingUp,
  Star, FileText, Edit2, Save, X, Shield
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const scoreColor = (score) => {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#3B82F6';
  return '#F59E0B';
};

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/resume/user');
        setResumes(data);
      } catch {}
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const getInitials = (n) => {
    if (!n) return 'PR';
    return n.split(' ').map(x => x[0]).join('').substring(0, 2).toUpperCase();
  };

  const totalAnalyses = resumes.length;
  const avgScore = totalAnalyses > 0
    ? Math.round(resumes.reduce((a, r) => a + (r.atsScore || 0), 0) / totalAnalyses) : 0;
  const bestScore = totalAnalyses > 0 ? Math.max(...resumes.map(r => r.atsScore || 0)) : 0;
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  return (
    <div className="space-y-6 pb-10">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden relative"
        style={{ border: '1px solid var(--border-color)' }}
      >
        {/* Cover gradient */}
        <div
          className="h-28 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.4) 50%, rgba(16,185,129,0.2) 100%)',
          }}
        >
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.3), transparent)',
          }} />
        </div>

        {/* Profile info below cover */}
        <div
          className="px-6 pb-6 relative"
          style={{ background: 'var(--bg-card)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl border-4 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                borderColor: 'var(--bg-primary)',
              }}
            >
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 sm:pb-2">
              <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
                {user?.name || 'User'}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar size={11} style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Member since {memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Analyses', value: totalAnalyses, icon: FileText, color: '#3B82F6' },
          { label: 'Best ATS Score', value: `${bestScore}/100`, icon: Star, color: '#8B5CF6' },
          { label: 'Average Score', value: `${avgScore}/100`, icon: TrendingUp, color: '#10B981' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="theme-card p-4 text-center"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{ background: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={16} />
            </div>
            <p className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Information */}
        <div className="theme-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              Personal Information
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Full Name', value: user?.name, icon: User },
              { label: 'Email Address', value: user?.email, icon: Mail },
              { label: 'Member Since', value: memberSince, icon: Calendar },
            ].map((field) => (
              <div key={field.label} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'var(--bg-hover)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
                  <field.icon size={13} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {field.label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {field.value || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme & Account */}
        <div className="theme-card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
            Preferences
          </h3>
          <div className="space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Appearance</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Currently: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'} Mode
                </p>
              </div>
              <ThemeSwitcher />
            </div>

            {/* Account Security */}
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-hover)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} style={{ color: '#10B981' }} />
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Account Security</p>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Your account is secured with email & password authentication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analysis History */}
      <div className="theme-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
            Analysis History
          </h3>
          <Link to="/dashboard" className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
            View all →
          </Link>
        </div>
        {resumes.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: 'var(--text-muted)' }}>
            No analyses yet. <Link to="/" style={{ color: 'var(--color-primary)' }}>Start your first analysis →</Link>
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {['Resume', 'ATS Score', 'Date', 'Keywords'].map(h => (
                    <th key={h} className="pb-2 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resumes.slice(0, 5).map((r, i) => {
                  const sc = r.atsScore || 0;
                  const col = scoreColor(sc);
                  return (
                    <tr key={r._id} className="transition-colors"
                      style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td className="py-3 pr-4">
                        <Link to={`/resume/${r._id}`}
                          className="font-medium hover:underline"
                          style={{ color: 'var(--text-primary)' }}>
                          {r.analysisData?.experienceLevel || 'Professional'} Resume
                        </Link>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="font-bold text-sm" style={{ color: col }}>{sc}/100</span>
                      </td>
                      <td className="py-3 pr-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-xs" style={{ color: '#10B981' }}>
                        {r.analysisData?.matchedKeywords?.length || 0} matched
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
