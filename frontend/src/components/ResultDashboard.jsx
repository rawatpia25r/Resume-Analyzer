import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, CheckCircle, XCircle, TrendingUp, AlertCircle, Award } from 'lucide-react';
import ScoreCircle from './ScoreCircle';
import SectionCard from './SectionCard';

export default function ResultDashboard({ result, onReset }) {
  const handlePrint = () => {
    window.print();
  };

  const sections = Object.entries(result.sections || {});

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-8 pb-10"
    >
      {/* Top Actions */}
      <div className="flex justify-between items-center print:hidden">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-text/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Analyze Another</span>
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
        >
          <Printer size={20} />
          <span>Download Report</span>
        </button>
      </div>

      <div id="report-content" className="flex flex-col gap-8">
        {/* Header & Score */}
        <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <ScoreCircle score={result.ats_score} />
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Resume Analysis Summary</h2>
            <p className="text-text/80 text-lg leading-relaxed">{result.summary}</p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium flex items-center gap-1">
                <Award size={16} /> Level: {result.experience_level}
              </span>
              {result.job_match_percentage !== null && (
                <span className={`px-3 py-1 border rounded-full text-sm font-medium flex items-center gap-1 ${
                  result.job_match_percentage >= 70 ? 'bg-success/20 text-success border-success/30' : 
                  result.job_match_percentage >= 40 ? 'bg-warning/20 text-warning border-warning/30' : 
                  'bg-danger/20 text-danger border-danger/30'
                }`}>
                  <TrendingUp size={16} /> Job Match: {result.job_match_percentage}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(([key, data], idx) => (
            <SectionCard key={key} title={key} data={data} index={idx} />
          ))}
        </div>

        {/* Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-success/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-success">
              <CheckCircle size={24} /> Matched Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.matched_keywords?.length > 0 ? (
                result.matched_keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-success/10 text-success rounded-lg text-sm border border-success/20">
                    {kw}
                  </span>
                ))
              ) : (
                <span className="text-text/50">No matched keywords</span>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-danger/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-danger">
              <XCircle size={24} /> Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.missing_keywords?.length > 0 ? (
                result.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-danger/10 text-danger rounded-lg text-sm border border-danger/20">
                    {kw}
                  </span>
                ))
              ) : (
                <span className="text-text/50">No missing keywords found</span>
              )}
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
              <TrendingUp size={24} /> Key Strengths
            </h3>
            <ul className="space-y-3">
              {result.strengths?.map((str, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-success mt-1">•</span>
                  <span className="text-text/90">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-warning">
              <AlertCircle size={24} /> Areas to Improve
            </h3>
            <ul className="space-y-3">
              {result.improvements?.map((imp, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-warning mt-1">•</span>
                  <span className="text-text/90">{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Roles */}
        {(result.recommended_roles?.length > 0) && (
          <div className="glass-card p-6 rounded-2xl text-center">
            <h3 className="text-xl font-semibold mb-4 text-white">Recommended Roles for You</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.recommended_roles.map((role, i) => (
                <span key={i} className="px-4 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-xl font-medium">
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; color: black !important; }
          .glass-card { background: white !important; border: 1px solid #ddd !important; border-radius: 8px !important; color: black !important; box-shadow: none !important; }
          .text-white { color: black !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}} />
    </motion.div>
  );
}
