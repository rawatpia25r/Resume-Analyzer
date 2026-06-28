import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ResumeWatermark from './ResumeWatermark';

export default function Layout({ children, resumes = [] }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden relative"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '72px' : '240px' }}
      >
        <TopBar resumes={resumes} />

        <main
          className="flex-1 overflow-y-auto scrollbar-hide relative"
          style={{ padding: '24px 32px' }}
        >
          {/* Resume watermark in background */}
          <ResumeWatermark />

          <div className="max-w-[1400px] mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
