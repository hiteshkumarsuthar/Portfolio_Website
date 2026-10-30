import React, { useState } from 'react';

export default function RevenueChart() {
  const [activeRange, setActiveRange] = useState('7D');
  const [hoverIndex, setHoverIndex] = useState(null);

  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  // Data sets matching the smooth curves in the reference image
  // Values represent height on scale 0 - 60k
  const seriesData = {
    '7D': {
      revenue: [38, 44, 42, 51, 48, 43, 62, 58, 46, 52, 39, 44],
      profit: [24, 21, 16, 12, 18, 17, 10, 15, 19, 14, 11, 8],
    },
    '30D': {
      revenue: [32, 40, 48, 45, 54, 50, 58, 64, 52, 48, 42, 50],
      profit: [20, 18, 15, 14, 16, 15, 12, 14, 18, 16, 13, 10],
    },
    '90D': {
      revenue: [28, 35, 42, 49, 52, 46, 55, 60, 50, 47, 44, 54],
      profit: [18, 16, 14, 13, 15, 14, 11, 13, 16, 15, 12, 9],
    },
    '1Y': {
      revenue: [25, 30, 36, 44, 48, 52, 58, 61, 55, 50, 48, 56],
      profit: [15, 14, 13, 12, 14, 13, 11, 12, 15, 14, 11, 9],
    },
  };

  const current = seriesData[activeRange] || seriesData['7D'];

  // Map values to SVG coordinates (width 800, height 240)
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingBottom = 30;
  const effectiveHeight = svgHeight - paddingBottom;

  const pointsRev = current.revenue.map((val, i) => {
    const x = paddingX + (i / (months.length - 1)) * (svgWidth - paddingX * 2);
    const y = effectiveHeight - (val / 70) * effectiveHeight;
    return { x, y, val };
  });

  const pointsProf = current.profit.map((val, i) => {
    const x = paddingX + (i / (months.length - 1)) * (svgWidth - paddingX * 2);
    const y = effectiveHeight - (val / 70) * effectiveHeight;
    return { x, y, val };
  });

  // Catmull-Rom or cubic bezier curve builder for buttery smooth splines
  const createSplinePath = (pts) => {
    if (!pts.length) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const pathRev = createSplinePath(pointsRev);
  const pathProf = createSplinePath(pointsProf);

  const areaRev = `${pathRev} L ${pointsRev[pointsRev.length - 1].x} ${effectiveHeight} L ${pointsRev[0].x} ${effectiveHeight} Z`;
  const areaProf = `${pathProf} L ${pointsProf[pointsProf.length - 1].x} ${effectiveHeight} L ${pointsProf[0].x} ${effectiveHeight} Z`;

  return (
    <div className="metis-card" style={{ padding: '24px' }}>
      {/* Top Header of Chart */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Revenue Overview
          </h3>

          {/* Legend dots matching screenshot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Revenue</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Profit</span>
            </div>
          </div>
        </div>

        {/* 7D, 30D, 90D, 1Y Pill Selector */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-input)',
            borderRadius: '6px',
            padding: '3px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {['7D', '30D', '90D', '1Y'].map((range) => {
            const isActive = activeRange === range;
            return (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                style={{
                  background: isActive ? '#2563EB' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Chart Container */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {/* Y Axis Labels overlay */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <span>$60,000</span>
          <span>$40,000</span>
          <span>$20,000</span>
          <span>$0</span>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="profGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.33, 0.66, 1].map((pct, idx) => {
            const y = effectiveHeight * pct;
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="var(--border-subtle)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Area Fills */}
          <path d={areaRev} fill="url(#revGradient)" />
          <path d={areaProf} fill="url(#profGradient)" />

          {/* Glowing Stroke Lines */}
          <path
            d={pathProf}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathRev}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X Axis Labels */}
          {months.map((m, idx) => {
            const x = paddingX + (idx / (months.length - 1)) * (svgWidth - paddingX * 2);
            return (
              <text
                key={m}
                x={x}
                y={svgHeight - 6}
                fill="var(--text-muted)"
                fontSize="11"
                textAnchor="middle"
                fontFamily="inherit"
              >
                {m}
              </text>
            );
          })}

          {/* Interactive Data Points on Hover */}
          {pointsRev.map((pt, idx) => (
            <g
              key={idx}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoverIndex === idx ? 6 : 3.5}
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{ transition: 'all 0.15s ease' }}
              />
              {hoverIndex === idx && (
                <g>
                  <rect
                    x={pt.x - 45}
                    y={pt.y - 40}
                    width="90"
                    height="28"
                    rx="6"
                    fill="#1E293B"
                    stroke="var(--border-subtle)"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 22}
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    ${pt.val * 1000}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
