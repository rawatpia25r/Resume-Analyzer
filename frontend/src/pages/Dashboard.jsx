import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, MapPin, Clock, Search, ExternalLink } from 'lucide-react';
import { getUserResumes } from '../services/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

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

  if (loading) {
    return <div className="min-h-screen pt-24 px-4 flex items-center justify-center text-white">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Your Resume Analyses</h1>
      
      {resumes.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-xl text-white/80 font-medium">No resumes analyzed yet</h2>
          <p className="text-white/50 mt-2">Upload a resume on the home page to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, idx) => (
            <motion.div 
              key={resume._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group hover:border-purple-500/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="text-sm text-white/50">{new Date(resume.createdAt).toLocaleDateString()}</div>
                <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  ATS: {resume.atsScore}%
                </div>
              </div>
              
              <div>
                <a href={resume.originalResumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:text-purple-300 transition-colors">
                  <ExternalLink size={16} /> view original PDF
                </a>
              </div>
              
              <p className="text-sm text-white/70 line-clamp-3">
                {resume.analysisData?.summary || 'No summary available.'}
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/40">
                <span>{resume.analysisData?.missingKeywords?.length || 0} issues found</span>
                <Link to={`/dashboard/resume/${resume._id}`} className="text-white hover:text-purple-300 font-medium transition-colors">
                  Full Details &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
