import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function UploadSection({ file, setFile }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        toast.error('File exceeds 10MB limit.');
      } else if (error.code === 'file-invalid-type') {
        toast.error('Only PDF and DOCX files are accepted.');
      } else {
        toast.error('Invalid file format or size.');
      }
      return;
    }
    
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const fileSize = file ? (file.size / (1024 * 1024)).toFixed(2) : 0;

  return (
    <div className="w-full" id="upload-section">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Upload Resume
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Supported formats: PDF, DOCX (Max 10MB)
        </p>
      </div>
      
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`relative overflow-hidden border-2 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-[#60A5FA] bg-[rgba(96,165,250,0.06)]' 
              : 'border-[var(--border-color)] hover:border-[rgba(96,165,250,0.4)] hover:bg-[rgba(96,165,250,0.03)]'
          }`}
        >
          {isDragActive && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.08), transparent)' }} />
          )}
          <input {...getInputProps()} />
          <motion.div 
            animate={{ y: isDragActive ? -10 : 0, scale: isDragActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${
              isDragActive 
                ? 'text-white' 
                : ''
            }`}
            style={{
              background: isDragActive 
                ? 'linear-gradient(135deg, #60A5FA, #2563EB)' 
                : 'rgba(96,165,250,0.08)',
              color: isDragActive ? 'white' : 'var(--text-muted)',
              boxShadow: isDragActive ? '0 8px 24px rgba(59,130,246,0.3)' : 'none',
            }}
          >
            <UploadCloud size={32} />
          </motion.div>
          <p className="text-lg text-center font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            {isDragActive ? "Drop your resume here..." : "Drag & drop your resume"}
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            or click to browse files
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <CheckCircle2 size={16} style={{ color: '#10B981' }} /> PDF
            </span>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <CheckCircle2 size={16} style={{ color: '#10B981' }} /> DOCX
            </span>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-premium p-5 rounded-2xl flex items-center justify-between"
          style={{
            border: '1px solid rgba(96,165,250,0.25)',
            boxShadow: '0 0 30px rgba(59,130,246,0.10)',
          }}
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="p-3.5 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(37,99,235,0.10))',
              color: '#60A5FA',
              border: '1px solid rgba(96,165,250,0.15)',
            }}>
              <FileText size={28} />
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold truncate max-w-[200px] sm:max-w-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                {file.name}
              </p>
              <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--bg-hover)' }}>{fileSize} MB</span>
                <span>Ready for analysis</span>
              </div>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setFile(null); }}
            className="p-2.5 rounded-xl transition-colors border border-transparent"
            style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'transparent'; }}
            aria-label="Remove file"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
