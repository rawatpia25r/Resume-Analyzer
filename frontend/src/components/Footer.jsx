import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-2 rounded-xl">
                <span className="font-bold text-lg leading-none block">ATS</span>
              </div>
              <span className="font-semibold text-lg text-white">Analyzer Hub</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              AI-powered resume optimization platform. Analyze, optimize, and generate tailored resumes to land more interviews.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li><Link to="/dashboard" className="text-white/40 hover:text-white/80 text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/resume-builder" className="text-white/40 hover:text-white/80 text-sm transition-colors">Resume Builder</Link></li>
              <li><Link to="/" className="text-white/40 hover:text-white/80 text-sm transition-colors">Analyze Resume</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><span className="text-white/40 text-sm cursor-default">Privacy Policy</span></li>
              <li><span className="text-white/40 text-sm cursor-default">Terms of Service</span></li>
              <li><span className="text-white/40 text-sm cursor-default">Contact</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-center">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} ATS Analyzer Hub. Built with AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
