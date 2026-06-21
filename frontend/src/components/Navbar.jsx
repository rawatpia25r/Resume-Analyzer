import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User, Wand2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-premium border-b-0 border-white/5 px-6 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-2 rounded-xl group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-shadow">
            <span className="font-bold text-lg leading-none block">ATS</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">Analyzer Hub</span>
        </Link>
        
        {/* Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </div>
                {isActive('/dashboard') && (
                  <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
                )}
              </Link>
              
              <Link
                to="/resume-builder"
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive('/resume-builder') ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Wand2 size={16} />
                  <span className="hidden sm:inline">Resume Builder</span>
                </div>
                {isActive('/resume-builder') && (
                  <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
                )}
              </Link>
              
              <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></div>
              
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary px-5 py-2.5 text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
