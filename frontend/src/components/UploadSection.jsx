import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-white">Upload Resume</h2>
      
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-white/20 hover:border-primary/50 hover:bg-white/5'
          }`}
        >
          <input {...getInputProps()} />
          <motion.div 
            animate={{ y: isDragActive ? -10 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <UploadCloud size={48} className={`mb-4 ${isDragActive ? 'text-primary' : 'text-text/50'}`} />
          </motion.div>
          <p className="text-lg text-center font-medium mb-1">
            {isDragActive ? "Drop the resume here..." : "Drag & drop your resume"}
          </p>
          <p className="text-text/50 text-sm text-center">
            Or click to browse files (PDF, DOCX up to 10MB)
          </p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 border border-primary/30 p-4 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="bg-primary/20 p-3 rounded-lg text-primary">
              <FileText size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-white truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
              <p className="text-sm text-text/60">{fileSize} MB • document</p>
            </div>
          </div>
          <button 
            onClick={() => setFile(null)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-text/70 hover:text-danger"
            aria-label="Remove file"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
