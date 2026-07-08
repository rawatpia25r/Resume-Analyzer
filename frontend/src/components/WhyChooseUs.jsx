import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Target, Lock, BarChart3, Clock } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="glass-premium p-8 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent blur-2xl -translate-y-1/2 translate-x-1/4 transition-opacity group-hover:opacity-100 opacity-50" />
    <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(37,99,235,0.05))', color: 'var(--color-primary)', border: '1px solid rgba(96,165,250,0.2)' }}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-extrabold font-heading mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h3>
    <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
      {description}
    </p>
  </motion.div>
);

export default function WhyChooseUs() {
  const features = [
    {
      icon: Target,
      title: 'ATS-Optimized Templates',
      description: 'Our resumes are built from the ground up to parse perfectly in modern Applicant Tracking Systems like Workday, Greenhouse, and Lever.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'We don\'t just give you a score. Our AI reads your resume like a recruiter and suggests specific, actionable keywords to add based on your target role.'
    },
    {
      icon: ShieldCheck,
      title: 'Format Validation',
      description: 'Never worry about broken margins or misaligned dates. Our DOCX and PDF generators ensure pixel-perfect professional formatting every time.'
    },
    {
      icon: Clock,
      title: 'Save 10+ Hours',
      description: 'Stop manually tailoring your resume and cover letter for every application. Generate perfectly matched documents in literally seconds.'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Scoring',
      description: 'Our scoring algorithm is based on data from thousands of successful hires, ensuring your resume hits the exact metrics recruiters look for.'
    },
    {
      icon: Lock,
      title: 'Enterprise Privacy',
      description: 'Your career data is sensitive. We employ enterprise-grade encryption and strict data minimization policies. You own your data, always.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}
          >
            <ShieldCheck size={14} style={{ color: '#60A5FA' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>The Intelligent Choice</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black font-heading mb-6 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Why Professionals Choose <span className="gradient-text">Resume Intelligence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            Built for ambitious professionals who want to stop guessing and start interviewing. Our platform combines cutting-edge AI with recruiter-approved design principles.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
