import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, Mail, Sparkles, Download, Briefcase, Building2, Copy, CheckCircle2, FileDown, Edit3, Save, Printer } from 'lucide-react';
import api, { generateCoverLetter } from '../services/api';
import { toast } from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CoverLetterPDF from '../components/pdf/CoverLetterPDF';
import ResumeWatermark from '../components/ResumeWatermark';
import { generateAndDownloadCoverLetterDocx } from '../utils/CoverLetterDocx';

export default function CoverLetterPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCoverLetter, setEditedCoverLetter] = useState('');

  const printRef = useRef();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await api.get('/resume/user');
        setResumes(data);
      } catch { toast.error('Failed to load resumes'); }
      finally { setLoading(false); }
    };
    fetchResumes();
  }, []);

  const handleGenerate = async () => {
    if (!selectedResume) { toast.error('Select a resume first'); return; }
    if (!jobDescription.trim()) { toast.error('Enter a job description'); return; }
    setGenerating(true);
    try {
      const data = await generateCoverLetter(
        selectedResume.resumeText,
        jobDescription,
        companyName,
        roleName
      );
      setCoverLetter(data.coverLetter);
      setEditedCoverLetter(data.coverLetter);
      toast.success('Cover letter generated successfully');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDocx = () => {
    generateAndDownloadCoverLetterDocx(coverLetter, companyName, roleName);
  };

  const handleSaveEdit = () => {
    setCoverLetter(editedCoverLetter);
    setIsEditing(false);
    toast.success('Cover letter updated');
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    windowPrint.document.write(`
      <html>
        <head>
          <title>Print Cover Letter</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1A1A2E; line-height: 1.6; }
            pre { font-family: inherit; white-space: pre-wrap; font-size: 11pt; margin: 0; }
          </style>
        </head>
        <body>
          <pre>${coverLetter}</pre>
        </body>
      </html>
    `);
    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 250);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3" style={{ color: 'var(--text-muted)' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--color-primary)' }} />
          <p className="text-sm font-medium">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-10">
      {/* Background watermark */}
      <ResumeWatermark opacity={0.025} />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #60A5FA, #2563EB)', color: 'white' }}>
            <Mail size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold font-heading" style={{ color: 'var(--text-primary)' }}>
              AI Cover Letter Writer
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Generate tailored, professional cover letters from your resume in seconds
            </p>
          </div>
        </div>
      </motion.div>

      {resumes.length === 0 ? (
        <div className="theme-card p-12 text-center max-w-lg mx-auto relative z-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(96,165,250,0.1)', color: 'var(--text-muted)' }}>
            <FileText size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>No Resumes Found</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Analyze a resume first — your analysis will be used as the foundation for cover letter generation.
          </p>
          <a href="/" className="btn-primary px-6 py-2.5 text-sm inline-flex shadow-lg hover:shadow-xl transition-all">Analyze a Resume</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Left — Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 xl:col-span-4 space-y-5"
          >
            <div className="theme-card p-6 space-y-5">
              {/* Resume selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Select Base Resume
                </label>
                <select
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
                  style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  onChange={e => setSelectedResume(resumes.find(r => r._id === e.target.value))}
                  defaultValue=""
                >
                  <option value="" disabled style={{ background: 'var(--bg-card-solid)' }}>Choose a resume...</option>
                  {resumes.map(r => (
                    <option key={r._id} value={r._id} style={{ background: 'var(--bg-card-solid)' }}>
                      {r.analysisData?.experienceLevel || 'Resume'} — ATS {r.atsScore} · {new Date(r.createdAt).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company & Role */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. Google" className="input-premium pl-9" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Target Role
                  </label>
                  <div className="relative">
                    <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input type="text" value={roleName} onChange={e => setRoleName(e.target.value)} placeholder="e.g. Frontend Engineer" className="input-premium pl-9" />
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description here for a tailored cover letter..."
                  rows={6}
                  className="input-premium resize-none"
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGenerate}
                disabled={generating || !selectedResume || !jobDescription.trim()}
                className="w-full btn-primary py-3.5 text-sm flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                {generating ? (
                  <><Loader2 size={16} className="animate-spin" /><span>Generating your cover letter...</span></>
                ) : (
                  <><Sparkles size={16} /><span>Generate Cover Letter</span></>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right — Result Panel */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 xl:col-span-8"
          >
            <AnimatePresence mode="wait">
              {generating ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="theme-card p-6 space-y-4 h-[800px]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg skeleton" />
                    <div className="h-4 w-40 skeleton" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-32 skeleton" />
                    <div className="h-3 w-48 skeleton" />
                    <div className="h-3 w-40 skeleton" />
                    <div className="h-4 w-0 skeleton my-8" />
                    <div className="h-3 w-full skeleton" />
                    <div className="h-3 w-[95%] skeleton" />
                    <div className="h-3 w-[80%] skeleton" />
                    <div className="h-4 w-0 skeleton my-4" />
                    <div className="h-3 w-[88%] skeleton" />
                    <div className="h-3 w-[92%] skeleton" />
                    <div className="h-3 w-[75%] skeleton" />
                  </div>
                </motion.div>
              ) : coverLetter ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="theme-card overflow-hidden flex flex-col h-[800px]"
                >
                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between p-4 border-b gap-3" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-2">
                      {!isEditing ? (
                        <button onClick={() => setIsEditing(true)}
                          className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                          style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)' }}>
                          <Edit3 size={14} /> Edit
                        </button>
                      ) : (
                        <button onClick={handleSaveEdit}
                          className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md"
                          style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white' }}>
                          <Save size={14} /> Save
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={handlePrint}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
                        style={{ color: 'var(--text-muted)' }}>
                        <Printer size={14} /> Print
                      </button>

                      <button onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                        style={{ background: copied ? 'rgba(16,185,129,0.1)' : 'transparent', color: copied ? '#10B981' : 'var(--text-muted)' }}>
                        {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>

                      <button onClick={handleDownloadDocx}
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                        style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.2)' }}>
                        <FileDown size={14} /> DOCX
                      </button>

                      <PDFDownloadLink
                        document={<CoverLetterPDF coverLetter={coverLetter} companyName={companyName} roleName={roleName} />}
                        fileName={`cover-letter-${companyName || 'job'}.pdf`}
                      >
                        {({ loading: pdfLoading }) => (
                          <button
                            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                            style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.2)' }}
                          >
                            <Download size={14} />
                            {pdfLoading ? '...' : 'PDF'}
                          </button>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </div>

                  {/* Document Preview Area */}
                  <div className="flex-1 overflow-y-auto bg-[#E5E7EB] p-6 sm:p-10 scrollbar-hide flex justify-center">
                    {/* A4 Paper */}
                    <div 
                      ref={printRef}
                      className="bg-white shadow-2xl max-w-[800px] w-full relative transition-all"
                      style={{ 
                        padding: '48px 56px', 
                        fontFamily: "Arial, sans-serif",
                        color: '#1a1a2e',
                        minHeight: '1100px',
                        outline: isEditing ? '3px solid #60A5FA' : 'none'
                      }}
                    >
                      {/* Watermark Logo Placeholder inside document */}
                      <div className="absolute top-12 right-12 opacity-5 pointer-events-none">
                        <Mail size={120} />
                      </div>

                      {isEditing ? (
                        <textarea
                          value={editedCoverLetter}
                          onChange={(e) => setEditedCoverLetter(e.target.value)}
                          className="w-full h-full min-h-[900px] bg-transparent resize-none outline-none text-[11pt] leading-relaxed font-sans"
                          style={{ color: '#1a1a2e' }}
                        />
                      ) : (
                        <pre 
                          className="whitespace-pre-wrap text-[11pt] leading-relaxed font-sans bg-transparent"
                          style={{ color: '#1a1a2e', fontFamily: 'Arial, sans-serif', margin: 0 }}
                        >
                          {coverLetter}
                        </pre>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="theme-card p-12 text-center flex flex-col items-center justify-center h-[800px]"
                >
                  <div className="w-20 h-20 rounded-[28%] flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.1), rgba(37,99,235,0.05))', color: '#60A5FA' }}>
                    <Mail size={32} />
                  </div>
                  <h3 className="font-extrabold text-xl mb-3 font-heading" style={{ color: 'var(--text-primary)' }}>
                    Draft the Perfect Letter
                  </h3>
                  <p className="text-sm max-w-sm text-center leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Select a source resume and specify the target company. Our AI will craft a highly personalized cover letter that highlights your most relevant experience.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}
