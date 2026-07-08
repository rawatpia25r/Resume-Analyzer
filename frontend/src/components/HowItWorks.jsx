import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Upload, Cpu, ActivitySquare, Download, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Resume',
    description: 'Upload your current resume in PDF or DOCX format. Our advanced parser instantly extracts your professional history.',
    color: '#60A5FA',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our proprietary models evaluate your content, structure, and keywords against real-world recruiter expectations.',
    color: '#3B82F6',
  },
  {
    step: '03',
    icon: ActivitySquare,
    title: 'ATS Score Generation',
    description: 'Receive an instant ATS compatibility score alongside a detailed breakdown of formatting errors and missing critical skills.',
    color: '#2563EB',
  },
  {
    step: '04',
    icon: Download,
    title: 'Download Report',
    description: 'Export your highly-actionable intelligence report and use our targeted suggestions to secure more interviews.',
    color: '#10B981',
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate line height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative overflow-hidden z-10" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24 max-w-4xl mx-auto px-4"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          style={{
            border: '1px solid rgba(96,165,250,0.3)',
            background: 'rgba(96,165,250,0.08)',
            color: '#C4B5FD',
          }}
        >
          <CheckCircle2 size={14} />
          Frictionless Onboarding
        </div>
        <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          How it <span className="gradient-text">Works</span>
        </h2>
        <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          From upload to actionable insights in four straightforward steps.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* Background Line */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-white/5 rounded-full hidden sm:block" />
        
        {/* Animated Fill Line */}
        <motion.div 
          className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full hidden sm:block"
          style={{ 
            height: lineHeight,
            background: 'linear-gradient(180deg, #60A5FA, #3B82F6, #2563EB, #10B981)',
            boxShadow: '0 0 15px rgba(96,165,250,0.5)'
          }}
        />

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div className={`w-full sm:flex-1 md:w-[calc(50%-60px)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div className="theme-card p-8 group hover:-translate-y-2 relative overflow-hidden transition-all duration-500">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at ${isLeft ? 'top right' : 'top left'}, ${step.color}15, transparent 70%)` }}
                    />
                    
                    <div className={`flex items-center gap-4 mb-6 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg shrink-0"
                        style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`, color: step.color, border: `1px solid ${step.color}30` }}
                      >
                        <step.icon size={26} />
                      </div>
                      <div
                        className="text-5xl font-black font-heading opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                        style={{
                          WebkitTextStroke: `1px ${step.color}`,
                          color: 'transparent'
                        }}
                      >
                        {step.step}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 font-heading tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot (desktop) */}
                <div className="hidden sm:flex absolute left-0 md:left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                    className="w-5 h-5 rounded-full border-[3px]"
                    style={{
                      background: 'var(--bg-primary)',
                      borderColor: step.color,
                      boxShadow: `0 0 20px ${step.color}80`,
                    }}
                  />
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block flex-1 md:w-[calc(50%-60px)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
