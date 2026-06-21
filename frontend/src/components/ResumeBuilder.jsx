import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [activeTab, setActiveTab] = useState('overview');

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
      setActiveTab('resume');
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
      setActiveTab('coverletter');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to generate cover letter');
    } finally {
      setGeneratingCoverLetter(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all relative ${
        active ? 'text-white' : 'text-white/40 hover:text-white/80'
      }`}
    >
      <Icon size={16} className={active ? 'text-purple-400' : ''} />
      {label}
      {active && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
        />
      )}
    </button>
  );

  return (
    <div className="glass-premium rounded-3xl overflow-hidden shadow-2xl">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto border-b border-white/5 scrollbar-hide bg-white/5">
        <TabButton id="overview" label="Target Job Details" icon={Briefcase} active={activeTab === 'overview'} />
        {(generatedResume || generatingResume) && (
          <TabButton id="resume" label="Tailored Resume" icon={Sparkles} active={activeTab === 'resume'} />
        )}
        {(generatedCoverLetter || generatingCoverLetter) && (
          <TabButton id="coverletter" label="Cover Letter" icon={FileText} active={activeTab === 'coverletter'} />
        )}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-bold text-white">Target Job Description</h3>
                <p className="text-white/50 text-sm">Provide details about the job you're applying for to generate tailored documents.</p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-2">
                      <Building2 size={14} className="text-cyan-400" /> Company Name
                    </label>
                    <input
                      type="text"
                      className="input-premium w-full px-4 py-3"
                      placeholder="e.g. Google"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-2">
                      <Briefcase size={14} className="text-purple-400" /> Role Title
                    </label>
                    <input
                      type="text"
                      className="input-premium w-full px-4 py-3"
                      placeholder="e.g. Senior Frontend Engineer"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-2">
                    <FileText size={14} className="text-pink-400" /> Full Job Description
                  </label>
                  <textarea
                    className="input-premium w-full p-4 min-h-[200px] resize-y text-sm leading-relaxed"
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>

              {!user ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center mt-8">
                  <LogIn className="mx-auto text-red-400 mb-3" size={32} />
                  <p className="text-red-200 font-medium mb-3">Please log in to use the AI Resume Builder</p>
                  <Link to="/login" className="btn-primary px-6 py-2.5 inline-flex items-center gap-2 text-sm">
                    Log In
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-white/5">
                  <button
                    onClick={handleGenerateResume}
                    disabled={!canGenerate || generatingResume}
                    className="flex-1 btn-primary py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {generatingResume ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    {generatingResume ? 'Generating...' : 'Generate Tailored Resume'}
                  </button>
                  <button
                    onClick={handleGenerateCoverLetter}
                    disabled={!canGenerate || generatingCoverLetter}
                    className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-500/25 flex justify-center items-center gap-2"
                  >
                    {generatingCoverLetter ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                    {generatingCoverLetter ? 'Writing...' : 'Generate Cover Letter'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'resume' && generatedResume && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Sparkles size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Resume Ready</h3>
                    <p className="text-xs text-white/50">Tailored for {roleName || 'the role'}</p>
                  </div>
                </div>
                <PDFDownloadLink
                  document={<ResumePDF data={generatedResume} />}
                  fileName={`${generatedResume.name?.replace(/\s+/g, '_') || 'Resume'}_Tailored.pdf`}
                  className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 shadow-none"
                >
                  {({ loading }) => (
                    <>
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                      {loading ? 'Preparing...' : 'Export PDF'}
                    </>
                  )}
                </PDFDownloadLink>
              </div>

              {/* Document Preview */}
              <div className="bg-white rounded-xl p-8 md:p-12 text-gray-900 shadow-inner max-w-3xl mx-auto border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{generatedResume.name}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-6">
                  {generatedResume.email && <span>{generatedResume.email}</span>}
                  {generatedResume.phone && <span>• {generatedResume.phone}</span>}
                  {generatedResume.location && <span>• {generatedResume.location}</span>}
                  {generatedResume.linkedin && <span>• {generatedResume.linkedin}</span>}
                </div>

                {generatedResume.summary && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-3">Professional Summary</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{generatedResume.summary}</p>
                  </div>
                )}

                {generatedResume.experience?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-3">Experience</h4>
                    {generatedResume.experience.map((job, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                          <div className="font-bold text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-600 font-medium">{job.duration}</div>
                        </div>
                        <div className="text-sm text-purple-700 font-medium mb-2">{job.company}</div>
                        <ul className="space-y-1.5">
                          {job.bullets?.map((b, j) => (
                            <li key={j} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {generatedResume.skills && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {[...(generatedResume.skills.technical || []), ...(generatedResume.skills.soft || [])].map((skill, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {generatedResume.education?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-3">Education</h4>
                    {generatedResume.education.map((edu, i) => (
                      <div key={i} className="mb-2 flex justify-between items-baseline">
                        <div>
                          <span className="font-bold text-gray-900">{edu.degree}</span>
                          <span className="text-gray-600"> — {edu.school}</span>
                        </div>
                        <span className="text-sm text-gray-600">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'coverletter' && generatedCoverLetter && (
            <motion.div
              key="coverletter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <FileText size={20} className="text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Cover Letter Ready</h3>
                    <p className="text-xs text-white/50">Tailored for {companyName || 'the company'}</p>
                  </div>
                </div>
                <PDFDownloadLink
                  document={
                    <CoverLetterPDF
                      text={generatedCoverLetter}
                      name={generatedResume?.name || 'Applicant'}
                      role={roleName}
                      company={companyName}
                    />
                  }
                  fileName={`Cover_Letter_${companyName?.replace(/\s+/g, '_') || 'Company'}.pdf`}
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-pink-500/25 text-sm"
                >
                  {({ loading }) => (
                    <>
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                      {loading ? 'Preparing...' : 'Export PDF'}
                    </>
                  )}
                </PDFDownloadLink>
              </div>

              {/* Cover Letter Preview */}
              <div className="bg-white rounded-xl p-8 md:p-14 text-gray-900 shadow-inner max-w-3xl mx-auto border border-gray-200">
                <div className="whitespace-pre-wrap text-[15px] leading-loose text-gray-800 font-serif">
                  {generatedCoverLetter}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
