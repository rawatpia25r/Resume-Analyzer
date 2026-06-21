import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Loader2, LogIn, Briefcase, Building2, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { generateTailoredResume, generateCoverLetter } from '../services/api';
import ResumePDF from './pdf/ResumePDF';
import CoverLetterPDF from './pdf/CoverLetterPDF';

export default function ResumeBuilder({ analysisResult, resumeText }) {
  const { user } = useContext(AuthContext);

  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');

  const [generatingResume, setGeneratingResume] = useState(false);
  const [generatingCoverLetter, setGeneratingCoverLetter] = useState(false);

  const [generatedResume, setGeneratedResume] = useState(null);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState(null);

  const canGenerate = jobDescription.trim().length > 0;

  const handleGenerateResume = async () => {
    if (!resumeText || resumeText.trim().length === 0) {
      toast.error('Resume text not available. Please re-upload your resume.');
      return;
    }
    setGeneratingResume(true);
    try {
      const data = await generateTailoredResume(resumeText, jobDescription, companyName, roleName);
      setGeneratedResume(data);
      toast.success('Tailored resume generated!');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to generate resume');
    } finally {
      setGeneratingResume(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!resumeText || resumeText.trim().length === 0) {
      toast.error('Resume text not available. Please re-upload your resume.');
      return;
    }
    setGeneratingCoverLetter(true);
    try {
      const data = await generateCoverLetter(resumeText, jobDescription, companyName, roleName);
      setGeneratedCoverLetter(data.coverLetter);
      toast.success('Cover letter generated!');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to generate cover letter');
    } finally {
      setGeneratingCoverLetter(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-2">
          Generate Your Tailored Resume & Cover Letter
        </h2>
        <p className="text-text/60 text-sm">
          Paste a job description to create AI-powered, job-specific documents ready for download as PDF.
        </p>
      </div>

      {/* Section A — Job Description Input */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <label className="block text-sm font-medium text-white/80 mb-1">
          Paste Job Description to Generate Tailored Documents
        </label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[140px] transition"
          placeholder="Paste the full job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/50 mb-1 flex items-center gap-1">
              <Building2 size={12} /> Company Name
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
              placeholder="e.g. Google"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 flex items-center gap-1">
              <Briefcase size={12} /> Role / Position Title
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
              placeholder="e.g. Senior Frontend Engineer"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section B — Action Buttons */}
      {!user ? (
        <div className="glass-card p-6 rounded-2xl text-center border border-purple-500/20">
          <LogIn className="mx-auto text-purple-400 mb-3" size={32} />
          <p className="text-white/80 font-medium mb-2">Please log in to use the AI Resume Builder</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium transition"
          >
            Log In
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleGenerateResume}
            disabled={!canGenerate || generatingResume}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
          >
            {generatingResume ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {generatingResume ? 'Generating...' : '✨ Generate Tailored Resume'}
          </button>
          <button
            onClick={handleGenerateCoverLetter}
            disabled={!canGenerate || generatingCoverLetter}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20"
          >
            {generatingCoverLetter ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
            {generatingCoverLetter ? 'Writing...' : '📝 Generate Cover Letter'}
          </button>
        </div>
      )}

      {/* Section C — Generated Resume Preview */}
      {generatedResume && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 space-y-6"
        >
          <div className="flex justify-between items-start flex-wrap gap-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-purple-400" size={22} /> Generated Resume
            </h3>
            <PDFDownloadLink
              document={<ResumePDF data={generatedResume} />}
              fileName={`${generatedResume.name || 'Resume'}_Tailored.pdf`}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-lg shadow-purple-500/20"
            >
              {({ loading }) => (
                <>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {loading ? 'Preparing...' : 'Download PDF'}
                </>
              )}
            </PDFDownloadLink>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl p-6 md:p-8 text-gray-900 space-y-4 shadow-inner">
            <h1 className="text-2xl font-bold text-gray-900">{generatedResume.name}</h1>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              {generatedResume.email && <span>{generatedResume.email}</span>}
              {generatedResume.phone && <span>• {generatedResume.phone}</span>}
              {generatedResume.location && <span>• {generatedResume.location}</span>}
              {generatedResume.linkedin && <span>• {generatedResume.linkedin}</span>}
            </div>

            {generatedResume.summary && (
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wide border-b border-indigo-200 pb-1 mb-2">Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{generatedResume.summary}</p>
              </div>
            )}

            {generatedResume.experience?.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wide border-b border-indigo-200 pb-1 mb-2">Experience</h4>
                {generatedResume.experience.map((job, i) => (
                  <div key={i} className="mb-3">
                    <div className="font-semibold text-sm text-gray-900">{job.title}</div>
                    <div className="text-xs text-gray-500">{job.company} — {job.duration}</div>
                    <ul className="mt-1 space-y-0.5">
                      {job.bullets?.map((b, j) => (
                        <li key={j} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-indigo-400">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {generatedResume.skills && (
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wide border-b border-indigo-200 pb-1 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {[...(generatedResume.skills.technical || []), ...(generatedResume.skills.soft || [])].map((skill, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded text-xs font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {generatedResume.education?.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wide border-b border-indigo-200 pb-1 mb-2">Education</h4>
                {generatedResume.education.map((edu, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-semibold text-gray-900">{edu.degree}</span>
                    <span className="text-gray-500"> — {edu.school}, {edu.year}</span>
                  </div>
                ))}
              </div>
            )}

            {generatedResume.certifications?.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wide border-b border-indigo-200 pb-1 mb-2">Certifications</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {generatedResume.certifications.map((c, i) => <li key={i}>• {c}</li>)}
                </ul>
              </div>
            )}

            {generatedResume.projects?.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wide border-b border-indigo-200 pb-1 mb-2">Projects</h4>
                {generatedResume.projects.map((proj, i) => (
                  <div key={i} className="mb-2">
                    <div className="font-semibold text-sm text-gray-900">{proj.name}</div>
                    <div className="text-xs text-gray-600">{proj.description}</div>
                    {proj.tech?.length > 0 && (
                      <div className="text-xs text-indigo-500 mt-0.5">Tech: {proj.tech.join(', ')}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Section D — Generated Cover Letter Preview */}
      {generatedCoverLetter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 rounded-2xl border border-pink-500/20 space-y-6"
        >
          <div className="flex justify-between items-start flex-wrap gap-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="text-pink-400" size={22} /> Generated Cover Letter
            </h3>
            <PDFDownloadLink
              document={
                <CoverLetterPDF
                  text={generatedCoverLetter}
                  name={generatedResume?.name || ''}
                  role={roleName}
                  company={companyName}
                />
              }
              fileName={`Cover_Letter_${companyName || 'Company'}.pdf`}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-lg shadow-pink-500/20"
            >
              {({ loading }) => (
                <>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {loading ? 'Preparing...' : 'Download PDF'}
                </>
              )}
            </PDFDownloadLink>
          </div>

          {/* Cover Letter Preview */}
          <div className="bg-white rounded-xl p-6 md:p-8 text-gray-900 shadow-inner">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 font-serif">
              {generatedCoverLetter}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
