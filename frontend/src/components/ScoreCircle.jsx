import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ScoreCircle({ score = 0, title = 'ATS Score' }) {
  const [displayScore, setDisplayScore] = useState(0);
  const controls = useAnimation();
  
  const getScoreColor = (s) => {
    if (s >= 80) return '#22C55E'; // success (emerald)
    if (s >= 50) return '#F59E0B'; // warning (amber)
    return '#EF4444'; // danger (red)
  };

  const color = getScoreColor(score);
  const radius = 70; // Slightly larger
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = score / (duration / 16); // roughly 60fps
    
    controls.start({
      strokeDashoffset: circumference - (score / 100) * circumference,
      transition: { duration: 1.5, ease: "easeOut" }
    });

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score, circumference, controls]);

  return (
    <div className="flex flex-col items-center justify-center relative group">
      {/* Background ambient glow matching the score color */}
      <div 
        className="absolute inset-0 blur-3xl opacity-20 rounded-full transition-colors duration-1000 pointer-events-none"
        style={{ backgroundColor: color, transform: 'scale(0.8)' }}
      />
      
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg fill="none" className="w-48 h-48 transform -rotate-90 drop-shadow-2xl">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Animated Foreground Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={controls}
            style={{ filter: `drop-shadow(0 0 12px ${color}60)` }}
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-5xl font-black flex items-baseline tracking-tighter text-white">
            {displayScore}<span className="text-2xl font-semibold text-white/40 ml-1">/100</span>
          </span>
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold text-white/90 tracking-wide uppercase text-sm">{title}</h3>
    </div>
  );
}
