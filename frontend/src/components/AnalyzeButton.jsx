import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

export default function AnalyzeButton({ isAnalyzing, onClick, disabled }) {
  return (
    <div className="flex justify-center mt-8">
      <motion.button
        whileHover={!disabled && !isAnalyzing ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isAnalyzing ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled || isAnalyzing}
        className={`relative overflow-hidden group w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-lg font-bold transition-all duration-300 ${
          disabled 
            ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_8px_32px_rgba(124,58,237,0.4)] hover:shadow-[0_8px_40px_rgba(124,58,237,0.6)]'
        }`}
      >
        {!disabled && !isAnalyzing && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        )}
        
        {isAnalyzing ? (
          <>
            <Loader2 className="animate-spin text-white/80" size={24} />
            <span className="tracking-wide">Analyzing Resume...</span>
          </>
        ) : (
          <>
            <Zap size={24} className={disabled ? 'text-white/30' : 'text-amber-300 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300'} />
            <span className="tracking-wide">Analyze Resume</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
