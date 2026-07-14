import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Check } from 'lucide-react';

/**
 * A premium custom dropdown to replace native <select> for resume selection.
 * Supports dark/light themes via CSS variables and matches the input-premium style.
 */
export default function ResumeSelect({ resumes = [], selectedResume, onSelect, placeholder = 'Choose a resume...' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSelect = (resume) => {
    onSelect(resume);
    setIsOpen(false);
  };

  const getDisplayLabel = (r) => {
    const level = r.analysisData?.experienceLevel || 'Resume';
    const score = r.atsScore;
    const date = new Date(r.createdAt).toLocaleDateString();
    return { level, score, date };
  };

  const selectedLabel = selectedResume ? getDisplayLabel(selectedResume) : null;

  return (
    <div ref={containerRef} className="relative" style={{ zIndex: isOpen ? 50 : 1 }}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all cursor-pointer"
        style={{
          background: 'var(--bg-input)',
          border: `1px solid ${isOpen ? 'var(--color-primary)' : 'var(--border-color)'}`,
          color: selectedResume ? 'var(--text-primary)' : 'var(--text-muted)',
          boxShadow: isOpen ? '0 0 0 3px rgba(59, 130, 246, 0.15)' : 'none',
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        }}
      >
        {/* Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: selectedResume ? 'rgba(96, 165, 250, 0.12)' : 'rgba(110, 106, 133, 0.1)',
            color: selectedResume ? '#60A5FA' : 'var(--text-muted)',
          }}
        >
          <FileText size={14} />
        </div>

        {/* Label */}
        <div className="flex-1 text-left min-w-0">
          {selectedLabel ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {selectedLabel.level}
              </span>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: 'rgba(59, 130, 246, 0.12)',
                  color: '#60A5FA',
                }}
              >
                ATS {selectedLabel.score}
              </span>
              <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>
                {selectedLabel.date}
              </span>
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 mt-1 rounded-xl overflow-hidden"
            style={{
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 16px 48px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.08)',
              backdropFilter: 'blur(20px)',
              maxHeight: '240px',
              overflowY: 'auto',
            }}
          >
            {resumes.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                No resumes available
              </div>
            ) : (
              resumes.map((r) => {
                const { level, score, date } = getDisplayLabel(r);
                const isSelected = selectedResume?._id === r._id;
                return (
                  <button
                    key={r._id}
                    type="button"
                    onClick={() => handleSelect(r)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all cursor-pointer"
                    style={{
                      background: isSelected ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                      borderBottom: '1px solid var(--border-color)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'var(--bg-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isSelected ? 'rgba(59, 130, 246, 0.08)' : 'transparent';
                    }}
                  >
                    {/* Resume icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: isSelected ? 'rgba(96, 165, 250, 0.15)' : 'rgba(110, 106, 133, 0.08)',
                        color: isSelected ? '#60A5FA' : 'var(--text-muted)',
                      }}
                    >
                      <FileText size={14} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-semibold truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {level}
                        </span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                          style={{
                            background: score >= 80 ? 'rgba(16, 185, 129, 0.12)' : score >= 60 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                            color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444',
                          }}
                        >
                          ATS {score}
                        </span>
                      </div>
                      <span className="text-[11px] block mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Analyzed on {date}
                      </span>
                    </div>

                    {/* Check mark */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="shrink-0"
                        style={{ color: '#60A5FA' }}
                      >
                        <Check size={16} strokeWidth={3} />
                      </motion.div>
                    )}
                  </button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
