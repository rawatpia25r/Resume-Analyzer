import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function MetricCard({ title, score, maxScore = 100, subtitle, icon: Icon, color = '#3B82F6', isCount = false }) {
  const [displayScore, setDisplayScore] = useState(0);
  const controls = useAnimation();
  
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = isCount ? 100 : (score / maxScore) * 100;

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const targetScore = score;
    const increment = targetScore / (duration / 16);
    
    controls.start({
      strokeDashoffset: isCount ? 0 : circumference - (normalizedScore / 100) * circumference,
      transition: { duration: 1.5, ease: "easeOut" }
    });

    if (targetScore > 0) {
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetScore) {
          setDisplayScore(targetScore);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    } else {
      setDisplayScore(0);
    }
  }, [score, circumference, controls, isCount, normalizedScore]);

  return (
    <div className="dashboard-card p-6 flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10 blur-2xl rounded-full" style={{ backgroundColor: color }} />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-white/70 text-sm font-semibold uppercase tracking-wider font-heading">
          {Icon && <Icon size={16} style={{ color }} />}
          {title}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-white mb-1">
            {displayScore}{!isCount && maxScore === 100 && '%'}
            {!isCount && maxScore !== 100 && <span className="text-lg text-white/40 ml-1">/{maxScore}</span>}
          </div>
          <div className="text-sm text-white/50">{subtitle}</div>
        </div>

        {!isCount && (
          <div className="relative flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="6"
                fill="transparent"
              />
              <motion.circle
                cx="32"
                cy="32"
                r={radius}
                stroke={color}
                strokeWidth="6"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={controls}
                style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color }}>
              {Math.round(normalizedScore)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
