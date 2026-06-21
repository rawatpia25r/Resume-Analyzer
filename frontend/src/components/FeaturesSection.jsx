import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Search, AlertTriangle, Wand2, FileText, Briefcase, Download } from 'lucide-react';

const features = [
  { icon: BarChart3, title: 'ATS Score', desc: 'Get an instant score showing how well your resume passes applicant tracking systems.', color: 'from-purple-500/20 to-purple-600/10', iconColor: 'text-purple-400' },
  { icon: Search, title: 'Keyword Matching', desc: 'Identify matched and missing keywords against any job description.', color: 'from-cyan-500/20 to-cyan-600/10', iconColor: 'text-cyan-400' },
  { icon: AlertTriangle, title: 'Missing Skills', desc: 'Discover skill gaps and get actionable suggestions to fill them.', color: 'from-amber-500/20 to-amber-600/10', iconColor: 'text-amber-400' },
  { icon: Wand2, title: 'Resume Builder', desc: 'Generate tailored resumes optimized for specific job descriptions.', color: 'from-pink-500/20 to-pink-600/10', iconColor: 'text-pink-400' },
  { icon: FileText, title: 'Cover Letter Generator', desc: 'Create professional, job-specific cover letters with one click.', color: 'from-emerald-500/20 to-emerald-600/10', iconColor: 'text-emerald-400' },
  { icon: Briefcase, title: 'Role Recommendations', desc: 'Get AI-suggested roles that match your experience and skills.', color: 'from-blue-500/20 to-blue-600/10', iconColor: 'text-blue-400' },
  { icon: Download, title: 'PDF Export', desc: 'Download beautifully formatted resumes and cover letters as PDF.', color: 'from-violet-500/20 to-violet-600/10', iconColor: 'text-violet-400' },
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Everything You Need to <span className="gradient-text">Land the Job</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto">
          Powerful AI tools to analyze, optimize, and tailor your resume for any position.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {features.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-premium rounded-2xl p-6 group cursor-default"
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feat.icon className={feat.iconColor} size={20} />
            </div>
            <h3 className="text-white font-semibold mb-2">{feat.title}</h3>
            <p className="text-white/45 text-sm leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
