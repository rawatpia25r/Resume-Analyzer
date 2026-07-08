import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { Mail, ArrowRight } from 'lucide-react';
import ResumeWatermark from './ResumeWatermark';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-32 border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      {/* Background Watermark isolated to footer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}>
        <ResumeWatermark position="absolute" opacity={0.06} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <BrandLogo size="md" />
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Resume Intelligence is a premium AI-powered career assistant designed to help professionals bypass ATS algorithms and secure more interviews with data-driven resume optimization.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Platform</h4>
            <ul className="space-y-3 text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              <li><Link to="/dashboard" className="hover:text-[var(--color-primary)] transition-colors">Dashboard</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-primary)] transition-colors">AI Analysis</Link></li>
              <li><Link to="/resume-builder" className="hover:text-[var(--color-primary)] transition-colors">Resume Builder</Link></li>
              <li><Link to="/cover-letter" className="hover:text-[var(--color-primary)] transition-colors">Cover Letters</Link></li>
              <li><Link to="/job-match" className="hover:text-[var(--color-primary)] transition-colors">Job Matching</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Features</h4>
            <ul className="space-y-3 text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">ATS Scoring</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Keyword Optimization</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Format Validation</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">DOCX Export</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">PDF Export</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Contact Us</h4>
            <ul className="space-y-3 text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                <Mail size={16} /> support@resumeintelligence.com
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, #60A5FA, #2563EB)', color: 'white', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}>
                Start for Free <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Elegant Divider */}
        <div className="h-px w-full my-12" style={{ background: 'linear-gradient(90deg, transparent, var(--border-hover), transparent)' }} />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          <p>© {new Date().getFullYear()} Resume Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
