import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, FileCheck, Target, Zap } from 'lucide-react';
import ResumeWatermark from './ResumeWatermark';

export default function AnalysisSuccess({ show, score = 0, onViewReport, onDismiss }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (show) {
      // Animate score from 0 to target
      let start = 0;
      const duration = 1500;
      const increment = score / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    } else {
      setAnimatedScore(0);
    }
  }, [show, score]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(7, 6, 14, 0.95)', backdropFilter: 'blur(16px)' }}
        >
          {/* Ensure watermark is visible behind the modal */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
            <ResumeWatermark opacity={0.06} />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, type: 'spring', bounce: 0.2 }}
            className="relative z-10 w-full max-w-2xl rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
            }}
          >
            {/* Inner Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] rounded-full blur-[100px] opacity-20 pointer-events-none"
                 style={{ background: 'linear-gradient(90deg, #60A5FA, #2563EB)' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              
              {/* Left Column: Progress Circle */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                  {/* Background Track */}
                  <svg className="w-full h-full transform -rotate-90 absolute inset-0">
                    <circle
                      cx="96" cy="96" r={radius}
                      stroke="rgba(96, 165, 250, 0.1)"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    {/* Progress Fill */}
                    <motion.circle
                      cx="96" cy="96" r={radius}
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="transparent"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: circumference,
                        strokeDashoffset,
                        transition: 'stroke-dashoffset 0.1s ease-out'
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Score Text */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: 'spring' }}
                      className="text-5xl font-extrabold font-heading"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {animatedScore}
                    </motion.div>
                    <div className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
                      ATS Score
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-bold">Analysis Complete</span>
                </div>
              </div>

              {/* Right Column: Details & Actions */}
              <div className="space-y-8 text-center md:text-left">
                <div>
                  <h2 className="text-3xl font-extrabold font-heading mb-3" style={{ color: 'var(--text-primary)' }}>
                    Your Report is Ready
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    We've thoroughly analyzed your resume against top industry ATS algorithms and recruiter standards.
                  </p>
                </div>

                {/* Checklist */}
                <div className="space-y-4">
                  {[
                    { icon: Target, text: 'Keyword gap analysis finalized' },
                    { icon: FileCheck, text: 'Formatting & structural review complete' },
                    { icon: Zap, text: 'Actionable optimization plan generated' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex items-center gap-3 text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA' }}>
                        <item.icon size={16} />
                      </div>
                      {item.text}
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row items-center gap-3 pt-2"
                >
                  <button
                    onClick={onViewReport}
                    className="w-full sm:w-auto btn-primary px-8 py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    View Detailed Report <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={onDismiss}
                    className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold rounded-xl transition-colors"
                    style={{ color: 'var(--text-muted)', border: '1px solid var(--border-color)', background: 'transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    Dismiss
                  </button>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
