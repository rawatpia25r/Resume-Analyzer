import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Wand2, Briefcase, User, Settings, Crown, Moon } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analysis', path: '/', icon: FileText },
    { name: 'Resume Builder', path: '/resume-builder', icon: Wand2 },
    { name: 'Cover Letter Builder', path: '/resume-builder', icon: FileText }, // Placeholder mapped to builder
    { name: 'Job Match', path: '#', icon: Briefcase }, // Placeholder
    { name: 'Profile', path: '#', icon: User }, // Placeholder
    { name: 'Settings', path: '#', icon: Settings }, // Placeholder
  ];

  return (
    <aside className="w-64 flex flex-col h-screen fixed left-0 top-0 border-r border-white/5 bg-[#06090F] overflow-y-auto">
      {/* Logo */}
      <div className="p-6 pb-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
            <FileText size={20} />
          </div>
          <div>
            <span className="font-bold text-lg leading-none block text-white">Resume</span>
            <span className="font-semibold text-sm text-blue-500 tracking-wide">Analyzer</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname.startsWith('/resume/'));
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mt-auto">
        {/* Premium Upgrade Card */}
        <div className="bg-[#0E131F] border border-white/5 rounded-2xl p-5 mb-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Crown size={18} />
            <span className="font-bold text-sm">Upgrade to<br/>Premium</span>
          </div>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed mt-2">
            Unlock advanced insights, AI suggestions, and premium templates.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
            Upgrade Now
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#0E131F] border border-white/5">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <Moon size={16} />
            Dark Mode
          </div>
          {/* Mock Toggle */}
          <div className="w-8 h-4 bg-blue-600 rounded-full relative cursor-pointer">
            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
