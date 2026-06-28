import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
              <Brain size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Resume Intelligence</div>
              <div className="text-xs text-white/40">AI-Powered Resume Platform</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-white transition-colors">Sign Up</Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-white/30">
            © {new Date().getFullYear()} Resume Intelligence. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
