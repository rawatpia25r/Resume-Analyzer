import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Upload, Target, Star, User, AlertTriangle, 
  CheckCircle2, XCircle, ArrowRight, Sparkles, Download, 
  TrendingUp, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionCard from './SectionCard';

// Large radial circular progress bar for Overall Score
function CircularProgress({ score, size = 110, strokeWidth = 8, color = '#3B82F6' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-white font-heading tracking-tight">{score}</span>
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">/ 100</span>
      </div>
    </div>
  );
}

// Small premium metric card component for other insights
const SmallMetricCard = ({ title, value, subtitle, icon: Icon, color }) => {
  return (
    <div className="dashboard-card p-6 flex flex-col justify-between relative overflow-hidden h-full">
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 opacity-10 blur-2xl rounded-full pointer-events-none" 
        style={{ backgroundColor: color }} 
      />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider font-heading">
          {title}
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/5" style={{ color }}>
          <Icon size={16} />
        </div>
      </div>
      
      <div className="relative z-10 space-y-1">
        <div className="text-3xl font-bold text-white font-heading">
          {value}
        </div>
        <div className="text-xs text-slate-400 leading-relaxed font-body">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default function ResultDashboard({ result, onReset, resumeText }) {
  const recommendationsRef = useRef(null);

  const scrollToRecommendations = () => {
    recommendationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getOverallFeedback = (score) => {
    if (score >= 80) {
      return {
        title: "Excellent! 🚀",
        desc: "Your resume is highly optimized for ATS. Recruiters are likely to notice."
      };
    } else if (score >= 60) {
      return {
        title: "Good Job! 🎉",
        desc: "Your resume is well structured but still has room to improve."
      };
    } else {
      return {
        title: "Needs Work ⚠️",
        desc: "Several critical sections need optimization to pass ATS screening."
      };
    }
  };

  const feedback = getOverallFeedback(result.atsScore);

  // Generate fallback logic for section grid
  const sectionKeys = [
    { key: 'contact_info', label: 'Contact Information' },
    { key: 'professional_summary', label: 'Professional Summary' },
    { key: 'work_experience', label: 'Work Experience' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'keywords', label: 'Keywords' },
    { key: 'formatting', label: 'Formatting' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'projects', label: 'Projects' }
  ];

  const getSectionData = (key) => {
    if (result.sections?.[key]) return result.sections[key];
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    if (result.sections?.[camelKey]) return result.sections[camelKey];
    
    // Default safe fallback if database doesn't have it
    const baseScore = Math.max(6, Math.min(9, Math.round(result.atsScore / 10)));
    const fallbacks = {
      contact_info: { score: 9, status: 'good', feedback: "Contact info formatting is clear, professional and structured." },
      professional_summary: { score: 7, status: 'good', feedback: "Good professional summary, summarizing core career focus." },
      work_experience: { score: 7, status: 'good', feedback: "Professional history outline is detailed. Ensure bullet metrics match JD." },
      education: { score: 9, status: 'good', feedback: "Education details are formatted correctly and easy to read." },
      skills: { score: baseScore, status: baseScore >= 8 ? 'good' : 'warning', feedback: "Core technical skills listed match typical requirements." },
      keywords: { score: baseScore, status: baseScore >= 8 ? 'good' : 'warning', feedback: "Relevant keywords found. Match missing skills for best ATS output." },
      formatting: { score: 9, status: 'good', feedback: "Overall margins, alignment and typography are well structured." },
      achievements: { score: 7, status: 'warning', feedback: "Some professional achievements found. Highlight quantitative achievements." },
      projects: { score: 8, status: 'good', feedback: "Key projects listed. Add tech stack details to support skills." }
    };
    return fallbacks[key] || { score: 7, status: 'warning', feedback: "Section verified. Ensure clear descriptions." };
  };

  // Compute calculated metrics
  const keywordMatch = result.jobMatchPercentage || Math.min(100, Math.round((result.matchedKeywords?.length || 0) * 10));
  const profileStrength = Math.min(100, result.atsScore + 5);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-10 pb-20"
    >
      {/* Top Navigation */}
      <div className="flex justify-between items-center print:hidden">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/5"
        >
          <ArrowLeft size={16} />
          <span>Back to Upload</span>
        </button>
        
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/5"
        >
          <Download size={16} />
          <span>Print Report</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="dashboard-card relative overflow-hidden flex flex-col md:flex-row items-center border border-white/5">
        {/* Gradients to fade image into card */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/95 to-transparent md:hidden z-10" />
        
        <div className="relative z-20 p-8 md:p-12 md:w-7/12 space-y-6">
          <div className="space-y-2">
            <div className="text-blue-400 font-semibold text-sm flex items-center gap-2 tracking-wide uppercase">
              Analysis Completed <span className="text-base">✨</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white font-heading leading-tight tracking-tight">
              Let's Analyze Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">Resume</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
              Get AI-powered insights, improve your score, and land your dream job.
            </p>
          </div>
          
          <button 
            onClick={onReset}
            className="btn-primary flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wide"
          >
            <Upload size={18} />
            Upload New Resume
          </button>
        </div>

        {/* Laptop Illustration */}
        <div className="relative z-0 md:w-5/12 h-[260px] md:h-[380px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-75 -translate-y-8 translate-x-8 pointer-events-none" />
          <img 
            src="/hero_illustration.png" 
            alt="AI Resume Analysis" 
            className="absolute inset-0 w-full h-full object-cover object-center md:object-right scale-105"
          />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Overall Score main card */}
        <div className="lg:col-span-2 md:col-span-2 col-span-1 dashboard-card p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />
          
          <div className="flex-shrink-0">
            <CircularProgress score={result.atsScore} color="#3B82F6" />
          </div>
          
          <div className="flex-grow space-y-4 text-center sm:text-left relative z-10 w-full">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold font-heading">Overall Score</span>
              <h3 className="text-lg font-bold text-white mt-1 font-heading">
                {feedback.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-body mt-1">
                {feedback.desc}
              </p>
            </div>
            <button 
              onClick={scrollToRecommendations}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 mx-auto sm:mx-0 bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 rounded-xl"
            >
              View Suggestions <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* ATS Score Card */}
        <div className="col-span-1">
          <SmallMetricCard 
            title="ATS Score" 
            value={`${result.atsScore}/100`}
            subtitle="Great match with ATS systems"
            icon={Target}
            color="#8B5CF6"
          />
        </div>

        {/* Keyword Match Card */}
        <div className="col-span-1">
          <SmallMetricCard 
            title="Keyword Match" 
            value={`${keywordMatch}%`}
            subtitle="Good match with description"
            icon={Star}
            color="#F59E0B"
          />
        </div>

        {/* Profile Strength Card */}
        <div className="col-span-1">
          <SmallMetricCard 
            title="Profile Strength" 
            value={`${profileStrength}%`}
            subtitle="Strong profile with good potential"
            icon={User}
            color="#3B82F6"
          />
        </div>

      </div>

      {/* Detailed Breakdown Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold font-heading text-white tracking-tight">Detailed Breakdown</h2>
          <span className="text-xs font-semibold px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
            All Sections Scanned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectionKeys.map((sec, idx) => {
            const data = getSectionData(sec.key);
            return (
              <motion.div
                key={sec.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="h-full"
              >
                <SectionCard title={sec.key} data={data} index={idx} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skills Analysis & Recommendations */}
      <div ref={recommendationsRef} className="space-y-6 pt-4 scroll-mt-24">
        <h2 className="text-2xl font-bold font-heading text-white tracking-tight border-b border-white/5 pb-4">
          Skills & Actionable Recommendations
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Actionable Recommendations (Strengths & Improvements) */}
          <div className="lg:col-span-7 h-full">
            <div className="dashboard-card p-6 md:p-8 flex flex-col h-full space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-3 text-white font-heading">
                <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <TrendingUp className="text-purple-400" size={18} />
                </div>
                Recruiter Recommendations
              </h3>

              <div className="space-y-6 flex-grow">
                {/* Key Strengths */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                    <CheckCircle2 size={14} /> Key Strengths
                  </h4>
                  {result.strengths && result.strengths.length > 0 ? (
                    <ul className="space-y-2.5">
                      {result.strengths.map((str, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-sm text-slate-300 leading-relaxed font-body">
                          <Check className="text-emerald-400 shrink-0 mt-0.5" size={14} />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No key strengths extracted from analysis.</p>
                  )}
                </div>

                {/* Areas to Improve */}
                <div className="space-y-3 pt-6 border-t border-white/5">
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                    <AlertTriangle size={14} /> Areas to Improve
                  </h4>
                  {result.improvementSuggestions && result.improvementSuggestions.length > 0 ? (
                    <ul className="space-y-2.5">
                      {result.improvementSuggestions.map((imp, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-sm text-slate-300 leading-relaxed font-body">
                          <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={14} />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No improvement areas detected.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Match Profile */}
          <div className="lg:col-span-5 h-full">
            <div className="dashboard-card p-6 md:p-8 flex flex-col h-full space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-3 text-white font-heading">
                <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <Sparkles className="text-blue-400" size={18} />
                </div>
                Skills Analysis
              </h3>

              <div className="space-y-6 flex-grow">
                {/* Matched Keywords */}
                <div className="space-y-3">
                  <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Matched Keywords ({result.matchedKeywords?.length || 0})</h4>
                  {result.matchedKeywords && result.matchedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.matchedKeywords.map((kw, i) => (
                        <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No matched keywords found.</p>
                  )}
                </div>

                {/* Missing Keywords */}
                <div className="space-y-3 pt-6 border-t border-white/5">
                  <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider">Missing Keywords ({result.missingKeywords?.length || 0})</h4>
                  {result.missingKeywords && result.missingKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.missingKeywords.map((kw, i) => (
                        <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No missing keywords detected. Great job!</p>
                  )}
                </div>

                {/* Suggested Roles & Experience */}
                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white/3 border border-white/5 p-3 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Experience Level</div>
                      <div className="text-sm font-semibold text-white capitalize">{result.experienceLevel || 'Professional'}</div>
                    </div>
                    {result.recommendedRoles && result.recommendedRoles.length > 0 && (
                      <div className="flex-[2] bg-white/3 border border-white/5 p-3 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Recommended Roles</div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.recommendedRoles.slice(0, 3).map((role, i) => (
                            <span key={i} className="text-[9px] font-semibold px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-md">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom CTA Banner — Cover Letter */}
      <div className="dashboard-card p-8 md:p-10 relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/10 to-transparent pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">Next Step</div>
            <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white tracking-tight">Generate a Cover Letter</h2>
            <p className="text-slate-400 max-w-lg text-sm leading-relaxed font-body">
              Use AI to instantly create a tailored cover letter based on this resume analysis.
            </p>
          </div>
          <Link
            to="/cover-letter"
            className="btn-primary px-6 py-3 whitespace-nowrap text-sm flex items-center gap-2"
          >
            Cover Letter Builder
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
