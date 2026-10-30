import React from 'react';

const PALETTE = ['#8B5CF6', '#2563EB', '#10B981', '#06B6D4', '#F59E0B', '#EC4899', '#6366F1'];

export default function DonutChart({ categories = [], totalCount = 0 }) {
  const defaultSegments = [
    { label: 'Programming', count: 8, color: '#8B5CF6' },
    { label: 'Frontend', count: 4, color: '#2563EB' },
    { label: 'Data Science', count: 4, color: '#10B981' },
    { label: 'Tools & DB', count: 4, color: '#06B6D4' },
  ];

  const activeSegments = categories && categories.length > 0
    ? categories.slice(0, 5).map((cat, i) => ({
        label: cat.label,
        count: cat.count,
        color: PALETTE[i % PALETTE.length],
      }))
    : defaultSegments;

  const total = activeSegments.reduce((acc, s) => acc + s.count, 0) || 1;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="metis-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Skill Domain Distribution
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
          {total} Active Skills
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0 }}>
          <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {activeSegments.map((seg, i) => {
              const strokeDasharray = `${(seg.count / total) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / total) * circumference);
              accumulatedPercent += seg.count;

              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth="14"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.3s' }}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {totalCount || total}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Skills
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeSegments.map((s, i) => {
            const pct = Math.round((s.count / total) * 100);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: s.color }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {s.label} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
