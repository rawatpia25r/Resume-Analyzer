import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Target, Search, FileCheck, Lightbulb, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI models evaluate every section of your resume against current ATS standards and recruiter expectations.',
    color: '#60A5FA',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    description: 'Ensure your resume passes automated screening systems with formatting, structure, and keyword compliance checks.',
    color: '#2563EB',
  },
  {
    icon: Search,
    title: 'Smart Keyword Detection',
    description: 'Identify missing and matched keywords from job descriptions. Maximize relevance and improve your match score.',
    color: '#3B82F6',
  },
  {
    icon: FileCheck,
    title: 'Grammar & Formatting Review',
    description: 'Detect formatting issues, inconsistent fonts, and structural problems that ATS systems flag as errors.',
    color: '#C4B5FD',
  },
  {
    icon: Lightbulb,
    title: 'Personalized Suggestions',
    description: 'Receive recruiter-grade recommendations tailored to your experience level, industry, and target role.',
    color: '#10B981',
  },
  {
    icon: BarChart3,
    title: 'Industry-Ready Reports',
    description: 'Get a detailed breakdown with section-by-section scores, strengths, and areas to improve — ready to act on.',
    color: '#F59E0B',
  },
];

export default function StatsSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{
            border: '1px solid rgba(96,165,250,0.3)',
            background: 'rgba(96,165,250,0.08)',
            color: '#C4B5FD',
          }}
        >
          <Target size={13} />
          Built for Results
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4" style={{ color: 'var(--text-primary)' }}>
          Why Choose Resume Intelligence?
        </h2>
        <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Everything you need to craft an ATS-optimized resume that gets past automated screening and lands on a recruiter's desk.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-premium p-7 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-default"
          >
            {/* Background glow */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity duration-500"
              style={{ background: feature.color }}
            />
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: `${feature.color}18`, color: feature.color }}
            >
              <feature.icon size={22} />
            </div>
            <h3 className="text-base font-bold mb-2 font-heading" style={{ color: 'var(--text-primary)' }}>
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
