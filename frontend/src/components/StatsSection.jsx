import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, TrendingUp, Wand2 } from 'lucide-react';

const stats = [
  { value: '25K+', label: 'Resumes Analyzed', icon: FileText, color: 'text-purple-400' },
  { value: '95%', label: 'ATS Match Accuracy', icon: Target, color: 'text-cyan-400' },
  { value: '10K+', label: 'Cover Letters Generated', icon: TrendingUp, color: 'text-emerald-400' },
  { value: 'AI-Powered', label: 'Resume Builder', icon: Wand2, color: 'text-pink-400' },
];

export default function StatsSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-premium rounded-2xl p-6 text-center group cursor-default"
          >
            <stat.icon className={`${stat.color} mx-auto mb-3 opacity-70 group-hover:opacity-100 transition-opacity`} size={24} />
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-white/50">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
