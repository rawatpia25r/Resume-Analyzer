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
        <h2 className="text-xl font-semibold text-white mb-1">Upload Resume</h2>
        <p className="text-sm text-white/50">Supported formats: PDF, DOCX (Max 10MB)</p>
      </div>
      
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`relative overflow-hidden border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-purple-500 bg-purple-500/10' 
              : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'
          }`}
        >
          {isDragActive && (
            <div className="absolute inset-0 bg-purple-500/5 blur-3xl pointer-events-none" />
          )}
          <input {...getInputProps()} />
          <motion.div 
            animate={{ y: isDragActive ? -10 : 0, scale: isDragActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${
              isDragActive ? 'bg-purple-500 text-white shadow-purple-500/25' : 'bg-white/5 text-white/50'
            }`}
          >
            <UploadCloud size={32} />
          </motion.div>
          <p className="text-lg text-center font-medium text-white mb-2">
            {isDragActive ? "Drop the resume here..." : "Drag & drop your resume"}
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-1.5 text-white/40"><CheckCircle2 size={16} className="text-emerald-500" /> PDF</span>
            <span className="flex items-center gap-1.5 text-white/40"><CheckCircle2 size={16} className="text-emerald-500" /> DOCX</span>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-premium border border-purple-500/30 p-5 rounded-2xl flex items-center justify-between shadow-[0_0_30px_rgba(124,58,237,0.15)]"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-3.5 rounded-xl text-purple-400 border border-purple-500/20">
              <FileText size={28} />
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-white truncate max-w-[200px] sm:max-w-sm mb-1">{file.name}</p>
              <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                <span className="bg-white/10 px-2 py-0.5 rounded-md">{fileSize} MB</span>
                <span>Ready for analysis</span>
              </div>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setFile(null); }}
            className="p-2.5 bg-white/5 hover:bg-red-500/20 rounded-xl transition-colors text-white/50 hover:text-red-400 border border-transparent hover:border-red-500/30"
            aria-label="Remove file"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
