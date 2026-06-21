import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, Trash2, ChevronRight, BarChart3, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await api.get('/resume/user');
      setResumes(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this analysis?')) return;
    
    try {
      await api.delete(`/resume/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
      toast.success('Analysis deleted');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete analysis');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white/50">
          <Loader2 className="animate-spin text-purple-500" size={40} />
          <p className="font-medium tracking-wide">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Your Dashboard</h1>
          <p className="text-white/50 text-lg">Welcome back, <span className="text-white/80 font-medium">{user?.name}</span>. Here's your analysis history.</p>
        </div>
        <Link 
          to="/" 
          className="btn-primary px-6 py-3 shadow-[0_0_20px_rgba(124,58,237,0.3)] shimmer"
        >
          New Analysis
        </Link>
      </div>

      {resumes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-premium rounded-3xl p-16 text-center border-dashed border-2 border-white/10"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-white/30" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No analysis history yet</h3>
          <p className="text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
            Upload your first resume to get actionable feedback, ATS scoring, and tailored document generation.
          </p>
          <Link to="/" className="btn-primary px-8 py-3.5 inline-flex">
            Start First Analysis
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {resumes.map((resume, index) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/resume/${resume._id}`}
                  className="block h-full glass-premium rounded-2xl p-6 group hover:-translate-y-1 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-colors" />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-purple-500/10 transition-colors">
                      <FileText size={24} className="text-white/70 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg border font-bold text-sm flex items-center gap-1.5 ${getScoreColor(resume.atsScore)}`}>
                      <BarChart3 size={14} />
                      {resume.atsScore} / 100
                    </div>
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-purple-300 transition-colors">
                        {resume.analysisData?.experienceLevel || 'Professional'} Resume
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Calendar size={12} />
                        {new Date(resume.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', day: 'numeric', year: 'numeric' 
                        })}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-1">Status</div>
                        <div className="text-sm font-medium text-white/80 truncate">
                          {resume.analysisData?.jobMatchPercentage 
                            ? `${resume.analysisData.jobMatchPercentage}% Match` 
                            : 'General Analysis'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-1">Keywords</div>
                        <div className="text-sm font-medium text-emerald-400">
                          {resume.analysisData?.matchedKeywords?.length || 0} Matched
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button 
                      onClick={(e) => handleDelete(resume._id, e)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg backdrop-blur-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="p-2 bg-purple-500/20 text-purple-300 rounded-lg backdrop-blur-md">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
