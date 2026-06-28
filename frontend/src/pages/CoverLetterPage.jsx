import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Mail, Sparkles, Download, Briefcase, Building2 } from 'lucide-react';
import api, { generateCoverLetter, downloadPDF } from '../services/api';
import { toast } from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CoverLetterPDF from '../components/pdf/CoverLetterPDF';

export default function CoverLetterPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/resume/user');
        setResumes(data);
      } catch { toast.error('Failed to load resumes'); }
      finally { setLoading(false); }
    };
    fetch();
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
      toast.success('Cover letter generated!');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3" style={{ color: 'var(--text-muted)' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--color-primary)' }} />
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 max-w-3xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}>
            <Mail size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              AI Cover Letter Builder
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Generate tailored cover letters from your resume in seconds
            </p>
          </div>
        </div>
      </motion.div>

      {resumes.length === 0 ? (
        <div className="theme-card p-12 text-center">
          <FileText size={40} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--text-muted)' }} />
          <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>No resumes found</h3>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            Analyze a resume first to use the Cover Letter Builder.
          </p>
          <a href="/" className="btn-primary px-6 py-2.5 text-sm inline-flex">Analyze a Resume</a>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="theme-card p-6 space-y-5"
          >
            {/* Resume selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: 'var(--text-secondary)' }}>
                1. Select Base Resume
              </label>
              <select
                className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--text-secondary)' }}>
                  Company Name
                </label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Google"
                    className="input-premium pl-9"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--text-secondary)' }}>
                  Role / Position
                </label>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="input-premium pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: 'var(--text-secondary)' }}>
                2. Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={5}
                className="input-premium resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || !selectedResume || !jobDescription.trim()}
              className="w-full btn-primary py-3 text-sm flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <><Loader2 size={16} className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={16} /> Generate Cover Letter</>
              )}
            </button>
          </motion.div>

          {/* Result */}
          {coverLetter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="theme-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
                  ✨ Your Cover Letter
                </h3>
                <PDFDownloadLink
                  document={<CoverLetterPDF coverLetter={coverLetter} companyName={companyName} roleName={roleName} />}
                  fileName={`cover-letter-${companyName || 'job'}.pdf`}
                >
                  {({ loading: pdfLoading }) => (
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                      style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <Download size={13} />
                      {pdfLoading ? 'Preparing...' : 'Download PDF'}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
              <div
                className="rounded-xl p-5 whitespace-pre-wrap text-sm leading-relaxed"
                style={{
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'Inter, sans-serif',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                {coverLetter}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
