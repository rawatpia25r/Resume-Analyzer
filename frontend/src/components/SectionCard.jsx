import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SectionCard({ title, data, index }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'good':
        return <CheckCircle2 className="text-emerald-400" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-amber-400" size={20} />;
      case 'missing':
        return <XCircle className="text-red-400" size={20} />;
      default:
        return null;
    }
  };

  const getBorderColor = (status) => {
    switch(status) {
      case 'good': return 'group-hover:border-emerald-500/30 border-white/5';
      case 'warning': return 'group-hover:border-amber-500/30 border-white/5';
      case 'missing': return 'group-hover:border-red-500/30 border-white/5';
      default: return 'border-white/5 hover:border-white/10';
    }
  };

  const getProgressColor = (score) => {
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 5) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const getScoreTextColor = (score) => {
    if (score >= 8) return 'text-emerald-400';
    if (score >= 5) return 'text-amber-400';
    return 'text-red-400';
  };

  const titleMappings = {
    'contact_info': 'Contact Information',
    'contact_information': 'Contact Information',
    'professional_summary': 'Professional Summary',
    'work_experience': 'Work Experience',
    'education': 'Education',
    'skills': 'Skills',
    'keywords': 'Keywords',
    'formatting': 'Formatting',
    'achievements': 'Achievements',
    'projects': 'Projects'
  };
  const formattedTitle = titleMappings[title.toLowerCase()] || title.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div 
      className={`dashboard-card p-6 group transition-all duration-300 ${getBorderColor(data.status)} hover:-translate-y-1 h-full flex flex-col`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {getStatusIcon(data.status)}
          <h4 className="font-semibold text-white font-heading">{formattedTitle}</h4>
        </div>
        <span className={`text-sm font-bold ${getScoreTextColor(data.score)}`}>{data.score}/10</span>
      </div>
      
      <div className="mb-4">
        <div className="h-1 w-full bg-[#1E293B] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(data.score / 10) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 + (index * 0.05) }}
            className={`h-full rounded-full ${getProgressColor(data.score)}`}
          />
        </div>
      </div>
      
      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6 line-clamp-3">
        {data.feedback}
      </p>

      <button className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-blue-400 transition-colors mt-auto w-max bg-[#0E131F] border border-white/5 px-4 py-2 rounded-lg">
        View Details <ArrowRight size={14} />
      </button>
    </div>
  );
}
