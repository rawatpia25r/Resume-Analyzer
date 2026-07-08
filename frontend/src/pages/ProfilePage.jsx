import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Calendar, TrendingUp, Star, FileText, Download,
  Activity, Settings, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';

const scoreColor = (score) => {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#3B82F6';
  return '#F59E0B';
};

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="space-y-8 pb-12 relative z-10">
      
      {/* Massive Cover Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2.5rem] overflow-hidden relative shadow-2xl"
        style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
      >
        <div className="h-48 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563EB, #4338CA, #10B981)' }}>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="px-8 pb-8 sm:px-12 relative" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-6">
            <div
              className="w-32 h-32 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl border-[6px] flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #2563EB)',
                borderColor: 'var(--bg-card)',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 text-center sm:text-left sm:pb-3">
              <h1 className="text-3xl font-extrabold font-heading mb-1" style={{ color: 'var(--text-primary)' }}>
                {user?.name || 'User Name'}
              </h1>
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
                  <ShieldCheck size={14} /> Verified Account
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  <Calendar size={14} /> Member since {memberSince}
                </span>
              </div>
            </div>
            <div className="sm:pb-3">
              <Link to="/settings" className="btn-secondary px-5 py-2.5 text-sm flex items-center gap-2 shadow-md">
                <Settings size={16} /> Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Analyzed', value: totalAnalyses, icon: FileText, color: '#3B82F6', gradient: 'rgba(59,130,246,0.1)' },
          { label: 'Highest ATS Score', value: `${bestScore}/100`, icon: Star, color: '#3B82F6', gradient: 'rgba(59,130,246,0.1)' },
          { label: 'Average Score', value: `${avgScore}/100`, icon: TrendingUp, color: '#10B981', gradient: 'rgba(16,185,129,0.1)' },
          { label: 'Profile Completion', value: '100%', icon: Zap, color: '#F59E0B', gradient: 'rgba(245,158,11,0.1)' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="theme-card p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4 transition-opacity group-hover:opacity-40" style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color}, transparent)` }} />
            
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: stat.gradient, color: stat.color }}>
              <stat.icon size={22} />
            </div>
            <p className="text-3xl font-extrabold font-heading mb-1" style={{ color: 'var(--text-primary)' }}>
              {stat.value}
            </p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 theme-card p-6 space-y-6"
        >
          <div className="flex items-center gap-2 mb-2 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
            <User size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>About You</h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Full Name</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Email Address</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Account Tier</p>
              <p className="text-sm font-bold flex items-center gap-2" style={{ color: '#60A5FA' }}>
                <Star size={14} /> Premium Access
              </p>
            </div>
          </div>
        </motion.div>

        {/* Activity & History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 theme-card p-6"
        >
          <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2">
              <Activity size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>Recent Activity</h3>
            </div>
            <Link to="/dashboard" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors hover:text-[#60A5FA]" style={{ color: 'var(--text-muted)' }}>
              View Dashboard <ArrowRight size={14} />
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: 'rgba(96,165,250,0.1)', color: 'var(--color-primary)' }}>
                <FileText size={24} />
              </div>
              <h4 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>No Activity Yet</h4>
              <p className="text-sm max-w-sm mx-auto mb-4" style={{ color: 'var(--text-muted)' }}>Upload your first resume to see your analysis history and ATS scores here.</p>
              <Link to="/" className="btn-primary px-6 py-2.5 text-sm">Upload Resume</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.slice(0, 4).map((r, i) => {
                const sc = r.atsScore || 0;
                const col = scoreColor(sc);
                return (
                  <div key={r._id} className="flex items-center justify-between p-4 rounded-2xl transition-colors hover:bg-white/5" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${col}15`, color: col }}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <Link to={`/resume/${r._id}`} className="font-bold text-sm hover:underline block mb-0.5" style={{ color: 'var(--text-primary)' }}>
                          {r.analysisData?.experienceLevel || 'Professional'} Resume Scan
                        </Link>
                        <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          Analyzed on {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black font-heading mb-0.5" style={{ color: col }}>{sc}/100</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>ATS Score</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
