import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, FileCheck, Brain, Shield, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI models analyze every aspect of your resume against current ATS standards and job requirements.',
    color: '#3B82F6',
  },
  {
    icon: Target,
    title: 'Keyword Optimization',
    description: 'Identify missing keywords and phrases that hiring managers and ATS systems look for in top candidates.',
    color: '#8B5CF6',
  },
  {
    icon: FileCheck,
    title: 'Format Validation',
    description: 'Ensure your resume formatting is ATS-compatible — no tables, graphics, or unsupported layouts.',
    color: '#10B981',
  },
  {
    icon: TrendingUp,
    title: 'Score Tracking',
    description: 'Track your ATS score improvements over time and see how your resume evolves with each iteration.',
    color: '#F59E0B',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get comprehensive analysis results in under 30 seconds — no waiting, no delays.',
    color: '#EC4899',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your resume data is encrypted and never shared. Full privacy compliance with GDPR standards.',
    color: '#14B8A6',
  },
];

export default function FeaturesSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-4">
          <Zap size={13} /> Everything You Need
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
          Powerful Features
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          All the tools you need to create an ATS-optimized resume that gets you more interviews.
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
            className="glass-premium p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity"
              style={{ background: feature.color }}
            />
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
              style={{ background: `${feature.color}20`, color: feature.color }}
            >
              <feature.icon size={20} />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-heading">{feature.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
