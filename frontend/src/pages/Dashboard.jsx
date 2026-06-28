import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, TrendingUp, Upload, Loader2,
  Trash2, Plus, Trophy, BarChart2, ChevronRight,
  Mail, Briefcase, Lightbulb, Calendar, Tag, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import DashboardCharts from '../components/DashboardCharts';

/* ── Inline Resume Preview (prominent, ~40% opacity) ── */
function ResumePreview() {
  return (
    <div
      className="pointer-events-none select-none absolute right-0 top-0 h-full flex items-center pr-6"
      aria-hidden="true"
      style={{ width: '42%' }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Resume card */}
      <div
        style={{
          width: '100%',
          maxWidth: '340px',
          transform: 'rotate(6deg) translateX(20px)',
          opacity: 0.55,
          fontFamily: 'Inter, sans-serif',
          color: '#CBD5E1',
          background: 'rgba(15,23,42,0.85)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: '16px',
          padding: '20px 22px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 60px rgba(59,130,246,0.08)',
          backdropFilter: 'blur(8px)',
          lineHeight: 1.5,
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: '1.5px solid rgba(100,116,139,0.4)', paddingBottom: '10px', marginBottom: '12px' }}>
          <div style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.3px', color: '#F1F5F9', fontFamily: 'Sora, sans-serif' }}>
            YOUR NAME
          </div>
          <div style={{ fontSize: '9px', fontWeight: 600, color: '#94A3B8', marginTop: '2px', letterSpacing: '0.5px' }}>
            PROFESSIONAL TITLE
          </div>
          <div style={{ fontSize: '7.5px', color: '#64748B', marginTop: '5px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span>✉ youremail@gmail.com</span>
            <span>✆ +1 123 456 7890</span>
            <span>⊕ City, Country</span>
          </div>
          <div style={{ fontSize: '7.5px', color: '#64748B', marginTop: '2px' }}>
            in linkedin.com/in/yourprofile
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '4px' }}>
            SUMMARY
          </div>
          <div style={{ fontSize: '7.5px', color: '#64748B', lineHeight: 1.6 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '4px' }}>
            EXPERIENCE
          </div>
          {[
            { role: 'Your Job Title', company: 'Company Name / Location', period: 'Jan 2022 - Present' },
            { role: 'Previous Role', company: 'Company Name / Location', period: '2020 - 2022' },
          ].map((exp, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              <div style={{ fontSize: '8px', fontWeight: 600, color: '#CBD5E1' }}>{exp.role}</div>
              <div style={{ fontSize: '7px', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                <span>{exp.company}</span>
                <span>{exp.period}</span>
              </div>
              <div style={{ fontSize: '7px', color: '#475569', marginTop: '2px' }}>
                • Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '4px' }}>
            EDUCATION
          </div>
          <div style={{ fontSize: '7.5px', fontWeight: 600, color: '#CBD5E1' }}>Your Degree</div>
          <div style={{ fontSize: '7px', color: '#64748B' }}>University Name / Location &nbsp;&nbsp; 2018 – 2022</div>
        </div>

        {/* Skills */}
        <div>
          <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '4px' }}>
            SKILLS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'].map((s, i) => (
              <span key={i} style={{
                fontSize: '7px', padding: '2px 7px', borderRadius: '999px',
                border: '1px solid rgba(59,130,246,0.3)', color: '#94A3B8',
                background: 'rgba(59,130,246,0.06)',
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ title, value, icon: Icon, color, trend, trendLabel, delay = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = typeof value === 'number' ? value : 0;
    if (target === 0) return;
    const duration = 1200;
    const start = Date.now();
    const timer = setInterval(() => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(target * eased));
      if (t >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl p-5 relative overflow-hidden group cursor-default"
      style={{
        background: '#0D1829',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}44`;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.3), 0 0 20px ${color}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, color }}
        >
          <Icon size={18} />
        </div>
      </div>

      {/* Value */}
      <div className="mb-1">
        <span className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
          {display}
        </span>
      </div>

      {/* Title */}
      <p className="text-xs font-medium text-slate-400 mb-2">{title}</p>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-1">
          <TrendingUp size={11} className="text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400">{trend}</span>
          <span className="text-[10px] text-slate-500">{trendLabel}</span>
        </div>
      )}

      {/* Bottom glow bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

/* ── Recent Analysis Row ── */
function RecentRow({ resume, onDelete }) {
  const score = resume.atsScore || 0;
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#3B82F6' : score >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <Link
      to={`/resume/${resume._id}`}
      className="flex items-center gap-3 p-3 rounded-xl group transition-all duration-200"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* File icon */}
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
        <FileText size={14} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {resume.analysisData?.experienceLevel || 'Professional'} Resume
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-[10px] text-slate-500">
            {new Date(resume.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-[10px] text-slate-500">
            · {resume.analysisData?.matchedKeywords?.length || 0} Matched Keywords
          </span>
        </div>
      </div>

      {/* Score badge */}
      <div
        className="px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0"
        style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
      >
        {score}/100
      </div>

      {/* Delete on hover */}
      <button
        onClick={(e) => { e.preventDefault(); onDelete(resume._id); }}
        className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ml-1"
        style={{ color: '#EF4444' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        title="Delete"
      >
        <Trash2 size={13} />
      </button>
    </Link>
  );
}

/* ── Quick Action Item ── */
function ActionItem({ icon: Icon, title, desc, color, path, delay }) {
  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
      <Link
        to={path}
        className="flex items-center gap-3 py-3 px-2 rounded-xl group transition-all duration-200"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ background: `${color}15`, color }}
        >
          <Icon size={15} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-[10px] text-slate-500">{desc}</p>
        </div>
        <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════ */
const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => { fetchResumes(); }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await api.get('/resume/user');
      setResumes(data);
    } catch { toast.error('Failed to load history'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this analysis?')) return;
    try {
      await api.delete(`/resume/${id}`);
      setResumes(p => p.filter(r => r._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const totalAnalyses = resumes.length;
  const avgScore = totalAnalyses > 0
    ? Math.round(resumes.reduce((a, r) => a + (r.atsScore || 0), 0) / totalAnalyses) : 0;
  const bestScore = totalAnalyses > 0
    ? Math.max(...resumes.map(r => r.atsScore || 0)) : 0;
  const firstName = user?.name?.split(' ')[0] || 'there';

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Loader2 className="animate-spin" size={36} style={{ color: '#3B82F6' }} />
          <p className="text-sm font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-10">

      {/* ══ HERO SECTION ══ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: '#0B1628',
          border: '1px solid rgba(255,255,255,0.07)',
          minHeight: '220px',
        }}
      >
        {/* Left content */}
        <div className="relative z-10 p-8" style={{ maxWidth: '55%' }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA' }}
          >
            ✦ AI-Powered Resume Analysis
          </div>

          <h1
            className="font-extrabold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF', fontFamily: 'Sora, sans-serif' }}
          >
            Make Your Resume
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ATS Friendly
            </span>
          </h1>

          <p className="text-sm text-slate-400 mb-5 leading-relaxed">
            Get AI-powered insights, improve your resume,<br />and land more interviews.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              boxShadow: '0 4px 18px rgba(59,130,246,0.4)',
            }}
          >
            <Plus size={15} />
            New Analysis
          </Link>

          {/* Social proof */}
          <div className="flex items-center gap-2 mt-5">
            <div className="flex -space-x-2">
              {['#3B82F6', '#8B5CF6', '#10B981'].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0B1628] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: c, zIndex: 3 - i }}>
                  {['A', 'B', 'C'][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              Join 50K+ professionals improving their careers with AI ✨
            </span>
          </div>
        </div>

        {/* Resume Preview — right side */}
        <ResumePreview />
      </motion.div>

      {/* ══ STAT CARDS ══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Analyses" value={totalAnalyses} icon={FileText} color="#3B82F6"
          trend={totalAnalyses > 0 ? `↑ ${totalAnalyses}` : undefined} trendLabel="all time" delay={0.05} />
        <StatCard title="Average ATS Score" value={avgScore} icon={TrendingUp} color="#10B981"
          trend={avgScore >= 70 ? '↑ 8%' : undefined} trendLabel="this month" delay={0.1} />
        <StatCard title="Best ATS Score" value={bestScore} icon={Trophy} color="#8B5CF6"
          trend={bestScore > 0 ? '↑ 5%' : undefined} trendLabel="this month" delay={0.15} />
        <StatCard title="Resumes Uploaded" value={totalAnalyses} icon={Upload} color="#F59E0B"
          trend={totalAnalyses > 0 ? '↑ 16%' : undefined} trendLabel="this month" delay={0.2} />
      </div>

      {/* ══ BOTTOM ROW: Recent | Score Trend | Quick Actions ══ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Recent Analysis */}
        <div
          className="lg:col-span-1 rounded-2xl p-5"
          style={{ background: '#0D1829', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
              Recent Analysis
            </h3>
            <Link to="/dashboard" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
              View All
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="py-8 text-center">
              <FileText size={28} className="mx-auto mb-3 text-slate-600" />
              <p className="text-sm text-slate-500">No analyses yet</p>
              <Link to="/" className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300">
                Start First Analysis <ArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <div>
              {resumes.slice(0, 4).map((r) => (
                <RecentRow key={r._id} resume={r} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>

        {/* Score Trend Chart */}
        <div
          className="lg:col-span-1 rounded-2xl p-5"
          style={{ background: '#0D1829', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                Score Trend
              </h3>
            </div>
            <span className="text-[10px] font-medium px-2 py-1 rounded-lg text-slate-400"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
              This Month
            </span>
          </div>
          <DashboardCharts resumes={resumes} compact />
        </div>

        {/* Quick Actions */}
        <div
          className="lg:col-span-1 rounded-2xl p-5"
          style={{ background: '#0D1829', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h3 className="font-semibold text-white text-sm mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Quick Actions
          </h3>
          <div>
            <ActionItem icon={FileText} title="New Analysis" desc="Analyze your resume" color="#3B82F6" path="/" delay={0.1} />
            <ActionItem icon={Mail} title="Cover Letter Builder" desc="Create a cover letter" color="#8B5CF6" path="/cover-letter" delay={0.15} />
            <ActionItem icon={Briefcase} title="Job Match" desc="Find the best job match" color="#10B981" path="/job-match" delay={0.2} />
            <ActionItem icon={Lightbulb} title="Resume Tips" desc="Expert ATS tips" color="#F59E0B" path="/" delay={0.25} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
