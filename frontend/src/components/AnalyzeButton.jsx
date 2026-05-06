import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

export default function AnalyzeButton({ isAnalyzing, onClick, disabled }) {
  return (
    <div className="flex justify-center mt-4">
      <motion.button
        whileHover={!disabled && !isAnalyzing ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isAnalyzing ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled || isAnalyzing}
        className={`relative overflow-hidden group w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-2 py-4 px-8 rounded-full text-lg font-semibold transition-all ${
          disabled 
            ? 'bg-white/5 text-white/30 cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
        }`}
      >
        {!disabled && !isAnalyzing && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        )}
        
        {isAnalyzing ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            <span>Analyzing Resume...</span>
          </>
        ) : (
          <>
            <Zap size={24} className={disabled ? 'text-white/30' : 'text-yellow-400 group-hover:scale-110 transition-transform'} />
            <span>Analyze Resume</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
