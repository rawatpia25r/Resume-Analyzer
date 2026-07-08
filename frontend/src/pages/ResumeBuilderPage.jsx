import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Loader2, FileText, Briefcase, Building2,
  Download, Copy, CheckCircle2, RefreshCw, Edit3, FileDown
} from 'lucide-react';
import api, { generateTailoredResume } from '../services/api';
import { toast } from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '../components/pdf/ResumePDF';
import ResumeWatermark from '../components/ResumeWatermark';
import EditResumeDrawer from '../components/EditResumeDrawer';
import { generateAndDownloadDocx } from '../utils/ResumeDocx';

export default function ResumeBuilderPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

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
    setResult(null);
    try {
      const data = await generateTailoredResume(
        selectedResume.resumeText,
        jobDescription,
        companyName,
        roleName
      );
      setResult(data);
      toast.success('Resume generated successfully');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const formatResumeText = () => {
    if (!result) return '';
    let text = '';
    text += `${result.name || ''}\n`;
    text += `${result.email || ''} | ${result.phone || ''} | ${result.location || ''}\n`;
    if (result.linkedin) text += `${result.linkedin}\n`;
    text += `\n--- SUMMARY ---\n${result.summary || ''}\n`;

    if (result.experience?.length) {
      text += `\n--- EXPERIENCE ---\n`;
      result.experience.forEach(exp => {
        text += `\n${exp.title} at ${exp.company} (${exp.duration})\n`;
        exp.bullets?.forEach(b => { text += `  • ${b}\n`; });
      });
    }

    if (result.education?.length) {
      text += `\n--- EDUCATION ---\n`;
      result.education.forEach(edu => {
        text += `${edu.degree} — ${edu.school} (${edu.year})\n`;
      });
    }

    if (result.skills) {
      text += `\n--- SKILLS ---\n`;
      if (result.skills.technical?.length) text += `Technical: ${result.skills.technical.join(', ')}\n`;
      if (result.skills.soft?.length) text += `Soft Skills: ${result.skills.soft.join(', ')}\n`;
    }

    if (result.projects?.length) {
      text += `\n--- PROJECTS ---\n`;
      result.projects.forEach(p => {
        text += `${p.name}: ${p.description} [${p.tech?.join(', ')}]\n`;
      });
    }

    if (result.certifications?.length) {
      text += `\n--- CERTIFICATIONS ---\n`;
      result.certifications.forEach(c => { text += `${c}\n`; });
    }

    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatResumeText());
    setCopied(true);
    toast.success('Resume text copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDocx = () => {
    const filename = `Resume_${companyName || 'Tailored'}.docx`;
    generateAndDownloadDocx(result, filename);
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
      <ResumeWatermark opacity={0.025} />

      {/* Edit Drawer */}
      <EditResumeDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        data={result}
        onSave={(updatedData) => {
          setResult(updatedData);
          toast.success('Resume updated successfully');
        }}
      />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(96,165,250,0.12)', color: '#60A5FA' }}>
            <Wand2 size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', 'Sora', sans-serif" }}>
              AI Resume Builder
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Generate an ATS-optimized resume tailored to any job description
            </p>
          </div>
        </div>
      </motion.div>

      {resumes.length === 0 ? (
        <div className="theme-card p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(96,165,250,0.1)', color: 'var(--text-muted)' }}>
            <FileText size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>No Resumes Found</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Analyze a resume first — the builder uses your existing resume as a foundation to create an optimized version.
          </p>
          <a href="/" className="btn-primary px-6 py-2.5 text-sm inline-flex">Analyze a Resume</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="theme-card p-6 space-y-5">
              {/* Resume selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Select Source Resume
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
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Target Company
                  </label>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
                      placeholder="e.g. Google" className="input-premium pl-9" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Target Role
                  </label>
                  <div className="relative">
                    <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input type="text" value={roleName} onChange={e => setRoleName(e.target.value)}
                      placeholder="e.g. Software Engineer" className="input-premium pl-9" />
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description here. The AI will optimize your resume to match these requirements..."
                  rows={8}
                  className="input-premium resize-none"
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGenerate}
                disabled={generating || !selectedResume || !jobDescription.trim()}
                className="w-full btn-primary py-3.5 text-sm flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <><Loader2 size={16} className="animate-spin" /> Generating optimized resume...</>
                ) : (
                  <><Wand2 size={16} /> Generate Tailored Resume</>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right — Result Panel */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {generating ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="theme-card p-6 space-y-5"
                >
                  <div className="h-6 w-48 skeleton" />
                  <div className="h-3 w-64 skeleton" />
                  <div className="h-px w-full" style={{ background: 'var(--border-color)' }} />
                  <div className="space-y-2">
                    <div className="h-4 w-24 skeleton" />
                    <div className="h-3 w-full skeleton" />
                    <div className="h-3 w-[85%] skeleton" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-28 skeleton" />
                    <div className="h-3 w-full skeleton" />
                    <div className="h-3 w-[90%] skeleton" />
                    <div className="h-3 w-[80%] skeleton" />
                  </div>
                </motion.div>
              ) : result ? (
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
                      <button onClick={() => setIsEditDrawerOpen(true)}
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)' }}>
                        <Edit3 size={14} /> Edit
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                        style={{
                          background: copied ? 'rgba(16,185,129,0.1)' : 'transparent',
                          color: copied ? '#10B981' : 'var(--text-muted)',
                        }}
                      >
                        {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy Text'}
                      </button>

                      <button onClick={handleDownloadDocx}
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                        style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.2)' }}>
                        <FileDown size={14} /> DOCX
                      </button>

                      <PDFDownloadLink
                        document={<ResumePDF data={result} />}
                        fileName={`resume-${companyName || 'tailored'}.pdf`}
                      >
                        {({ loading: pdfLoading }) => (
                          <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                            style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.2)' }}>
                            <Download size={14} />
                            {pdfLoading ? '...' : 'PDF'}
                          </button>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </div>

                  {/* Professional A4 Preview Content */}
                  <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 sm:p-10 scrollbar-hide flex justify-center">
                    {/* The A4 Paper */}
                    <div 
                      className="bg-white shadow-xl max-w-[800px] w-full"
                      style={{ 
                        padding: '40px 48px', 
                        fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        color: '#1a1a2e',
                        minHeight: '1100px'
                      }}
                    >
                      {/* Name & Contact */}
                      <div className="text-center mb-6">
                        <h2 className="text-3xl font-extrabold uppercase tracking-wide mb-1" style={{ color: '#1a1a2e' }}>
                          {result.name}
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-600">
                          {[result.email, result.phone, result.location, result.linkedin].filter(Boolean).map((item, idx, arr) => (
                            <React.Fragment key={idx}>
                              <span>{item}</span>
                              {idx < arr.length - 1 && <span>|</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      {result.summary && (
                        <div className="mb-5">
                          <h3 className="text-[13px] font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: '#6366f1', borderColor: '#6366f1' }}>
                            Professional Summary
                          </h3>
                          <p className="text-[12px] leading-relaxed text-gray-800">{result.summary}</p>
                        </div>
                      )}

                      {/* Experience */}
                      {result.experience?.length > 0 && (
                        <div className="mb-5">
                          <h3 className="text-[13px] font-bold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color: '#6366f1', borderColor: '#6366f1' }}>
                            Professional Experience
                          </h3>
                          <div className="space-y-4">
                            {result.experience.map((exp, i) => (
                              <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                  <h4 className="text-[13px] font-bold text-gray-900">{exp.title}</h4>
                                  <span className="text-[11px] font-semibold text-gray-500 italic">{exp.duration}</span>
                                </div>
                                <h5 className="text-[12px] font-semibold text-gray-700 mb-2">{exp.company}</h5>
                                <ul className="space-y-1 pl-4">
                                  {exp.bullets?.map((b, j) => (
                                    <li key={j} className="text-[11px] leading-relaxed text-gray-800 list-disc">
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education */}
                      {result.education?.length > 0 && (
                        <div className="mb-5">
                          <h3 className="text-[13px] font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: '#6366f1', borderColor: '#6366f1' }}>
                            Education
                          </h3>
                          {result.education.map((edu, i) => (
                            <div key={i} className="mb-2">
                              <div className="flex justify-between items-baseline">
                                <h4 className="text-[13px] font-bold text-gray-900">{edu.degree}</h4>
                                <span className="text-[11px] font-semibold text-gray-500 italic">{edu.year}</span>
                              </div>
                              <p className="text-[12px] text-gray-700">{edu.school}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Skills */}
                      {result.skills && (
                        <div className="mb-5">
                          <h3 className="text-[13px] font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: '#6366f1', borderColor: '#6366f1' }}>
                            Skills
                          </h3>
                          <div className="space-y-1.5 text-[11px] text-gray-800">
                            {result.skills.technical?.length > 0 && (
                              <div className="flex">
                                <span className="font-bold w-24 text-gray-900">Technical:</span>
                                <span className="flex-1">{result.skills.technical.join(', ')}</span>
                              </div>
                            )}
                            {result.skills.soft?.length > 0 && (
                              <div className="flex">
                                <span className="font-bold w-24 text-gray-900">Soft Skills:</span>
                                <span className="flex-1">{result.skills.soft.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Projects */}
                      {result.projects?.length > 0 && (
                        <div className="mb-5">
                          <h3 className="text-[13px] font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: '#6366f1', borderColor: '#6366f1' }}>
                            Projects
                          </h3>
                          {result.projects.map((p, i) => (
                            <div key={i} className="mb-3">
                              <h4 className="text-[12px] font-bold text-gray-900 mb-1">{p.name}</h4>
                              <p className="text-[11px] leading-relaxed text-gray-800 mb-1">{p.description}</p>
                              {p.tech?.length > 0 && (
                                <p className="text-[10px] text-gray-500 font-medium">Tech Stack: {p.tech.join(', ')}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Certifications */}
                      {result.certifications?.length > 0 && (
                        <div className="mb-5">
                          <h3 className="text-[13px] font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: '#6366f1', borderColor: '#6366f1' }}>
                            Certifications
                          </h3>
                          <ul className="space-y-1 pl-4">
                            {result.certifications.map((c, i) => (
                              <li key={i} className="text-[11px] text-gray-800 list-disc">
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
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
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(96,165,250,0.08)', color: 'var(--text-muted)' }}>
                    <Wand2 size={28} />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                    Ready to build your perfect resume
                  </h3>
                  <p className="text-sm max-w-sm text-center" style={{ color: 'var(--text-muted)' }}>
                    Select a source resume and paste a job description. Our AI will draft a highly tailored, ATS-compliant resume with optimal keyword placement.
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
