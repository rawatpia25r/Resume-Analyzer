import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, FileCheck, Sparkles, Shield, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI models evaluate every section of your resume against current ATS standards and recruiter expectations.',
    color: '#60A5FA',
  },
  {
    icon: Target,
    title: 'Keyword Optimization',
    description: 'Identify missing keywords and phrases that hiring managers and ATS systems look for in top candidates.',
    color: '#3B82F6',
  },
  {
    icon: FileCheck,
    title: 'Format Validation',
    description: 'Ensure your resume formatting is fully ATS-compatible — no tables, graphics, or unsupported layouts.',
    color: '#10B981',
  },
  {
    icon: TrendingUp,
    title: 'Score Tracking',
    description: 'Track your ATS score improvements over time and monitor how your resume evolves with each iteration.',
    color: '#F59E0B',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get comprehensive analysis results in seconds — no waiting, no delays, no manual review needed.',
    color: '#2563EB',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your resume data is processed securely and never shared with third parties. Your privacy is our priority.',
    color: '#C4B5FD',
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{
            border: '1px solid rgba(96,165,250,0.3)',
            background: 'rgba(96,165,250,0.08)',
            color: '#C4B5FD',
          }}
        >
          <Zap size={13} />
          Everything You Need
        </div>
        <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Powerful <span className="gradient-text">Features</span>
        </h2>
        <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          All the tools you need to create an ATS-optimized resume and accelerate your job search.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            className="theme-card p-6 md:p-8 group hover:-translate-y-2 relative overflow-hidden cursor-default"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at top right, ${feature.color}15, transparent 70%)` }}
            />
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-all duration-500"
              style={{ background: feature.color }}
            />
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}05)`, color: feature.color, border: `1px solid ${feature.color}30` }}
            >
              <feature.icon size={22} />
            </div>
            <h3 className="text-lg font-bold mb-3 font-heading tracking-tight" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
