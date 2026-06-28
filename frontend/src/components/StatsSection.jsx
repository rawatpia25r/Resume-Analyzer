import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Shield, Clock } from 'lucide-react';

const stats = [
  { value: '50K+', label: 'Resumes Analyzed', icon: BarChart3, color: '#3B82F6' },
  { value: '94%', label: 'Success Rate', icon: TrendingUp, color: '#10B981' },
  { value: '99.9%', label: 'ATS Compatible', icon: Shield, color: '#8B5CF6' },
  { value: '<30s', label: 'Analysis Time', icon: Clock, color: '#F59E0B' },
];

export default function StatsSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
          Trusted by Professionals Worldwide
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Thousands of job seekers have improved their ATS scores and landed interviews using our platform.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-premium p-6 text-center rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
          >
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20"
              style={{ background: stat.color }}
            />
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: `${stat.color}20`, color: stat.color }}
            >
              <stat.icon size={20} />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1 font-heading">{stat.value}</div>
            <div className="text-xs text-white/50 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
