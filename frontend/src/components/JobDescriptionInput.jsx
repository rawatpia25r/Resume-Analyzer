import React from 'react';
import { Target } from 'lucide-react';

export default function JobDescriptionInput({ jobDescription, setJobDescription }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={18} style={{ color: '#60A5FA' }} />
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Target Job Description
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(96,165,250,0.08)',
              border: '1px solid rgba(96,165,250,0.15)',
              color: 'var(--text-muted)',
            }}>
            Optional
          </span>
        </div>
      </div>

      <div className="rounded-2xl p-1 relative overflow-hidden group focus-within:border-[rgba(96,165,250,0.4)] transition-colors"
        style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the target job description here. Our AI will analyze the requirements and provide a tailored ATS optimization strategy..."
          className="w-full min-h-[140px] bg-transparent rounded-xl p-4 focus:outline-none resize-y transition-all text-sm leading-relaxed"
          style={{
            color: 'var(--text-primary)',
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          }}
        />
        <div className="absolute bottom-3 right-3 text-xs font-medium px-2 py-0.5 rounded-md"
          style={{
            color: 'var(--text-muted)',
            background: 'var(--bg-hover)',
            border: '1px solid var(--border-color)',
          }}>
          {jobDescription.length} chars
        </div>
      </div>
    </div>
  );
}
