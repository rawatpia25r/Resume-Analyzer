import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JobDescriptionInput({ jobDescription, setJobDescription }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      <div 
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Briefcase size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
            Target Job Description
          </h2>
          <span className="ml-2 bg-white/10 text-xs px-2 py-1 rounded text-text/70 uppercase font-medium">Optional</span>
        </div>
        <button className="p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="relative">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job requirements or description here to get a tailored ATS score and matching analysis..."
                className="w-full min-h-[150px] bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-y transition-all"
              />
              <div className="absolute bottom-4 right-4 text-xs text-text/40">
                {jobDescription.length} chars
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
