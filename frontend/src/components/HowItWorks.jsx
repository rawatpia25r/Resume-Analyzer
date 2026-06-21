import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, BarChart3, Lightbulb, Wand2 } from 'lucide-react';

const steps = [
  { icon: Upload, title: 'Upload Resume', desc: 'Drag & drop your PDF or DOCX resume file.', num: '01' },
  { icon: Brain, title: 'AI Extracts Skills', desc: 'Our AI reads and understands your entire resume.', num: '02' },
  { icon: BarChart3, title: 'ATS Match Analysis', desc: 'Get scored against real applicant tracking systems.', num: '03' },
  { icon: Lightbulb, title: 'Improvement Suggestions', desc: 'Receive actionable tips to boost your score.', num: '04' },
  { icon: Wand2, title: 'Generate Tailored Resume', desc: 'Create job-specific resumes and cover letters.', num: '05' },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          From upload to optimized resume in five simple steps.
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical connector line */}
        <div className="absolute left-6 md:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-purple-500/40 via-cyan-500/40 to-purple-500/40 hidden sm:block" />

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex items-start gap-5 md:gap-6 relative"
            >
              {/* Step number circle */}
              <div className="relative z-10 shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-white/10 flex items-center justify-center">
                <step.icon className="text-purple-400" size={20} />
              </div>

              {/* Content */}
              <div className="glass-premium rounded-2xl p-5 md:p-6 flex-1 group hover:border-purple-500/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-purple-400/60">STEP {step.num}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-white/45 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
