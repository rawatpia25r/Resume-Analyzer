import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResumeBuilderPreview() {
  return (
    <section id="resume-builder" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
                <LayoutTemplate size={14} style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>Smart Builder</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                Build a Resume that <span className="gradient-text">Actually Converts</span>
              </h2>
              <p className="text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                Stop fighting with Word margins. Our intelligent builder automatically formats your content into recruiter-approved, ATS-friendly designs that stand out for the right reasons.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Pixel-perfect A4 & US Letter sizing',
                'One-click ATS-compliant DOCX and PDF export',
                'Real-time content validation',
                'Intelligent section ordering based on experience'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(96,165,250,0.15)', color: 'var(--color-primary)' }}>
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link to="/register" className="btn-primary px-8 py-3.5 text-sm flex items-center gap-2 w-fit">
                Try the Builder <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative perspective-1000 max-w-[420px] mx-auto lg:ml-auto"
          >
            {/* Decorative frame */}
            <div className="glass-premium p-4 md:p-5 rounded-[2rem] shadow-2xl relative z-10" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              
              {/* Mockup Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>ResumeBuilder.app</div>
              </div>

              {/* Mockup Content - UI Editor representation */}
              <div className="bg-[#1E1B4B] p-3 rounded-xl overflow-hidden flex gap-4 h-[400px]">
                {/* Left Sidebar Tools */}
                <div className="w-12 border-r border-blue-600/20 flex flex-col gap-3 py-2 items-center">
                  <div className="w-6 h-6 rounded bg-blue-600/30 mb-2" />
                  <div className="w-6 h-6 rounded bg-blue-600/10" />
                  <div className="w-6 h-6 rounded bg-blue-600/10" />
                  <div className="w-6 h-6 rounded bg-blue-600/10" />
                </div>
                
                {/* Center A4 Canvas Area */}
                <div className="flex-1 bg-indigo-950/40 rounded-lg p-4 overflow-hidden relative flex justify-center items-center">
                  <div className="bg-white w-[90%] aspect-[1/1.414] shadow-md p-4 sm:p-6 flex flex-col relative rounded-sm text-[6px] sm:text-[8px] text-gray-800">
                    {/* Header */}
                    <div className="text-center border-b pb-3 mb-3 border-gray-200">
                      <div className="font-bold text-[10px] text-gray-900 mb-1">Alex Johnson</div>
                      <div className="text-gray-500">alex@example.com • New York, NY</div>
                    </div>
                    
                    {/* Experience section */}
                    <div className="font-bold text-blue-700 mb-2 uppercase tracking-wider">Experience</div>
                    <div className="space-y-3 flex-1">
                      {[1, 2].map((i) => (
                        <div key={i}>
                          <div className="flex justify-between font-bold text-gray-800 mb-1">
                            <div>Senior Software Engineer</div>
                            <div className="text-gray-500">2023 - Present</div>
                          </div>
                          <div className="text-gray-600 mb-1">Tech Innovations Inc.</div>
                          <div className="space-y-1 ml-3 list-disc text-gray-600">
                            <div className="h-1.5 w-full bg-gray-200 rounded" />
                            <div className="h-1.5 w-[90%] bg-gray-200 rounded" />
                            <div className="h-1.5 w-[95%] bg-indigo-100 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 glass-premium p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.15)', color: 'var(--color-primary)' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Perfect Layout</p>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>ATS-Friendly format applied</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
