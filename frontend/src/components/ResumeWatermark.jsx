import React from 'react';

/**
 * ResumeWatermark — decorative background element
 * Used in: HomePage (behind hero) and Layout (dashboard background)
 * Semi-transparent, rotated, non-interactive
 */
export default function ResumeWatermark({ position = 'fixed', opacity = 0.055 }) {
  return (
    <div
      className="pointer-events-none select-none"
      aria-hidden="true"
      style={{
        position,
        right: position === 'fixed' ? '-40px' : '-40px',
        top: position === 'fixed' ? '100px' : '60px',
        opacity,
        transform: 'rotate(10deg)',
        zIndex: 1,
      }}
    >
      {/* Glow behind */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.18) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: -1,
        }}
      />

      {/* Resume card */}
      <div
        style={{
          width: '280px',
          fontFamily: 'Inter, sans-serif',
          color: 'var(--text-primary)',
          lineHeight: 1.5,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '16px', borderBottom: '1.5px solid currentColor', paddingBottom: '10px', opacity: 0.9 }}>
          <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.3px', fontFamily: 'Sora, sans-serif' }}>
            YOUR NAME
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, opacity: 0.75, marginTop: '2px', letterSpacing: '0.5px' }}>
            Professional Title
          </div>
          <div style={{ fontSize: '8px', opacity: 0.55, marginTop: '4px' }}>
            email@example.com · linkedin.com/in/yourname
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: '13px' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '4px' }}>
            Summary
          </div>
          <div style={{ fontSize: '8px', opacity: 0.55, lineHeight: 1.6 }}>
            Results-driven professional with expertise in building scalable applications and delivering impact.
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '13px' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '5px' }}>
            Experience
          </div>
          {[
            { role: 'Senior Software Engineer', company: 'TechCorp Inc.', period: '2022 – Present' },
            { role: 'Software Developer', company: 'StartupAI', period: '2020 – 2022' },
          ].map((exp, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              <div style={{ fontSize: '8.5px', fontWeight: 600, opacity: 0.8 }}>{exp.role}</div>
              <div style={{ fontSize: '7.5px', opacity: 0.5 }}>{exp.company} · {exp.period}</div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: '13px' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '4px' }}>
            Education
          </div>
          <div style={{ fontSize: '8.5px', fontWeight: 600, opacity: 0.8 }}>B.Tech Computer Science</div>
          <div style={{ fontSize: '7.5px', opacity: 0.5 }}>IIT Delhi · 2015 – 2019</div>
        </div>

        {/* Skills */}
        <div>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '5px' }}>
            Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {['Python', 'React', 'Node.js', 'AWS', 'Docker', 'ML/AI', 'TypeScript'].map((skill, i) => (
              <span key={i} style={{
                fontSize: '7px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                border: '1px solid currentColor', opacity: 0.65,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
