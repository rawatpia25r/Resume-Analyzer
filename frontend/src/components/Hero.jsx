import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock } from 'lucide-react';

export default function Hero() {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-center py-12 md:py-20 relative">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
          ✨ The Ultimate ATS Optimizer
        </span>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white leading-tight max-w-4xl mx-auto">
          Land More Interviews with <br className="hidden md:block" />
          <span className="gradient-text">AI Resume Analysis</span>
        </h1>
        
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Optimize your resume, instantly improve your ATS score, and generate job-specific cover letters in seconds.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={scrollToUpload} className="btn-primary px-8 py-4 w-full sm:w-auto text-lg shadow-[0_0_30px_rgba(124,58,237,0.3)] shimmer">
            Upload Resume
          </button>
          <button onClick={scrollToUpload} className="btn-secondary px-8 py-4 w-full sm:w-auto text-lg">
            Try Demo
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-white/50">
          <div className="flex items-center gap-2">
            <Shield className="text-emerald-400" size={18} />
            <span>98% ATS Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-amber-400" size={18} />
            <span>AI Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="text-cyan-400" size={18} />
            <span>Secure Analysis</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
