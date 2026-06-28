import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Target, Zap, AlertCircle, TrendingUp, Briefcase,
  DollarSign, ExternalLink, Star, CheckCircle2, XCircle,
  Brain, ArrowRight, Sparkles
} from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const mockJobs = [
  { title: 'Senior Frontend Engineer', company: 'Google', match: 92, salary: '$140k–$180k', location: 'Remote' },
  { title: 'Full Stack Developer', company: 'Meta', match: 87, salary: '$130k–$165k', location: 'NYC' },
  { title: 'React Developer', company: 'Stripe', match: 84, salary: '$120k–$155k', location: 'Remote' },
  { title: 'Software Engineer II', company: 'Airbnb', match: 79, salary: '$115k–$145k', location: 'SF' },
  { title: 'Frontend Lead', company: 'Netflix', match: 75, salary: '$145k–$190k', location: 'LA' },
];

const MatchBar = ({ label, value, color = '#3B82F6' }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className="text-xs font-bold" style={{ color }}>{value}%</span>
    </div>
    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-hover)' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
      />
    </div>
  </div>
);

const scoreColor = (score) => {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#3B82F6';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
};

export default function JobMatch() {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await api.get('/resume/user');
        setResumes(data);
        if (data.length > 0) setSelectedResume(data[0]);
      } catch {}
      finally { setLoading(false); }
    };
    fetchResumes();
  }, []);

  const matchScore = selectedResume?.analysisData?.jobMatchPercentage || 78;
  const atsScore = selectedResume?.atsScore || 75;
  const matchedKw = selectedResume?.analysisData?.matchedKeywords || ['React', 'JavaScript', 'Node.js', 'REST APIs', 'Git'];
  const missingKw = selectedResume?.analysisData?.missingKeywords || ['TypeScript', 'GraphQL', 'Docker', 'AWS', 'CI/CD'];
  const improvements = selectedResume?.analysisData?.improvementSuggestions || [
    'Add quantified achievements to work experience',
    'Include more cloud platform keywords',
    'Add a stronger professional summary',
    'List certifications if available',
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              AI Job Match
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Discover jobs that match your profile and get AI-powered insights
            </p>
          </div>
          {resumes.length > 0 && (
            <select
              value={selectedResume?._id || ''}
              onChange={e => setSelectedResume(resumes.find(r => r._id === e.target.value))}
              className="text-sm rounded-xl px-4 py-2.5 font-medium outline-none"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {resumes.map(r => (
                <option key={r._id} value={r._id} style={{ background: 'var(--bg-card-solid)' }}>
                  {r.analysisData?.experienceLevel || 'Resume'} — {r.atsScore}/100 · {new Date(r.createdAt).toLocaleDateString()}
                </option>
              ))}
            </select>
          )}
        </div>
      </motion.div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'ATS Compatibility', value: atsScore, color: scoreColor(atsScore), icon: Target, suffix: '/100' },
          { label: 'Skill Match', value: matchScore, color: scoreColor(matchScore), icon: Zap, suffix: '%' },
          { label: 'Keywords Matched', value: matchedKw.length, color: '#10B981', icon: CheckCircle2, suffix: '' },
          { label: 'Missing Keywords', value: missingKw.length, color: '#F59E0B', icon: AlertCircle, suffix: '' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="theme-card p-5 relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl opacity-25"
              style={{ background: m.color }} />
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${m.color}18`, color: m.color }}>
                <m.icon size={14} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold" style={{ color: m.color, fontFamily: 'Sora, sans-serif' }}>
                {m.value}
              </span>
              {m.suffix && <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{m.suffix}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Match Progress Bars */}
        <div className="theme-card p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
              <TrendingUp size={13} />
            </div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              Skill Breakdown
            </h3>
          </div>
          <MatchBar label="Technical Skills" value={82} color="#3B82F6" />
          <MatchBar label="Experience Level" value={75} color="#8B5CF6" />
          <MatchBar label="Education Match" value={90} color="#10B981" />
          <MatchBar label="Keyword Density" value={68} color="#F59E0B" />
          <MatchBar label="ATS Readability" value={atsScore} color="#EF4444" />
        </div>

        {/* Keywords */}
        <div className="theme-card p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>
              <Sparkles size={13} />
            </div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              Keywords
            </h3>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#10B981' }}>
              ✓ Matched ({matchedKw.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {matchedKw.map((kw, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-lg font-medium"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#F59E0B' }}>
              ✗ Missing ({missingKw.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {missingKw.map((kw, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-lg font-medium"
                  style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="theme-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
              <Brain size={13} />
            </div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              AI Insights
            </h3>
          </div>
          <div className="space-y-2.5">
            {improvements.map((tip, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
                  style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
                  {i + 1}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Jobs Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="theme-card p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              Matching Jobs
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Based on your resume profile
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6' }}>
            {mockJobs.length} matches found
          </span>
        </div>

        <div className="space-y-2.5">
          {mockJobs.map((job, i) => {
            const mc = scoreColor(job.match);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200"
                style={{
                  background: 'var(--bg-hover)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
              >
                {/* Match Score */}
                <div
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 font-bold"
                  style={{ background: `${mc}15`, border: `1px solid ${mc}30`, color: mc }}
                >
                  <span className="text-sm leading-none">{job.match}%</span>
                  <span className="text-[8px] opacity-70 mt-0.5">match</span>
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{job.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{job.company}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md"
                      style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Salary */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: '#10B981' }}>
                  <DollarSign size={12} />
                  {job.salary}
                </div>

                {/* Apply */}
                <button
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  Apply
                  <ExternalLink size={11} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Why This Job Matches */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="theme-card p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.04))' }}
      >
        <div className="absolute right-0 top-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)' }} />
        <div className="relative z-10">
          <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
            ✨ Why Top Jobs Match You
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'Strong Tech Stack', desc: 'Your React, Node.js and JS skills align with 90% of frontend roles', icon: '⚡' },
              { title: 'Experience Level', desc: 'Your experience level matches mid-senior engineer requirements', icon: '🎯' },
              { title: 'ATS Optimized', desc: `Your resume scored ${atsScore}/100 — above the 65-point threshold`, icon: '✅' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
