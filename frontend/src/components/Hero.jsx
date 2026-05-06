import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="text-center py-6">
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Beat the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ATS System</span> 
        <br /> with AI Precision
      </motion.h1>
      <motion.p 
        className="text-text/70 text-lg md:text-xl max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Upload your resume and instantly see how you match up against top industry Applicant Tracking Systems. Perfect your profile and land that dream job.
      </motion.p>
    </div>
  );
}
