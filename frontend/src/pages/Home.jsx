import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AnalyzeButton from '../components/AnalyzeButton';
import ResultDashboard from '../components/ResultDashboard';
import { analyzeResume } from '../services/api';

function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

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
              <UploadSection file={file} setFile={setFile} />
              
              <div className="h-px w-full border-t border-white/10" />
              
              <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />
              
              <AnalyzeButton isAnalyzing={isAnalyzing} onClick={handleAnalyze} disabled={!file} />
            </div>
          </motion.div>
        ) : (
          <ResultDashboard result={result} onReset={resetAnalysis} />
        )}
      </main>
    </div>
  );
}

export default Home;