import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BarChart3, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-8 py-16 md:py-24 relative z-10"
      >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider"
        style={{
          border: '1px solid rgba(96,165,250,0.3)',
          background: 'rgba(96,165,250,0.08)',
          color: '#C4B5FD',
        }}
      >
        <Sparkles size={14} style={{ color: '#60A5FA' }} />
        Professional Resume Builder
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.8 }}
        className="text-5xl md:text-7xl lg:text-[5rem] font-black leading-[1.1] tracking-tight font-heading max-w-5xl mx-auto"
        style={{ color: 'var(--text-primary)' }}
      >
        Build an ATS-Optimized Resume with{' '}
        <span
          style={{
            background: 'linear-gradient(90deg, #C4B5FD, #60A5FA, #2563EB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Intelligence
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        Craft a recruiter-ready resume guaranteed to bypass automated screening. Identify missing keywords, fix formatting flaws, and secure more interviews.
      </motion.p>

      </motion.div>

      {/* Premium Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 40 }}
        className="relative max-w-5xl mx-auto px-4 pb-20 z-20 perspective-1000"
      >
        <motion.div 
          animate={{ y: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="glass-premium rounded-[2.5rem] p-3 md:p-6 shadow-2xl relative overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px -12px rgba(37,99,235,0.25)' }}
        >
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-32 bg-white/5 rounded-full hidden md:block" />
              <div className="h-6 w-6 rounded-full bg-blue-600/20" />
            </div>
          </div>

          {/* Dashboard Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column - Main Score */}
            <div className="col-span-1 md:col-span-1 glass-premium rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center h-[280px]">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
              <div className="relative mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 351 }}
                    animate={{ strokeDashoffset: 351 - (351 * 0.92) }}
                    transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                    cx="64" cy="64" r="56" 
                    stroke="url(#gradient)" 
                    strokeWidth="12" 
                    fill="none" 
                    strokeDasharray="351" 
                    strokeLinecap="round" 
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">92</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Excellent</h3>
              <p className="text-sm text-gray-400">Top 5% of candidates</p>
            </div>

            {/* Right Column - Metrics */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              {/* Keywords Match */}
              <div className="glass-premium rounded-3xl p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Sparkles size={18} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">24 Found</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Keywords</h4>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ delay: 1.8, duration: 1 }} className="h-full bg-blue-500" />
                  </div>
                </div>
              </div>

              {/* Format Check */}
              <div className="glass-premium rounded-3xl p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-green-400" />
                  </div>
                  <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">Perfect</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">ATS Format</h4>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 2, duration: 1 }} className="h-full bg-green-500" />
                  </div>
                </div>
              </div>

              {/* Readability */}
              <div className="glass-premium rounded-3xl p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <BarChart3 size={18} className="text-blue-500" />
                  </div>
                  <span className="text-xs font-bold text-blue-500 bg-blue-600/10 px-2 py-1 rounded">Strong</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Readability</h4>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ delay: 2.2, duration: 1 }} className="h-full bg-blue-600" />
                  </div>
                </div>
              </div>

              {/* Missing Skills */}
              <div className="glass-premium rounded-3xl p-5 flex flex-col justify-between border-red-500/20">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <ShieldAlert size={18} className="text-red-400" />
                  </div>
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">3 Missing</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Critical Skills</h4>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-red-500/10 text-red-300">Docker</span>
                    <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-red-500/10 text-red-300">GraphQL</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
