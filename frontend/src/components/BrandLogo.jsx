import React from 'react';

/**
 * BrandLogo — Reusable premium logo component for Resume Intelligence
 * 
 * Props:
 *   size: 'sm' | 'md' | 'lg' (default 'md')
 *   collapsed: boolean — only show icon (default false)
 *   className: optional wrapper class
 */
export default function BrandLogo({ size = 'md', collapsed = false, className = '' }) {
  const sizeConfig = {
    sm: { icon: 32, iconInner: 16, text: 'text-[15px]', sub: 'text-[10px]', gap: 'gap-3', letterSpacing: '-0.02em' },
    md: { icon: 44, iconInner: 22, text: 'text-[20px]', sub: 'text-[11px]', gap: 'gap-3.5', letterSpacing: '-0.03em' },
    lg: { icon: 64, iconInner: 32, text: 'text-3xl', sub: 'text-sm', gap: 'gap-5', letterSpacing: '-0.04em' },
  };

  const cfg = sizeConfig[size] || sizeConfig.md;

  return (
    <div className={`flex items-center ${cfg.gap} ${className}`}>
      {/* Premium Icon */}
      <div
        className="flex-shrink-0 rounded-[28%] flex items-center justify-center shadow-lg relative overflow-hidden"
        style={{
          width: cfg.icon,
          height: cfg.icon,
          background: 'linear-gradient(135deg, #60A5FA, #2563EB, #5B21B6)',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        {/* Inner glow highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
        
        {/* Custom SVG: document with AI spark */}
        <svg
          width={cfg.iconInner}
          height={cfg.iconInner}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Document body */}
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.15)"
          />
          <path
            d="M14 2V8H20"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* AI Spark / star */}
          <path
            d="M12 18L13 15.2L15.8 14.2L13 13.2L12 10.4L11 13.2L8.2 14.2L11 15.2L12 18Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span
            className={`${cfg.text} font-extrabold`}
            style={{
              color: 'var(--text-primary)',
              letterSpacing: cfg.letterSpacing,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Resume
          </span>
          <span
            className={`${cfg.sub} font-bold uppercase tracking-[0.2em]`}
            style={{
              background: 'linear-gradient(90deg, #60A5FA, #2563EB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginTop: size === 'lg' ? '4px' : '2px',
            }}
          >
            Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
