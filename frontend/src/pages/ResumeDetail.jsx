import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle, AlertTriangle, ArrowLeft, Wand2, FileSearch } from 'lucide-react';
import api, { optimizeResume, generateCoverLetterText, downloadPDF } from '../services/api';
import { toast } from 'react-hot-toast';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [jobDesc, setJobDesc] = useState('');
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeResult, setOptimizeResult] = useState(null);
  
  const [generatingCL, setGeneratingCL] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

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

  const handleOptimize = async () => {
    if (!jobDesc) {
      toast.error('Please enter a job description to optimize against.');
      return;
    }
    setOptimizing(true);
    try {
      const data = await optimizeResume(`Resume URL: ${resume.originalResumeUrl}`, jobDesc);
      setOptimizeResult(data);
      toast.success('Resume optimized successfully!');
    } catch (error) {
      toast.error('Optimization failed.');
    } finally {
      setOptimizing(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDesc) {
      toast.error('Please enter a job description to generate a cover letter.');
      return;
    }
    setGeneratingCL(true);
    try {
      const data = await generateCoverLetterText(`Resume URL: ${resume.originalResumeUrl}`, jobDesc);
      setCoverLetter(data.coverLetterText);
      toast.success('Cover letter generated!');
    } catch (error) {
      toast.error('Failed to generate cover letter.');
    } finally {
      setGeneratingCL(false);
    }
  };

  const handleDownloadPDF = async (content, type) => {
    try {
      const toastId = toast.loading('Generating PDF...');
      await downloadPDF(content, `${type}_${new Date().getTime()}`);
      toast.success('PDF generated!', { id: toastId });
    } catch (error) {
      toast.error('Failed to download PDF.');
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-24 px-4 flex items-center justify-center text-white">Loading details...</div>;
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen pt-24 px-4 max-w-5xl mx-auto pb-20">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8 rounded-2xl">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6 flex items-center gap-3">
              <FileSearch className="text-blue-400" />
              Original Analysis
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold text-white">{resume.atsScore}<span className="text-2xl text-white/50">%</span></div>
              <div className="text-sm text-white/60">ATS Match Score</div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">{resume.analysisData?.summary}</p>
            
            <a href={resume.originalResumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium">
              <FileText size={16} /> View Uploaded PDF
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Job Target Refinement</h3>
            <p className="text-white/50 text-sm mb-4">Paste a targeted job description to unlock AI powers.</p>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[120px] mb-4"
              placeholder="e.g. Senior Frontend Engineer at TechCorp..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleOptimize}
                disabled={optimizing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition disabled:opacity-50"
              >
                <Wand2 size={18} /> {optimizing ? 'Optimizing...' : 'Optimize Resume'}
              </button>
              <button 
                onClick={handleGenerateCoverLetter}
                disabled={generatingCL}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition disabled:opacity-50"
              >
                <FileText size={18} /> {generatingCL ? 'Writing...' : 'Write Cover Letter'}
              </button>
            </div>
          </motion.div>

          {optimizeResult && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6 md:p-8 rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle className="text-green-400" /> Optimized Resume
                </h3>
                <button onClick={() => handleDownloadPDF(optimizeResult.optimizedResumeText, 'Resume')} className="p-2 rounded-lg bg-white/5 text-purple-400 hover:bg-white/10 transition">
                  <Download size={20} />
                </button>
              </div>
              <div className="bg-black/20 p-4 rounded-xl text-white/80 whitespace-pre-wrap text-sm border border-white/5">
                {optimizeResult.optimizedResumeText}
              </div>
            </motion.div>
          )}

          {coverLetter && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6 md:p-8 rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-blue-400" /> Cover Letter
                </h3>
                <button onClick={() => handleDownloadPDF(coverLetter, 'CoverLetter')} className="p-2 rounded-lg bg-white/5 text-purple-400 hover:bg-white/10 transition">
                  <Download size={20} />
                </button>
              </div>
              <div className="bg-black/20 p-4 rounded-xl text-white/80 whitespace-pre-wrap text-sm border border-white/5">
                {coverLetter}
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
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
              <CheckCircle size={18} /> Improvement Suggestions
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
          
          <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30">
            <h3 className="font-bold text-white mb-2">Want better results?</h3>
            <p className="text-sm text-white/70 mb-4">You can download the optimized resume we generated and upload it again to see your ATS Score improve.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;
