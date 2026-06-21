import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FileSearch, ExternalLink, Trash2, Plus } from 'lucide-react';
import { getUserResumes, deleteResume } from '../services/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const getScoreColor = (score) => {
  if (score >= 80) return { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/30', bar: 'bg-emerald-500' };
  if (score >= 50) return { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/30', bar: 'bg-amber-500' };
  return { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/30', bar: 'bg-red-500' };
};

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getUserResumes();
        setResumes(data);
      } catch (error) {
        toast.error('Failed to load past analyses');
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this analysis?')) return;
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Analysis deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-24 px-4 flex items-center justify-center text-white">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Your Resume Analyses</h1>
        <Link to="/" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-purple-500/20">
          <Plus size={18} /> Analyze New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl">
          <FileSearch className="w-16 h-16 text-white/20 mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-xl text-white/80 font-medium">No resumes analyzed yet</h2>
          <p className="text-white/50 mt-2 mb-6">Upload and analyze a resume to see results here.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition">
            <Plus size={16} /> Get Started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, idx) => {
            const colors = getScoreColor(resume.atsScore);
            const isInMemory = resume.originalResumeUrl === 'analyzed-in-memory' || resume.originalResumeUrl === 'stored-in-memory';
            return (
              <motion.div key={resume._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="text-sm text-white/50">{new Date(resume.createdAt).toLocaleDateString()}</div>
                  <div className={`${colors.bg} ${colors.text} ${colors.border} border px-3 py-1 rounded-full text-xs font-semibold`}>
                    ATS: {resume.atsScore}/100
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className={`${colors.bar} h-full rounded-full transition-all duration-500`} style={{ width: `${resume.atsScore}%` }} />
                </div>
                <div>
                  {!isInMemory ? (
                    <a href={resume.originalResumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:text-purple-300 transition-colors text-sm">
                      <ExternalLink size={14} /> View original PDF
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-white/40 text-sm"><FileText size={14} /> Analyzed in-memory</span>
                  )}
                </div>
                <p className="text-sm text-white/70 line-clamp-3">{resume.analysisData?.summary || 'No summary available.'}</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/40">
                  <span>{resume.analysisData?.missingKeywords?.length || 0} missing keywords</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleDelete(resume._id)} className="text-red-400/60 hover:text-red-400 transition-colors p-1" title="Delete">
                      <Trash2 size={14} />
                    </button>
                    <Link to={`/dashboard/resume/${resume._id}`} className="text-white hover:text-purple-300 font-medium transition-colors">
                      Full Details &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
