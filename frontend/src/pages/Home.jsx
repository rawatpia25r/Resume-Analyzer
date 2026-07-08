import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeResume } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AnalyzeButton from '../components/AnalyzeButton';
import ResultDashboard from '../components/ResultDashboard';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import ResumeBuilderPreview from '../components/ResumeBuilderPreview';
import CoverLetterPreview from '../components/CoverLetterPreview';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import ResumeWatermark from '../components/ResumeWatermark';
import AnalysisSuccess from '../components/AnalysisSuccess';
import { Sparkles } from 'lucide-react';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [analysisScore, setAnalysisScore] = useState(0);

  const handleAnalyze = async () => {
    // Require login before analysis
    if (!user) {
      toast('Sign in to analyze your resume', {
        icon: '🔒',
        duration: 3000,
      });
      navigate('/login');
      return;
    }

    if (!file) {
      toast.error('Please upload a resume first.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await analyzeResume(file, jobDescription);
      if (response.success) {
        setAnalysisScore(response.data.atsScore || 0);
        setShowSuccess(true);
        setResult(response.data);

        toast.success('Analysis saved to your dashboard.', {
          duration: 4000,
          icon: '💾',
        });
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
    setShowSuccess(false);
  };

  const handleViewReport = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen pt-24 flex flex-col relative overflow-hidden bg-transparent">
      {/* Analysis Success Overlay */}
      <AnalysisSuccess
        show={showSuccess}
        score={analysisScore}
        onViewReport={handleViewReport}
        onDismiss={handleViewReport}
      />

      {/* Global Landing Page Gradients & Noise */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="bg-noise" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-700/10 blur-[150px] rounded-full -translate-x-1/2" />
      </div>

      <div className="flex-grow w-full">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="landing-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 1. Hero Section */}
              <section id="home">
                <Hero />
              </section>

              {/* 2. ATS Analysis Preview (Interactive Demo) */}
              <section id="ats-analysis" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
                      <Sparkles size={14} style={{ color: '#60A5FA' }} />
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Live Demo</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      AI Resume Analysis <span className="gradient-text">Preview</span>
                    </h2>
                    <p className="text-base md:text-lg text-center max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                      Experience the power of our scoring engine. Upload your current resume and a target job description to instantly see what recruiters are looking for.
                    </p>
                  </div>

                  <div className="max-w-4xl mx-auto">
                    <div className="glass-premium p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-blue-500/10 hover:border-blue-500/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      <UploadSection file={file} setFile={setFile} />
                      <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <JobDescriptionInput 
                          jobDescription={jobDescription} 
                          setJobDescription={setJobDescription} 
                        />
                      </div>
                      <div className="mt-8">
                        <AnalyzeButton 
                          isAnalyzing={isAnalyzing} 
                          onClick={handleAnalyze} 
                          disabled={!file} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Features */}
              <section id="features" className="pt-10">
                <FeaturesSection />
              </section>

              {/* 4. How It Works */}
              <section id="how-it-works" className="pt-10">
                <HowItWorks />
              </section>

              {/* 5. Why Choose Us */}
              <WhyChooseUs />

              {/* 6. Resume Builder Preview */}
              <ResumeBuilderPreview />

              {/* 7. Cover Letter Preview */}
              <CoverLetterPreview />

              {/* 8. FAQ Section */}
              <FAQSection />

            </motion.div>
          ) : (
            <motion.div
              key="result-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
              className="max-w-7xl mx-auto px-6"
            >
              <ResultDashboard 
                result={result} 
                onReset={handleReset} 
                resumeText={file?.name || ''} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* 9. Professional Footer */}
      {!result && <Footer />}
    </div>
  );
};

export default Home;