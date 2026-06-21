import React, { useContext } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function TopBar() {
  const { user } = useContext(AuthContext);

  // Derive initials from name
  const getInitials = (name) => {
    if (!name) return 'PR';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-20 border-b border-white/5 bg-[#06090F] flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full bg-[#0E131F] border border-white/5 text-gray-300 rounded-xl pl-11 pr-4 py-2.5 focus:outline-none focus:border-white/10 text-sm transition-colors"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={14} /> {/* Small magnifying glass icon on right as per mockup */}
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="w-10 h-10 rounded-full bg-[#0E131F] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#06090F]"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {getInitials(user?.name)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
              {user?.name || 'Priya Rawat'}
            </p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
          <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
}
