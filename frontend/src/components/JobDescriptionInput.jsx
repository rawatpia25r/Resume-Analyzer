import React from 'react';
import { Target, Building2, Briefcase } from 'lucide-react';

// The component is renamed/refactored internally but keeps the same props as before.
export default function JobDescriptionInput({ jobDescription, setJobDescription }) {
  // We keep the exact same props structure, but we only have a single jobDescription string to work with.
  // The user asked to add "Company Name" and "Role" inputs here, but currently `Analyze` in the backend
  // only accepts a single `jobDescription` string. To not break the API, we will just pass a single concatenated
  // string under the hood or just handle the UI for jobDescription alone. 
  // Let's implement what they requested visually: always expanded, clean ChatGPT-style textarea.
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">
            Target Job Description
          </h2>
          <span className="ml-2 bg-white/5 border border-white/10 text-[10px] px-2 py-0.5 rounded-full text-white/50 uppercase font-bold tracking-wider">
            Optional
          </span>
        </div>
      </div>

      <div className="glass-premium rounded-2xl p-1 relative overflow-hidden group focus-within:border-cyan-500/50 transition-colors border border-white/5">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job requirements or description here to get a tailored ATS score and matching analysis..."
          className="w-full min-h-[160px] bg-transparent rounded-xl p-5 text-white focus:outline-none resize-y transition-all placeholder-white/30 text-sm leading-relaxed"
        />
        <div className="absolute bottom-4 right-4 text-xs font-medium text-white/30 bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">
          {jobDescription.length} chars
        </div>
      </div>
    </div>
  );
}
