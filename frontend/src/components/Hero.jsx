import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-6 py-10"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300"
      >
        <Sparkles size={14} className="text-purple-400" />
        AI-Powered Resume Analysis
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight font-heading"
      >
        Make Your Resume{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
          ATS Friendly
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
      >
        Get AI-powered insights, improve your resume, and land more interviews.
        <span className="text-white/40"> Upload your resume below to get started.</span>
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-8 text-sm text-white/40 font-medium pt-2"
      >
        {[
          { label: 'Resumes Analyzed', value: '50K+' },
          { label: 'Avg Score Boost', value: '+34%' },
          { label: 'Jobs Landed', value: '12K+' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-white font-bold text-lg">{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex justify-center pt-4 text-white/20"
      >
        <ArrowDown size={20} />
      </motion.div>
    </motion.div>
  );
}
