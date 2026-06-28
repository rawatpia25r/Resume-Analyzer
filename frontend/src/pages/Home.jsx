import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeResume } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AnalyzeButton from '../components/AnalyzeButton';
import ResultDashboard from '../components/ResultDashboard';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import ResumeWatermark from '../components/ResumeWatermark';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showSaveBanner, setShowSaveBanner] = useState(false);

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload a resume first.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await analyzeResume(file, jobDescription);
      if (response.success) {
        setResult(response.data);
        toast.success('Analysis complete!');

        if (user) {
          toast.success('✅ Analysis saved to your dashboard.', {
            duration: 4000,
            icon: '💾',
          });
        } else {
          setShowSaveBanner(true);
        }
      } else {
        toast.error(response.error || 'Analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      
      const errorMessage = 
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        (error?.code === 'ERR_NETWORK' 
          ? 'Cannot connect to server. Please ensure the backend is running.'
          : 'Something went wrong during analysis. Please try again.');

      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFile(null);
    setJobDescription('');
    setShowSaveBanner(false);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Resume Watermark — right side background */}
      <ResumeWatermark />

      <div className="flex-grow max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10 pb-20"
            >
              <Hero />
              
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="glass-premium p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  <UploadSection file={file} setFile={setFile} />
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <JobDescriptionInput 
                      jobDescription={jobDescription} 
                      setJobDescription={setJobDescription} 
                    />
                  </div>
                  <AnalyzeButton 
                    isAnalyzing={isAnalyzing} 
                    onClick={handleAnalyze} 
                    disabled={!file} 
                  />
                </div>
              </div>

              {/* Landing Page Content below the fold */}
              <div className="max-w-6xl mx-auto space-y-32 mt-32">
                <StatsSection />
                <HowItWorks />
                <FeaturesSection />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              {showSaveBanner && (
                <div className="max-w-6xl mx-auto mb-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium shadow-lg backdrop-blur-sm">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-xl">💡</span> Want to save this analysis and access the AI Resume Builder?
                  </span>
                  <div className="flex gap-3">
                    <button onClick={() => window.location.href = '/login'} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">Sign In</button>
                    <button onClick={() => window.location.href = '/register'} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-white transition-colors shadow-lg shadow-indigo-500/20">Create Free Account</button>
                  </div>
                </div>
              )}
              
              <ResultDashboard 
                result={result} 
                onReset={handleReset} 
                resumeText={file?.name || ''} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Home;