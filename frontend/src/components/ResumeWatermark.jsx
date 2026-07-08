import React from 'react';

/**
 * ResumeWatermark — decorative background element
 * Large, semi-transparent, rotated, non-interactive
 */
export default function ResumeWatermark({ position = 'fixed', opacity = 0.04 }) {
  return (
    <div
      className="pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
      style={{
        position,
        right: position === 'fixed' ? '-10vw' : '-10%',
        top: position === 'fixed' ? '5vh' : '5%',
        opacity,
        transform: 'rotate(12deg)',
        zIndex: 0,
      }}
    >
      {/* Resume card */}
      <div
        style={{
          width: '800px', // Massive size as requested
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          color: 'var(--text-primary)',
          lineHeight: 1.5,
          padding: '40px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '32px', borderBottom: '3px solid currentColor', paddingBottom: '20px', opacity: 0.9 }}>
          <div style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-1px', fontFamily: 'Sora, sans-serif' }}>
            YOUR NAME
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, opacity: 0.75, marginTop: '8px', letterSpacing: '1px' }}>
            Professional Title
          </div>
          <div style={{ fontSize: '18px', opacity: 0.55, marginTop: '12px' }}>
            email@example.com · linkedin.com/in/yourname
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '12px' }}>
            Summary
          </div>
          <div style={{ fontSize: '18px', opacity: 0.55, lineHeight: 1.6 }}>
            Results-driven professional with expertise in building scalable applications and delivering measurable impact across dynamic environments.
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '16px' }}>
            Experience
          </div>
          {[
            { role: 'Senior Software Engineer', company: 'TechCorp Inc.', period: '2022 – Present' },
            { role: 'Software Developer', company: 'StartupAI', period: '2020 – 2022' },
          ].map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '22px', fontWeight: 600, opacity: 0.8 }}>{exp.role}</div>
              <div style={{ fontSize: '18px', opacity: 0.5 }}>{exp.company} · {exp.period}</div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '12px' }}>
            Education
          </div>
          <div style={{ fontSize: '22px', fontWeight: 600, opacity: 0.8 }}>B.Tech Computer Science</div>
          <div style={{ fontSize: '18px', opacity: 0.5 }}>Top Tier University · 2015 – 2019</div>
        </div>

        {/* Skills */}
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '16px' }}>
            Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['Python', 'React', 'Node.js', 'AWS', 'Docker', 'ML/AI', 'TypeScript'].map((skill, i) => (
              <span key={i} style={{
                fontSize: '18px', fontWeight: 600, padding: '6px 16px', borderRadius: '8px',
                border: '2px solid currentColor', opacity: 0.65,
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
