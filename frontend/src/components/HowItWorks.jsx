import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Your Resume',
    description: 'Upload your resume in PDF or DOCX format. Our system supports all standard resume formats.',
    color: '#3B82F6',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Analyzes Your Resume',
    description: 'Our AI engine scans your resume against ATS criteria, keyword density, formatting, and more.',
    color: '#8B5CF6',
  },
  {
    step: '03',
    icon: BarChart3,
    title: 'Get Actionable Insights',
    description: 'Receive a detailed score breakdown with specific recommendations to improve your ATS ranking.',
    color: '#10B981',
  },
];

export default function HowItWorks() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30 bg-blue-500/10 text-blue-300 mb-4">
          Simple Process
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
          How It Works
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Get your resume optimized in three simple steps. No signup required to try.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30" />
        
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="glass-premium p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: step.color }} />
            
            <div className="text-5xl font-black mb-6 font-heading" style={{ color: `${step.color}30` }}>
              {step.step}
            </div>
            
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${step.color}20`, color: step.color }}
            >
              <step.icon size={22} />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-3 font-heading">{step.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
