import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ScoreCircle({ score = 0, title = 'ATS Score' }) {
  const [displayScore, setDisplayScore] = useState(0);
  const controls = useAnimation();
  
  const getScoreColor = (s) => {
    if (s >= 80) return '#10b981'; // success
    if (s >= 50) return '#f59e0b'; // warning
    return '#ef4444'; // danger
  };

  const color = getScoreColor(score);
  const radius = 60;
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
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg fill="none" className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Animated Foreground Circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={controls}
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold flex items-baseline">
            {displayScore}<span className="text-xl text-text/50">/100</span>
          </span>
        </div>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    </div>
  );
}
