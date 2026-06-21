import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#06090F] overflow-hidden text-[#E2E8F0] font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        {/* Added some ambient glow behind top bar and main content */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8 relative z-10 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
