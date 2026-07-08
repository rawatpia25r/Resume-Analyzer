import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoverLetterPreview() {
  return (
    <section id="cover-letter" className="py-32 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative perspective-1000 order-2 lg:order-1 max-w-[420px] mx-auto lg:mr-auto"
          >
            {/* Decorative frame */}
            <div className="glass-premium p-4 md:p-5 rounded-[2rem] shadow-2xl relative z-10" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              
              {/* Mockup Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <Mail size={12} /> AI Cover Letter Generator
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full flex items-center px-1" style={{ background: 'rgba(96,165,250,0.2)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
                  </div>
                </div>
              </div>

              {/* Mockup Content - UI Editor representation */}
              <div className="bg-[#1E1B4B] p-3 rounded-xl overflow-hidden flex gap-4 h-[400px]">
                {/* Left Sidebar Tools */}
                <div className="w-12 border-r border-blue-500/20 flex flex-col gap-3 py-2 items-center">
                  <div className="w-6 h-6 rounded bg-blue-500/30 mb-2" />
                  <div className="w-6 h-6 rounded bg-blue-500/10" />
                  <div className="w-6 h-6 rounded bg-blue-500/10" />
                </div>
                
                {/* Center A4 Canvas Area */}
                <div className="flex-1 bg-purple-950/40 rounded-lg p-4 overflow-hidden relative flex justify-center items-center">
                  <div className="bg-white w-[90%] aspect-[1/1.414] shadow-md p-4 sm:p-6 flex flex-col relative rounded-sm text-[6px] sm:text-[8px] leading-relaxed text-gray-800">
                    <div className="mb-4">
                      <div className="font-bold text-[10px] mb-0.5 text-gray-900">Jane Doe</div>
                      <div className="text-gray-500">San Francisco, CA • jane@example.com</div>
                    </div>
                    
                    <div className="mb-4 text-gray-500">October 15, 2026</div>
                    
                    <div className="mb-4">
                      <div className="font-bold text-gray-800">Hiring Manager</div>
                      <div className="text-gray-700">Stripe Inc.</div>
                    </div>
                    
                    <div className="mb-2 text-gray-800">Dear Hiring Manager,</div>
                    
                    <div className="space-y-2 flex-1 text-justify text-gray-600">
                      <div className="h-1.5 w-full bg-purple-100 rounded" />
                      <div className="h-1.5 w-full bg-gray-200 rounded" />
                      <div className="h-1.5 w-[90%] bg-gray-200 rounded" />
                      
                      <div className="h-1.5 w-full bg-gray-200 rounded mt-2" />
                      <div className="h-1.5 w-full bg-purple-100 rounded" />
                      <div className="h-1.5 w-[85%] bg-gray-200 rounded" />
                    </div>
                    
                    <div className="mt-4">
                      <div className="mb-2 text-gray-800">Sincerely,</div>
                      <div className="font-bold text-gray-900">Jane Doe</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -top-8 -right-8 glass-premium p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.15)', color: 'var(--color-primary)' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI Generated</p>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Tailored to Stripe Inc.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
                <Mail size={14} style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>Cover Letters</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                Draft the Perfect <span className="gradient-text">Cover Letter</span>
              </h2>
              <p className="text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                Writing cover letters is tedious. Our AI analyzes your resume and the target job description to generate a highly personalized, compelling narrative that recruiters actually want to read.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Context-aware generation based on your actual experience',
                'Perfectly matches the tone of the target company',
                'Inline editing for personal touches',
                'Exports directly to professional DOCX and PDF'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(96,165,250,0.15)', color: 'var(--color-primary)' }}>
                    <Edit3 size={14} />
                  </div>
                  <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link to="/register" className="btn-primary px-8 py-3.5 text-sm flex items-center gap-2 w-fit">
                Try the Writer <Sparkles size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
