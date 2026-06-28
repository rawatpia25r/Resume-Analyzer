import React from 'react';
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-3 py-2 shadow-2xl text-sm"
        style={{
          background: '#0F1E34',
          border: '1px solid rgba(59,130,246,0.25)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <p className="text-[10px] font-semibold text-slate-400 mb-1 uppercase tracking-wide">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="font-bold" style={{ color: entry.color, fontSize: '13px' }}>
            {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function buildTrendData(resumes) {
  if (resumes.length === 0) {
    return [
      { label: 'Jun 1', score: 55 },
      { label: 'Jun 8', score: 62 },
      { label: 'Jun 15', score: 70 },
      { label: 'Jun 22', score: 75 },
      { label: 'Jun 29', score: 82 },
    ];
  }
  return resumes.slice(-6).map((r) => ({
    label: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: r.atsScore || 0,
    keywords: Math.min(100, (r.analysisData?.matchedKeywords?.length || 0) * 8),
  }));
}

/* Compact = single area chart (for Dashboard score trend panel) */
export default function DashboardCharts({ resumes = [], compact = false }) {
  const data = buildTrendData(resumes);

  const axisProps = {
    tick: { fill: '#475569', fontSize: 9, fontFamily: 'Inter' },
    axisLine: false,
    tickLine: false,
  };

  if (compact) {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -28 }}>
          <defs>
            <linearGradient id="scoreGradCompact" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis {...axisProps} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#3B82F6"
            strokeWidth={2.5}
            fill="url(#scoreGradCompact)"
            dot={{ fill: '#3B82F6', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#3B82F6', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Full version — two charts side by side
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ATS Score Trend */}
      <div className="rounded-2xl p-5" style={{ background: '#0D1829', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-white" style={{ fontFamily: 'Sora, sans-serif' }}>ATS Score Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">Your score over time</p>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -28 }}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="label" {...axisProps} />
            <YAxis {...axisProps} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2.5}
              fill="url(#scoreGrad)" dot={{ fill: '#3B82F6', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#3B82F6', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Performance */}
      <div className="rounded-2xl p-5" style={{ background: '#0D1829', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Resume Performance</h3>
          <p className="text-xs text-slate-500 mt-0.5">Keyword match rate</p>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -28 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="label" {...axisProps} />
            <YAxis {...axisProps} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
