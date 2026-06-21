import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Wand2 } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ResumeBuilder from '../components/ResumeBuilder';

const ResumeBuilderPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await api.get('/resume/user');
      setResumes(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load your resumes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white/50">
          <Loader2 className="animate-spin text-purple-500" size={40} />
          <p className="font-medium tracking-wide">Loading Resume Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
            <Wand2 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">AI Resume Builder</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Select a previously analyzed resume to generate tailored, job-specific resumes and cover letters in seconds.
          </p>
        </div>

        {resumes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-premium rounded-3xl p-16 text-center border-dashed border-2 border-white/10"
          >
            <FileText size={48} className="text-white/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">No resumes found</h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              You need to analyze a resume first before you can use the AI Builder.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary px-8 py-3.5 inline-flex"
            >
              Analyze a Resume
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="glass-premium p-8 rounded-3xl">
              <label className="block text-sm font-bold text-white/80 uppercase tracking-wide mb-4">
                1. Select Base Resume
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                  onChange={(e) => {
                    const r = resumes.find(r => r._id === e.target.value);
                    setSelectedResume(r);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-gray-900">Choose a resume...</option>
                  {resumes.map((r) => (
                    <option key={r._id} value={r._id} className="bg-gray-900">
                      Analysis from {new Date(r.createdAt).toLocaleDateString()} — {r.atsScore} ATS Score
                    </option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  ▼
                </div>
              </div>
            </div>

            {selectedResume && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ResumeBuilder 
                  analysisResult={selectedResume.analysisData}
                  resumeText={selectedResume.resumeText}
                />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
