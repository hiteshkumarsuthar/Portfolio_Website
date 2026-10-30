import React from 'react';

export default function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  isPositive = true, 
  onClick 
}) {
  return (
    <div
      onClick={onClick}
      className="metis-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Icon in rounded card container */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: '#1E2532',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          flexShrink: 0,
        }}
      >
        <Icon size={22} color="var(--text-secondary)" />
      </div>

      {/* Stats Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '4px',
          }}
        >
          {title}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <h3
            style={{
              fontSize: '1.65rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {value}
          </h3>

          {/* Trend Badge */}
          {trend && (
            <span
              style={{
                fontSize: '0.76rem',
                fontWeight: 600,
                color: isPositive ? '#10B981' : '#EF4444',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
