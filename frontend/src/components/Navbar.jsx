import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-lg">
            <span className="font-bold text-xl leading-none block">ATS</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Analyzer Hub</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-purple-400 transition flex items-center gap-2">
                <User size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-full text-sm font-medium border border-red-500/20 transition">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/80 hover:text-white transition">Sign In</Link>
              <Link to="/register" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium transition shadow-lg shadow-purple-500/20">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
