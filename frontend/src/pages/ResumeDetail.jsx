import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, AlertTriangle, FileSearch } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ScoreCircle from '../components/ScoreCircle';
import SectionCard from '../components/SectionCard';
import ResumeBuilder from '../components/ResumeBuilder';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await api.get(`/resume/${id}`);
        setResume(data);
      } catch (error) {
        toast.error('Failed to fetch resume details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  if (loading) {
    return <div className="min-h-screen pt-24 px-4 flex items-center justify-center text-white">Loading details...</div>;
  }

  if (!resume) return null;

  const isInMemory = resume.originalResumeUrl === 'analyzed-in-memory' || resume.originalResumeUrl === 'stored-in-memory';
  const sections = Object.entries(resume.analysisData?.sections || {});
  const hasResumeText = resume.resumeText && resume.resumeText.trim().length > 0;

  return (
    <div className="min-h-screen pt-24 px-4 max-w-5xl mx-auto pb-20">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      {/* Score + Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 rounded-2xl mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreCircle score={resume.atsScore} />
          <div className="flex-1 space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-3 justify-center md:justify-start">
              <FileSearch className="text-blue-400" /> Resume Analysis
            </h2>
            <p className="text-white/80 leading-relaxed">{resume.analysisData?.summary}</p>
            {!isInMemory ? (
              <a href={resume.originalResumeUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium">
                <FileText size={16} /> View Uploaded PDF
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-white/40">
                <FileText size={16} /> PDF not stored (analyzed in-memory)
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sections Grid */}
      {sections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sections.map(([key, data], idx) => (
            <SectionCard key={key} title={key} data={data} index={idx} />
          ))}
        </div>
      )}

      {/* Missing Keywords + Improvement Suggestions sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-semibold text-red-300 flex items-center gap-2 mb-4">
            <AlertTriangle size={18} /> Missing Keywords
          </h3>
          <ul className="flex flex-wrap gap-2">
            {resume.analysisData?.missingKeywords?.map((kw, i) => (
              <li key={i} className="bg-red-500/10 text-red-300 px-3 py-1 rounded-lg text-sm border border-red-500/20">{kw}</li>
            ))}
            {!resume.analysisData?.missingKeywords?.length && <li className="text-white/50 text-sm">None detected</li>}
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-semibold text-blue-300 flex items-center gap-2 mb-4">
            <FileText size={18} /> Improvement Suggestions
          </h3>
          <ul className="space-y-3">
            {resume.analysisData?.improvementSuggestions?.map((sug, i) => (
              <li key={i} className="text-sm text-white/70 flex gap-2">
                <span className="text-blue-400 mt-0.5">•</span> {sug}
              </li>
            ))}
            {!resume.analysisData?.improvementSuggestions?.length && <li className="text-white/50 text-sm">Resume looks solid!</li>}
          </ul>
        </div>
      </div>

      {/* Resume Builder */}
      <div className="border-t border-white/10 pt-8">
        {hasResumeText ? (
          <ResumeBuilder analysisResult={resume.analysisData} resumeText={resume.resumeText} />
        ) : (
          <div className="glass-card p-8 rounded-2xl text-center border border-amber-500/20">
            <AlertTriangle className="text-amber-400 mx-auto mb-3" size={32} />
            <p className="text-white/80 font-medium mb-1">Resume text not available for AI generation</p>
            <p className="text-white/50 text-sm">Please re-upload your resume from the home page to use the AI Resume Builder.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDetail;
