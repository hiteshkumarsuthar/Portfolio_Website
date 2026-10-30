import React from 'react';

export default function BarChart({ categories = [] }) {
  const defaultData = [
    { label: 'AI & Data', value: 3 },
    { label: 'Full Stack', value: 4 },
    { label: 'Analytics', value: 2 },
    { label: 'Mobile/Tools', value: 2 },
  ];

  const activeData = categories && categories.length > 0
    ? categories.map((c) => ({
        label: c.label.length > 12 ? c.label.slice(0, 10) + '..' : c.label,
        fullName: c.label,
        value: c.count,
      }))
    : defaultData;

  const totalProjects = activeData.reduce((acc, d) => acc + d.value, 0);
  const maxValue = Math.max(...activeData.map((d) => d.value), 5);

  return (
    <div className="metis-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Projects by Category
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
          {totalProjects} Synced from MongoDB
        </span>
      </div>

      <div style={{ display: 'flex', height: '180px', gap: '14px', alignItems: 'flex-end', paddingTop: '10px' }}>
        {/* Y Axis Guide */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            paddingBottom: '24px',
          }}
        >
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.66)}</span>
          <span>{Math.round(maxValue * 0.33)}</span>
          <span>0</span>
        </div>

        {/* Bars Container */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '100%' }}>
          {activeData.map((item, idx) => {
            const heightPercent = Math.max((item.value / maxValue) * 100, 15);
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  flex: 1,
                }}
              >
                {/* Bar */}
                <div
                  style={{
                    width: '36px',
                    height: `${heightPercent * 0.72}%`,
                    backgroundColor: '#2563EB',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3B82F6')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
                  title={`${item.fullName || item.label}: ${item.value} project(s)`}
                />
                {/* X Axis Label */}
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
