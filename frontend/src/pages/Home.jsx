import React, { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AnalyzeButton from '../components/AnalyzeButton';
import ResultDashboard from '../components/ResultDashboard';
import { analyzeResume } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [showSaveBanner, setShowSaveBanner] = useState(false);

  const handleFileChange = async (newFile) => {
    setFile(newFile);
    if (newFile) {
      try {
        // Read file as text for the ResumeBuilder component
        // Note: .text() works well for DOCX but gives garbled output for PDF — this is a known limitation
        const text = await newFile.text();
        setResumeText(text.substring(0, 8000));
      } catch {
        setResumeText('');
      }
    } else {
      setResumeText('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload a resume first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await analyzeResume(file, jobDescription);
      if (response.success) {
        setResult(response.data);
        toast.success('Analysis complete!');

        // Show appropriate feedback based on auth state
        if (user) {
          toast.success('✅ Analysis saved to your dashboard.', {
            duration: 4000,
            icon: '💾',
          });
        } else {
          setShowSaveBanner(true);
        }
      } else {
        toast.error('Analysis failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || 'Something went wrong during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setJobDescription('');
    setResult(null);
    setResumeText('');
    setShowSaveBanner(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-20">
      <main className="max-w-5xl mx-auto px-4 pt-24">
        {!result ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <Hero />
            
            <div className="glass-card p-6 md:p-8 rounded-2xl shadow-xl flex flex-col gap-8">
              <UploadSection file={file} setFile={handleFileChange} />
              
              <div className="h-px w-full border-t border-white/10" />
              
              <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />
              
              <AnalyzeButton isAnalyzing={isAnalyzing} onClick={handleAnalyze} disabled={!file} />
            </div>
          </motion.div>
        ) : (
          <>
            {/* Save Banner for guests */}
            {showSaveBanner && !user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Save size={20} className="text-indigo-400 shrink-0" />
                  <p className="text-sm text-white/90">
                    💾 Create a free account to save this analysis and access it later from your dashboard.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                  >
                    Sign Up Free
                  </Link>
                  <button onClick={() => setShowSaveBanner(false)} className="text-white/40 hover:text-white/70 transition">
                    <X size={18} />
                  </button>
                </div>
              </motion.div>
            )}
            <ResultDashboard result={result} onReset={resetAnalysis} resumeText={resumeText} />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;